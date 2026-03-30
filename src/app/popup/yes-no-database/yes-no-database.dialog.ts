import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {EbookService} from '../../services/ebook.service';
import {RefresingDbDialog} from '../refresing-db-dialog/refresing-db-dialog';
import {MenuService} from '../../services/menu.service';

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
  private menuService = inject(MenuService);
  private ebookService = inject(EbookService);
  visibleYesNoDb = this.menuService.showYesNoDbDialog;
  visibleRefreshingDb = this.menuService.showRefreshingDbDialog;

  cancel() {
    this.visibleYesNoDb.set(false);
  }

  async save() {
    this.visibleYesNoDb.set(false);
    this.visibleRefreshingDb.set(true);
    await this.ebookService.refreshDatabase();
  }

}
