import {Book} from './book.model';

export interface Genre {
  genreId: string;
  genreName: string;
  eBooks: Book[]
}
