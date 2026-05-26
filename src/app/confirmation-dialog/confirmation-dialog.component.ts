import { AfterViewInit, Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog.service';

@Component({
  selector: 'ngx-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements AfterViewInit {
  title: string = '';
  message: string = '';
  btnOkText: string = '';
  btnCancelText: string = '';
  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private dialogRef: NbDialogRef<ConfirmationDialogComponent>,
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.title = this.confirmationDialogService.title;
      this.message = this.confirmationDialogService.message;
      this.btnOkText = this.confirmationDialogService.btnOkText;
      this.btnCancelText = this.confirmationDialogService.btnCancelText;
    }, 0);
  }

  public decline() {
    this.dialogRef.close();
  }

  public accept() {
    this.dialogRef.close(true);
  }
}
