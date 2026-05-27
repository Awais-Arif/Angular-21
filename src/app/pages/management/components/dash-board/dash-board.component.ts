import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbCardModule } from '@nebular/theme';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'ngx-dash-board',
    templateUrl: './dash-board.component.html',
    styleUrls: ['./dash-board.component.scss'],
    imports: [NbCardModule]
})
export class DashBoardComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject<void>();

  totalServiceProviders: number = 0;
  totalCustomers: number = 0;
  totalOrders: number = 0;

  maxServiceProviders: number = 0;
  maxCustomers: number = 0;
  maxOrders: number = 0;

  // Inject NbThemeService to use Nebular's theme features
  constructor(private themeService: NbThemeService, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getDashboardCounts();
    // Fetch data on component initialization
    this.animateCounters();

    // You can also use Nebular's theme features here to customize the appearance
    this.themeService.onThemeChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // Customize styles based on the selected theme
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDashboardCounts() {
    this.dashboardService.get().subscribe({
      next: res => {
        if (res.ok) {
          this.maxServiceProviders = res.body.serviceProviders;
          this.maxCustomers = res.body.customers;
          this.maxOrders = res.body.orders;
        }
      }
    });
  }

  private animateCounters() {
    interval(10).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.totalServiceProviders = Math.min(this.totalServiceProviders + 1, this.fetchTotalServiceProviders());
      this.totalCustomers = Math.min(this.totalCustomers + 1, this.fetchTotalCustomers());
      this.totalOrders = Math.min(this.totalOrders + 1, this.maxOrders);
    });
  }

  // Assume you have functions to fetch data from the server
  // You can replace these with actual API calls
  private fetchTotalServiceProviders(): number {
    // Return the total number of ServiceProviders
    return this.maxServiceProviders;
  }

  private fetchTotalCustomers(): number {
    // Return the total number of Customers
    return this.maxCustomers;
  }
}
