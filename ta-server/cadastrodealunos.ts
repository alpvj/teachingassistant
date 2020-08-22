import { Aluno } from './common/aluno';

export class CadastroDeAlunos {
    alunos: Aluno[] = [];

    cadastrar(aluno: Aluno): any {
        var result = null;
        if (this.cpfNaoCadastrado(aluno.cpf) && this.loginNaoCadastrado(aluno.login)) {
            result = new Aluno();
            result.copyFrom(aluno);
            this.alunos.push(result);
        }
        if (result==null){
            result = {
                cpfRepetido: !this.cpfNaoCadastrado(aluno.cpf),
                loginRepetido: !this.loginNaoCadastrado(aluno.login)
            };
        }

        return result;
    }

    deletar(alunoCpf: string): boolean{
        if (this.cpfNaoCadastrado(alunoCpf)){
            return false;
        }
        console.log(alunoCpf);
        let alunoIdx = 0;
        for (let i = 0; i < this.alunos.length; i++){
            if (this.alunos[i].cpf == alunoCpf) alunoIdx = i;
        }
        this.alunos.splice(alunoIdx, 1);
        
        return this.cpfNaoCadastrado(alunoCpf);
    }

    cpfNaoCadastrado(cpf: string): boolean {
        return !this.alunos.find(a => a.cpf == cpf);
    }

    loginNaoCadastrado(login: string): boolean {
        return !this.alunos.find(a => a.login == login);
    }

    atualizar(aluno: Aluno): Aluno {
        var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
        if (result) result.copyFrom(aluno);
        return result;
    }

    getAlunos(): Aluno[] {
        return this.alunos;
    }
} 