import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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

  public getMovies(filterDto: GetMoviesFilterDto): Promise<Movie[]> {
    return this.moviesRepository.getMovies(filterDto);
  }

  async getMovieById(id: string): Promise<Movie> {
    const found = await this.moviesRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }
    return found;
  }

  public createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesRepository.createMovie(createMovieDto);
  }

  async updateMovieStatus(id: string, status: MovieStatus): Promise<Movie> {
    const movie = await this.getMovieById(id);
    movie.status = status;
    await this.moviesRepository.save(movie);
    return movie;
  }

  async updateMovieType(id: string, type: MovieTypes): Promise<Movie> {
    const movie = await this.getMovieById(id);
    movie.type = type;
    await this.moviesRepository.save(movie);
    return movie;
  }

  async updateMovieEpisode(id: string, episode: number): Promise<Movie> {
    const movie = await this.getMovieById(id);
    movie.episode = episode;
    await this.moviesRepository.save(movie);
    return movie;
  }

  async deleteMovie(id: string): Promise<void> {
    const found = await this.moviesRepository.delete(id);
    if (found.affected === 0) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }
  }
}