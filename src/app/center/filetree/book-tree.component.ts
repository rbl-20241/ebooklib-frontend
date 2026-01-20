import {Component, inject, OnInit, signal} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {Tree} from 'primeng/tree';
import {Panel} from 'primeng/panel';
import {EbookService} from '../../services/ebook.service';

@Component({
  selector: 'app-booktree',
  templateUrl: './book-tree.component.html',
  styleUrls: ['./book-tree.component.css'],
  imports: [Tree, Panel],
  providers: [BookTreeComponent]
})
export class BookTreeComponent implements OnInit {
  books!: TreeNode[];
  selectedBook!: TreeNode;
  private ebookService = inject(EbookService);
  isReading = signal(false);


  ngOnInit() {
    this.isReading.set(true);
    this.ebookService.getBookTree().then((data) => this.books = data);
    this.isReading.set(false);
  }

  onBookSelected() {
    this.ebookService.getCoverImageURL(this.selectedBook.data.id);
    this.ebookService.getBookInfo(this.selectedBook.data.id);
  }
}
