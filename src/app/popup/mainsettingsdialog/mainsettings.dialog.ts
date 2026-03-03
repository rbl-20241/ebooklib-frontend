import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {SettingService} from '../../services/settings.service';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MainSettings} from '../../data/mainsettings.model';

@Component({
  selector: 'app-mainsettingsdialog',
  imports: [
    Dialog,
    InputText,
    ButtonDirective,
    Ripple,
    ReactiveFormsModule,
    ButtonLabel,
    ButtonIcon,
  ],
  templateUrl: './mainsettings.dialog.html',
  styleUrl: './mainsettings.dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainsettingsDialog {

  private http = inject(HttpClient);
  private settingsService = inject(SettingService);
  private fb = inject(FormBuilder);

  displaySettingsDialog = this.settingsService.showMainSettings;

  mainSettingsForm = this.fb.nonNullable.group({
    map: ['', Validators.required],
  });

  onShowDialog() {
    this.http.get<MainSettings>('http://localhost:8080/mainsettings')
      .subscribe({
        next: settings => {
          this.mainSettingsForm.patchValue(settings);
        },
        error: () => {
          this.mainSettingsForm.patchValue({
            map: '/home/rene/testboeken'
          });
        }
      });
  }

  cancel() {
    this.displaySettingsDialog.set(false);
  }

  async saveSettings() {
    const payload = this.mainSettingsForm.value;
    await firstValueFrom(
      this.http.post('http://localhost:8080/mainsettings', payload)
    );
    this.displaySettingsDialog.set(false);
  }

}
