import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {UserSettings} from '../models/usersettings.model';
import {HttpClient} from '@angular/common/http';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private http = inject(HttpClient);

  private accountService  = inject(AccountService);

  async getUserSettings() {
    const username = this.accountService.getActiveAccount().username;
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
