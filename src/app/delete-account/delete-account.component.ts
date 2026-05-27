import { Component } from '@angular/core';
import { ToastService } from '../shared/services/toast.service';
import { UserService } from './../shared/services/user.service';
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog.service';

@Component({
    selector: 'ngx-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.scss'],
    standalone: false
})
export class DeleteAccountComponent {
  email = '';
  password = '';
  loading = false;

  constructor(
    private api: UserService,
    private toast: ToastService,
    private confirmationDialog: ConfirmationDialogService
  ) { }

  async submit() {
    if (!this.email || !this.password) {
      this.toast.showWarning('Please provide email and password');
      return;
    }

    // Show confirmation dialog
    const confirmed = await this.confirmationDialog.confirm(
      'Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently deleted.',
      'Delete Account Confirmation',
      'Yes, Delete My Account',
      'Cancel'
    );

    if (!confirmed) {
      return;
    }

    this.loading = true;
    this.api.deleteAccount(this.email, this.password).subscribe(
      () => {
        this.loading = false;
        this.toast.showSuccess('Account deleted successfully');
        this.email = '';
        this.password = '';
      },
      () => {
        this.loading = false;
        this.toast.showError('Failed to delete account');
      },
    );
  }
}
