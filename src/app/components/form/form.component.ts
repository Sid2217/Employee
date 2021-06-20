import { Component, OnInit } from '@angular/core';
import { Emp } from 'src/app/Models/Emp';
import { LogService } from 'src/app/services/log.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  emp: Emp[];
  selectedemp: Emp;
  loaded: boolean = false;
  constructor(
    private logservice: LogService
  ) { }

  ngOnInit(): void {
    this.logservice.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedemp = {
          id: '',
          empid: null,
          name: '',
          desig: '',
          sal: null,
          mail: '',
          phn: null,
          gen: '',
          lang: [],
          qual: ''
        }
      }
    })
    this.logservice.getemps().subscribe(emp => {
      this.emp = emp;
      this.loaded = true;
    });
  }
  onSelect(emp: Emp) {
    this.logservice.setFormLog(emp);
    this.selectedemp = emp;
  }
  onDelete(emp: Emp) {
    if (confirm('Are you Sure?')) {
      this.logservice.deleteemp(emp);
    }
  }
}
