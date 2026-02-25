import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private showDialog = signal<boolean>(false);
  showAbout = this.showDialog;

  showAboutDialog() {
    this.showDialog.set(true);
  }

}
