import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {catchError, EMPTY} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MainSettings} from '../../models/mainsettings.model';
import {MenuService} from '../../services/menu.service';

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
  private menuService = inject(MenuService);
  private fb = inject(FormBuilder);

  errorMessage = signal<string | null>(null);
  visible = this.menuService.showMainDialog;

  mainSettingsForm = this.fb.nonNullable.group({
    map: ['', Validators.required],
  });

  onShowDialog() {
    this.http.get<MainSettings>('http://localhost:8080/mainsettings')
      .subscribe({
        next: mainSettings => {
          this.mainSettingsForm.patchValue(mainSettings);
        },
        error: () => {
          this.mainSettingsForm.patchValue({
            map: '/home/rene/testboeken'
          });
        }
      });
  }

  cancel() {
    this.visible.set(false);
    this.errorMessage.set('');
  }

  saveSettings() {
    this.errorMessage.set(null);
    const payload = this.mainSettingsForm.value;

    this.http.post('http://localhost:8080/mainsettings', payload).pipe(
      catchError((httpError: HttpErrorResponse) => {
        if (httpError.error?.message) {
          this.errorMessage.set(httpError.error.message);
        } else {
          this.errorMessage.set("De ingevoerde folder bestaat niet.");
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
