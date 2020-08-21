//TODO: something is wrong when going back and selecting new options in the form. !!!!
// The mat paginator is wrong.

import { Component, ViewChild, AfterViewInit, Input, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { TimelineData } from '../../shared/timelineData';
import { ElementType } from 'src/app/shared/ElementType';
import { TimelineService } from '../../shared/timeline.service';
import Utils from '../../shared/utils';

@Component({
  selector: 'app-single-timeline',
  templateUrl: './single-timeline.component.html',
  styleUrls: ['./single-timeline.component.scss']
})
export class SingleTimelineComponent implements OnInit, AfterViewInit {
  elementType = ElementType;

  @Input() timelineData: TimelineData;

  @Output()
  changeDataType: EventEmitter<ElementType> = new EventEmitter<ElementType>();

  public emitDataType(valueToEmit: ElementType) {
    this.changeDataType.emit(valueToEmit);
  }

  public showProgressBar: boolean = false;

  public tableData = [];
  public selection = new SelectionModel<any>(true, []);
  public displayedColumns: string[] = ['select', 'pn!sn', 'count', '%'];
  public tableDataSource = null;
  public tableLength = 0;

  public selectedData = [];

  private tablePaginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(matPaginator: MatPaginator) {
    this.tablePaginator = matPaginator;

    if (this.tableDataSource) {
      this.tableDataSource.paginator = this.tablePaginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.tableDataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor(private timelineService: TimelineService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //uncomment line below to check all the checkboxes of table on init 
    //this.masterToggle();
  }

  ngAfterViewInit(): void {
    if (this.tableDataSource) {
      this.tableDataSource.paginator = this.tablePaginator;
    }

    let message = "🧐Quicktip: select some rows of the table below and press the button 'Apply checkboxes filter' to see the changes";
    let action = 'Got it!';
    let verticalPosition: MatSnackBarVerticalPosition = 'top';
    this._snackBar.open(message, action, {
      duration: 20000,
      verticalPosition: verticalPosition,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['timelineData']) {

      let tableData = this.createTableData(this.timelineData.apiResponse['Results']);
      this.tableLength = tableData.length;
      this.tableDataSource = new MatTableDataSource(tableData);

      /* uncomment line below if want to show all the timeline elements on init  */
      //this.selectedData = this.timelineData.apiResponse['Results'];
    }
  }

  ngOnDestroy(): void {
  }

  private createTableData(data: any[]) {
    let printerCountMap = Utils.createCountMapFromArray(data);
    return Utils.createArrayOfObjectsFromMap(printerCountMap, this.timelineData.apiResponse['Results'].length);
  }

  public filterSelectedItems() {
    this.showProgressBar = true;
    let selectedValuesInTable = this.selection.selected;

    setTimeout(() => {
      let set = Utils.createSetOfPn_SnFromArray(selectedValuesInTable);
      this.selectedData = Utils.createArrayOfObjectsFromSet(set, this.timelineData.apiResponse['Results']);
      this.showProgressBar = false;

      let message = 'Data ready below ⬇';
      let action = 'Got it!';
      let verticalPosition: MatSnackBarVerticalPosition = 'top';
      this._snackBar.open(message, action, {
        duration: 5000,
        verticalPosition: verticalPosition,
      });
    }, 1500);
  }

  public showDetails(element) {
    this.timelineService.emitDetails(element).subscribe();
  }

  public stringDateToDateObject(inputDate: string): Date {
    return Utils.stringDateToDateObject(inputDate);
  }
}
