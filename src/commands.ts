import * as vscode from 'vscode';
import * as utils from './utils';
import * as relativePath from './relativePaths';


const copyRelPathFoc = (res: Object, files: Array<vscode.Uri>) => {
    const workspaceFolderPath =  utils.getWorkspaceFolderPath(files[0]);
    const relPaths =  workspaceFolderPath ? relativePath.getRelPaths(files, workspaceFolderPath) : null; 
    if(relPaths && workspaceFolderPath){
        const focusedRelativePath = relativePath.getFocusedRelativePaths(relPaths, workspaceFolderPath);
        if(focusedRelativePath) {utils.copy(focusedRelativePath);}
    }
};

export {
  copyRelPathFoc
};