import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {SettingService} from '../../services/settings.service';
import {CopyService} from '../../services/copy.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {EbookService} from '../../services/ebook.service';
import {InputText} from 'primeng/inputtext';
import {Send} from '../../data/send.model';
import {LoginService} from '../../services/login.service';

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

  private copyService = inject(CopyService);
  private ebookService = inject(EbookService);
  private settingService = inject(SettingService);
  private loginService = inject(LoginService);
  private fb = inject(FormBuilder);

  displayCopyDialog = this.copyService.showCopy;

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
    this.displayCopyDialog.set(false);
  }

  getBookToCopy() {
    return this.ebookService.getFirstAuthor() + " - " + this.ebookService.getTitle();
  }

  copyBook() {
    const id = this.ebookService.getId();
    if (!id) return;

    let send: Send = {
      id: id,
      username: this.loginService.getActiveUser(),
      to: this.copyForm.controls['copyTo'].value
    }

    this.ebookService.copyBook(send);
    this.displayCopyDialog.set(false);
  }
}
