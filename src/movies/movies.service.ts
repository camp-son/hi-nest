import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie: Movie) => movie.id === +id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }

    return movie;
  }

  deleteOne(id: string): void {
    this.getOne(id);
    this.movies = this.movies.filter((movie: Movie) => movie.id !== +id);
  }

  createMovie(movie) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movie,
    });
  }

  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
