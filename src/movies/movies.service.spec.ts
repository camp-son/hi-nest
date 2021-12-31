import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    expect(2 + 3).toEqual(5);
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.createMovie({
        title: 'Test movie',
        genres: ['Test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID 1 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete movie', () => {
      service.createMovie({
        title: 'Test movie',
        genres: ['Test'],
        year: 2000,
      });

      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(allMovies.length - 1);
      expect(afterDelete.length).toBeLessThan(allMovies.length);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID 1 not found.');
      }
    });
  });

  describe('createMovie', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'Test movie',
        genres: ['Test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'Test movie',
        genres: ['Test'],
        year: 2000,
      });

      service.update(1, { title: 'Updated movie' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated movie');
    });

    it('should return a Exception', () => {
      try {
        service.update(1, { title: 'Updated movie' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID 1 not found.');
      }
    });
  });
});
