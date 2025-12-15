import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {TreeNode} from 'primeng/api';
import {firstValueFrom} from 'rxjs';
import {GenreTree} from '../../data/genretree.model';
import {Book} from '../../data/book.model';
import {Metadata} from '../../data/metadata.model';

@Injectable({providedIn: 'root'})
export class FileTreeService {

  constructor(private http: HttpClient) { }
  private metadata: Metadata | undefined;

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
      label: genre.genreName,
      data: genre,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: genre.ebooks.map((book) => this.bookToTreeNode(book))
    }
  }

  bookToTreeNode(book: Book): TreeNode {
    return {
      label: book.author + ' - ' + book.title,
      data: book,
      icon: 'pi pi-file',
    }
  }

  async getBookInfo(id: string) {
    this.metadata = await firstValueFrom(
      this.http.get<any>('http://localhost:8080/book/' + id)
    );
    console.log(this.metadata);
  }

  public getMetadata() {
    return this.metadata;
  }

  public getTitle() {
    return this.metadata?.title;
  }
}
