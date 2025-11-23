const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes/products");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);

// health
app.get("/", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
