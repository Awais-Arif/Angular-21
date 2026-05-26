import { Injectable } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private dialogRef: NbDialogRef<ConfirmationDialogComponent>;

  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;

  constructor(private dialogService: NbDialogService) {}

  public confirm(
    message: string,
    title: string = 'Confirm',
    btnOkText: string = 'Confirm',
    btnCancelText: string = 'Cancel',
  ): Promise<boolean> {
    this.title = title;
    this.message = message;
    this.btnOkText = btnOkText;
    this.btnCancelText = btnCancelText;

    return this.dialogService.open(ConfirmationDialogComponent, { closeOnBackdropClick: false }).onClose.toPromise();
  }
}
