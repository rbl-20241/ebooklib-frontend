import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {LogonService} from '../../services/logon.service';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Ripple} from 'primeng/ripple';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-logondialog',
  imports: [
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    Dialog,
    InputText,
    Password,
    ReactiveFormsModule,
    Ripple
  ],
  templateUrl: './logon.dialog.html',
  styleUrl: './logon.dialog.css',
})
export class LogonDialog {
  private http = inject(HttpClient);
  logonService = inject(LogonService);
  private fb = inject(FormBuilder);

  displayLogonDialog = this.logonService.showLogon;

  logonForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  async saveAccount() {
    console.log("saveAccount");
    const payload = this.logonForm.value;
    await firstValueFrom(
      this.http.post('http://localhost:8080/account', payload)
    );
    this.displayLogonDialog.set(false);
  }

  cancel() {
    this.displayLogonDialog.set(false);
  }
}



