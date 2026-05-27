import { AfterViewInit, Component } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogRef, NbIconModule } from '@nebular/theme';
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog.service';

@Component({
  selector: 'ngx-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  standalone: true,
  imports: [NbCardModule, NbIconModule, NbButtonModule]
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
      if (this.confirmationDialogService.btnCancelText)
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
