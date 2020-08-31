import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { ElementType } from '../shared/ElementType';


@Component({
  selector: 'app-data-types-filter',
  templateUrl: './data-types-filter.component.html',
  styleUrls: ['./data-types-filter.component.scss']
})
export class DataTypesFilterComponent {


  @Output()
  change = new EventEmitter<ElementType[]>();

  elementsControl = new FormControl();
  elementsList: string[] = [ElementType.OpenXml, ElementType.CloudJson, ElementType.Rta, ElementType.Hb, ElementType.PrinterSubscriptions];

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public applyFilter(event) {
    this.change.emit(this.elementsControl.value);
  }
}