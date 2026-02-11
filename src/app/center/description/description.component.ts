import {Component, effect, inject, signal} from '@angular/core';
import {EbookService} from '../../services/ebook.service';
import {TableModule} from 'primeng/table';
import {ScrollPanel} from 'primeng/scrollpanel';
import {Panel} from 'primeng/panel';
import {Image} from 'primeng/image';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {Divider} from 'primeng/divider';

@Component({
  selector: 'app-description',
  imports: [
    TableModule,
    ScrollPanel,
    Panel,
    Image,
    FormsModule,
    InputText,
    IconField,
    InputIcon,
    Divider,
  ],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
})
export class DescriptionComponent {
  ebookService = inject(EbookService);

  metadata = this.ebookService.metadata;
  searchTerm = signal('');
  descriptionHtml = signal<string>('');

  constructor() {

    // Reageert automatisch op metadata OF searchTerm veranderingen
    effect(() => {
      const metadata = this.metadata();
      const term = this.searchTerm();

      if (!metadata?.description) {
        this.descriptionHtml.set('');
        return;
      }


      const description = metadata.description ?? '';

      if (!term || term.length < 2) {
        this.descriptionHtml.set(description);
        return;
      }

      const regex = new RegExp(
        `(${this.escapeRegExp(term)})`,
        'gi'
      );

      const highlighted =
        description.replace(
          regex,
          `<span class="highlight">$1</span>`
        );

      this.descriptionHtml.set(highlighted);
    });
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
