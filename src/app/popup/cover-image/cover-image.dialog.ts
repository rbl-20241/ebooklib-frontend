import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {EbookService} from '../../services/ebook.service';
import {Image} from 'primeng/image';

@Component({
  selector: 'app-cover-image',
  imports: [
    Dialog,
    Image
  ],
  templateUrl: './cover-image.dialog.html',
  styleUrl: './cover-image.dialog.css',
})
export class CoverImageDialog {

  ebookService = inject(EbookService);

  displayCoverImageDialog = this.ebookService.showCoverImage;

  cancel() {
    this.displayCoverImageDialog.set(false);
  }

  getCoverImage() {
    return this.ebookService.getCoverImage();
  }





}
