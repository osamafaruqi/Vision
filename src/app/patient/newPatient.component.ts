import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService, PatientService } from '@app/_services';

@Component({selector: 'new-patient', templateUrl: 'newPatient.component.html'})
export class NewPatientComponent implements OnInit {
    newPatientForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private patientService: PatientService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
          //  this.router.navigate(['/']);
        //}
    }

    ngOnInit() {
        this.newPatientForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            age: ['', Validators.required],
            gender: ['', Validators.required],
            contact:['',Validators.pattern('^[0-9]*$')],
            type:['',Validators.required],
            consultant:['',Validators.required],
            source:['',Validators.required]


        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.newPatientForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.newPatientForm.invalid) {
            return;
        }

        this.loading = true;
        this.patientService.newPatient(this.newPatientForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('New Patient Added.', true);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
