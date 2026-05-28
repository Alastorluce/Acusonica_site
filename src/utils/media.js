import { basePath } from "../assets/paths";

export function isVideo(path) {
  return /\.mp4$/i.test(path);
}

export function mediaSources(folder) {
  const fileNames = [
    "01.webp",
    "01.mp4",
  ];

  return fileNames.map((fileName) => `${basePath}picture/${folder}/${fileName}`);
}

export function groupedMediaSources(folder) {
  const groups = [];

  for (let index = 1; index <= 12; index += 1) {
    const number = String(index).padStart(2, "0");

    groups.push([
      `${basePath}picture/${folder}/${number}.webp`,
      `${basePath}picture/${folder}/${number}.mp4`,
    ]);
  }

  return groups;
}
