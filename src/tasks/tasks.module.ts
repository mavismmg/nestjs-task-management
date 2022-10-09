import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([TasksRepository])
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }
