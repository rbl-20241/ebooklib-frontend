import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {SettingService} from '../../top/settings/settings.service';

@Component({
  selector: 'app-settingsdialog',
  imports: [
    Dialog,
  ],
  templateUrl: './settings.dialog.html',
  styleUrl: './settings.dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsDialog {
  private settingsService = inject(SettingService);
  displaySettingsDialog = this.settingsService.showSettings;

  cancel() {
    this.displaySettingsDialog.set(false);
  }
}
