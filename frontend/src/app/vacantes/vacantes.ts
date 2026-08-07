import { afterNextRender, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VacancyService } from '../services/vacancy';
import { formatMoney, formatMoneyInput, MoneyFormatPipe } from '../shared/money-format';


@Component({
  selector: 'app-vacantes',
  imports: [CommonModule, FormsModule, MoneyFormatPipe],
  templateUrl: './vacantes.html',
  styleUrl: './vacantes.css',
})
export class Vacantes {

  mostrarModal = false;
  readonly limiteDescripcionBreve = 255;
  readonly limiteTextoTabla = 180;
  camposExpandidos = new Set<string>();
  private alertaDescripcionBreveMostrada = false;

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  abrirModalEliminar(vacante: any) {
    this.vacanteSeleccionada = vacante;
    this.mostrarModal = true;
  }


  protected readonly title = signal('frontend');

  informacion : any[] = [];

  puesto = '';
  departamento = '';
  descripcion_breve = '';
  descripcion = '';
  horario = '';
  requisitos: string[] = [''];
  salario = '';
  img = '';
  imagen: File | null = null;

  vacanteSeleccionada: any = null;
  modoEdicion = false;

  private readonly vacancyService = inject(VacancyService);
  private readonly changeDetector = inject(ChangeDetectorRef);

constructor() {
    afterNextRender(() => {
      this.obtenerInformacion();
    });
  }

  obtenerInformacion() {

    this.vacancyService.obtenerInformacion()
      .subscribe((data: any) => {

        console.log(data);

        this.informacion = data;
        this.changeDetector.detectChanges();

      });

  }


  seleccionarImagen(event: Event) {
  const input = event.target as HTMLInputElement;

  this.imagen = input.files?.[0] ?? null;
}

formatearSalario(valor: string) {
  this.salario = formatMoneyInput(valor);
}

guardarVacante(imagenInput?: HTMLInputElement) {
  if (this.descripcion_breve.length > this.limiteDescripcionBreve) {
    alert(`La descripcion breve no puede superar los ${this.limiteDescripcionBreve} caracteres permitidos.`);
    return;
  }

  const imagenSeleccionada =
    imagenInput?.files?.[0] ?? this.imagen;

  const vacante = new FormData();

  vacante.append('puesto', this.puesto);
  vacante.append('departamento', this.departamento);
  vacante.append('descripcion_breve', this.descripcion_breve);
  vacante.append('descripcion', this.descripcion);
  vacante.append('horario', this.horario);
  vacante.append('requisitos', this.requisitosLimpios().join('\n'));
  vacante.append('salario', this.salario);

  if (imagenSeleccionada) {
    vacante.append(
      'img',
      imagenSeleccionada,
      imagenSeleccionada.name
    );
  }


  if (this.modoEdicion) {
    vacante.append('_method', 'PUT');

    this.vacancyService 
    .actualizarVacante (
      this.vacanteSeleccionada.id,
      vacante
    )
    .subscribe(() => {
      alert('vacante actualizada');
      this.obtenerInformacion();
      this.cerrarModal();
      this.limpiarFormulario(imagenInput);

    });

  } else {
    if (!imagenSeleccionada) {
      alert('Selecciona una imagen para la vacante.');
      return;
    }

    this.vacancyService
      .guardarVacante(vacante)
      .subscribe(() => {
      alert('Vacante agregada');
      this.obtenerInformacion();
      this.limpiarFormulario(imagenInput);
      });
  }

}




eliminarVacante(id: number) {
    this.vacancyService
      .eliminarVacante(id)
      .subscribe(() => {

        this.mostrarModal = false;

        alert('Vacante eliminada');

        this.obtenerInformacion();

      });

  }


  editarVacante(vacante: any) {

  this.modoEdicion = true;

  this.vacanteSeleccionada = vacante;

  this.puesto = vacante.puesto;
  this.departamento = vacante.departamento || '';
  this.descripcion_breve = vacante.descripcion_breve;
  this.descripcion = vacante.descripcion;
  this.horario = vacante.horario;
  this.requisitos = this.separarRequisitos(vacante.requisitos);
  this.salario = formatMoney(vacante.salario);
  this.img = vacante.img;
  this.imagen = null;

}

limpiarFormulario(imagenInput?: HTMLInputElement){
  this.puesto = '';
  this.departamento = '';
  this.descripcion_breve = '';
  this.descripcion = '';
  this.horario = '';
  this.requisitos = [''];
  this.salario = '';
  this.img = '';
  this.imagen = null;
  this.vacanteSeleccionada = null;
  this.modoEdicion = false;

  if (imagenInput) {
    imagenInput.value = '';
  }

}

cambiarEstado(id: number) {

  this.vacancyService
    .cambiarEstado(id)
    .subscribe(() => {

      this.obtenerInformacion();

    });

}

validarDescripcionBreve(valor: string) {
  this.descripcion_breve = valor;

  if (valor.length > this.limiteDescripcionBreve) {
    if (!this.alertaDescripcionBreveMostrada) {
      alert(`Has pasado de los ${this.limiteDescripcionBreve} caracteres permitidos en la descripcion breve.`);
      this.alertaDescripcionBreveMostrada = true;
    }
    return;
  }

  this.alertaDescripcionBreveMostrada = false;
}

agregarRequisito() {
  this.requisitos.push('');
}

eliminarRequisito(index: number) {
  if (this.requisitos.length === 1) {
    this.requisitos[0] = '';
    return;
  }

  this.requisitos.splice(index, 1);
}

trackByIndex(index: number) {
  return index;
}

private requisitosLimpios() {
  return this.requisitos
    .map((requisito) => requisito.trim())
    .filter((requisito) => requisito.length > 0);
}

separarRequisitos(requisitos: string) {
  const separados = (requisitos || '')
    .split(/\r?\n|,/)
    .map((requisito) => requisito.trim())
    .filter((requisito) => requisito.length > 0);

  return separados.length ? separados : [''];
}

textoRequisitos(requisitos: string) {
  return this.separarRequisitos(requisitos).join('\n');
}

claveCampo(vacante: any, campo: string) {
  return `${vacante.id}-${campo}`;
}

campoExpandido(vacante: any, campo: string) {
  return this.camposExpandidos.has(this.claveCampo(vacante, campo));
}

alternarCampo(vacante: any, campo: string) {
  const clave = this.claveCampo(vacante, campo);

  if (this.camposExpandidos.has(clave)) {
    this.camposExpandidos.delete(clave);
    return;
  }

  this.camposExpandidos.add(clave);
}

necesitaExpandir(texto: string) {
  return (texto || '').length > this.limiteTextoTabla;
}

textoVisible(texto: string, vacante: any, campo: string) {
  const textoSeguro = texto || '';

  if (
    this.campoExpandido(vacante, campo) ||
    !this.necesitaExpandir(textoSeguro)
  ) {
    return textoSeguro;
  }

  return `${textoSeguro.slice(0, this.limiteTextoTabla).trim()}...`;
}

}
