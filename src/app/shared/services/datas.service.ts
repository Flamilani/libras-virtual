import { Injectable } from '@angular/core';
import { cINITIALS } from '../constants/initials.constant';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  listInitials = cINITIALS;

  constructor() { }

  getInitials() {
    return this.listInitials;
  }
}
