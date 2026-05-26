import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_auth/auth.guard';
import { ManagementComponent } from './management.component';
import { TherapyTypeComponent } from './components/therapy-type/therapy-type.component';
import { LicenseTypeComponent } from './components/license-type/license-type.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WithdrawalRequestComponent } from './components/withdrawal-request/withdrawal-request.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { ServiceProviderWithdrawalHistoryComponent } from './components/withdrawal-request/service-provider-withdrawal-history/service-provider-withdrawal-history.component';
import { ServiceProviderComponent } from './components/service-provider/service-provider.component';
import { ServiceProviderDetailsComponent } from './components/service-provider/service-provider-details/service-provider-details.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';

const routes: Routes = [{
  path: '',
  component: ManagementComponent,
  children: [
    {
      path: 'dash-board',
      component: DashBoardComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'therpay-type',
      component: TherapyTypeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'service-provider',
      component: ServiceProviderComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'customer',
      component: CustomersComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'customer-details/:id',
      component: CustomerDetailsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'license-type',
      component: LicenseTypeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'complaints',
      component: ComplaintsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'orders',
      component: OrdersComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'withdrawal-request',
      component: WithdrawalRequestComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'serviceProvider-details/:id/:isApproved',
      component: ServiceProviderDetailsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'serviceProvider-withdrawal-history/:id',
      component: ServiceProviderWithdrawalHistoryComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'settings',
      component: SettingsComponent,
      canActivate: [AuthGuard]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule { }
