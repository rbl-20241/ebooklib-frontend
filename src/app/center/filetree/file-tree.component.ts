import {Component, inject, OnInit, signal} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {Tree} from 'primeng/tree';
import {Panel} from 'primeng/panel';
import {FileTreeService} from './file-tree.service';

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
  private fileTreeService = inject(FileTreeService);
  isReading = signal(false);


  ngOnInit() {
    this.isReading.set(true);
    this.fileTreeService.getBookTree().then((data) => this.books = data);
    this.isReading.set(false);
  }

  onBookSelected() {
    console.log(this.selectedBook.label + " geselecteerd")
  }
}
