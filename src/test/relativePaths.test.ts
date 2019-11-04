import * as assert from 'assert';
import * as relativePaths from './../relativePaths';
import * as vscode from 'vscode';
// import * as sinon from 'sinon';

suite("RelativePaths", () => {

  const root = __dirname.replace('/out/test', '');
  const files = [
    vscode.Uri.file(`${root}/src/test/mock/mock.ts`),
    vscode.Uri.file(`${root}/src/test/mock/next.ts`),
    vscode.Uri.file(`${root}/src/test/mock/nest/nest.ts`),
    vscode.Uri.file(`${root}/src/commands.js`)
  ];

  const relPaths =  [
    '/test/mock/mock',
    '/test/mock/next',
    '/test/mock/nest/nest',
    '/commands'
  ];

  const relPathsWExtension =  [
    '/test/mock/mock.ts',
    '/test/mock/next.ts',
    '/test/mock/nest/nest.ts',
    '/commands.js'
  ];

  const workspaceFolder = vscode.workspace.getWorkspaceFolder(files[0]);
  if(!workspaceFolder){
    console.error('workspace fail');
    return;
  }

  const WorkspaceFolderPath = workspaceFolder.uri.path;

  suite("getRelPaths", () => {

    test("should get basic relative path to workspace", () => {
      assert.deepEqual(relativePaths.getRelPaths(files, WorkspaceFolderPath),relPaths);
    });
  });
  
  suite("getFocusedRelativePaths", () => {
    test("should remove based on regex and split by /", () => {
      assert.deepEqual(relativePaths.getFocusedRelativePaths(relPaths, WorkspaceFolderPath),
      [
        './mock',
        './next',
        './nest/nest',
        '../../commands'
      ]);
    });

    test("should remove based on regex and split by / and not bothered by extensions", () => {
      assert.deepEqual(relativePaths.getFocusedRelativePaths(relPathsWExtension, WorkspaceFolderPath),
      [
        './mock.ts',
        './next.ts',
        './nest/nest.ts',
        '../../commands.js'
      ]);
    });
  });
});