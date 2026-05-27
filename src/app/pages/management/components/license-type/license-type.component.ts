import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbCardComponent, NbDialogRef, NbDialogService, NbCardModule, NbButtonModule, NbIconModule, NbFormFieldModule, NbInputModule } from '@nebular/theme';
import { AppBaseComponent } from '../../../../shared/components/app-base-component';
import { LicenseType } from '../../models/license-type.model';
import { LicenseTypeService } from '../../services/license-type.service';
import { Bind } from 'primeng/bind';
import { TableModule } from 'primeng/table';
import { PrimeTemplate } from 'primeng/api';

@Component({
    selector: 'ngx-license-type',
    templateUrl: './license-type.component.html',
    imports: [NbCardModule, NbButtonModule, Bind, TableModule, PrimeTemplate, NbIconModule, FormsModule, ReactiveFormsModule, NbFormFieldModule, NbInputModule]
})
export class LicenseTypeComponent extends AppBaseComponent implements OnInit {
  public licenseTypes: LicenseType[];
  public newTherapayName: string;
  loading: boolean;

  @ViewChild('licenseTypeDialog') dialog: TemplateRef<NbCardComponent>;

  public dialogRef: NbDialogRef<NbCardComponent>;
  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private licenseTypeService: LicenseTypeService
  ) {
    super(injector);
  }
  public licenseTypeForm = new FormGroup({
    licenseName: new FormControl('', Validators.required),
  });
 

  ngOnInit(): void {
    this.getAll();
  }

  
  public getAll() {
    this.loading = true;
    this.subs.sink = this.licenseTypeService.get().subscribe(res => {
      if (res.ok) {
        this.licenseTypes = res.body;
      }
      this.loading = false;
    });
  }
  public get f() {
    return this.licenseTypeForm.controls;
  }
 
  
  public onAddLicenseType() {
    if(!this.licenseTypeForm.invalid){
    const name = this.f.licenseName.value;
    this.subs.sink = this.licenseTypeService.post(name).subscribe(res => {
      if (res.ok) {
        this.dialogRef.close();
        this.licenseTypes.push(res.body);
        this.toastService.showSuccess('Saved!');
        this.getAll();
      }
    });
  }else{
    this.validateAllFormFields(this.licenseTypeForm)
  }
  }

  public openDialog() {
    this.dialogRef = this.dialogService.open(this.dialog);
  }

  public onDelete(LicenseTypeToDelete: LicenseType) {
    this.confirmationDialogService
      .confirm('Are you want to Delete this Therapy Type?')
      .then(result => {
        if (result) {
          this.licenseTypeService
            .delete(LicenseTypeToDelete.id)
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

