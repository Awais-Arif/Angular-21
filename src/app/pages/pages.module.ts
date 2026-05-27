import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbMenuModule, NbRadioModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        TableModule,
        NbButtonModule,
        NbCardModule,
        NbFormFieldModule,
        NbIconModule,
        NbInputModule,
        NbMenuModule,
        NbSelectModule,
        NbSpinnerModule,
        NbListModule,
        NbRadioModule,
        SharedModule,
        PagesComponent,
    ],
})
export class PagesModule {
}
