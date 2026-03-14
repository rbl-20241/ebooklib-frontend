import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  showAboutDialog = signal<boolean>(false);

}
