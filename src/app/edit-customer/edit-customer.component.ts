import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

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
  customerData: any;
  constructor(private fb: FormBuilder,private router: Router,private apiService:HttpService,private messageService:MessageService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.setcreateAndEditForm();
  }
  trackingOptions: SelectItem[] = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
];
  createForm() {
    this.createAndEditForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: [''],
      state: [''],
      status: [],
      postalCode: [''],
      address1: ['', Validators.required],
      address2: [''],
      contactName: [''],
      controllingShipper: [''],
      allowAsShipper: [''],
      allowAsBillTo: [''],
      allowAsLoadAt: [''],
      allowAsConsignee: [''],
      subscriptionType: [''],
      controlling: [''],
      billTo: [''],
      shipper: [''],
      trackingRequired: [''],
      transmissionId: [''],
      isAPI: [''],
      apiVersion: [''],
      thirdPartyService: ['']
    });
    this.customerData = JSON.parse(localStorage.getItem('editCustomerData'))
  }

  setcreateAndEditForm(){
    this.createAndEditForm.patchValue({ ...this.customerData});
  }

  updateCustomer() {
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
    this.apiService.putApi(environment.updateCustomer + this.customerData.customerCode, data).subscribe((res) => {
      if (res.success === true) {
        this.messageService.add({ severity: "success", summary: "Success", detail: res.message })
        this.createAndEditForm.reset();
      }  else {
        this.messageService.add({ severity: "error", summary: "error", detail: res.message});
      }
    })
  }
  }

  goBack(): void {
    // Use the Router service to navigate to the desired page
    this.router.navigate(['/customer']); // Replace 'desired-page' with the route of the page you want to navigate to
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

  submitForm() {
    if (this.createAndEditForm.valid) {
      // Perform action to submit form
      console.log('Form submitted successfully:', this.createAndEditForm.value);
    } else {
      // Handle form validation errors
      console.log('Form has validation errors.');
    }
  }
}
