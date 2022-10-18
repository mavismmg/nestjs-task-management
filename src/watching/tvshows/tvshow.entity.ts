import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TvshowPriority } from "./tvshow-priority.enum";
import { TvshowStatus } from "./tvshow-status.enum";

@Entity()
export class Tvshow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  episode: string;

  @Column()
  status: TvshowStatus;

  @Column()
  priority: TvshowPriority;
}