import {Component, inject} from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {Ripple} from 'primeng/ripple';
import {SettingService} from '../../services/settings.service';
import {CopyService} from '../../services/copy.service';
import {EbookService} from '../../services/ebook.service';
import {MailService} from '../../services/mail.service';

@Component({
  selector: 'app-buttons',
  imports: [
    ButtonDirective,
    Panel,
    Ripple,
    ButtonIcon,
    ButtonLabel
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  private GOOGLE_SEARCH_URL = "https://www.google.nl/search";

  private settingsService = inject(SettingService);
  private copyService = inject(CopyService);
  private mailService = inject(MailService);
  private ebookService = inject(EbookService);

  saveBooksToDatabase() {
    this.settingsService.showYesNoDatabaseDialog();
  }

  searchWithBrowser() {
    const metadata = this.ebookService.getMetadata();
    if (!metadata) return;

    const query = encodeURIComponent(`${metadata.title} ${this.ebookService.getFirstAuthor()}`)
    window.open(`${this.GOOGLE_SEARCH_URL}?q=${query}`, '_blank');
  }

  onClickCopyBook() {
    this.copyService.showCopyDialog();
  }

  onClickMailBook() {
    this.mailService.showMailDialog();
  }

  onClickSearch() {

  }

  isButtonDisabled() {
    return this.ebookService.isButtonDisabled();
  }


}
