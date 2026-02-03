import {Component} from '@angular/core';
import {Panel} from 'primeng/panel';
import {SettingsDialog} from '../popup/settingsdialog/settings.dialog';
import {DescriptionComponent} from './description/description.component';
import {Splitter} from 'primeng/splitter';
import {PrimeTemplate} from 'primeng/api';
import {BookTreeComponent} from './book-tree/book-tree.component';

@Component({
  selector: 'app-center',
  imports: [
    Panel,
    SettingsDialog,
    DescriptionComponent,
    Splitter,
    PrimeTemplate,
    BookTreeComponent
  ],
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {

}
