import { IsEnum, IsOptional } from "class-validator";
import { TaskPriorityLevel } from "../task-priority-level.enum";

export class GetTasksPriorityFilterDto {
  @IsOptional()
  @IsEnum(TaskPriorityLevel)
  level?: TaskPriorityLevel;

  @IsOptional()
  search?: Date;
}