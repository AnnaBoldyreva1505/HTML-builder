const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const destinationDir = path.join(__dirname, 'files-copy');

async function copyFiles(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });

    const files = await fs.readdir(src);

    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);

      try {
        await fs.access(destPath);
        console.log(`File ${destPath} already exists.`);
      } catch (err) {
        const stat = await fs.stat(srcPath);

        if (stat.isDirectory()) {
          await copyFiles(srcPath, destPath);
        } else {
          await fs.copyFile(srcPath, destPath);
          console.log(`Copied to ${destPath}`);
        }
      }
    }

    console.log('Copying was successful');
  } catch (error) {
    console.error(error.message);
  }
}

copyFiles(sourceDir, destinationDir);
