
import { DeleteAccountComponent } from './delete-account.component';
import { DeleteAccountRoutingModule } from './delete-account-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbMenuModule, NbSelectModule, NbSpinnerModule, NbListModule, NbRadioModule, NbPopoverModule, NbSearchModule, NbAlertModule, NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
    imports: [
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
        DeleteAccountRoutingModule,
        NbLayoutModule,
        DeleteAccountComponent
    ]
})
export class DeleteAccountModule { }
