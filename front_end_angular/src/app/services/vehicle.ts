import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  listarVeiculos(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/vehicles`).pipe(
      map(resposta => resposta.vehicles)
    );
  }

  buscarDadosPorVin(vin: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vehicleData`, { vin });
  }
}