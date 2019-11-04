import * as vscode from 'vscode';
import * as utils from './utils';

const getRelPaths = (files: Array<vscode.Uri>, workspaceFolderPath: string) => {
  if(files.length){
        const excludeFileExtension = vscode.workspace.getConfiguration('relPath', null).get('excludeFileExtension');
        const regex = new RegExp(workspaceFolderPath, 'g');
        let relPaths =files.map((element: vscode.Uri) => {
        let relPath = element.path.replace(regex,'');
        return excludeFileExtension ? utils.removeFileExtentions(relPath) :  relPath;
        });
        
        return relPaths;
    }else{
        vscode.window.showErrorMessage('Cant find workspace');
      }
  return null;
};

const getFocusedRelativePaths = (relPaths: Array<string>, workspaceFolderPath: string) => {
  const activeTextEditor = vscode.window.activeTextEditor;
  if(activeTextEditor) {
      const focusedFile = activeTextEditor.document.fileName.replace(workspaceFolderPath,'');
      const focusedFileNoExt = utils.removeFileExtentions(focusedFile);
        return relPaths.map((path: string) => {
          if(focusedFile === path || focusedFileNoExt === path) {
            const parts = path.split('/');
            return `./${parts[parts.length -1]}`;
          }
          const regex = new RegExp(utils.sharedStart([path.replace(workspaceFolderPath,''), focusedFile]).slice(0, -1),'g');
          const focusedFileParts = utils.removeInPathAndSplit(focusedFile, regex);
          let pathParts = utils.removeInPathAndSplit(path, regex);

          if(focusedFileParts.length === 1){
              return `./${pathParts.join('/')}`;
          } else {
              return `${'../'.repeat(focusedFileParts.length-1)}${pathParts.join('/')}`;
          }
      });
  }
  return null;
};

export {
  getRelPaths,
  getFocusedRelativePaths

};