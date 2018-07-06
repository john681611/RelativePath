import * as vscode from 'vscode';
import * as utils from './utils';

const getRelPaths = (files: Array<vscode.Uri>, workspace: vscode.WorkspaceFolder, hideExtension: boolean = true) => {
  if(files.length){
      
      if(workspace){
          const regex = new RegExp(workspace.uri.path,'g');
          let relPaths =files.map((element: vscode.Uri) => {
            let relPath = element.path.replace(regex,'');
            if(hideExtension){
              let relPathParts = relPath.split('.');
              relPathParts.pop();
              relPath = relPathParts.join('.');
            }
            return relPath;
          });
          
          return relPaths;
      }else{
          vscode.window.showErrorMessage('Cant find workspace');
      }
  } else {
      vscode.window.showErrorMessage('Could not copy');
  }
  return null;
};

const getFocusedRelativePaths = (relPaths: Array<string>, workspace: vscode.WorkspaceFolder) => {
  const activeTextEditor = vscode.window.activeTextEditor;
  if(activeTextEditor) {
      const focusedFile = activeTextEditor.document.fileName.replace(workspace.uri.path,'');
        return relPaths.map((path: string) => {
          const regex = new RegExp(utils.sharedStart([path.replace(workspace.uri.path,''), focusedFile]).slice(0, -1),'g');
          const focusedFileParts = utils.removeInPathAndSplit(focusedFile, regex);
          let pathParts = utils.removeInPathAndSplit(path, regex);

          if(focusedFileParts.length === 1){
              return './' + pathParts.join('/');
          } else {
              return '../'.repeat(focusedFileParts.length-1) + pathParts.join('/');
          }
      });
  }
  return null;
};

export {
  getRelPaths,
  getFocusedRelativePaths

};