import fs from 'fs-extra';

export const createNodemonConfig = (setupFilePath: string) => {
    const fileContent = `
{
    "ignore": [
        "**/*.test.ts",
        "**/*.spec.ts",
        ".git",
        "node_modules"
    ],
    "watch": [
        "src"
    ],
    "exec": "ts-node -r tsconfig-paths/register src/server.ts",
    "ext": "ts"
}
`;
    let filePath: string;
    if (setupFilePath) {
        filePath = setupFilePath;
    } else {
        filePath = process.cwd() + '/nodemon.json';
    }
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) throw err;
    });
};
