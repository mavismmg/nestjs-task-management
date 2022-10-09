import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TaskPriority } from "./task-priority.entity";

export const GetTaskPriority = createParamDecorator((_data, ctx: ExecutionContext): TaskPriority => {
  const req = ctx.switchToHttp().getRequest();
  return req.taskPriority;
});