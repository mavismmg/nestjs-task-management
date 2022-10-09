import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskPriorityDto } from './dto/create-task-priority.dto';
import { GetTasksPriorityFilterDto } from './dto/get-tasks-filter.dto';
import { TaskPriority } from './task-priority.entity';
import { TasksPriorityService } from './tasks-priority.service';

@Controller('tasks-priority')
@UseGuards(AuthGuard())
export class TasksPriorityController {
  constructor(private tasksPriorityService: TasksPriorityService) { }

  @Get()
  public getTasksPriority(@Query() filterDto: GetTasksPriorityFilterDto): Promise<TaskPriority[]> {
    return this.tasksPriorityService.getTasksPriority(filterDto);
  }

  @Get('/:id')
  async getTaskPriorityById(@Param('id') id: string): Promise<TaskPriority> {
    return this.tasksPriorityService.getTaskPriorityById(id);
  }

  @Post()
  public createTaskPriority(
    @Body() createTaskPriorityDto: CreateTaskPriorityDto,
  ): Promise<TaskPriority> {
    return this.tasksPriorityService.createTaskPriority(createTaskPriorityDto);
  }
}
