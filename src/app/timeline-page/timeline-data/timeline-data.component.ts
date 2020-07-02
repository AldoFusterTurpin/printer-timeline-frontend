import { Component, ChangeDetectorRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import { TimelineService } from '../../timeline.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-timeline-data',
  templateUrl: './timeline-data.component.html',
  styleUrls: ['./timeline-data.component.scss']
})
export class TimelineDataComponent implements OnInit, AfterViewInit {   
  public uploadedXmlTableData = [];

  public selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  public displayedColumns: string[] = ['select', 'pn!sn', 'count', '%'];
  public dataSource;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public start: Date;
  public end: Date;

  public uploadedXmlsResponse: JSON = null;
  public uploadedXmls: JSON[] = null;
  public selectedUploadedXmls = null;
  public resultsLength = 0;

  private uploadedXmlSubscription: Subscription;
  private timeSubscription: Subscription;

  constructor(private timelineService: TimelineService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.uploadedXmlSubscription = this.timelineService.uploadedXmlData.subscribe(data => {
      this.uploadedXmlsResponse = data;
      this.uploadedXmls = data['Results'];
      this.selectedUploadedXmls = this.uploadedXmls;
      this.createUploadedXmlTableData();

      this.dataSource = new MatTableDataSource(this.uploadedXmlTableData);
      this.dataSource.paginator = this.paginator;

      //select all elements of table
      this.dataSource.data.forEach(row => this.selection.select(row));
    })

    this.timeSubscription = this.timelineService.timeRangeData.subscribe(
      (data: any) => {
      this.start = data.start;
      this.end = data.end;
      this.changeDetector.detectChanges();
    })
  }

  ngAfterViewInit(): void {
    /*this.dataSource = new MatTableDataSource(this.uploadedXmlTableData);
    this.dataSource.paginator = this.paginator;
    this.changeDetector.detectChanges(); */
  }

  ngOnDestroy(): void {
    this.uploadedXmlSubscription.unsubscribe();
    this.timeSubscription.unsubscribe();
  }

  private createUploadedXmlTableData() {
    //key: pn!sn
    //value: number of uploaded XMLs by that printer in the selected time range
    let printerCountMap = new Map();
    for (const element of this.uploadedXmls) {
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
    for (let [key, value] of printerCountMap) {
      let row = {
        'pn!sn': key,
        'count': value,
        '%': ((value / this.uploadedXmls.length) * 100).toFixed(2)
      };  

      this.uploadedXmlTableData.push(row);
    }
    this.resultsLength = this.uploadedXmlTableData.length;
  }

  public shouldAppear(row: any) {
    console.log(row);
    return true;
  }
}