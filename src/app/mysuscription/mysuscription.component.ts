import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

interface Category {
  id: number;
  name: string;
  description: string;
  scrappers: string[];
  selected: boolean;
}

interface Subscription {
  category_id: number;
  category: Category;
  url: string;
  request_body: {
    command: string;
    identifier: string;
  };
}

interface UserSubscriptionsResponse {
  message: string;
  subscriptions: Subscription[];
}

@Component({
  selector: 'app-mysuscription',
  standalone: true,
  imports: [],
  templateUrl: './mysuscription.component.html',
  styleUrl: './mysuscription.component.css'
})
export class MysuscriptionComponent {
  constructor(private categoryService: CategoryService, private router: Router) { }

  subscriptionsData: UserSubscriptionsResponse | null = null;

  ngOnInit(): void {

    this.categoryService.getUserSubscriptions().subscribe({
      next: res  => {
        this.subscriptionsData = res;
        console.log('Subscripciones:', res);
      },
      error: err => {
        console.error('Error al cargar suscripciones:', err);
      },
      complete: () => console.info('complete') 
    });
  }

  goToCategory(categoryId: number) {
    this.router.navigate(['/category', categoryId]);
  }

}
