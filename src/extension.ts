// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import copypaste = require('copy-paste');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "relativepath" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.copyRelPath', (res, files) => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the use
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
        // let relPath = '';
        // files.array.forEach(element => {
        //     relPath += element.path.replace(regex,'') + '\n';
        // });
        // copypaste.copy(relPath, res => {
        //     if(res != null) {
        //         // something went wrong...
        //         vscode.window.showErrorMessage('Could not copy: '+res);
        //     }
        // });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}