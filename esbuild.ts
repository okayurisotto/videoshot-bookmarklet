import esbuild from "esbuild";
import path from "path";
import fs from "fs";

esbuild.buildSync({
  bundle: true,
  entryPoints: [path.resolve(__dirname, "./src/main.ts")],
  minify: true,
  outfile: path.resolve(__dirname, "./out/main.js"),
  platform: "browser",
});

fs.writeFileSync(
  path.resolve(__dirname, "./out/bookmarklet.txt"),
  fs
    .readdirSync(path.resolve(__dirname, "./out/"))
    .map((filename) => path.resolve(__dirname, "./out/", filename))
    .map((path) => {
      const content = fs.readFileSync(path, { encoding: "utf-8" });
      return `javascript:${encodeURIComponent(
        `void((() => { ${content} })());`
      )}`;
    })
    .join("\n")
);
