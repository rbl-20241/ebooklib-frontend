import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyService {
  private showDialog = signal<boolean>(false);
  showCopy = this.showDialog;

  showCopyDialog() {
    console.log("CopyDialog ");
    this.showDialog.update((value) => !value);
  }

}
