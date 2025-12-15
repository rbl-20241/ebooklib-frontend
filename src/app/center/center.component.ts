import { Component } from '@angular/core';
import {Panel} from 'primeng/panel';
import {FileTreeComponent} from './filetree/file-tree.component';
import {SettingsDialog} from '../popup/settingsdialog/settings.dialog';
import {DescriptionComponent} from './description/description.component';
import {Splitter} from 'primeng/splitter';
import {PrimeTemplate} from 'primeng/api';

@Component({
  selector: 'app-center',
  imports: [
    Panel,
    FileTreeComponent,
    SettingsDialog,
    DescriptionComponent,
    Splitter,
    PrimeTemplate
  ],
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {

}
