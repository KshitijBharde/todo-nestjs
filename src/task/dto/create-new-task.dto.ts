import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { type TaskStatusEnum } from '@prisma/client';

class CreateNewTask {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: TaskStatusEnum;
}

export default CreateNewTask;
