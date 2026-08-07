import { HttpClient }
from '@angular/common/http';

import { Injectable }
from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeguimientoService {

  api =
   'http://localhost:8000/api/seguimiento';

  constructor(
    private http: HttpClient
  ) {}

  obtenerInformacion() {

    return this.http.get(this.api);

  }

}
