import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export interface Subcategory {
  name: string;
  status: string;
  image: any;
}
@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private API_ENDPOINT = environment.backendHost + '/api/subcategory';
  constructor(private http: HttpClient) {}

  create(body: any): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.post(`${this.API_ENDPOINT}/create`, body, { headers });
    }
    return false;
  }

  get(page?: string, pageSize?: string, filters?: any): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      let query = '';
      for (const filter of filters) {
        if (filter.value) {
          if (!query) {
            query += `?${filter.name}=${filter.value}`;
          } else {
            query += `&${filter.name}=${filter.value}`;
          }
        }
      }
      console.log('query:', query);
      if (page && query && pageSize) {
        return this.http.get(
          `${this.API_ENDPOINT}/get${query}&page=${page}&pageSize=${pageSize}`,
          {
            headers,
          }
        );
      }
      if (page && !query && pageSize) {
        return this.http.get(
          `${this.API_ENDPOINT}/get?page=${page}&pageSize=${pageSize}`,
          { headers }
        );
      }
      if (!page && !query && pageSize) {
        return this.http.get(
          `${this.API_ENDPOINT}/get${query}&pageSize=${pageSize}`,
          { headers }
        );
      }
      if (!page && !query && !pageSize) {
        return this.http.get(`${this.API_ENDPOINT}/get`, { headers });
      }
    }
    return false;
  }

  getById(id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.API_ENDPOINT}/get/${id}`, { headers });
    }
    return false;
  }

  update(id: any, body: any): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.put(`${this.API_ENDPOINT}/update/${id}`, body, {
        headers,
      });
    }
    return false;
  }

  delete(id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.delete(`${this.API_ENDPOINT}/${id}`, { headers });
    }
    return false;
  }
}
