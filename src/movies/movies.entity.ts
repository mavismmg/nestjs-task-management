import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MovieStatus } from "./movie-status.enum";
import { MovieTypes } from "./movie-type.enum";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  type: MovieTypes;

  @Column()
  status: MovieStatus;

  @Column()
  episode: number;
}