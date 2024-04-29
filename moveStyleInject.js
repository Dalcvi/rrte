import fs from 'fs';
import path from 'path';

// Define the source and destination directories
const srcDir = './dist/es/node_modules/.pnpm/style-inject@0.3.0/node_modules/style-inject/dist';
const destDir = './dist/es/style-inject';

if (fs.existsSync(srcDir)) {
  // Move the files from the source to destination directory
  fs.mkdirSync(destDir, { recursive: true });
  fs.readdirSync(srcDir).forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    fs.renameSync(srcPath, destPath);
  });

  // Remove the source directory
  fs.rmSync('./dist/es/node_modules', { recursive: true });

  // Traverse through each .js file in the destination directory
  const replaceName = dir => {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        replaceName(filePath);
      }
      if (['.js', '.map'].includes(path.extname(filePath))) {
        let content = fs.readFileSync(filePath, 'utf-8');
        content = content.replace(
          'node_modules/.pnpm/style-inject@0.3.0/node_modules/style-inject/dist',
          'style-inject'
        );
        fs.rmSync(filePath);
        fs.writeFileSync(filePath, content);
      }
    });
  };

  replaceName('./dist/es');
}
