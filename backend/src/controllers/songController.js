const { sql, poolPromise } = require("../config/db");

// Obtener todas las canciones
const getAllSongs = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Songs");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una canción por ID
const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Songs WHERE Id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva canción
const createSong = async (req, res) => {
  try {
    console.log("Recibiendo datos:", req.body); // 👈 Agrega esta línea
    const { name, path, plays } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("path", sql.NVarChar, path)
      .input("plays", sql.Int, plays || 0)
      .query("INSERT INTO Songs (Name, Path, Plays) OUTPUT INSERTED.* VALUES (@name, @path, @plays)");

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error("❌ Error en createSong:", error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una canción
const updateSong = async (req, res) => {
  try {
    const { id } = req.params; // Asegurar que recibe el ID de la URL
    const { Name, Path, Plays } = req.body; // Verificar que los nombres coincidan con el frontend

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, Name)
      .input("path", sql.NVarChar, Path)
      .input("plays", sql.Int, Plays)
      .query("UPDATE Songs SET Name=@name, Path=@path, Plays=@plays WHERE Id=@id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    res.json({ message: "Canción actualizada" });
  } catch (error) {
    console.error("❌ Error en updateSong:", error);
    res.status(500).json({ error: error.message });
  }
};


// Eliminar una canción
const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request().input("id", sql.Int, id).query("DELETE FROM Songs WHERE Id=@id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    res.json({ message: "Canción eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllSongs, getSongById, createSong, updateSong, deleteSong };
