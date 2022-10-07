import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesController } from "./movies.controller";
import { MoviesRepository } from "./movies.repository";
import { MoviesService } from "./movies.service";

@Module({
  imports: [TypeOrmModule.forFeature([MoviesRepository])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule { }