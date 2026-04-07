import express from "express";
import { prodotti } from "./db.js";
const app = express();
const port = 3000;
app.use(express.json())


app.get("/prodotti", (req, res) => {
  const {nome, prezzo, categoria, brand} = req.query;
  let risultati = [...prodotti];
  if (nome) risultati = risultati.filter((p) => p.nome.toLowerCase() === nome.toLowerCase());
  if (prezzo) risultati = risultati.filter((p) => p.prezzo === prezzo);
  if (categoria) risultati = risultati.filter((p) => p.categoria.toLowerCase() === categoria.toLowerCase());
  if (brand) risultati = risultati.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  if (risultati.length === 0) {
    return res.status(404).json({ errore: 'Nessun prodotto trovato' });
  }
  res.status(200).json(risultati);

})

app.post("/prodotti", (req, res) => {
  const newProdotto = req.body;
  prodotti.push(newProdotto);
  res.status(201).json(newProdotto);
});

app.delete("/prodotti/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = prodotti.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ errore: 'Prodotto non trovato' });
  }
  const deletedProdotto = prodotti.splice(index, 1);
  res.status(200).json(deletedProdotto[0]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
