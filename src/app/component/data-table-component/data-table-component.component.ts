import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/share/customer-service.service';
import { CustomerData } from 'src/app/share/data.model';

@Component({
  selector: 'app-data-table-component',
  templateUrl: './data-table-component.component.html',
  styleUrls: ['./data-table-component.component.css']
})
export class DataTableComponentComponent implements OnInit {
  public customerData:CustomerData[] = [];

  constructor(private router :Router, private customerServiceService:CustomerServiceService) {
    let customerInfo:any = localStorage.getItem("customerInfo");
    if(!customerInfo){
      customerServiceService.getCustomerData().subscribe(arg => {
        this.customerData = arg.data;
        localStorage.setItem("customerInfo",JSON.stringify(arg.data));
      });
    }
    this.customerData = JSON.parse(customerInfo);
   }

  ngOnInit(): void {}

  deleteCustomerData(data:CustomerData, index:number){
    this.customerData = this.customerData.filter(elm => elm != data);
    localStorage.setItem("customerInfo",JSON.stringify(this.customerData))
  }

  addNewData(){
    this.customerServiceService.customerData.next('');
    this.router.navigateByUrl('/customerform');
  }

  editCustomerData(data:CustomerData, index:number){
    let formdata= {
      data:data,
      type:'edit'
    }
    this.customerServiceService.customerData.next(formdata);
    this.router.navigateByUrl('/customerform');
  }

  cloneCustomerData(data:CustomerData, index:number){
    let formdata= {
      data:data,
      type:'clone'
    }
    this.customerServiceService.customerData.next(formdata);
    this.router.navigateByUrl('/customerform');
  }

}
