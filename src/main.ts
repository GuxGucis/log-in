import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { defineCustomElements } from 'jeep-sqlite/loader';

defineCustomElements(window);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
