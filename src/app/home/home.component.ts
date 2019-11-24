import { Component, OnInit, OnDestroy,Input  } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { ModalService } from '../_services/modal.service';
import { PatientService } from '../_services/patient.service';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    loadSummaryComponent : boolean = false;
    bodyText: string;
    selectedRow : Number;

 patientID: string;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private modalService: ModalService,
        private patientService: PatientService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    openModal(id: string, name:string) {

        var patientID = this.selectedRow;
        
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    loadSummary(id: string, name:string) {

        this.patientID = id;
        this.selectedRow = parseInt(id);
        this.loadSummaryComponent = true;
        
        //this.modalService.open(id);
    }
    
    
    
}