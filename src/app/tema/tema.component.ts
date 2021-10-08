import { TemaService } from './../service/tema.service';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas()

  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp:Tema[])=>{
      this.listaTemas = resp
      
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.alerta.showAlertSuccess('Tema cadastrado com sucesso!!!')
      this.tema = new Tema()
      this.findAllTemas()
    })
  }

}