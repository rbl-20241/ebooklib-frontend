import {Component, inject} from '@angular/core';
import {Popover} from 'primeng/popover';
import {MenuItem} from 'primeng/api';
import {SettingsService} from '../../services/settings.service';
import {AboutService} from '../../services/about.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [Popover],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private settingsService = inject(SettingsService);
  private aboutService = inject(AboutService);
  private loginService = inject(LoginService);

  items: MenuItem[] = [
    { label: 'Aanmelden', icon: 'pi pi-sign-in', target: 'login' },
    { label: 'Algemene instellingen', icon: 'pi pi-wrench', target: 'mainsettings' },
    { label: 'Gebruikersinstellingen', icon: 'pi pi-user-edit', target: 'usersettings' },
    { label: 'Database verversen', icon: 'pi pi-refresh', target: 'refresh_db' },
    { label: 'Over', icon: 'pi pi-info-circle', target: 'about' }
  ];

  navigate(item: MenuItem, popover: any) {
    popover.hide();

    if (item.target == 'login') {
      this.loginService.showLoginDialog.set(true);
    }
    else if (item.target == 'mainsettings') {
      this.settingsService.showMainDialog.set(true);
    }
    else if (item.target == 'usersettings') {
      this.settingsService.showUserDialog.set(true);
    }
    else if (item.target == 'refresh_db') {
      this.settingsService.showYesNoDbDialog.set(true);
    }
    else if (item.target == 'about') {
      this.aboutService.showAboutDialog.set(true);
    }
  }

  getActiveUser() {
    return this.loginService.getActiveUser();
  }

}
