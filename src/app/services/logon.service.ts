import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogonService {
  private showDialog = signal<boolean>(false);
  showLogon = this.showDialog;

  showLogonDialog() {
    this.showDialog.set(true);
  }

}
