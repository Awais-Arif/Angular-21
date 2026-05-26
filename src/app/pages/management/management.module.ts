import { NgModule } from '@angular/core';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbMenuModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSearchModule,
  NbSelectModule,
  NbSpinnerModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from '../../@theme/theme.module';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { TherapyTypeComponent } from './components/therapy-type/therapy-type.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../shared/shared.module';
import { PagesModule } from '../pages.module';
import { LicenseTypeComponent } from './components/license-type/license-type.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RejectionReasonComponent } from './components/rejection-reason/rejection-reason.component';
import { WithdrawalRequestComponent } from './components/withdrawal-request/withdrawal-request.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { ServiceProviderWithdrawalHistoryComponent } from './components/withdrawal-request/service-provider-withdrawal-history/service-provider-withdrawal-history.component';
import { ServiceProviderDetailsComponent } from './components/service-provider/service-provider-details/service-provider-details.component';
import { ServiceProviderComponent } from './components/service-provider/service-provider.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';

const components = [
  ManagementComponent,
  TherapyTypeComponent,
  ServiceProviderComponent,
  CustomersComponent,
  CustomerDetailsComponent,
  LicenseTypeComponent,
  OrdersComponent,
  RejectionReasonComponent,
  WithdrawalRequestComponent,
  ServiceProviderDetailsComponent,
  ServiceProviderWithdrawalHistoryComponent,
  SettingsComponent,
  DashBoardComponent,
];
@NgModule({
  imports: [
    PagesModule,
    SharedModule.forRoot(),
    NbButtonModule,
    NbCardModule,
    NbFormFieldModule,
    NbIconModule,
    NbEvaIconsModule,
    NbInputModule,
    NbMenuModule,
    NbSelectModule,
    NbSpinnerModule,
    NbListModule,
    NbRadioModule,
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    ManagementRoutingModule,
    TableModule,
    NbProgressBarModule,
  ],
  declarations: [
    ...components,
    ComplaintsComponent,
  ],
})
export class ManagementModule { }
