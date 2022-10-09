import { EntityRepository, Repository } from "typeorm";
import { CreateTaskPriorityDto } from "./dto/create-task-priority.dto";
import { GetTasksPriorityFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskPriorityLevel } from "./task-priority-level.enum";
import { TaskPriority } from "./task-priority.entity";

@EntityRepository(TaskPriority)
export class TasksPriorityRepository extends Repository<TaskPriority> {
  async getTasksPriority(filterDto: GetTasksPriorityFilterDto): Promise<TaskPriority[]> {
    const { level, search } = filterDto;
    const query = this.createQueryBuilder('task-priority');
    if (level) {
      query.andWhere('task-priority.level = :level', { level });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task-priority.created_at) LIKE LOWER(:search) OR LOWER(task-priority.updated_at) LIKE LOWER(:search))',
        { search: `%${search}%` },
      )
    }
    const tasksPriority = await query.getMany();
    return tasksPriority;
  }

  async createTaskPriority(_createTaskPriorityDto: CreateTaskPriorityDto): Promise<TaskPriority> {
    const taskPriority = this.create({
      level: TaskPriorityLevel.SAFE,
      created_at: Date(),
      updated_at: Date(),
    });
    await this.save(taskPriority);
    return taskPriority;
  }
}