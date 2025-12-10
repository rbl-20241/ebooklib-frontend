import {Book} from './book.model';

export interface GenreTree {
  genre: string;
  ebooks: Book[]
}
