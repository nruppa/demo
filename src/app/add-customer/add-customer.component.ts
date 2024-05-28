import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  createAndEditForm: FormGroup;
  activeIndex: number = 0;

  steps = [
    { label: 'Personal Information' },
    { label: 'Account Information' },
    { label: 'Additional Information' },

    // Add more steps as needed
  ];
  country = [
    { name: 'USA', code: 'USA' }
  ]
  yesOrNo = [
    { name: 'Yes', code: 'Y' },
    { name: 'No', code: 'N' }
  ]
  statusOptions = [
    { name: "ACTIVE", code: "A" },
    { name: "INACTIVE", code: "I" },
  ];
  vendors = [
    { label: 'FK', value: 'FourKite/Firestone' },
    { label: 'TF', value: 'TenFour' },
    { label: 'AP', value: 'Mercer API(Project 44)' },
    { label: 'MP', value: 'Macropoint' }
  ]
  constructor(private fb: FormBuilder, private router: Router, private apiService: HttpService, private messageService: MessageService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.createAndEditForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z]*')]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      country: ['', [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      address1: ['', [Validators.required]],
      address2: [''],
      contactName: [''],
      status: [],
      controllingShipper: [null, [Validators.required]],
      allowAsShipper: [null, [Validators.required]],
      allowAsBillTo: [null, [Validators.required]],
      allowAsLoadAt: [null, [Validators.required]],
      allowAsConsignee: [null, [Validators.required]],
      subscriptionType: [],
      controlling: [],
      billTo: [],
      shipper: [],
      trackingRequired: [],
      transmissionId: [''],
      isAPI: [],
      apiVersion: [''],
      thirdPartyService: ['']
    });
  }

  addCustomer() {
    console.log("addCustomer method", this.createAndEditForm.controls.subscriptionType.value);
    const custForm = this.createAndEditForm.value
    if (this.createAndEditForm.invalid) {
      Object.keys(this.createAndEditForm.controls).forEach(formControlName => {
        this.createAndEditForm.get(formControlName).markAsTouched();
      });
    } else {
      const data = {
        "address1": custForm.address1,
        "address2": custForm.address2,
        "allowAsBillTo": custForm.allowAsBillTo,
        "allowAsConsignee": custForm.allowAsConsignee,
        "allowAsLoadAt": custForm.allowAsLoadAt,
        "allowAsShipper": custForm.allowAsShipper,
        "city": custForm.city,
        "contactName": custForm.contactName,
        "controllingShipper": custForm.controllingShipper,
        "country": custForm.country,
        "customerCode": custForm.customerCode,
        "name": custForm.name,
        "phone": custForm.phone,
        "postalCode": custForm.postalCode,
        "state": custForm.state,
        "status": custForm.status,
        "subscriptionType": custForm.subscriptionType,
        "controlling": custForm.controlling,
        "billTo": custForm.billTo,
        "shipper": custForm.shipper,
        "trackingRequired": custForm.trackingRequired,
        "transmissionId": custForm.transmissionId,
        "isAPI": custForm.isAPI,
        "apiVersion": custForm.apiVersion,
        "thirdPartyService": custForm.thirdPartyService
      }
      console.log(data);
      this.apiService.postApi(environment.addCustomer, data).subscribe((res) => {
        console.log(res);
        if (res.success === true) {
          this.messageService.add({ severity: "success", summary: "Success", detail: res.message })
          this.createAndEditForm.reset();
        } else {
          this.messageService.add({ severity: "error", summary: "error", detail: res.message });
        }
        // this.router.navigate(['/customer'])
      })
    }
  }


  goBack(): void {
    // Use the Router service to navigate to the desired page
    this.router.navigate(['/customer']);
  }

  nextStep() {
    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
    }
  }

  prevStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

}