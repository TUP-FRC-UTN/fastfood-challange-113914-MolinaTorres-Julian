import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-delivery-point',
  standalone: true,
  imports: [],
  templateUrl: './delivery-point.component.html',
  styleUrl: './delivery-point.component.css'
})
export class DeliveryPointComponent implements OnInit {
  readyOrders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getReadyOrders().subscribe((orders: Order[]) => {
      this.readyOrders = orders;
    });
  }

  deliverOrder(order: Order) {
    this.orderService.deliverOrder(order);
  }
}
