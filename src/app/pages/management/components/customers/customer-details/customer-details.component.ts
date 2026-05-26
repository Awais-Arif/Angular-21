import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppBaseComponent } from '../../../../../shared/components/app-base-component';
import { CustomersService } from '../../../services/customer.service';
import { CustomerDetail, CustomerServiceRequestDetailModel } from '../../../models/customer-detail.model';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'ngx-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent extends AppBaseComponent implements OnInit {

  constructor(private injector: Injector,
    private CustomerService: CustomersService, private route: ActivatedRoute) {
    super(injector);
  }
  serviceRequests: CustomerServiceRequestDetailModel[] = [];
  serviceRequestsByService: CustomerServiceRequestDetailModel[] = [];
  profileData = {} as CustomerDetail;
  imageUrl = environment.imageBaseUrl;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getCustomerDetails(params['id']);
    });
  }

  getCustomerDetails(id: number) {
    this.CustomerService.getById(id).subscribe({
      next: res => {
        this.profileData = res.body;
        this.profileData.customerServiceRequests?.forEach((csr: any) => {
          csr.images = csr.images.split(';');
        });
        this.serviceRequests = this.profileData.customerServiceRequests?.filter(x => x.serviceRequestType == 1) || [];
        this.serviceRequestsByService = this.profileData.customerServiceRequests?.filter(x => x.serviceRequestType == 2) || [];
      },
    })
  }





}
