import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/enviroment';

interface Category {
  id: number;
  name: string;
  description: string;
  scrappers: string[];
  selected: boolean;
}


interface Subscription {
  id: number;
  name: string;
  description: string;
  url: string;
  request_body: {
    command: string;
    identifier: string;
  };
}

interface SubscriptionsResponse {
  message: string;
  subscriptions: Subscription[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl; // URL de la API

  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl+'/api/v1/auth/list_categories');
  }

  subscribeToCategories(categoryIds: number[]): Observable<any> {
    const body = { category_ids: categoryIds };
    
    
    return this.http.put(this.apiUrl+'/api/v1/auth/subscription', body);
  }

  getUserSubscriptions(): Observable<SubscriptionsResponse> {  
    return this.http.get<SubscriptionsResponse>(this.apiUrl+'/api/v1/auth/mysubscriptions');
  }

}
