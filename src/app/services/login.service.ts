import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  DEFAULT_USER = "default";

  showLoginDialog = signal<boolean>(false);
  activeUser = signal<string>(this.DEFAULT_USER);

  setActiveUser(user: string) {
    this.activeUser.set(user);
  }

  getActiveUser() {
    if (this.activeUser() === this.DEFAULT_USER) {
      return "Niet aangemeld";
    } else {
      return `Aangemeld als ${this.activeUser().toString()}`;
    }
  }

}
