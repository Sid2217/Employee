import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Emp } from 'src/app/Models/Emp';
import { LogService } from 'src/app/services/log.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';

@Component({
  selector: 'app-log-forms',
  templateUrl: './log-forms.component.html',
  styleUrls: ['./log-forms.component.css']
})
export class LogFormsComponent implements OnInit {
  designation = [{ name: 'Manager', value: 1 }, { name: 'Software Developer', value: 2 }, { name: 'Software Testers', value: 3 }, { name: 'Admin', value: 4 }]
  desigselected: string;
  language: any = ['English', 'Hindi', 'Marathi'];
  langselected: string[] = [];
  lanselect: boolean = false;
  Gender: any = ['Male', 'Female', 'Others'];
  genselected: string = '';
  id: string;
  empid: number;
  name: string;
  desig: string;
  sal: number;
  mail: string;
  phn: number;
  gen: string;
  lang: string[];
  qual: string;
  isNew: boolean = true;
  constructor(private logservice: LogService) { }

  ngOnInit(): void {
    this.logservice.selected.subscribe(emp => {
      if (emp.id != null) {
        this.isNew = false;
        this.id = emp.id;
        this.empid = emp.empid;
        this.name = emp.name;
        this.desig = emp.desig;
        this.sal = emp.sal;
        this.mail = emp.mail;
        this.phn = emp.phn;
        this.gen = emp.gen;
        this.lang = emp.lang;
        this.qual = emp.qual;
      }
    })
  }

  langchange(event: any) {

    if (this.langselected.indexOf(event.target.value) !== -1) {
      this.langselected.splice(this.langselected.indexOf(event.target.value), 1)
    }
    else {
      this.langselected.push(event.target.value);
    }
    console.log(this.langselected);
  }
  genchange(event: any) {
    this.genselected = event.target.value;
  }
  onSubmit() {
    // console.log(this.genselected)
    if (this.isNew) {
      const newemp = {
        id: this.generateID(),
        empid: this.empid,
        name: this.name,
        desig: this.desigselected,
        sal: this.sal,
        mail: this.mail,
        phn: this.phn,
        gen: this.genselected,
        lang: this.langselected,
        qual: this.qual
      }
      this.logservice.addemp(newemp);
      //  this.langselected = [];
    } else {
      const updemp = {
        id: this.id,
        empid: this.empid,
        name: this.name,
        desig: this.desigselected,
        sal: this.sal,
        mail: this.mail,
        phn: this.phn,
        gen: this.genselected,
        lang: this.langselected,
        qual: this.qual
      }
      this.logservice.updateemp(updemp);
      // this.langselected = [];
    }
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.empid = null;
    this.name = '';
    this.desig = '';
    this.sal = null;
    this.mail = '';
    this.phn = null;
    this.gen = '';
    this.lang = [];
    this.qual = '';
    this.desigselected = '';
    this.langselected = [];
    this.logservice.clearState();
  }

  generateID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


}
