import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  nome = '';
  senha = '';
  erro = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  entrar(): void {
    this.erro = '';

    if (!this.nome || !this.senha){
      this.erro = 'Por favor, preencha nome e senha.';
      return;
    }
    this.authService.login(this.nome, this.senha).subscribe({
      next: usuario => {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigate(['/home']);
      },
      error: erro => {
        this.erro = erro.error?.message || 'Erro ao fazer login.';
      }
    });
  }
}