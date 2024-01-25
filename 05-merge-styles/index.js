const fs = require('fs');
const path = require('path');

let fileDirection = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(fileDirection, '', (err) => {
  if (err) throw err;
});

fs.readdir('05-merge-styles/styles', { withFileTypes: true }, (err, items) => {
  if (err) throw err;

  let res = [];

  items
    .filter((item) => item.isFile() && path.extname(item.name) === '.css')
    .forEach((item) => {
      let filePath = path.join('05-merge-styles/styles', item.name);

      fs.readFile(filePath, 'utf-8', (error, data) => {
        if (error) throw error;

        res.push(data);
        fs.appendFileSync(fileDirection, data);
      });
    });
});
