import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../http.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-vender-details',
  templateUrl: './vender-details.component.html',
  styleUrls: ['./vender-details.component.scss']
})
export class VenderDetailsComponent implements OnInit {
  displayPanel: boolean = false; // Variable to control panel visibility
  macroPoint = "http://macropoint/MercerRestApi";
  fourkites = "files@email-integrations.fourkites.com";
  firestone = "Firestone.Carrier.Mercer@jbhunt.onmicrosoft.com";
  tenFourInTransit = "http://hub.10-4.com:443/atlas/frexapi/shipment/position/Mercer";
  tenFourArriveDepart = "http://hub.10-4.com:443/atlas/frexapi/shipment/stopstatus/Mercer"
  locationApi = "http://mercerwebdev.mercer-trans.com/MercerRestApi/rest/<user>/<secret>/vendor/orderlocation";
  vendorDetailsForm: FormGroup;
  vendorList: any = []
  selectedVendor: any;
  showVendorDetails: boolean;
  selectedVendorDetails: any = [];
  constructor(private fb: FormBuilder, private apiService: HttpService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.vendorDetailsForm = this.fb.group({
      macroPoint: [],
      fourkites: [],
      firestone: [],
      tenFourInTransit: [],
      tenFourArriveDepart: [],
      locationApi: [],
    });
    // this.initVenderDetails()
    this.getVendorsList()
  }
  getVendorsList() {
    this.apiService.getApi(environment.getVendorsList).subscribe((res) => {
      console.log(res);
      this.vendorList = res;
    })
  }
  getVendorData(vendor: any) {
    this.selectedVendor = vendor;
    this.showVendorDetails = true;
    this.apiService.getApi(environment.getVendorDetails + `?vendorId=${vendor.vendorId}`).subscribe((res) => {
      console.log(res);
      this.selectedVendorDetails = res.map((res) => {
        res[res.fieldName] = res.fieldValue;
        return res;
      })
    })
  }
  initVenderDetails() {
    this.apiService.getApi(environment.getVendorDetails).subscribe((res) => {
      console.log(res);
      this.vendorDetailsForm.patchValue({
        macroPoint: this.returnValue(res, "Macropoint"),
        fourkites: this.returnValue(res, "Fourkite"),
        firestone: this.returnValue(res, "Firestone"),
        tenFourInTransit: this.returnValue(res, "Ten4").split(",")[1],
        tenFourArriveDepart: this.returnValue(res, "Ten4").split(",")[0],
        locationApi: this.returnValue(res, "LocationApi"),
      })
    })

  }
  returnValue(vendorsData, selectedVendor) {
    return vendorsData.filter((vendorData) =>
      vendorData.vendorNames == selectedVendor
    )[0].sendToInfo;
  }
  updateData(){
    this.apiService.putApi(environment.updateVendorDetails,this.selectedVendorDetails).subscribe((res) => {
      console.log(res);
      this.showVendorDetails=false;
      this.messageService.add({ severity: res.success?"success":"error",  detail: res.message })

    })
  }
}
