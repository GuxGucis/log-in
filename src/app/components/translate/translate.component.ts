import { Component, INJECTOR, Input } from '@angular/core';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
})
export class TranslateComponent {

  
  @Input() translation!: boolean | true;

  selectedLanguage: string;

  constructor(
    private translationSvc: TranslationService
  ) { 
    this.selectedLanguage = this.translationSvc.getCurrentLang();
   }

  switchLanguage(lang: string) {
    this.translationSvc.setLanguage(lang).subscribe();
  }

}
