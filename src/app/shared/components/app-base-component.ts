import { Component, HostListener, Inject, Injector, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { SubSink } from 'subsink';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { TableModule } from 'primeng/table';
@Component({
  template: '',
})
export abstract class AppBaseComponent implements OnDestroy {
  protected toastService: ToastService;
  protected formHasChange: boolean = false;
  protected confirmationDialogService: ConfirmationDialogService;
  @HostListener('window:beforeunload')
  public canDeactivate(): Observable<boolean> | boolean {
    return !this.formHasChange;
  }

  constructor(@Inject(Injector) injector: Injector | undefined) {
    this.toastService = injector.get(ToastService);
    this.confirmationDialogService = injector.get(ConfirmationDialogService);
  }

  /**The subscription sink object that stores all subscriptions */
  public subs = new SubSink();
  /**
   * The lifecycle hook that unsubscribes all subscriptions
   * when the component / object gets destroyed
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (!control.valid || control.hasError) {
          control.markAsTouched({ onlySelf: true });
          control.markAsDirty({ onlySelf: true });
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((innerFormGroup: FormGroup) => {
          this.validateAllFormFields(innerFormGroup);
        });
      }
    });
  }

  public onFormValueChange(formGroup: FormGroup): void {
    const initialValue = formGroup.value;
    this.subs.sink = formGroup.valueChanges.subscribe(value => {
      this.formHasChange = Object.keys(initialValue).some(key => formGroup.value[key] !== initialValue[key]);
    });
  }
}
