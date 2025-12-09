import {Component, inject, OnInit, signal} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {Tree} from 'primeng/tree';
import {Panel} from 'primeng/panel';
import {FileTreeService} from './filetree.service';

@Component({
  selector: 'app-filetree',
  templateUrl: './filetree.component.html',
  styleUrls: ['./filetree.component.css'],
  imports: [ Tree, Panel ],
  providers: [ FiletreeComponent ]
})
export class FiletreeComponent implements OnInit {
  files!: TreeNode[];
  selectedBook!: TreeNode;
  // ebooks = signal<EBook[] | undefined>(undefined);
  // error = signal('');
  private filetreeService = inject(FileTreeService);
  // private ebookService = inject(EBookService);
  isReading = signal(false);


  ngOnInit() {
    this.isReading.set(true);
    this.filetreeService.getBookTree().then((data) => this.files = data);
    this.isReading.set(false);

    // this.isReading.set(true);
    // const subscription = this.ebookService.loadAvailableBooks();
    //   // .subscribe({
    //   //   next: (ebooks) => {
    //   //     console.log("init " + ebooks);
    //   //     this.ebooks.set(ebooks);
    //   //   },
    //   //   error: (error: Error) => {
    //   //     this.error.set(error.message)
    //   //   },
    //   //   complete: () => {
    //   //     // this.mapEBooks();
    //   //     this.isReading.set(false);
    //   //   }
    //   // });
    // // this.filetreeService.getBooktree().then((data.old) => this.files = data.old);
    // this.isReading.set(false);
  }

    onBookSelected() {
      console.log(this.selectedBook + " geselecteerd")
    }
}
