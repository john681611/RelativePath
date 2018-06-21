import * as vscode from 'vscode';
import copyPaste = require('copy-paste');

const lineDelimiter = '\n';

function sharedStart(array :Array<string>){
    var A= array.concat().sort(), 
    a1= A[0], a2= A[A.length-1], L= a1.length, i= 0;
    while(i<L && a1.charAt(i)=== a2.charAt(i)) { i++; }
    return a1.substring(0, i);
}


function getRelPaths(files: Array<vscode.Uri>, workspace: vscode.WorkspaceFolder){
    if(files.length){
        
        if(workspace){
            const regex = new RegExp(workspace.uri.path,'g');

            const relPaths =files.map((element: vscode.Uri) => element.path.replace(regex,''));
            return relPaths;
        }else{
            vscode.window.showErrorMessage('Cant find workspace');
        }
    } else {
        vscode.window.showErrorMessage('Could not copy');
    }
    return null;
}

function removeDuplicateInPath(path: string, regex: RegExp) {
    return path.replace(regex,'')
    .split('/')
    .filter(n => n !== '');
}

function copy(relPaths: Array<string>) {
    if(relPaths) {
        copyPaste.copy(relPaths.join(lineDelimiter), res => {
        if(res !== null) {
                vscode.window.showErrorMessage('Could not copy: '+res);
            }
        });
    }
}



function getFocusedRelativePath(relPaths: Array<string>, workspace: vscode.WorkspaceFolder){
    const activeTextEditor = vscode.window.activeTextEditor;
    if(activeTextEditor) {
        const focusedFile = activeTextEditor.document.fileName.replace(workspace.uri.path,'');
          return relPaths.map((path: string) => {
            const regex = new RegExp(sharedStart([path, focusedFile]).slice(0, -1),'g');
            const focusedFileParts = removeDuplicateInPath(focusedFile, regex);
            let pathParts = removeDuplicateInPath(path, regex);

            if(focusedFileParts.length === 1){
                return '.' + pathParts.join('/');
            } else {
                return '../'.repeat(focusedFileParts.length-1) + pathParts.join('/');
            }
        });
    }
    return null;
}

export function activate(context: vscode.ExtensionContext) {
    let copyRelPath = vscode.commands.registerCommand('extension.copyRelPath', (res, files) => {
        const workspace = vscode.workspace.getWorkspaceFolder(files[0]);
        if(workspace){
            const relPaths = getRelPaths(files, workspace);
            if(relPaths){
                copy(relPaths);
            }
        }
    });
    context.subscriptions.push(copyRelPath);

    let copyRelPathFocus = vscode.commands.registerCommand('extension.copyRelPathFoc', (res, files) => {
        const workspace = vscode.workspace.getWorkspaceFolder(files[0]);
        if(workspace){
            const relPaths = getRelPaths(files, workspace);
            if(relPaths){
                const focusedRelativePath = getFocusedRelativePath(relPaths, workspace);
                if(focusedRelativePath) {
                    copy(focusedRelativePath);
                }
            }
        }
    });

    context.subscriptions.push(copyRelPathFocus);
}

export function deactivate() {
}