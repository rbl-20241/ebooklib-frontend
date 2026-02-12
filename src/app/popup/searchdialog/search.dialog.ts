import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {HttpParams} from '@angular/common/http';
import {YesNoDatabaseDialog} from '../yes-no-database/yes-no-database.dialog';
import {SearchService} from '../../services/search.service';
import {RadioButton} from 'primeng/radiobutton';
import {EbookService} from '../../services/ebook.service';

@Component({
  selector: 'app-searchdialog',
  imports: [
    Dialog,
    InputText,
    ButtonDirective,
    Ripple,
    ReactiveFormsModule,
    YesNoDatabaseDialog,
    ButtonLabel,
    RadioButton,
    ButtonIcon

  ],
  templateUrl: './search.dialog.html',
  styleUrl: './search.dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchDialog {

  private searchService = inject(SearchService);
  private ebookService = inject(EbookService);
  private fb = inject(FormBuilder);


  displaySearchDialog = this.searchService.showSearch;
  changeColor = true;

  whereToSearchPlaces = [
    { label: 'Titels', value: 'titles'},
    { label: 'Auteurs', value: 'authors'},
    { label: 'Beschrijvingen', value: 'descriptions'},
  ];

  yesNoRadioButtons = [
    { label: 'Ja', value: true},
    { label: 'Nee', value: false}
  ]

  searchForm = this.fb.nonNullable.group({
    searchArgument: ['', Validators.required],
    whereToSearch: ['titles', Validators.required],
    isExactMatch: false
  });

  cancel() {
    this.displaySearchDialog.set(false);
  }

  async search() {
    const searchTerm = this.searchForm.controls.searchArgument.value;
    const where = this.searchForm.controls.whereToSearch.value;
    const isExact = this.searchForm.controls.isExactMatch.value;
    const params = new HttpParams()
      .set('q', searchTerm)
      .set('exact', isExact);
    await this.ebookService.search(where, params);
    this.displaySearchDialog.set(false);
  }
}
