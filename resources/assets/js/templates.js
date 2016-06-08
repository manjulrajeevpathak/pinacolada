var _ = require("lodash");
var Twig = require("twig");

var FocussedImage = require("quintype-js").FocussedImage;

global.transformTemplates = function(x) {
  return _.extend(x, {
    id: x.id.replace(/resources\/views\//, "").replace(/.twig/, ''),
    path: x.path.replace(/resources\/views\//, "").replace(/.twig/, '')
  })
}

var TEMPLATES = {
  "home_body": require("../../../resources/views/home/body.twig"),
  "home_story": require("../../../resources/views/home/story.twig")
};

Twig.extendFunction("focusedImageUrl", function(slug, aspectRatio, metadata, options) {
  var cdn = global.qtConfig["image-cdn"];
  var image = new FocussedImage(slug, metadata);
  return cdn + "/" + slug + image.path(aspectRatio, options);
});

module.exports = window.ooga = TEMPLATES;