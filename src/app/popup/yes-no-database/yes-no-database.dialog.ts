import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {SettingsService} from '../../services/settings.service';
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
  private settingsService = inject(SettingsService);
  private ebookService = inject(EbookService);
  visibleYesNoDb = this.settingsService.showYesNoDbDialog;
  visibleRefreshingDb = this.settingsService.showRefreshingDbDialog;

  cancel() {
    this.visibleYesNoDb.set(false);
  }

  async save() {
    this.visibleYesNoDb.set(false);
    this.visibleRefreshingDb.set(true);
    await this.ebookService.refreshDatabase();
    // console.log("hide dialog");
    // this.settingsService.hideRefreshingDatabaseDialog();
  }

}
