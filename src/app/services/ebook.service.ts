import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {firstValueFrom} from 'rxjs';
import {Book} from '../models/book.model';
import {Metadata} from '../models/metadata.model';
import {Send} from '../models/send.model';
import {Genre} from '../models/genre.model';
import {RefreshState} from '../models/refresh-state';

@Injectable({providedIn: 'root'})
export class EbookService {

  private http = inject(HttpClient);
  metadata = signal<Metadata | undefined>(undefined);
  private coverImageURL = "";
  private id: string | undefined;
  books = signal<TreeNode[]>([]);
  isLoading = signal(false);
  searchArgument = signal("");
  errorMessage = signal<string | null>(null);
  refreshState = signal<RefreshState>(RefreshState.IDLE);

  async loadBookTree() {
    try {
      this.isLoading.set(true);
      const tree = await firstValueFrom(
        this.http.get<Genre[]>('http://localhost:8080/booktree')
      );
      this.books.set(this.readGenres(tree) as TreeNode[]);
    } finally {
      this.isLoading.set(false);
    }
  }

  async refreshDatabase() {
    this.errorMessage.set(null);
    this.refreshState.set(RefreshState.LOADING);

    try {
      await firstValueFrom(
        this.http.get('http://localhost:8080/refresh-booktree')
      );

      await this.loadBookTree();
      this.refreshState.set(RefreshState.SUCCESS);

    } catch (error) {
      const httpError = error as HttpErrorResponse;

      if (httpError.error?.message) {
        this.errorMessage.set(httpError.error.message);
      } else {
        this.errorMessage.set("Er is iets fout gegaan bij het verwerken van de boeken.");
      }

      console.log(`${httpError.status}: ${httpError.error?.message}`);
      this.refreshState.set(RefreshState.ERROR);
    }
  }

  readGenres(genres: Genre[]) {
    return genres.map((genre) => this.genreToTreeNode(genre))
  }

  genreToTreeNode(genre: Genre): TreeNode {
    return {
      key: genre.genreId,
      label: genre.genreName,
      data: genre,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: genre.eBooks.map((book) => this.bookToTreeNode(book)),
      selectable: false
    }
  }

  bookToTreeNode(book: Book): TreeNode {
    let label = book.author ? book.author + ' - ' + book.title : book.title;
    return {
      key: book.bookId,
      label: label,
      data: book,
      icon: 'pi pi-file',
      selectable: true
    }
  }

  async getCoverImageURL(id: string) {
    this.id = id;
    const response = await fetch('http://localhost:8080/coverimage/' + id);
    const buffer = await response.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const blob = new Blob([bytes], {type: 'image/jpeg'});
    this.coverImageURL = URL.createObjectURL(blob);
  }

  async getBookInfo(id: string) {
    this.id = id;
    const result = await firstValueFrom(
      this.http.get<Metadata>('http://localhost:8080/book/' + id)
    );

    this.metadata.set(result);
  }

  async copyBook(payload: Send) {
    await firstValueFrom(
      this.http.post('http://localhost:8080/book/copy', payload)
    )
  }

  mailBook(send: Send) {
    return this.http.post('http://localhost:8080/book/mail', send);
  }

  async search(where: string | undefined, params: HttpParams) {
    try {
      this.isLoading.set(true);
      const tree = await firstValueFrom(
        this.http.get<Genre[]>('http://localhost:8080/search/' + where, {params})
      );
      this.books.set(this.readGenres(tree) as TreeNode[]);
    } finally {
      this.isLoading.set(false);
    }
  }

  public getCoverImage() {
    return this.coverImageURL;
  }

  public getId() {
    return this.id;
  }

  public getTitle() {
    return this.metadata()?.title;
  }

  public getFirstAuthor() {
    return this.metadata()?.authors[0];
  }

  public isButtonDisabled() {
    return this.getId() == undefined;
  }

}
