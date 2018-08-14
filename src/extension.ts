import * as vscode from 'vscode';
import * as commands from './commands';

export function activate(context: vscode.ExtensionContext) {
    let copyRelPathFocus = vscode.commands.registerCommand('extension.copyRelPathFoc', commands.copyRelPathFoc);

    context.subscriptions.push(copyRelPathFocus);
}

export function deactivate() {
}