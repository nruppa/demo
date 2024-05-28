import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.scss']
})
export class CustomerReportsComponent implements OnInit {
  customerReportForm: FormGroup;
  customerReports:any=[];
  didSearch=false;
  customersList:any=[]
  customers = [
    { label: '*DFLT', value: 'Billing delivery default usage only' },
    { label: 'A-1PDA', value: 'A-1 PAPER TUBE SALES' },
    { label: 'AAAB', value: 'ABB AIR' },
    { label: 'AAACOK', value: 'AAA GALVANIZING' },
    { label: 'AAACR', value: 'AAA FIRE PROTECTION' },
    { label: 'AAACSA', value: 'AAA CRANE INC' },
    { label: 'AAAFP', value: 'AAA PACKAGING' },
    { label: 'AAAGJO', value: 'AAA GALVANIZING, INC' },
    { label: 'AAAHS', value: 'ARKANSAS ALUMINUM ALLOYS' },
    { label: 'AAACSA', value: 'AAA CRANE INC' },

  ]
  cols = [
    { header: "Custmer name", width: '12%' },
    { header: "Sent count", width: '12%' },
    { header: "Not sent count", width: '5%' },
    { header: 'Total count', width: '9%' },
  ];
  data: any;
  date = new Date();
  startDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0)
  endDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 23, 59)
  options = {
    plugins: {
      legend: {
        position: 'bottom' // Change label position inside the Pie chart
      }
    }
  };
  constructor(private fb: FormBuilder, private apiService: HttpService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.customerReportForm = this.fb.group({
      fromAndToDate: [[this.startDate, this.endDate]],
      customerNames: [],
      documentType: [],
    });
    // this.generateReport();
  }
  searchCustomers(event) {
    const query = event.query;
    if (query.length >= 3) {
        this.apiService.getApi(environment.trackingCustomet + '?customerCode=' + query).subscribe(
            (res) => {
                this.customersList = res.customers;
            },
            (error) => {
                console.error('Error fetching suggestions:', error);
            }
        );
    } else {
        this.customersList = [];
    }
  }
  resetSearch() {
    this.customerReportForm.reset();
    this.didSearch=false;
    this.customerReportForm.patchValue({
      fromAndToDate: [this.startDate, this.endDate]
    })
  }
  generateReport() {
    this.didSearch=true;
    let customerData = [];
    let chatColors = [];

    let params = {
      startTime: this.datepipe.transform(this.customerReportForm.value.fromAndToDate[0], "yyyy-MM-dd HH:mm"),
      endTime:this.datepipe.transform(this.customerReportForm.value.fromAndToDate[1], "yyyy-MM-dd HH:mm"),
      customers: ["GAFCO", "CCD2FM", "UPSGFR"].toString()
    }
    this.apiService.getApi(environment.customerPiechartReports, { params: params }).subscribe((res) => {
      console.log(res);

  
    res.data.forEach((element) => {
      customerData.push(element.value);
      chatColors.push(this.getRandomColor());
    });

    this.data = {
      labels: res.data,
      datasets: [
        {
          data: res.count,
          backgroundColor: chatColors
        }
      ]
    };
  })
  this.apiService.getApi(environment.customerReportsTable, { params: params }).subscribe((res) => {
    console.log(res);
    
    this.customerReports=res;
  })
  }

  getRandomColor() {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const color = array[0] & 0xFFFFFF;
    return "#" + ("000000" + color.toString(16)).slice(-6);
  }
}
