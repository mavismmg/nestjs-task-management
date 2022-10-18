import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  //@IsInt()
  @Type(() => Number)
  episode: number;
}