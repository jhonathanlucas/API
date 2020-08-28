const express = require('express');
const mongoose = require('mongoose');

require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://jhonathan:070662jh@eqi.2ptgc.mongodb.net/EQI?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
});


//listar
app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
}); 


//visualizar
app.get("/artigo/:id", (req, res) =>{
    Artigo.findOne({_id:req.params.id}).then((artigo) =>{
        return res.json(artigo);
    }).catch((erro) =>{
        return res.status(400).json({
            error: true,
            message: "Nenhhum artigo encontrado"
        })
    })

})

//cadastrar
app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso!"
        });
    
        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
    });
});

//editar
app.put("/artigo/:id", (req, res) => {
    const artigo = Artigo.updateOne({_id: req.params.id}, req.body,(err) => {
         if(err) return res.status(400).json({
             erro: true,
             message:"Error: artigo não foi editado com sucesso!"
         });
         return res.json({
             error: false,
             message: "artigo editado com sucesso"
         });
    });
});

//delete
app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message:"Error: artigo não foi apagado com sucesso!"
        });
        return res.json({
            error: false,
            message: "artigo apagado com sucesso"
        });
    }); 
});

app.listen(8080, () =>{
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/");
});