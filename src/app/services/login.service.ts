import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private showDialog = signal<boolean>(false);
  showLogin = this.showDialog;

  showLoginDialog() {
    this.showDialog.set(true);
  }

}
