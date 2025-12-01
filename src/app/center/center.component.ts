import { Component } from '@angular/core';
import {Panel} from 'primeng/panel';
import {FiletreeComponent} from './filetree/filetree.component';
import {SettingsDialog} from '../popup/settingsdialog/settings.dialog';

@Component({
  selector: 'app-center',
  imports: [
    Panel,
    FiletreeComponent,
    SettingsDialog
  ],
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {

}
