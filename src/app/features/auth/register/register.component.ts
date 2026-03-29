import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form = this.fb.group({
    name:     ['', [Validators.required, Validators.minLength(2)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  loading = signal(false);
  error   = signal('');

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { name, email, password } = this.form.value;

    this.loading.set(true);
    this.error.set('');

    this.auth.register(name!, email!, password!).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => {
        this.error.set(err.status === 409 ? 'E-mail já cadastrado.' : 'Erro ao cadastrar.');
        this.loading.set(false);
      },
    });
  }

  isInvalid(field: string) {
    const c = this.form.get(field);
    return c?.invalid && c?.touched;
  }
}
