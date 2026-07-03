import { HttpClient }
from '@angular/common/http';

import { Injectable }
from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeguimientoService {

  api =
    'http://127.0.0.1:8000/api/seguimiento';

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
