import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { Movie } from "./movies.entity";
import { MoviesService } from "./movies.service";

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) { }

  @Get('/:id')
  async getMovieById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  public createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto);
  }
} 