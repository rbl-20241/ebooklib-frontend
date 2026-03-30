import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {SettingsService} from '../../services/settings.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {EbookService} from '../../services/ebook.service';
import {InputText} from 'primeng/inputtext';
import {Send} from '../../models/send.model';
import {AccountService} from '../../services/account.service';
import {ButtonsService} from '../../services/buttons.service';

@Component({
  selector: 'app-copydialog',
  imports: [
    Dialog,
    ButtonDirective,
    Ripple,
    ReactiveFormsModule,
    InputText,
    ButtonLabel,
    ButtonIcon
  ],
  templateUrl: './copy.dialog.html',
  styleUrl: './copy.dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyDialog {

  private buttonsService = inject(ButtonsService);
  private ebookService = inject(EbookService);
  private settingService = inject(SettingsService);
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);

  visible = this.buttonsService.showCopyDialog;

  copyForm = this.fb.nonNullable.group({
    copyTo: ['', Validators.required]
  });

  onShowDialog() {
    this.settingService.getCopyToMap().then(copyTo => {
      this.copyForm.patchValue({
        copyTo: copyTo
      });
    })
  }

  cancel() {
    this.visible.set(false);
  }

  getBookToCopy() {
    return this.ebookService.getFirstAuthor() + " - " + this.ebookService.getTitle();
  }

  copyBook() {
    const id = this.ebookService.getId();
    if (!id) return;

    let send: Send = {
      id: id,
      username: this.accountService.getActiveAccount().username,
      to: this.copyForm.controls['copyTo'].value
    }

    this.ebookService.copyBook(send);
    this.visible.set(false);
  }
}
