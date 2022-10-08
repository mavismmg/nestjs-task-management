import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { Movie } from "./movies.entity";
import { MoviesService } from "./movies.service";
import { AuthGuard } from '@nestjs/passport';
import { GetMoviesFilterDto } from "./dto/get-movies-filter.dto";
import { UpdateMovieStatusDto } from "./dto/update-movie-status.dto";
import { UpdateMovieTypeDto } from "./dto/update-movie-type.dto";

@Controller('movie')
//@UseGuards(AuthGuard())
export class MoviesController {
  constructor(private moviesService: MoviesService) { }

  @Get()
  public getMovies(@Query() filterDto: GetMoviesFilterDto): Promise<Movie[]> {
    return this.moviesService.getMovies(filterDto);
  }

  @Get('/:id')
  async getMovieById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  public createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Patch('/:id/status')
  async updateMovieStatus(
    @Param('id') id: string,
    @Body() updateMovieStatusDto: UpdateMovieStatusDto,
  ): Promise<Movie> {
    const { status } = updateMovieStatusDto;
    return this.moviesService.updateMovieStatus(id, status);
  }

  @Patch('/:id/type')
  async updateMovieType(
    @Param('id') id: string,
    @Body() updateMovieTypeDto: UpdateMovieTypeDto,
  ): Promise<Movie> {
    const { type } = updateMovieTypeDto;
    return this.moviesService.updateMovieType(id, type);
  }

  @Patch('/:id/episode')
  async updateMovieEpisode(@Param('id') id: string, @Body() episode: number): Promise<Movie> {
    return this.moviesService.updateMovieEpisode(id, episode);
  }

  @Delete('/:id')
  async deleteMovie(@Param('id') id: string): Promise<void> {
    return this.moviesService.deleteMovie(id);
  }
} 