import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksPriorityRepository } from './tasks-priority.repository';

@Injectable()
export class TasksPriorityService {
  constructor(
    @InjectRepository(TasksPriorityRepository)
    private tasksPriorityRepository: TasksPriorityRepository,
  ) { }

  // TODO: tasksPriorityRepository crude.
}
