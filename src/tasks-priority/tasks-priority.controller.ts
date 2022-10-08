import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksPriorityService } from './tasks-priority.service';

@Controller('tasks-priority')
@UseGuards(AuthGuard())
export class TasksPriorityController {
  constructor(private tasksPriorityService: TasksPriorityService) { }

  // TODO: tasksPriorityService crude methods.
}
