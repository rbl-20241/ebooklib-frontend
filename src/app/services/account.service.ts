import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Role} from '../models/role.model';
import {catchError, firstValueFrom, Observable, of, throwError} from 'rxjs';
import {Account} from '../models/account.model';
import {UpdateAccount} from '../models/updateaccount.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  DEFAULT_USER = "default";

  private activeAccount = signal<Account>(this.getDefaultAccount());
  errorMessage = signal<string | null>(null);

  isDefaultAccount = computed(() => this.activeAccount().username === this.DEFAULT_USER);
  isAdminAccount = computed(() => this.activeAccount().role === 'ADMIN');

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

  getEmptyAccount() {
    const defaultAccount: Account = {
      id: '',
      username: '',
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

  async getAccount(username: string): Promise<Account> {
    this.errorMessage.set(null);

    if (!username) {
      this.errorMessage.set('Gebruikersnaam is verplicht!');
      return this.getEmptyAccount();
    }

    const account$ = this.http
      .get<Account>('http://localhost:8080/account/' + username)
      .pipe(
        catchError((httpError: HttpErrorResponse) => {
          if (httpError.error?.message) {
            this.errorMessage.set(httpError.error.message);
          } else {
            this.errorMessage.set("Er is iets fout gegaan bij het ophalen van het account.");
          }

          console.log(`${httpError.status}: ${httpError.error?.message}`);

          return of(this.getDefaultAccount());
        })
      );

    return await firstValueFrom(account$);
  }

  async getAccountWithPassword(username: string, password: string): Promise<Account> {
    const account = await this.getAccount(username);
    const accountPassword = account.password;

    if (accountPassword !== password) {
      this.errorMessage.set("Gebruikersnaam en wachtwoord komen niet overeen.")
    }

    return account;
  }

  async setActiveAccount(userName: string) {
    await this.getAccount(userName).then(account => {
      this.activeAccount.set(account)
    });
  }

  getActiveAccount() {
    return this.activeAccount();
  }

  async saveAccount(account: Account) {
    this.errorMessage.set(null);
    await firstValueFrom(
      this.http.post('http://localhost:8080/account', account).pipe(
        catchError((httpError: HttpErrorResponse) => {
          if (httpError.error?.message) {
            this.errorMessage.set(httpError.error.message);
          } else {
            this.errorMessage.set("De gebruikersnaam is verplicht!.");
          }

          console.log(`${httpError.status}: ${httpError.error?.message}`);
          return throwError(() => httpError);
        })
      )
    );
  }

  async updateAccount(oldAccount: Account, newAccount: Account) {
    const updateAccount: UpdateAccount = {
      id: this.getActiveId(),
      username: oldAccount.username,
      oldPassword: oldAccount.password,
      password: newAccount.password,
      role: newAccount.role
    }

    const updatedAccount = await firstValueFrom(
      this.http.put<Account>('http://localhost:8080/account/' + this.getActiveId(), updateAccount)
    );
    console.log('updatedAccount ', updatedAccount);

    this.activeAccount.set(updatedAccount);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('http://localhost:8080/account/roles');
  }
}
