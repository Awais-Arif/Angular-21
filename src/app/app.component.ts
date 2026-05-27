/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbLayoutModule } from '@nebular/theme';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<nb-layout><nb-layout-column class="p-0"><router-outlet></router-outlet></nb-layout-column></nb-layout>',
  standalone: true,
  imports: [NbLayoutModule, RouterOutlet]
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService) {
  }

  ngOnInit(): void {
    // Hide the global spinner when app initializes
    const spinner = document.getElementById('nb-global-spinner');
    if (spinner) {
      spinner.style.display = 'none';
    }

    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
