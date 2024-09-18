export interface Order {
    number: number; //Numero de pedido random de 1 a 1000
    name: string; // Nombre del cliente
    description: string; //Descripcion del pedido
    date: Date; //Fecha de creacion del pedido
    isCooking?: boolean;
}
