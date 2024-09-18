import { Component, OnInit } from '@angular/core';
import { PosComponent } from "../pos/pos.component";
import { Order } from '../../interfaces/order';
import { CommonModule } from '@angular/common';
import { KitchenComponent } from "../kitchen/kitchen.component";
import { OrderService } from '../../services/order.service';
import { DeliveryPointComponent } from "../delivery-point/delivery-point.component";

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [PosComponent, CommonModule, KitchenComponent, DeliveryPointComponent],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {
  orders: Order[] = [];
  initialOrders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getInitialOrders().subscribe((orders: Order[]) => {
      this.initialOrders = orders;
    });

    this.orderService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    })
  }

  addOrder(order: Order) {
    this.orderService.addOrder(order)
  }
}
