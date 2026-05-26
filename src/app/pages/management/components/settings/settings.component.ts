import { Component, Injector, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppBaseComponent } from '../../../../shared/components/app-base-component';
import { NbCardComponent, NbDialogRef } from '@nebular/theme';
import { Settings } from '../../models/settings.model';

@Component({
    selector: 'ngx-settings',
    templateUrl: './settings.component.html',
    standalone: false
})
export class SettingsComponent extends AppBaseComponent implements OnInit {
  public dialogRef: NbDialogRef<NbCardComponent>;
  public settingsModel: Settings = {} as Settings;
  constructor(private injector: Injector,
    private settingService: SettingService) {
    super(injector);
  }

  public settingForm;
  ngOnInit(): void {
    this.getSettings();

    this.settingForm = new FormGroup({
      withdrawalPercentage: new FormControl(this.settingsModel.withdrawalPercentage, Validators.required),
      servicePercentage: new FormControl(this.settingsModel.servicePercentage, Validators.required),
      serviceProviderAvailability: new FormControl(this.settingsModel.serviceProviderAvailability, Validators.required),
    });
  }

  getSettings() {
    this.settingService.get().subscribe({
      next: res => {
        if (res.ok) {
          if (res.body?.length != 0) {
            this.settingsModel = res.body[0];
            this.settingForm.get('withdrawalPercentage').setValue(res.body[0].withdrawalPercentage);
            this.settingForm.get('servicePercentage').setValue(res.body[0].servicePercentage);
            this.settingForm.get('serviceProviderAvailability').setValue(res.body[0].serviceProviderAvailability);
          }
        }
      }
    })
  }

  updateSettings() {
    if (!this.settingForm.invalid) {
      const withdrawalper = parseFloat(this.settingForm.controls.withdrawalPercentage.value);
      const serviceper = parseFloat(this.settingForm.controls.servicePercentage.value);
      const docAvailability = parseFloat(this.settingForm.controls.serviceProviderAvailability.value);
      this.subs.sink = this.settingService.put(withdrawalper, serviceper, this.settingsModel.id, docAvailability).subscribe(res => {
        if (res.ok) {
          this.toastService.showSuccess('Updaed!');
        }
      });
    } else {
      this.validateAllFormFields(this.settingForm)
    }
  }
  createSettings() {
    if (!this.settingForm.invalid) {
      const withdrawalper = parseFloat(this.settingForm.controls.withdrawalPercentage.value);
      const serviceper = parseFloat(this.settingForm.controls.servicePercentage.value);
      const docAvailability = parseFloat(this.settingForm.controls.serviceProviderAvailability.value);
      this.subs.sink = this.settingService.post(withdrawalper, serviceper, docAvailability).subscribe(res => {
        if (res.ok) {
          this.toastService.showSuccess('Saved!');
        }
      });
    } else {
      this.validateAllFormFields(this.settingForm)
    }
  }
}
