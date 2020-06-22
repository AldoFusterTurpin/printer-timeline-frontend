import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterTimelineParametersComponent } from './timeline-parameters.component';

describe('PrinterTimelineParametersComponent', () => {
  let component: PrinterTimelineParametersComponent;
  let fixture: ComponentFixture<PrinterTimelineParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterTimelineParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterTimelineParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
