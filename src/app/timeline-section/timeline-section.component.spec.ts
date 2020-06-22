import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterTimelineSectionComponent } from './timeline-section.component';

describe('PrinterTimelineSectionComponent', () => {
  let component: PrinterTimelineSectionComponent;
  let fixture: ComponentFixture<PrinterTimelineSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterTimelineSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterTimelineSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
