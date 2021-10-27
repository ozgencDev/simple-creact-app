const { mkdirSync, writeFileSync, existsSync, rmSync } = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");
require("dotenv").config();
const fileContent = require("./data");

const projectPath = path.join(os.homedir(), "Desktop", "simple-react-app");

function createFile(filePath, filename = "bash.sh") {
  return path.join(filePath, filename);
}

function creact() {
  const { INIT, PRRD, CHILDS, FILEPERCHILDS } = process.env;
  const srcChilds = CHILDS.split(",");
  const srcChildFiles = FILEPERCHILDS.split(",");
  for (let i = 1; i < i + 1; i++) {
    const finalPath = `${projectPath}-${i}`;
    const isExists = existsSync(finalPath);
    if (!isExists) {
      mkdirSync(path.join(finalPath, "src"), { recursive: true });
      srcChilds.forEach((val, index) => {
        mkdirSync(path.join(finalPath, "src", val));
        writeFileSync(
          path.join(finalPath, "src", val, srcChildFiles[index]),
          fileContent[val]
        );
      });
      writeFileSync(createFile(finalPath, "README.md"), fileContent["readme"]);
      writeFileSync(createFile(finalPath), INIT);
      execSync(`sh ${createFile(finalPath)}`, {
        cwd: finalPath,
      });
      writeFileSync(createFile(finalPath), PRRD);
      execSync(`sh ${createFile(finalPath)}`, {
        cwd: finalPath,
      });
      writeFileSync(
        createFile(finalPath, ".gitignore"),
        ".parcel-cache/\ndist/\nnode_modules/"
      );

      rmSync(createFile(finalPath), { force: true });

      return;
    }
  }
}

module.exports = creact;
