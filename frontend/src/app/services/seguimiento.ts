import { HttpClient }
from '@angular/common/http';

import { Injectable }
from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeguimientoService {

  api =
   'https://api-vacantes.i-deb.com.mx/api/seguimiento';

  constructor(
    private http: HttpClient
  ) {}

  obtenerInformacion() {
    return this.http.get(this.api);
  }

  obtenerHistorialBajas() {
    return this.http.get(
      `${this.api}/historial-bajas`
    );
  }

  obtenerPorEstado(status: string) {
    return this.http.get(
      `${this.api}/estado/${status}`
    );
  }

  eliminarParticipante(id: number) {

    return this.http.delete(
      `${this.api}/${id}`
    );

  }

  eliminarDefinitivo(id: number) {
    return this.http.delete(
      `${this.api}/${id}/definitivo`
    );
  }


  cambiarEstado(
  id: number,
  status: string
) {
  return this.http.put(
    `${this.api}/${id}/status`,
    { status }
  );
}

  obtenerUrlDocumento(
    id: number,
    tipo: 'cv' | 'carta'
  ) {
    return `${this.api}/${id}/documento/${tipo}`;
  }

  descargarDocumento(
    id: number,
    tipo: 'cv' | 'carta'
  ) {
    return this.http.get(
      this.obtenerUrlDocumento(id, tipo),
      {
        responseType: 'blob',
        observe: 'response',
      }
    );
  }
}
