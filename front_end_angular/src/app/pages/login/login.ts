import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nome = '';
  senha = '';
  erro = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  entrar(): void {
    this.erro = '';

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