import {Component} from '@angular/core';
import {TopComponent} from './top/top.component';
import {BookTreeComponent} from './center/book-tree/book-tree.component';
import {DescriptionComponent} from './center/description/description.component';
import {Splitter} from 'primeng/splitter';
import {PrimeTemplate} from 'primeng/api';
import {BottomComponent} from './bottom/bottom.component';

@Component({
  selector: 'app-root',
  imports: [
    TopComponent,
    BookTreeComponent,
    DescriptionComponent,
    Splitter,
    PrimeTemplate,
    BottomComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
