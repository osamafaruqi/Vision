import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services';

@Component({selector: 'navBar',templateUrl: 'navBar.component.html'})
export class NavBarComponent implements OnInit {

    constructor(private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        }

    ngOnInit() {
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    // convenience getter for easy access to form fields
    
}
