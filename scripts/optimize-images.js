import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = process.cwd();

const inputDir = path.join(root, "public", "picture");
const outputDir = path.join(root, "public", "picture_optimized");

const validExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const maxWidth = 1200;
const quality = 78;

function walk(dir) {
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

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (!validExtensions.has(ext)) {
    return;
  }

  const relativePath = path.relative(inputDir, filePath);
  const parsedRelative = path.parse(relativePath);

  const outputSubDir = path.join(outputDir, parsedRelative.dir);
  const outputPath = path.join(outputSubDir, `${parsedRelative.name}.webp`);

  ensureDir(outputSubDir);

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
    `${relativePath}  ${formatMB(before)} -> ${formatMB(after)}`
  );
}

async function main() {
  if (!fs.existsSync(inputDir)) {
    console.error("Cartella public/picture non trovata.");
    process.exit(1);
  }

  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }

  ensureDir(outputDir);

  const files = walk(inputDir);

  for (const file of files) {
    await optimizeImage(file);
  }

  console.log("Ottimizzazione completata.");
  console.log("Output creato in public/picture_optimized");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});