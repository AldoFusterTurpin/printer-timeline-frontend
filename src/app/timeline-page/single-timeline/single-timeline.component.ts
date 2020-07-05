import { Component, ChangeDetectorRef, ViewChild, AfterViewInit, Input, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-single-timeline',
  templateUrl: './single-timeline.component.html',
  styleUrls: ['./single-timeline.component.scss']
})
export class SingleTimelineComponent implements OnInit, AfterViewInit {
  @Input() apiResponse: JSON;
  
  @Input() data: JSON[];

  public tableData = [];
  public selection = new SelectionModel<any>(true, []);
  public displayedColumns: string[] = ['select', 'pn!sn', 'count', '%'];
  public tableDataSource;
  public resultsLength = 0;

  public selectedData = null;

  private tablePaginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    console.log("set matPaginator called");
    this.tablePaginator = mp;

    if (this.tableDataSource) {
      this.tableDataSource.paginator = this.tablePaginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
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

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectedData = this.data; 

    let tableData = this.createUploadedXmlTableData(this.data);
    this.resultsLength = tableData.length;

    this.tableDataSource = new MatTableDataSource(tableData);

    //1r: pillar los selected
    //2n: en el data.filter(pasar pos de arrays estan en tabla)
    //this.tableDataSource.tablePaginator = this.tablePaginator;

    this.tableDataSource.data.forEach((row: any) => this.selection.select(row));
  }   

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.tablePaginator;
  }

  ngOnDestroy(): void {
  }

  
  private createTableDataArrayFromMap(myMap: Map<string, number>) {
    let tableData = [];
    
    for (let [key, value] of myMap) {
      let row = {
        'pn!sn': key,
        'count': value,
        '%': ((value / this.data.length) * 100).toFixed(2)
      };  
      tableData.push(row);
    }
    return tableData;
  }
  
  private createCountMapFromArray(data: any[]) {
    //key: pn!sn
    //value: number of uploaded XMLs by that printer in the selected time range
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

  public shouldAppear(row: any) {
    console.log(row);
    return true;
  }
}
