const fs = require('fs');
const path = require('path');

const folderPath = path.resolve('03-files-in-folder', 'secret-folder');
fs.readdir(folderPath, { withFileTypes: true }, (_, items) => {
  const files = items.filter((item) => item.isFile());

  files.forEach((file) => {
    const filePath = path.join(folderPath, file.name);
// console.log(filePath);
    fs.stat(filePath, (_, stats) => {
      const fileName = path.basename(file.name, path.extname(file.name));
      console.log(
        `Name: "${fileName}", Extension: "${path.extname(
          file.name,
        )}", Weight: ${stats.size} bytes`
      );
    });
  });
});
