import {Component, inject} from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {SettingsService} from '../../services/settings.service';
import {EbookService} from '../../services/ebook.service';
import {ButtonsService} from '../../services/buttons.service';

@Component({
  selector: 'app-buttons',
  imports: [
    ButtonDirective,
    Ripple,
    ButtonIcon,
    ButtonLabel
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  private settingsService = inject(SettingsService);
  private buttonsService = inject(ButtonsService);
  private ebookService = inject(EbookService);

  async searchWithBrowser() {
    const metadata = this.ebookService.metadata();
    if (!metadata) return;

    const query = encodeURIComponent(`${metadata.title} ${this.ebookService.getFirstAuthor()}`)
    const searchUrl = await this.settingsService.getSearchUrl();
    window.open(`${searchUrl}?q=${query}`, '_blank');
  }

  resetBooktree() {
    this.ebookService.loadBookTree();
  }

  onClickCopyBook() {
    this.buttonsService.showCopyDialog();
  }

  onClickMailBook() {
    this.buttonsService.showMailDialog();
  }

  onClickSearch() {
    this.buttonsService.showSearchDialog();
  }

  isButtonDisabled() {
    return this.ebookService.isButtonDisabled();
  }


}
