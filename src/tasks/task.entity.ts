import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { TaskPriority } from '../tasks-priority/task-priority.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne((_type) => TaskPriority, (taskPriority) => taskPriority.tasks, { eager: false })
  taskPriority: TaskPriority;
}
