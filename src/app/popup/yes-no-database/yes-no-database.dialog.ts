import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {SettingService} from '../../services/settings.service';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {EbookService} from '../../services/ebook.service';

@Component({
  selector: 'app-yes-no-database',
  imports: [
    Dialog,
    ButtonDirective,
    Ripple,
    ButtonLabel,
    ButtonIcon
  ],
  templateUrl: './yes-no-database.dialog.html',
  styleUrl: './yes-no-database.dialog.css',
})
export class YesNoDatabaseDialog {
  private settingsService = inject(SettingService);
  private ebookService = inject(EbookService);
  displayYesNoDbDialog = this.settingsService.showYesNoDbSettings;
  changeColor = true;

  cancel() {
    this.displayYesNoDbDialog.set(false);
  }

  async save() {
    await this.ebookService.refreshDatabase();
    this.displayYesNoDbDialog.set(false);
  }

}
