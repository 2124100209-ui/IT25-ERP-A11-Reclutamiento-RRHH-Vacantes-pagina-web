import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contratacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contratacion.html',
  styleUrl: './contratacion.css',
})
export class Contratacion {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  applicantId =
    this.route.snapshot.paramMap.get('id');

  regresar() {
    this.router.navigate(['/seguimiento-acept']);
  }

}
