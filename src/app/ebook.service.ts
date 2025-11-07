import {inject, Injectable} from '@angular/core';
import {SettingsDialog} from './popup/settingsdialog/settings.dialog';

@Injectable({
  providedIn: 'root'
})
export class EbookService {
  public displaySettingsDialog = true;
  private settingsDialog = inject(SettingsDialog);

  showSettingsDialog(value: boolean) {
    console.log("EBookService.showSettingsDialog: " + value);
    this.settingsDialog.displaySettingsDialog = value;
  }


}
