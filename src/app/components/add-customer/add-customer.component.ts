import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../restapi.service';
import { Customer } from '../../models/Customer';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customer: Customer = new Customer(
    0,
    '',
    '',
    this.getDate(),
    this.getTime(),
    '',
    '',
    false
  );
  date: Date;
  time: String;
  getDate() {
    var today = new Date();
    var curDate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    return curDate;
  }
  getTime() {
    var today = new Date();
    var curTime = today.getHours() + ':' + today.getMinutes();
    return curTime;
  }

  constructor(private service: RestapiService) {}

  ngOnInit(): void {}

  createCustomer(): void {
    this.service.addCustomer(this.customer).subscribe(data => {
      alert('customer created successfully.');
    });
  }
}
