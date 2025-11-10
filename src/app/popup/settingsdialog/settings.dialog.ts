import {Component, Input} from '@angular/core';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-settingsdialog',
  imports: [
    Dialog
  ],
  templateUrl: './settings.dialog.html',
  styleUrl: './settings.dialog.css'
})
export class SettingsDialog {
  @Input() displaySettingsDialog = true;

}
