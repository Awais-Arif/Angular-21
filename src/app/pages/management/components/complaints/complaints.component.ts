import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppBaseComponent } from '../../../../shared/components/app-base-component';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintDetailModel } from '../../models/complaint-detail.model';
import { ComplaintStatus } from './../../models/complaint.model';
import { NbCardModule, NbButtonModule, NbTooltipModule, NbIconModule } from '@nebular/theme';
import { Bind } from 'primeng/bind';
import { TableModule } from 'primeng/table';
import { PrimeTemplate } from 'primeng/api';

@Component({
    selector: 'ngx-complaints',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.scss'],
    imports: [NbCardModule, Bind, TableModule, PrimeTemplate, NbButtonModule, NbTooltipModule, NbIconModule]
})


export class ComplaintsComponent extends AppBaseComponent implements OnInit {
  public Complaints: ComplaintDetailModel[] = [];
  public ComplaintStatus = ComplaintStatus;
  loading!: boolean;

  constructor(
    private injector: Injector,
    private complaintService: ComplaintService
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
    this.subs.sink = this.complaintService.getAll().subscribe(res => {
      if (res.ok) {
        this.Complaints = res.body;
        this.Complaints.sort((a, b) => {
          return Number(a.status) - Number(b.status);
        });
      }
      this.loading = false;
    });
  }

  public updateStatus(id: number, status: number) {
    this.confirmationDialogService
      .confirm('Do you want to change complaint status?')
      .then(result => {
        if (result) {
          this.complaintService
            .updateStatus(id, status)
            .subscribe(response => {
              if (response.ok) {
                this.getAll();
                this.toastService.showSuccess('Complaint status is change');
              } else {
                this.toastService.showWarning('Could not change the status');
              }
            });
        }
      });
  }

}
