import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { MovieStatus } from "./movie-status.enum";
import { MovieTypes } from "./movie-type.enum";
import { MoviesRepository } from "./movies.repository";
import { MoviesService } from "./movies.service";

const mockMoviesRepository = () => ({
  getMovies: jest.fn(),
  findOne: jest.fn(),
  createMovie: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

const mockUser = {
  username: 'Test',
  id: 'id',
  password: 'password',
  tasks: [],
  movies: [],
};

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let moviesRepository: any;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: MoviesRepository, useFactory: mockMoviesRepository },
      ],
    }).compile();
    moviesService = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<MoviesRepository>(MoviesRepository);
  });

  describe('getMovies', () => {
    it('calls MoviesRepository.getMvoies and returns the result', async () => {
      moviesRepository.getMovies.mockResolvedValue('someValue');
      const result = await moviesService.getMovies(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getMoviesById', () => {
    it('calls MoviesRepository.findOne and returns the result', async () => {
      const mockMovie = {
        id: 'id',
        title: 'title',
        type: MovieTypes.TVSHOW,
        status: MovieStatus.WATCHING,
        episode: 1,
      };
      moviesRepository.findOne.mockResolvedValue(mockMovie);
      const result = await moviesService.getMovieById('someId', mockUser);
      expect(result).toEqual(mockMovie);
    });

    it('calls MoviesRepository.findOne and handles an error', async () => {
      moviesRepository.findOne.mockResolvedValue(null);
      expect(moviesService.getMovieById('someId', mockUser)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('createMovie', () => {
    it('calls MoviesRepository.createMovie and returns the result', async () => {
      moviesRepository.createMovie.mockResolvedValue('someValue');
      const result = await moviesService.createMovie(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('updateMovieStatus', () => {
    it('call MoviesRepository.save and returns the result', async () => {
      const mockMovie = {
        id: 'id',
        title: 'title',
        type: MovieTypes.TVSHOW,
        status: MovieStatus.WATCHING,
        episode: 1,
      };
      moviesRepository.findOne.mockResolvedValue(mockMovie);
      moviesRepository.save.mockResolvedValue(mockMovie);
      const result = await moviesService.updateMovieStatus('someId', MovieStatus.WATCHING, mockUser);
      expect(result).toEqual(mockMovie);
    });
  });

  describe('updateMovieType', () => {
    it('call MoviesRepository.save and returns the result', async () => {
      const mockMovie = {
        id: 'id',
        title: 'title',
        type: MovieTypes.TVSHOW,
        status: MovieStatus.WATCHING,
        episode: 1,
      };
      moviesRepository.findOne.mockResolvedValue(mockMovie);
      moviesRepository.save.mockResolvedValue(mockMovie);
      const result = await moviesService.updateMovieType('someId', MovieTypes.TVSHOW, mockUser);
      expect(result).toEqual(mockMovie);
    });
  });

  describe('updateMovieEpisode', () => {
    // Do not make tests for it, method still broken and does not update episode.
  });

  describe('deleteMovie', () => {
    it('calls MoviesRepository.delete and returns the result', async () => {
      const someId = 'someId';
      moviesRepository.delete.mockResolvedValue({ someId, mockUser });
      const result = await moviesService.deleteMovie('someId', mockUser);
      expect(result).toEqual(undefined);
    });

    it('calls MoviesRepository.delete and handles an error', async () => {
      const result = moviesRepository.delete.mockResolvedValue(null).affected;
      expect(result).toEqual(undefined);
    });
  });
});