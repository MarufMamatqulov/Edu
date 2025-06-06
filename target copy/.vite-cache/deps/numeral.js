import { __commonJS } from './chunk-HKJ2B2AA.js';

// node_modules/numeral/numeral.js
var require_numeral = __commonJS({
  'node_modules/numeral/numeral.js'(exports, module) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(factory);
      } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
      } else {
        global.numeral = factory();
      }
    })(exports, function () {
      var numeral,
        _,
        VERSION = '2.0.6',
        formats = {},
        locales = {},
        defaults = {
          currentLocale: 'en',
          zeroFormat: null,
          nullFormat: null,
          defaultFormat: '0,0',
          scalePercentBy100: true,
        },
        options = {
          currentLocale: defaults.currentLocale,
          zeroFormat: defaults.zeroFormat,
          nullFormat: defaults.nullFormat,
          defaultFormat: defaults.defaultFormat,
          scalePercentBy100: defaults.scalePercentBy100,
        };
      function Numeral(input, number) {
        this._input = input;
        this._value = number;
      }
      numeral = function (input) {
        var value, kind, unformatFunction, regexp;
        if (numeral.isNumeral(input)) {
          value = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
          value = 0;
        } else if (input === null || _.isNaN(input)) {
          value = null;
        } else if (typeof input === 'string') {
          if (options.zeroFormat && input === options.zeroFormat) {
            value = 0;
          } else if ((options.nullFormat && input === options.nullFormat) || !input.replace(/[^0-9]+/g, '').length) {
            value = null;
          } else {
            for (kind in formats) {
              regexp =
                typeof formats[kind].regexps.unformat === 'function' ? formats[kind].regexps.unformat() : formats[kind].regexps.unformat;
              if (regexp && input.match(regexp)) {
                unformatFunction = formats[kind].unformat;
                break;
              }
            }
            unformatFunction = unformatFunction || numeral._.stringToNumber;
            value = unformatFunction(input);
          }
        } else {
          value = Number(input) || null;
        }
        return new Numeral(input, value);
      };
      numeral.version = VERSION;
      numeral.isNumeral = function (obj) {
        return obj instanceof Numeral;
      };
      numeral._ = _ = {
        // formats numbers separators, decimals places, signs, abbreviations
        numberToFormat: function (value, format, roundingFunction) {
          var locale = locales[numeral.options.currentLocale],
            negP = false,
            optDec = false,
            leadingCount = 0,
            abbr = '',
            trillion = 1e12,
            billion = 1e9,
            million = 1e6,
            thousand = 1e3,
            decimal = '',
            neg = false,
            abbrForce,
            abs,
            min,
            max,
            power,
            int,
            precision,
            signed,
            thousands,
            output;
          value = value || 0;
          abs = Math.abs(value);
          if (numeral._.includes(format, '(')) {
            negP = true;
            format = format.replace(/[\(|\)]/g, '');
          } else if (numeral._.includes(format, '+') || numeral._.includes(format, '-')) {
            signed = numeral._.includes(format, '+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1;
            format = format.replace(/[\+|\-]/g, '');
          }
          if (numeral._.includes(format, 'a')) {
            abbrForce = format.match(/a(k|m|b|t)?/);
            abbrForce = abbrForce ? abbrForce[1] : false;
            if (numeral._.includes(format, ' a')) {
              abbr = ' ';
            }
            format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');
            if ((abs >= trillion && !abbrForce) || abbrForce === 't') {
              abbr += locale.abbreviations.trillion;
              value = value / trillion;
            } else if ((abs < trillion && abs >= billion && !abbrForce) || abbrForce === 'b') {
              abbr += locale.abbreviations.billion;
              value = value / billion;
            } else if ((abs < billion && abs >= million && !abbrForce) || abbrForce === 'm') {
              abbr += locale.abbreviations.million;
              value = value / million;
            } else if ((abs < million && abs >= thousand && !abbrForce) || abbrForce === 'k') {
              abbr += locale.abbreviations.thousand;
              value = value / thousand;
            }
          }
          if (numeral._.includes(format, '[.]')) {
            optDec = true;
            format = format.replace('[.]', '.');
          }
          int = value.toString().split('.')[0];
          precision = format.split('.')[1];
          thousands = format.indexOf(',');
          leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length;
          if (precision) {
            if (numeral._.includes(precision, '[')) {
              precision = precision.replace(']', '');
              precision = precision.split('[');
              decimal = numeral._.toFixed(value, precision[0].length + precision[1].length, roundingFunction, precision[1].length);
            } else {
              decimal = numeral._.toFixed(value, precision.length, roundingFunction);
            }
            int = decimal.split('.')[0];
            if (numeral._.includes(decimal, '.')) {
              decimal = locale.delimiters.decimal + decimal.split('.')[1];
            } else {
              decimal = '';
            }
            if (optDec && Number(decimal.slice(1)) === 0) {
              decimal = '';
            }
          } else {
            int = numeral._.toFixed(value, 0, roundingFunction);
          }
          if (abbr && !abbrForce && Number(int) >= 1e3 && abbr !== locale.abbreviations.trillion) {
            int = String(Number(int) / 1e3);
            switch (abbr) {
              case locale.abbreviations.thousand:
                abbr = locale.abbreviations.million;
                break;
              case locale.abbreviations.million:
                abbr = locale.abbreviations.billion;
                break;
              case locale.abbreviations.billion:
                abbr = locale.abbreviations.trillion;
                break;
            }
          }
          if (numeral._.includes(int, '-')) {
            int = int.slice(1);
            neg = true;
          }
          if (int.length < leadingCount) {
            for (var i = leadingCount - int.length; i > 0; i--) {
              int = '0' + int;
            }
          }
          if (thousands > -1) {
            int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locale.delimiters.thousands);
          }
          if (format.indexOf('.') === 0) {
            int = '';
          }
          output = int + decimal + (abbr ? abbr : '');
          if (negP) {
            output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '');
          } else {
            if (signed >= 0) {
              output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+');
            } else if (neg) {
              output = '-' + output;
            }
          }
          return output;
        },
        // unformats numbers separators, decimals places, signs, abbreviations
        stringToNumber: function (string) {
          var locale = locales[options.currentLocale],
            stringOriginal = string,
            abbreviations = {
              thousand: 3,
              million: 6,
              billion: 9,
              trillion: 12,
            },
            abbreviation,
            value,
            i,
            regexp;
          if (options.zeroFormat && string === options.zeroFormat) {
            value = 0;
          } else if ((options.nullFormat && string === options.nullFormat) || !string.replace(/[^0-9]+/g, '').length) {
            value = null;
          } else {
            value = 1;
            if (locale.delimiters.decimal !== '.') {
              string = string.replace(/\./g, '').replace(locale.delimiters.decimal, '.');
            }
            for (abbreviation in abbreviations) {
              regexp = new RegExp(
                '[^a-zA-Z]' + locale.abbreviations[abbreviation] + '(?:\\)|(\\' + locale.currency.symbol + ')?(?:\\))?)?$',
              );
              if (stringOriginal.match(regexp)) {
                value *= Math.pow(10, abbreviations[abbreviation]);
                break;
              }
            }
            value *= (string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1;
            string = string.replace(/[^0-9\.]+/g, '');
            value *= Number(string);
          }
          return value;
        },
        isNaN: function (value) {
          return typeof value === 'number' && isNaN(value);
        },
        includes: function (string, search) {
          return string.indexOf(search) !== -1;
        },
        insert: function (string, subString, start) {
          return string.slice(0, start) + subString + string.slice(start);
        },
        reduce: function (array, callback) {
          if (this === null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
          }
          if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
          }
          var t = Object(array),
            len = t.length >>> 0,
            k = 0,
            value;
          if (arguments.length === 3) {
            value = arguments[2];
          } else {
            while (k < len && !(k in t)) {
              k++;
            }
            if (k >= len) {
              throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
          }
          for (; k < len; k++) {
            if (k in t) {
              value = callback(value, t[k], k, t);
            }
          }
          return value;
        },
        /**
         * Computes the multiplier necessary to make x >= 1,
         * effectively eliminating miscalculations caused by
         * finite precision.
         */
        multiplier: function (x) {
          var parts = x.toString().split('.');
          return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
        },
        /**
         * Given a variable number of arguments, returns the maximum
         * multiplier that must be used to normalize an operation involving
         * all of them.
         */
        correctionFactor: function () {
          var args = Array.prototype.slice.call(arguments);
          return args.reduce(function (accum, next) {
            var mn = _.multiplier(next);
            return accum > mn ? accum : mn;
          }, 1);
        },
        /**
         * Implementation of toFixed() that treats floats more like decimals
         *
         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
         * problems for accounting- and finance-related software.
         */
        toFixed: function (value, maxDecimals, roundingFunction, optionals) {
          var splitValue = value.toString().split('.'),
            minDecimals = maxDecimals - (optionals || 0),
            boundedPrecision,
            optionalsRegExp,
            power,
            output;
          if (splitValue.length === 2) {
            boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
          } else {
            boundedPrecision = minDecimals;
          }
          power = Math.pow(10, boundedPrecision);
          output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision);
          if (optionals > maxDecimals - boundedPrecision) {
            optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
            output = output.replace(optionalsRegExp, '');
          }
          return output;
        },
      };
      numeral.options = options;
      numeral.formats = formats;
      numeral.locales = locales;
      numeral.locale = function (key) {
        if (key) {
          options.currentLocale = key.toLowerCase();
        }
        return options.currentLocale;
      };
      numeral.localeData = function (key) {
        if (!key) {
          return locales[options.currentLocale];
        }
        key = key.toLowerCase();
        if (!locales[key]) {
          throw new Error('Unknown locale : ' + key);
        }
        return locales[key];
      };
      numeral.reset = function () {
        for (var property in defaults) {
          options[property] = defaults[property];
        }
      };
      numeral.zeroFormat = function (format) {
        options.zeroFormat = typeof format === 'string' ? format : null;
      };
      numeral.nullFormat = function (format) {
        options.nullFormat = typeof format === 'string' ? format : null;
      };
      numeral.defaultFormat = function (format) {
        options.defaultFormat = typeof format === 'string' ? format : '0.0';
      };
      numeral.register = function (type, name, format) {
        name = name.toLowerCase();
        if (this[type + 's'][name]) {
          throw new TypeError(name + ' ' + type + ' already registered.');
        }
        this[type + 's'][name] = format;
        return format;
      };
      numeral.validate = function (val, culture) {
        var _decimalSep, _thousandSep, _currSymbol, _valArray, _abbrObj, _thousandRegEx, localeData, temp;
        if (typeof val !== 'string') {
          val += '';
          if (console.warn) {
            console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
          }
        }
        val = val.trim();
        if (!!val.match(/^\d+$/)) {
          return true;
        }
        if (val === '') {
          return false;
        }
        try {
          localeData = numeral.localeData(culture);
        } catch (e) {
          localeData = numeral.localeData(numeral.locale());
        }
        _currSymbol = localeData.currency.symbol;
        _abbrObj = localeData.abbreviations;
        _decimalSep = localeData.delimiters.decimal;
        if (localeData.delimiters.thousands === '.') {
          _thousandSep = '\\.';
        } else {
          _thousandSep = localeData.delimiters.thousands;
        }
        temp = val.match(/^[^\d]+/);
        if (temp !== null) {
          val = val.substr(1);
          if (temp[0] !== _currSymbol) {
            return false;
          }
        }
        temp = val.match(/[^\d]+$/);
        if (temp !== null) {
          val = val.slice(0, -1);
          if (
            temp[0] !== _abbrObj.thousand &&
            temp[0] !== _abbrObj.million &&
            temp[0] !== _abbrObj.billion &&
            temp[0] !== _abbrObj.trillion
          ) {
            return false;
          }
        }
        _thousandRegEx = new RegExp(_thousandSep + '{2}');
        if (!val.match(/[^\d.,]/g)) {
          _valArray = val.split(_decimalSep);
          if (_valArray.length > 2) {
            return false;
          } else {
            if (_valArray.length < 2) {
              return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx);
            } else {
              if (_valArray[0].length === 1) {
                return !!_valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
              } else {
                return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
              }
            }
          }
        }
        return false;
      };
      numeral.fn = Numeral.prototype = {
        clone: function () {
          return numeral(this);
        },
        format: function (inputString, roundingFunction) {
          var value = this._value,
            format = inputString || options.defaultFormat,
            kind,
            output,
            formatFunction;
          roundingFunction = roundingFunction || Math.round;
          if (value === 0 && options.zeroFormat !== null) {
            output = options.zeroFormat;
          } else if (value === null && options.nullFormat !== null) {
            output = options.nullFormat;
          } else {
            for (kind in formats) {
              if (format.match(formats[kind].regexps.format)) {
                formatFunction = formats[kind].format;
                break;
              }
            }
            formatFunction = formatFunction || numeral._.numberToFormat;
            output = formatFunction(value, format, roundingFunction);
          }
          return output;
        },
        value: function () {
          return this._value;
        },
        input: function () {
          return this._input;
        },
        set: function (value) {
          this._value = Number(value);
          return this;
        },
        add: function (value) {
          var corrFactor = _.correctionFactor.call(null, this._value, value);
          function cback(accum, curr, currI, O) {
            return accum + Math.round(corrFactor * curr);
          }
          this._value = _.reduce([this._value, value], cback, 0) / corrFactor;
          return this;
        },
        subtract: function (value) {
          var corrFactor = _.correctionFactor.call(null, this._value, value);
          function cback(accum, curr, currI, O) {
            return accum - Math.round(corrFactor * curr);
          }
          this._value = _.reduce([value], cback, Math.round(this._value * corrFactor)) / corrFactor;
          return this;
        },
        multiply: function (value) {
          function cback(accum, curr, currI, O) {
            var corrFactor = _.correctionFactor(accum, curr);
            return (Math.round(accum * corrFactor) * Math.round(curr * corrFactor)) / Math.round(corrFactor * corrFactor);
          }
          this._value = _.reduce([this._value, value], cback, 1);
          return this;
        },
        divide: function (value) {
          function cback(accum, curr, currI, O) {
            var corrFactor = _.correctionFactor(accum, curr);
            return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
          }
          this._value = _.reduce([this._value, value], cback);
          return this;
        },
        difference: function (value) {
          return Math.abs(numeral(this._value).subtract(value).value());
        },
      };
      numeral.register('locale', 'en', {
        delimiters: {
          thousands: ',',
          decimal: '.',
        },
        abbreviations: {
          thousand: 'k',
          million: 'm',
          billion: 'b',
          trillion: 't',
        },
        ordinal: function (number) {
          var b = number % 10;
          return ~~((number % 100) / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
        },
        currency: {
          symbol: '$',
        },
      });
      (function () {
        numeral.register('format', 'bps', {
          regexps: {
            format: /(BPS)/,
            unformat: /(BPS)/,
          },
          format: function (value, format, roundingFunction) {
            var space = numeral._.includes(format, ' BPS') ? ' ' : '',
              output;
            value = value * 1e4;
            format = format.replace(/\s?BPS/, '');
            output = numeral._.numberToFormat(value, format, roundingFunction);
            if (numeral._.includes(output, ')')) {
              output = output.split('');
              output.splice(-1, 0, space + 'BPS');
              output = output.join('');
            } else {
              output = output + space + 'BPS';
            }
            return output;
          },
          unformat: function (string) {
            return +(numeral._.stringToNumber(string) * 1e-4).toFixed(15);
          },
        });
      })();
      (function () {
        var decimal = {
            base: 1e3,
            suffixes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          },
          binary = {
            base: 1024,
            suffixes: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
          };
        var allSuffixes = decimal.suffixes.concat(
          binary.suffixes.filter(function (item) {
            return decimal.suffixes.indexOf(item) < 0;
          }),
        );
        var unformatRegex = allSuffixes.join('|');
        unformatRegex = '(' + unformatRegex.replace('B', 'B(?!PS)') + ')';
        numeral.register('format', 'bytes', {
          regexps: {
            format: /([0\s]i?b)/,
            unformat: new RegExp(unformatRegex),
          },
          format: function (value, format, roundingFunction) {
            var output,
              bytes = numeral._.includes(format, 'ib') ? binary : decimal,
              suffix = numeral._.includes(format, ' b') || numeral._.includes(format, ' ib') ? ' ' : '',
              power,
              min,
              max;
            format = format.replace(/\s?i?b/, '');
            for (power = 0; power <= bytes.suffixes.length; power++) {
              min = Math.pow(bytes.base, power);
              max = Math.pow(bytes.base, power + 1);
              if (value === null || value === 0 || (value >= min && value < max)) {
                suffix += bytes.suffixes[power];
                if (min > 0) {
                  value = value / min;
                }
                break;
              }
            }
            output = numeral._.numberToFormat(value, format, roundingFunction);
            return output + suffix;
          },
          unformat: function (string) {
            var value = numeral._.stringToNumber(string),
              power,
              bytesMultiplier;
            if (value) {
              for (power = decimal.suffixes.length - 1; power >= 0; power--) {
                if (numeral._.includes(string, decimal.suffixes[power])) {
                  bytesMultiplier = Math.pow(decimal.base, power);
                  break;
                }
                if (numeral._.includes(string, binary.suffixes[power])) {
                  bytesMultiplier = Math.pow(binary.base, power);
                  break;
                }
              }
              value *= bytesMultiplier || 1;
            }
            return value;
          },
        });
      })();
      (function () {
        numeral.register('format', 'currency', {
          regexps: {
            format: /(\$)/,
          },
          format: function (value, format, roundingFunction) {
            var locale = numeral.locales[numeral.options.currentLocale],
              symbols = {
                before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
                after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0],
              },
              output,
              symbol,
              i;
            format = format.replace(/\s?\$\s?/, '');
            output = numeral._.numberToFormat(value, format, roundingFunction);
            if (value >= 0) {
              symbols.before = symbols.before.replace(/[\-\(]/, '');
              symbols.after = symbols.after.replace(/[\-\)]/, '');
            } else if (value < 0 && !numeral._.includes(symbols.before, '-') && !numeral._.includes(symbols.before, '(')) {
              symbols.before = '-' + symbols.before;
            }
            for (i = 0; i < symbols.before.length; i++) {
              symbol = symbols.before[i];
              switch (symbol) {
                case '$':
                  output = numeral._.insert(output, locale.currency.symbol, i);
                  break;
                case ' ':
                  output = numeral._.insert(output, ' ', i + locale.currency.symbol.length - 1);
                  break;
              }
            }
            for (i = symbols.after.length - 1; i >= 0; i--) {
              symbol = symbols.after[i];
              switch (symbol) {
                case '$':
                  output =
                    i === symbols.after.length - 1
                      ? output + locale.currency.symbol
                      : numeral._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
                  break;
                case ' ':
                  output =
                    i === symbols.after.length - 1
                      ? output + ' '
                      : numeral._.insert(output, ' ', -(symbols.after.length - (1 + i) + locale.currency.symbol.length - 1));
                  break;
              }
            }
            return output;
          },
        });
      })();
      (function () {
        numeral.register('format', 'exponential', {
          regexps: {
            format: /(e\+|e-)/,
            unformat: /(e\+|e-)/,
          },
          format: function (value, format, roundingFunction) {
            var output,
              exponential = typeof value === 'number' && !numeral._.isNaN(value) ? value.toExponential() : '0e+0',
              parts = exponential.split('e');
            format = format.replace(/e[\+|\-]{1}0/, '');
            output = numeral._.numberToFormat(Number(parts[0]), format, roundingFunction);
            return output + 'e' + parts[1];
          },
          unformat: function (string) {
            var parts = numeral._.includes(string, 'e+') ? string.split('e+') : string.split('e-'),
              value = Number(parts[0]),
              power = Number(parts[1]);
            power = numeral._.includes(string, 'e-') ? (power *= -1) : power;
            function cback(accum, curr, currI, O) {
              var corrFactor = numeral._.correctionFactor(accum, curr),
                num = (accum * corrFactor * (curr * corrFactor)) / (corrFactor * corrFactor);
              return num;
            }
            return numeral._.reduce([value, Math.pow(10, power)], cback, 1);
          },
        });
      })();
      (function () {
        numeral.register('format', 'ordinal', {
          regexps: {
            format: /(o)/,
          },
          format: function (value, format, roundingFunction) {
            var locale = numeral.locales[numeral.options.currentLocale],
              output,
              ordinal = numeral._.includes(format, ' o') ? ' ' : '';
            format = format.replace(/\s?o/, '');
            ordinal += locale.ordinal(value);
            output = numeral._.numberToFormat(value, format, roundingFunction);
            return output + ordinal;
          },
        });
      })();
      (function () {
        numeral.register('format', 'percentage', {
          regexps: {
            format: /(%)/,
            unformat: /(%)/,
          },
          format: function (value, format, roundingFunction) {
            var space = numeral._.includes(format, ' %') ? ' ' : '',
              output;
            if (numeral.options.scalePercentBy100) {
              value = value * 100;
            }
            format = format.replace(/\s?\%/, '');
            output = numeral._.numberToFormat(value, format, roundingFunction);
            if (numeral._.includes(output, ')')) {
              output = output.split('');
              output.splice(-1, 0, space + '%');
              output = output.join('');
            } else {
              output = output + space + '%';
            }
            return output;
          },
          unformat: function (string) {
            var number = numeral._.stringToNumber(string);
            if (numeral.options.scalePercentBy100) {
              return number * 0.01;
            }
            return number;
          },
        });
      })();
      (function () {
        numeral.register('format', 'time', {
          regexps: {
            format: /(:)/,
            unformat: /(:)/,
          },
          format: function (value, format, roundingFunction) {
            var hours = Math.floor(value / 60 / 60),
              minutes = Math.floor((value - hours * 60 * 60) / 60),
              seconds = Math.round(value - hours * 60 * 60 - minutes * 60);
            return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
          },
          unformat: function (string) {
            var timeArray = string.split(':'),
              seconds = 0;
            if (timeArray.length === 3) {
              seconds = seconds + Number(timeArray[0]) * 60 * 60;
              seconds = seconds + Number(timeArray[1]) * 60;
              seconds = seconds + Number(timeArray[2]);
            } else if (timeArray.length === 2) {
              seconds = seconds + Number(timeArray[0]) * 60;
              seconds = seconds + Number(timeArray[1]);
            }
            return Number(seconds);
          },
        });
      })();
      return numeral;
    });
  },
});
export default require_numeral();
/*! Bundled license information:

numeral/numeral.js:
  (*! @preserve
   * numeral.js
   * version : 2.0.6
   * author : Adam Draper
   * license : MIT
   * http://adamwdraper.github.com/Numeral-js/
   *)
*/
//# sourceMappingURL=numeral.js.map
