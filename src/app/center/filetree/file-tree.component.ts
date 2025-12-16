import {Component, inject, OnInit, signal} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {Tree} from 'primeng/tree';
import {Panel} from 'primeng/panel';
import {EbookService} from '../ebook.service';

@Component({
  selector: 'app-filetree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.css'],
  imports: [ Tree, Panel ],
  providers: [ FileTreeComponent ]
})
export class FileTreeComponent implements OnInit {
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
    console.log(this.selectedBook.label + " geselecteerd");
    this.ebookService.getCoverImageURL(this.selectedBook.data.id);
    this.ebookService.getBookInfo(this.selectedBook.data.id);
  }
}
