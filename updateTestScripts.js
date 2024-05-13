import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.join(__dirname, 'packages');

async function updatePackageJson(directory) {
  const packageJsonPath = path.join(directory, 'package.json');

  try {
    const data = await fs.readFile(packageJsonPath, { encoding: 'utf8' });
    const packageJson = JSON.parse(data);

    if (packageJson.scripts && packageJson.scripts.test) {
      const packageDir = path.relative(packagesDir, directory);
      const testPathPattern = `--testPathPattern=packages/${packageDir}/src`;

      if (!packageJson.scripts.test.includes(testPathPattern)) {
        packageJson.scripts.test += ` ${testPathPattern}`;
        await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log(`Updated test script in ${packageJsonPath}`);
      }
    }
  } catch (err) {
    console.error(`Error processing ${packageJsonPath}: ${err}`);
  }
}

async function traversePackagesDir(dir) {
  try {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
      if (dirent.isDirectory()) {
        const subdir = path.join(dir, dirent.name);
        await traversePackagesDir(subdir); // Recurse into subdirectories
      } else if (dirent.name === 'package.json') {
        await updatePackageJson(path.dirname(path.join(dir, dirent.name)));
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}: ${err}`);
  }
}

traversePackagesDir(packagesDir);
