import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbMenuModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTooltipModule,
} from '@nebular/theme';

import { ToastService } from './services/toast.service';
import { DateTimePipe } from './pipes/date-time.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { ThemeModule } from '../@theme/theme.module';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        // Directives
        // Pipes
        DateTimePipe,
        YesNoPipe],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ThemeModule,
        TableModule,
        // Nebular
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
        NbTooltipModule,
        NbTabsetModule,
        // Other
        YesNoPipe,
        DateTimePipe,
    ],
    providers: [
        DateTimePipe,
        YesNoPipe,
    ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [ToastService],
    };
  }
}
