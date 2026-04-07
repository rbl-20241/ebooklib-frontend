import {Component, effect, inject, Injector, OnInit, runInInjectionContext, signal} from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Ripple} from 'primeng/ripple';
import {AccountService} from '../../services/account.service';
import {Role} from '../../models/role.model';
import {Account} from '../../models/account.model';
import {MenuService} from '../../services/menu.service';

interface RoleOption {
  label: string;
  value: Role;
}

@Component({
  selector: 'app-profiledialog',
  imports: [
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    Dialog,
    InputText,
    Password,
    ReactiveFormsModule,
    Select,
    Ripple
  ],
  templateUrl: './profile.dialog.html',
  styleUrl: './profile.dialog.css',
})
export class ProfileDialog implements OnInit {
  private injector = inject(Injector);
  menuService = inject(MenuService);
  accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  roles: RoleOption[] = [];
  username = this.accountService.getActiveAccount().username;
  role = this.accountService.getActiveAccount().role;
  errorMessage = signal<string | null>(null);

  visible = this.menuService.showProfileDialog;

  profileForm = this.fb.nonNullable.group({
    username: [{value: this.username, disabled: true}, Validators.required],
    password_old: ['', Validators.required],
    password: ['', Validators.required],
    role: [this.role as Role, Validators.required]
  });

  constructor() {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const isVisible = this.visible();

        if (isVisible) {
          this.profileForm.patchValue({
            password_old: '',
            password: '',
          });

          this.loadAccount();
        }
      });
    });
  }

  async loadAccount() {
    this.errorMessage.set('');
    const username = this.accountService.getActiveAccount().username;
    const account = await this.accountService.getAccount(username);

    this.profileForm.patchValue({
      username: account.username,
      role: account.role
    });
  }

  async updateAccount() {
    const oldAccount = this.accountService.getActiveAccount();
    const newAccount: Account = {
      id: this.getId(),
      username: oldAccount.username,
      password: this.getPassword(),
      role: this.getRole()
    }

    await this.accountService.updateAccount(oldAccount, newAccount);
    await this.accountService.setActiveAccount(newAccount.username);
    this.closeDialog();


    // if (this.account?.password !== this.profileForm.value.password_old) {
    //   this.errorMessage.set('Het oude wachtwoord komt niet overeen met het huidige wachtwoord.')
    // } else {
    //   await this.accountService.updateAccount(oldAccount, newAccount);
    //   this.closeDialog();
    // }
  }

  closeDialog() {
    this.visible.set(false);
    this.profileForm.patchValue({
      password_old: '',
      password: ''
    });
    this.errorMessage.set('');
  }

  getId() {
    return this.accountService.getActiveId();
  }

  getUsername() {
    return this.profileForm.value.username ?? '';
  }

  getPassword() {
    return this.profileForm.value.password ?? '';
  }

  getRole(): Role {
    return this.profileForm.value.role as Role;
  }

  cancel() {
    this.closeDialog();
  }

  ngOnInit(): void {
    this.accountService.getRoles().subscribe(roles => {
      this.roles = roles.map(r => ({
        label: r === 'ADMIN' ? 'Administrator' : 'Gebruiker',
        value: r
      }));

      this.profileForm.patchValue({
        role: this.accountService.getActiveAccount().role
      });
    });
  }

}
