import {Component, inject} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {SettingService} from '../top/settings/settings.service';
import {Panel} from 'primeng/panel';
import {EbookService} from '../center/ebook.service';

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
    if (metadata) {
      let search = metadata.title + "+" + metadata.author;
      search = search.replaceAll(" ", "+");
      const url = this.GOOGLE_SEARCH_URL + "?q=" + search;
      window.open(url, '_blank');
    }

  }
}
