import { __commonJS } from './chunk-HKJ2B2AA.js';

// node_modules/dayjs/locale/en.js
var require_en = __commonJS({
  'node_modules/dayjs/locale/en.js'(exports, module) {
    !(function (e, n) {
      'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = n())
        : 'function' == typeof define && define.amd
          ? define(n)
          : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).dayjs_locale_en = n());
    })(exports, function () {
      'use strict';
      return {
        name: 'en',
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        ordinal: function (e) {
          var n = ['th', 'st', 'nd', 'rd'],
            t = e % 100;
          return '[' + e + (n[(t - 20) % 10] || n[t] || n[0]) + ']';
        },
      };
    });
  },
});
export default require_en();
//# sourceMappingURL=dayjs_locale_en.js.map
