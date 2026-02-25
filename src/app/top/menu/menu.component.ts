import {Component, inject} from '@angular/core';
import {Popover} from 'primeng/popover';
import {MenuItem} from 'primeng/api';
import {SettingService} from '../../services/settings.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [Popover],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private settingsService = inject(SettingService);

  items: MenuItem[] = [
    { label: 'Login', icon: 'pi pi-sign-in', target: 'login' },
    { label: 'Instellingen', icon: 'pi pi-wrench', target: 'settings' },
    { label: 'Over', icon: 'pi pi-info-circle', target: 'about' }
  ];

  navigate(item: MenuItem, popover: any) {
    popover.hide();

    if (item.target == 'settings') {
      this.settingsService.showSettingsDialog();
    }
  }
}
