import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {SettingService} from '../../services/settings.service';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Card} from 'primeng/card';
import {YesNoDatabaseDialog} from '../yes-no-database/yes-no-database.dialog';
import {Settings} from '../../data/settings.model';
import {Password} from 'primeng/password';

@Component({
  selector: 'app-settingsdialog',
  imports: [
    Dialog,
    InputText,
    ButtonDirective,
    Ripple,
    Card,
    ReactiveFormsModule,
    YesNoDatabaseDialog,
    Password,
    ButtonLabel,
  ],
  templateUrl: './settings.dialog.html',
  styleUrl: './settings.dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsDialog implements OnInit{

  private http = inject(HttpClient);
  private settingsService = inject(SettingService);
  private fb = inject(FormBuilder);

  displaySettingsDialog = this.settingsService.showSettings;
  changeColor = true;

  settingsForm = this.fb.nonNullable.group({
    map: ['', Validators.required],
    copyTo: ['', Validators.required],
    mailTo: ['', Validators.required],
    host: ['', Validators.required],
    port: ['', Validators.required],
    sendBy: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    this.http.get<Settings>('http://localhost:8080/settings')
      .subscribe({
        next: settings => {
          this.settingsForm.patchValue(settings);
        },
        error: () => {
          this.settingsForm.patchValue({
            map: '/home/rene/boekjes',
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
    const payload = this.settingsForm.value;
    await firstValueFrom(
      this.http.post('http://localhost:8080/settings', payload)
    );
    this.displaySettingsDialog.set(false);
  }

}
