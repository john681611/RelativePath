import * as assert from 'assert';
import * as relativePaths from './../relativePaths';
import * as vscode from 'vscode';

suite("RelativePaths", () => {
  const files = [
    vscode.Uri.file(`${process.cwd()}/RelativePath/src/test/mock/next.ts`),
    vscode.Uri.file(`${process.cwd()}/RelativePath/src/test/mock/nest/nest.ts`),
    vscode.Uri.file(`${process.cwd()}/RelativePath/src/commands.js`)
  ];

  const relPaths =  [
    '/test/mock/next.ts',
    '/test/mock/nest/nest.ts',
    '/commands.js'
  ];

  const workspace = vscode.workspace.getWorkspaceFolder(files[0]);
  if(!workspace){
    console.error('workspace fail');
    return;
  }

  suite("getRelPaths", () => {

    test("should get basic relative path to workspace", () => {
      assert.deepEqual(relativePaths.getRelPaths(files, workspace),relPaths);
    });
  });
  
  suite("getFocusedRelativePaths", () => {
    test("should remove based on regex and split by /", () => {
      assert.deepEqual(relativePaths.getFocusedRelativePaths(relPaths, workspace),
      [
        './next.ts',
        './nest/nest.ts',
        '../../commands.js'
      ]);
    });
  });

});