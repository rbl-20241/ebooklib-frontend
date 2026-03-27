import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogonService {
  showLogonDialog = signal<boolean>(false);
  // showLogon = this.showDialog;
  //
  // showLogonDialog() {
  //   this.showDialog.set(true);
  // }

}
