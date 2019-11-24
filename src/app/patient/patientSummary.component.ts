import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService,PatientService } from '@app/_services';

@Component({ selector: 'patient-summary', templateUrl: 'patientSummary.component.html' })
export class PatientSummaryComponent implements OnInit {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    summary: User[] = [];
    bodyText: string;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private patientService: PatientService,
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    @Input() patientID: string;
    ngOnInit() {
        this.loadSummary(this.patientID);
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    loadSummary(id: string) {

        
        this.patientService.loadSummary(id).pipe(first()).subscribe(users => {
            this.summary = users;
        });;
        
    }
}