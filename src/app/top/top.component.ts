import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {SettingsComponent} from './settings/settings.component';
import {Panel} from 'primeng/panel';

@Component({
  selector: 'app-top',
  imports: [
    HeaderComponent,
    SettingsComponent,
    Panel
  ],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {

}
