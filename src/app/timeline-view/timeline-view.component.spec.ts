import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterTimelineViewComponent } from './timeline-view.component';

describe('PrinterTimelineViewComponent', () => {
  let component: PrinterTimelineViewComponent;
  let fixture: ComponentFixture<PrinterTimelineViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterTimelineViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterTimelineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
