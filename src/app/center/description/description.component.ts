import {Component, inject} from '@angular/core';
import {Panel} from 'primeng/panel';
import {FileTreeService} from '../filetree/file-tree.service';
import {Metadata} from '../../data/metadata.model';

@Component({
  selector: 'app-description',
  imports: [
    Panel
  ],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
})
export class DescriptionComponent {

  private fileTreeService = inject(FileTreeService);
  private metadata: Metadata | undefined;

  getTitle() {
    this.metadata = this.fileTreeService.getMetadata();
    if (this.metadata) {
      return this.metadata.title;
    }
    return "";
  }

  getAuthor() {
    if (this.metadata) {
      return this.metadata.author;
    }
    return "";
  }

  getDescription() {
    if (this.metadata) {
      return this.metadata.description;
    }
    return "";
  }

}
