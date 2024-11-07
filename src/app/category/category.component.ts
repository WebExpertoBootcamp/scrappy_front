import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/enviroment';

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

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoryId: number | null = null;
  private socket: WebSocket | null = null;
  private wsUrl = environment.wsUrl;
  products: Product[] = [];

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
        const product: Product = data.message.product;
        this.products.push(product); // Agrega el producto al array
        console.log('Producto recibido:', product);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket cerrado');
    };
  }
}
