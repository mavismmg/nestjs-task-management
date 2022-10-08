import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { GetMoviesFilterDto } from "./dto/get-movies-filter.dto";
import { MoviesErrorCode } from "./movie-error-code.enum";
import { MovieStatus } from "./movie-status.enum";
import { MovieTypes } from "./movie-type.enum";
import { Movie } from "./movies.entity";

class MoviesRepositoryErrorHandling {
  public exceptionMovieAlreadyExists(errorCode: string): void {
    if (errorCode === MoviesErrorCode.MOVIE_EXISTS) {
      throw new ConflictException('Movie already exists');
    } else {
      throw new InternalServerErrorException();
    }
  }
  // TODO: other error exceptions.
}

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  moviesRepositoryErrorHandling = new MoviesRepositoryErrorHandling();

  async getMovies(filterDto: GetMoviesFilterDto, user: User): Promise<Movie[]> {
    const { status, search, type } = filterDto;
    const query = this.createQueryBuilder('movie');
    query.where({ user });
    if (status) {
      query.andWhere('movie.status = :status', { status });
    }
    if (type) {
      query.andWhere('movie.type = :type', { type });
    }
    if (search) {
      query.andWhere(
        '(LOWER(movie.title) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const movies = await query.getMany();
    return movies;
  }

  async createMovie(createMovieDto: CreateMovieDto, user: User): Promise<Movie> {
    const { title, episode } = createMovieDto;
    const movie = this.create({
      title,
      type: MovieTypes.MOVIE,
      status: MovieStatus.WATCHING,
      episode,
      user,
    });
    try {
      await this.save(movie);
    } catch (error) {
      this.moviesRepositoryErrorHandling.exceptionMovieAlreadyExists(error.code);
    }
    return movie;
  }
}