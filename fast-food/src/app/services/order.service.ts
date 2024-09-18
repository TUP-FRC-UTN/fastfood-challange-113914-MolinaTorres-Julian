import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private readyOrdersSubject = new BehaviorSubject<Order[]>([]);
  private initialOrdersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();
  readyOrders$ = this.readyOrdersSubject.asObservable();
  initialOrders$ = this.initialOrdersSubject.asObservable();

  private currentCookingOrder: Order | null = null;

  addOrder(order: Order) {
    const currentOrders = this.ordersSubject.value;
    const initialOrders = this.initialOrdersSubject.value;
    this.ordersSubject.next([...currentOrders, order]);
    this.initialOrdersSubject.next([...initialOrders, order])
  }

  setOrderCooking(order: Order) {
    if (this.currentCookingOrder) {
      return;
    }

    this.currentCookingOrder = order;
    order.isCooking = true;
    this.updateOrders();
  }

  clearCookingOrder() {
    if (this.currentCookingOrder) {
      this.currentCookingOrder.isCooking = false;
      this.moveToReadyOrders(this.currentCookingOrder);
      this.removeFromPending(this.currentCookingOrder);
      this.currentCookingOrder = null;
      this.updateOrders();
    }
  }

  private removeFromPending(order: Order) {
    const currentOrders = this.ordersSubject.value.filter(o => o.number !== order.number);
    this.ordersSubject.next(currentOrders);
  }

  private moveToReadyOrders(order: Order) {
    const currentReadyOrders = this.readyOrdersSubject.value;
    this.readyOrdersSubject.next([...currentReadyOrders, order])
  }

  private updateOrders() {
    const currentOrders = this.ordersSubject.value;
    this.ordersSubject.next([...currentOrders])
  }

  deliverOrder(order: Order) {
    const currentReadyOrders = this.readyOrdersSubject.value.filter(o => o.number !== order.number);
    this.readyOrdersSubject.next(currentReadyOrders);
    alert(`El pedido de ${order.name} - ${order.description} se entregó correctamente!`)
  }

  getReadyOrders() {
    return this.readyOrders$;
  }

  getInitialOrders() {
    return this.initialOrders$;
  }

  getOrders() {
    return this.orders$;
  }
}
