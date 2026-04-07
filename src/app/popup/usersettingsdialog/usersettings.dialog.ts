import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {catchError, EMPTY} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {YesNoDatabaseDialog} from '../yes-no-database/yes-no-database.dialog';
import {UserSettings} from '../../models/usersettings.model';
import {Password} from 'primeng/password';
import {AccountService} from '../../services/account.service';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-usersettingsdialog',
  imports: [
    Dialog,
    InputText,
    ButtonDirective,
    Ripple,
    ReactiveFormsModule,
    YesNoDatabaseDialog,
    Password,
    ButtonLabel,
    ButtonIcon,
  ],
  templateUrl: './usersettings.dialog.html',
  styleUrl: './usersettings.dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersettingsDialog {

  private http = inject(HttpClient);
  private menuService = inject(MenuService);
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);

  errorMessage = signal<string | null>(null);
  visible = this.menuService.showUserDialog;

  userSettingsForm = this.fb.nonNullable.group({
    searchUrl: ['', Validators.required],
    copyTo: ['', Validators.required],
    mailTo: ['', Validators.required],
    host: ['', Validators.required],
    port: ['', Validators.required],
    sendBy: ['', Validators.required],
    password: ['', Validators.required]
  });

  getTitle() {
    const activeUser = this.accountService.getActiveAccount().username;
    if (activeUser === this.accountService.DEFAULT_USER) {
      return 'Standaardinstellingen';
    }
    return 'Instellingen voor ' + activeUser;
  }

  onShowDialog() {
    const activeUser = this.accountService.getActiveAccount().username;
    this.http.get<UserSettings>('http://localhost:8080/usersettings/' + activeUser)
      .subscribe({
        next: userSettings => {
          this.userSettingsForm.patchValue(userSettings);
        },
        error: () => {
          this.userSettingsForm.patchValue({
            searchUrl: 'https://seach.com',
            copyTo: '/home/rene/temp',
            mailTo: 'iemand@mail.com',
            host: 'host',
            port: '123',
            sendBy: 'me',
            password: 'hello'
          });
        }
      });
  }

  cancel() {
    this.visible.set(false);
    this.errorMessage.set(null);
  }

  async saveSettings() {
    this.errorMessage.set(null);

    const activeUser = this.accountService.getActiveAccount().username;
    const payload = this.userSettingsForm.value;

    this.http.post('http://localhost:8080/usersettings/' + activeUser, payload).pipe(
      catchError((httpError: HttpErrorResponse) => {
        if (httpError.error?.message) {
          this.errorMessage.set(httpError.error.message);
        } else {
          this.errorMessage.set("Alle velden zijn verplicht.");
        }

        console.log(`${httpError.status}: ${httpError.error?.message}`);
        return EMPTY;
      })
    ).subscribe({
      next: () => {
        this.visible.set(false);
      }
    });
  }

}
