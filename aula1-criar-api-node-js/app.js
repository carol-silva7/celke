const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Usuarios');
const Usuarios = mongoose.model('usuarios');

require('./models/Contatos');
const Contatos = mongoose.model('contatos');

require('./models/Sobre');
const Sobre = mongoose.model('sobre');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});


mongoose.connect('mongodb://localhost/celke', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizado com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não realizado com sucesso!" + erro);
});

//CRUD usuário
app.get("/usuarios", (req, res) => {
    Usuarios.find({}).then((usuarios) => {
        return res.json(usuarios);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum usuário encontrado!"
        });
    });
});

app.get("/usuarios/:id", (req, res) => {
    Usuarios.findOne({ _id: req.params.id }).then((usuario) => {
        return res.json(usuario);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum usuário encontrado!"
        });
    });
});

app.post("/usuarios", (req, res) => {
    Usuarios.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Usuário não cadastrado com sucesso!"
        })

        return res.json({
            error: false,
            message: "Usuário cadastrado com sucesso!"
        })
    });
});

app.put("/usuarios/:id", (req, res) => {
    Usuarios.updateOne({ _id: req.params.id }, req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Usuario não editado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Usuário editado com sucesso!"
        });
    });
});

app.delete("/usuarios/:id", (req, res) => {
    Usuarios.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Usuário não apagado!"
        });

        return res.json({
            error: false,
            message: "Usuário apagado com sucesso!"
        });
    });
});

//CRUD contato
app.get("/contatos", (req, res) => {
    Contatos.find({}).then((contatos) => {
        return res.json(contatos);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum contato encontrado!"
        });
    });
});

app.get("/contatos/:id", (req, res) => {
    Contatos.findOne({ _id: req.params.id }).then((contato) => {
        return res.json(contato);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum contato encontrado!"
        });
    });
});

app.post("/contatos", (req, res) => {
    Contatos.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Contato não cadastrado com sucesso!"
        })

        return res.json({
            error: false,
            message: "Contato cadastrado com sucesso!"
        })
    });
});

app.put("/contatos/:id", (req, res) => {
    Contatos.updateOne({ _id: req.params.id }, req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Contato não editado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Contato editado com sucesso!"
        });
    });
});

app.delete("/contatos/:id", (req, res) => {
    Contatos.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Contato não apagado!"
        });

        return res.json({
            error: false,
            message: "Contato apagado com sucesso!"
        });
    });
});

//CRUD da página Sobre
app.get("/sobre", (req, res) => {
    Sobre.findOne({}).then((sobre) => {
        return res.json(sobre);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum registro sobre encontrado!"
        });
    });
});

app.post("/sobre", (req, res) => {
    Sobre.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Conteúdo da página sobre não cadastrado com sucesso!"
        })

        return res.json({
            error: false,
            message: "Conteúdo da página sobre cadastrado com sucesso!"
        })
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});