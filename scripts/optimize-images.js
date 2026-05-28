import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = process.cwd();

const inputDir = path.join(root, "public", "picture_update");
const outputDir = path.join(root, "public", "picture");

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const videoExtensions = new Set([".mp4"]);

const maxWidth = 1200;
const quality = 78;
const numberWidth = 2;

function walk(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return [fullPath];
  });
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function formatNumber(number) {
  return String(number).padStart(numberWidth, "0");
}

function naturalSort(files) {
  return files.sort((a, b) =>
    a.localeCompare(b, "it", {
      numeric: true,
      sensitivity: "base",
    })
  );
}

function getCategoryName(filePath) {
  const relativePath = path.relative(inputDir, filePath);
  const parts = relativePath.split(path.sep);

  if (parts.length < 2) {
    return null;
  }

  return parts[0];
}

function getExistingNumbers(categoryDir, extension) {
  const numbers = new Set();

  if (!fs.existsSync(categoryDir)) {
    return numbers;
  }

  const files = fs.readdirSync(categoryDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (ext !== extension) {
      continue;
    }

    const name = path.parse(file).name;

    if (/^\d+$/.test(name)) {
      numbers.add(Number(name));
    }
  }

  return numbers;
}

function getNextFreeNumber(categoryDir, extension, reservedNumbers) {
  const usedNumbers = getExistingNumbers(categoryDir, extension);

  for (const number of reservedNumbers) {
    usedNumbers.add(number);
  }

  let candidate = 1;

  while (usedNumbers.has(candidate)) {
    candidate += 1;
  }

  reservedNumbers.add(candidate);

  return candidate;
}

async function optimizeImage(filePath, categoryDir, reservedImageNumbers) {
  const number = getNextFreeNumber(categoryDir, ".webp", reservedImageNumbers);
  const outputName = `${formatNumber(number)}.webp`;
  const outputPath = path.join(categoryDir, outputName);

  const before = fs.statSync(filePath).size;

  await sharp(filePath)
    .rotate()
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
    })
    .webp({
      quality,
      effort: 6,
    })
    .toFile(outputPath);

  const after = fs.statSync(outputPath).size;

  console.log(
    `IMG  ${path.relative(root, filePath)}  ->  ${path.relative(root, outputPath)}  ${formatMB(before)} -> ${formatMB(after)}`
  );
}

function copyVideo(filePath, categoryDir, reservedVideoNumbers) {
  const number = getNextFreeNumber(categoryDir, ".mp4", reservedVideoNumbers);
  const outputName = `${formatNumber(number)}.mp4`;
  const outputPath = path.join(categoryDir, outputName);

  fs.copyFileSync(filePath, outputPath);

  const size = fs.statSync(outputPath).size;

  console.log(
    `VID  ${path.relative(root, filePath)}  ->  ${path.relative(root, outputPath)}  ${formatMB(size)}`
  );
}

async function processCategory(categoryName, files) {
  const categoryDir = path.join(outputDir, categoryName);

  ensureDir(categoryDir);

  const reservedImageNumbers = new Set();
  const reservedVideoNumbers = new Set();

  const orderedFiles = naturalSort(files);

  for (const filePath of orderedFiles) {
    const ext = path.extname(filePath).toLowerCase();

    if (imageExtensions.has(ext)) {
      await optimizeImage(filePath, categoryDir, reservedImageNumbers);
      continue;
    }

    if (videoExtensions.has(ext)) {
      copyVideo(filePath, categoryDir, reservedVideoNumbers);
      continue;
    }

    console.log(`IGN  ${path.relative(root, filePath)}  estensione non gestita`);
  }
}

async function main() {
  if (!fs.existsSync(inputDir)) {
    console.error("Cartella public/picture_update non trovata.");
    console.error("Crea public/picture_update e inserisci lì immagini e video da importare.");
    process.exit(1);
  }

  ensureDir(outputDir);

  const files = walk(inputDir);

  if (files.length === 0) {
    console.log("Nessun file trovato in public/picture_update.");
    return;
  }

  const filesByCategory = new Map();

  for (const file of files) {
    const categoryName = getCategoryName(file);

    if (!categoryName) {
      console.log(
        `IGN  ${path.relative(root, file)}  file ignorato perché manca la cartella categoria`
      );
      continue;
    }

    const ext = path.extname(file).toLowerCase();

    if (!imageExtensions.has(ext) && !videoExtensions.has(ext)) {
      console.log(`IGN  ${path.relative(root, file)}  estensione non gestita`);
      continue;
    }

    if (!filesByCategory.has(categoryName)) {
      filesByCategory.set(categoryName, []);
    }

    filesByCategory.get(categoryName).push(file);
  }

  for (const [categoryName, categoryFiles] of filesByCategory.entries()) {
    await processCategory(categoryName, categoryFiles);
  }

  console.log("Importazione e ottimizzazione completate.");
  console.log("Output scritto in public/picture.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});