import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpService } from '../http.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
  // providers: [MessageService]

})
export class TrackingComponent implements OnInit {

  trackingUpdates: any[] = [];
  filteredTrackingUpdates: any[] = [];
  startDate: Date | undefined;
  endDate: Date | undefined;
  // selectedCustomer: string | undefined;
  selectedStatus: string | undefined;
  selectedTrans: string | undefined;
  // startAndEndDate:any
  database: any = "LIVE"
  customers: any[] = [
    { name: 'john' },
    { name: 'kartik' }
  ];
  vendors = [
    { label: 'FK', value: 'FourKite/Firestone' },
    { label: 'FT', value: 'TenFour' },
    { label: 'AP', value: 'Mercer API(Project 44)' },
    { label: 'MP', value: 'Macropoint' }
  ]
  statusOptions = [
    { name: 'Pending' },
    { name: 'Completed' },
    { name: 'Dispatched' }
  ]
  cols = [
    { field: 'unit', header: 'Unit' },
    { field: 'eventType', header: 'Event Type' },
    { field: 'eventTime', header: 'Event Time' },
    { field: 'bOLNumber', header: 'BOL Number' },
    { field: 'trackingNumber', header: 'Tracking Number' },
    { field: "referenceNumber", header: "Reference Number" },
    { field: "action", header: "Action" },
  ];

  customersData = [
    { label: '*DFLT', value: 'Billing delivery default usage only' },
    { label: 'A-1PDA', value: 'A-1 PAPER TUBE SALES' },
    { label: 'AAAB', value: 'ABB AIR' },
    { label: 'AAACOK', value: 'AAA GALVANIZING' },
    { label: 'AAACR', value: 'AAA FIRE PROTECTION' },
    { label: 'AAACSA', value: 'AAA CRANE INC' },
    { label: 'AAAFP', value: 'AAA PACKAGING' },
    { label: 'AAAGJO', value: 'AAA GALVANIZING, INC' },
    { label: 'AAAHS', value: 'ARKANSAS ALUMINUM ALLOYS' }
  ]
  showGrid: boolean = false;
  rowData: any;
  items: { label: string; icon: string; command: () => void; }[];
  searchForm: FormGroup
  pageNo: number = 0;
  pageSize: number = 10;
  getcust: any[] =[];
  trackingData: any=[];
  pageCount: any;
  isFetchingData = false;
  visibleCustomers: any[] = [];
  searchEndpoint: any;
  didSearch: boolean = false
  @Input() options: any[] = [];
  @Output() optionSelected = new EventEmitter<any>();

  currentPage = 1;
  // pageSize = 10;
  loading = false;
  constructor(private messageService: MessageService, private router: Router, private formBuilder: FormBuilder,
    private apiService: HttpService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      trackingRange: [''],
      trackingVendor: [''],
      trackingCustomer: ['']
    });

  }

searchCustomers(event) {
  const query = event.query;
  if (query.length >= 3) {
      this.apiService.getApi(environment.trackingCustomet + '?customerCode=' + query).subscribe(
          (res) => {
              console.log(res.customers);
              this.getcust = res.customers;
          },
          (error) => {
              console.error('Error fetching suggestions:', error);
          }
      );
  } else {
      this.getcust = [];
  }
}


  getTracking() {
    this.didSearch=true;
    console.log(this.searchForm.controls.trackingCustomer.value);
    
    const form = this.searchForm.controls;
    const startDate = form.trackingRange.value ? this.datepipe.transform(form.trackingRange.value[0], "yyyy-MM-dd HH:mm:ss") : '';
    const endDate = form.trackingRange.value ? this.datepipe.transform(form.trackingRange.value[1], "yyyy-MM-dd HH:mm:ss") : '';
    const customerCode = this.searchForm.controls.trackingCustomer.value === null || this.searchForm.controls.trackingCustomer.value === undefined ? '' :
      this.searchForm.controls.trackingCustomer.value.customerCode
      //const vendorCode =this.searchForm.value.trackingVendor;
    if (startDate && endDate) {
      this.searchEndpoint = '?startDate=' + startDate + ' &endDate=' + endDate + '&page=' + this.pageNo + '&size=' + this.pageSize
    } else if (customerCode && startDate == '' && endDate == '') {
      this.searchEndpoint = '?customerCode=' + customerCode + '&page=' + this.pageNo + '&size=' + this.pageSize
    } else {
      this.searchEndpoint = '?page=' + this.pageNo + '&size=' + this.pageSize
    }

    this.apiService.getApi(environment.trackingSearch + this.searchEndpoint).subscribe(res => {
      this.trackingData = res.trackingDetails
      this.pageCount = res.totalCount
    })
  }
  paginate(event) {
    const { page, rows } = event;
    if (![page, rows].every((param, index) => param === [this.pageNo, this.pageSize][index])) {
      this.pageNo = page;
      this.pageSize = rows;
      this.getTracking();
    }
  }

  // searchData() {
  //   const form = this.searchForm.controls;
  //   const startDate = form.trackingRange.value ? this.datepipe.transform(form.trackingRange.value[0], "yyyy-MM-dd HH:mm:ss") : '';
  //   const endDate = form.trackingRange.value ? this.datepipe.transform(form.trackingRange.value[1], "yyyy-MM-dd HH:mm:ss") : '';
  //   const customerCode = this.searchForm.controls.trackingCustomer.value === null || this.searchForm.controls.trackingCustomer.value === undefined ? '' :
  //     this.searchForm.controls.trackingCustomer.value

  //   this.apiService.getApi(environment.trackingSearch + '?startDate=' + startDate + '&endDate=' + endDate + '&customerCode=' + customerCode + '&page=' + this.pageNo + '&size=' + this.pageSize)
  //     .subscribe(res => {
  //       console.log(res);
  //       this.getTracking()
  //     });
  // }

  resetSearch(): void {
    this.searchForm.reset();
    this.didSearch=false;
  }

  viewTrackingData(data) {
    console.log("edit", data);
    this.router.navigate(['/tracking-details'])
    localStorage.setItem('trackingData', JSON.stringify(data))
  }
}
