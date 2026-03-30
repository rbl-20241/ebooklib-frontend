import {Component, effect, inject, Injector, OnInit, runInInjectionContext} from '@angular/core';
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
  account?: Account;
  roles: Role[] = [];
  username = this.accountService.getActiveAccount().username;
  role = this.accountService.getActiveAccount().role;

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
          this.loadAccount();
        }
      });
    });
  }

  async loadAccount() {
    const username = this.accountService.getActiveAccount().username;
    this.account = await this.accountService.getAccount(username);

    this.profileForm.patchValue({
      username: this.account.username,
      role: this.account.role
    });
  }

  async updateAccount() {
    const account: Account = {
      id: this.getId(),
      username: this.getUsername(),
      password: this.getPassword(),
      role: this.getRole()
    }
    await this.accountService.updateAccount(account);
    this.visible.set(false);
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
    this.visible.set(false);
  }

  ngOnInit(): void {
    this.accountService.getRoles().subscribe(roles => this.roles = roles);
  }

}
