import express from 'express'
import path from 'path'

const app = express()
const PORT = 8000

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(process.cwd(), 'public')))

// Rota para o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}/`)
})