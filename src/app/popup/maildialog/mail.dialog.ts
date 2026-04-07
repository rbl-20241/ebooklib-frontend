import {Component, inject, signal} from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Ripple} from 'primeng/ripple';
import {EbookService} from '../../services/ebook.service';
import {SettingsService} from '../../services/settings.service';
import {Send} from '../../models/send.model';
import {AccountService} from '../../services/account.service';
import {ButtonsService} from '../../services/buttons.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-maildialog',
  imports: [
    ButtonDirective,
    Dialog,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Ripple,
    ButtonLabel,
    ButtonIcon
  ],
  templateUrl: './mail.dialog.html',
  styleUrl: './mail.dialog.css',
})
export class MailDialog {

  private buttonsService = inject(ButtonsService);
  private ebookService = inject(EbookService);
  private settingService = inject(SettingsService);
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);

  errorMessage = signal<string | null>(null);
  visible = this.buttonsService.showMailDialog;

  mailForm = this.fb.nonNullable.group({
    mailTo: ['', Validators.required]
  });

  onShowDialog() {
    this.settingService.getMailTo().then(mailTo => {
      this.mailForm.patchValue({
        mailTo: mailTo
      });
    });
  }

  cancel() {
    this.visible.set(false);
    this.errorMessage.set('');
  }

  getBookToMail() {
    return this.ebookService.getFirstAuthor() + " - " + this.ebookService.getTitle();
  }

  async mailBook() {
    const id = this.ebookService.getId();
    if (!id) return;

    let send: Send = {
      id: id,
      username: this.accountService.getActiveAccount().username,
      to: this.mailForm.controls['mailTo'].value
    }

    try {
      await firstValueFrom(this.ebookService.mailBook(send));
      this.visible.set(false);
    } catch (error: any) {
      console.error(error);
      this.errorMessage.set(error.error?.message ?? 'Mail versturen is mislukt.');
    }
  }

}
