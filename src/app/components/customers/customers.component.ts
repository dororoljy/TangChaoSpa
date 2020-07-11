import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../restapi.service';
import { Customer } from '../../models/Customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  phone: string;
  totalRecords: number;
  page: number = 1;
  EditRowID: any = '';
  customers: Customer[];
  constructor(private service: RestapiService) {}

  ngOnInit(): void {
    this.service
      .getCustomers()
      .subscribe(response => this.handleSuccessResponse(response));
  }
  setClasses(customer) {
    //Only apply is-complete style, when customer.completed is true
    let classes = {
      'is-complete': customer.completed
    };
    return classes;
  }
  public custom_sort(a, b) {
    if (!a.completed && !b.completed) {
      let aStringTime = a.date.substring(0, 10);
      let bStringTime = b.date.substring(0, 10);
      if (aStringTime === bStringTime) {
        return a.time.localeCompare(b.time);
      } else {
        return aStringTime.localeCompare(bStringTime);
      }
    } else if (a.completed && b.completed) {
      let aStringTime = a.date.substring(0, 10);
      let bStringTime = b.date.substring(0, 10);
      if (aStringTime === bStringTime) {
        return b.time.localeCompare(a.time);
      } else {
        return bStringTime.localeCompare(aStringTime);
      }
    } else if (a.completed) {
      return 1;
    } else {
      return -1;
    }
  }

  handleSuccessResponse(response) {
    this.customers = response;
    this.customers.sort(this.custom_sort);
    this.totalRecords = this.customers.length;
  }
  deleteCustomer(customer: Customer): void {
    this.service.deleteCustomer(customer).subscribe(data => {
      this.customers = this.customers.filter(u => u !== customer);
    });
    alert('You have successful delete cusotmer');
    location.reload();
  }
  ChangeCustomerCompleted(customer: Customer): void {
    this.service.changeCompleted(customer).subscribe(data => {
      this.customers = this.customers.filter(u => u !== customer);
    });
    alert('You have successful change cusotmer status');
    location.reload();
  }
  updateCustomer(customer: Customer): void {
    this.service.updateCustomer(customer).subscribe(data => {
      this.customers = this.customers.filter(u => u !== customer);
    });
    alert('You have successful update cusotmer');
    location.reload();
  }

  edit(val) {
    this.EditRowID = val;
  }
  search() {
    if (this.phone != '') {
      this.customers = this.customers.filter(res => {
        return res.phone
          .toLocaleLowerCase()
          .match(this.phone.toLocaleLowerCase());
      });
    } else if (this.phone == '') {
      this.ngOnInit();
    }
  }
}
