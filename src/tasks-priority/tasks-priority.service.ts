import { Get, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskPriorityDto } from './dto/create-task-priority.dto';
import { GetTasksPriorityFilterDto } from './dto/get-tasks-filter.dto';
import { TaskPriority } from './task-priority.entity';
import { TasksPriorityRepository } from './tasks-priority.repository';

@Injectable()
export class TasksPriorityService {
  constructor(
    @InjectRepository(TasksPriorityRepository)
    private tasksPriorityRepository: TasksPriorityRepository,
  ) { }

  public getTasksPriority(filterDto: GetTasksPriorityFilterDto): Promise<TaskPriority[]> {
    return this.tasksPriorityRepository.getTasksPriority(filterDto);
  }

  async getTaskPriorityById(id: string): Promise<TaskPriority> {
    const taskPriority = await this.tasksPriorityRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!taskPriority) {
      throw new NotFoundException(`TaskPriority with ID "${id}" not found`);
    }
    return taskPriority;
  }

  public createTaskPriority(createTaskPriorityDto: CreateTaskPriorityDto): Promise<TaskPriority> {
    return this.tasksPriorityRepository.createTaskPriority(createTaskPriorityDto);
  }
}
