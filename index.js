const express = require('express')
const mysql=require('mysql2');

//contador de erros = 9

const app= express()

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'centro_treinamento',
});

app.use(express.json())

const academia = []

app.post('/academia', (req, res) => {
    const   {nome,atendimento,preco,quantidade} = req.body

    if (!nome || typeof nome != 'string' || nome.trim() == '') {
        return res.status(400).send('Nome  é obrigatório e deve ser uma string não vazia.');
    }
    
    if (!atendimento || typeof atendimento != 'string' || atendimento.trim() == '' ) {
        return res.status(400).send('O atendimento deve conter  com dados e deve se  com a string .');
        
    }
    


    if (!preco || typeof preco != 'string' || preco.trim() == '' ) {
        return res.status(400).send('o preco tem que ser validado e deve ser uma marcada com uma string nao vazia. ');

    }

 
    if (!quantidade || typeof quantidade != 'string' || quantidade .trim() == ''){
        return res.status(400).send('As quantidades de paciente deve ser marcados   com a string vazia  .');
    
    }
    
    
    conexao.query(
        'INSERT INTO sessoes (aluno, personal, tipo_treino,data,horario,observacoes) VALUES (?,?,?,?,?,?)',
        [
            nome,
            atendimento, 
            preco,
            quantidade,
    
        ],
        () => {
            res.status(201).send('Consulta cadastrada com sucesso!')
    })

})


app.get('/academia', (req, res) => {
    conexao.query('SELECT nome,atendimento,preco,quantidade FROM sessoes',(err, results) => {
        if (err){
            return res.status(500).send('Erro ao buscar academia');
        }
        
        res.status(200).send(results);
    })
});

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})

app.delete('/planos/:id', (req, res) => {
    const { id } = req.params

    conexao.query('DELETE FROM  planos WHERE id = ?', [id], (err, results) => {
        if (err) {
           return res.status(500).send('Erro ao deletar');
        }
        if (results.affectedRows === 0) {

return res.status(404).send('Plano não encontrado');
        }

        res.status(200).send('Plano deletado com sucesso')
    })
})

app.put('/planos/:id',(req, res) => {
    const { id } = req.params;
    const {nome, atendimento , preco,quantidade} = req.body;

     const query = 'UPDATE produtos SETnome= ?,atendimento= ?,preco= ?,quantidade= ?, WHERE id = ?';
    
    conexao.query(query, [ nome,atendimento,preco,quantidade], (err, results ) => {

        if (err) {
            res.status(500).send('Erro ao atualizar');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('PLano não encontrado');
     
    }
    
    res.send('Plano atualizado com sucesso');
});

});





