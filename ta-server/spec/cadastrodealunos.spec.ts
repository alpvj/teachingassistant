import { CadastroDeAlunos } from '../cadastrodealunos';
import { Aluno } from '../common/aluno';

describe("O cadastro de alunos", () => {
  var cadastro: CadastroDeAlunos;

  function cadastrarAluno(nome:string, cpf:string) {
    var aluno: Aluno = new Aluno();
    aluno.nome = nome;
    aluno.cpf = cpf;
    cadastro.cadastrar(aluno);
  }

  function expectSoUmAluno() {
    expect(cadastro.getAlunos().length).toBe(1);
    var aluno = cadastro.getAlunos()[0];
    return aluno;
  }

  beforeEach(() => cadastro = new CadastroDeAlunos())

  it("é inicialmente vazio", () => {
    expect(cadastro.getAlunos().length).toBe(0);
  })

  it("cadastra alunos corretamente", () => {
    cadastrarAluno("Mariana","683");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
    expect(aluno.cpf).toBe("683");
    expect(aluno.email).toBe("");
    expect(aluno.metas.size).toBe(0);
  })

  it("não aceita alunos com CPF duplicado", () => {
    cadastrarAluno("Mariana","683");
    cadastrarAluno("Pedro","683");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
  })

  it("remover aluno cadastrado", () => {
    cadastrarAluno("Mariana","683");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
    expect(aluno.cpf).toBe("683");
    expect(aluno.email).toBe("");
    expect(aluno.metas.size).toBe(0);

    cadastro.deletar(aluno.cpf);
    expect(cadastro.getAlunos().length).toBe(0);
  })

  it("atualizar aluno cadastrado", () => {
    cadastrarAluno("Mariana","683");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
    expect(aluno.cpf).toBe("683");
    expect(aluno.email).toBe("");
    expect(aluno.metas.size).toBe(0);

    var aluno_copy : Aluno = new Aluno();
    aluno_copy.copyFrom(aluno);
    aluno_copy.nome = "Pedro";
    aluno_copy.email = "pedro@gmail.com";
    cadastro.atualizar(aluno_copy);

    aluno = cadastro.getAlunos()[0];
    expect(aluno.nome).toBe("Pedro");
    expect(aluno.cpf).toBe("683");
    expect(aluno.email).toBe("pedro@gmail.com");
    expect(aluno.metas.size).toBe(0);
  })

  it("atualizar aluno não cadastrado", () => {
    expect(cadastro.getAlunos().length).toBe(0);
    var aluno : Aluno = new Aluno();
    aluno.nome = "Mariana";
    aluno.cpf = "683";
    cadastro.atualizar(aluno);
    expect(cadastro.getAlunos().length).toBe(0);
  })
})