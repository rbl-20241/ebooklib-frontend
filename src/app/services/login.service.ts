import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  DEFAULT_USER = "default";

  showLoginDialog = signal<boolean>(false);
  activeUser = signal<string>(this.DEFAULT_USER);
  isDefaultUser = computed(() => this.activeUser() === this.DEFAULT_USER);

  setActiveUser(user: string) {
    this.activeUser.set(user);
  }

  getActiveUser() {
    if (this.isDefaultUser()) {
      return "Niet aangemeld";
    } else {
      return `Aangemeld als ${this.activeUser()}`;
    }
  }

}
