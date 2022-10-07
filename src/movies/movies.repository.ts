import { EntityRepository, Repository } from "typeorm";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { MovieStatus } from "./movie-status.enum";
import { MovieTypes } from "./movie-type.enum";
import { Movie } from "./movies.entity";

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, episode } = createMovieDto;
    const movie = this.create({
      title,
      type: MovieTypes.MOVIE,
      status: MovieStatus.WATCHING,
      episode,
    });
    await this.save(movie);
    return movie;
  }
}