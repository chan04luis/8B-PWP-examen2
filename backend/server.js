const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/people/', async (req, res) => {
  const { page } = req.query;

  if (page !== undefined) {
    const n = Number(page);
    if (!Number.isInteger(n) || n < 1) {
      return res.status(400).json({
        error: true,
        message: 'El parámetro "page" debe ser un número entero mayor a 0'
      });
    }
  }

  try {
    const url = page
      ? `https://swapi.py4e.com/api/people/?page=${page}`
      : `https://swapi.py4e.com/api/people/`;

    const response = await axios.get(url);

    res.json({
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
      results: response.data.results
    });
  } catch (error) {
    console.error('Error al consultar SWAPI (listado):', error.message);
    res.status(500).json({
      error: true,
      message: 'Error interno del servidor. Intenta más tarde.'
    });
  }
});

app.get('/api/people/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id)) || Number(id) < 1) {
    return res.status(400).json({
      error: true,
      message: 'El ID debe ser un número válido mayor a 0'
    });
  }

  try {
    const response = await axios.get(`https://swapi.py4e.com/api/people/${id}/`);

    const filmPromises = response.data.films.map((filmUrl) =>
      axios.get(filmUrl).then(r => r.data.title).catch(() => 'Película desconocida')
    );
    const filmNames = await Promise.all(filmPromises);

    res.json({
      error: false,
      data: {
        name: response.data.name,
        height: response.data.height,
        mass: response.data.mass,
        hair_color: response.data.hair_color,
        skin_color: response.data.skin_color,
        eye_color: response.data.eye_color,
        birth_year: response.data.birth_year,
        gender: response.data.gender,
        url: response.data.url,
        films: filmNames
      }
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        error: true,
        message: `No se encontró ningún personaje con el ID ${id}`
      });
    }

    console.error('Error al consultar SWAPI (detalle):', error.message);
    res.status(500).json({
      error: true,
      message: 'Error interno del servidor. Intenta más tarde.'
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Servidor SWAPI Proxy activo',
    endpoints: {
      'GET /api/people/': 'Lista personas (opcional ?page=2)',
      'GET /api/people/:id': 'Obtiene información de un personaje por ID'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});