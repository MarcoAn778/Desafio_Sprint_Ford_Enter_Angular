import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  veiculos: any[] = [];
  veiculoSelecionado: any = null;

  vin = '';
  dadosVeiculo: any = null;
  erroVin = '';

  private vinDigitado = new Subject<string>();

  constructor(private vehicleService: VehicleService) {}

ngOnInit(): void {
  this.vehicleService.listarVeiculos().subscribe({
    next: veiculos => {
      this.veiculos = veiculos;
      this.veiculoSelecionado = veiculos[0];
    }
  });

  this.vinDigitado.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    filter(vin => vin.length >= 17)
  ).subscribe(vin => {
    this.buscarVin(vin);
  });
}

aoDigitarVin(): void {
  this.dadosVeiculo = null;
  this.erroVin = '';

  this.vinDigitado.next(this.vin);
}

buscarVin(vin: string): void {
  this.vehicleService.buscarDadosPorVin(vin).subscribe({
    next: dados => {
      this.dadosVeiculo = dados;
      this.erroVin = '';
    },
    error: erro => {
      this.dadosVeiculo = null;
      this.erroVin = erro.error?.message || 'VIN não encontrado.';
    }
  });
}
}