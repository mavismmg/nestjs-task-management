import { User } from '../auth/user.entity';
import { TaskPriority } from '../tasks-priority/task-priority.entity';
import { EntityRepository, IsNull, Not, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository', true);

  async getTasks(filterDto: GetTasksFilterDto, user: User, taskPriority: TaskPriority): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User, taskPriority: TaskPriority): Promise<Task> {
    const { title, description } = createTaskDto;
    this.logger.warn('About to create a task.');
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
      taskPriority,
    });

    try {
      await this.save(task);
      return task;
    } catch (error) {
      this.logger.error(
        `Failed to create tasks for user "${user.username}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
