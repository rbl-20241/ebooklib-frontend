import {Component, inject, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {Tree} from 'primeng/tree';
import {EbookService} from '../../services/ebook.service';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-booktree',
  templateUrl: './book-tree.component.html',
  styleUrls: ['./book-tree.component.css'],
  imports: [Tree, ProgressSpinner],
  providers: [BookTreeComponent]
})
export class BookTreeComponent implements OnInit {
  selectedBook!: TreeNode;
  private ebookService = inject(EbookService);
  books = this.ebookService.books;
  isReading = this.ebookService.isLoading;

  ngOnInit() {
    this.ebookService.loadBookTree();
  }

  async onBookSelected() {
    await this.ebookService.getCoverImageURL(this.selectedBook.data.bookId);
    await this.ebookService.getBookInfo(this.selectedBook.data.bookId);
  }
}
