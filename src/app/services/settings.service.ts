import {inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {UserSettings} from '../data/usersettings.model';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private http = inject(HttpClient);

  private showUserDialog = signal<boolean>(false);
  showUserSettings = this.showUserDialog;
  private showYesNoDbDialog = signal<boolean>(false);
  showYesNoDbSettings = this.showYesNoDbDialog;
  private loginService = inject(LoginService);

  showUserSettingsDialog() {
    this.showUserDialog.set(true);
  }

  showYesNoDatabaseDialog() {
    this.showYesNoDbDialog.set(true);
  }

  async getCopyToMap() {
    let username = this.loginService.getActiveUser();
    let settings = await  firstValueFrom(
      this.http.get<UserSettings>('http://localhost:8080/usersettings/' + username)
    );

    return settings.copyTo;
  }

  async getMailTo() {
    let username = this.loginService.getActiveUser();
    let settings = await  firstValueFrom(
      this.http.get<UserSettings>('http://localhost:8080/usersettings/' + username)
    );

    return settings.mailTo;
  }

}
