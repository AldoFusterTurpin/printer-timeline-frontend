import { Component, ViewChild, AfterViewInit, Input, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public elementType = ElementType;

  @Input()
  public timelineData: TimelineData;

  @Output()
  public changeDataType: EventEmitter<ElementType> = new EventEmitter<ElementType>();

  public allOpenXmlTopics: string[] = null;
  public topicsSelected: string[] = null;

  public showProgressBarBottom: boolean = false;

  public tableData = [];
  public selection = new SelectionModel<any>(true, []);
  public displayedColumns: string[] = ['select', 'pn!sn', 'count', '%'];
  public tableDataSource = null;
  public tableLength = 0;

  public dataToShow: Array<any> = [];
  public dataFilteredByPnSnTopic: Array<any> = [];

  private tablePaginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(matPaginator: MatPaginator) {
    this.tablePaginator = matPaginator;

    if (this.tableDataSource) {
      this.tableDataSource.paginator = this.tablePaginator;
    }
  }

  public openXmlTopicsFilterChanged(topicsSelected: string[]) {
    if (this.timelineData.elementName == ElementType.OpenXml) {
      this.topicsSelected = topicsSelected;

      this.filterData();
    }
  }

  public emitDataType(valueToEmit: ElementType) {
    this.changeDataType.emit(valueToEmit);
  }

  constructor(private timelineService: TimelineService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  private initComponent(input: TimelineData) {
    if (input) {
      let results = this.timelineData.apiResponse['Results'];
      if (results) {
        if (input.elementName == ElementType.OpenXml) {
          this.allOpenXmlTopics = Array.from(Utils.createSetOfTopicsFromArray(results));
          this.topicsSelected = this.allOpenXmlTopics;
        }

        let tableData = this.createTableData(results);
        this.tableLength = tableData.length;
        this.tableDataSource = new MatTableDataSource(tableData);

        if (this.tableDataSource) {
          this.tableDataSource.paginator = this.tablePaginator;
        }

      } else {
        this.tableLength = 0;
        this.tableDataSource = new MatTableDataSource([]);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // best practice: https://dev.to/nickraphael/ngonchanges-best-practice-always-use-simplechanges-always-1feg
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        let change = changes[propName];
        switch (propName) {
          case 'timelineData': {
            this.initComponent(change.currentValue);
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
  }

  private createTableData(data: any[]) {
    let printerCountMap = Utils.createCountMapFromArray(data);
    return Utils.createArrayOfObjectsFromMap(printerCountMap, this.timelineData.apiResponse['Results'].length);
  }

  public filterData() {
    this.showProgressBarBottom = true;

    setTimeout(() => {
      let selectedValuesInTable = this.selection.selected;
      let set = Utils.createSetOfPn_SnFromArray(selectedValuesInTable);
      this.dataToShow = Utils.filterArrayByPnSn(set, this.timelineData.apiResponse['Results']);

      if (this.timelineData.elementName == ElementType.OpenXml) {
        this.dataToShow = Utils.filterArrayByTopic(this.dataToShow, this.topicsSelected);
      }

      this.showProgressBarBottom = false;

      /* let message = 'Data ready below ⬇';
      let action = 'Got it!';
      this._snackBar.open(message, action, {
        duration: 5000,
        verticalPosition: 'top',
      }); */
    }, 1000);
  }

  public showDetails(element) {
    this.timelineService.emitDetails(element).subscribe();
  }

  public stringDateToDateObject(inputDate: string): Date {
    return Utils.stringDateToDateObject(inputDate);
  }

  public shortRepresentationOf(d: Date) {
    return Utils.shortRepresentationOf(d);
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

}
