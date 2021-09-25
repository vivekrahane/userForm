import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/share/customer-service.service';

@Component({
  selector: 'app-reactive-form-component',
  templateUrl: './reactive-form-component.component.html',
  styleUrls: ['./reactive-form-component.component.css']
})
export class ReactiveFormComponentComponent implements OnInit {
  public customerForm = new FormGroup({});
  public selectedHobbies:string = "";
  public submitButton:string = 'Submit';
  public buttonType:string = ' ';
  constructor(private router : Router,private customerServiceService:CustomerServiceService,) {
    this.customerForm = new FormGroup({
      customerid:new FormControl(''),
      name:new FormControl('', [Validators.required, Validators.maxLength(30)]),
      emailid:new FormControl('',[Validators.required, Validators.email]),
      city:new FormControl('', Validators.required),
      state:new FormControl('', Validators.required),
      country:new FormControl('', Validators.required),
      hobbies:new FormControl('', Validators.required),
      address1:new FormControl('', Validators.required),
      address2:new FormControl('', Validators.required),
    });
  
   }

  ngOnInit(): void {
    this.customerServiceService.Data().subscribe(arg => {
      this.customerForm.reset();
      if(arg && arg['type'].toLowerCase() === 'edit'){
        this.submitButton = 'Update';
       this.selectedHobbies = arg['data'].hobbies = arg['data'].hobbies.toString();
       this.customerForm.patchValue(arg['data']);
      }
      if(arg && arg['type'].toLowerCase() === 'clone'){
        this.submitButton = 'Submit';
        this.buttonType = 'clone';
       this.selectedHobbies = arg['data'].hobbies = arg['data'].hobbies.toString();
       this.customerForm.setValue(arg['data']);
      }
    })
  }

  SubmitCustomerForm() {
    let submitValue = this.customerForm.value;
    submitValue.hobbies = submitValue.hobbies.split(',');
    if(this.submitButton.toLowerCase() === 'update'){
      let customerAllData:any = localStorage.getItem("customerInfo");
      let customArray:any[] = customerAllData = JSON.parse(customerAllData);
      customArray.filter(data => data.customerid == submitValue['customerid']).map(opt => { Object.assign(opt,submitValue)});
      localStorage.setItem("customerInfo",JSON.stringify(customArray));
      this.router.navigateByUrl('/customerdata');
    }else{
      submitValue.customerid = Math.floor(1000 + Math.random() * 9000);
      let customerAllData:any = localStorage.getItem("customerInfo");
      let customArray:any[] = customerAllData = JSON.parse(customerAllData);
      customArray.push(submitValue);
      localStorage.setItem("customerInfo",JSON.stringify(customArray));
      this.router.navigateByUrl('/customerdata');
    }
  }

}
