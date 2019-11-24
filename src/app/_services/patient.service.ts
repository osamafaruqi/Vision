import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { PatientInfo } from '@app/_models';
import { User } from '@app/_models/user';


@Injectable({ providedIn: 'root' })
export class PatientService {
    constructor(private http: HttpClient) { }
    newPatient(patientInfo: PatientInfo) {
        return this.http.post(`${environment.apiUrl}/users/register`, patientInfo);


    }

    loadSummary(patientID : string){

        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
}