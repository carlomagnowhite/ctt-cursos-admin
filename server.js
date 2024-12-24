const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Ruta de la carpeta de distribución de Angular
const distFolder = path.join(__dirname, 'dist', 'ctt-cursos-admin', 'browser');

// Sirve los archivos estáticos generados por Angular
app.use(express.static(distFolder));

// Redirige solo las rutas no existentes al index.html
app.get('*', (req, res) => {
  const requestedFile = path.join(distFolder, req.path);

  // Verifica si el archivo solicitado existe
  if (fs.existsSync(requestedFile)) {
    res.sendFile(requestedFile);
  } else {
    res.sendFile(path.join(distFolder, 'index.html'));
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
