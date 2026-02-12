import {inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Settings} from '../data/settings.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private http = inject(HttpClient);

  private showDialog = signal<boolean>(false);
  showSettings = this.showDialog;
  private showYesNoDbDialog = signal<boolean>(false);
  showYesNoDbSettings = this.showYesNoDbDialog;


  showSettingsDialog() {
    this.showDialog.set(true);
  }

  showYesNoDatabaseDialog() {
    this.showYesNoDbDialog.set(true);
  }

  async getCopyToMap() {
    let settings = await  firstValueFrom(
      this.http.get<Settings>('http://localhost:8080/settings')
    );

    return settings.copyTo;
  }

  async getMailTo() {
    let settings = await  firstValueFrom(
      this.http.get<Settings>('http://localhost:8080/settings')
    );

    return settings.mailTo;
  }

}
