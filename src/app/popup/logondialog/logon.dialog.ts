import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Ripple} from 'primeng/ripple';
import {AccountService} from '../../services/account.service';
import {Account} from '../../models/account.model';
import {MenuService} from '../../services/menu.service';

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
class LogonDialog {
  menuService = inject(MenuService);
  accountService = inject(AccountService);
  private fb = inject(FormBuilder);

  visible = this.menuService.showLogonDialog;

  logonForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  async saveAccount() {
    const account: Account = {
      id: this.getId(),
      username: this.getUsername(),
      password: this.getPassword(),
      role: "USER"
    }
    try {
      await this.accountService.saveAccount(account);
      this.visible.set(false);
    } catch(error) {
      console.log('Opslaan logon mislukt.')
    }
  }

  getId() {
    return this.accountService.getActiveId();
  }

  getUsername() {
    return this.logonForm.value.username ?? '';
  }

  getPassword() {
    return this.logonForm.value.password ?? '';
  }

  cancel() {
    this.visible.set(false);
    this.accountService.errorMessage.set('');
  }
}

export default LogonDialog



