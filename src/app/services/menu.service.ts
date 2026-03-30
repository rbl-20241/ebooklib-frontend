import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  showLoginDialog = signal<boolean>(false);
  showLogonDialog = signal<boolean>(false);
  showProfileDialog = signal<boolean>(false);
  showUserDialog = signal<boolean>(false);
  showMainDialog = signal<boolean>(false);
  showYesNoDbDialog = signal<boolean>(false);
  showRefreshingDbDialog = signal<boolean>(false);
  showAboutDialog = signal<boolean>(false);
}
