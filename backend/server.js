const express = require("express")
const cors = require("cors")
const fs =  require("fs")
const app = express()
const PORT = 3001

const writeCurriculos = (data) => {
    fs.writeFileSync('./curriculos.json', JSON.stringify(data, null, 2))
}

const readCurriculos = () => {
    const data = fs.readFileSync('./curriculos.json')
    return JSON.parse(data)
}

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

app.get('/', (req, res) => {
    res.send(`Servidor rodando na porta ${PORT}`)
})

app.post("/curriculos", (req, res) => {
  const curriculos = readCurriculos()
  const formData = req.body;
  const novoCurriculo = {
    id: curriculos.length > 0 ? curriculos[curriculos.length - 1].id + 1 : 1,
    ...formData,
  };

  curriculos.push(novoCurriculo);
  writeCurriculos(curriculos);
  res.status(201).json(novoCurriculo);
});

app.get("/curriculos", (req, res) => {
  const curriculos = readCurriculos();
  res.json(curriculos);
});

app.get("/curriculos/:id", (req, res) => {
  const curriculos = readCurriculos();
  const id = parseInt(req.params.id);
  const curriculo = curriculos.find((c) => c.id === id);

  if (curriculo) {
    res.json(curriculo);
  } else {
    res.status(404).json({ error: "Currículo não encontrado" });
  }
});

app.put("/curriculos/:id", (req, res) => {
  let curriculos = readCurriculos();
  const id = parseInt(req.params.id);
  const index = curriculos.findIndex((c) => c.id === id);

  if (index !== -1) {
    curriculos[index] = { id, ...req.body };
    writeCurriculos(curriculos);
    res.json(curriculos[index]);
  } else {
    res.status(404).json({ error: "Currículo não encontrado" });
  }
});

app.delete("/curriculos/:id", (req, res) => {
  let curriculos = readCurriculos();
  const id = parseInt(req.params.id);
  const novos = curriculos.filter((c) => c.id !== id);

  writeCurriculos(novos);
  res.status(204).end();
});