import {Component, inject} from '@angular/core';
import {EbookService} from '../../services/ebook.service';
import {Metadata} from '../../data/metadata.model';
import {TableModule} from 'primeng/table';
import {ScrollPanel} from 'primeng/scrollpanel';
import {Panel} from 'primeng/panel';
import {Image} from 'primeng/image';

@Component({
  selector: 'app-description',
  imports: [
    TableModule,
    ScrollPanel,
    Panel,
    Image,
  ],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
})
export class DescriptionComponent {

  private ebookService = inject(EbookService);
  private metadata: Metadata | undefined;

  getCoverImage() {
    return this.ebookService.getCoverImage();
  }

  getTitle() {
    this.metadata = this.ebookService.getMetadata();
    return this.metadata?.title ?? "";
  }

  getAuthors(): string {
    return this.metadata?.authors?.join(", ") ?? "";
  }

  getPublisher() {
    return this.metadata?.publisher ?? "";
  }

  getLanguage() {
    return this.metadata?.language ?? "";
  }

  getIsbn() {
    return this.metadata?.isbn ?? "";
  }

  getDate() {
    return this.metadata?.date ?? "";
  }

  getFormat() {
    return this.metadata?.format ?? "";
  }

  getSubjects(): string {
    return this.metadata?.subjects?.join(", ") ?? "";
  }

  getDescription() {
    return this.metadata?.description ?? "";
  }

  getIdFound() {
    return this.ebookService.getId() != undefined;
  }

}
