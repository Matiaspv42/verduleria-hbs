const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')

// config
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views', 'layouts'))
app.set('componentes', path.join(__dirname, 'views', 'componentes'))


app.engine(
    'handlebars',
    exphbs.engine({
        layoutsDir: app.get('views'),
        partialsDir: app.get('componentes') 
    })
)

app.use(require('./routes'))

app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')))
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')))
// creo ruta con carpeta publica para acceder a imagenes y el javascript del cliente
app.use('/public', express.static(path.join(__dirname, 'public')))


app.listen(3000,()=>{
    console.log('Servidor andando en puerto 3000')
})
