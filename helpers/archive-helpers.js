var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var Promise = require('bluebird')
var readFileAsync = Promise.promisify(fs.readFile);
var writeFileAsync = Promise.promisify(fs.writeFile);

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  return readFileAsync(this.paths.list)
    .then(body => callback(body.toString().split('\n')))
    .catch((error) => console.log('encountered error with readFile', error));
};

exports.isUrlInList = function(url, callback) {

  return readFileAsync(this.paths.list)
    .then(body => {
      let bodyArray = body.toString().split('\n');
      let isInPromise =  new Promise((resolve, reject) => {
        if (bodyArray.indexOf(url) !== 1) {
          resolve(true);
        } else {
          reject(false);
        }

      });
      return isInPromise
        .then((result) => callback(true))
        .catch((error) => callback(false))

    });


};

exports.addUrlToList = function(url, callback) {
  let urlList = [];
  this.readListOfUrls((readList) => {urlList = readList})
    .then( list => {
      // console.log('URL List', urlList);
      return callback(urlList.push(url));
    })
    .catch((error) => {console.log('Error addURL')})
};

exports.isUrlArchived = function(url, callback) {
  let desiredSite = this.paths.archivedSites+'/'+url+'';
  return readFileAsync(desiredSite)
    .then( body => {
      callback(true);
      return true;
    })
    .catch( error => {
      callback(false);
      return false;
    })
};

exports.downloadUrls = function(urls) {
  for (var url of urls){
    let desiredPath = this.paths.archivedSites+'/'+url;
    writeFileAsync(desiredPath, 'Hello');
  }
};
