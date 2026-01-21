import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

import {TreeNode} from 'primeng/api';
import {firstValueFrom} from 'rxjs';
import {GenreTree} from '../data/genretree.model';
import {Book} from '../data/book.model';
import {Metadata} from '../data/metadata.model';
import {Send} from '../data/send.model';

@Injectable({providedIn: 'root'})
export class EbookService {

  private http = inject(HttpClient);
  private metadata: Metadata | undefined;
  private coverImageURL = "";
  private id: string | undefined;

  async getBookTree(): Promise<TreeNode[]> {
    const genreTree = await firstValueFrom(
      this.http.get<any>('http://localhost:8080/booktree')
    );
    return this.readGenres(genreTree.data) as TreeNode[];
  }

  readGenres(genres: GenreTree[]) {
    return genres.map((genre) => this.genreToTreeNode(genre))
  }

  genreToTreeNode(genre: GenreTree): TreeNode {
    return {
      key: genre.genreId,
      label: genre.genreName,
      data: genre,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: genre.ebooks.map((book) => this.bookToTreeNode(book)),
      selectable: false
    }
  }

  bookToTreeNode(book: Book): TreeNode {
    let label = book.author ? book.author + ' - ' + book.title : book.title;
    return {
      key: book.id,
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
    const blob = new Blob([bytes], { type: 'image/jpeg' });
    this.coverImageURL = URL.createObjectURL(blob);
  }

  async getBookInfo(id: string) {
    this.metadata = await firstValueFrom(
      this.http.get<any>('http://localhost:8080/book/' + id)
    );
  }

  async copyBook(payload: Send) {
    await firstValueFrom(
      this.http.post('http://localhost:8080/book/copy', payload)
    )
  }

  async mailBook(payload: Send) {
    await firstValueFrom(
      this.http.post('http://localhost:8080/book/mail', payload)
    )
  }

  public getMetadata() {
    return this.metadata;
  }

  public getCoverImage() {
    return this.coverImageURL;
  }

  public getId() {
    return this.id;
  }

  public getTitle() {
    return this.metadata?.title;
  }

  public getAuthors() {
    return this.metadata?.authors;
  }

  public getFirstAuthor() {
    return this.metadata?.authors[0];
  }

  public isButtonDisabled() {
    return this.getId() == undefined;
  }

}
