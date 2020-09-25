import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-printer-subscriptions-data',
  templateUrl: './printer-subscriptions-data.component.html',
  styleUrls: ['./printer-subscriptions-data.component.scss']
})
export class PrinterSubscriptionsDataComponent implements OnInit {
  @Input()
  subscriptions: any[] = null;

  public tableData = [];
  public displayedColumns: string[] = ['PrinterID', 'AccountID', 'ServiceID', 'RegistrationTimeEpoch'];
  public tableDataSource = null;
  public tableLength = 0;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() { }

  ngOnInit(): void {
  }

  private initComponent(subscriptions: any) {
    if (subscriptions) {
      let tableData = subscriptions;
      this.tableLength = subscriptions.length;
      this.tableDataSource = new MatTableDataSource(tableData);

      if (!this.tableDataSource) {
        this.tableLength = 0;
        this.tableDataSource = new MatTableDataSource([]);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        let change = changes[propName];
        switch (propName) {
          case 'subscriptions': {
            this.initComponent(change.currentValue);
          }
        }
      }
    }
  }

}
