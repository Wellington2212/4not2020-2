const mongoose = require('mongoose')

module.exports = uri => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () =>
        console.log('==> Mongoose! conectado com sucesso ao servidor')
    )

    mongoose.connection.on('disconnected', () =>
        console.log('==> Mongoose! desconectado do servidor')
    )

    //capturamos um sinal de encerramento (SIGINT), ctrl + c
    process.on('SIGINT', () =>
        mongoose.connection.close(() => {
            console.log('==> Mongoose! Desconectado pelo termino da aplicação')
            //0 indica que a finalização ocorreu sem erros
            process.exit(0);
        })
    )
}