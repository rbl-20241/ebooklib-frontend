import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Role} from '../models/role.model';
import {firstValueFrom, Observable} from 'rxjs';
import {Account} from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  DEFAULT_USER = "default";

  private activeAccount = signal<Account>(this.getDefaultAccount());
  isDefaultAccount = computed(() => this.activeAccount().username === this.DEFAULT_USER);

  private http = inject(HttpClient);

  getDefaultAccount() {
    const defaultAccount: Account = {
      id: '',
      username: this.DEFAULT_USER,
      password: '',
      role: 'USER',
    }

    return defaultAccount;
  }

  getActiveId() {
    return this.getActiveAccount().id;
  }

  getActiveUsername() {
    return this.getActiveAccount().username;
  }

  getAccount(username: string) {
    return firstValueFrom(
      this.http.get<Account>('http://localhost:8080/account/' + username));
  }

  setActiveAccount(userName: string) {
    this.getAccount(userName).then(account => {
      this.activeAccount.set(account)
    });
  }

  getActiveAccount() {
    return this.activeAccount();
  }

  async saveAccount(account: Account) {
    await firstValueFrom(
      this.http.post('http://localhost:8080/account', account)
    );
  }

  async updateAccount(account: Account) {
    const updateAccount: Account = {
      id: this.getActiveId(),
      username: this.getActiveUsername(),
      password: account.password,
      role: account.role
    }
    await firstValueFrom(
      this.http.put('http://localhost:8080/account/' + this.getActiveId(), updateAccount)
    );
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('http://localhost:8080/account/roles');
  }

  // async getAccount() {
  //   return await firstValueFrom(
  //     this.http.get<Account>('http://localhost:8080/account')
  //   );
  // }

}
