import {Component, inject, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Ripple} from 'primeng/ripple';
import {EbookService} from '../../services/ebook.service';
import {SettingService} from '../../services/settings.service';
import {Send} from '../../data/send.model';
import {MailService} from '../../services/mail.service';

@Component({
  selector: 'app-maildialog',
  imports: [
    ButtonDirective,
    Card,
    Dialog,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Ripple
  ],
  templateUrl: './mail.dialog.html',
  styleUrl: './mail.dialog.css',
})
export class MailDialog implements OnInit {

  private mailService = inject(MailService);
  private ebookService = inject(EbookService);
  private settingService = inject(SettingService);
  private fb = inject(FormBuilder);

  displayMailDialog = this.mailService.showMail;
  changeColor = true;

  mailForm = this.fb.nonNullable.group({
    mailTo: ['', Validators.required]
  });

  ngOnInit() {
    this.settingService.getMailTo().then(mailTo => {
      console.log(mailTo);

      this.mailForm.patchValue({
        mailTo: mailTo
      });
    })
  }

  cancel() {
    this.displayMailDialog.set(false);
  }

  getBookToMail() {
    return this.ebookService.getAuthor() + " - " + this.ebookService.getTitle();
  }

  mailBook() {
    const id = this.ebookService.getId();
    if (!id) return;

    let send: Send = {
      id: id,
      to: this.mailForm.controls['mailTo'].value
    }

    this.ebookService.mailBook(send);
    this.displayMailDialog.set(false);
  }
}
