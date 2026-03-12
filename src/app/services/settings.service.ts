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
  private showMainDialog = signal<boolean>(false);
  showMainSettings = this.showMainDialog;
  private showYesNoDbDialog = signal<boolean>(false);
  showYesNoDbSettings = this.showYesNoDbDialog;
  private showRefreshingDbDialog = signal<boolean>(false);
  showRefreshingDbSettings = this.showRefreshingDbDialog;
  private loginService = inject(LoginService);

  showUserSettingsDialog() {
    this.showUserDialog.set(true);
  }

  showMainSettingsDialog() {
    this.showMainDialog.set(true);
  }

  showYesNoDatabaseDialog() {
    this.showYesNoDbDialog.set(true);
  }

  showRefreshingDatabaseDialog() {
    this.showRefreshingDbDialog.set(true);
  }

  hideRefreshingDatabaseDialog() {
    this.showRefreshingDbDialog.set(false);
  }

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
