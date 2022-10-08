import { IsEnum, IsOptional, IsString } from "class-validator";
import { MovieStatus } from "../movie-status.enum";
import { MovieTypes } from "../movie-type.enum";

export class GetMoviesFilterDto {
  @IsOptional()
  @IsEnum(MovieStatus)
  status?: MovieStatus;

  @IsOptional()
  @IsEnum(MovieTypes)
  type?: MovieTypes;

  @IsOptional()
  @IsString()
  search?: string;
}