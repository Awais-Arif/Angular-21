import { Component, Injector, OnInit } from '@angular/core';
import { NbCardComponent, NbDialogRef } from '@nebular/theme';
import { AppBaseComponent } from '../../../../shared/components/app-base-component';
import { OrderDetailModel } from '../../models/order-detail.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'ngx-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent extends AppBaseComponent implements OnInit {
  inProgressOrders: OrderDetailModel[] = [];
  completedOrders: OrderDetailModel[] = [];
  loading: boolean;

  public dialogRef: NbDialogRef<NbCardComponent>;
  constructor(
    private injector: Injector,
    private orderService: OrderService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAll(3, 'inProgressOrders');
    this.getAll(4, 'completedOrders');
  }

  public getAll(statusId: number, targetArray: 'inProgressOrders' | 'completedOrders') {
    this.loading = true;
    this.subs.sink = this.orderService.get(statusId).subscribe(res => {
      if (res.ok) {
        this[targetArray] = res.body;
      }
      this.loading = false;
    });
  }

}

