import { Component, Injector, OnInit } from '@angular/core';
import { AppBaseComponent } from '../../../../shared/components/app-base-component';
import { WithdrawalRequest } from '../../models/withdrawal-request.model';
import { WithdrawalRequestService } from '../../services/withdrawal-request.service';
import { WithDrawalStatus } from '../../models/withdrawal-status.model';
import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { Bind } from 'primeng/bind';
import { TableModule } from 'primeng/table';
import { PrimeTemplate } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { DateTimePipe } from '../../../../shared/pipes/date-time.pipe';

@Component({
    selector: 'ngx-withdrawal-request',
    templateUrl: './withdrawal-request.component.html',
    imports: [NbCardModule, Bind, TableModule, PrimeTemplate, NbButtonModule, NbIconModule, RouterLink, DateTimePipe]
})
export class WithdrawalRequestComponent extends AppBaseComponent implements OnInit {
  public withdrawalRequests: WithdrawalRequest[];
  loading: boolean;
  public WithDrawalStatus = WithDrawalStatus
  constructor(
    private injector: Injector,
    private withdrawalRequestService: WithdrawalRequestService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAll();
  }


  public getAll() {
    this.loading = true;
    this.subs.sink = this.withdrawalRequestService.get().subscribe(res => {
      if (res.ok) {
        this.withdrawalRequests = res.body;
      }
      this.loading = false;
    });
  }

}

