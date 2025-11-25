import { Component } from '@angular/core';
import {Panel} from 'primeng/panel';
import { ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-bottom',
  imports: [
    Panel,
    ButtonDirective,
    Ripple
  ],
  templateUrl: './bottom.component.html',
  styleUrl: './bottom.component.css'
})
export class BottomComponent {

  constructor(private http: HttpClient) { }

  async saveBooksToDatabase() {
    await firstValueFrom(
      this.http.get<any>('http://localhost:8080/savedb')
    );
  }



}
