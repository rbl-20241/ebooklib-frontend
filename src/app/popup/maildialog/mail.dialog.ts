import {Component, inject} from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Ripple} from 'primeng/ripple';
import {EbookService} from '../../services/ebook.service';
import {SettingService} from '../../services/settings.service';
import {Send} from '../../data/send.model';
import {MailService} from '../../services/mail.service';
import {LoginService} from '../../services/login.service';

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

  private mailService = inject(MailService);
  private ebookService = inject(EbookService);
  private settingService = inject(SettingService);
  private loginService = inject(LoginService);
  private fb = inject(FormBuilder);

  displayMailDialog = this.mailService.showMail;

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
    this.displayMailDialog.set(false);
  }

  getBookToMail() {
    return this.ebookService.getFirstAuthor() + " - " + this.ebookService.getTitle();
  }

  mailBook() {
    const id = this.ebookService.getId();
    if (!id) return;

    let send: Send = {
      id: id,
      username: this.loginService.getActiveUser(),
      to: this.mailForm.controls['mailTo'].value
    }

    this.ebookService.mailBook(send);
    this.displayMailDialog.set(false);
  }
}
