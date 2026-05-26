/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbChatModule, NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule, NbWindowModule, NbLayoutModule } from '@nebular/theme';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { MockHttpInterceptor } from './shared/interceptors/mock.interceptor';
import { AuthGuard } from './_auth/auth.guard';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { SharedModule } from './shared/shared.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TableModule } from 'primeng/table';

@NgModule({ declarations: [AppComponent, ConfirmationDialogComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        TableModule,
        NbChatModule.forRoot({
            messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        }),
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        NbAuthModule.forRoot({
            strategies: [
                NbPasswordAuthStrategy.setup({
                    name: 'email',
                    token: {
                        class: NbAuthJWTToken,
                        key: 'token'
                    },
                    baseEndpoint: 'http://localhost:64167/api/',
                    login: {
                        endpoint: 'Account/CreateToken',
                    }
                })
            ],
            forms: {
                login: {
                // Customize login form options here
                },
                register: {
                    // Set 'hidden' to true to hide the registration form
                    hidden: true,
                },
            },
        }),
        SharedModule.forRoot(),
        NbLayoutModule], providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MockHttpInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
}
