var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var Promise = require('bluebird');
var readFileAsync = Promise.promisify(fs.readFile);
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET' && req.url === '/') {
    console.log(process.cwd())
    readFileAsync('./web/public/index.html')
      .then(body => res.end(body))
      .catch(err => console.log(err))
  } else if (req.method === 'GET') {
      console.log('Request URL',req.url);
      let bool;
      console.log(archive.isUrlArchived(req.url, (value) =>{bool = value}).then(value => value).catch(error => error));
      console.log('boolean',bool);
      res.writeHead(404);
      res.end('Page not found, sorry mate.');
  }
  // else {
  //   res.writeHead(404);
  //   res.end('Page not found, sorry mate.');
  // }

  //
  // else if(req.method === 'GET' && archive.isUrlArchived(req.url, () => {}).then(val => val)) {
  //   readFileAsync(archive.paths.archivedSites+req.url)
  //     .then(body => res.end(body))
  // }

};
