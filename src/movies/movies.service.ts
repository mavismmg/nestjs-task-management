import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMovieDto } from "./dto/create-movie.dto";
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
}