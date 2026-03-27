import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  showProfileDialog = signal<boolean>(false);
  // showProfile = this.showProfileDialog;

  // showProfileDialog() {
  //   this.showProfileDialog.set(true);
  // }

}
