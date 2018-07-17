import copyPaste = require('copy-paste');
import * as vscode from 'vscode';

const sharedStart = (array :Array<string>) => {
  var A= array.concat().sort(), 
  a1= A[0], a2= A[A.length-1], L= a1.length, i= 0;
  while(i<L && a1.charAt(i)=== a2.charAt(i)) { i++; }
  return a1.substring(0, i);
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
              vscode.window.showErrorMessage('Could not copy: '+res);
          }
      });
  }
};

const getWorkspaceFolderPath = (file: vscode.Uri) => {
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(file);
  return workspaceFolder? workspaceFolder.uri.path : null;
};

export {
  sharedStart,
  removeInPathAndSplit,
  copy,
  getWorkspaceFolderPath
};