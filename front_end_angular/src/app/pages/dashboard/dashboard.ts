import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { VehicleService } from '../../services/vehicle';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Footer],
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

  constructor(private vehicleService: VehicleService, private router: Router) {}

  menuAberto = false;

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
    this.erroVin = '';
    this.dadosVeiculo = null;
    this.vinDigitado.next(this.vin.trim());
  }

  buscarVin(vin: string): void {
    this.vehicleService.buscarDadosPorVin(vin).subscribe({
      next: dados => {
        this.dadosVeiculo = dados;
        this.erroVin = '';
      },
      error: erro => {
        this.dadosVeiculo = null;
        this.erroVin = erro.error?.message || 'Código VIN não encontrado!';
      }
    });
  }
  abrirMenu(): void {
    this.menuAberto = true;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}