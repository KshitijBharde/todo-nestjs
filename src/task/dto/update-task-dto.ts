import { TaskStatusEnum } from '@prisma/client';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

class UpdateTask {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  currTaskStatus: TaskStatusEnum;
}

export default UpdateTask;
