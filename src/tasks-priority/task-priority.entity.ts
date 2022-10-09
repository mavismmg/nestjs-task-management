import { Task } from "src/tasks/task.entity";
import { Check, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskPriorityLevel } from "./task-priority-level.enum";

@Entity()
export class TaskPriority {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  level: TaskPriorityLevel;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((_type) => Task, (task) => task.taskPriority, { eager: true })
  tasks: Task[];
}