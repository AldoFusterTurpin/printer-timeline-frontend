import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { ElementType } from '../shared/ElementType';


@Component({
  selector: 'app-data-types-filter',
  templateUrl: './data-types-filter.component.html',
  styleUrls: ['./data-types-filter.component.scss']
})
export class DataTypesFilterComponent {

  @Input()
  initialSelectedValues: ElementType[];

  @Output()
  changedSelectedValues = new EventEmitter<ElementType[]>();

  elementsControl = new FormControl();
  
  //elementsList: string[] = [ElementType.OpenXml, ElementType.CloudJson, ElementType.Rta, ElementType.Hb, ElementType.PrinterSubscriptions];
  
  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.elementsControl.setValue(this.initialSelectedValues);
  }

  public applyFilter(event) {
    this.changedSelectedValues.emit(this.elementsControl.value);
  }
}