import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{

  @Input() title!: string | "AppIonic";
  @Input() type: any;
  @Input() label!: string;
  @Input() translation!: boolean | true;
  @Input() backButton: string;

  isDarkMode: boolean;
  selectedLanguage: string;

  constructor(
    private translationSvc: TranslationService,
    private themeSvc: ThemeService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = this.translationSvc.getCurrentLang();
    this.themeSvc.darkMode.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
    this.themeSvc.setInitialTheme();
  }

  toggleTheme(){
    this.themeSvc.setTheme(!this.isDarkMode)
  }

  switchLanguage(lang: string) {
    this.translationSvc.setLanguage(lang).subscribe();
  }

}
