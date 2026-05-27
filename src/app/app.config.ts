import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import {
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
} from '@nebular/theme';

import { appRoutes } from './app.routes';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './_auth/auth.guard';
import { MockHttpInterceptor } from './shared/interceptors/mock.interceptor';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection(),
        provideAnimations(),
        provideRouter(appRoutes),
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(
            NbSidebarModule.forRoot(),
            NbMenuModule.forRoot(),
            NbDatepickerModule.forRoot(),
            NbDialogModule.forRoot(),
            NbWindowModule.forRoot(),
            NbToastrModule.forRoot(),
            CoreModule.forRoot(),
            ThemeModule.forRoot(),
            NbAuthModule.forRoot({
                strategies: [
                    NbPasswordAuthStrategy.setup({
                        name: 'email',
                        token: {
                            class: NbAuthJWTToken,
                            key: 'token',
                        },
                        baseEndpoint: 'http://localhost:64167/api/',
                        login: {
                            endpoint: 'Account/CreateToken',
                        },
                    }),
                ],
                forms: {
                    login: {},
                    register: {
                        hidden: true,
                    },
                },
            }),
            SharedModule.forRoot(),
        ),
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MockHttpInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
};
