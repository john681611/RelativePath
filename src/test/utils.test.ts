import * as assert from 'assert';
import * as utils from './../utils';

suite("Utils", () => {
  suite("sharedStart", () => {

    test("should find common start", () => {
      assert.equal(utils.sharedStart(['bob123', 'bob1234567']), 'bob123');
    });

    test("should return blank if non duplicate", () => {
      assert.equal(utils.sharedStart(['bob123', '4567']), '');
    });
  });
  
  suite("removeInPathAndSplit", () => {
    test("should remove based on regex and split by /", () => {
      assert.deepEqual(utils.removeInPathAndSplit('bob123/bbb/ccc',new RegExp('bob123')), ['bbb', 'ccc']);
    });
  });

  suite('removeFileExtentions', () => {
    test('should remove file extentions from string path', () => {
      assert.equal(utils.removeFileExtentions('bob1234/kev/file.css'),'bob1234/kev/file');
    });

    test('should remove file extentions from string path if . is used within the file name', () => {
      assert.equal(utils.removeFileExtentions('bob1234/kev/file.test.css'),'bob1234/kev/file.test');
    });

    test('should remove file extentions from string path if . is used within the folder names', () => {
      assert.equal(utils.removeFileExtentions('bob1234/kev.larry/file.test.css'),'bob1234/kev.larry/file.test');
    });
  });

});