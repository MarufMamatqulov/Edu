import { __commonJS } from './chunk-HKJ2B2AA.js';

// node_modules/@fortawesome/free-solid-svg-icons/faFloppyDisk.js
var require_faFloppyDisk = __commonJS({
  'node_modules/@fortawesome/free-solid-svg-icons/faFloppyDisk.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fas';
    var iconName = 'floppy-disk';
    var width = 448;
    var height = 512;
    var aliases = [128190, 128426, 'save'];
    var unicode = 'f0c7';
    var svgPathData =
      'M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z';
    exports.definition = {
      prefix,
      iconName,
      icon: [width, height, aliases, unicode, svgPathData],
    };
    exports.faFloppyDisk = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = aliases;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    exports.aliases = aliases;
  },
});

// node_modules/@fortawesome/free-solid-svg-icons/faSave.js
var require_faSave = __commonJS({
  'node_modules/@fortawesome/free-solid-svg-icons/faSave.js'(exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var source = require_faFloppyDisk();
    exports.definition = {
      prefix: source.prefix,
      iconName: source.iconName,
      icon: [source.width, source.height, source.aliases, source.unicode, source.svgPathData],
    };
    exports.faSave = exports.definition;
    exports.prefix = source.prefix;
    exports.iconName = source.iconName;
    exports.width = source.width;
    exports.height = source.height;
    exports.ligatures = source.aliases;
    exports.unicode = source.unicode;
    exports.svgPathData = source.svgPathData;
    exports.aliases = source.aliases;
  },
});
export default require_faSave();
//# sourceMappingURL=@fortawesome_free-solid-svg-icons_faSave.js.map
