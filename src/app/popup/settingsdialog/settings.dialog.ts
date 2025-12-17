import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {SettingService} from '../../top/settings/settings.service';
import {InputTextModule} from 'primeng/inputtext';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Card} from 'primeng/card';
import {YesNoDatabaseDialog} from '../yes-no-database/yes-no-database.dialog';

@Component({
  selector: 'app-settingsdialog',
  imports: [
    Dialog,
    InputTextModule,
    FormsModule,
    ButtonDirective,
    Ripple,
    Card,
    ReactiveFormsModule,
    YesNoDatabaseDialog,
  ],
  templateUrl: './settings.dialog.html',
  styleUrl: './settings.dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsDialog {

  private http = inject(HttpClient);
  private settingsService = inject(SettingService);
  displaySettingsDialog = this.settingsService.showSettings;
  changeColor = true;

  private fb = inject(FormBuilder);

  settingsForm = this.fb.group({
    map: ['', Validators.required],
    copyTo: ['', Validators.required],
    mailTo: ['', Validators.required],
    host: ['', Validators.required],
    port: ['', Validators.required],
    sendBy: ['', Validators.required],
    password: ['', Validators.required]
  })

  cancel() {
    this.displaySettingsDialog.set(false);
  }

  async save() {
    await firstValueFrom(
      this.http.get<any>('http://localhost:8080/savesettings')
    );
    this.displaySettingsDialog.set(false);
  }

  // saveBooksToDatabase() {
  //   this.settingsService.showYesNoDatabaseDialog();
  // }
}
