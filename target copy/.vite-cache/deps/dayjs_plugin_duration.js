import { __commonJS } from './chunk-HKJ2B2AA.js';

// node_modules/dayjs/plugin/duration.js
var require_duration = __commonJS({
  'node_modules/dayjs/plugin/duration.js'(exports, module) {
    !(function (t, s) {
      'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = s())
        : 'function' == typeof define && define.amd
          ? define(s)
          : ((t = 'undefined' != typeof globalThis ? globalThis : t || self).dayjs_plugin_duration = s());
    })(exports, function () {
      'use strict';
      var t,
        s,
        n = 1e3,
        i = 6e4,
        e = 36e5,
        r = 864e5,
        o = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
        u = 31536e6,
        d = 2628e6,
        a =
          /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,
        h = { years: u, months: d, days: r, hours: e, minutes: i, seconds: n, milliseconds: 1, weeks: 6048e5 },
        c = function (t2) {
          return t2 instanceof g;
        },
        f = function (t2, s2, n2) {
          return new g(t2, n2, s2.$l);
        },
        m = function (t2) {
          return s.p(t2) + 's';
        },
        l = function (t2) {
          return t2 < 0;
        },
        $ = function (t2) {
          return l(t2) ? Math.ceil(t2) : Math.floor(t2);
        },
        y = function (t2) {
          return Math.abs(t2);
        },
        v = function (t2, s2) {
          return t2
            ? l(t2)
              ? { negative: true, format: '' + y(t2) + s2 }
              : { negative: false, format: '' + t2 + s2 }
            : { negative: false, format: '' };
        },
        g = (function () {
          function l2(t2, s2, n2) {
            var i2 = this;
            if (((this.$d = {}), (this.$l = n2), void 0 === t2 && ((this.$ms = 0), this.parseFromMilliseconds()), s2))
              return f(t2 * h[m(s2)], this);
            if ('number' == typeof t2) return (this.$ms = t2), this.parseFromMilliseconds(), this;
            if ('object' == typeof t2)
              return (
                Object.keys(t2).forEach(function (s3) {
                  i2.$d[m(s3)] = t2[s3];
                }),
                this.calMilliseconds(),
                this
              );
            if ('string' == typeof t2) {
              var e2 = t2.match(a);
              if (e2) {
                var r2 = e2.slice(2).map(function (t3) {
                  return null != t3 ? Number(t3) : 0;
                });
                return (
                  (this.$d.years = r2[0]),
                  (this.$d.months = r2[1]),
                  (this.$d.weeks = r2[2]),
                  (this.$d.days = r2[3]),
                  (this.$d.hours = r2[4]),
                  (this.$d.minutes = r2[5]),
                  (this.$d.seconds = r2[6]),
                  this.calMilliseconds(),
                  this
                );
              }
            }
            return this;
          }
          var y2 = l2.prototype;
          return (
            (y2.calMilliseconds = function () {
              var t2 = this;
              this.$ms = Object.keys(this.$d).reduce(function (s2, n2) {
                return s2 + (t2.$d[n2] || 0) * h[n2];
              }, 0);
            }),
            (y2.parseFromMilliseconds = function () {
              var t2 = this.$ms;
              (this.$d.years = $(t2 / u)),
                (t2 %= u),
                (this.$d.months = $(t2 / d)),
                (t2 %= d),
                (this.$d.days = $(t2 / r)),
                (t2 %= r),
                (this.$d.hours = $(t2 / e)),
                (t2 %= e),
                (this.$d.minutes = $(t2 / i)),
                (t2 %= i),
                (this.$d.seconds = $(t2 / n)),
                (t2 %= n),
                (this.$d.milliseconds = t2);
            }),
            (y2.toISOString = function () {
              var t2 = v(this.$d.years, 'Y'),
                s2 = v(this.$d.months, 'M'),
                n2 = +this.$d.days || 0;
              this.$d.weeks && (n2 += 7 * this.$d.weeks);
              var i2 = v(n2, 'D'),
                e2 = v(this.$d.hours, 'H'),
                r2 = v(this.$d.minutes, 'M'),
                o2 = this.$d.seconds || 0;
              this.$d.milliseconds && ((o2 += this.$d.milliseconds / 1e3), (o2 = Math.round(1e3 * o2) / 1e3));
              var u2 = v(o2, 'S'),
                d2 = t2.negative || s2.negative || i2.negative || e2.negative || r2.negative || u2.negative,
                a2 = e2.format || r2.format || u2.format ? 'T' : '',
                h2 = (d2 ? '-' : '') + 'P' + t2.format + s2.format + i2.format + a2 + e2.format + r2.format + u2.format;
              return 'P' === h2 || '-P' === h2 ? 'P0D' : h2;
            }),
            (y2.toJSON = function () {
              return this.toISOString();
            }),
            (y2.format = function (t2) {
              var n2 = t2 || 'YYYY-MM-DDTHH:mm:ss',
                i2 = {
                  Y: this.$d.years,
                  YY: s.s(this.$d.years, 2, '0'),
                  YYYY: s.s(this.$d.years, 4, '0'),
                  M: this.$d.months,
                  MM: s.s(this.$d.months, 2, '0'),
                  D: this.$d.days,
                  DD: s.s(this.$d.days, 2, '0'),
                  H: this.$d.hours,
                  HH: s.s(this.$d.hours, 2, '0'),
                  m: this.$d.minutes,
                  mm: s.s(this.$d.minutes, 2, '0'),
                  s: this.$d.seconds,
                  ss: s.s(this.$d.seconds, 2, '0'),
                  SSS: s.s(this.$d.milliseconds, 3, '0'),
                };
              return n2.replace(o, function (t3, s2) {
                return s2 || String(i2[t3]);
              });
            }),
            (y2.as = function (t2) {
              return this.$ms / h[m(t2)];
            }),
            (y2.get = function (t2) {
              var s2 = this.$ms,
                n2 = m(t2);
              return 'milliseconds' === n2 ? (s2 %= 1e3) : (s2 = 'weeks' === n2 ? $(s2 / h[n2]) : this.$d[n2]), s2 || 0;
            }),
            (y2.add = function (t2, s2, n2) {
              var i2;
              return (i2 = s2 ? t2 * h[m(s2)] : c(t2) ? t2.$ms : f(t2, this).$ms), f(this.$ms + i2 * (n2 ? -1 : 1), this);
            }),
            (y2.subtract = function (t2, s2) {
              return this.add(t2, s2, true);
            }),
            (y2.locale = function (t2) {
              var s2 = this.clone();
              return (s2.$l = t2), s2;
            }),
            (y2.clone = function () {
              return f(this.$ms, this);
            }),
            (y2.humanize = function (s2) {
              return t().add(this.$ms, 'ms').locale(this.$l).fromNow(!s2);
            }),
            (y2.valueOf = function () {
              return this.asMilliseconds();
            }),
            (y2.milliseconds = function () {
              return this.get('milliseconds');
            }),
            (y2.asMilliseconds = function () {
              return this.as('milliseconds');
            }),
            (y2.seconds = function () {
              return this.get('seconds');
            }),
            (y2.asSeconds = function () {
              return this.as('seconds');
            }),
            (y2.minutes = function () {
              return this.get('minutes');
            }),
            (y2.asMinutes = function () {
              return this.as('minutes');
            }),
            (y2.hours = function () {
              return this.get('hours');
            }),
            (y2.asHours = function () {
              return this.as('hours');
            }),
            (y2.days = function () {
              return this.get('days');
            }),
            (y2.asDays = function () {
              return this.as('days');
            }),
            (y2.weeks = function () {
              return this.get('weeks');
            }),
            (y2.asWeeks = function () {
              return this.as('weeks');
            }),
            (y2.months = function () {
              return this.get('months');
            }),
            (y2.asMonths = function () {
              return this.as('months');
            }),
            (y2.years = function () {
              return this.get('years');
            }),
            (y2.asYears = function () {
              return this.as('years');
            }),
            l2
          );
        })(),
        p = function (t2, s2, n2) {
          return t2
            .add(s2.years() * n2, 'y')
            .add(s2.months() * n2, 'M')
            .add(s2.days() * n2, 'd')
            .add(s2.hours() * n2, 'h')
            .add(s2.minutes() * n2, 'm')
            .add(s2.seconds() * n2, 's')
            .add(s2.milliseconds() * n2, 'ms');
        };
      return function (n2, i2, e2) {
        (t = e2),
          (s = e2().$utils()),
          (e2.duration = function (t2, s2) {
            var n3 = e2.locale();
            return f(t2, { $l: n3 }, s2);
          }),
          (e2.isDuration = c);
        var r2 = i2.prototype.add,
          o2 = i2.prototype.subtract;
        (i2.prototype.add = function (t2, s2) {
          return c(t2) ? p(this, t2, 1) : r2.bind(this)(t2, s2);
        }),
          (i2.prototype.subtract = function (t2, s2) {
            return c(t2) ? p(this, t2, -1) : o2.bind(this)(t2, s2);
          });
      };
    });
  },
});
export default require_duration();
//# sourceMappingURL=dayjs_plugin_duration.js.map
