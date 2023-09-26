import { Injectable } from '@nestjs/common';
import { PrismaService } from '../repository/prisma.service';
import { Task, TaskStatusEnum } from '@prisma/client';
import CreateNewTask from './dto/create-new-task.dto';
import UpdateTask from './dto/update-task-dto';
import { MonthlyMetrics } from './types';

@Injectable()
export class TaskService {
  private readonly DEFAULT_TASK_STATUS = TaskStatusEnum.OPEN;

  constructor(private readonly prismaService: PrismaService) {}

  async getTasks(limit?: number, offset?: number): Promise<Task[]> {
    return this.prismaService.task.findMany({ skip: offset, take: limit });
  }

  createNewTask(createNewTaskDto: CreateNewTask): Promise<Task> {
    const currTaskStatus = createNewTaskDto?.status || this.DEFAULT_TASK_STATUS;

    return this.prismaService.$transaction(async (tx) => {
      const taskInst = await tx.task.create({
        data: { ...createNewTaskDto, currTaskStatus },
      });

      await tx.taskStatus.create({
        data: { taskId: taskInst.id, status: currTaskStatus },
      });

      return taskInst;
    });
  }

  updateTask(updateTaskDto: UpdateTask): Promise<Task> {
    const { id, ...taskData } = updateTaskDto;

    return this.prismaService.$transaction(async (tx) => {
      const taskInst = await tx.task.update({
        where: { id },
        data: taskData,
      });

      await tx.taskStatus.create({
        data: { taskId: taskInst.id, status: taskInst.currTaskStatus },
      });

      return taskInst;
    });
  }

  async deletTaskById(id: number): Promise<void> {
    await this.prismaService.task.delete({ where: { id } });
  }

  async getMetricsByMonth(): Promise<MonthlyMetrics[]> {
    const res = (await this.prismaService.$queryRawUnsafe(`
    SELECT
      TO_CHAR(date_trunc('month', "createdAt"), 'FMMonth YYYY') AS date,
      json_build_object(
          'open_tasks',
          COUNT(CASE WHEN "status" = 'OPEN' THEN 1 END),
          'inprogress_tasks',
          COUNT(CASE WHEN "status" = 'IN_PROGRESS' THEN 1 END),
          'completed_tasks',
          COUNT(CASE WHEN "status" = 'COMPLETED' THEN 1 END)
          ) as metrics
    FROM (
      SELECT
        *,
        ROW_NUMBER() OVER (PARTITION BY date_trunc('month', "createdAt"), "taskId" ORDER BY "createdAt" DESC) AS rn
      FROM "TaskStatus"
    ) AS subquery
    WHERE rn = 1
    GROUP BY date
    ORDER BY date`)) as MonthlyMetrics[];

    return res;
  }
}
