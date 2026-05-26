import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbCardComponent, NbDialogRef, NbDialogService } from '@nebular/theme';
import { AppBaseComponent } from '../../../../shared/components/app-base-component';
import { RejectionReason } from '../../models/rejection-reason.model';
import { RejectionReasonService } from '../../services/rejection-reason.service';

@Component({
  selector: 'ngx-rejection-reason',
  templateUrl: './rejection-reason.component.html',
})
export class RejectionReasonComponent extends AppBaseComponent implements OnInit {
  public rejectionReasons: RejectionReason[];
  public newRejectionReasonName: string;
  loading: boolean;

  @ViewChild('rejectionReasonDialog') dialog: TemplateRef<NbCardComponent>;

  public dialogRef: NbDialogRef<NbCardComponent>;
  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private rejectionReasonService: RejectionReasonService
  ) {
    super(injector);
  }
  public rejectionReasonForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
 

  ngOnInit(): void {
    this.getAll();
  }

  
  public getAll() {
    this.loading = true;
    this.subs.sink = this.rejectionReasonService.get().subscribe(res => {
      if (res.ok) {
        this.rejectionReasons = res.body;
      }
      this.loading = false;
    });
  }
  public get f() {
    return this.rejectionReasonForm.controls;
  }
 
  
  public onAddRejectionReason() {
    if(!this.rejectionReasonForm.invalid){
    const name = this.f.name.value;
    this.subs.sink = this.rejectionReasonService.post(name).subscribe(res => {
      if (res.ok) {
        this.dialogRef.close();
        this.rejectionReasons.push(res.body);
        this.toastService.showSuccess('Saved!');
        this.getAll();
      }
    });
  } 
  else {
    this.validateAllFormFields(this.rejectionReasonForm)
  }
  }

  public openDialog() {
    this.dialogRef = this.dialogService.open(this.dialog);
  }

  public onDelete(rejectionReasonToDelete: RejectionReason) {
    this.confirmationDialogService
      .confirm('Are you want to Delete this Rejection Reason?')
      .then(result => {
        if (result) {
          this.rejectionReasonService
            .delete(rejectionReasonToDelete.id)
            .subscribe(response => {
              if (response.ok) {
                this.getAll();
                this.toastService.showSuccess('Rejection Reason Has been deleted');
              } else {
                this.toastService.showWarning('could not delete Rejection Reason');
              }
            });
        }
      });
  }
}

