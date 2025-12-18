import { Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private showDialog = signal<boolean>(false);
  showSettings = this.showDialog;
  private showYesNoDbDialog = signal<boolean>(false);
  showYesNoDbSettings = this.showYesNoDbDialog;


  showSettingsDialog() {
    this.showDialog.update((value) => !value);
  }

  showYesNoDatabaseDialog() {
    this.showYesNoDbDialog.update((value) => !value);
  }

}
