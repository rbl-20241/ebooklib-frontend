import { Component } from '@angular/core';
import {Panel} from 'primeng/panel';
import {FiletreeComponent} from './filetree/filetree.component';
import {SettingsComponent} from '../top/settings/settings.component';

@Component({
  selector: 'app-center',
  imports: [
    Panel,
    FiletreeComponent,
    SettingsComponent
  ],
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {

}
