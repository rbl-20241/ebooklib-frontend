import {Component, inject} from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Image} from 'primeng/image';
import {Ripple} from 'primeng/ripple';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import LogonDialog from '../logondialog/logon.dialog';
import {AccountService} from '../../services/account.service';
import {MenuService} from '../../services/menu.service';

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
  menuService = inject(MenuService);
  accountService = inject(AccountService);
  private fb = inject(FormBuilder);

  visible = this.menuService.showLoginDialog;

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  async getCurrentAccount() {
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    const account = await this.accountService.getAccountWithPassword(username, password);

    if (!this.accountService.errorMessage()) {
      this.visible.set(false);
      await this.accountService.setActiveAccount(account.username);
    }
  }

  openCreateAccount() {
    this.menuService.showLogonDialog.set(true);
  }

  cancel() {
    this.visible.set(false);
    this.accountService.errorMessage.set('');
  }

}
