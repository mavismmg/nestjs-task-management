import { Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Tvshow } from "./tvshow.entity";

@EntityRepository(Tvshow)
export class TvshowRepository extends Repository<Tvshow> {
  private logger = new Logger('TvshowRepository', true);

  // Todo: methods.
}