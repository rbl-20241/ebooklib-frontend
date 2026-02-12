import {Component} from '@angular/core';
import {Panel} from 'primeng/panel';
import {CopyDialog} from '../popup/copydialog/copy.dialog';
import {MailDialog} from '../popup/maildialog/mail.dialog';
import {SearchDialog} from '../popup/searchdialog/search.dialog';
import {ButtonsComponent} from './buttons/buttons.component';

@Component({
    selector: 'app-bottom',
    templateUrl: './bottom.component.html',
  imports: [
    Panel,
    CopyDialog,
    MailDialog,
    SearchDialog,
    ButtonsComponent,
  ],
    styleUrl: './bottom.component.css'
})
export class BottomComponent {

}
