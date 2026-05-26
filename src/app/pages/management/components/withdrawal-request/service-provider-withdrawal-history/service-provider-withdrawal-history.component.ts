import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WithdrawalRequestService } from '../../../services/withdrawal-request.service';
import { AppBaseComponent } from '../../../../../shared/components/app-base-component';
import { ServiceProviderService } from '../../../services/service-provider.service';
import { ServiceProviderDetails } from '../../../models/service-provider-details.model';
@Component({
    selector: 'ngx-serviceprovider-withdrawal-history',
    templateUrl: './service-provider-withdrawal-history.component.html',
    styleUrls: ['./service-provider-withdrawal-history.component.scss'],
    
})
export class ServiceProviderWithdrawalHistoryComponent extends AppBaseComponent {

  constructor(private injector: Injector,
    private serviceProviderService: ServiceProviderService, private route: ActivatedRoute, private withdrawalRequestService: WithdrawalRequestService) {
    super(injector);
  }

  profileData = {} as ServiceProviderDetails;

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getServiceProviderDetails(params['id']);
    });
  }

  getServiceProviderDetails(id: number) {
    this.serviceProviderService.getById(id).subscribe({
      next: res => {
        this.profileData = res.body;
      },
    })
  }

  // public onApprove() {
  //   this.confirmationDialogService
  //     .confirm('Do you want to approve ' + request.amount + ' for ServiceProvider ' + request.ServiceProviderName + '?')
  //     .then(result => {
  //       if (result) {
  //         this.withdrawalRequestService
  //           .approveRequest(request.id)
  //           .subscribe(response => {
  //             if (response.ok) {
  //               this.toastService.showSuccess('Payment has been approved');
  //             } else {
  //               this.toastService.showWarning('could not approve payment');
  //             }
  //           });
  //       }
  //     });
  // }
}
