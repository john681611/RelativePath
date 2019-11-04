import copyPaste = require('copy-paste');
import * as vscode from 'vscode';

const sharedStart = (array :Array<string>) => {
  const parts= array.concat().sort();
  let firstPart= parts[0], secondPart= parts[parts.length-1], i= 0;
  while(i<firstPart.length && firstPart.charAt(i)=== secondPart.charAt(i)) { i++; }
  return firstPart.substring(0, i);
};

const removeInPathAndSplit = (path: string, regex: RegExp) => {
  return path.replace(regex,'')
  .split('/')
  .filter(n => n !== '');
};

const copy = (relPaths: Array<string>) =>  {
  if(relPaths) {
      copyPaste.copy(relPaths.join('\n'), res => {
      if(res !== null) {
              vscode.window.showErrorMessage(`Could not copy:${res}`);
          }
      });
  }
};

const getWorkspaceFolderPath = (file: vscode.Uri) => {
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(file);
  return workspaceFolder? workspaceFolder.uri.path : null;
};

const removeFileExtentions = (relPath: String) => {
  let relPathParts = relPath.split('.');
  relPathParts.pop();
  return relPathParts.join('.');
};

export {
  sharedStart,
  removeInPathAndSplit,
  copy,
  getWorkspaceFolderPath,
  removeFileExtentions
};