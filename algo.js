const express = require("express");
const app = express();
const port = 3000;
const fields = require("./fields.json");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function createGrid(data) {
  const grid = [];
  for (let i = 0; i < data.size; i++) {
    grid.push(data.parcels.slice(i * data.size, (i + 1) * data.size));
  }
  return grid;
}

function markCultivable(grid) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  const cultivable = grid.map((row) => row.slice());

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === "O") {
        for (let [dx, dy] of directions) {
          const newX = x + dx;
          const newY = y + dy;

          if (
            newX >= 0 &&
            newX < grid.length &&
            newY >= 0 &&
            newY < grid[0].length
          ) {
            if (cultivable[newX][newY] === "X") {
              cultivable[newX][newY] = "C";
            }
          }
        }
      }
    }
  }

  return cultivable;
}

function countCultivable(grid) {
  let count = 0;
  for (let row of grid) {
    for (let cell of row) {
      if (cell === "C") {
        count++;
      }
    }
  }
  return count;
}

app.get("/", (req, res) => {
  res.render("home", { fields });
});

app.get("/field/:nomChamps", (req, res) => {
  const nomChamps = req.params.nomChamps;
  const field = fields.find((field) => field.name === nomChamps);

  if (!field) {
    return res.status(404).send("Field not found");
  } else {
    const grid = createGrid(field);
    const cultivableGrid = markCultivable(grid);
    const totalCultivable = countCultivable(cultivableGrid);
    res.render("field", { field, cultivableGrid, totalCultivable });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
