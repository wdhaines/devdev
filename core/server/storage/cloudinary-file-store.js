// # Cloudinary File System Image Storage module
// The module for storing images using Cloudinary

var express   = require('express'),
    fs        = require('fs-extra'),
    path      = require('path'),
    util      = require('util'),
    Promise   = require('bluebird'),
    errors    = require('../errors'),
    config    = require('../config'),
    utils     = require('../utils'),
    baseStore = require('./base'),
    cloudinary = require('cloudinary').v2;

function CloudinaryFileStore() {
}
util.inherits(CloudinaryFileStore, baseStore);

// ### Save
// Saves the image to Cloudinary
// - image is the express image object
// - returns a promise which ultimately returns the full url to the uploaded image
CloudinaryFileStore.prototype.save = function (image, targetDir) {
    return cloudinary.uploader.upload(image.path, { public_id: image.name }).then(function (result) {
      return result.url;
    }).catch(function (e) {
      errors.logError(e);
      return Promise.reject(e);
    });
};

module.exports = CloudinaryFileStore;
