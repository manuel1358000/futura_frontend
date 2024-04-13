import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnunciosApiResponse, AnunciosResponse } from '../../models/anuncios/anunciosResponse.models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  private apiUrl = 'https://ejy1yo74ve.execute-api.us-east-2.amazonaws.com/prod';

  constructor(private http: HttpClient) {}

  obtenerAnuncios(): Observable<AnunciosResponse[]> {
    return this.http.get<{ body: string }>(this.apiUrl).pipe(
      map(response => JSON.parse(response.body))
    );
  }
  
  subirAnuncio(apiData:any): Observable<any>{
    // Realizar la solicitud HTTP a la API
    console.log("paso por la subida de archivos");
    return this.http.put('https://ejy1yo74ve.execute-api.us-east-2.amazonaws.com/prod', { body: JSON.stringify(apiData) });
  }

}
