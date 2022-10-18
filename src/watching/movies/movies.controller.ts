import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { Movie } from "./movies.entity";
import { MoviesService } from "./movies.service";
import { AuthGuard } from '@nestjs/passport';
import { GetMoviesFilterDto } from "./dto/get-movies-filter.dto";
import { UpdateMovieStatusDto } from "./dto/update-movie-status.dto";
import { UpdateMovieTypeDto } from "./dto/update-movie-type.dto";
import { GetUser } from "../../auth/get-user.decorator";
import { User } from "../../auth/user.entity";

@Controller('movie')
@UseGuards(AuthGuard())
export class MoviesController {
  constructor(private moviesService: MoviesService) { }

  @Get()
  public getMovies(@Query() filterDto: GetMoviesFilterDto, @GetUser() user: User): Promise<Movie[]> {
    return this.moviesService.getMovies(filterDto, user);
  }

  @Get('/:id')
  async getMovieById(@Param('id') id: string, @GetUser() user: User): Promise<Movie> {
    return this.moviesService.getMovieById(id, user);
  }

  @Post()
  public createMovie(@Body() createMovieDto: CreateMovieDto, @GetUser() user: User): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto, user);
  }

  @Patch('/:id/status')
  async updateMovieStatus(
    @Param('id') id: string,
    @Body() updateMovieStatusDto: UpdateMovieStatusDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    const { status } = updateMovieStatusDto;
    return this.moviesService.updateMovieStatus(id, status, user);
  }

  @Patch('/:id/type')
  async updateMovieType(
    @Param('id') id: string,
    @Body() updateMovieTypeDto: UpdateMovieTypeDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    const { type } = updateMovieTypeDto;
    return this.moviesService.updateMovieType(id, type, user);
  }

  @Patch('/:id/episode')
  async updateMovieEpisode(@Param('id') id: string, @Body() episode: number, @GetUser() user: User): Promise<Movie> {
    return this.moviesService.updateMovieEpisode(id, episode, user);
    // TODO(fix): rout is not updating episode, type error with the ORM. 
  }

  @Delete('/:id')
  async deleteMovie(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.moviesService.deleteMovie(id, user);
  }
} 