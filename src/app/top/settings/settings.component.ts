import {Component, inject} from '@angular/core';
import { Image } from 'primeng/image';
import {SettingsDialog} from '../../popup/settingsdialog/settings.dialog';
import {EbookService} from '../../ebook.service';

@Component({
  selector: 'app-settings',
  imports: [
    Image
  ],
  providers: [
    EbookService,
    SettingsDialog
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  private ebookService = inject(EbookService);
  private settingsDialog = inject(SettingsDialog);

  showSettingsDialog(value: boolean) {
    console.log("Settings clicked");
    this.settingsDialog.displaySettingsDialog = true;

    // this.ebookService.showSettingsDialog(value);
  }

}
