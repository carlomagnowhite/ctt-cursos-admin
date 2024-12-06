import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getSession(){
    const sessionJSON: string | null = localStorage.getItem('session');
    if(sessionJSON){
      const sessionObject = JSON.parse(sessionJSON);
      return sessionObject;
    }
    return null;
  }
}
