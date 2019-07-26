import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { NgbProgressbarConfig, NgbTabChangeEvent ,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompañiaService } from './compañia.service';

import {compañia} from './compañia';
import { Router } from '@angular/router';

@Component({
  templateUrl: './compañia.component.html',
  styleUrls: ['./compañia.component.css']

})
export class CompañiaComponent implements OnInit {
  compania: Array<compañia> = [];
    errorMessage:string;
    archiTemp:compañia = new compañia();
    archiTempUpd:compañia=new compañia();

registerForm:FormGroup;
submitted = false;
response:boolean;
Respuesta:String;


insertForm:FormGroup;
submittes = false;
responder:boolean;
Respuesta2:String;

  constructor(public router: Router , private service: CompañiaService, private modalService: NgbModal,private formBuilder: FormBuilder) { }
 

  get i(){return this.insertForm.controls;}
  ngOnInit() {

    this.insertForm = this.formBuilder.group({
    

      companiaId:['',Validators.required],
      descripcion:['',Validators.required],
      numeroRuc:['',Validators.required],
      descripcionComercial:['',Validators.required],
      direccion:['',Validators.required],
      representante:['',Validators.required],
      dniRepresentante:['',Validators.required],
      cargoRepresentante:['',Validators.required],
      telefonoUno:['',Validators.required],
      telefonoDos:['',Validators.required],
      telefonoTres:['',Validators.required],
      email:['',Validators.required],
      webSite:['',Validators.required],
      logo:['',Validators.required],
      activoPDT:['',Validators.required],
      codPais:['',Validators.required],
      logitud:['',Validators.required],
      latitud:['',Validators.required],
      createdDate:['',Validators.required],
      createdBy:['',Validators.required],
      lastodifiedDate:['',Validators.required],
      lastmodfiedBy:['',Validators.required],
      flagestado:['',Validators.required],
        

    })
   
     
   this.listCompania();
}

listCompania(){

  this.service.getListaCompania().subscribe(
    lisCompañia=>{
    this.compania=lisCompañia;
    console.log(lisCompañia);
   },
  error=>{
    console.log("miError: "+this.errorMessage);
    this.errorMessage=<any>error;
  });

}



buttonClicked(){
  this.submittes = true;
  if(this.insertForm.invalid){
    this.responder=false;
    return;
  }
  console.log(this.archiTemp);
  this.service.getInsertarCompañia(this.archiTemp).subscribe(
    response=> {
      console.log(response);
  this.responder=response;
      if(response){
        this.Respuesta2 = "Se inserto registro satisfactoriamente";
        this.listCompania();
      }else{
        this.Respuesta2 = "Hubo un problema interno por favor intente en otro momento";
      }
    },
    error=>{
      console.log("miError:"+this.errorMessage);
      this.errorMessage=<any>error;
    });
   
  
  }


 






  get f(){return this.registerForm.controls;}
  open(content:any,  companiaId:number) {
    this.registerForm = this.formBuilder.group({

      companiaId:['',Validators.required],
      descripcion:['',Validators.required],
      numeroRuc:['',Validators.required],
      descripcionComercial:['',Validators.required],
      direccion:['',Validators.required],
      representante:['',Validators.required],
      dniRepresentante:['',Validators.required],
      cargoRepresentante:['',Validators.required],
      telefonoUno:['',Validators.required],
      telefonoDos:['',Validators.required],
      telefonoTres:['',Validators.required],
      email:['',Validators.required],
      webSite:['',Validators.required],
      logo:['',Validators.required],
      activoPDT:['',Validators.required],
      codPais:['',Validators.required],
      logitud:['',Validators.required],
      latitud:['',Validators.required],
      createdDate:['',Validators.required],
      createdBy:['',Validators.required],
      lastodifiedDate:['',Validators.required],
      lastmodfiedBy:['',Validators.required],
      flagestado:['',Validators.required],
        

    })
    
    
    ;
    console.log(companiaId);
    this.archiTempUpd.companiaId=companiaId;
    
    this.service.getActualizarCompania(companiaId).subscribe(
      datos=>{
        console.log("llego");
        console.log(datos);
        this.archiTempUpd=datos;
        console.log(this.archiTempUpd.companiaId);

    },
    error=>{
      console.log("miError: "+this.errorMessage);
      this.errorMessage=<any>error;
    });
    console.log(this.archiTempUpd.companiaId)

    
    //Aca consumir servicio findArchivoUsuariosForId del backend pasandole el codigoArchivo
    //Setear archiTempUpd con objeto traido del servicio findArchivoUsuariosForId
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  guardar(){

    //Aca consumir servicio ActualizarUsuarioJPA pasandole el objeto this.archiTempUpd
    this.submitted = true;
    if(this.registerForm.invalid){
      this.response=false;
      return;
    }
    
      console.log(this.archiTempUpd);
      this.service.getActualizar(this.archiTempUpd).subscribe(
        response=> {
          console.log(response);
          this.response=response;
            if(response){
              this.Respuesta="Se actualizo registro satisfactoriamente";
              this.listCompania();
            }else{
              this.Respuesta="Hubo un problema interno por favor intente en otro momento";
            }
        },
        error=>{
        console.log("miError: "+this.errorMessage);
        this.errorMessage=<any>error;
        });
    
  }


}