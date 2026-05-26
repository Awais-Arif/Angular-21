import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppBaseComponent } from '../../../../../shared/components/app-base-component';
import { ServiceProviderDetails } from '../../../models/service-provider-details.model';
import { ServiceProviderService } from '../../../services/service-provider.service';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'ngx-serviceprovider-details',
    templateUrl: './service-provider-details.component.html',
    styleUrls: ['./service-provider-details.component.scss'],
    standalone: false
})
export class ServiceProviderDetailsComponent extends AppBaseComponent implements OnInit {

  constructor(private injector: Injector,
    private serviceProviderService: ServiceProviderService, private route: ActivatedRoute) {
    super(injector);
  }

  profileData = {} as ServiceProviderDetails;
  isApproved = false;
  imageUrl = environment.imageBaseUrl;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isApproved = params['isApproved'];
      this.getServiceProviderDetails(params['id']);
    });

  }
  public onApprove() {
    this.confirmationDialogService
      .confirm('Do you want to approve ' + this.profileData.user.firstName + " " + this.profileData.user.lastName + '?')
      .then(result => {
        if (result) {
          this.serviceProviderService
            .approveServiceProvider(this.profileData.user.id)
            .subscribe(response => {
              if (response.ok) {
                this.toastService.showSuccess('ServiceProvider is Approved');
              } else {
                this.toastService.showWarning('could not approve ServiceProvider');
              }
            });
        }
      });
  }

  getServiceProviderDetails(id: number) {
    this.serviceProviderService.getById(id).subscribe({
      next: res => {
        this.profileData = res.body;
      },
    })
  }





}
