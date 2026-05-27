import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbCardComponent, NbDialogRef, NbDialogService, NbCardModule, NbButtonModule, NbIconModule, NbFormFieldModule, NbInputModule } from '@nebular/theme';
import { AppBaseComponent } from '../../../../shared/components/app-base-component';
import { TherapyType } from '../../models/therapy-type.model';
import { TherapyTypeService } from '../../services/therapy-type.service';
import { Bind } from 'primeng/bind';
import { TableModule } from 'primeng/table';
import { PrimeTemplate } from 'primeng/api';

@Component({
    selector: 'ngx-therapy-type',
    templateUrl: './therapy-type.component.html',
    imports: [NbCardModule, NbButtonModule, Bind, TableModule, PrimeTemplate, NbIconModule, FormsModule, ReactiveFormsModule, NbFormFieldModule, NbInputModule]
})
export class TherapyTypeComponent extends AppBaseComponent implements OnInit {
  public therapyTypes: TherapyType[];
  public newTherapayName: string;
  loading: boolean;

  @ViewChild('therapyTypeDialog') dialog: TemplateRef<NbCardComponent>;

  public dialogRef: NbDialogRef<NbCardComponent>;
  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private therapyTypeService: TherapyTypeService
  ) {
    super(injector);
  }
  public therapyTypeForm = new FormGroup({
    therapyName: new FormControl('', Validators.required),
  });
 

  ngOnInit(): void {
    this.getAll();
  }

  
  public getAll() {
    this.loading = true;
    this.subs.sink = this.therapyTypeService.get().subscribe(res => {
      if (res.ok) {
        this.therapyTypes = res.body;
      }
      this.loading = false;
    });
  }
  public get f() {
    return this.therapyTypeForm.controls;
  }
 
  
  public onAddTherapyType() {
    if(!this.therapyTypeForm.invalid){
    const name = this.f.therapyName.value;
    this.subs.sink = this.therapyTypeService.post(name).subscribe(res => {
      if (res.ok) {
        this.dialogRef.close();
        this.therapyTypes.push(res.body);
        this.toastService.showSuccess('Saved!');
        this.getAll();
      }
    });
  }else{
    this.validateAllFormFields(this.therapyTypeForm)
  }
  }

  public openDialog() {
    this.dialogRef = this.dialogService.open(this.dialog);
  }

  public onDelete(therapyTypeToDelete: TherapyType) {
    this.confirmationDialogService
      .confirm('Are you want to Delete this Therapy Type?')
      .then(result => {
        if (result) {
          this.therapyTypeService
            .delete(therapyTypeToDelete.id)
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

