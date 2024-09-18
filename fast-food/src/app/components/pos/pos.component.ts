import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.css'
})
export class PosComponent {
  @Output() orderCreated = new EventEmitter<Order>();

  order: Order = {
    number: Math.floor(Math.random() * 1000) + 1,
    name: '',
    description: '',
    date: new Date()
  };

  resetForm() {
    this.order = {
      number: Math.floor(Math.random() * 1000) + 1,
      name: '',
      description: '',
      date: new Date()
    };
  }

  submitOrder() {
    this.order.date = new Date();
    this.orderCreated.emit(this.order);
    console.log(this.order);
    this.resetForm();
  }
}
