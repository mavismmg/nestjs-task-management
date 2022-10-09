import { Module } from '@nestjs/common';
import { TasksPriorityService } from './tasks-priority.service';
import { TasksPriorityController } from './tasks-priority.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksPriorityRepository } from './tasks-priority.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([TasksPriorityRepository])
  ],
  providers: [TasksPriorityService],
  controllers: [TasksPriorityController]
})
export class TasksPriorityModule { }
