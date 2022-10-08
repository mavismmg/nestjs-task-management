import { EntityRepository, Repository } from "typeorm";
import { TaskPriority } from "./task-priority.entity";

@EntityRepository(TaskPriority)
export class TasksPriorityRepository extends Repository<TaskPriority> {
  // TODO: repository methods.
}