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

}