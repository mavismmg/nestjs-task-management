import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne((_type) => User, (user) => user.movies, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}