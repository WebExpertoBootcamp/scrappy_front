import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

interface Category {
  id: number;
  name: string;
  description: string;
  selected: boolean;
}

@Component({
  selector: 'app-suscriptions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './suscriptions.component.html',
  styleUrl: './suscriptions.component.css'
})
export class SuscriptionsComponent {
  constructor(private categoryService: CategoryService, private router: Router) { }
  categories: Category[] = [];
  selectedCategories: number[] = [];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: res  => {
        this.categories = res.map(category => ({
          id: category.id,
          name: category.name,
          description: category.description,
          selected: false 
        }));
      },
      error: err => {
        console.error('Error al cargar categorías:', err);
      },
      complete: () => console.info('complete') 
    });
  }
  suscribe() {
    this.updateSelectedCategories();

    this.categoryService.subscribeToCategories(this.selectedCategories).subscribe({
      next: () => {
        console.log('Te has suscrito a las categorías:', this.selectedCategories);
        alert('Te has suscrito a las categorías seleccionadas');
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Error al suscribirse:', err);
        alert('Hubo un error al procesar tu suscripción');
      }
    });
  }
  updateSelectedCategories() {
    this.selectedCategories = this.categories.filter(category => category.selected).map(category => category.id);
  }
}
