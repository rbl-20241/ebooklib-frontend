import {Component, computed, inject} from '@angular/core';
import {Popover} from 'primeng/popover';
import {MenuItem} from 'primeng/api';
import {AccountService} from '../../services/account.service';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [Popover],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private accountService = inject(AccountService);
  private menuService = inject(MenuService);

  items = computed<MenuItem[]>(() => [
    { label: 'Aanmelden', icon: 'pi pi-sign-in', target: 'login' },
    { label: 'Profiel bewerken', icon: 'pi pi-pen-to-square', target: 'profile', disabled: this.accountService.isDefaultAccount()},
    { label: 'Algemene instellingen', icon: 'pi pi-wrench', target: 'mainsettings' },
    { label: 'Gebruikersinstellingen', icon: 'pi pi-user-edit', target: 'usersettings' },
    { label: 'Database verversen', icon: 'pi pi-refresh', target: 'refresh_db', disabled: !this.accountService.isDefaultAccount()},
    { divider: true },
    { label: 'Over', icon: 'pi pi-info-circle', target: 'about' }
  ]);

  navigate(item: MenuItem, popover: any) {
    popover.hide();

    if (item.target == 'login') {
      this.menuService.showLoginDialog.set(true);
    }
    if (item.target == 'profile') {
      this.menuService.showProfileDialog.set(true);
    }
    else if (item.target == 'usersettings') {
      this.menuService.showUserDialog.set(true);
    }
    else if (item.target == 'mainsettings') {
      this.menuService.showMainDialog.set(true);
    }
    else if (item.target == 'refresh_db') {
      this.menuService.showYesNoDbDialog.set(true);
    }
    else if (item.target == 'about') {
      this.menuService.showAboutDialog.set(true);
    }
  }

  getActiveUser() {
    if (this.accountService.isDefaultAccount()) {
      return "Niet aangemeld";
    } else {
      return `Aangemeld als ${this.accountService.getActiveAccount().username}`;
    }
  }



}
