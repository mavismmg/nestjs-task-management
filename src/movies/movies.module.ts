import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { MoviesController } from "./movies.controller";
import { MoviesRepository } from "./movies.repository";
import { MoviesService } from "./movies.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([MoviesRepository])
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule { }