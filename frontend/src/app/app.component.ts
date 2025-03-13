import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockListComponent } from "./components/stock-list/stock-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StockListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
