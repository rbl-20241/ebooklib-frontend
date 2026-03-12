import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {SettingService} from '../../services/settings.service';
import {Image} from 'primeng/image';

@Component({
  selector: 'app-refresing-db-dialog',
  imports: [
    Dialog,
    Image
  ],
  templateUrl: './refresing-db-dialog.html',
  styleUrl: './refresing-db-dialog.css',
})
export class RefresingDbDialog {
  private settingsService = inject(SettingService);
  displayRefreshingDbDialog = this.settingsService.showRefreshingDbSettings;

}
