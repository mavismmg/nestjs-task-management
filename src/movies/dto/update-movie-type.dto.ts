import { IsEnum } from "class-validator";
import { MovieTypes } from "../movie-type.enum";

export class UpdateMovieTypeDto {
  @IsEnum(MovieTypes)
  type: MovieTypes;
}