import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/enviroment';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  url: string;
  img_url: string;
  sku: string;
}

interface Notification {
  type: string;         // Tipo de mensaje: "Atencion" o "Oferta"
  lowerPrice: number;   // Precio mínimo
  higherPrice: number;  // Precio máximo
  product: Product;     // Producto asociado a la notificación
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoryId: number | null = null;
  private socket: WebSocket | null = null;
  private wsUrl = environment.wsUrl;
  notifications: Notification[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.categoryId) {
      this.connectToWebSocket(this.categoryId);
    }
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.close();
      console.log('Conexión WebSocket cerrada al salir de la vista de categoría');
    }
  }

  connectToWebSocket(categoryId: number): void {
    const url = this.wsUrl+`/cable?category_id=${categoryId}`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log(`Conectado al WebSocket para la categoría ${categoryId}`);
      const request = {
        command: 'subscribe',
        identifier: JSON.stringify({ channel: 'SubscriptionsChannel' })
      };
      this.socket?.send(JSON.stringify(request));
    };

    this.socket.onmessage = (event) => {
      console.log('Mensaje recibido:', event.data);
      const data = JSON.parse(event.data);

      if (data.message && data.message.product) {
        const message = data.message.message;
        const lowerPrice = data.message.lower_price;
        const higherPrice = data.message.higher_price;
        const product: Product = data.message.product;

        // Determinar el tipo de mensaje (Atencion u Oferta)
        const type = message.includes("¡Atencion!") ? "Atencion" : "Oferta";

        // Crear y almacenar la notificación completa
        const notification: Notification = {
          type: type,
          lowerPrice: lowerPrice,
          higherPrice: higherPrice,
          product: product
        };

        this.notifications.unshift(notification);
        console.log('Notificación recibida:', notification);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket cerrado');
    };
  }
}
