import * as vscode from 'vscode';
import copypaste = require('copy-paste');


export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.copyRelPath', (res, files) => {
        if(files.length){
            const workspace = vscode.workspace.getWorkspaceFolder(files[0]);
            if(workspace){
                const regex = new RegExp(workspace.uri.path,'g');
                const lineDelimiter = '\n';
                const relPath =files.map((element: vscode.Uri) => element.path.replace(regex,'')).join(lineDelimiter);
                console.log(relPath);
                copypaste.copy(relPath, res => {
                if(res !== null) {
                        vscode.window.showErrorMessage('Could not copy: '+res);
                    }
                });
            }else{
                vscode.window.showErrorMessage('Cant find workspace: '+res);
            }
        } else {
            vscode.window.showErrorMessage('Could not copy: '+res);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}