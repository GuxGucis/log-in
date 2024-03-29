import { Component, OnInit } from '@angular/core';
import { MySqlite } from './services/mysqlite.service';
import { TranslationService } from './services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private sqliteSvc: MySqlite,
    private translationSvc: TranslationService
  ) {}

  ngOnInit(): void {
    this.sqliteSvc.initializeDB();
    this.translationSvc.setLanguage('es').subscribe();
  }

}
