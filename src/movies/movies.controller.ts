import { Controller } from "@nestjs/common";
import { MoviesService } from "./movies.service";

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) { }

  // TODO: movies crude.
} 