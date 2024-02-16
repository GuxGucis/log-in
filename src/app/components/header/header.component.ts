import { Component, Input } from '@angular/core';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() title!: string | "AppIonic";
  @Input() type: any;
  @Input() label!: string;
  @Input() translation!: boolean | true;
  @Input() backButton: string | undefined;

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
