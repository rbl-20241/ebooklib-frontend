import {Component, signal} from '@angular/core';
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
  displaySettingsDialog = signal(false);

  displayDialog(value : boolean) {
    this.displaySettingsDialog.update(value => value)
    this.displaySettingsDialog.set(value);
    console.log("displayDialog: " + value);
  }

}
