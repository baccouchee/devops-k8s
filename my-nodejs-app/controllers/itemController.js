const controller = {};

// Fetch all items
controller.list = (req, res) => {
  req.pool.query("SELECT id, name, description FROM items", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result.rows); // Send JSON response with all items
  });
};

// Add a new item
controller.save = (req, res) => {
  const { name, description } = req.body;

  console.log("Received data:", req.body); // Log the received data

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  const query =
    "INSERT INTO items (name, description) VALUES ($1, $2) RETURNING id, name, description";
  const values = [name, description];

  req.pool.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(result.rows[0]); // Send JSON response with the newly added item
  });
};

// Delete an item by ID
controller.delete = (req, res) => {
  const { id } = req.params;

  req.pool.query(
    "DELETE FROM items WHERE id = $1 RETURNING id, name, description",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.rowCount === 0) {
        return res
          .status(404)
          .json({ error: "No matching item found for deletion" });
      }
      res.json({
        message: "Item deleted successfully",
        deletedItem: result.rows[0],
      }); // Respond with deleted item data
    }
  );
};

// Update an item by ID
controller.update = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  const query =
    "UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING id, name, description";
  const values = [name, description, id];

  req.pool.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "No matching item found for update" });
    }
    res.json(result.rows[0]); // Respond with updated item data
  });
};

module.exports = controller;
