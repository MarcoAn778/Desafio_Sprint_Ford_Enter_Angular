import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle';

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

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.listarVeiculos().subscribe({
      next: veiculos => {
        this.veiculos = veiculos;
        this.veiculoSelecionado = veiculos[0];
      }
    });
  }

  selecionarVeiculo(): void {
    this.veiculoSelecionado = this.veiculos.find(
      v => v.vehicle === this.veiculoSelecionado.vehicle
    );
  }

  buscarVin(): void {
    this.erroVin = '';
    this.dadosVeiculo = null;

    this.vehicleService.buscarDadosPorVin(this.vin).subscribe({
      next: dados => {
        this.dadosVeiculo = dados;
      },
      error: erro => {
        this.erroVin = erro.error?.message || 'VIN não encontrado.';
      }
    });
  }
}