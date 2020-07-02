import { Component, ChangeDetectorRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { TimelineService } from '../timeline.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-timeline-raw',
  templateUrl: './timeline-raw.component.html',
  styleUrls: ['./timeline-raw.component.scss']
})
export class TimelineRawComponent implements OnInit, AfterViewInit { 
  public uploadedXmlTableData = [];

  public displayedColumns: string[] = ['pn!sn', 'count', '%'];
  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public start: Date;
  public end: Date;

  public uploadedXmlsResponse: JSON = null;
  public uploadedXmls: JSON[] = null;
  public resultsLength = 0;

  private uploadedXmlSubscription: Subscription;
  private timeSubscription: Subscription;

  constructor(private timelineService: TimelineService, private changeDetector: ChangeDetectorRef) { }

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

  ngOnInit(): void {
    this.uploadedXmlSubscription = this.timelineService.uploadedXmlData.subscribe(data => {
      this.uploadedXmlsResponse = data;
      this.uploadedXmls = data['Results'];
      this.createUploadedXmlTableData();
      this.dataSource.paginator = this.paginator;
    })

    this.timeSubscription = this.timelineService.timeRangeData.subscribe(
      (data: any) => {
      //console.log("Time range received in timeline raw");
      console.log(data);
      this.start = data.start;
      this.end = data.end;
      console.log(this.start);
      console.log(this.end);
      this.changeDetector.detectChanges();
    })
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.uploadedXmlTableData);
    this.changeDetector.detectChanges();

    this.dataSource.paginator = this.paginator; 
  }

  ngOnDestroy(): void {
    this.uploadedXmlSubscription.unsubscribe();
    this.timeSubscription.unsubscribe();
  }
}