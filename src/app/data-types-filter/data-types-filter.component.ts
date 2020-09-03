import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";


@Component({
  selector: 'app-data-types-filter',
  templateUrl: './data-types-filter.component.html',
  styleUrls: ['./data-types-filter.component.scss']
})
export class DataTypesFilterComponent {

  @Input()
  initialSelectedValues: [];

  @Output()
  changedSelectedValues = new EventEmitter<any[]>();

  elementsControl = new FormControl();
    
  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.elementsControl.setValue(this.initialSelectedValues);
  }

  public onElementChange(event) {
    this.changedSelectedValues.emit(this.elementsControl.value);
  }
}