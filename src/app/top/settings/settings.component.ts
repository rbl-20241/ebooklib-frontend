import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Image} from 'primeng/image';
import {SettingService} from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  imports: [
    Image
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  private settingsService = inject(SettingService);

  onClickSettings() {
    this.settingsService.showSettingsDialog();
  }
}
