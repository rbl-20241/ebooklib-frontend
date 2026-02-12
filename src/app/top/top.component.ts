import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {Panel} from 'primeng/panel';
import {SettingsComponent} from './settings/settings.component';
import {SettingsDialog} from '../popup/settingsdialog/settings.dialog';

@Component({
  selector: 'app-top',
  imports: [
    HeaderComponent,
    Panel,
    SettingsComponent,
    SettingsDialog
  ],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {

}
