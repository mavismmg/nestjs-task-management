import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../auth/user.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { GetMoviesFilterDto } from "./dto/get-movies-filter.dto";
import { MovieStatus } from "./movie-status.enum";
import { MovieTypes } from "./movie-type.enum";
import { Movie } from "./movies.entity";
import { MoviesRepository } from "./movies.repository";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private moviesRepository: MoviesRepository,
  ) { }

  public getMovies(filterDto: GetMoviesFilterDto, user: User): Promise<Movie[]> {
    return this.moviesRepository.getMovies(filterDto, user);
  }

  async getMovieById(id: string, user: User): Promise<Movie> {
    const found = await this.moviesRepository.findOne({
      where: {
        id: id,
        user: user,
      },
    });
    if (!found) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }
    return found;
  }

  public createMovie(createMovieDto: CreateMovieDto, user: User): Promise<Movie> {
    return this.moviesRepository.createMovie(createMovieDto, user);
  }

  async updateMovieStatus(id: string, status: MovieStatus, user: User): Promise<Movie> {
    const movie = await this.getMovieById(id, user);
    movie.status = status;
    await this.moviesRepository.save(movie);
    return movie;
  }

  async updateMovieType(id: string, type: MovieTypes, user: User): Promise<Movie> {
    const movie = await this.getMovieById(id, user);
    movie.type = type;
    await this.moviesRepository.save(movie);
    return movie;
  }

  async updateMovieEpisode(id: string, episode: number, user: User): Promise<Movie> {
    const movie = await this.getMovieById(id, user);
    movie.episode = episode;
    await this.moviesRepository.save(movie);
    return movie;
  }

  async deleteMovie(id: string, user: User): Promise<void> {
    const found = await this.moviesRepository.delete({ id, user });
    if (found.affected === 0) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }
  }
}