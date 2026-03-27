import {Component, inject} from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Ripple} from 'primeng/ripple';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-profiledialog',
  imports: [
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    Dialog,
    InputText,
    Password,
    ReactiveFormsModule,
    Ripple
  ],
  templateUrl: './profile.dialog.html',
  styleUrl: './profile.dialog.css',
})
export class ProfileDialog {
  private http = inject(HttpClient);
  profileService = inject(ProfileService);
  private fb = inject(FormBuilder);

  visible = this.profileService.showProfileDialog;

  profileForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: ['USER']
  });

  async saveAccount() {
    console.log("saveAccount");
    const payload = this.profileForm.value;
    await firstValueFrom(
      this.http.post('http://localhost:8080/account', payload)
    );
    this.visible.set(false);
  }

  cancel() {
    this.visible.set(false);
  }

}
