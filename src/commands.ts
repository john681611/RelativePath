import * as vscode from 'vscode';
import * as utils from './utils';
import * as relativePath from './relativePaths';

const copyRelPath = (res: Object, files: Array<vscode.Uri>) => {
    const workspaceFolderPath =  utils.getWorkspaceFolderPath(files[0]);
    if(workspaceFolderPath) {
        const relativePaths = relativePath.getRelPaths(files, workspaceFolderPath);
        if(relativePaths) {utils.copy(relativePaths);} 
    }
};

const copyRelPathFoc = (res: Object, files: Array<vscode.Uri>) => {
    const workspaceFolderPath =  utils.getWorkspaceFolderPath(files[0]);
    const relPaths =  workspaceFolderPath ? relativePath.getRelPaths(files, workspaceFolderPath) : null; 
    if(relPaths && workspaceFolderPath){
        const focusedRelativePath = relativePath.getFocusedRelativePaths(relPaths, workspaceFolderPath);
        if(focusedRelativePath) {utils.copy(focusedRelativePath);}
    }
};

export {
  copyRelPath,
  copyRelPathFoc
};