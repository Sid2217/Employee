import { Emp } from './../Models/Emp';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LogService {
  emp: Emp[];
  private logSource = new BehaviorSubject<Emp>({ id: null, empid: null, name: null, desig: null, sal: null, mail: null, phn: null, gen: null, lang: null, qual: null })
  selected = this.logSource.asObservable();
  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();
  constructor() {
    this.emp = []
  }
  getemps(): Observable<Emp[]> {
    if (localStorage.getItem('emp') == null) {
      this.emp = [];
    } else {
      this.emp = JSON.parse(localStorage.getItem('emp'));
    }
    return of(this.emp);
  }

  setFormLog(emp: Emp) {
    this.logSource.next(emp);
  }

  addemp(emp: Emp) {
    this.emp.unshift(emp);
    localStorage.setItem('emp', JSON.stringify(this.emp))
  }
  updateemp(emp: Emp) {
    this.emp.forEach((curr, index) => {
      if (emp.id == curr.id) {
        this.emp.splice(index, 1)
      }
    })
    this.emp.unshift(emp);
    localStorage.setItem('emp', JSON.stringify(this.emp))
  }
  deleteemp(emp: Emp) {
    this.emp.forEach((curr, index) => {
      if (emp.id == curr.id) {
        this.emp.splice(index, 1)
      }
    })
    localStorage.setItem('emp', JSON.stringify(this.emp))
  }
  clearState() {
    this.stateSource.next(true)
  }
}
