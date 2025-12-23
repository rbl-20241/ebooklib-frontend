import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {SettingService} from '../../services/settings.service';
import {CopyService} from '../../services/copy.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {EbookService} from '../../services/ebook.service';
import {Card} from 'primeng/card';
import {InputText} from 'primeng/inputtext';
import {Send} from '../../data/send.model';

@Component({
  selector: 'app-copydialog',
  imports: [
    Dialog,
    ButtonDirective,
    Ripple,
    Card,
    ReactiveFormsModule,
    InputText
  ],
  templateUrl: './copy.dialog.html',
  styleUrl: './copy.dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyDialog implements OnInit {

  private copyService = inject(CopyService);
  private ebookService = inject(EbookService);
  private settingService = inject(SettingService);
  private fb = inject(FormBuilder);

  displayCopyDialog = this.copyService.showCopy;
  changeColor = true;

  copyForm = this.fb.nonNullable.group({
    copyTo: ['', Validators.required]
  });

  ngOnInit() {
    this.settingService.getCopyToMap().then(copyTo => {
      this.copyForm.patchValue({
        copyTo: copyTo
      });
    })
  }

  cancel() {
    this.displayCopyDialog.set(false);
  }

  getBookToCopy() {
    return this.ebookService.getAuthor() + " - " + this.ebookService.getTitle();
  }

  copyBook() {
    const id = this.ebookService.getId();
    if (!id) return;

    let send: Send = {
      id: id,
      to: this.copyForm.controls['copyTo'].value
    }

    this.ebookService.copyBook(send);
    this.displayCopyDialog.set(false);
  }
}
