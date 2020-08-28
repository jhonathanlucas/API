const mongoose = require('mongoose');

//formato do banco
const Artigo = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
},
{
    timestamps: true,
});

mongoose.model('artigo', Artigo);