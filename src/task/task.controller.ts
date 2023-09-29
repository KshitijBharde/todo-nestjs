import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatusEnum } from '@prisma/client';
import CreateNewTask from './dto/create-new-task.dto';
import UpdateTask from './dto/update-task-dto';
import { MonthlyMetrics } from './types';

const VALID_TASK_STATUSES = Object.keys(TaskStatusEnum);

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  private validateAndTransformListItemsQuery(
    query: any,
  ): Record<string, number> {
    let { limit, offset } = query;

    if (limit) {
      if (Number.isNaN(Number(limit))) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `Invalid limit`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      limit = Number(limit);
    }

    if (offset) {
      if (Number.isNaN(Number(offset))) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `Invalid offset`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      offset = Number(offset);
    }

    return { limit, offset };
  }

  private validateTaskStatus(status?: string) {
    if (status && !VALID_TASK_STATUSES.includes(status)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Invalid Task Status Received, Valid Statuses: ${VALID_TASK_STATUSES.join(
            ', ',
          )}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/getTasks')
  async getTasks(@Query() query: any): Promise<Task[]> {
    const { limit, offset } = this.validateAndTransformListItemsQuery(query);

    return this.taskService.getTasks(limit, offset);
  }

  @Post('/createNewTask')
  async createNewTask(@Body() createNewTaskDto: CreateNewTask): Promise<Task> {
    this.validateTaskStatus(createNewTaskDto.status); //  throws

    return this.taskService.createNewTask(createNewTaskDto);
  }

  @Put('/updateTask')
  async updateTask(@Body() updateTaskDto: UpdateTask): Promise<Task> {
    this.validateTaskStatus(updateTaskDto.currTaskStatus); //  throws

    return this.taskService.updateTask(updateTaskDto);
  }

  @Get('/getMetrics')
  async getMetrics(): Promise<MonthlyMetrics[]> {
    return this.taskService.getMetricsByMonth();
  }

  @Delete('/deleteTaskById/:id')
  deleteTaskById(@Param() params: any): Promise<void> {
    const id = Number(params.id);
    if (!id) {
      // NaN
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Please provide a valid number for id`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.taskService.deletTaskById(id);
  }
}
