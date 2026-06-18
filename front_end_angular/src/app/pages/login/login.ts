import { Component, ChangeDetectorRef } from '@angular/core';
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
  mostrarSenha = false;
  aceitouLgpd = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  entrar(): void {
    if (!this.nome.trim() || !this.senha.trim()) {
      this.erro = 'Por favor, preencha nome e senha.';
      return;
    }

    if (!this.aceitouLgpd) {
      this.erro = 'Você precisa aceitar os termos e condições para continuar.';
      return;
    }

    this.authService.login(this.nome, this.senha).subscribe({
      next: usuario => {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigate(['/home']);
      },
      error: respostaErro => {
        this.erro =
          respostaErro.error?.message ||
          'O nome de usuário ou senha está incorreto ou não foi cadastrado!';

        this.cdr.detectChanges();
      }
    });
  }
}