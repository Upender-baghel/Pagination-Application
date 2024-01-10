import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fix the property name here
})
export class AppComponent {
  title = 'Pagination';
  data: any[] = [];
  pageSize: number = 3;
  paginatedData: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private httpClient: HttpClient) {
    this.loadData();
  }

  loadData(): void {
    const apiUrl = 'https://fakestoreapi.com/products';

    this.httpClient.get(apiUrl).subscribe((apiData: any) => {
      this.data = apiData; 
      this.updatePagination();
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.paginatedData = this.data.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.data.length / this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
