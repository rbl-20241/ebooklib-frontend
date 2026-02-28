import {Component, inject} from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Image} from 'primeng/image';
import {Ripple} from 'primeng/ripple';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../../services/login.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {LogonDialog} from '../logondialog/logon.dialog';
import {LogonService} from '../../services/logon.service';
import {Account} from '../../data/account.model';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-logindialog',
  imports: [
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    Dialog,
    Image,
    Ripple,
    InputText,
    ReactiveFormsModule,
    Password,
    LogonDialog
  ],
  templateUrl: './login.dialog.html',
  styleUrl: './login.dialog.css',
})
export class LoginDialog {
  private http = inject(HttpClient);
  loginService = inject(LoginService);
  logonService = inject(LogonService);
  private fb = inject(FormBuilder);

  displayLoginDialog = this.loginService.showLogin;

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  async getAccount() {
    const username = this.loginForm.controls['username'].value;
    const account =
      await firstValueFrom(
        this.http.get<Account>('http://localhost:8080/account/' + username));

    const isOk =
      this.loginForm.controls['username'].value == account.username &&
      this.loginForm.controls['password'].value == account.password;

    if (isOk) {
      this.displayLoginDialog.set(false);
      this.loginService.setActiveUser(account.username);
    } else {
      console.log("Kan niet aanmelden");
      console.log("Username: " + this.loginForm.controls['username'].value + " " + account.username);
      console.log("Password: " + this.loginForm.controls['password'].value + " " + account.password);
    }
  }

  openCreateAccount() {
    this.logonService.showLogonDialog();
  }

  cancel() {
    this.displayLoginDialog.set(false);
  }

}
