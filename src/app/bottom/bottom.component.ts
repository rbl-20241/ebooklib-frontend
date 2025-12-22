import {Component} from '@angular/core';
import {Panel} from 'primeng/panel';
import {ButtonsComponent} from './buttons/buttons.component';
import {CopyDialog} from '../popup/copydialog/copy.dialog';

@Component({
    selector: 'app-bottom',
    templateUrl: './bottom.component.html',
  imports: [
    Panel,
    ButtonsComponent,
    CopyDialog,
  ],
    styleUrl: './bottom.component.css'
})
export class BottomComponent {

}
