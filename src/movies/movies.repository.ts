import { EntityRepository, Repository } from "typeorm";
import { Movie } from "./movies.entity";

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  // TODO: important repository logic for crude.
}