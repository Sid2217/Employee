import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogFormsComponent } from './log-forms.component';

describe('LogFormsComponent', () => {
  let component: LogFormsComponent;
  let fixture: ComponentFixture<LogFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
