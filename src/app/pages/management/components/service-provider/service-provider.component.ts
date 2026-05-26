import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbCardComponent, NbDialogRef, NbDialogService } from '@nebular/theme';
import { AppBaseComponent } from '../../../../shared/components/app-base-component';
import { ServiceProvider } from '../../models/service-provider.model';
import { ServiceProviderService } from '../../services/service-provider.service';

@Component({
  selector: 'ngx-serviceprovider',
  templateUrl: './service-provider.component.html',
})
export class ServiceProviderComponent extends AppBaseComponent implements OnInit {
  @ViewChild('rejectionReasonDialog') dialog: TemplateRef<NbCardComponent>;

  public dialogRef: NbDialogRef<NbCardComponent>;
  public ServiceProviders: ServiceProvider[];
  public disapproveServiceProvider: ServiceProvider;
  loading: boolean;

  constructor(
    private injector: Injector,
    private dialogService: NbDialogService,
    private serviceProviderService: ServiceProviderService
  ) {
    super(injector);
  }

  public ServiceProviderForm = new FormGroup({
    rejectionReason: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.getAll();

  }

  public getAll() {
    this.loading = true;
    this.subs.sink = this.serviceProviderService.get().subscribe(res => {
      if (res.ok) {
        this.ServiceProviders = res.body;

        this.ServiceProviders.sort((a, b) => {
          if (a.isApproved && !b.isApproved) {
            return 1;
          } else if (!a.isApproved && b.isApproved) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      this.loading = false;
    });
  }

  public onApprove(ServiceProviderToBeVerified: ServiceProvider) {
    this.confirmationDialogService
      .confirm('Do you want to approve ' + ServiceProviderToBeVerified.fullName + '?')
      .then(result => {
        if (result) {
          this.serviceProviderService
            .approveServiceProvider(ServiceProviderToBeVerified.id)
            .subscribe(response => {
              if (response.ok) {
                this.getAll();
                this.toastService.showSuccess('ServiceProvider is Approved');
              } else {
                this.toastService.showWarning('could not approve ServiceProvider');
              }
            });
        }
      });
  }

  public disapprove() {
    if (!this.ServiceProviderForm.invalid) {
      const reason = this.ServiceProviderForm.controls.rejectionReason.value;
      this.subs.sink = this.serviceProviderService.disapproveServiceProvider(this.disapproveServiceProvider.id, reason).subscribe(res => {
        if (res.ok) {
          this.dialogRef.close();
          this.ServiceProviders.push(res.body);
          this.toastService.showSuccess('Saved!');
          this.getAll();
        }
      });
    } else {
      this.validateAllFormFields(this.ServiceProviderForm)
    }
  }

  public openDialog(doc: ServiceProvider) {
    this.disapproveServiceProvider = doc;
    this.dialogRef = this.dialogService.open(this.dialog);
  }

  public onDelete(ServiceProviderToBeVerified: ServiceProvider) {
    this.confirmationDialogService
      .confirm('Do you want to delete ' + ServiceProviderToBeVerified.fullName + '?')
      .then(result => {
        if (result) {
          this.serviceProviderService
            .delete(ServiceProviderToBeVerified.id)
            .subscribe(response => {
              if (response.ok) {
                this.getAll();
                this.toastService.showSuccess('Therapy Type Has been deleted');
              } else {
                this.toastService.showWarning('could not delete therapy type');
              }
            });
        }
      });
  }
}

