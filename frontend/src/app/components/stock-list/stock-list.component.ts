import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

interface StockPrice {
  symbol: string;
  avgPrice: number;
}

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class StockListComponent implements OnInit {
  stockPrices: StockPrice[] = [];
  private socket = io('ws://localhost:3001', { transports: ["polling", "websocket"] });

  ngOnInit(): void {
    this.socket.on('stock-price-update', (data: StockPrice) => {
      this.updateStockPrice(data);
    });
  }

  private updateStockPrice(newPrice: StockPrice) {
    const index = this.stockPrices.findIndex(stock => stock.symbol === newPrice.symbol);
    if (index !== -1) {
      this.stockPrices[index] = newPrice;
    } else {
      this.stockPrices.push(newPrice);
    }
  }
}
