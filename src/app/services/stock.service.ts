import { Injectable } from '@angular/core';
import { Ruta } from '../globalRoute';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Respuesta {
  datos: any[];

}
@Injectable({
  providedIn: 'root'
})
export class StockService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = Ruta.url;

  }
  

  VerificarSiNoExisteUnProductoParaCrearlo(producto: any) : Observable<any>{
    let json = JSON.stringify(producto);
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Productos/VerificarSiNoExisteUnProductoParaCrearlo.php", json);
  }

  getStockSucursal(idLocal): Observable<any> {
    return this.http.get('https://holanosoynada222.000webhostapp.com/Zapat/Productos/ObtenerStockDeUnaSucursal.php?idLocal=' + idLocal);
  }

  getStockGeneralSucursal(idLocal): Observable<any> {
    return this.http.get('https://holanosoynada222.000webhostapp.com/Zapat/Productos/ObtenerProductosDistintosDeUnaSucursal.php?idLocal=' + idLocal);
  }

  getProductosQueNoEstanEnUnaSucursal(idLocal): Observable<any> {
    return this.http.get('https://holanosoynada222.000webhostapp.com/Zapat/Productos/BuscarProductosQueNoEstanEnUnaSucursal.php?idLocal=' + idLocal);
  }

  chequearSiProductoExiste(producto: any): Observable<any> {
    let json = JSON.stringify(producto);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Productos/BuscarProductoConTalleEnSucursal.php", json);
  }

  verUltimaModificacion(producto: any): Observable<any> {
    let json = JSON.stringify(producto);
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Productos/UltimaModificacion.php", json);
  }

  
  actualizarPrecioCompradoYCantidadAProducto(producto: any): Observable<any> {
    let json = JSON.stringify(producto);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Productos/actualizarPrecioCompradoYCantidadAProducto.php", json);
  }

  
  actualizarProductoEnPrecios(producto: any): Observable<any> {
    let json = JSON.stringify(producto);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Productos/actualizarProductoEnPrecios.php", json);
  }

  insertarOActualizarProducto(producto: any): Observable<any> {
    let json = JSON.stringify(producto);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Productos/InsertarOActualizarTalleYCantidadAProductoExistente.php", json);
  }

  actualizarPrecioVenta(producto: any): Observable<any> {
    let json = JSON.stringify(producto);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Productos/ActualizarPrecioVenta.php", json);
  }

  actualizarProducto(producto: any): Observable<any> {
    let json = JSON.stringify(producto);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Productos/ActualizarProductoGeneral.php", json);
  }

  actualizarFotoFile(data: any): Observable<any> {
    let uploadURL = "https://holanosoynada222.000webhostapp.com/Zapat/Productos/actualizarFotoFile.php";
    return this.http.post(uploadURL, data);
  } 


  uploadFile(data: any): Observable<any> {
    let uploadURL = "https://holanosoynada222.000webhostapp.com/Zapat/Productos/uploadImage.php";
    return this.http.post(uploadURL, data);
  } 

  insertarProducto(data: any) : Observable<any>{
    let json = JSON.stringify(data);
    let uploadURL = "https://holanosoynada222.000webhostapp.com/Zapat/Productos/insertarProductoNuevoEnStockGral.php";
    return this.http.post(uploadURL, json);
  } 
  


  actualizarTalle(prod): Observable<any> {
    let prodSend = JSON.stringify(prod);
    return this.http.post("  https://holanosoynada222.000webhostapp.com/Zapat/Talles/actualizarTalle.php", prodSend);
  }

  actualizarMarca(prod): Observable<any> {
    let prodSend = JSON.stringify(prod);
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Marcas/actualizarMarca.php", prodSend);
  }
  actualizarCategoria(prod) : Observable<any>{
    let prodSend = JSON.stringify(prod);
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Categorias/actualizarCategoria.php", prodSend);
  }

  
  insertarTalle(prod): Observable<any> {
    let prodSend = JSON.stringify(prod);
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Talles/insertarTalle.php", prodSend);
  }


 insertarMarca(prod): Observable<any> {
    let prodSend = JSON.stringify(prod);
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Marcas/insertarMarca.php", prodSend);
  }

  insertarCategoria(prod) : Observable<any>{
    let prodSend = JSON.stringify(prod);
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Categorias/insertarCategoria.php", prodSend);
  }
  
  login(prod) : Observable<any>{
    let prodSend = JSON.stringify(prod);  
    return this.http.post("https://holanosoynada222.000webhostapp.com/Zapat/Vendedores/Login.php", prodSend);
  }


  altaProducto(prod) : Observable<any>{
    let prodSend = JSON.stringify(prod);
    return this.http.post(this.url + 'Productos/insertarProductoNuevoEnStockGralYSucursal.php', prodSend);
  }

  getMarcas(): Observable<any> {
    return this.http.get('https://holanosoynada222.000webhostapp.com/Zapat/Marcas/GETALLL.php');
  }

  getCategorias(): Observable<any> {
    return this.http.get('https://holanosoynada222.000webhostapp.com/Zapat/Categorias/GETALLL.php');
  }

  getTalles(): Observable<any> {
    return this.http.get('https://holanosoynada222.000webhostapp.com/Zapat/Talles/GETALLL.php');
  }

  getSucursales(): Observable<any> {
    return this.http.get('https://holanosoynada222.000webhostapp.com/Zapat/Locales/GETALLL.php');
  }
 
  getTodosLosProductos(): Observable<any> {
    return this.http.get(' https://holanosoynada222.000webhostapp.com/Zapat/Productos/ObtenerTodosLosProductosFinal.php');
  }

}
