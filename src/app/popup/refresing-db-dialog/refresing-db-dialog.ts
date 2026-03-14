import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {SettingsService} from '../../services/settings.service';
import {Image} from 'primeng/image';
import {EbookService} from '../../services/ebook.service';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'app-refresing-db-dialog',
  imports: [
    Dialog,
    Image,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    Ripple
  ],
  templateUrl: './refresing-db-dialog.html',
  styleUrl: './refresing-db-dialog.css',
})
export class RefresingDbDialog {
  private settingsService = inject(SettingsService);
  private ebookService = inject(EbookService);
  displayRefreshingDbDialog = this.settingsService.showRefreshingDbDialog;
  errorMessage = this.ebookService.errorMessage;

  cancel() {
    console.log("cancel");
    this.displayRefreshingDbDialog.set(false);
  }



}
