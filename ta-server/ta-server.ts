import express = require('express');

import bodyParser = require("body-parser");

import {Aluno} from './common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/alunos', function (req: express.Request, res: express.Response) {
    res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
    var aluno: any = <Aluno> req.body; //verificar se é mesmo Aluno!
    aluno = cadastro.cadastrar(aluno);
    if (aluno.cpfRepetido || aluno.loginRepetido) {
        var strCpfRepetido = (aluno.cpfRepetido) ? "true" : "false",
            strLoginRepetido = (aluno.loginRepetido) ? "true" : "false"; 
        res.send({"failure": "Aluno já foi cadastrado", "motivo": {"cpfRepetido": strCpfRepetido, "loginRepetido": strLoginRepetido}});
    }
    else{
      res.send({"success": "O aluno foi cadastrado com sucesso"});
    }
})

taserver.delete('/aluno', function (req: express.Request, res: express.Response){
    var id = req.query.id;
    var result = cadastro.deletar(""+id);
    if (result){
        res.send({"success": "O aluno foi deletado com sucesso"});
    }else{
        res.send({"failure": "O aluno não pode ser deletado"});
    }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
    var aluno: Aluno = <Aluno> req.body;
    aluno = cadastro.atualizar(aluno);
    if (aluno) {
        res.send({"success": "O aluno foi atualizado com sucesso"});
    } else {
        res.send({"failure": "O aluno não pode ser atualizado"});
    }
})

taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})