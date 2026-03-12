import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {SettingService} from '../../services/settings.service';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {EbookService} from '../../services/ebook.service';
import {RefresingDbDialog} from '../refresing-db-dialog/refresing-db-dialog';

@Component({
  selector: 'app-yes-no-database',
  imports: [
    Dialog,
    ButtonDirective,
    Ripple,
    ButtonLabel,
    ButtonIcon,
    RefresingDbDialog
  ],
  templateUrl: './yes-no-database.dialog.html',
  styleUrl: './yes-no-database.dialog.css',
})
export class YesNoDatabaseDialog {
  private settingsService = inject(SettingService);
  private ebookService = inject(EbookService);
  displayYesNoDbDialog = this.settingsService.showYesNoDbSettings;

  cancel() {
    this.displayYesNoDbDialog.set(false);
  }

  async save() {
    this.displayYesNoDbDialog.set(false);
    this.settingsService.showRefreshingDatabaseDialog();
    await this.ebookService.refreshDatabase();
    this.settingsService.hideRefreshingDatabaseDialog();
  }

}
