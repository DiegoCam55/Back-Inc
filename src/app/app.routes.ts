import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: 'product',
        title: 'product',
        loadComponent: () =>
          import('./dashboard/pages/product-list/product-list.component').then(
            (m) => m.ProductListComponent
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard/product',
    pathMatch: 'full',
  },
];
