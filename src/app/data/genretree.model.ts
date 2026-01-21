import {Book} from './book.model';

export interface GenreTree {
  genreId: string;
  genreName: string;
  ebooks: Book[]
}
