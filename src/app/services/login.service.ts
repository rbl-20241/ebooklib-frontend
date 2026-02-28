import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private showDialog = signal<boolean>(false);
  private activeUser = signal<String>("default");
  showLogin = this.showDialog;

  showLoginDialog() {
    this.showDialog.set(true);
  }

  setActiveUser(user: String) {
    this.activeUser.set(user);
  }

  getActiveUser() {
    return this.activeUser().toString();
  }

}
