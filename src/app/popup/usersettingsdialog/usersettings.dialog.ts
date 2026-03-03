import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {SettingService} from '../../services/settings.service';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {YesNoDatabaseDialog} from '../yes-no-database/yes-no-database.dialog';
import {UserSettings} from '../../data/usersettings.model';
import {Password} from 'primeng/password';
import {LoginService} from '../../services/login.service';

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
  private settingsService = inject(SettingService);
  private loginService = inject(LoginService);
  private fb = inject(FormBuilder);

  displaySettingsDialog = this.settingsService.showUserSettings;

  userSettingsForm = this.fb.nonNullable.group({
    searchUrl: ['', Validators.required],
    copyTo: ['', Validators.required],
    mailTo: ['', Validators.required],
    host: ['', Validators.required],
    port: ['', Validators.required],
    sendBy: ['', Validators.required],
    password: ['', Validators.required]
  });

  onShowDialog() {
    const activeUser = this.loginService.getActiveUser();
    this.http.get<UserSettings>('http://localhost:8080/usersettings/' + activeUser)
      .subscribe({
        next: settings => {
          this.userSettingsForm.patchValue(settings);
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
    this.displaySettingsDialog.set(false);
  }

  async saveSettings() {
    const activeUser = this.loginService.getActiveUser();
    const payload = this.userSettingsForm.value;
    await firstValueFrom(
      this.http.post('http://localhost:8080/usersettings/' + activeUser, payload)
    );
    this.displaySettingsDialog.set(false);
  }

}
