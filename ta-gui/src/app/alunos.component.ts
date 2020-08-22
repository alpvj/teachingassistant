import { Component, OnInit } from '@angular/core';

import { Aluno } from '../../../ta-server/common/aluno';
import { AlunoService } from './aluno.service';

@Component({
    selector: 'app-root',
    templateUrl: './alunos.component.html',
    styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
    aluno: Aluno = new Aluno();
    alunos: Aluno[] = [];
    cpfduplicado: boolean = false;
    loginduplicado: boolean = false;

    constructor(private alunoService: AlunoService) {}

    criarAluno(a: Aluno): void {
        this.alunoService.criar(a)
               .subscribe(
                 ar => {
                   if (ar.nome) {
                     this.alunos.push(ar);
                     this.aluno = new Aluno();
                  } else {
                    this.cpfduplicado = ar.cpfRepetido == "true";
                    this.loginduplicado = ar.loginRepetido == "true";
                   }
                 },
                 msg => { alert(msg.message); }
               );
    }

    removerAluno (a: Aluno): void{
      this.alunoService.remover(a)
          .subscribe(
            ar => {
              if (ar != null){
                //alert("Usuário deletado");
                let alunoIdx = 0;
                for (let i = 0; i < this.alunos.length; i++){
                    if (this.alunos[i].cpf == a.cpf) alunoIdx = i;
                }
                this.alunos.splice(alunoIdx, 1);
              }else{
                //alert("Usuário não pode ser deletado");
              }
            },
            msg => { alert(msg.message); }
          );
    }

    onMove(): void {
        this.cpfduplicado = false;
        this.loginduplicado = false;
    }

    ngOnInit(): void {
        this.alunoService.getAlunos()
              .subscribe(
                as => { this.alunos = as; },
                msg => { alert(msg.message); }
              );
    }
    

}