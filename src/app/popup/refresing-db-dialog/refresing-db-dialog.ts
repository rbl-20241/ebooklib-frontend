import {Component, computed, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Image} from 'primeng/image';
import {EbookService} from '../../services/ebook.service';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {RefreshState} from '../../models/refresh-state';

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
  private ebookService = inject(EbookService);
  refreshState = this.ebookService.refreshState;
  errorMessage = this.ebookService.errorMessage;

  RefreshState = RefreshState;

  displayRefreshingDbDialog = computed(() =>
    this.refreshState() === RefreshState.LOADING ||
    this.refreshState() === RefreshState.ERROR
  );

  cancel() {
    this.ebookService.refreshState.set(RefreshState.IDLE);
  }
}
