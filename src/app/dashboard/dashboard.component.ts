import { Component } from '@angular/core';
import { MenuComponent } from "../components/menu/menu.component";
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent, RouterModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
