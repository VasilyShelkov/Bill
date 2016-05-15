const path = require('path');
const express = require('express');

module.exports = (app, port) => {
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use('/bootstrap', express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')
  ));

  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

  app.get('*', (req, res) => {
    res.status(404).sendFile('404.html', { root: 'public' });
  });

  app.listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(`Server running at http://localhost: ${port}`);
  });
};
