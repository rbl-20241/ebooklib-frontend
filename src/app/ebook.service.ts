import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {Book} from './data/book.model';

@Injectable({
  providedIn: 'root',
})
export class EBookService {
  private httpClient = inject(HttpClient);

  loadAvailableBooks() {
    return this.getBooks('http://localhost:8080/booktree',
      'Fout met ophalen van boeken. Probeer het nog een keer.');
  }

  private getBooks(url: string, errorMessage: string) {
    return this.httpClient
      .get<{books: Book[]}>(url)
      .pipe(
        map((resData) => resData.books),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(errorMessage));
        })
      )
  }

}
