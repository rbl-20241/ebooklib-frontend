import {Component} from '@angular/core';
import {Panel} from 'primeng/panel';
import {ButtonsComponent} from './buttons/buttons.component';
import {CopyDialog} from '../popup/copydialog/copy.dialog';
import {MailDialog} from '../popup/maildialog/mail.dialog';

@Component({
    selector: 'app-bottom',
    templateUrl: './bottom.component.html',
  imports: [
    Panel,
    ButtonsComponent,
    CopyDialog,
    MailDialog,
  ],
    styleUrl: './bottom.component.css'
})
export class BottomComponent {

}
