import { Component } from '@angular/core';
import {Panel} from 'primeng/panel';
import {FileTreeComponent} from './filetree/file-tree.component';
import {SettingsDialog} from '../popup/settingsdialog/settings.dialog';

@Component({
  selector: 'app-center',
  imports: [
    Panel,
    FileTreeComponent,
    SettingsDialog
  ],
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {

}
