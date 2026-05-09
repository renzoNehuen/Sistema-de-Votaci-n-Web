import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Import PrimeNG theme and base styles
import Lara from '@primeuix/themes/lara';
import { useTheme } from '@primeuix/themes';

// Load the full Lara theme so PrimeNG components can resolve theme tokens
useTheme({ preset: Lara });

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
