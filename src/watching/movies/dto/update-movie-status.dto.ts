import { IsEnum } from "class-validator";
import { MovieStatus } from "../movie-status.enum";

export class UpdateMovieStatusDto {
  @IsEnum(MovieStatus)
  status: MovieStatus;
}