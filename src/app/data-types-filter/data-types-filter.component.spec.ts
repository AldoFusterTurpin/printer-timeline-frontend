import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypesFilterComponent } from './data-types-filter.component';

describe('TimelineParametersComponent', () => {
  let component: DataTypesFilterComponent;
  let fixture: ComponentFixture<DataTypesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTypesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTypesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
