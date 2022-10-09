import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { TaskPriority } from '../tasks-priority/task-priority.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) { }

  getTasks(filterDto: GetTasksFilterDto, user: User, taskPriority: TaskPriority): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user, taskPriority);
  }

  async getTaskById(id: string, user: User, taskPriority: TaskPriority): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: {
        id: id,
        user: user,
        taskPriority: taskPriority,
      },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User, taskPriority: TaskPriority): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user, taskPriority);
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User, taskPriority: TaskPriority): Promise<Task> {
    const task = await this.getTaskById(id, user, taskPriority);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string, user: User, taskPriority: TaskPriority): Promise<void> {
    const found = await this.tasksRepository.delete({ id, user, taskPriority });
    if (found.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
