import { Component, ViewChild, AfterViewInit, Input, OnInit, SimpleChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TimelineData } from '../../../../timelineData';
import { TimelineService } from '../../timeline.service';

@Component({
  selector: 'app-single-timeline',
  templateUrl: './single-timeline.component.html',
  styleUrls: ['./single-timeline.component.scss']
})
export class SingleTimelineComponent implements OnInit, AfterViewInit {
  @Input() timelineData: TimelineData;

  public showProgressBar: boolean = false;

  public tableData = [];
  public selection = new SelectionModel<any>(true, []);
  public displayedColumns: string[] = ['select', 'pn!sn', 'count', '%'];
  public tableDataSource = null;
  public tableLength = 0;

  public selectedData = null;

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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    let tableData = this.createUploadedXmlTableData(this.timelineData.apiResponse['Results']);
    this.tableLength = tableData.length;

    this.tableDataSource = new MatTableDataSource(tableData);

    this.masterToggle();
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.tablePaginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['timelineData']) {
      this.selectedData = this.timelineData.apiResponse['Results'];
    }
  }

  ngOnDestroy(): void {
  }


  private createTableDataArrayFromMap(myMap: Map<string, number>) {
    let tableData = [];

    for (let [key, value] of myMap) {
      let row = {
        'pn!sn': key,
        'count': value,
        '%': ((value / this.timelineData.apiResponse['Results'].length) * 100).toFixed(2)
      };
      tableData.push(row);
    }
    return tableData;
  }

  private createCountMapFromArray(data: any[]) {
    //key: pn!sn
    //value: how many times appears printer in data
    //i.e: number of data ('howm many' xmls, jsons, etc) sent by that printer in the selected time range
    let printerCountMap = new Map();
    for (const element of data) {
      let pn = element[1]['Value'];
      let sn = element[2]['Value'];
      let key = pn + '!' + sn;

      if (printerCountMap.has(key)) {
        printerCountMap.set(key, printerCountMap.get(key) + 1);
      } else {
        printerCountMap.set(key, 1);
      }
    }

    //sort the map by value
    printerCountMap[Symbol.iterator] = function* () {
      yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    }
    return printerCountMap;
  }

  private createUploadedXmlTableData(data: any[]) {
    let printerCountMap = this.createCountMapFromArray(data);
    return this.createTableDataArrayFromMap(printerCountMap);
  }

  private createSetOfPrintersFromArrayOfSelectedElements(data: any[]): Set<string> {
    let set = new Set<string>();

    for (const element of data) {
      let key = element['pn!sn'];
      set.add(key);
    }

    return set;
  }

  private createSelectedDataFromSet(set: Set<string>) {
    let selectedData = [];

    for (const element of this.timelineData.apiResponse['Results']) {
      let pn = element[1]['Value'];
      let sn = element[2]['Value'];
      let key = pn + '!' + sn;

      if (set.has(key)) {
        selectedData.push(element);
      }
    }

    return selectedData;
  }

  public filterSelectedItems() {
    this.showProgressBar = true;
    let selectedValues = this.selection.selected;

    setTimeout(() => {
      let set = this.createSetOfPrintersFromArrayOfSelectedElements(selectedValues);
      this.selectedData = this.createSelectedDataFromSet(set);
      this.showProgressBar = false;
      this.openSnackBar('Data ready below ⬇', 'Got it!');
    }, 1500);
  }

  public showDetails(element) {
    this.timelineService.emitDetails(element).subscribe();
  }
}
