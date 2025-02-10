import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../SongManager.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:3000/api/songs";

const SongManager = () => {
  const [songs, setSongs] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", path: "", plays: 0 });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(API_URL);
      setSongs(response.data || []);
    } catch (error) {
      console.error("Error fetching songs:", error);
      Swal.fire("Error", "Error al obtener canciones", "error");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.path) {
      Swal.fire("Error", "El nombre y la URL son obligatorios", "error");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${formData.id}`, {
          name: formData.name,
          path: formData.path,
          plays: formData.plays,
        });
        Swal.fire("Éxito", "Canción actualizada correctamente", "success");
      } else {
        await axios.post(API_URL, {
          name: formData.name,
          path: formData.path,
          plays: formData.plays,
        });
        Swal.fire("Éxito", "Canción añadida correctamente", "success");
      }

      setFormData({ id: "", name: "", path: "", plays: 0 });
      setIsEditing(false);
      fetchSongs();
    } catch (error) {
      console.error("Error saving song:", error);
      Swal.fire("Error", "Error al guardar la canción", "error");
    }
  };

  const handleEdit = (song) => {
    setFormData({
      id: song.id || song.Id || "",
      name: song.name || song.Name || "",
      path: song.path || song.Path || "",
      plays: song.plays || 0,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/${id}`);
          Swal.fire("Eliminado", "Canción eliminada correctamente", "success");
          fetchSongs();
        } catch (error) {
          console.error("Error deleting song:", error);
          Swal.fire("Error", "Error al eliminar la canción", "error");
        }
      }
    });
  };

  return (
    <div className="container">
      <h2>Microservicio - CRUD Canciones</h2>
      <h3>Ricardo Becerra GR2</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre de la canción"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="path"
          placeholder="URL de YouTube"
          value={formData.path}
          onChange={handleInputChange}
          required
        />
        <button className="btn" type="submit">{isEditing ? "Actualizar" : "Agregar"} Canción</button>
      </form>

      <div className="song-list">
        {Array.isArray(songs) &&
          songs.map((song) => (
            <div className="song-card" key={song.Id}>
              <h3>{song.Name}</h3>
              {song.Path.includes("youtube.com") && (
                <iframe
                  width="300"
                  height="170"
                  src={`https://www.youtube.com/embed/${song.Path.split("v=")[1]}`}
                  title="YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              <div className="actions">
                <button className="edit-btn" onClick={() => handleEdit(song.Id)}>
                  <FaEdit /> Editar
                </button>
                <button className="delete-btn" onClick={() => handleDelete(song.Id)}>
                  <FaTrash /> Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SongManager;
