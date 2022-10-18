import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskPriority } from '../task-priority.enum';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;
}