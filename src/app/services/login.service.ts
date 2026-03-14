import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  showLoginDialog = signal<boolean>(false);
  private activeUser = signal<String>("default");

  setActiveUser(user: String) {
    this.activeUser.set(user);
  }

  getActiveUser() {
    return this.activeUser().toString();
  }

}
