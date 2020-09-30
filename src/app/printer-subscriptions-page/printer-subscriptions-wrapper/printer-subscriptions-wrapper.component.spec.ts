import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PrinterSubscriptionsWrapperComponent } from './printer-subscriptions-wrapper.component';
import { PrinterSubscriptionsService } from '../../shared/printer-subscriptions.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PrinterSubscriptionsWrapperComponent', () => {
  let component: PrinterSubscriptionsWrapperComponent;
  let fixture: ComponentFixture<PrinterSubscriptionsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterSubscriptionsWrapperComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [FormBuilder, PrinterSubscriptionsService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterSubscriptionsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
