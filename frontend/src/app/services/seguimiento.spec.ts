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

}