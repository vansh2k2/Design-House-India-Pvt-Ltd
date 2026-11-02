/* Compresses the images in public/service (JPG, JPEG and PNG, in any subfolder) to WebP and saves them in
   public/service/optimized, in the same folder structure. Dimensions stay the same, and the originals are
   never changed: they stay where they are as backups. Nothing outside public/service is read or written,
   except the report.

     npm run optimize:service-images              converts new and changed images
     npm run optimize:service-images -- --force   converts every image again

   The website imports the WebP files directly (components/services/details), so a brand-new image also
   needs its import added there. */

import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.join(ROOT, "public", "service");
const OUTPUT_DIR = path.join(SOURCE_DIR, "optimized");
const REPORT_FILE = path.join(ROOT, "scripts", "service-images-report.md");

const IMAGE_FILE = /\.(jpe?g|png)$/i;
const WEBP_OPTIONS = { quality: 90, effort: 6, smartSubsample: true }; // effort 6: slowest and smallest

const force = process.argv.includes("--force");
const relative = (file) => path.relative(SOURCE_DIR, file).split(path.sep).join("/");
const megabytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;
const percentSaved = (original, compressed) => `${((1 - compressed / original) * 100).toFixed(1)}%`;

// Width and height as the image is shown, which differ from the stored ones if its EXIF data says to rotate it
const shownSize = ({ width, height, orientation }) => (orientation >= 5 ? { width: height, height: width } : { width, height });

const findImages = async (folder) => {
  const entries = await readdir(folder, { withFileTypes: true });
  const found = await Promise.all(
    entries.map((entry) => {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) return file === OUTPUT_DIR ? [] : findImages(file);
      return IMAGE_FILE.test(entry.name) ? [file] : [];
    })
  );
  return found.flat().sort();
};

const outputFor = (source) => path.join(OUTPUT_DIR, path.relative(SOURCE_DIR, source)).replace(IMAGE_FILE, ".webp");

// Written only once it is complete, so an interrupted run can't leave a broken file that looks up to date
const optimize = async (source) => {
  const output = outputFor(source);
  const [original, existing] = await Promise.all([stat(source), stat(output).catch(() => null)]);
  const upToDate = !force && existing && existing.mtimeMs >= original.mtimeMs;
  if (!upToDate) {
    const webp = await sharp(source).rotate().webp(WEBP_OPTIONS).toBuffer();
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, webp);
  }

  const [before, after, compressed] = await Promise.all([sharp(source).metadata(), sharp(output).metadata(), stat(output)]);
  const [a, b] = [shownSize(before), shownSize(after)];
  if (a.width !== b.width || a.height !== b.height) throw new Error(`size changed from ${a.width}x${a.height} to ${b.width}x${b.height}`);

  return { file: relative(source), width: a.width, height: a.height, original: original.size, compressed: compressed.size, converted: !upToDate };
};

const toReport = (rows, failures) => {
  const original = rows.reduce((sum, row) => sum + row.original, 0);
  const compressed = rows.reduce((sum, row) => sum + row.compressed, 0);
  const larger = rows.filter((row) => row.compressed >= row.original);
  return [
    "# Service image optimization",
    "",
    `Source: public/service. Output: public/service/optimized. WebP quality ${WEBP_OPTIONS.quality}, effort ${WEBP_OPTIONS.effort}.`,
    "",
    "| Image | Dimensions | Original | WebP | Saved |",
    "| --- | --- | --- | --- | --- |",
    ...rows.map((row) => `| ${row.file} | ${row.width}x${row.height} | ${megabytes(row.original)} | ${megabytes(row.compressed)} | ${percentSaved(row.original, row.compressed)} |`),
    "",
    `**Total: ${rows.length} images, ${megabytes(original)} to ${megabytes(compressed)}, saved ${megabytes(original - compressed)} (${percentSaved(original, compressed)}).**`,
    ...(larger.length ? ["", `Larger as WebP than the original: ${larger.map((row) => row.file).join(", ")}`] : []),
    ...(failures.length ? ["", "Failed:", ...failures.map((failure) => `- ${failure}`)] : []),
    "",
  ].join("\n");
};

const images = await findImages(SOURCE_DIR);

// a.png and a.jpg in one folder would both become a.webp
const seen = new Map();
for (const image of images) {
  const output = outputFor(image);
  if (seen.has(output)) throw new Error(`${relative(seen.get(output))} and ${relative(image)} would both become ${relative(output)}`);
  seen.set(output, image);
}

const rows = [];
const failures = [];
for (const image of images) {
  try {
    const row = await optimize(image);
    rows.push(row);
    console.log(`${row.converted ? "converted " : "up to date"}  ${row.file}  ${percentSaved(row.original, row.compressed)} smaller`);
  } catch (error) {
    failures.push(`${relative(image)}: ${error.message}`);
    console.error(`FAILED      ${relative(image)}: ${error.message}`);
  }
}

const report = toReport(rows, failures);
await writeFile(REPORT_FILE, report);
console.log(`\n${report.split("\n").filter((line) => line.startsWith("**")).join("").replace(/\*\*/g, "")}`);
console.log(`Report: ${path.relative(ROOT, REPORT_FILE)}`);
if (failures.length) process.exitCode = 1;
