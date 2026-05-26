import { Injectable } from '@angular/core';
import { NbToastrService, NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastPosition: NbGlobalPhysicalPosition;

  constructor(private toastrService: NbToastrService) {
    this.toastPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  }

  public toast(
    messageKey: string,
    titleKey?: string,
    status: NbComponentStatus = 'success',
    position: NbGlobalPhysicalPosition = NbGlobalPhysicalPosition.TOP_RIGHT,
  ) {
    return this.toastrService.show(messageKey, titleKey, {
      status,
      position,
    });
  }

  public showError(messageKey: string, titleKey?: string) {
    this.toast(messageKey, titleKey ? titleKey : 'common.alert.error', 'danger', this.toastPosition);
  }

  public showWarning(messageKey: string, titleKey?: string) {
    this.toast(messageKey, titleKey ? titleKey : 'common.alert.warning', 'warning', this.toastPosition);
  }

  public showSuccess(messageKey: string, titleKey?: string) {
    this.toast(messageKey, titleKey ? titleKey : 'common.alert.success', 'success', this.toastPosition);
  }

  public showInfo(messageKey: string, titleKey?: string) {
    this.toast(messageKey, titleKey ? titleKey : 'common.alert.info', 'info', this.toastPosition);
  }
}
