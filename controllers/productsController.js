const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "products.json");

function readData() {
  const raw = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
}

exports.getAll = (req, res) => {
  const items = readData();
  res.json(items);
};

exports.getById = (req, res) => {
  const id = Number(req.params.id);
  const items = readData();
  const found = items.find(i => i.id === id);
  if (!found) return res.status(404).json({ message: "Not found" });
  res.json(found);
};

exports.create = (req, res) => {
  const items = readData();
  const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = {
    id: nextId,
    title: req.body.title || "Sin título",
    price: req.body.price || 0,
    image: req.body.image || "",
    description: req.body.description || ""
  };
  items.push(newItem);
  writeData(items);
  res.status(201).json(newItem);
};

exports.update = (req, res) => {
  const id = Number(req.params.id);
  const items = readData();
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: "Not found" });
  const item = items[index];
  const updated = {
    ...item,
    ...req.body,
    id: item.id
  };
  items[index] = updated;
  writeData(items);
  res.json(updated);
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  let items = readData();
  const found = items.find(i => i.id === id);
  if (!found) return res.status(404).json({ message: "Not found" });
  items = items.filter(i => i.id !== id);
  writeData(items);
  res.json({ message: "Deleted" });
};
