console.log('In Memory FileSystem');
// You are required to design and implement an in-memory file system using JavaScript.
// The file system should support basic directory and file operations similar to a real operating system, but everything should be stored in memory (no database, no actual disk).

// 🧩 Requirements

// Implement a FileSystem class that supports the following operations:

// 1️⃣ Directory Structure

// The file system must have a root directory named "root".

// Each directory can contain:

// Sub-directories

// Files (stored as an array of file names)

// 2️⃣ Directory Operations
// ➕ Create Directory
// createDirectory(name)
// Creates a new directory with the given name inside the current directory.

// 🔁 Change Directory
// changeDirectory(path)
// Changes the current directory to the given path.
// The path is represented as a string separated by -
// Example: "root-folder1-subfolder2"

// ❌ Delete Directory
// deleteDirectory(name)
// Deletes the directory with the given name from the current directory.

// 3️⃣ File Operations
// ➕ Add File
// addFile(fileName)
// Adds a file to the current directory.

// ❌ Delete File
// deleteFile(fileName)
// Removes the given file from the current directory.

// 4️⃣ Read Operations
// 📍 Get Current Directory Path
// getCurDirectoryPath()
// Returns the path of the current directory as a string.

// 📂 Get Current Directory
// getCurDirectory()
// Returns the current directory object.

// 🌳 Get Root Directory
// getRootDirectory()
// Returns the complete file system starting from root.


// MAIN POINT THAT SOLVES THE PROBLEM IS, maintaining currectDir object that internally reference to file system object to use the current directory path to store the current directory object and the current directory path in a variable.

class FileSystem {
    fileSystem : Record<string, any> = {};
    currentDirectoryPath = 'root';
    currentDir: Record<string, any> = {};

    constructor(){
        this.fileSystem['root'] = {};
        this.currentDir = this.fileSystem['root'];
    }

    private _changeDirectoryHelperUtil(path: string){
        const hyphenSeparatedDirectoriesList = path.split('/');
        let currentSelectedDirectory = this.fileSystem;
        for(const dir of hyphenSeparatedDirectoriesList){
            currentSelectedDirectory = currentSelectedDirectory[dir];
        };
        return currentSelectedDirectory;
    }

    // for creating a new directory I will just a new object("{name: {}}") to the current directory
    public createDirectory(name: string){
        this.currentDir[name] = {files: []};
    }

    // to change the directory to the given path we need to change the current working directory as well to that given object path
    /*
    params: path : string
    path can be / separated
    */
    public changeDirectory(path: string){
        this.currentDir = this._changeDirectoryHelperUtil(path);
        this.currentDirectoryPath = path;
    }

    // Deletes the directory with the given name from THE CURRECT DIRECTORY.
    public deleteDirectory(name: string){
        delete this.currentDir[name];
    }

    // Adds a file to the current directory.
    public addFile(fileName: string){
        this.currentDir['files'].push(fileName);
    }

    // Removes the given file from the current directory.
    public deleteFile(fileName: string){
        this.currentDir['files'] = this.currentDir['files'].filter((item: string) => item !== fileName);
    }

    // Returns the path of the current directory as a string.
    public getCurDirectoryPath(){
        return this.currentDirectoryPath;
    }

    // Returns the current directory object.
    public getCurDirectory(){
        return this.currentDir;
    }

    // Returns the complete file system starting from root.
    public getRootDirectory(){
        return this.fileSystem;
    }
}

const dir = new FileSystem();
dir.createDirectory('prashant');
dir.changeDirectory('root/prashant');
dir.addFile('index.html');
dir.addFile('app.js');
dir.changeDirectory('root');
dir.createDirectory('practice');
dir.changeDirectory('root/practice');
dir.addFile('index.html');
dir.addFile('app.js');
dir.createDirectory('build');
dir.changeDirectory('root/practice/build');
dir.addFile('a.png');
dir.addFile('b.jpg');
dir.deleteFile('a.png');
dir.changeDirectory('root');
dir.deleteDirectory('prashant');
console.log("getRootDirectory", dir.getRootDirectory());
console.log("getCurDirectory", dir.getCurDirectory());
console.log("getCurDirectoryPath", dir.getCurDirectoryPath());

/* getRootDirectory 
{
    "root": {
        "practice": {
            "files": [
                "index.html",
                "app.js"
            ],
            "build": {
                "files": [
                    "b.jpg"
                ]
            }
        }
    }
}*/

/*getCurDirectory
{
    "practice": {
        "files": [
            "index.html",
            "app.js"
        ],
        "build": {
            "files": [
                "b.jpg"
            ]
        }
    }
}*/

/*getCurDirectoryPath
root
*/