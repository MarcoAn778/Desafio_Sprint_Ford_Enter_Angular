import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

    listarVeiculos(): Observable<any> {
        return this.http.get(`${this.apiUrl}/vehicle`).pipe(
            map((resposta: any) => resposta.data)
        );
    }
    buscarDadosPorVin(vin: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/vehicleData`, { vin });
    }
}