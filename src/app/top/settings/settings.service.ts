import { Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private showDialog = signal<boolean>(false);
  showSettings = this.showDialog;

  showSettingsDialog() {
    this.showDialog.update((value) => !value);
  }

}
