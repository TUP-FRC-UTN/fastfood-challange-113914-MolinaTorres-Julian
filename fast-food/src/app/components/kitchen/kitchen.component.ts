import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent implements OnInit {
  orders: Order[] = [];
  cookingOrder: Order | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders.filter(order => !order.isCooking)
    });
  }

  cookOrder(order: Order) {
    if (!this.cookingOrder) {
      this.orderService.setOrderCooking(order);
      this.cookingOrder = order;
    }
  }

  finishCooking() {
    this.orderService.clearCookingOrder();
    this.cookingOrder = null;
  }
}
