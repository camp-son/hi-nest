import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find((movie: Movie) => movie.id === +id);
  }

  deleteOne(id: string): boolean {
    this.movies = this.movies.filter((movie: Movie) => movie.id !== +id);
    return true;
  }

  createMovie(movie) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movie,
    });
  }
}
