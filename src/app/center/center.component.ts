import { Component } from '@angular/core';
import {Panel} from 'primeng/panel';
import {FiletreeComponent} from './filetree/filetree.component';

@Component({
  selector: 'app-center',
  imports: [
    Panel,
    FiletreeComponent
  ],
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {

}
