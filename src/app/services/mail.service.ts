import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private showDialog = signal<boolean>(false);
  showMail = this.showDialog;

  showMailDialog() {
    this.showDialog.set(true);
  }

}
