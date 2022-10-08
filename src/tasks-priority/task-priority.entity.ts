import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskPriorityLevel } from "./task-priority-level.enum";

@Entity()
export class TaskPriority {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  level: TaskPriorityLevel;

  @Column()
  date: Date;

  @OneToOne((_type) => Task, (task) => task.tasksPriority, { eager: false })
  task: Task;
}