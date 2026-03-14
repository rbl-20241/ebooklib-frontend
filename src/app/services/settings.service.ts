import {inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {UserSettings} from '../data/usersettings.model';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private http = inject(HttpClient);

  showUserDialog = signal<boolean>(false);
  showMainDialog = signal<boolean>(false);
  showYesNoDbDialog = signal<boolean>(false);
  showRefreshingDbDialog = signal<boolean>(false);
  private loginService = inject(LoginService);

  async getUserSettings() {
    const username = this.loginService.getActiveUser();
    return await firstValueFrom(
      this.http.get<UserSettings>('http://localhost:8080/usersettings/' + username)
    );
  }

  async getCopyToMap() {
    const userSettings = await this.getUserSettings();
    return userSettings.copyTo;
  }

  async getMailTo() {
    const userSettings = await this.getUserSettings();
    return userSettings.mailTo;
  }

  async getSearchUrl() {
    const userSettings = await this.getUserSettings();
    return userSettings.searchUrl;
  }

}
