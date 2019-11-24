import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { NewPatientComponent, PatientSummaryComponent } from './patient';
import { ModalComponent } from './_components/modal.component';
import { NavBarComponent } from './navBar/navBar.component'
//import {MatListModule} from '@angular/material/list';
import { AppRoutingModule } from './app.routing';
//import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        FormsModule,
        MatSidenavModule,
        MatListModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
    
        //NgbModule
    ],
    declarations: [
        AppComponent,
        ModalComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        NewPatientComponent,
        PatientSummaryComponent,
        NavBarComponent
        //NgbdModalBasic
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    //exports: [NgbdModalBasic],
    bootstrap: [AppComponent]
})

export class AppModule { }