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
    Password
  ],
  templateUrl: './login.dialog.html',
  styleUrl: './login.dialog.css',
})
export class LoginDialog {
  private http = inject(HttpClient);
  loginService = inject(LoginService);
  private fb = inject(FormBuilder);

  displayLoginDialog = this.loginService.showLogin;

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  getSettings() {

  }

  openCreateAccount() {
    console.log("openCreateAccount");

  }

  cancel() {
    this.displayLoginDialog.set(false);
  }

}
