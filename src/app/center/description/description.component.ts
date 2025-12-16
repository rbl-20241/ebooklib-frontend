import {Component, inject} from '@angular/core';
import {EbookService} from '../ebook.service';
import {Metadata} from '../../data/metadata.model';
import {TableModule} from 'primeng/table';
import {ScrollPanel} from 'primeng/scrollpanel';
import {Panel} from 'primeng/panel';

@Component({
  selector: 'app-description',
  imports: [
    TableModule,
    ScrollPanel,
    Panel,
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

  getAuthor() {
    return this.metadata?.author ?? "";
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
