import { Injectable }              from '@angular/core';
import { HttpHeaders, HttpResponse }   from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { compañia } from './compañia';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  'Authorization':'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjQwNjI5ODgsImN1c3RvbV9pbmZvIjp7ImNvZF91c3UiOiIxIiwiY29kX2NpYSI6IjAzNCIsImNvZF9zdWMiOiIzNjAxIiwiY29kX3RyYSI6IjE2MDAyIiwibm9tYnJlIjoiTWFyY29zIiwiYXBfcGF0IjoiWm9ycmlsbGEgIiwiYXBfbWF0IjoiR3JhZG9zIiwiZW1haWwiOiJtYXJjLnpnMjFAZ21haWwuY29tIiwiY29kX3RyYV9qZWYiOiIxNjAwMSIsIm4iOiIyIiwiZXNfamVmZSI6dHJ1ZX0sInVzZXJfbmFtZSI6Im1hcmMyMzE0IiwianRpIjoiNjA4NWI1ZDEtNzE3Ni00YzZmLTk1YTEtYzJiMDI4YzNmYTllIiwiY2xpZW50X2lkIjoiYnJvd3Nlcl9jbGllbnRfdGVhY2giLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ1cGRhdGUiLCJkZWxldGUiXX0.VQk2-FBtP8VcoIrppBc_qmYMOVl_EuBQeiCQqm4whyg'})
};
@Injectable({ providedIn: 'root' })
export class CompañiaService {
  public servicioUrl = 'http://localhost:8080/techsoft';  // URL to web API
  public  errorMessage: string;
  constructor (private http: HttpClient) {}
  public compania: compañia;

  public getListaCompania(): Observable<compañia[]> {
    return this.http.get<compañia[]>(this.servicioUrl+"/compania/listacompania",  httpOptions).pipe(
      catchError(this.handleError('getListaCompania', []))
      );
    }


    public getInsertarCompañia(compañia:compañia): Observable<any>{
      return this.http.post<any>(this.servicioUrl+"/compania/insertarCompania",compañia,httpOptions).pipe(map(data => {
        if(data){
          if(data.codigo ==='1'){
            return true;
          }
        }
        return false;
      })  );
      }


      




        public getActualizarCompania(companiaId): Observable<compañia> {
          return this.http.get<compañia>(this.servicioUrl+"/compania/objetocompania/"+companiaId,httpOptions).pipe(
            catchError(this.handleError<compañia>('getActualizarCompania'))
            );
            //Voy a tener que crear otra funcion que controle los errores, por ahora que quede asi.vale
          }



          public getActualizar(compañia:compañia): Observable<any> {
            return this.http.put<any>(this.servicioUrl+"/compania/updateCompania", compañia, httpOptions).pipe(map(data =>{
         
                if(data){
                  if(data.codigo ==='1'){
                    return true;
                  }
                }
                return false;
              })  
                    );
            }



    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
