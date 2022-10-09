import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { GetTaskPriority } from '../tasks-priority/get-task-priority.decorator';
import { TaskPriority } from '../tasks-priority/task-priority.entity';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: "${JSON.stringify(filterDto)}"`);
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`User "${user.username}" getting task by id. Task id: "${id}`);
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  public createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    this.logger.verbose(`User "${user.username}" patch a task. Data: ${JSON.stringify(updateTaskStatusDto)}`);
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`Deleting a task from user "${user.username}"`);
    return this.tasksService.deleteTask(id, user);
  }
}
