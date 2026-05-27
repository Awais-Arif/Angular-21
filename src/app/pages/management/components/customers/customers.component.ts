import { Component, Injector, OnInit } from '@angular/core';
import { AppBaseComponent } from '../../../../shared/components/app-base-component';
import { CustomersService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
    selector: 'ngx-customers',
    templateUrl: './customers.component.html',
    standalone: false
})
export class CustomersComponent extends AppBaseComponent implements OnInit {

  public Customers: Customer[];
  loading: boolean;

  constructor(
    private injector: Injector,
    private CustomerService: CustomersService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAll();

  }

  public getAll() {
    this.loading = true;
    this.subs.sink = this.CustomerService.get().subscribe(res => {
      if (res.ok) {
        this.Customers = res.body;
      }
      this.loading = false;
    });
  }

}

