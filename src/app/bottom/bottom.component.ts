import {Component, inject} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {SettingService} from '../services/settings.service';
import {Panel} from 'primeng/panel';
import {EbookService} from '../services/ebook.service';


@Component({
    selector: 'app-bottom',
    templateUrl: './bottom.component.html',
  imports: [
    ButtonDirective,
    Ripple,
    Panel
  ],
    styleUrl: './bottom.component.css'
})
export class BottomComponent {

  private GOOGLE_SEARCH_URL = "https://www.google.nl/search";

  private settingsService = inject(SettingService);
  private ebookService = inject(EbookService);

  saveBooksToDatabase() {
    this.settingsService.showYesNoDatabaseDialog();
  }

  searchWithBrowser() {
    const metadata = this.ebookService.getMetadata();
    if (!metadata) return;

    const query = encodeURIComponent(`${metadata.title} ${metadata.author}`)
    window.open(`${this.GOOGLE_SEARCH_URL}?q=${query}`, '_blank');
  }

  copyBook() {
    const id = this.ebookService.getId();
    if (!id) return;

    this.ebookService.copyBook(id);
  }
}
