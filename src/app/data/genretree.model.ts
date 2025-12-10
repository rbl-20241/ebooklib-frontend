import {Book} from './book.model';

export interface GenreTree {
  genreName: string;
  ebooks: Book[]
}
