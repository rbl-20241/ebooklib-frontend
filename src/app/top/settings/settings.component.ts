import {Component, inject} from '@angular/core';
import {Image} from 'primeng/image';
import {SettingsDialog} from '../../popup/settingsdialog/settings.dialog';

@Component({
  selector: 'app-settings',
  imports: [
    Image,
    SettingsDialog
  ],
  providers: [
    SettingsDialog
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  settingsDialog = inject(SettingsDialog);

  showSettingsDialog(value: boolean) {
    this.settingsDialog.displayDialog(value);
  }

}
