(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  function getAugmentedNamespace(n) {
    if (n.__esModule) return n;
    var f = n.default;
  	if (typeof f == "function") {
  		var a = function a () {
  			if (this instanceof a) {
          return Reflect.construct(f, arguments, this.constructor);
  			}
  			return f.apply(this, arguments);
  		};
  		a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  var styledComponents_browser_cjs = {};

  var reactIs$2 = {exports: {}};

  var reactIs_development$1 = {};

  /**
   * @license React
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    (function() {

  // ATTENTION
  // When adding new symbols to this file,
  // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
  // The Symbol used to tag the ReactElement-like types.
  var REACT_ELEMENT_TYPE = Symbol.for('react.element');
  var REACT_PORTAL_TYPE = Symbol.for('react.portal');
  var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
  var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
  var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
  var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
  var REACT_CONTEXT_TYPE = Symbol.for('react.context');
  var REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
  var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
  var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
  var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
  var REACT_MEMO_TYPE = Symbol.for('react.memo');
  var REACT_LAZY_TYPE = Symbol.for('react.lazy');
  var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');

  // -----------------------------------------------------------------------------

  var enableScopeAPI = false; // Experimental Create Event Handle API.
  var enableCacheElement = false;
  var enableTransitionTracing = false; // No known bugs, but needs performance testing

  var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
  // stuff. Intended to enable React core members to more easily debug scheduling
  // issues in DEV builds.

  var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

  var REACT_MODULE_REFERENCE;

  {
    REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
  }

  function isValidElementType(type) {
    if (typeof type === 'string' || typeof type === 'function') {
      return true;
    } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


    if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
      return true;
    }

    if (typeof type === 'object' && type !== null) {
      if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
        return true;
      }
    }

    return false;
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
            case REACT_SUSPENSE_LIST_TYPE:
              return type;

            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_SERVER_CONTEXT_TYPE:
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;

                default:
                  return $$typeof;
              }

          }

        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  }
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;
  var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
  var hasWarnedAboutDeprecatedIsAsyncMode = false;
  var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
      }
    }

    return false;
  }
  function isConcurrentMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
        hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
      }
    }

    return false;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }
  function isSuspenseList(object) {
    return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
  }

  reactIs_development$1.ContextConsumer = ContextConsumer;
  reactIs_development$1.ContextProvider = ContextProvider;
  reactIs_development$1.Element = Element;
  reactIs_development$1.ForwardRef = ForwardRef;
  reactIs_development$1.Fragment = Fragment;
  reactIs_development$1.Lazy = Lazy;
  reactIs_development$1.Memo = Memo;
  reactIs_development$1.Portal = Portal;
  reactIs_development$1.Profiler = Profiler;
  reactIs_development$1.StrictMode = StrictMode;
  reactIs_development$1.Suspense = Suspense;
  reactIs_development$1.SuspenseList = SuspenseList;
  reactIs_development$1.isAsyncMode = isAsyncMode;
  reactIs_development$1.isConcurrentMode = isConcurrentMode;
  reactIs_development$1.isContextConsumer = isContextConsumer;
  reactIs_development$1.isContextProvider = isContextProvider;
  reactIs_development$1.isElement = isElement;
  reactIs_development$1.isForwardRef = isForwardRef;
  reactIs_development$1.isFragment = isFragment;
  reactIs_development$1.isLazy = isLazy;
  reactIs_development$1.isMemo = isMemo;
  reactIs_development$1.isPortal = isPortal;
  reactIs_development$1.isProfiler = isProfiler;
  reactIs_development$1.isStrictMode = isStrictMode;
  reactIs_development$1.isSuspense = isSuspense;
  reactIs_development$1.isSuspenseList = isSuspenseList;
  reactIs_development$1.isValidElementType = isValidElementType;
  reactIs_development$1.typeOf = typeOf;
    })();
  }

  {
    reactIs$2.exports = reactIs_development$1;
  }

  var reactIsExports$1 = reactIs$2.exports;

  //

  var shallowequal = function shallowEqual(objA, objB, compare, compareContext) {
    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (ret !== void 0) {
      return !!ret;
    }

    if (objA === objB) {
      return true;
    }

    if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

    // Test for A's keys different from B.
    for (var idx = 0; idx < keysA.length; idx++) {
      var key = keysA[idx];

      if (!bHasOwnProperty(key)) {
        return false;
      }

      var valueA = objA[key];
      var valueB = objB[key];

      ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

      if (ret === false || (ret === void 0 && valueA !== valueB)) {
        return false;
      }
    }

    return true;
  };

  var stylis_browser_cjs = {};

  Object.defineProperty(stylis_browser_cjs, '__esModule', { value: true });

  function stylis_min (W) {
    function M(d, c, e, h, a) {
      for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
        g = e.charCodeAt(l);
        l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

        if (0 === b + n + v + m) {
          if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
            switch (g) {
              case 32:
              case 9:
              case 59:
              case 13:
              case 10:
                break;

              default:
                f += e.charAt(l);
            }

            g = 59;
          }

          switch (g) {
            case 123:
              f = f.trim();
              q = f.charCodeAt(0);
              k = 1;

              for (t = ++l; l < B;) {
                switch (g = e.charCodeAt(l)) {
                  case 123:
                    k++;
                    break;

                  case 125:
                    k--;
                    break;

                  case 47:
                    switch (g = e.charCodeAt(l + 1)) {
                      case 42:
                      case 47:
                        a: {
                          for (u = l + 1; u < J; ++u) {
                            switch (e.charCodeAt(u)) {
                              case 47:
                                if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                  l = u + 1;
                                  break a;
                                }

                                break;

                              case 10:
                                if (47 === g) {
                                  l = u + 1;
                                  break a;
                                }

                            }
                          }

                          l = u;
                        }

                    }

                    break;

                  case 91:
                    g++;

                  case 40:
                    g++;

                  case 34:
                  case 39:
                    for (; l++ < J && e.charCodeAt(l) !== g;) {
                    }

                }

                if (0 === k) break;
                l++;
              }

              k = e.substring(t, l);
              0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

              switch (q) {
                case 64:
                  0 < r && (f = f.replace(N, ''));
                  g = f.charCodeAt(1);

                  switch (g) {
                    case 100:
                    case 109:
                    case 115:
                    case 45:
                      r = c;
                      break;

                    default:
                      r = O;
                  }

                  k = M(c, r, k, g, a + 1);
                  t = k.length;
                  0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                  if (0 < t) switch (g) {
                    case 115:
                      f = f.replace(da, ea);

                    case 100:
                    case 109:
                    case 45:
                      k = f + '{' + k + '}';
                      break;

                    case 107:
                      f = f.replace(fa, '$1 $2');
                      k = f + '{' + k + '}';
                      k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                      break;

                    default:
                      k = f + k, 112 === h && (k = (p += k, ''));
                  } else k = '';
                  break;

                default:
                  k = M(c, X(c, f, I), k, h, a + 1);
              }

              F += k;
              k = I = r = u = q = 0;
              f = '';
              g = e.charCodeAt(++l);
              break;

            case 125:
            case 59:
              f = (0 < r ? f.replace(N, '') : f).trim();
              if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
                case 0:
                  break;

                case 64:
                  if (105 === g || 99 === g) {
                    G += f + e.charAt(l);
                    break;
                  }

                default:
                  58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
              }
              I = r = u = q = 0;
              f = '';
              g = e.charCodeAt(++l);
          }
        }

        switch (g) {
          case 13:
          case 10:
            47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
            0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
            z = 1;
            D++;
            break;

          case 59:
          case 125:
            if (0 === b + n + v + m) {
              z++;
              break;
            }

          default:
            z++;
            y = e.charAt(l);

            switch (g) {
              case 9:
              case 32:
                if (0 === n + m + b) switch (x) {
                  case 44:
                  case 58:
                  case 9:
                  case 32:
                    y = '';
                    break;

                  default:
                    32 !== g && (y = ' ');
                }
                break;

              case 0:
                y = '\\0';
                break;

              case 12:
                y = '\\f';
                break;

              case 11:
                y = '\\v';
                break;

              case 38:
                0 === n + b + m && (r = I = 1, y = '\f' + y);
                break;

              case 108:
                if (0 === n + b + m + E && 0 < u) switch (l - u) {
                  case 2:
                    112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                  case 8:
                    111 === K && (E = K);
                }
                break;

              case 58:
                0 === n + b + m && (u = l);
                break;

              case 44:
                0 === b + v + n + m && (r = 1, y += '\r');
                break;

              case 34:
              case 39:
                0 === b && (n = n === g ? 0 : 0 === n ? g : n);
                break;

              case 91:
                0 === n + b + v && m++;
                break;

              case 93:
                0 === n + b + v && m--;
                break;

              case 41:
                0 === n + b + m && v--;
                break;

              case 40:
                if (0 === n + b + m) {
                  if (0 === q) switch (2 * x + 3 * K) {
                    case 533:
                      break;

                    default:
                      q = 1;
                  }
                  v++;
                }

                break;

              case 64:
                0 === b + v + n + m + u + k && (k = 1);
                break;

              case 42:
              case 47:
                if (!(0 < n + m + v)) switch (b) {
                  case 0:
                    switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                      case 235:
                        b = 47;
                        break;

                      case 220:
                        t = l, b = 42;
                    }

                    break;

                  case 42:
                    47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
                }
            }

            0 === b && (f += y);
        }

        K = x;
        x = g;
        l++;
      }

      t = p.length;

      if (0 < t) {
        r = c;
        if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
        p = r.join(',') + '{' + p + '}';

        if (0 !== w * E) {
          2 !== w || L(p, 2) || (E = 0);

          switch (E) {
            case 111:
              p = p.replace(ha, ':-moz-$1') + p;
              break;

            case 112:
              p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
          }

          E = 0;
        }
      }

      return G + p + F;
    }

    function X(d, c, e) {
      var h = c.trim().split(ia);
      c = h;
      var a = h.length,
          m = d.length;

      switch (m) {
        case 0:
        case 1:
          var b = 0;

          for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
            c[b] = Z(d, c[b], e).trim();
          }

          break;

        default:
          var v = b = 0;

          for (c = []; b < a; ++b) {
            for (var n = 0; n < m; ++n) {
              c[v++] = Z(d[n] + ' ', h[b], e).trim();
            }
          }

      }

      return c;
    }

    function Z(d, c, e) {
      var h = c.charCodeAt(0);
      33 > h && (h = (c = c.trim()).charCodeAt(0));

      switch (h) {
        case 38:
          return c.replace(F, '$1' + d.trim());

        case 58:
          return d.trim() + c.replace(F, '$1' + d.trim());

        default:
          if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
      }

      return d + c;
    }

    function P(d, c, e, h) {
      var a = d + ';',
          m = 2 * c + 3 * e + 4 * h;

      if (944 === m) {
        d = a.indexOf(':', 9) + 1;
        var b = a.substring(d, a.length - 1).trim();
        b = a.substring(0, d).trim() + b + ';';
        return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
      }

      if (0 === w || 2 === w && !L(a, 1)) return a;

      switch (m) {
        case 1015:
          return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

        case 951:
          return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

        case 963:
          return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

        case 1009:
          if (100 !== a.charCodeAt(4)) break;

        case 969:
        case 942:
          return '-webkit-' + a + a;

        case 978:
          return '-webkit-' + a + '-moz-' + a + a;

        case 1019:
        case 983:
          return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

        case 883:
          if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
          if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
          break;

        case 932:
          if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
            case 103:
              return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

            case 115:
              return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

            case 98:
              return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
          }
          return '-webkit-' + a + '-ms-' + a + a;

        case 964:
          return '-webkit-' + a + '-ms-flex-' + a + a;

        case 1023:
          if (99 !== a.charCodeAt(8)) break;
          b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
          return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

        case 1005:
          return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

        case 1e3:
          b = a.substring(13).trim();
          c = b.indexOf('-') + 1;

          switch (b.charCodeAt(0) + b.charCodeAt(c)) {
            case 226:
              b = a.replace(G, 'tb');
              break;

            case 232:
              b = a.replace(G, 'tb-rl');
              break;

            case 220:
              b = a.replace(G, 'lr');
              break;

            default:
              return a;
          }

          return '-webkit-' + a + '-ms-' + b + a;

        case 1017:
          if (-1 === a.indexOf('sticky', 9)) break;

        case 975:
          c = (a = d).length - 10;
          b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

          switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
            case 203:
              if (111 > b.charCodeAt(8)) break;

            case 115:
              a = a.replace(b, '-webkit-' + b) + ';' + a;
              break;

            case 207:
            case 102:
              a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
          }

          return a + ';';

        case 938:
          if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
            case 105:
              return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

            case 115:
              return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

            default:
              return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
          }
          break;

        case 973:
        case 989:
          if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

        case 931:
        case 953:
          if (true === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
          break;

        case 962:
          if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
      }

      return a;
    }

    function L(d, c) {
      var e = d.indexOf(1 === c ? ':' : '{'),
          h = d.substring(0, 3 !== c ? e : 10);
      e = d.substring(e + 1, d.length - 1);
      return R(2 !== c ? h : h.replace(na, '$1'), e, c);
    }

    function ea(d, c) {
      var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
      return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
    }

    function H(d, c, e, h, a, m, b, v, n, q) {
      for (var g = 0, x = c, w; g < A; ++g) {
        switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
          case void 0:
          case false:
          case true:
          case null:
            break;

          default:
            x = w;
        }
      }

      if (x !== c) return x;
    }

    function T(d) {
      switch (d) {
        case void 0:
        case null:
          A = S.length = 0;
          break;

        default:
          if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
            T(d[c]);
          } else Y = !!d | 0;
      }

      return T;
    }

    function U(d) {
      d = d.prefix;
      void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
      return U;
    }

    function B(d, c) {
      var e = d;
      33 > e.charCodeAt(0) && (e = e.trim());
      V = e;
      e = [V];

      if (0 < A) {
        var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
        void 0 !== h && 'string' === typeof h && (c = h);
      }

      var a = M(O, e, c, 0, 0);
      0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
      V = '';
      E = 0;
      z = D = 1;
      return a;
    }

    var ca = /^\0+/g,
        N = /[\0\r\f]/g,
        aa = /: */g,
        ka = /zoo|gra/,
        ma = /([,: ])(transform)/g,
        ia = /,\r+?/g,
        F = /([\t\r\n ])*\f?&/g,
        fa = /@(k\w+)\s*(\S*)\s*/,
        Q = /::(place)/g,
        ha = /:(read-only)/g,
        G = /[svh]\w+-[tblr]{2}/,
        da = /\(\s*(.*)\s*\)/g,
        oa = /([\s\S]*?);/g,
        ba = /-self|flex-/g,
        na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
        la = /stretch|:\s*\w+\-(?:conte|avail)/,
        ja = /([^-])(image-set\()/,
        z = 1,
        D = 1,
        E = 0,
        w = 1,
        O = [],
        S = [],
        A = 0,
        R = null,
        Y = 0,
        V = '';
    B.use = T;
    B.set = U;
    void 0 !== W && U(W);
    return B;
  }

  stylis_browser_cjs.default = stylis_min;

  var unitless_browser_cjs = {};

  Object.defineProperty(unitless_browser_cjs, '__esModule', { value: true });

  var unitlessKeys = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };

  unitless_browser_cjs.default = unitlessKeys;

  function memoize(fn) {
    var cache = Object.create(null);
    return function (arg) {
      if (cache[arg] === undefined) cache[arg] = fn(arg);
      return cache[arg];
    };
  }

  // eslint-disable-next-line no-undef
  var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

  var isPropValid = /* #__PURE__ */memoize(function (prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
    /* o */
    && prop.charCodeAt(1) === 110
    /* n */
    && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
  );

  var emotionIsPropValid_esm = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: isPropValid
  });

  var require$$5 = /*@__PURE__*/getAugmentedNamespace(emotionIsPropValid_esm);

  var reactIs$1 = {exports: {}};

  var reactIs_development = {};

  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */



  {
    (function() {

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  // (unstable) APIs that have been removed. Can we remove the symbols?

  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;

            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;

                default:
                  return $$typeof;
              }

          }

        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  } // AsyncMode is deprecated along with isAsyncMode

  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;
  var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
      }
    }

    return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }

  reactIs_development.AsyncMode = AsyncMode;
  reactIs_development.ConcurrentMode = ConcurrentMode;
  reactIs_development.ContextConsumer = ContextConsumer;
  reactIs_development.ContextProvider = ContextProvider;
  reactIs_development.Element = Element;
  reactIs_development.ForwardRef = ForwardRef;
  reactIs_development.Fragment = Fragment;
  reactIs_development.Lazy = Lazy;
  reactIs_development.Memo = Memo;
  reactIs_development.Portal = Portal;
  reactIs_development.Profiler = Profiler;
  reactIs_development.StrictMode = StrictMode;
  reactIs_development.Suspense = Suspense;
  reactIs_development.isAsyncMode = isAsyncMode;
  reactIs_development.isConcurrentMode = isConcurrentMode;
  reactIs_development.isContextConsumer = isContextConsumer;
  reactIs_development.isContextProvider = isContextProvider;
  reactIs_development.isElement = isElement;
  reactIs_development.isForwardRef = isForwardRef;
  reactIs_development.isFragment = isFragment;
  reactIs_development.isLazy = isLazy;
  reactIs_development.isMemo = isMemo;
  reactIs_development.isPortal = isPortal;
  reactIs_development.isProfiler = isProfiler;
  reactIs_development.isStrictMode = isStrictMode;
  reactIs_development.isSuspense = isSuspense;
  reactIs_development.isValidElementType = isValidElementType;
  reactIs_development.typeOf = typeOf;
    })();
  }

  {
    reactIs$1.exports = reactIs_development;
  }

  var reactIsExports = reactIs$1.exports;

  var reactIs = reactIsExports;

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */
  var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };
  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };
  var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

  function getStatics(component) {
    // React v16.11 and below
    if (reactIs.isMemo(component)) {
      return MEMO_STATICS;
    } // React v16.12 and above


    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
  }

  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
      // don't hoist over string (html) components
      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);

        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
        }
      }

      var keys = getOwnPropertyNames(sourceComponent);

      if (getOwnPropertySymbols) {
        keys = keys.concat(getOwnPropertySymbols(sourceComponent));
      }

      var targetStatics = getStatics(targetComponent);
      var sourceStatics = getStatics(sourceComponent);

      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];

        if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

          try {
            // Avoid failures from read-only properties
            defineProperty(targetComponent, key, descriptor);
          } catch (e) {}
        }
      }
    }

    return targetComponent;
  }

  var hoistNonReactStatics_cjs = hoistNonReactStatics;

  var _default;
  function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(styledComponents_browser_cjs,"__esModule",{value:true});var t=reactIsExports$1,n=React__default.default,r=e(n),o=e(shallowequal),s=e(stylis_browser_cjs),i=e(unitless_browser_cjs),a=e(require$$5),c=e(hoistNonReactStatics_cjs);function u(){return (u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}return e}).apply(this,arguments)}var l=function(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n},d=function(e){return null!==e&&"object"==typeof e&&"[object Object]"===(e.toString?e.toString():Object.prototype.toString.call(e))&&!t.typeOf(e)},h=Object.freeze([]),p=Object.freeze({});function f(e){return "function"==typeof e}function m(e){return "string"==typeof e&&e||e.displayName||e.name||"Component"}function y(e){return e&&"string"==typeof e.styledComponentId}var v="undefined"!=typeof process&&void 0!==process.env&&(AdminJS.env.REACT_APP_SC_ATTR||AdminJS.env.SC_ATTR)||"data-styled",g="undefined"!=typeof window&&"HTMLElement"in window,S=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&(void 0!==AdminJS.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==AdminJS.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==AdminJS.env.REACT_APP_SC_DISABLE_SPEEDY&&AdminJS.env.REACT_APP_SC_DISABLE_SPEEDY:void 0!==AdminJS.env.SC_DISABLE_SPEEDY&&""!==AdminJS.env.SC_DISABLE_SPEEDY?"false"!==AdminJS.env.SC_DISABLE_SPEEDY&&AdminJS.env.SC_DISABLE_SPEEDY:"production"!=="development")),w={},E={1:"Cannot create styled-component for component: %s.\n\n",2:"Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",3:"Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",4:"The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",5:"The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",6:"Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",7:'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',8:'ThemeProvider: Please make your "theme" prop an object.\n\n',9:"Missing document `<head>`\n\n",10:"Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",11:"_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",12:"It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",13:"%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",14:'ThemeProvider: "theme" prop is required.\n\n',15:"A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",16:"Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",17:"CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n"};function b(){for(var e=arguments.length<=0?void 0:arguments[0],t=[],n=1,r=arguments.length;n<r;n+=1)t.push(n<0||arguments.length<=n?void 0:arguments[n]);return t.forEach((function(t){e=e.replace(/%[a-z]/,t);})),e}function _(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw new Error(b.apply(void 0,[E[e]].concat(n)).trim())}var N=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e;}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)(o<<=1)<0&&_(16,""+e);this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var s=r;s<o;s++)this.groupSizes[s]=0;}for(var i=this.indexOfGroup(e+1),a=0,c=t.length;a<c;a++)this.tag.insertRule(i,t[a])&&(this.groupSizes[e]++,i++);},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n);}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,s=r;s<o;s++)t+=this.tag.getRule(s)+"/*!sc*/\n";return t},e}(),C=new Map,A=new Map,I=1,P=function(e){if(C.has(e))return C.get(e);for(;A.has(I);)I++;var t=I++;return ((0|t)<0||t>1<<30)&&_(16,""+t),C.set(e,t),A.set(t,e),t},O=function(e){return A.get(e)},x=function(e,t){t>=I&&(I=t+1),C.set(e,t),A.set(t,e);},R="style["+v+'][data-styled-version="5.3.9"]',D=new RegExp("^"+v+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),T=function(e,t,n){for(var r,o=n.split(","),s=0,i=o.length;s<i;s++)(r=o[s])&&e.registerName(t,r);},j=function(e,t){for(var n=(t.textContent||"").split("/*!sc*/\n"),r=[],o=0,s=n.length;o<s;o++){var i=n[o].trim();if(i){var a=i.match(D);if(a){var c=0|parseInt(a[1],10),u=a[2];0!==c&&(x(u,c),T(e,u,a[3]),e.getTag().insertRules(c,r)),r.length=0;}else r.push(i);}}},k=function(){return "undefined"!=typeof __webpack_nonce__?__webpack_nonce__:null},V=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(v))return r}}(n),s=void 0!==o?o.nextSibling:null;r.setAttribute(v,"active"),r.setAttribute("data-styled-version","5.3.9");var i=k();return i&&r.setAttribute("nonce",i),n.insertBefore(r,s),r},M=function(){function e(e){var t=this.element=V(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}_(17);}(t),this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return  false}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--;},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),B=function(){function e(e){var t=this.element=V(e);this.nodes=t.childNodes,this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,true}return  false},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--;},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),z=function(){function e(e){this.rules=[],this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,true)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--;},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),q=g,G={isServer:!g,useCSSOMInjection:!S},L=function(){function e(e,t,n){ void 0===e&&(e=p),void 0===t&&(t={}),this.options=u({},G,{},e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&g&&q&&(q=false,function(e){for(var t=document.querySelectorAll(R),n=0,r=t.length;n<r;n++){var o=t[n];o&&"active"!==o.getAttribute(v)&&(j(e,o),o.parentNode&&o.parentNode.removeChild(o));}}(this));}e.registerId=function(e){return P(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=true),new e(u({},this.options,{},t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,o=t.target,e=n?new z(o):r?new M(o):new B(o),new N(e)));var e,t,n,r,o;},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(P(e),this.names.has(e))this.names.get(e).add(t);else {var n=new Set;n.add(t),this.names.set(e,n);}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(P(e),n);},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear();},t.clearRules=function(e){this.getTag().clearGroup(P(e)),this.clearNames(e);},t.clearTag=function(){this.tag=void 0;},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=0;o<n;o++){var s=O(o);if(void 0!==s){var i=e.names.get(s),a=t.getGroup(o);if(i&&a&&i.size){var c=v+".g"+o+'[id="'+s+'"]',u="";void 0!==i&&i.forEach((function(e){e.length>0&&(u+=e+",");})),r+=""+a+c+'{content:"'+u+'"}/*!sc*/\n';}}}return r}(this)},e}(),F=/(a)(d)/gi,Y=function(e){return String.fromCharCode(e+(e>25?39:97))};function H(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Y(t%52)+n;return (Y(t%52)+n).replace(F,"$1-$2")}var $=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},W=function(e){return $(5381,e)};function U(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(f(n)&&!y(n))return  false}return  true}var J=W("5.3.9"),X=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic="production"==="development",this.componentId=t,this.baseHash=$(J,t),this.baseStyle=n,L.registerId(t);}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,o=[];if(this.baseStyle&&o.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))o.push(this.staticRulesId);else {var s=me(this.rules,e,t,n).join(""),i=H($(this.baseHash,s)>>>0);if(!t.hasNameForId(r,i)){var a=n(s,"."+i,void 0,r);t.insertRules(r,i,a);}o.push(i),this.staticRulesId=i;}else {for(var c=this.rules.length,u=$(this.baseHash,n.hash),l="",d=0;d<c;d++){var h=this.rules[d];if("string"==typeof h)l+=h,(u=$(u,h+d));else if(h){var p=me(h,e,t,n),f=Array.isArray(p)?p.join(""):p;u=$(u,f+d),l+=f;}}if(l){var m=H(u>>>0);if(!t.hasNameForId(r,m)){var y=n(l,"."+m,void 0,r);t.insertRules(r,m,y);}o.push(m);}}return o.join(" ")},e}(),Z=/^\s*\/\/.*$/gm,K=[":","[",".","#"];function Q(e){var t,n,r,o,i=void 0===e?p:e,a=i.options,c=void 0===a?p:a,u=i.plugins,l=void 0===u?h:u,d=new s(c),f=[],m=function(e){function t(t){if(t)try{e(t+"}");}catch(e){}}return function(n,r,o,s,i,a,c,u,l,d){switch(n){case 1:if(0===l&&64===r.charCodeAt(0))return e(r+";"),"";break;case 2:if(0===u)return r+"/*|*/";break;case 3:switch(u){case 102:case 112:return e(o[0]+r),"";default:return r+(0===d?"/*|*/":"")}case  -2:r.split("/*|*/}").forEach(t);}}}((function(e){f.push(e);})),y=function(e,r,s){return 0===r&&-1!==K.indexOf(s[n.length])||s.match(o)?e:"."+t};function v(e,s,i,a){ void 0===a&&(a="&");var c=e.replace(Z,""),u=s&&i?i+" "+s+" { "+c+" }":c;return t=a,n=s,r=new RegExp("\\"+n+"\\b","g"),o=new RegExp("(\\"+n+"\\b){2,}"),d(i||!s?"":s,u)}return d.use([].concat(l,[function(e,t,o){2===e&&o.length&&o[0].lastIndexOf(n)>0&&(o[0]=o[0].replace(r,y));},m,function(e){if(-2===e){var t=f;return f=[],t}}])),v.hash=l.length?l.reduce((function(e,t){return t.name||_(15),$(e,t.name)}),5381).toString():"",v}var ee=r.createContext(),te=ee.Consumer,ne=r.createContext(),re=(ne.Consumer,new L),oe=Q();function se(){return n.useContext(ee)||re}function ie(){return n.useContext(ne)||oe}function ae(e){var t=n.useState(e.stylisPlugins),s=t[0],i=t[1],a=se(),c=n.useMemo((function(){var t=a;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},false)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:false})),t}),[e.disableCSSOMInjection,e.sheet,e.target]),u=n.useMemo((function(){return Q({options:{prefix:!e.disableVendorPrefixes},plugins:s})}),[e.disableVendorPrefixes,s]);return n.useEffect((function(){o(s,e.stylisPlugins)||i(e.stylisPlugins);}),[e.stylisPlugins]),r.createElement(ee.Provider,{value:c},r.createElement(ne.Provider,{value:u},r.Children.only(e.children)))}var ce=function(){function e(e,t){var n=this;this.inject=function(e,t){ void 0===t&&(t=oe);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"));},this.toString=function(){return _(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t;}return e.prototype.getName=function(e){return void 0===e&&(e=oe),this.name+e.hash},e}(),ue=/([A-Z])/,le=/([A-Z])/g,de=/^ms-/,he=function(e){return "-"+e.toLowerCase()};function pe(e){return ue.test(e)?e.replace(le,he).replace(de,"-ms-"):e}var fe=function(e){return null==e||false===e||""===e};function me(e,n,r,o){if(Array.isArray(e)){for(var s,a=[],c=0,u=e.length;c<u;c+=1)""!==(s=me(e[c],n,r,o))&&(Array.isArray(s)?a.push.apply(a,s):a.push(s));return a}if(fe(e))return "";if(y(e))return "."+e.styledComponentId;if(f(e)){if("function"!=typeof(h=e)||h.prototype&&h.prototype.isReactComponent||!n)return e;var l=e(n);return t.isElement(l)&&console.warn(m(e)+" is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details."),me(l,n,r,o)}var h;return e instanceof ce?r?(e.inject(r,o),e.getName(o)):e:d(e)?function e(t,n){var r,o,s=[];for(var a in t)t.hasOwnProperty(a)&&!fe(t[a])&&(Array.isArray(t[a])&&t[a].isCss||f(t[a])?s.push(pe(a)+":",t[a],";"):d(t[a])?s.push.apply(s,e(t[a],a)):s.push(pe(a)+": "+(r=a,null==(o=t[a])||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||r in i?String(o).trim():o+"px")+";"));return n?[n+" {"].concat(s,["}"]):s}(e):e.toString()}var ye=function(e){return Array.isArray(e)&&(e.isCss=true),e};function ve(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return f(e)||d(e)?ye(me(l(h,[e].concat(n)))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:ye(me(l(e,n)))}var ge=/invalid hook call/i,Se=new Set,we=function(e,t){{var r="The component "+e+(t?' with the id of "'+t+'"':"")+" has been created dynamically.\nYou may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.",o=console.error;try{var s=!0;console.error=function(e){if(ge.test(e))s=!1,Se.delete(r);else {for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];o.apply(void 0,[e].concat(n));}},n.useRef(),s&&!Se.has(r)&&(console.warn(r),Se.add(r));}catch(e){ge.test(e.message)&&Se.delete(r);}finally{console.error=o;}}},Ee=function(e,t,n){return void 0===n&&(n=p),e.theme!==n.theme&&e.theme||t||n.theme},be=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,_e=/(^-|-$)/g;function Ne(e){return e.replace(be,"-").replace(_e,"")}var Ce=function(e){return H(W(e)>>>0)};function Ae(e){return "string"==typeof e&&(e.charAt(0)===e.charAt(0).toLowerCase())}var Ie=function(e){return "function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},Pe=function(e){return "__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function Oe(e,t,n){var r=e[n];Ie(t)&&Ie(r)?xe(r,t):e[n]=t;}function xe(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var o=0,s=n;o<s.length;o++){var i=s[o];if(Ie(i))for(var a in i)Pe(a)&&Oe(e,i[a],a);}return e}var Re=r.createContext(),De=Re.Consumer,Te={};function je(e,t,o){var s=y(e),i=!Ae(e),l=t.attrs,d=void 0===l?h:l,v=t.componentId,g=void 0===v?function(e,t){var n="string"!=typeof e?"sc":Ne(e);Te[n]=(Te[n]||0)+1;var r=n+"-"+Ce("5.3.9"+n+Te[n]);return t?t+"-"+r:r}(t.displayName,t.parentComponentId):v,S=t.displayName,w=void 0===S?function(e){return Ae(e)?"styled."+e:"Styled("+m(e)+")"}(e):S,E=t.displayName&&t.componentId?Ne(t.displayName)+"-"+t.componentId:t.componentId||g,b=s&&e.attrs?Array.prototype.concat(e.attrs,d).filter(Boolean):d,_=t.shouldForwardProp;s&&e.shouldForwardProp&&(_=t.shouldForwardProp?function(n,r,o){return e.shouldForwardProp(n,r,o)&&t.shouldForwardProp(n,r,o)}:e.shouldForwardProp);var N,C=new X(o,E,s?e.componentStyle:void 0),A=C.isStatic&&0===d.length,I=function(e,t){return function(e,t,r,o){var s=e.attrs,i=e.componentStyle,c=e.defaultProps,l=e.foldedComponentIds,d=e.shouldForwardProp,h=e.styledComponentId,m=e.target;n.useDebugValue(h);var y=function(e,t,n){ void 0===e&&(e=p);var r=u({},t,{theme:e}),o={};return n.forEach((function(e){var t,n,s,i=e;for(t in f(i)&&(i=i(r)),i)r[t]=o[t]="className"===t?(n=o[t],s=i[t],n&&s?n+" "+s:n||s):i[t];})),[r,o]}(Ee(t,n.useContext(Re),c)||p,t,s),v=y[0],g=y[1],S=function(e,t,r,o){var s=se(),i=ie(),a=t?e.generateAndInjectStyles(p,s,i):e.generateAndInjectStyles(r,s,i);return n.useDebugValue(a),!t&&o&&o(a),a}(i,o,v,e.warnTooManyClasses),w=r,E=g.$as||t.$as||g.as||t.as||m,b=Ae(E),_=g!==t?u({},t,{},g):t,N={};for(var C in _)"$"!==C[0]&&"as"!==C&&("forwardedAs"===C?N.as=_[C]:(d?d(C,a,E):!b||a(C))&&(N[C]=_[C]));return t.style&&g.style!==t.style&&(N.style=u({},t.style,{},g.style)),N.className=Array.prototype.concat(l,h,S!==h?S:null,t.className,g.className).filter(Boolean).join(" "),N.ref=w,n.createElement(E,N)}(N,e,t,A)};return I.displayName=w,(N=r.forwardRef(I)).attrs=b,N.componentStyle=C,N.displayName=w,N.shouldForwardProp=_,N.foldedComponentIds=s?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):h,N.styledComponentId=E,N.target=s?e.target:e,N.withComponent=function(e){var n=t.componentId,r=function(e,t){if(null==e)return {};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["componentId"]),s=n&&n+"-"+(Ae(e)?e:Ne(m(e)));return je(e,u({},r,{attrs:b,componentId:s}),o)},Object.defineProperty(N,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(t){this._foldedDefaultProps=s?xe({},e.defaultProps,t):t;}}),(we(w,E),N.warnTooManyClasses=function(e,t){var n={},r=false;return function(o){if(!r&&(n[o]=true,Object.keys(n).length>=200)){var s=t?' with the id of "'+t+'"':"";console.warn("Over 200 classes were generated for component "+e+s+".\nConsider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"),r=true,n={};}}}(w,E)),Object.defineProperty(N,"toString",{value:function(){return "."+N.styledComponentId}}),i&&c(N,e,{attrs:true,componentStyle:true,displayName:true,foldedComponentIds:true,shouldForwardProp:true,styledComponentId:true,target:true,withComponent:true}),N}var ke=function(e){return function e(n,r,o){if(void 0===o&&(o=p),!t.isValidElementType(r))return _(1,String(r));var s=function(){return n(r,o,ve.apply(void 0,arguments))};return s.withConfig=function(t){return e(n,r,u({},o,{},t))},s.attrs=function(t){return e(n,r,u({},o,{attrs:Array.prototype.concat(o.attrs,t).filter(Boolean)}))},s}(je,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(e){ke[e]=ke(e);}));var Ve=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=U(e),L.registerId(this.componentId+1);}var t=e.prototype;return t.createStyles=function(e,t,n,r){var o=r(me(this.rules,t,n,r).join(""),""),s=this.componentId+e;n.insertRules(s,s,o);},t.removeStyles=function(e,t){t.clearRules(this.componentId+e);},t.renderStyles=function(e,t,n,r){e>2&&L.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r);},e}(),Me=function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return "";var n=k();return "<style "+[n&&'nonce="'+n+'"',v+'="true"','data-styled-version="5.3.9"'].filter(Boolean).join(" ")+">"+t+"</style>"},this.getStyleTags=function(){return e.sealed?_(2):e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)return _(2);var n=((t={})[v]="",t["data-styled-version"]="5.3.9",t.dangerouslySetInnerHTML={__html:e.instance.toString()},t),o=k();return o&&(n.nonce=o),[r.createElement("style",u({},n,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=true;},this.instance=new L({isServer:true}),this.sealed=false;}var t=e.prototype;return t.collectStyles=function(e){return this.sealed?_(2):r.createElement(ae,{sheet:this.instance},e)},t.interleaveWithNodeStream=function(e){return _(3)},e}(),Be={StyleSheet:L,masterSheet:re};"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native"),"undefined"!=typeof window&&(window["__styled-components-init__"]=window["__styled-components-init__"]||0,1===window["__styled-components-init__"]&&console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."),window["__styled-components-init__"]+=1),styledComponents_browser_cjs.ServerStyleSheet=Me,styledComponents_browser_cjs.StyleSheetConsumer=te,styledComponents_browser_cjs.StyleSheetContext=ee,styledComponents_browser_cjs.StyleSheetManager=ae,styledComponents_browser_cjs.ThemeConsumer=De,styledComponents_browser_cjs.ThemeContext=Re,styledComponents_browser_cjs.ThemeProvider=function(e){var t=n.useContext(Re),o=n.useMemo((function(){return function(e,t){if(!e)return _(14);if(f(e)){var n=e(t);return null!==n&&!Array.isArray(n)&&"object"==typeof n?n:_(7)}return Array.isArray(e)||"object"!=typeof e?_(8):t?u({},t,{},e):e}(e.theme,t)}),[e.theme,t]);return e.children?r.createElement(Re.Provider,{value:o},e.children):null},styledComponents_browser_cjs.__PRIVATE__=Be,styledComponents_browser_cjs.createGlobalStyle=function(e){for(var t=arguments.length,o=new Array(t>1?t-1:0),s=1;s<t;s++)o[s-1]=arguments[s];var i=ve.apply(void 0,[e].concat(o)),a="sc-global-"+Ce(JSON.stringify(i)),c=new Ve(i,a);function l(e){var t=se(),o=ie(),s=n.useContext(Re),u=n.useRef(t.allocateGSInstance(a)).current;return r.Children.count(e.children)&&console.warn("The global style component "+a+" was given child JSX. createGlobalStyle does not render children."),i.some((function(e){return "string"==typeof e&&-1!==e.indexOf("@import")}))&&console.warn("Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app."),t.server&&d(u,e,t,s,o),n.useLayoutEffect((function(){if(!t.server)return d(u,e,t,s,o),function(){return c.removeStyles(u,t)}}),[u,e,t,s,o]),null}function d(e,t,n,r,o){if(c.isStatic)c.renderStyles(e,w,n,o);else {var s=u({},t,{theme:Ee(t,r,l.defaultProps)});c.renderStyles(e,s,n,o);}}return we(a),r.memo(l)},styledComponents_browser_cjs.css=ve,_default = styledComponents_browser_cjs.default=ke,styledComponents_browser_cjs.isStyledComponent=y,styledComponents_browser_cjs.keyframes=function(e){"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.");for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=ve.apply(void 0,[e].concat(n)).join(""),s=Ce(o);return new ce(s,o)},styledComponents_browser_cjs.useTheme=function(){return n.useContext(Re)},styledComponents_browser_cjs.version="5.3.9",styledComponents_browser_cjs.withTheme=function(e){var t=r.forwardRef((function(t,o){var s=n.useContext(Re),i=e.defaultProps,a=Ee(t,s,i);return void 0===a&&console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class "'+m(e)+'"'),r.createElement(e,u({},t,{theme:a,ref:o}))}));return c(t,e),t.displayName="WithTheme("+m(e)+")",t};

  // Create styled components for missing design-system components
  const TextInput$9 = _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const Switch$5 = _default.input.attrs({
    type: 'checkbox'
  })`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #e4e7ea;
  border-radius: 10px;
  transition: background-color 0.3s;
  cursor: pointer;
  
  &:checked {
    background-color: #1DC9A4;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 1px;
    left: 1px;
    transition: transform 0.3s;
  }
  
  &:checked::before {
    transform: translateX(20px);
  }
`;

  // Field renderer component based on attribute type
  const AttributeField = ({
    attribute,
    value,
    onChange
  }) => {
    const {
      type,
      handle,
      name,
      required,
      configuration = {}
    } = attribute;
    const jsonName = typeof name === 'object' ? name.en || Object.values(name)[0] : name;
    switch (type) {
      case 'text':
        return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
          required: required
        }, jsonName), /*#__PURE__*/React__default.default.createElement(TextInput$9, _extends({
          id: handle,
          name: handle,
          onChange: e => onChange(handle, e.target.value),
          value: value || '',
          required: required
        }, configuration)));
      case 'number':
        return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
          required: required
        }, jsonName), /*#__PURE__*/React__default.default.createElement(TextInput$9, _extends({
          id: handle,
          name: handle,
          type: "number",
          onChange: e => onChange(handle, parseFloat(e.target.value)),
          value: value || '',
          required: required
        }, configuration)));
      case 'translated-text':
        // Simple version for now - just handling English
        return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
          required: required
        }, jsonName, " (English)"), /*#__PURE__*/React__default.default.createElement(TextInput$9, _extends({
          id: `${handle}-en`,
          name: `${handle}-en`,
          onChange: e => onChange(handle, {
            en: e.target.value
          }),
          value: value && value.en || '',
          required: required
        }, configuration)));
      case 'textarea':
        return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
          required: required
        }, jsonName), /*#__PURE__*/React__default.default.createElement(designSystem.TextArea, _extends({
          id: handle,
          name: handle,
          onChange: e => onChange(handle, e.target.value),
          value: value || '',
          required: required
        }, configuration)));
      case 'list':
        // Simple implementation - comma separated values
        return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
          required: required
        }, jsonName, " (comma separated)"), /*#__PURE__*/React__default.default.createElement(TextInput$9, _extends({
          id: handle,
          name: handle,
          onChange: e => onChange(handle, e.target.value.split(',').map(item => item.trim())),
          value: Array.isArray(value) ? value.join(', ') : value || '',
          required: required
        }, configuration)));
      case 'boolean':
        return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, jsonName), /*#__PURE__*/React__default.default.createElement(Switch$5, _extends({
          id: handle,
          name: handle,
          onChange: e => onChange(handle, e.target.checked),
          checked: !!value
        }, configuration)));
      case 'image':
        return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
          required: required
        }, jsonName), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, value && value.url && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          mb: "default"
        }, /*#__PURE__*/React__default.default.createElement("img", {
          src: value.url,
          alt: value.alt || jsonName,
          style: {
            maxWidth: '200px',
            maxHeight: '200px'
          }
        })), /*#__PURE__*/React__default.default.createElement(TextInput$9, {
          id: `${handle}-url`,
          name: `${handle}-url`,
          placeholder: "Image URL",
          onChange: e => onChange(handle, {
            ...value,
            url: e.target.value
          }),
          value: value && value.url || '',
          required: required
        }), /*#__PURE__*/React__default.default.createElement(TextInput$9, {
          id: `${handle}-alt`,
          name: `${handle}-alt`,
          placeholder: "Alt text",
          onChange: e => onChange(handle, {
            ...value,
            alt: e.target.value
          }),
          value: value && value.alt || '',
          style: {
            marginTop: '8px'
          }
        })));
      default:
        return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
          required: required
        }, jsonName), /*#__PURE__*/React__default.default.createElement(TextInput$9, {
          id: handle,
          name: handle,
          onChange: e => onChange(handle, e.target.value),
          value: value || '',
          required: required
        }));
    }
  };
  const AttributeEditor = props => {
    const {
      record,
      onChange
    } = props;
    const [attributes, setAttributes] = React.useState([]);
    const [attributeValues, setAttributeValues] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    // Fetch product attributes on component mount
    React.useEffect(() => {
      const fetchAttributes = async () => {
        try {
          setLoading(true);
          const response = await fetch('/admin/api/product-attributes');
          if (response.ok) {
            const data = await response.json();
            setAttributes(data);

            // Initialize attribute values from record
            if (record && record.params.attribute_data) {
              let initialValues;
              try {
                initialValues = typeof record.params.attribute_data === 'string' ? JSON.parse(record.params.attribute_data) : record.params.attribute_data;
                setAttributeValues(initialValues);
              } catch (e) {
                console.error('Error parsing attribute data:', e);
                setAttributeValues({});
              }
            }
          } else {
            setError('Failed to load attributes');
          }
        } catch (e) {
          console.error('Error loading attributes:', e);
          setError(`Error loading attributes: ${e.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchAttributes();
    }, [record]);

    // Update record when attribute values change
    React.useEffect(() => {
      if (!loading && Object.keys(attributeValues).length > 0 && onChange) {
        onChange('attribute_data', attributeValues);
      }
    }, [attributeValues, loading, onChange]);
    const handleAttributeChange = (handle, value) => {
      setAttributeValues(prev => ({
        ...prev,
        [handle]: {
          type: getAttributeType(handle),
          value
        }
      }));
    };
    const getAttributeType = handle => {
      const attribute = attributes.find(attr => attr.handle === handle);
      return attribute ? attribute.type : 'text';
    };
    if (loading) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading attributes..."));
    }
    if (error) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        message: error,
        variant: "danger"
      });
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "lg"
    }, "Product Attributes"), attributes.length === 0 ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      message: "No attributes found for this product type",
      variant: "info"
    }) : /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, attributes.map(attribute => {
      // Get the current value for this attribute from the state
      const attributeData = attributeValues[attribute.handle] || {};
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: attribute.handle,
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement(AttributeField, {
        attribute: attribute,
        value: attributeData.value,
        onChange: handleAttributeChange
      }), attribute.description && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "sm",
        variant: "sm",
        color: "grey60"
      }, typeof attribute.description === 'object' ? attribute.description.en || Object.values(attribute.description)[0] : attribute.description));
    })));
  };

  const CustomerStatistics = () => {
    const [statistics, setStatistics] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
      const fetchStatistics = async () => {
        try {
          setLoading(true);
          const response = await fetch('/admin/api/customer-statistics');
          if (response.ok) {
            const data = await response.json();
            setStatistics(data);
          } else {
            const errorData = await response.json();
            setError(errorData.error || 'Failed to load customer statistics');
          }
        } catch (error) {
          console.error('Error fetching customer statistics:', error);
          setError('Failed to load customer statistics');
        } finally {
          setLoading(false);
        }
      };
      fetchStatistics();
    }, []);
    if (loading) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        p: "xl",
        textAlign: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading customer statistics..."));
    }
    if (error) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        p: "xl",
        textAlign: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
        variant: "Rocket",
        width: 100,
        height: 100
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, error));
    }
    if (!statistics) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        p: "xl",
        textAlign: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "No statistics available"));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H4, {
      mb: "lg"
    }, "Customer Statistics"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      flexDirection: ['column', 'row'],
      flexWrap: "wrap"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: 1,
      p: "lg",
      bg: "white",
      mr: "lg",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 3]
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "Total Customers"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold",
      fontSize: "xl"
    }, statistics.totalCustomers), /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "Moon",
      width: 40,
      height: 40
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: 1,
      p: "lg",
      bg: "white",
      mr: "lg",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 3]
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "New Customers (30 days)"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold",
      fontSize: "xl"
    }, statistics.newCustomers), /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "DocumentCheck",
      width: 40,
      height: 40
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: 1,
      p: "lg",
      bg: "white",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 3]
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "Top Customer"), statistics.topCustomer ? /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold"
    }, statistics.topCustomer.name), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, statistics.topCustomer.orderCount, " orders")), /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "FlagInCog",
      width: 40,
      height: 40
    })) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "No orders yet"))), statistics.customersByGroup.length > 0 && /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "Customers by Group"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      bg: "white",
      p: "lg",
      boxShadow: "card"
    }, statistics.customersByGroup.map(group => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      key: group.id,
      display: "flex",
      justifyContent: "space-between",
      p: "md",
      borderBottom: "1px solid",
      borderColor: "grey20"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, group.name), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold"
    }, group.count))))));
  };

  const Dashboard = () => {
    const [data, setData] = React.useState({
      products: 0,
      orders: 0,
      customers: 0,
      revenue: 0
    });
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
      // Load dashboard data
      const fetchDashboardData = async () => {
        try {
          setLoading(true);
          // Sử dụng fetch thay vì ApiClient để gọi API mới
          const response = await fetch('/admin/api/dashboard');
          if (response.ok) {
            const jsonData = await response.json();
            setData({
              products: jsonData.products || 0,
              orders: jsonData.orders || 0,
              customers: jsonData.customers || 0,
              revenue: jsonData.revenue || 0
            });
          }
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchDashboardData();
    }, []);

    // Format revenue with 2 decimal places or show 0
    const formattedRevenue = typeof data.revenue === 'number' ? data.revenue.toFixed(2) : '0.00';
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      position: "relative",
      overflow: "hidden",
      bg: "white",
      mb: "xxl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      position: "absolute",
      top: -30,
      left: -30,
      opacity: 0.2
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "Rocket",
      width: 200,
      height: 200
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "xl",
      position: "relative",
      zIndex: 2
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, null, "Welcome to Your Lunar Ecommerce Admin"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Manage your products, orders, customers, and more."))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      flexDirection: ['column', 'row'],
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: 1,
      p: "lg",
      bg: "white",
      mr: "lg",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 4],
      as: "a",
      href: "/admin/resources/Product",
      style: {
        textDecoration: 'none',
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "Products"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H4, null, data.products), /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "DocumentCheck",
      width: 40,
      height: 40
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: 1,
      p: "lg",
      bg: "white",
      mr: "lg",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 4],
      as: "a",
      href: "/admin/resources/Order",
      style: {
        textDecoration: 'none',
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H4, null, data.orders), /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "DocumentSearch",
      width: 40,
      height: 40
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: 1,
      p: "lg",
      bg: "white",
      mr: "lg",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 4],
      as: "a",
      href: "/admin/resources/Customer",
      style: {
        textDecoration: 'none',
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "Customers"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H4, null, data.customers), /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "Moon",
      width: 40,
      height: 40
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: 1,
      p: "lg",
      bg: "white",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 4],
      as: "a",
      href: "/admin/resources/Order",
      style: {
        textDecoration: 'none',
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "Revenue"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H4, null, "$", formattedRevenue), /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "Planet",
      width: 40,
      height: 40
    })))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(CustomerStatistics, null)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "lg"
    }, "Quick Actions"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      flexDirection: ['column', 'row'],
      flexWrap: "wrap"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "lg",
      bg: "white",
      mr: "lg",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 4],
      as: "a",
      href: "/admin/resources/Product/actions/new",
      style: {
        textDecoration: 'none',
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "md",
      textAlign: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "FileSearch",
      width: 40,
      height: 40
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold"
    }, "Add New Product"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "lg",
      bg: "white",
      mr: "lg",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 4],
      as: "a",
      href: "/admin/resources/Customer/actions/new",
      style: {
        textDecoration: 'none',
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "md",
      textAlign: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "FlagInCog",
      width: 40,
      height: 40
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold"
    }, "Add New Customer"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "lg",
      bg: "white",
      mr: "lg",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 4],
      as: "a",
      href: "/admin/resources/Discount/actions/new",
      style: {
        textDecoration: 'none',
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "md",
      textAlign: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "DocumentCheck",
      width: 40,
      height: 40
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold"
    }, "Create Discount"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "lg",
      bg: "white",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 4],
      as: "a",
      href: "/admin/resources/Collection/actions/new",
      style: {
        textDecoration: 'none',
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "md",
      textAlign: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "Folders",
      width: 40,
      height: 40
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold"
    }, "Create Collection"))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "xl",
      bg: "grey100",
      mt: "xl",
      boxShadow: "card",
      style: {
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, null, "Documentation & Resources"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mb: "lg"
    }, "Find more information about your ecommerce platform in the links below:"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      flexDirection: ['column', 'row']
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      as: "a",
      href: "https://docs.lunarphp.io/",
      target: "_blank",
      mr: "default",
      mb: ['default', 0]
    }, "Documentation"), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      as: "a",
      href: "https://github.com/lunarphp/lunar",
      target: "_blank",
      mr: "default",
      mb: ['default', 0],
      variant: "light"
    }, "GitHub"), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      as: "a",
      href: "https://discord.com/invite/v6qVWmA",
      target: "_blank",
      variant: "light"
    }, "Discord Community"))));
  };

  // Create styled components for inputs
  _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const StatusSelect$5 = _default.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  background-color: white;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const Switch$4 = _default.input.attrs({
    type: 'checkbox'
  })`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #e4e7ea;
  border-radius: 10px;
  transition: background-color 0.3s;
  cursor: pointer;
  
  &:checked {
    background-color: #1DC9A4;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 1px;
    left: 1px;
    transition: transform 0.3s;
  }
  
  &:checked::before {
    transform: translateX(20px);
  }
`;
  const ProductForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      product_type_id: '',
      status: 'draft',
      attribute_data: {},
      createDefaultVariant: true
    });
    const [productTypes, setProductTypes] = React.useState([]);
    const api = new adminjs.ApiClient();

    // Fetch product types on component mount
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          // Only fetch product types which should definitely exist
          const productTypesResponse = await api.resourceAction({
            resourceId: 'ProductType',
            actionName: 'list'
          });
          setProductTypes(productTypesResponse.data.records || []);

          // If editing, load the product data
          if (isEditing) {
            try {
              const productResponse = await fetch(`/admin/api/products/${record.id}`);
              if (productResponse.ok) {
                const productData = await productResponse.json();
                setFormData({
                  product_type_id: productData.product_type_id || '',
                  status: productData.status || 'draft',
                  attribute_data: productData.attribute_data || {},
                  createDefaultVariant: false
                });
              }
            } catch (e) {
              console.error('Error loading product data:', e);
            }
          }
        } catch (e) {
          console.error('Error loading form data:', e);
          setError('Failed to load form data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [isEditing, record]);
    const handleInputChange = e => {
      const {
        name,
        value,
        type,
        checked
      } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
    const handleAttributeChange = (propertyName, value) => {
      setFormData(prev => ({
        ...prev,
        [propertyName]: value
      }));
    };
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const apiEndpoint = isEditing ? `/admin/api/products/${record.id}` : '/admin/api/products';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(apiEndpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred while saving the product');
        }
        const data = await response.json();
        setSuccess(true);

        // Redirect to the product list after a short delay if creating new product
        if (!isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/resources/Product';
          }, 1500);
        }
      } catch (e) {
        console.error('Error saving product:', e);
        setError(e.message || 'Failed to save product. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (loading && !formData.product_type_id) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading..."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "xl"
    }, isEditing ? 'Edit Product' : 'Create New Product'), error && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: error,
      variant: "danger"
    }), success && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: "Product saved successfully!",
      variant: "success"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Product Type"), /*#__PURE__*/React__default.default.createElement(StatusSelect$5, {
      name: "product_type_id",
      value: formData.product_type_id,
      onChange: handleInputChange,
      required: true
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select Product Type"), productTypes.map(type => /*#__PURE__*/React__default.default.createElement("option", {
      key: type.id,
      value: type.id
    }, type.params.name)))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Status"), /*#__PURE__*/React__default.default.createElement(StatusSelect$5, {
      name: "status",
      value: formData.status,
      onChange: handleInputChange,
      required: true
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: "draft"
    }, "Draft"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "published"
    }, "Published"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "archived"
    }, "Archived"))), !isEditing && /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Create Default Variant"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      alignItems: "center"
    }, /*#__PURE__*/React__default.default.createElement(Switch$4, {
      name: "createDefaultVariant",
      checked: formData.createDefaultVariant,
      onChange: handleInputChange
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      ml: "default"
    }, formData.createDefaultVariant ? 'Yes' : 'No')), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      variant: "sm",
      color: "grey100"
    }, "This will create a default variant for this product automatically.")), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Product Attributes"), /*#__PURE__*/React__default.default.createElement(AttributeEditor, {
      record: {
        params: {
          attribute_data: formData.attribute_data
        },
        populated: {},
        errors: {},
        recordActions: [],
        bulkActions: [],
        id: isEditing ? record?.id : '',
        title: '',
        baseError: null
      },
      onChange: (propertyName, value) => handleAttributeChange(propertyName, value)
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "submit",
      disabled: loading
    }, loading ? 'Saving...' : 'Save Product'));
  };

  // Create styled components for inputs
  const TextInput$8 = _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const NumberInput = _default.input.attrs({
    type: 'number'
  })`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const Select = _default.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  background-color: white;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const ImageUpload = _default.div`
  margin-top: 10px;
  border: 2px dashed #C0C9D4;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #3795BE;
    background-color: rgba(55, 149, 190, 0.05);
  }
  
  input {
    display: none;
  }
`;
  const ImagePreviewContainer = _default.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;
  const ImagePreview = _default.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .remove-btn {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #FF5C5C;
    
    &:hover {
      background: white;
      color: #FF0000;
    }
  }
`;
  const ProductVariantForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      product_id: '',
      sku: '',
      stock: 0,
      unit_quantity: 1,
      backorder: null,
      purchasable: 'always',
      attribute_data: {}
    });
    const [images, setImages] = React.useState([]);
    const [existingImages, setExistingImages] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const api = new adminjs.ApiClient();

    // Fetch products on component mount
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          // Only try to fetch products, since they should definitely exist
          const productsResponse = await api.resourceAction({
            resourceId: 'Product',
            actionName: 'list'
          });
          setProducts(productsResponse.data.records || []);

          // If editing, load the product variant data
          if (isEditing) {
            try {
              const variantResponse = await fetch(`/admin/api/product-variants/${record.id}`);
              if (variantResponse.ok) {
                const variantData = await variantResponse.json();
                setFormData({
                  product_id: variantData.product_id || '',
                  sku: variantData.sku || '',
                  stock: variantData.stock || 0,
                  unit_quantity: variantData.unit_quantity || 1,
                  backorder: variantData.backorder || null,
                  purchasable: variantData.purchasable || 'always',
                  attribute_data: variantData.attribute_data || {}
                });
              }
            } catch (e) {
              console.error('Error loading variant data:', e);
            }

            // Fetch existing images
            try {
              const imagesResponse = await fetch(`/admin/api/product-variants/${record.id}/images`);
              if (imagesResponse.ok) {
                const imagesData = await imagesResponse.json();
                setExistingImages(imagesData);
              }
            } catch (e) {
              console.error('Error fetching variant images:', e);
            }
          }
        } catch (e) {
          console.error('Error loading form data:', e);
          setError('Failed to load form data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [isEditing, record]);
    const handleInputChange = e => {
      const {
        name,
        value,
        type
      } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }));
    };
    const handleImageSelect = e => {
      const files = Array.from(e.target.files || []);
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newImages]);
    };
    const removeImage = index => {
      setImages(prev => prev.filter((_, i) => i !== index));
    };
    const removeExistingImage = async imageId => {
      try {
        const response = await fetch(`/admin/api/media/${imageId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setExistingImages(prev => prev.filter(img => img.id !== imageId));
        } else {
          setError('Failed to remove image. Please try again.');
        }
      } catch (e) {
        console.error('Error removing image:', e);
        setError('Failed to remove image. Please try again.');
      }
    };
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const apiEndpoint = isEditing ? `/admin/api/product-variants/${record.id}` : '/admin/api/product-variants';
        const method = isEditing ? 'PUT' : 'POST';

        // First save the product variant
        const response = await fetch(apiEndpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred while saving the product variant');
        }
        const data = await response.json();
        const variantId = data.id || record.id;

        // Then upload any images if present
        if (images.length > 0) {
          const formData = new FormData();
          images.forEach(img => {
            formData.append('images', img.file);
          });
          const uploadResponse = await fetch(`/admin/api/product-variants/${variantId}/images`, {
            method: 'POST',
            body: formData
          });
          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json();
            throw new Error(errorData.error || 'Images were uploaded but failed to associate with the variant');
          }
        }
        setSuccess(true);

        // Redirect to the product variant list after a short delay if creating new variant
        if (!isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/resources/ProductVariant';
          }, 1500);
        }
      } catch (e) {
        console.error('Error saving product variant:', e);
        setError(e.message || 'Failed to save product variant. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (loading && !formData.product_id) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading..."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "xl"
    }, isEditing ? 'Edit Product Variant' : 'Create New Product Variant'), error && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: error,
      variant: "danger"
    }), success && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: "Product variant saved successfully!",
      variant: "success"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Product"), /*#__PURE__*/React__default.default.createElement(Select, {
      name: "product_id",
      value: formData.product_id,
      onChange: handleInputChange,
      required: true
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select Product"), products.map(product => /*#__PURE__*/React__default.default.createElement("option", {
      key: product.id,
      value: product.id
    }, product.id, " - ", product.params.attribute_data?.name || 'Unnamed Product')))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "SKU"), /*#__PURE__*/React__default.default.createElement(TextInput$8, {
      name: "sku",
      value: formData.sku,
      onChange: handleInputChange,
      placeholder: "SKU"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Stock"), /*#__PURE__*/React__default.default.createElement(NumberInput, {
      name: "stock",
      value: formData.stock,
      onChange: handleInputChange,
      min: "0"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Unit Quantity"), /*#__PURE__*/React__default.default.createElement(NumberInput, {
      name: "unit_quantity",
      value: formData.unit_quantity,
      onChange: handleInputChange,
      min: "1"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Purchasable"), /*#__PURE__*/React__default.default.createElement(Select, {
      name: "purchasable",
      value: formData.purchasable,
      onChange: handleInputChange
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: "always"
    }, "Always"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "when_in_stock"
    }, "When In Stock"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "never"
    }, "Never"))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Images"), /*#__PURE__*/React__default.default.createElement(ImageUpload, null, /*#__PURE__*/React__default.default.createElement("input", {
      type: "file",
      accept: "image/*",
      multiple: true,
      onChange: handleImageSelect
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Click to upload or drag and drop"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      variant: "sm",
      mt: "default"
    }, "JPEG, PNG, GIF up to 5MB")), images.length > 0 && /*#__PURE__*/React__default.default.createElement(ImagePreviewContainer, null, images.map((img, index) => /*#__PURE__*/React__default.default.createElement(ImagePreview, {
      key: index
    }, /*#__PURE__*/React__default.default.createElement("img", {
      src: img.preview,
      alt: "Preview"
    }), /*#__PURE__*/React__default.default.createElement("div", {
      className: "remove-btn",
      onClick: () => removeImage(index)
    }, "\xD7")))), existingImages.length > 0 && /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "lg",
      mb: "sm"
    }, "Existing Images"), /*#__PURE__*/React__default.default.createElement(ImagePreviewContainer, null, existingImages.map(img => /*#__PURE__*/React__default.default.createElement(ImagePreview, {
      key: img.id
    }, /*#__PURE__*/React__default.default.createElement("img", {
      src: img.url,
      alt: img.name
    }), /*#__PURE__*/React__default.default.createElement("div", {
      className: "remove-btn",
      onClick: () => removeExistingImage(img.id)
    }, "\xD7"))))))), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "submit",
      disabled: loading
    }, loading ? 'Saving...' : 'Save Product Variant'));
  };

  // Create styled components for inputs
  _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const StatusSelect$4 = _default.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  background-color: white;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;

  // Multi-select component for products
  const ProductSelect = _default.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  background-color: white;
  min-height: 150px;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const CollectionForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      collection_group_id: '',
      parent_id: null,
      type: 'static',
      sort: 'custom',
      product_ids: [],
      attribute_data: {}
    });
    const [groups, setGroups] = React.useState([]);
    const [collections, setCollections] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const api = new adminjs.ApiClient();

    // Fetch collection groups, parent collections and products on component mount
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          // Fetch collection groups
          const groupsResponse = await fetch('/admin/api/collection-groups');
          const groupsData = await groupsResponse.json();
          setGroups(groupsData);

          // Fetch all collections for parent selection
          const collectionsResponse = await api.resourceAction({
            resourceId: 'Collection',
            actionName: 'list'
          });
          setCollections(collectionsResponse.data.records || []);

          // Fetch products
          const productsResponse = await api.resourceAction({
            resourceId: 'Product',
            actionName: 'list'
          });
          setProducts(productsResponse.data.records || []);

          // If editing, load the collection data
          if (isEditing) {
            // Fetch collection details with products
            const collectionResponse = await fetch(`/admin/api/collections/${record.id}`);
            if (collectionResponse.ok) {
              const collectionData = await collectionResponse.json();
              setFormData({
                collection_group_id: collectionData.collection_group_id || '',
                parent_id: collectionData.parent_id || null,
                type: collectionData.type || 'static',
                sort: collectionData.sort || 'custom',
                product_ids: (collectionData.products || []).map(p => p.id),
                attribute_data: collectionData.attribute_data || {}
              });
            }
          }
        } catch (e) {
          console.error('Error loading form data:', e);
          setError('Failed to load form data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [isEditing, record, api]);
    const handleInputChange = e => {
      const {
        name,
        value,
        type
      } = e.target;
      if (name === 'product_ids') {
        // Get selected options for multi-select
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({
          ...prev,
          [name]: selectedOptions
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    };
    const handleAttributeChange = (propertyName, value) => {
      setFormData(prev => ({
        ...prev,
        [propertyName]: value
      }));
    };
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const apiEndpoint = isEditing ? `/admin/api/collections/${record.id}` : '/admin/api/collections';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(apiEndpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred while saving the collection');
        }
        const data = await response.json();
        setSuccess(true);

        // Redirect to the collection list after a short delay if creating new collection
        if (!isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/resources/Collection';
          }, 1500);
        }
      } catch (e) {
        console.error('Error saving collection:', e);
        setError(e.message || 'Failed to save collection. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (loading && !formData.collection_group_id) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading..."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "xl"
    }, isEditing ? 'Edit Collection' : 'Create New Collection'), error && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: error,
      variant: "danger"
    }), success && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: "Collection saved successfully!",
      variant: "success"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Collection Group"), /*#__PURE__*/React__default.default.createElement(StatusSelect$4, {
      name: "collection_group_id",
      value: formData.collection_group_id,
      onChange: handleInputChange,
      required: true
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select Collection Group"), groups.map(group => /*#__PURE__*/React__default.default.createElement("option", {
      key: group.id,
      value: group.id
    }, group.name)))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Parent Collection"), /*#__PURE__*/React__default.default.createElement(StatusSelect$4, {
      name: "parent_id",
      value: formData.parent_id || '',
      onChange: handleInputChange
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "No Parent (Root Collection)"), collections.filter(c => c.id !== record?.id) // Don't show current collection as parent option
    .map(collection => /*#__PURE__*/React__default.default.createElement("option", {
      key: collection.id,
      value: collection.id
    }, collection.params.attribute_data?.name?.value || `Collection #${collection.id}`)))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Type"), /*#__PURE__*/React__default.default.createElement(StatusSelect$4, {
      name: "type",
      value: formData.type,
      onChange: handleInputChange,
      required: true
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: "static"
    }, "Static"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "dynamic"
    }, "Dynamic")), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      variant: "sm",
      color: "grey60"
    }, "Static collections have manually assigned products. Dynamic collections use rules to automatically assign products.")), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Sort"), /*#__PURE__*/React__default.default.createElement(StatusSelect$4, {
      name: "sort",
      value: formData.sort,
      onChange: handleInputChange,
      required: true
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: "custom"
    }, "Custom"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "name_asc"
    }, "Name (A-Z)"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "name_desc"
    }, "Name (Z-A)"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "price_asc"
    }, "Price (Low to High)"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "price_desc"
    }, "Price (High to Low)"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "newest"
    }, "Newest First"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "oldest"
    }, "Oldest First"))), formData.type === 'static' && /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Products"), /*#__PURE__*/React__default.default.createElement(ProductSelect, {
      name: "product_ids",
      multiple: true,
      value: formData.product_ids,
      onChange: handleInputChange
    }, products.map(product => /*#__PURE__*/React__default.default.createElement("option", {
      key: product.id,
      value: product.id
    }, product.params.attribute_data?.name?.value || `Product #${product.id}`))), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      variant: "sm",
      color: "grey60"
    }, "Hold Ctrl (or Command on Mac) to select multiple products"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(AttributeEditor, {
      record: {
        params: {
          attribute_data: formData.attribute_data
        },
        populated: {},
        errors: {},
        recordActions: [],
        bulkActions: [],
        id: isEditing ? record?.id : '',
        title: '',
        baseError: null
      },
      onChange: handleAttributeChange
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "flex-end"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      as: "a",
      href: "/admin/resources/Collection",
      variant: "light",
      mr: "lg"
    }, "Cancel"), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "submit",
      variant: "primary",
      disabled: loading
    }, loading ? 'Saving...' : isEditing ? 'Update Collection' : 'Create Collection')));
  };

  // Define interfaces for strongly typed components

  const CustomerForm = () => {
    // @ts-ignore - Ignore the type error for useRecord
    const {
      record,
      handleChange,
      submit
    } = adminjs.useRecord();
    const {
      translateButton
    } = adminjs.useTranslation();
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState({
      type: '',
      text: ''
    });
    const [customerGroups, setCustomerGroups] = React.useState([]);
    const [selectedGroups, setSelectedGroups] = React.useState([]);
    React.useEffect(() => {
      // Load customer groups
      const fetchCustomerGroups = async () => {
        try {
          const response = await fetch('/admin/api/customer-groups');
          if (response.ok) {
            const data = await response.json();
            setCustomerGroups(data);
          }
        } catch (error) {
          console.error('Error fetching customer groups:', error);
        }
      };

      // Load selected groups if editing an existing customer
      const fetchCustomerData = async () => {
        if (record.id) {
          try {
            const response = await fetch(`/admin/api/customers/${record.id}`);
            if (response.ok) {
              const data = await response.json();
              if (data.customerGroups && Array.isArray(data.customerGroups)) {
                setSelectedGroups(data.customerGroups.map(group => group.id));
              }
            }
          } catch (error) {
            console.error('Error fetching customer data:', error);
          }
        }
      };
      fetchCustomerGroups();
      fetchCustomerData();
    }, [record.id]);
    const handleGroupsChange = event => {
      const {
        value
      } = event.target;
      const numValue = parseInt(value, 10);
      if (selectedGroups.includes(numValue)) {
        setSelectedGroups(selectedGroups.filter(id => id !== numValue));
      } else {
        setSelectedGroups([...selectedGroups, numValue]);
      }
    };
    const handleSubmit = async event => {
      event.preventDefault();
      setLoading(true);
      setMessage({
        type: '',
        text: ''
      });
      try {
        // Prepare form data
        const formData = {
          title: record.params.title,
          first_name: record.params.first_name,
          last_name: record.params.last_name,
          email: record.params.email,
          phone: record.params.phone,
          company_name: record.params.company_name,
          vat_no: record.params.vat_no,
          group_ids: selectedGroups,
          meta: record.params.meta || {}
        };
        let response;
        if (record.id) {
          // Update existing customer
          response = await fetch(`/admin/api/customers/${record.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
        } else {
          // Create new customer
          response = await fetch('/admin/api/customers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
        }
        if (response.ok) {
          const data = await response.json();
          setMessage({
            type: 'success',
            text: record.id ? 'Customer updated successfully' : 'Customer created successfully'
          });

          // Refresh the record
          if (!record.id) {
            window.location.href = `/admin/resources/Customer/records/${data.id}/edit`;
          } else {
            submit().then(() => {
              // Refresh the page to show updated data
              window.location.reload();
            });
          }
        } else {
          const errorData = await response.json();
          setMessage({
            type: 'danger',
            text: errorData.error || 'An error occurred'
          });
        }
      } catch (error) {
        console.error('Error saving customer:', error);
        setMessage({
          type: 'danger',
          text: 'An error occurred while saving customer'
        });
      } finally {
        setLoading(false);
      }
    };
    const handleAnonymize = async () => {
      if (!record.id) return;
      if (!window.confirm('Are you sure you want to anonymize this customer? This action cannot be undone.')) {
        return;
      }
      setLoading(true);
      setMessage({
        type: '',
        text: ''
      });
      try {
        const response = await fetch(`/admin/api/customers/${record.id}/anonymize`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          setMessage({
            type: 'success',
            text: 'Customer anonymized successfully'
          });
          // Refresh the page to show updated data
          window.location.reload();
        } else {
          const errorData = await response.json();
          setMessage({
            type: 'danger',
            text: errorData.error || 'An error occurred'
          });
        }
      } catch (error) {
        console.error('Error anonymizing customer:', error);
        setMessage({
          type: 'danger',
          text: 'An error occurred while anonymizing customer'
        });
      } finally {
        setLoading(false);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, message.text && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      style: {
        marginBottom: '1rem'
      },
      variant: message.type,
      message: message.text
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Section, null, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Title"), /*#__PURE__*/React__default.default.createElement("select", {
      className: "adminjs-select",
      value: record.params.title || '',
      onChange: e => handleChange('title', e.target.value)
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select..."), /*#__PURE__*/React__default.default.createElement("option", {
      value: "Mr"
    }, "Mr"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "Mrs"
    }, "Mrs"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "Ms"
    }, "Ms"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "Dr"
    }, "Dr"))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "First Name"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      required: true,
      value: record.params.first_name || '',
      onChange: e => handleChange('first_name', e.target.value)
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Last Name"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      required: true,
      value: record.params.last_name || '',
      onChange: e => handleChange('last_name', e.target.value)
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Email Address"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      required: true,
      type: "email",
      value: record.params.email || '',
      onChange: e => handleChange('email', e.target.value)
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Phone"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: record.params.phone || '',
      onChange: e => handleChange('phone', e.target.value)
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Section, {
      title: "Company Information"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Company Name"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: record.params.company_name || '',
      onChange: e => handleChange('company_name', e.target.value)
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "VAT Number"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: record.params.vat_no || '',
      onChange: e => handleChange('vat_no', e.target.value)
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Section, {
      title: "Customer Groups"
    }, customerGroups.length > 0 ? /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, customerGroups.map(group => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "default",
      key: group.id
    }, /*#__PURE__*/React__default.default.createElement(designSystem.CheckBox, {
      id: `group-${group.id}`,
      checked: selectedGroups.includes(group.id),
      onChange: handleGroupsChange,
      value: group.id.toString()
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      inline: true,
      htmlFor: `group-${group.id}`
    }, group.name)))) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "No customer groups available")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      type: "submit",
      disabled: loading
    }, loading ? /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null) : record.id ? 'Update Customer' : 'Create Customer'), record.id && /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      ml: "default",
      variant: "danger",
      type: "button",
      onClick: handleAnonymize,
      disabled: loading
    }, "Anonymize Customer")));
  };

  // Define interfaces for strongly typed components

  const DiscountForm = () => {
    // @ts-ignore - Ignore the type error for useRecord
    const {
      record,
      handleChange,
      submit
    } = adminjs.useRecord();
    const {
      translateButton
    } = adminjs.useTranslation();
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState({
      type: '',
      text: ''
    });
    const [products, setProducts] = React.useState([]);
    const [collections, setCollections] = React.useState([]);
    const [customerGroups, setCustomerGroups] = React.useState([]);
    const [selectedProducts, setSelectedProducts] = React.useState([]);
    const [selectedCollections, setSelectedCollections] = React.useState([]);
    const [selectedCustomerGroups, setSelectedCustomerGroups] = React.useState([]);
    const [discountType, setDiscountType] = React.useState('percentage');
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(null);
    const [isActive, setIsActive] = React.useState(true);
    React.useEffect(() => {
      // Load products, collections and customer groups
      const fetchData = async () => {
        try {
          // Fetch products
          const productsResponse = await fetch('/admin/api/products?limit=100');
          if (productsResponse.ok) {
            const productsData = await productsResponse.json();
            setProducts(productsData.products || []);
          }

          // Fetch collections
          const collectionsResponse = await fetch('/admin/api/collections?limit=100');
          if (collectionsResponse.ok) {
            const collectionsData = await collectionsResponse.json();
            setCollections(collectionsData.collections || []);
          }

          // Fetch customer groups
          const groupsResponse = await fetch('/admin/api/customer-groups');
          if (groupsResponse.ok) {
            const groupsData = await groupsResponse.json();
            setCustomerGroups(groupsData.groups || []);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      // Load discount data if editing an existing discount
      const fetchDiscountData = async () => {
        if (record.id) {
          try {
            setDiscountType(record.params.type || 'percentage');
            setIsActive(record.params.is_active !== 'false');
            if (record.params.starts_at) {
              setStartDate(new Date(record.params.starts_at));
            }
            if (record.params.ends_at) {
              setEndDate(new Date(record.params.ends_at));
            }
            const response = await fetch(`/admin/api/discounts/${record.id}`);
            if (response.ok) {
              const data = await response.json();

              // Set selected products
              if (data.products && Array.isArray(data.products)) {
                setSelectedProducts(data.products.map(product => product.id));
              }

              // Set selected collections
              if (data.collections && Array.isArray(data.collections)) {
                setSelectedCollections(data.collections.map(collection => collection.id));
              }

              // Set selected customer groups
              if (data.customerGroups && Array.isArray(data.customerGroups)) {
                setSelectedCustomerGroups(data.customerGroups.map(group => group.id));
              }
            }
          } catch (error) {
            console.error('Error fetching discount data:', error);
          }
        }
      };
      fetchData();
      fetchDiscountData();
    }, [record.id]);
    const handleProductChange = event => {
      const {
        value
      } = event.target;
      const numValue = parseInt(value, 10);
      if (selectedProducts.includes(numValue)) {
        setSelectedProducts(selectedProducts.filter(id => id !== numValue));
      } else {
        setSelectedProducts([...selectedProducts, numValue]);
      }
    };
    const handleCollectionChange = event => {
      const {
        value
      } = event.target;
      const numValue = parseInt(value, 10);
      if (selectedCollections.includes(numValue)) {
        setSelectedCollections(selectedCollections.filter(id => id !== numValue));
      } else {
        setSelectedCollections([...selectedCollections, numValue]);
      }
    };
    const handleCustomerGroupChange = event => {
      const {
        value
      } = event.target;
      const numValue = parseInt(value, 10);
      if (selectedCustomerGroups.includes(numValue)) {
        setSelectedCustomerGroups(selectedCustomerGroups.filter(id => id !== numValue));
      } else {
        setSelectedCustomerGroups([...selectedCustomerGroups, numValue]);
      }
    };
    const handleSubmit = async event => {
      event.preventDefault();
      setLoading(true);
      setMessage({
        type: '',
        text: ''
      });
      try {
        // Format dates
        const formattedStartDate = startDate ? startDate.toISOString() : new Date().toISOString();
        const formattedEndDate = endDate ? endDate.toISOString() : null;

        // Prepare form data
        const formData = {
          name: record.params.name,
          code: record.params.code,
          type: discountType,
          value: parseFloat(record.params.value || '0'),
          min_order_value: parseFloat(record.params.min_order_value || '0'),
          max_uses: record.params.max_uses ? parseInt(record.params.max_uses, 10) : null,
          starts_at: formattedStartDate,
          ends_at: formattedEndDate,
          is_active: isActive,
          product_ids: selectedProducts,
          collection_ids: selectedCollections,
          customer_group_ids: selectedCustomerGroups
        };
        let response;
        if (record.id) {
          // Update existing discount
          response = await fetch(`/admin/api/discounts/${record.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
        } else {
          // Create new discount
          response = await fetch('/admin/api/discounts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
        }
        if (response.ok) {
          const data = await response.json();
          setMessage({
            type: 'success',
            text: record.id ? 'Discount updated successfully' : 'Discount created successfully'
          });

          // Refresh the record
          if (!record.id) {
            window.location.href = `/admin/resources/Discount/records/${data.id}/edit`;
          } else {
            submit().then(() => {
              // Refresh the page to show updated data
              window.location.reload();
            });
          }
        } else {
          const errorData = await response.json();
          setMessage({
            type: 'danger',
            text: errorData.error || 'An error occurred'
          });
        }
      } catch (error) {
        console.error('Error saving discount:', error);
        setMessage({
          type: 'danger',
          text: 'An error occurred while saving discount'
        });
      } finally {
        setLoading(false);
      }
    };

    // Function to handle date changes from DatePicker
    const handleStartDateChange = value => {
      if (typeof value === 'string') {
        setStartDate(new Date(value));
      } else {
        setStartDate(value);
      }
    };
    const handleEndDateChange = value => {
      if (value === null) {
        setEndDate(null);
        return;
      }
      if (typeof value === 'string') {
        setEndDate(new Date(value));
      } else {
        setEndDate(value);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, message.text && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      style: {
        marginBottom: '1rem'
      },
      variant: message.type,
      message: message.text
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Section, null, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Discount Name"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      required: true,
      value: record.params.name || '',
      onChange: e => handleChange('name', e.target.value)
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Discount Code"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      required: true,
      value: record.params.code || '',
      onChange: e => handleChange('code', e.target.value)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      variant: "sm"
    }, "This is the code customers will enter at checkout")), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Discount Type"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.CheckBox, {
      id: "discount-type-percentage",
      checked: discountType === 'percentage',
      onChange: () => setDiscountType('percentage'),
      value: "percentage"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      inline: true,
      htmlFor: "discount-type-percentage"
    }, "Percentage (%)")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "sm"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.CheckBox, {
      id: "discount-type-fixed",
      checked: discountType === 'fixed',
      onChange: () => setDiscountType('fixed'),
      value: "fixed"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      inline: true,
      htmlFor: "discount-type-fixed"
    }, "Fixed Amount"))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Value"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      required: true,
      type: "number",
      min: "0",
      step: discountType === 'percentage' ? '1' : '0.01',
      value: record.params.value || '',
      onChange: e => handleChange('value', e.target.value)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      variant: "sm"
    }, discountType === 'percentage' ? 'Percentage discount (e.g. 10 for 10%)' : 'Fixed amount discount')), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Minimum Order Value"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      min: "0",
      step: "0.01",
      value: record.params.min_order_value || '0',
      onChange: e => handleChange('min_order_value', e.target.value)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      variant: "sm"
    }, "Minimum cart value required to use this discount (0 = no minimum)")), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Maximum Uses"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      min: "0",
      value: record.params.max_uses || '',
      onChange: e => handleChange('max_uses', e.target.value)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      variant: "sm"
    }, "Maximum number of times this discount can be used (leave empty for unlimited)"))), /*#__PURE__*/React__default.default.createElement(designSystem.Section, {
      title: "Validity Period"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Start Date"), /*#__PURE__*/React__default.default.createElement(designSystem.DatePicker, {
      value: startDate,
      onChange: handleStartDateChange
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "End Date (Optional)"), /*#__PURE__*/React__default.default.createElement(designSystem.DatePicker, {
      value: endDate,
      onChange: handleEndDateChange
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      variant: "sm"
    }, "Leave empty for a discount with no expiration date")), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.CheckBox, {
      id: "is-active",
      checked: isActive,
      onChange: () => setIsActive(!isActive)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      inline: true,
      htmlFor: "is-active"
    }, "Active")))), /*#__PURE__*/React__default.default.createElement(designSystem.Section, {
      title: "Discount Restrictions"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mb: "lg"
    }, "You can restrict this discount to specific products, collections, or customer groups. If none are selected, the discount will apply to all eligible orders."), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Products"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      maxHeight: "200px",
      overflow: "auto",
      border: "1px solid",
      borderColor: "grey20",
      p: "md"
    }, products.length > 0 ? products.map(product => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "sm",
      key: product.id
    }, /*#__PURE__*/React__default.default.createElement(designSystem.CheckBox, {
      id: `product-${product.id}`,
      checked: selectedProducts.includes(product.id),
      onChange: handleProductChange,
      value: product.id.toString()
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      inline: true,
      htmlFor: `product-${product.id}`
    }, product.name))) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "No products available"))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Collections"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      maxHeight: "200px",
      overflow: "auto",
      border: "1px solid",
      borderColor: "grey20",
      p: "md"
    }, collections.length > 0 ? collections.map(collection => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "sm",
      key: collection.id
    }, /*#__PURE__*/React__default.default.createElement(designSystem.CheckBox, {
      id: `collection-${collection.id}`,
      checked: selectedCollections.includes(collection.id),
      onChange: handleCollectionChange,
      value: collection.id.toString()
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      inline: true,
      htmlFor: `collection-${collection.id}`
    }, collection.name))) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "No collections available"))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Customer Groups"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      maxHeight: "200px",
      overflow: "auto",
      border: "1px solid",
      borderColor: "grey20",
      p: "md"
    }, customerGroups.length > 0 ? customerGroups.map(group => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "sm",
      key: group.id
    }, /*#__PURE__*/React__default.default.createElement(designSystem.CheckBox, {
      id: `group-${group.id}`,
      checked: selectedCustomerGroups.includes(group.id),
      onChange: handleCustomerGroupChange,
      value: group.id.toString()
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      inline: true,
      htmlFor: `group-${group.id}`
    }, group.name))) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "No customer groups available")))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      type: "submit",
      disabled: loading
    }, loading ? /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null) : record.id ? 'Update Discount' : 'Create Discount')));
  };

  const DiscountStatistics = () => {
    const [statistics, setStatistics] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
      const fetchStatistics = async () => {
        try {
          setLoading(true);
          const response = await fetch('/admin/api/discount-statistics');
          if (response.ok) {
            const data = await response.json();
            setStatistics(data);
          } else {
            const errorData = await response.json();
            setError(errorData.error || 'Failed to load discount statistics');
          }
        } catch (error) {
          console.error('Error fetching discount statistics:', error);
          setError('Failed to load discount statistics');
        } finally {
          setLoading(false);
        }
      };
      fetchStatistics();
    }, []);
    if (loading) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        p: "xl",
        textAlign: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading discount statistics..."));
    }
    if (error) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        p: "xl",
        textAlign: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
        variant: "Rocket",
        width: 100,
        height: 100
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, error));
    }
    if (!statistics) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        p: "xl",
        textAlign: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "No statistics available"));
    }

    // Format currency amount
    const formatCurrency = amount => {
      return amount.toFixed(2);
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H4, {
      mb: "lg"
    }, "Discount Statistics"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      flexDirection: ['column', 'row'],
      flexWrap: "wrap"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: 1,
      p: "lg",
      bg: "white",
      mr: "lg",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 3]
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "Total Discounts"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold",
      fontSize: "xl"
    }, statistics.totalDiscounts), /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "DocumentSearch",
      width: 40,
      height: 40
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: 1,
      p: "lg",
      bg: "white",
      mr: "lg",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 3]
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "Active Discounts"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold",
      fontSize: "xl"
    }, statistics.activeDiscounts), /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "DocumentCheck",
      width: 40,
      height: 40
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: 1,
      p: "lg",
      bg: "white",
      mb: "lg",
      boxShadow: "card",
      width: [1, 1 / 3]
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "Total Discount Amount"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold",
      fontSize: "xl"
    }, "$", formatCurrency(statistics.totalDiscountAmount)), /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
      variant: "Planet",
      width: 40,
      height: 40
    })))), statistics.mostUsedDiscount && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "lg",
      bg: "white",
      boxShadow: "card",
      mt: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      mb: "md"
    }, "Most Used Discount"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold"
    }, statistics.mostUsedDiscount.name, " (", statistics.mostUsedDiscount.code, ")"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm"
    }, "Used ", statistics.mostUsedDiscount.usedCount, " times")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "a",
      href: `/admin/resources/Discount/records/${statistics.mostUsedDiscount.id}/show`,
      py: "sm",
      px: "lg",
      bg: "primary100",
      color: "white",
      borderRadius: "default",
      style: {
        textDecoration: 'none'
      }
    }, "View Details"))));
  };

  // Create styled components for inputs
  const TextInput$7 = _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const StatusSelect$3 = _default.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  background-color: white;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const OrderForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      customer_id: '',
      channel_id: '',
      status: 'pending',
      reference: '',
      customer_reference: '',
      sub_total: 0,
      discount_total: 0,
      shipping_total: 0,
      tax_total: 0,
      total: 0,
      notes: '',
      currency_code: 'USD',
      compare_currency_code: '',
      exchange_rate: 1,
      meta: {}
    });
    const [customers, setCustomers] = React.useState([]);
    const [channels, setChannels] = React.useState([]);
    const api = new adminjs.ApiClient();

    // Fetch customers and channels on component mount
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          // Fetch each resource individually with error handling
          try {
            const customersResponse = await api.resourceAction({
              resourceId: 'lunar_customers',
              actionName: 'list'
            });
            setCustomers(customersResponse.data.records || []);
          } catch (error) {
            console.warn('Error fetching customers:', error);
            setCustomers([]);
          }
          try {
            const channelsResponse = await api.resourceAction({
              resourceId: 'lunar_channels',
              actionName: 'list'
            });
            setChannels(channelsResponse.data.records || []);
          } catch (error) {
            console.warn('Error fetching channels:', error);
            setChannels([]);
          }

          // If editing, load the order data
          if (isEditing) {
            setFormData({
              customer_id: record.params.customer_id || '',
              channel_id: record.params.channel_id || '',
              status: record.params.status || 'pending',
              reference: record.params.reference || '',
              customer_reference: record.params.customer_reference || '',
              sub_total: record.params.sub_total || 0,
              discount_total: record.params.discount_total || 0,
              shipping_total: record.params.shipping_total || 0,
              tax_total: record.params.tax_total || 0,
              total: record.params.total || 0,
              notes: record.params.notes || '',
              currency_code: record.params.currency_code || 'USD',
              compare_currency_code: record.params.compare_currency_code || '',
              exchange_rate: record.params.exchange_rate || 1,
              meta: record.params.meta || {}
            });
          }
        } catch (e) {
          console.error('Error loading form data:', e);
          setError('Failed to load form data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [isEditing, record]);
    const handleInputChange = e => {
      const {
        name,
        value,
        type
      } = e.target;

      // Handle numeric fields
      if (name === 'sub_total' || name === 'discount_total' || name === 'shipping_total' || name === 'tax_total' || name === 'total' || name === 'exchange_rate') {
        const numValue = type === 'number' ? parseFloat(value) : value;
        setFormData(prev => ({
          ...prev,
          [name]: numValue
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    };
    const calculateTotal = () => {
      // Convert numeric values safely using Number() instead of parseFloat
      const subTotal = Number(formData.sub_total) || 0;
      const discountTotal = Number(formData.discount_total) || 0;
      const shippingTotal = Number(formData.shipping_total) || 0;
      const taxTotal = Number(formData.tax_total) || 0;
      const total = subTotal - discountTotal + shippingTotal + taxTotal;
      setFormData(prev => ({
        ...prev,
        total
      }));
    };
    React.useEffect(() => {
      calculateTotal();
    }, [formData.sub_total, formData.discount_total, formData.shipping_total, formData.tax_total]);
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const apiEndpoint = isEditing ? `/admin/api/resources/lunar_orders/records/${record.id}` : '/admin/api/resources/lunar_orders/actions/new';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(apiEndpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred while saving the order');
        }
        const data = await response.json();
        setSuccess(true);

        // Redirect to the order list after a short delay if creating new order
        if (!isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/resources/lunar_orders';
          }, 1500);
        }
      } catch (e) {
        console.error('Error saving order:', e);
        setError(e.message || 'Failed to save order. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (loading && !formData.status) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading..."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "xl"
    }, isEditing ? 'Edit Order' : 'Create New Order'), error && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: error,
      variant: "danger"
    }), success && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: "Order saved successfully!",
      variant: "success"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Customer"), /*#__PURE__*/React__default.default.createElement(StatusSelect$3, {
      name: "customer_id",
      value: formData.customer_id,
      onChange: handleInputChange
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select Customer"), customers.map(customer => /*#__PURE__*/React__default.default.createElement("option", {
      key: customer.id,
      value: customer.id
    }, customer.params.first_name, " ", customer.params.last_name)))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Channel"), /*#__PURE__*/React__default.default.createElement(StatusSelect$3, {
      name: "channel_id",
      value: formData.channel_id,
      onChange: handleInputChange
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select Channel"), channels.map(channel => /*#__PURE__*/React__default.default.createElement("option", {
      key: channel.id,
      value: channel.id
    }, channel.params.name)))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Status"), /*#__PURE__*/React__default.default.createElement(StatusSelect$3, {
      name: "status",
      value: formData.status,
      onChange: handleInputChange,
      required: true
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: "pending"
    }, "Pending"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "processing"
    }, "Processing"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "completed"
    }, "Completed"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "cancelled"
    }, "Cancelled"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "refunded"
    }, "Refunded"))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Reference"), /*#__PURE__*/React__default.default.createElement(TextInput$7, {
      name: "reference",
      value: formData.reference,
      onChange: handleInputChange,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Customer Reference"), /*#__PURE__*/React__default.default.createElement(TextInput$7, {
      name: "customer_reference",
      value: formData.customer_reference,
      onChange: handleInputChange
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Sub Total"), /*#__PURE__*/React__default.default.createElement(TextInput$7, {
      type: "number",
      name: "sub_total",
      value: formData.sub_total,
      onChange: handleInputChange,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Discount Total"), /*#__PURE__*/React__default.default.createElement(TextInput$7, {
      type: "number",
      name: "discount_total",
      value: formData.discount_total,
      onChange: handleInputChange,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Shipping Total"), /*#__PURE__*/React__default.default.createElement(TextInput$7, {
      type: "number",
      name: "shipping_total",
      value: formData.shipping_total,
      onChange: handleInputChange,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Tax Total"), /*#__PURE__*/React__default.default.createElement(TextInput$7, {
      type: "number",
      name: "tax_total",
      value: formData.tax_total,
      onChange: handleInputChange,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Total"), /*#__PURE__*/React__default.default.createElement(TextInput$7, {
      type: "number",
      name: "total",
      value: formData.total,
      onChange: handleInputChange,
      disabled: true,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Notes"), /*#__PURE__*/React__default.default.createElement(designSystem.TextArea, {
      name: "notes",
      value: formData.notes,
      onChange: handleInputChange
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Currency Code"), /*#__PURE__*/React__default.default.createElement(TextInput$7, {
      name: "currency_code",
      value: formData.currency_code,
      onChange: handleInputChange,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Compare Currency Code"), /*#__PURE__*/React__default.default.createElement(TextInput$7, {
      name: "compare_currency_code",
      value: formData.compare_currency_code,
      onChange: handleInputChange
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Exchange Rate"), /*#__PURE__*/React__default.default.createElement(TextInput$7, {
      type: "number",
      name: "exchange_rate",
      value: formData.exchange_rate,
      onChange: handleInputChange,
      required: true
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      type: "submit",
      disabled: loading
    }, loading ? 'Saving...' : 'Save Order')));
  };

  // Create styled components for inputs
  const TextInput$6 = _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  _default.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  background-color: white;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const Switch$3 = _default.input.attrs({
    type: 'checkbox'
  })`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #e4e7ea;
  border-radius: 10px;
  transition: background-color 0.3s;
  cursor: pointer;
  
  &:checked {
    background-color: #1DC9A4;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 1px;
    left: 1px;
    transition: transform 0.3s;
  }
  
  &:checked::before {
    transform: translateX(20px);
  }
`;
  const BrandForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: '',
      is_active: true
    });
    new adminjs.ApiClient();

    // Load brand data if editing
    React.useEffect(() => {
      if (isEditing) {
        setFormData({
          name: record.params.name || '',
          is_active: record.params.is_active !== false
        });
      }
    }, [isEditing, record]);
    const handleInputChange = e => {
      const {
        name,
        value,
        type,
        checked
      } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const apiEndpoint = isEditing ? `/admin/api/brands/${record.id}` : '/admin/api/brands';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(apiEndpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred while saving the brand');
        }
        const data = await response.json();
        setSuccess(true);

        // Redirect to the brand list after a short delay if creating new brand
        if (!isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/resources/Brand';
          }, 1500);
        }
      } catch (e) {
        console.error('Error saving brand:', e);
        setError(e.message || 'Failed to save brand. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (loading && !formData.name && isEditing) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading..."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "xl"
    }, isEditing ? 'Edit Brand' : 'Create New Brand'), error && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: error,
      variant: "danger"
    }), success && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: "Brand saved successfully!",
      variant: "success"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Brand Name"), /*#__PURE__*/React__default.default.createElement(TextInput$6, {
      name: "name",
      value: formData.name,
      onChange: handleInputChange,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Active"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "default"
    }, /*#__PURE__*/React__default.default.createElement(Switch$3, {
      name: "is_active",
      checked: formData.is_active,
      onChange: handleInputChange
    })))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      type: "submit",
      disabled: loading
    }, loading ? 'Saving...' : 'Save Brand')));
  };

  // Create styled components for inputs
  const TextInput$5 = _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const Switch$2 = _default.input.attrs({
    type: 'checkbox'
  })`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #e4e7ea;
  border-radius: 10px;
  transition: background-color 0.3s;
  cursor: pointer;
  
  &:checked {
    background-color: #1DC9A4;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 1px;
    left: 1px;
    transition: transform 0.3s;
  }
  
  &:checked::before {
    transform: translateX(20px);
  }
`;
  const CustomerGroupForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: '',
      handle: '',
      is_default: false,
      description: ''
    });
    new adminjs.ApiClient();

    // Load customer group data if editing
    React.useEffect(() => {
      if (isEditing) {
        setFormData({
          name: record.params.name || '',
          handle: record.params.handle || '',
          is_default: record.params.is_default === true,
          description: record.params.description || ''
        });
      }
    }, [isEditing, record]);
    const handleInputChange = e => {
      const {
        name,
        value,
        type,
        checked
      } = e.target;
      if (name === 'name' && !isEditing) {
        // Auto-generate handle from name
        const handle = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        setFormData(prev => ({
          ...prev,
          [name]: value,
          handle
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      }
    };
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const apiEndpoint = isEditing ? `/admin/api/customer-groups/${record.id}` : '/admin/api/customer-groups';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(apiEndpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred while saving the customer group');
        }
        const data = await response.json();
        setSuccess(true);

        // Redirect to the customer group list after a short delay if creating new group
        if (!isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/resources/CustomerGroup';
          }, 1500);
        }
      } catch (e) {
        console.error('Error saving customer group:', e);
        setError(e.message || 'Failed to save customer group. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (loading && !formData.name && isEditing) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading..."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "xl"
    }, isEditing ? 'Edit Customer Group' : 'Create New Customer Group'), error && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: error,
      variant: "danger"
    }), success && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: "Customer group saved successfully!",
      variant: "success"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Group Name"), /*#__PURE__*/React__default.default.createElement(TextInput$5, {
      name: "name",
      value: formData.name,
      onChange: handleInputChange,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Handle"), /*#__PURE__*/React__default.default.createElement(TextInput$5, {
      name: "handle",
      value: formData.handle,
      onChange: handleInputChange,
      required: true
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      as: "p",
      fontSize: "sm",
      color: "grey80"
    }, "Used in URLs and API calls. Auto-generated from name if left empty.")), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Description"), /*#__PURE__*/React__default.default.createElement(designSystem.TextArea, {
      name: "description",
      value: formData.description,
      onChange: handleInputChange
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Default Group"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "default"
    }, /*#__PURE__*/React__default.default.createElement(Switch$2, {
      name: "is_default",
      checked: formData.is_default,
      onChange: handleInputChange
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      as: "p",
      fontSize: "sm",
      color: "grey80"
    }, "If enabled, new customers will automatically be assigned to this group.")))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      type: "submit",
      disabled: loading
    }, loading ? 'Saving...' : 'Save Customer Group')));
  };

  // Create styled components for inputs
  const TextInput$4 = _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const StatusSelect$2 = _default.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  background-color: white;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const CartForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      user_id: '',
      customer_id: '',
      merged_id: '',
      channel_id: '',
      currency_id: '',
      coupon_code: '',
      completed_at: null,
      meta: {}
    });
    const [customers, setCustomers] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [channels, setChannels] = React.useState([]);
    const [currencies, setCurrencies] = React.useState([]);
    const api = new adminjs.ApiClient();

    // Fetch related data on component mount
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          // Fetch each resource individually with error handling
          try {
            const customersResponse = await api.resourceAction({
              resourceId: 'lunar_customers',
              actionName: 'list'
            });
            setCustomers(customersResponse.data.records || []);
          } catch (error) {
            console.warn('Error fetching customers:', error);
            setCustomers([]);
          }
          try {
            const usersResponse = await api.resourceAction({
              resourceId: 'users',
              actionName: 'list'
            });
            setUsers(usersResponse.data.records || []);
          } catch (error) {
            console.warn('Error fetching users:', error);
            setUsers([]);
          }
          try {
            const channelsResponse = await api.resourceAction({
              resourceId: 'lunar_channels',
              actionName: 'list'
            });
            setChannels(channelsResponse.data.records || []);
          } catch (error) {
            console.warn('Error fetching channels:', error);
            setChannels([]);
          }
          try {
            const currenciesResponse = await api.resourceAction({
              resourceId: 'lunar_currencies',
              actionName: 'list'
            });
            setCurrencies(currenciesResponse.data.records || []);
          } catch (error) {
            console.warn('Error fetching currencies:', error);
            setCurrencies([]);
          }

          // If editing, load the cart data
          if (isEditing) {
            setFormData({
              user_id: record.params.user_id || '',
              customer_id: record.params.customer_id || '',
              merged_id: record.params.merged_id || '',
              channel_id: record.params.channel_id || '',
              currency_id: record.params.currency_id || '',
              coupon_code: record.params.coupon_code || '',
              completed_at: record.params.completed_at || null,
              meta: record.params.meta || {}
            });
          }
        } catch (e) {
          console.error('Error loading form data:', e);
          setError('Failed to load form data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [isEditing, record]);
    const handleInputChange = e => {
      const {
        name,
        value
      } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const apiEndpoint = isEditing ? `/admin/api/resources/lunar_carts/records/${record.id}` : '/admin/api/resources/lunar_carts/actions/new';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(apiEndpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred while saving the cart');
        }
        const data = await response.json();
        setSuccess(true);

        // Redirect to the cart list after a short delay if creating new cart
        if (!isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/resources/lunar_carts';
          }, 1500);
        }
      } catch (e) {
        console.error('Error saving cart:', e);
        setError(e.message || 'Failed to save cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (loading && !formData.customer_id && isEditing) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading..."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "xl"
    }, isEditing ? 'Edit Cart' : 'Create New Cart'), error && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: error,
      variant: "danger"
    }), success && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: "Cart saved successfully!",
      variant: "success"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "User"), /*#__PURE__*/React__default.default.createElement(StatusSelect$2, {
      name: "user_id",
      value: formData.user_id,
      onChange: handleInputChange
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select User"), users.map(user => /*#__PURE__*/React__default.default.createElement("option", {
      key: user.id,
      value: user.id
    }, user.params.email)))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Customer"), /*#__PURE__*/React__default.default.createElement(StatusSelect$2, {
      name: "customer_id",
      value: formData.customer_id,
      onChange: handleInputChange
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select Customer"), customers.map(customer => /*#__PURE__*/React__default.default.createElement("option", {
      key: customer.id,
      value: customer.id
    }, customer.params.first_name, " ", customer.params.last_name)))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Channel"), /*#__PURE__*/React__default.default.createElement(StatusSelect$2, {
      name: "channel_id",
      value: formData.channel_id,
      onChange: handleInputChange
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select Channel"), channels.map(channel => /*#__PURE__*/React__default.default.createElement("option", {
      key: channel.id,
      value: channel.id
    }, channel.params.name)))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Currency"), /*#__PURE__*/React__default.default.createElement(StatusSelect$2, {
      name: "currency_id",
      value: formData.currency_id,
      onChange: handleInputChange
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select Currency"), currencies.map(currency => /*#__PURE__*/React__default.default.createElement("option", {
      key: currency.id,
      value: currency.id
    }, currency.params.code, " (", currency.params.name, ")")))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Coupon Code"), /*#__PURE__*/React__default.default.createElement(TextInput$4, {
      name: "coupon_code",
      value: formData.coupon_code,
      onChange: handleInputChange
    })), isEditing && /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Completed At"), /*#__PURE__*/React__default.default.createElement(TextInput$4, {
      type: "datetime-local",
      name: "completed_at",
      value: formData.completed_at ? new Date(formData.completed_at).toISOString().slice(0, 16) : '',
      onChange: handleInputChange
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      type: "submit",
      disabled: loading
    }, loading ? 'Saving...' : 'Save Cart')));
  };

  // Create styled components for inputs
  const TextInput$3 = _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const StatusSelect$1 = _default.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  background-color: white;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const Switch$1 = _default.input.attrs({
    type: 'checkbox'
  })`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #e4e7ea;
  border-radius: 10px;
  transition: background-color 0.3s;
  cursor: pointer;
  
  &:checked {
    background-color: #1DC9A4;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 1px;
    left: 1px;
    transition: transform 0.3s;
  }
  
  &:checked::before {
    transform: translateX(20px);
  }
`;
  const TaxRateForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      tax_class_id: '',
      tax_zone_id: '',
      name: '',
      priority: 0,
      is_active: true
    });
    const [taxClasses, setTaxClasses] = React.useState([]);
    const [taxZones, setTaxZones] = React.useState([]);
    const api = new adminjs.ApiClient();

    // Fetch related data on component mount
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const [taxClassesResponse, taxZonesResponse] = await Promise.all([api.resourceAction({
            resourceId: 'TaxClass',
            actionName: 'list'
          }), api.resourceAction({
            resourceId: 'TaxZone',
            actionName: 'list'
          })]);
          setTaxClasses(taxClassesResponse.data.records || []);
          setTaxZones(taxZonesResponse.data.records || []);

          // If editing, load the tax rate data
          if (isEditing) {
            setFormData({
              tax_class_id: record.params.tax_class_id || '',
              tax_zone_id: record.params.tax_zone_id || '',
              name: record.params.name || '',
              priority: record.params.priority || 0,
              is_active: record.params.is_active !== false
            });
          }
        } catch (e) {
          console.error('Error loading form data:', e);
          setError('Failed to load form data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [isEditing, record]);
    const handleInputChange = e => {
      const {
        name,
        value,
        type,
        checked
      } = e.target;
      if (name === 'priority') {
        setFormData(prev => ({
          ...prev,
          [name]: parseInt(value) || 0
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      }
    };
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const apiEndpoint = isEditing ? `/admin/api/tax-rates/${record.id}` : '/admin/api/tax-rates';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(apiEndpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred while saving the tax rate');
        }
        const data = await response.json();
        setSuccess(true);

        // Redirect to the tax rate list after a short delay if creating new tax rate
        if (!isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/resources/TaxRate';
          }, 1500);
        }
      } catch (e) {
        console.error('Error saving tax rate:', e);
        setError(e.message || 'Failed to save tax rate. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (loading && !formData.name && isEditing) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading..."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "xl"
    }, isEditing ? 'Edit Tax Rate' : 'Create New Tax Rate'), error && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: error,
      variant: "danger"
    }), success && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: "Tax rate saved successfully!",
      variant: "success"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Name"), /*#__PURE__*/React__default.default.createElement(TextInput$3, {
      name: "name",
      value: formData.name,
      onChange: handleInputChange,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Tax Class"), /*#__PURE__*/React__default.default.createElement(StatusSelect$1, {
      name: "tax_class_id",
      value: formData.tax_class_id,
      onChange: handleInputChange,
      required: true
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select Tax Class"), taxClasses.map(taxClass => /*#__PURE__*/React__default.default.createElement("option", {
      key: taxClass.id,
      value: taxClass.id
    }, taxClass.params.name)))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Tax Zone"), /*#__PURE__*/React__default.default.createElement(StatusSelect$1, {
      name: "tax_zone_id",
      value: formData.tax_zone_id,
      onChange: handleInputChange,
      required: true
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select Tax Zone"), taxZones.map(taxZone => /*#__PURE__*/React__default.default.createElement("option", {
      key: taxZone.id,
      value: taxZone.id
    }, taxZone.params.name)))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Priority"), /*#__PURE__*/React__default.default.createElement(TextInput$3, {
      type: "number",
      name: "priority",
      value: formData.priority,
      onChange: handleInputChange,
      required: true
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      as: "p",
      fontSize: "sm",
      color: "grey80"
    }, "Higher priority tax rates will be applied first.")), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Active"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "default"
    }, /*#__PURE__*/React__default.default.createElement(Switch$1, {
      name: "is_active",
      checked: formData.is_active,
      onChange: handleInputChange
    })))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      type: "submit",
      disabled: loading
    }, loading ? 'Saving...' : 'Save Tax Rate')));
  };

  // Create styled components for inputs
  const TextInput$2 = _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const ProductTypeForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: ''
    });
    new adminjs.ApiClient();

    // Load product type data if editing
    React.useEffect(() => {
      if (isEditing) {
        setFormData({
          name: record.params.name || ''
        });
      }
    }, [isEditing, record]);
    const handleInputChange = e => {
      const {
        name,
        value
      } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const apiEndpoint = isEditing ? `/admin/api/product-types/${record.id}` : '/admin/api/product-types';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(apiEndpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred while saving the product type');
        }
        const data = await response.json();
        setSuccess(true);

        // Redirect to the product type list after a short delay if creating new product type
        if (!isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/resources/ProductType';
          }, 1500);
        }
      } catch (e) {
        console.error('Error saving product type:', e);
        setError(e.message || 'Failed to save product type. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (loading && !formData.name && isEditing) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading..."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "xl"
    }, isEditing ? 'Edit Product Type' : 'Create New Product Type'), error && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: error,
      variant: "danger"
    }), success && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: "Product type saved successfully!",
      variant: "success"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Name"), /*#__PURE__*/React__default.default.createElement(TextInput$2, {
      name: "name",
      value: formData.name,
      onChange: handleInputChange,
      required: true
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      type: "submit",
      disabled: loading
    }, loading ? 'Saving...' : 'Save Product Type')));
  };

  // Create styled components for inputs
  const TextInput$1 = _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const TaxClassForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: ''
    });
    new adminjs.ApiClient();

    // Load tax class data if editing
    React.useEffect(() => {
      if (isEditing) {
        setFormData({
          name: record.params.name || ''
        });
      }
    }, [isEditing, record]);
    const handleInputChange = e => {
      const {
        name,
        value
      } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const apiEndpoint = isEditing ? `/admin/api/tax-classes/${record.id}` : '/admin/api/tax-classes';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(apiEndpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred while saving the tax class');
        }
        const data = await response.json();
        setSuccess(true);

        // Redirect to the tax class list after a short delay if creating new tax class
        if (!isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/resources/TaxClass';
          }, 1500);
        }
      } catch (e) {
        console.error('Error saving tax class:', e);
        setError(e.message || 'Failed to save tax class. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (loading && !formData.name && isEditing) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading..."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "xl"
    }, isEditing ? 'Edit Tax Class' : 'Create New Tax Class'), error && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: error,
      variant: "danger"
    }), success && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: "Tax class saved successfully!",
      variant: "success"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Name"), /*#__PURE__*/React__default.default.createElement(TextInput$1, {
      name: "name",
      value: formData.name,
      onChange: handleInputChange,
      required: true
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      as: "p",
      fontSize: "sm",
      color: "grey80"
    }, "Examples: Standard Rate, Reduced Rate, Zero Rate, etc."))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      type: "submit",
      disabled: loading
    }, loading ? 'Saving...' : 'Save Tax Class')));
  };

  // Create styled components for inputs
  const TextInput = _default.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const StatusSelect = _default.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  background-color: white;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
  const Switch = _default.input.attrs({
    type: 'checkbox'
  })`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #e4e7ea;
  border-radius: 10px;
  transition: background-color 0.3s;
  cursor: pointer;
  
  &:checked {
    background-color: #1DC9A4;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 1px;
    left: 1px;
    transition: transform 0.3s;
  }
  
  &:checked::before {
    transform: translateX(20px);
  }
`;
  const TaxZoneForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: '',
      zone_type: 'country',
      price_display: 'tax_inclusive',
      active: true,
      default: false
    });
    new adminjs.ApiClient();

    // Load tax zone data if editing
    React.useEffect(() => {
      if (isEditing) {
        setFormData({
          name: record.params.name || '',
          zone_type: record.params.zone_type || 'country',
          price_display: record.params.price_display || 'tax_inclusive',
          active: record.params.active !== false,
          default: record.params.default === true
        });
      }
    }, [isEditing, record]);
    const handleInputChange = e => {
      const {
        name,
        value,
        type,
        checked
      } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const apiEndpoint = isEditing ? `/admin/api/tax-zones/${record.id}` : '/admin/api/tax-zones';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(apiEndpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred while saving the tax zone');
        }
        const data = await response.json();
        setSuccess(true);

        // Redirect to the tax zone list after a short delay if creating new tax zone
        if (!isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/resources/TaxZone';
          }, 1500);
        }
      } catch (e) {
        console.error('Error saving tax zone:', e);
        setError(e.message || 'Failed to save tax zone. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (loading && !formData.name && isEditing) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "default"
      }, "Loading..."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "xl"
    }, isEditing ? 'Edit Tax Zone' : 'Create New Tax Zone'), error && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: error,
      variant: "danger"
    }), success && /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      mb: "xl",
      message: "Tax zone saved successfully!",
      variant: "success"
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Name"), /*#__PURE__*/React__default.default.createElement(TextInput, {
      name: "name",
      value: formData.name,
      onChange: handleInputChange,
      required: true
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      as: "p",
      fontSize: "sm",
      color: "grey80"
    }, "Examples: EU Zone, UK, North America, etc.")), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Zone Type"), /*#__PURE__*/React__default.default.createElement(StatusSelect, {
      name: "zone_type",
      value: formData.zone_type,
      onChange: handleInputChange,
      required: true
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: "country"
    }, "Country"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "state"
    }, "State/Region"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "postcode"
    }, "Postcode/ZIP"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "customer_group"
    }, "Customer Group")), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      as: "p",
      fontSize: "sm",
      color: "grey80"
    }, "Determines how this zone will be applied.")), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Price Display"), /*#__PURE__*/React__default.default.createElement(StatusSelect, {
      name: "price_display",
      value: formData.price_display,
      onChange: handleInputChange,
      required: true
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: "tax_inclusive"
    }, "Tax Inclusive"), /*#__PURE__*/React__default.default.createElement("option", {
      value: "tax_exclusive"
    }, "Tax Exclusive")), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      as: "p",
      fontSize: "sm",
      color: "grey80"
    }, "How should prices be displayed in this zone.")), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Active"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "default"
    }, /*#__PURE__*/React__default.default.createElement(Switch, {
      name: "active",
      checked: formData.active,
      onChange: handleInputChange
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Default Zone"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "default"
    }, /*#__PURE__*/React__default.default.createElement(Switch, {
      name: "default",
      checked: formData.default,
      onChange: handleInputChange
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      mt: "sm",
      as: "p",
      fontSize: "sm",
      color: "grey80"
    }, "If enabled, this zone will be used as the default when no other zone matches.")))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      type: "submit",
      disabled: loading
    }, loading ? 'Saving...' : 'Save Tax Zone')));
  };

  const AttributeGroupForm = props => {
    const {
      record,
      onChange
    } = props;
    const [name, setName] = React.useState(record?.params?.name ? JSON.stringify(record.params.name) : '');
    const [handle, setHandle] = React.useState(record?.params?.handle || '');
    const [position, setPosition] = React.useState(record?.params?.position || 0);
    const [attributableType, setAttributableType] = React.useState(record?.params?.attributable_type || '');
    const handleSubmit = e => {
      e.preventDefault();
      const data = {
        name: JSON.parse(name),
        handle,
        position: parseInt(position),
        attributable_type: attributableType
      };
      onChange(data);
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Name (JSON)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: name,
      onChange: e => setName(e.target.value),
      placeholder: "{\"en\": \"Group Name\"}"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Handle"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: handle,
      onChange: e => setHandle(e.target.value)
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Position"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      value: position,
      onChange: e => setPosition(e.target.value)
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Attributable Type"), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      value: attributableType,
      onChange: e => setAttributableType(e.target.value),
      options: [{
        value: 'product',
        label: 'Product'
      }, {
        value: 'collection',
        label: 'Collection'
      }]
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "submit"
    }, "Save"));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.AttributeEditor = AttributeEditor;
  AdminJS.UserComponents.Dashboard = Dashboard;
  AdminJS.UserComponents.ProductForm = ProductForm;
  AdminJS.UserComponents.ProductVariantForm = ProductVariantForm;
  AdminJS.UserComponents.CollectionForm = CollectionForm;
  AdminJS.UserComponents.CustomerForm = CustomerForm;
  AdminJS.UserComponents.CustomerStatistics = CustomerStatistics;
  AdminJS.UserComponents.DiscountForm = DiscountForm;
  AdminJS.UserComponents.DiscountStatistics = DiscountStatistics;
  AdminJS.UserComponents.OrderForm = OrderForm;
  AdminJS.UserComponents.BrandForm = BrandForm;
  AdminJS.UserComponents.CustomerGroupForm = CustomerGroupForm;
  AdminJS.UserComponents.CartForm = CartForm;
  AdminJS.UserComponents.TaxRateForm = TaxRateForm;
  AdminJS.UserComponents.ProductTypeForm = ProductTypeForm;
  AdminJS.UserComponents.TaxClassForm = TaxClassForm;
  AdminJS.UserComponents.TaxZoneForm = TaxZoneForm;
  AdminJS.UserComponents.AttributeGroupForm = AttributeGroupForm;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3NoYWxsb3dlcXVhbC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9zdHlsaXMvZGlzdC9zdHlsaXMuYnJvd3Nlci5janMuanMiLCIuLi9ub2RlX21vZHVsZXMvc3R5bGVkLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BlbW90aW9uL3VuaXRsZXNzL2Rpc3QvdW5pdGxlc3MuYnJvd3Nlci5janMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vbWVtb2l6ZS9kaXN0L2Vtb3Rpb24tbWVtb2l6ZS5lc20uanMiLCIuLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vaXMtcHJvcC12YWxpZC9kaXN0L2Vtb3Rpb24taXMtcHJvcC12YWxpZC5lc20uanMiLCIuLi9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3Mvbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvZGlzdC9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy5janMuanMiLCIuLi9ub2RlX21vZHVsZXMvc3R5bGVkLWNvbXBvbmVudHMvZGlzdC9zdHlsZWQtY29tcG9uZW50cy5icm93c2VyLmNqcy5qcyIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL2F0dHJpYnV0ZS1lZGl0b3IudHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvY3VzdG9tZXItc3RhdGlzdGljcy50c3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9kYXNoYm9hcmQudHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvcHJvZHVjdC1mb3JtLnRzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL3Byb2R1Y3QtdmFyaWFudC1mb3JtLnRzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tZm9ybS50c3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9jdXN0b21lci1mb3JtLnRzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL2Rpc2NvdW50LWZvcm0udHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvZGlzY291bnQtc3RhdGlzdGljcy50c3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9vcmRlci1mb3JtLnRzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL2JyYW5kLWZvcm0udHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvY3VzdG9tZXItZ3JvdXAtZm9ybS50c3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9jYXJ0LWZvcm0udHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvdGF4LXJhdGUtZm9ybS50c3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9wcm9kdWN0LXR5cGUtZm9ybS50c3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy90YXgtY2xhc3MtZm9ybS50c3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy90YXgtem9uZS1mb3JtLnRzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL2F0dHJpYnV0ZS1ncm91cC1mb3JtLnRzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2UgUmVhY3RcbiAqIHJlYWN0LWlzLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gQVRURU5USU9OXG4vLyBXaGVuIGFkZGluZyBuZXcgc3ltYm9scyB0byB0aGlzIGZpbGUsXG4vLyBQbGVhc2UgY29uc2lkZXIgYWxzbyBhZGRpbmcgdG8gJ3JlYWN0LWRldnRvb2xzLXNoYXJlZC9zcmMvYmFja2VuZC9SZWFjdFN5bWJvbHMnXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50Jyk7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKTtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKTtcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKTtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKTtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0Jyk7XG52YXIgUkVBQ1RfU0VSVkVSX0NPTlRFWFRfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnNlcnZlcl9jb250ZXh0Jyk7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJyk7XG52YXIgUkVBQ1RfU1VTUEVOU0VfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlJyk7XG52YXIgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2VfbGlzdCcpO1xudmFyIFJFQUNUX01FTU9fVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0Lm1lbW8nKTtcbnZhciBSRUFDVF9MQVpZX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5sYXp5Jyk7XG52YXIgUkVBQ1RfT0ZGU0NSRUVOX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5vZmZzY3JlZW4nKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGVuYWJsZVNjb3BlQVBJID0gZmFsc2U7IC8vIEV4cGVyaW1lbnRhbCBDcmVhdGUgRXZlbnQgSGFuZGxlIEFQSS5cbnZhciBlbmFibGVDYWNoZUVsZW1lbnQgPSBmYWxzZTtcbnZhciBlbmFibGVUcmFuc2l0aW9uVHJhY2luZyA9IGZhbHNlOyAvLyBObyBrbm93biBidWdzLCBidXQgbmVlZHMgcGVyZm9ybWFuY2UgdGVzdGluZ1xuXG52YXIgZW5hYmxlTGVnYWN5SGlkZGVuID0gZmFsc2U7IC8vIEVuYWJsZXMgdW5zdGFibGVfYXZvaWRUaGlzRmFsbGJhY2sgZmVhdHVyZSBpbiBGaWJlclxuLy8gc3R1ZmYuIEludGVuZGVkIHRvIGVuYWJsZSBSZWFjdCBjb3JlIG1lbWJlcnMgdG8gbW9yZSBlYXNpbHkgZGVidWcgc2NoZWR1bGluZ1xuLy8gaXNzdWVzIGluIERFViBidWlsZHMuXG5cbnZhciBlbmFibGVEZWJ1Z1RyYWNpbmcgPSBmYWxzZTsgLy8gVHJhY2sgd2hpY2ggRmliZXIocykgc2NoZWR1bGUgcmVuZGVyIHdvcmsuXG5cbnZhciBSRUFDVF9NT0RVTEVfUkVGRVJFTkNFO1xuXG57XG4gIFJFQUNUX01PRFVMRV9SRUZFUkVOQ0UgPSBTeW1ib2wuZm9yKCdyZWFjdC5tb2R1bGUucmVmZXJlbmNlJyk7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBOb3RlOiB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyAoZS5nLiBpZiBpdCdzIGEgcG9seWZpbGwpLlxuXG5cbiAgaWYgKHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCBlbmFibGVEZWJ1Z1RyYWNpbmcgIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgfHwgZW5hYmxlTGVnYWN5SGlkZGVuICB8fCB0eXBlID09PSBSRUFDVF9PRkZTQ1JFRU5fVFlQRSB8fCBlbmFibGVTY29wZUFQSSAgfHwgZW5hYmxlQ2FjaGVFbGVtZW50ICB8fCBlbmFibGVUcmFuc2l0aW9uVHJhY2luZyApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCkge1xuICAgIGlmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgLy8gVGhpcyBuZWVkcyB0byBpbmNsdWRlIGFsbCBwb3NzaWJsZSBtb2R1bGUgcmVmZXJlbmNlIG9iamVjdFxuICAgIC8vIHR5cGVzIHN1cHBvcnRlZCBieSBhbnkgRmxpZ2h0IGNvbmZpZ3VyYXRpb24gYW55d2hlcmUgc2luY2VcbiAgICAvLyB3ZSBkb24ndCBrbm93IHdoaWNoIEZsaWdodCBidWlsZCB0aGlzIHdpbGwgZW5kIHVwIGJlaW5nIHVzZWRcbiAgICAvLyB3aXRoLlxuICAgIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01PRFVMRV9SRUZFUkVOQ0UgfHwgdHlwZS5nZXRNb2R1bGVJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHR5cGVPZihvYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCkge1xuICAgIHZhciAkJHR5cGVvZiA9IG9iamVjdC4kJHR5cGVvZjtcblxuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfU0VSVkVSX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mVHlwZTtcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxudmFyIENvbnRleHRDb25zdW1lciA9IFJFQUNUX0NPTlRFWFRfVFlQRTtcbnZhciBDb250ZXh0UHJvdmlkZXIgPSBSRUFDVF9QUk9WSURFUl9UWVBFO1xudmFyIEVsZW1lbnQgPSBSRUFDVF9FTEVNRU5UX1RZUEU7XG52YXIgRm9yd2FyZFJlZiA9IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG52YXIgRnJhZ21lbnQgPSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xudmFyIExhenkgPSBSRUFDVF9MQVpZX1RZUEU7XG52YXIgTWVtbyA9IFJFQUNUX01FTU9fVFlQRTtcbnZhciBQb3J0YWwgPSBSRUFDVF9QT1JUQUxfVFlQRTtcbnZhciBQcm9maWxlciA9IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG52YXIgU3RyaWN0TW9kZSA9IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG52YXIgU3VzcGVuc2UgPSBSRUFDVF9TVVNQRU5TRV9UWVBFO1xudmFyIFN1c3BlbnNlTGlzdCA9IFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTtcbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlO1xudmFyIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQ29uY3VycmVudE1vZGUgPSBmYWxzZTsgLy8gQXN5bmNNb2RlIHNob3VsZCBiZSBkZXByZWNhdGVkXG5cbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlOyAvLyBVc2luZyBjb25zb2xlWyd3YXJuJ10gdG8gZXZhZGUgQmFiZWwgYW5kIEVTTGludFxuXG4gICAgICBjb25zb2xlWyd3YXJuJ10oJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE4Ky4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0NvbmN1cnJlbnRNb2RlKSB7XG4gICAgICBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0NvbmN1cnJlbnRNb2RlID0gdHJ1ZTsgLy8gVXNpbmcgY29uc29sZVsnd2FybiddIHRvIGV2YWRlIEJhYmVsIGFuZCBFU0xpbnRcblxuICAgICAgY29uc29sZVsnd2FybiddKCdUaGUgUmVhY3RJcy5pc0NvbmN1cnJlbnRNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE4Ky4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRDb25zdW1lcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05URVhUX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRQcm92aWRlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9WSURFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNGb3J3YXJkUmVmKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZyYWdtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0xhenkob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTEFaWV9UWVBFO1xufVxuZnVuY3Rpb24gaXNNZW1vKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX01FTU9fVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUG9ydGFsKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BPUlRBTF9UWVBFO1xufVxuZnVuY3Rpb24gaXNQcm9maWxlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdHJpY3RNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlTGlzdChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEU7XG59XG5cbmV4cG9ydHMuQ29udGV4dENvbnN1bWVyID0gQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5Db250ZXh0UHJvdmlkZXIgPSBDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLkVsZW1lbnQgPSBFbGVtZW50O1xuZXhwb3J0cy5Gb3J3YXJkUmVmID0gRm9yd2FyZFJlZjtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcbmV4cG9ydHMuTGF6eSA9IExhenk7XG5leHBvcnRzLk1lbW8gPSBNZW1vO1xuZXhwb3J0cy5Qb3J0YWwgPSBQb3J0YWw7XG5leHBvcnRzLlByb2ZpbGVyID0gUHJvZmlsZXI7XG5leHBvcnRzLlN0cmljdE1vZGUgPSBTdHJpY3RNb2RlO1xuZXhwb3J0cy5TdXNwZW5zZSA9IFN1c3BlbnNlO1xuZXhwb3J0cy5TdXNwZW5zZUxpc3QgPSBTdXNwZW5zZUxpc3Q7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbmV4cG9ydHMuaXNTdXNwZW5zZUxpc3QgPSBpc1N1c3BlbnNlTGlzdDtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlO1xuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsIi8vXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIsIGNvbXBhcmUsIGNvbXBhcmVDb250ZXh0KSB7XG4gIHZhciByZXQgPSBjb21wYXJlID8gY29tcGFyZS5jYWxsKGNvbXBhcmVDb250ZXh0LCBvYmpBLCBvYmpCKSA6IHZvaWQgMDtcblxuICBpZiAocmV0ICE9PSB2b2lkIDApIHtcbiAgICByZXR1cm4gISFyZXQ7XG4gIH1cblxuICBpZiAob2JqQSA9PT0gb2JqQikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmpBICE9PSBcIm9iamVjdFwiIHx8ICFvYmpBIHx8IHR5cGVvZiBvYmpCICE9PSBcIm9iamVjdFwiIHx8ICFvYmpCKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuXG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBiSGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmJpbmQob2JqQik7XG5cbiAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQi5cbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwga2V5c0EubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciBrZXkgPSBrZXlzQVtpZHhdO1xuXG4gICAgaWYgKCFiSGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZUEgPSBvYmpBW2tleV07XG4gICAgdmFyIHZhbHVlQiA9IG9iakJba2V5XTtcblxuICAgIHJldCA9IGNvbXBhcmUgPyBjb21wYXJlLmNhbGwoY29tcGFyZUNvbnRleHQsIHZhbHVlQSwgdmFsdWVCLCBrZXkpIDogdm9pZCAwO1xuXG4gICAgaWYgKHJldCA9PT0gZmFsc2UgfHwgKHJldCA9PT0gdm9pZCAwICYmIHZhbHVlQSAhPT0gdmFsdWVCKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gc3R5bGlzX21pbiAoVykge1xuICBmdW5jdGlvbiBNKGQsIGMsIGUsIGgsIGEpIHtcbiAgICBmb3IgKHZhciBtID0gMCwgYiA9IDAsIHYgPSAwLCBuID0gMCwgcSwgZywgeCA9IDAsIEsgPSAwLCBrLCB1ID0gayA9IHEgPSAwLCBsID0gMCwgciA9IDAsIEkgPSAwLCB0ID0gMCwgQiA9IGUubGVuZ3RoLCBKID0gQiAtIDEsIHksIGYgPSAnJywgcCA9ICcnLCBGID0gJycsIEcgPSAnJywgQzsgbCA8IEI7KSB7XG4gICAgICBnID0gZS5jaGFyQ29kZUF0KGwpO1xuICAgICAgbCA9PT0gSiAmJiAwICE9PSBiICsgbiArIHYgKyBtICYmICgwICE9PSBiICYmIChnID0gNDcgPT09IGIgPyAxMCA6IDQ3KSwgbiA9IHYgPSBtID0gMCwgQisrLCBKKyspO1xuXG4gICAgICBpZiAoMCA9PT0gYiArIG4gKyB2ICsgbSkge1xuICAgICAgICBpZiAobCA9PT0gSiAmJiAoMCA8IHIgJiYgKGYgPSBmLnJlcGxhY2UoTiwgJycpKSwgMCA8IGYudHJpbSgpLmxlbmd0aCkpIHtcbiAgICAgICAgICBzd2l0Y2ggKGcpIHtcbiAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBjYXNlIDU5OlxuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBmICs9IGUuY2hhckF0KGwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGcgPSA1OTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZykge1xuICAgICAgICAgIGNhc2UgMTIzOlxuICAgICAgICAgICAgZiA9IGYudHJpbSgpO1xuICAgICAgICAgICAgcSA9IGYuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgIGsgPSAxO1xuXG4gICAgICAgICAgICBmb3IgKHQgPSArK2w7IGwgPCBCOykge1xuICAgICAgICAgICAgICBzd2l0Y2ggKGcgPSBlLmNoYXJDb2RlQXQobCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDEyMzpcbiAgICAgICAgICAgICAgICAgIGsrKztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAxMjU6XG4gICAgICAgICAgICAgICAgICBrLS07XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgNDc6XG4gICAgICAgICAgICAgICAgICBzd2l0Y2ggKGcgPSBlLmNoYXJDb2RlQXQobCArIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDc6XG4gICAgICAgICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh1ID0gbCArIDE7IHUgPCBKOyArK3UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlLmNoYXJDb2RlQXQodSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDQyID09PSBnICYmIDQyID09PSBlLmNoYXJDb2RlQXQodSAtIDEpICYmIGwgKyAyICE9PSB1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSB1ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgYTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDQ3ID09PSBnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSB1ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgYTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGwgPSB1O1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgOTE6XG4gICAgICAgICAgICAgICAgICBnKys7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgICAgZysrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAzNDpcbiAgICAgICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgICAgZm9yICg7IGwrKyA8IEogJiYgZS5jaGFyQ29kZUF0KGwpICE9PSBnOykge1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoMCA9PT0gaykgYnJlYWs7XG4gICAgICAgICAgICAgIGwrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgayA9IGUuc3Vic3RyaW5nKHQsIGwpO1xuICAgICAgICAgICAgMCA9PT0gcSAmJiAocSA9IChmID0gZi5yZXBsYWNlKGNhLCAnJykudHJpbSgpKS5jaGFyQ29kZUF0KDApKTtcblxuICAgICAgICAgICAgc3dpdGNoIChxKSB7XG4gICAgICAgICAgICAgIGNhc2UgNjQ6XG4gICAgICAgICAgICAgICAgMCA8IHIgJiYgKGYgPSBmLnJlcGxhY2UoTiwgJycpKTtcbiAgICAgICAgICAgICAgICBnID0gZi5jaGFyQ29kZUF0KDEpO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChnKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIDEwMDpcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTA5OlxuICAgICAgICAgICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICAgICAgICBjYXNlIDQ1OlxuICAgICAgICAgICAgICAgICAgICByID0gYztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHIgPSBPO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGsgPSBNKGMsIHIsIGssIGcsIGEgKyAxKTtcbiAgICAgICAgICAgICAgICB0ID0gay5sZW5ndGg7XG4gICAgICAgICAgICAgICAgMCA8IEEgJiYgKHIgPSBYKE8sIGYsIEkpLCBDID0gSCgzLCBrLCByLCBjLCBELCB6LCB0LCBnLCBhLCBoKSwgZiA9IHIuam9pbignJyksIHZvaWQgMCAhPT0gQyAmJiAwID09PSAodCA9IChrID0gQy50cmltKCkpLmxlbmd0aCkgJiYgKGcgPSAwLCBrID0gJycpKTtcbiAgICAgICAgICAgICAgICBpZiAoMCA8IHQpIHN3aXRjaCAoZykge1xuICAgICAgICAgICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICAgICAgICAgIGYgPSBmLnJlcGxhY2UoZGEsIGVhKTtcblxuICAgICAgICAgICAgICAgICAgY2FzZSAxMDA6XG4gICAgICAgICAgICAgICAgICBjYXNlIDEwOTpcbiAgICAgICAgICAgICAgICAgIGNhc2UgNDU6XG4gICAgICAgICAgICAgICAgICAgIGsgPSBmICsgJ3snICsgayArICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgMTA3OlxuICAgICAgICAgICAgICAgICAgICBmID0gZi5yZXBsYWNlKGZhLCAnJDEgJDInKTtcbiAgICAgICAgICAgICAgICAgICAgayA9IGYgKyAneycgKyBrICsgJ30nO1xuICAgICAgICAgICAgICAgICAgICBrID0gMSA9PT0gdyB8fCAyID09PSB3ICYmIEwoJ0AnICsgaywgMykgPyAnQC13ZWJraXQtJyArIGsgKyAnQCcgKyBrIDogJ0AnICsgaztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGsgPSBmICsgaywgMTEyID09PSBoICYmIChrID0gKHAgKz0gaywgJycpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgayA9ICcnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgayA9IE0oYywgWChjLCBmLCBJKSwgaywgaCwgYSArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBGICs9IGs7XG4gICAgICAgICAgICBrID0gSSA9IHIgPSB1ID0gcSA9IDA7XG4gICAgICAgICAgICBmID0gJyc7XG4gICAgICAgICAgICBnID0gZS5jaGFyQ29kZUF0KCsrbCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMTI1OlxuICAgICAgICAgIGNhc2UgNTk6XG4gICAgICAgICAgICBmID0gKDAgPCByID8gZi5yZXBsYWNlKE4sICcnKSA6IGYpLnRyaW0oKTtcbiAgICAgICAgICAgIGlmICgxIDwgKHQgPSBmLmxlbmd0aCkpIHN3aXRjaCAoMCA9PT0gdSAmJiAocSA9IGYuY2hhckNvZGVBdCgwKSwgNDUgPT09IHEgfHwgOTYgPCBxICYmIDEyMyA+IHEpICYmICh0ID0gKGYgPSBmLnJlcGxhY2UoJyAnLCAnOicpKS5sZW5ndGgpLCAwIDwgQSAmJiB2b2lkIDAgIT09IChDID0gSCgxLCBmLCBjLCBkLCBELCB6LCBwLmxlbmd0aCwgaCwgYSwgaCkpICYmIDAgPT09ICh0ID0gKGYgPSBDLnRyaW0oKSkubGVuZ3RoKSAmJiAoZiA9ICdcXHgwMFxceDAwJyksIHEgPSBmLmNoYXJDb2RlQXQoMCksIGcgPSBmLmNoYXJDb2RlQXQoMSksIHEpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgNjQ6XG4gICAgICAgICAgICAgICAgaWYgKDEwNSA9PT0gZyB8fCA5OSA9PT0gZykge1xuICAgICAgICAgICAgICAgICAgRyArPSBmICsgZS5jaGFyQXQobCk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICA1OCAhPT0gZi5jaGFyQ29kZUF0KHQgLSAxKSAmJiAocCArPSBQKGYsIHEsIGcsIGYuY2hhckNvZGVBdCgyKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgSSA9IHIgPSB1ID0gcSA9IDA7XG4gICAgICAgICAgICBmID0gJyc7XG4gICAgICAgICAgICBnID0gZS5jaGFyQ29kZUF0KCsrbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChnKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgNDcgPT09IGIgPyBiID0gMCA6IDAgPT09IDEgKyBxICYmIDEwNyAhPT0gaCAmJiAwIDwgZi5sZW5ndGggJiYgKHIgPSAxLCBmICs9ICdcXHgwMCcpO1xuICAgICAgICAgIDAgPCBBICogWSAmJiBIKDAsIGYsIGMsIGQsIEQsIHosIHAubGVuZ3RoLCBoLCBhLCBoKTtcbiAgICAgICAgICB6ID0gMTtcbiAgICAgICAgICBEKys7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA1OTpcbiAgICAgICAgY2FzZSAxMjU6XG4gICAgICAgICAgaWYgKDAgPT09IGIgKyBuICsgdiArIG0pIHtcbiAgICAgICAgICAgIHorKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHorKztcbiAgICAgICAgICB5ID0gZS5jaGFyQXQobCk7XG5cbiAgICAgICAgICBzd2l0Y2ggKGcpIHtcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICAgIGlmICgwID09PSBuICsgbSArIGIpIHN3aXRjaCAoeCkge1xuICAgICAgICAgICAgICAgIGNhc2UgNDQ6XG4gICAgICAgICAgICAgICAgY2FzZSA1ODpcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICAgIHkgPSAnJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIDMyICE9PSBnICYmICh5ID0gJyAnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB5ID0gJ1xcXFwwJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgIHkgPSAnXFxcXGYnO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgeSA9ICdcXFxcdic7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAwID09PSBuICsgYiArIG0gJiYgKHIgPSBJID0gMSwgeSA9ICdcXGYnICsgeSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDEwODpcbiAgICAgICAgICAgICAgaWYgKDAgPT09IG4gKyBiICsgbSArIEUgJiYgMCA8IHUpIHN3aXRjaCAobCAtIHUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAxMTIgPT09IHggJiYgNTggPT09IGUuY2hhckNvZGVBdChsIC0gMykgJiYgKEUgPSB4KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgIDExMSA9PT0gSyAmJiAoRSA9IEspO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDU4OlxuICAgICAgICAgICAgICAwID09PSBuICsgYiArIG0gJiYgKHUgPSBsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDQ6XG4gICAgICAgICAgICAgIDAgPT09IGIgKyB2ICsgbiArIG0gJiYgKHIgPSAxLCB5ICs9ICdcXHInKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAwID09PSBiICYmIChuID0gbiA9PT0gZyA/IDAgOiAwID09PSBuID8gZyA6IG4pO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA5MTpcbiAgICAgICAgICAgICAgMCA9PT0gbiArIGIgKyB2ICYmIG0rKztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgOTM6XG4gICAgICAgICAgICAgIDAgPT09IG4gKyBiICsgdiAmJiBtLS07XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQxOlxuICAgICAgICAgICAgICAwID09PSBuICsgYiArIG0gJiYgdi0tO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgaWYgKDAgPT09IG4gKyBiICsgbSkge1xuICAgICAgICAgICAgICAgIGlmICgwID09PSBxKSBzd2l0Y2ggKDIgKiB4ICsgMyAqIEspIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgNTMzOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHYrKztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDY0OlxuICAgICAgICAgICAgICAwID09PSBiICsgdiArIG4gKyBtICsgdSArIGsgJiYgKGsgPSAxKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDI6XG4gICAgICAgICAgICBjYXNlIDQ3OlxuICAgICAgICAgICAgICBpZiAoISgwIDwgbiArIG0gKyB2KSkgc3dpdGNoIChiKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoICgyICogZyArIDMgKiBlLmNoYXJDb2RlQXQobCArIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjM1OlxuICAgICAgICAgICAgICAgICAgICAgIGIgPSA0NztcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIDIyMDpcbiAgICAgICAgICAgICAgICAgICAgICB0ID0gbCwgYiA9IDQyO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgNDI6XG4gICAgICAgICAgICAgICAgICA0NyA9PT0gZyAmJiA0MiA9PT0geCAmJiB0ICsgMiAhPT0gbCAmJiAoMzMgPT09IGUuY2hhckNvZGVBdCh0ICsgMikgJiYgKHAgKz0gZS5zdWJzdHJpbmcodCwgbCArIDEpKSwgeSA9ICcnLCBiID0gMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAwID09PSBiICYmIChmICs9IHkpO1xuICAgICAgfVxuXG4gICAgICBLID0geDtcbiAgICAgIHggPSBnO1xuICAgICAgbCsrO1xuICAgIH1cblxuICAgIHQgPSBwLmxlbmd0aDtcblxuICAgIGlmICgwIDwgdCkge1xuICAgICAgciA9IGM7XG4gICAgICBpZiAoMCA8IEEgJiYgKEMgPSBIKDIsIHAsIHIsIGQsIEQsIHosIHQsIGgsIGEsIGgpLCB2b2lkIDAgIT09IEMgJiYgMCA9PT0gKHAgPSBDKS5sZW5ndGgpKSByZXR1cm4gRyArIHAgKyBGO1xuICAgICAgcCA9IHIuam9pbignLCcpICsgJ3snICsgcCArICd9JztcblxuICAgICAgaWYgKDAgIT09IHcgKiBFKSB7XG4gICAgICAgIDIgIT09IHcgfHwgTChwLCAyKSB8fCAoRSA9IDApO1xuXG4gICAgICAgIHN3aXRjaCAoRSkge1xuICAgICAgICAgIGNhc2UgMTExOlxuICAgICAgICAgICAgcCA9IHAucmVwbGFjZShoYSwgJzotbW96LSQxJykgKyBwO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDExMjpcbiAgICAgICAgICAgIHAgPSBwLnJlcGxhY2UoUSwgJzo6LXdlYmtpdC1pbnB1dC0kMScpICsgcC5yZXBsYWNlKFEsICc6Oi1tb3otJDEnKSArIHAucmVwbGFjZShRLCAnOi1tcy1pbnB1dC0kMScpICsgcDtcbiAgICAgICAgfVxuXG4gICAgICAgIEUgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBHICsgcCArIEY7XG4gIH1cblxuICBmdW5jdGlvbiBYKGQsIGMsIGUpIHtcbiAgICB2YXIgaCA9IGMudHJpbSgpLnNwbGl0KGlhKTtcbiAgICBjID0gaDtcbiAgICB2YXIgYSA9IGgubGVuZ3RoLFxuICAgICAgICBtID0gZC5sZW5ndGg7XG5cbiAgICBzd2l0Y2ggKG0pIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdmFyIGIgPSAwO1xuXG4gICAgICAgIGZvciAoZCA9IDAgPT09IG0gPyAnJyA6IGRbMF0gKyAnICc7IGIgPCBhOyArK2IpIHtcbiAgICAgICAgICBjW2JdID0gWihkLCBjW2JdLCBlKS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIHYgPSBiID0gMDtcblxuICAgICAgICBmb3IgKGMgPSBbXTsgYiA8IGE7ICsrYikge1xuICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgbTsgKytuKSB7XG4gICAgICAgICAgICBjW3YrK10gPSBaKGRbbl0gKyAnICcsIGhbYl0sIGUpLnRyaW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBjO1xuICB9XG5cbiAgZnVuY3Rpb24gWihkLCBjLCBlKSB7XG4gICAgdmFyIGggPSBjLmNoYXJDb2RlQXQoMCk7XG4gICAgMzMgPiBoICYmIChoID0gKGMgPSBjLnRyaW0oKSkuY2hhckNvZGVBdCgwKSk7XG5cbiAgICBzd2l0Y2ggKGgpIHtcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIHJldHVybiBjLnJlcGxhY2UoRiwgJyQxJyArIGQudHJpbSgpKTtcblxuICAgICAgY2FzZSA1ODpcbiAgICAgICAgcmV0dXJuIGQudHJpbSgpICsgYy5yZXBsYWNlKEYsICckMScgKyBkLnRyaW0oKSk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICgwIDwgMSAqIGUgJiYgMCA8IGMuaW5kZXhPZignXFxmJykpIHJldHVybiBjLnJlcGxhY2UoRiwgKDU4ID09PSBkLmNoYXJDb2RlQXQoMCkgPyAnJyA6ICckMScpICsgZC50cmltKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBkICsgYztcbiAgfVxuXG4gIGZ1bmN0aW9uIFAoZCwgYywgZSwgaCkge1xuICAgIHZhciBhID0gZCArICc7JyxcbiAgICAgICAgbSA9IDIgKiBjICsgMyAqIGUgKyA0ICogaDtcblxuICAgIGlmICg5NDQgPT09IG0pIHtcbiAgICAgIGQgPSBhLmluZGV4T2YoJzonLCA5KSArIDE7XG4gICAgICB2YXIgYiA9IGEuc3Vic3RyaW5nKGQsIGEubGVuZ3RoIC0gMSkudHJpbSgpO1xuICAgICAgYiA9IGEuc3Vic3RyaW5nKDAsIGQpLnRyaW0oKSArIGIgKyAnOyc7XG4gICAgICByZXR1cm4gMSA9PT0gdyB8fCAyID09PSB3ICYmIEwoYiwgMSkgPyAnLXdlYmtpdC0nICsgYiArIGIgOiBiO1xuICAgIH1cblxuICAgIGlmICgwID09PSB3IHx8IDIgPT09IHcgJiYgIUwoYSwgMSkpIHJldHVybiBhO1xuXG4gICAgc3dpdGNoIChtKSB7XG4gICAgICBjYXNlIDEwMTU6XG4gICAgICAgIHJldHVybiA5NyA9PT0gYS5jaGFyQ29kZUF0KDEwKSA/ICctd2Via2l0LScgKyBhICsgYSA6IGE7XG5cbiAgICAgIGNhc2UgOTUxOlxuICAgICAgICByZXR1cm4gMTE2ID09PSBhLmNoYXJDb2RlQXQoMykgPyAnLXdlYmtpdC0nICsgYSArIGEgOiBhO1xuXG4gICAgICBjYXNlIDk2MzpcbiAgICAgICAgcmV0dXJuIDExMCA9PT0gYS5jaGFyQ29kZUF0KDUpID8gJy13ZWJraXQtJyArIGEgKyBhIDogYTtcblxuICAgICAgY2FzZSAxMDA5OlxuICAgICAgICBpZiAoMTAwICE9PSBhLmNoYXJDb2RlQXQoNCkpIGJyZWFrO1xuXG4gICAgICBjYXNlIDk2OTpcbiAgICAgIGNhc2UgOTQyOlxuICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyBhO1xuXG4gICAgICBjYXNlIDk3ODpcbiAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tb3otJyArIGEgKyBhO1xuXG4gICAgICBjYXNlIDEwMTk6XG4gICAgICBjYXNlIDk4MzpcbiAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tb3otJyArIGEgKyAnLW1zLScgKyBhICsgYTtcblxuICAgICAgY2FzZSA4ODM6XG4gICAgICAgIGlmICg0NSA9PT0gYS5jaGFyQ29kZUF0KDgpKSByZXR1cm4gJy13ZWJraXQtJyArIGEgKyBhO1xuICAgICAgICBpZiAoMCA8IGEuaW5kZXhPZignaW1hZ2Utc2V0KCcsIDExKSkgcmV0dXJuIGEucmVwbGFjZShqYSwgJyQxLXdlYmtpdC0kMicpICsgYTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTMyOlxuICAgICAgICBpZiAoNDUgPT09IGEuY2hhckNvZGVBdCg0KSkgc3dpdGNoIChhLmNoYXJDb2RlQXQoNSkpIHtcbiAgICAgICAgICBjYXNlIDEwMzpcbiAgICAgICAgICAgIHJldHVybiAnLXdlYmtpdC1ib3gtJyArIGEucmVwbGFjZSgnLWdyb3cnLCAnJykgKyAnLXdlYmtpdC0nICsgYSArICctbXMtJyArIGEucmVwbGFjZSgnZ3JvdycsICdwb3NpdGl2ZScpICsgYTtcblxuICAgICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tcy0nICsgYS5yZXBsYWNlKCdzaHJpbmsnLCAnbmVnYXRpdmUnKSArIGE7XG5cbiAgICAgICAgICBjYXNlIDk4OlxuICAgICAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tcy0nICsgYS5yZXBsYWNlKCdiYXNpcycsICdwcmVmZXJyZWQtc2l6ZScpICsgYTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1zLScgKyBhICsgYTtcblxuICAgICAgY2FzZSA5NjQ6XG4gICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArICctbXMtZmxleC0nICsgYSArIGE7XG5cbiAgICAgIGNhc2UgMTAyMzpcbiAgICAgICAgaWYgKDk5ICE9PSBhLmNoYXJDb2RlQXQoOCkpIGJyZWFrO1xuICAgICAgICBiID0gYS5zdWJzdHJpbmcoYS5pbmRleE9mKCc6JywgMTUpKS5yZXBsYWNlKCdmbGV4LScsICcnKS5yZXBsYWNlKCdzcGFjZS1iZXR3ZWVuJywgJ2p1c3RpZnknKTtcbiAgICAgICAgcmV0dXJuICctd2Via2l0LWJveC1wYWNrJyArIGIgKyAnLXdlYmtpdC0nICsgYSArICctbXMtZmxleC1wYWNrJyArIGIgKyBhO1xuXG4gICAgICBjYXNlIDEwMDU6XG4gICAgICAgIHJldHVybiBrYS50ZXN0KGEpID8gYS5yZXBsYWNlKGFhLCAnOi13ZWJraXQtJykgKyBhLnJlcGxhY2UoYWEsICc6LW1vei0nKSArIGEgOiBhO1xuXG4gICAgICBjYXNlIDFlMzpcbiAgICAgICAgYiA9IGEuc3Vic3RyaW5nKDEzKS50cmltKCk7XG4gICAgICAgIGMgPSBiLmluZGV4T2YoJy0nKSArIDE7XG5cbiAgICAgICAgc3dpdGNoIChiLmNoYXJDb2RlQXQoMCkgKyBiLmNoYXJDb2RlQXQoYykpIHtcbiAgICAgICAgICBjYXNlIDIyNjpcbiAgICAgICAgICAgIGIgPSBhLnJlcGxhY2UoRywgJ3RiJyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMjMyOlxuICAgICAgICAgICAgYiA9IGEucmVwbGFjZShHLCAndGItcmwnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAyMjA6XG4gICAgICAgICAgICBiID0gYS5yZXBsYWNlKEcsICdscicpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1zLScgKyBiICsgYTtcblxuICAgICAgY2FzZSAxMDE3OlxuICAgICAgICBpZiAoLTEgPT09IGEuaW5kZXhPZignc3RpY2t5JywgOSkpIGJyZWFrO1xuXG4gICAgICBjYXNlIDk3NTpcbiAgICAgICAgYyA9IChhID0gZCkubGVuZ3RoIC0gMTA7XG4gICAgICAgIGIgPSAoMzMgPT09IGEuY2hhckNvZGVBdChjKSA/IGEuc3Vic3RyaW5nKDAsIGMpIDogYSkuc3Vic3RyaW5nKGQuaW5kZXhPZignOicsIDcpICsgMSkudHJpbSgpO1xuXG4gICAgICAgIHN3aXRjaCAobSA9IGIuY2hhckNvZGVBdCgwKSArIChiLmNoYXJDb2RlQXQoNykgfCAwKSkge1xuICAgICAgICAgIGNhc2UgMjAzOlxuICAgICAgICAgICAgaWYgKDExMSA+IGIuY2hhckNvZGVBdCg4KSkgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDExNTpcbiAgICAgICAgICAgIGEgPSBhLnJlcGxhY2UoYiwgJy13ZWJraXQtJyArIGIpICsgJzsnICsgYTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAyMDc6XG4gICAgICAgICAgY2FzZSAxMDI6XG4gICAgICAgICAgICBhID0gYS5yZXBsYWNlKGIsICctd2Via2l0LScgKyAoMTAyIDwgbSA/ICdpbmxpbmUtJyA6ICcnKSArICdib3gnKSArICc7JyArIGEucmVwbGFjZShiLCAnLXdlYmtpdC0nICsgYikgKyAnOycgKyBhLnJlcGxhY2UoYiwgJy1tcy0nICsgYiArICdib3gnKSArICc7JyArIGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYSArICc7JztcblxuICAgICAgY2FzZSA5Mzg6XG4gICAgICAgIGlmICg0NSA9PT0gYS5jaGFyQ29kZUF0KDUpKSBzd2l0Y2ggKGEuY2hhckNvZGVBdCg2KSkge1xuICAgICAgICAgIGNhc2UgMTA1OlxuICAgICAgICAgICAgcmV0dXJuIGIgPSBhLnJlcGxhY2UoJy1pdGVtcycsICcnKSwgJy13ZWJraXQtJyArIGEgKyAnLXdlYmtpdC1ib3gtJyArIGIgKyAnLW1zLWZsZXgtJyArIGIgKyBhO1xuXG4gICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1zLWZsZXgtaXRlbS0nICsgYS5yZXBsYWNlKGJhLCAnJykgKyBhO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArICctbXMtZmxleC1saW5lLXBhY2snICsgYS5yZXBsYWNlKCdhbGlnbi1jb250ZW50JywgJycpLnJlcGxhY2UoYmEsICcnKSArIGE7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTczOlxuICAgICAgY2FzZSA5ODk6XG4gICAgICAgIGlmICg0NSAhPT0gYS5jaGFyQ29kZUF0KDMpIHx8IDEyMiA9PT0gYS5jaGFyQ29kZUF0KDQpKSBicmVhaztcblxuICAgICAgY2FzZSA5MzE6XG4gICAgICBjYXNlIDk1MzpcbiAgICAgICAgaWYgKCEwID09PSBsYS50ZXN0KGQpKSByZXR1cm4gMTE1ID09PSAoYiA9IGQuc3Vic3RyaW5nKGQuaW5kZXhPZignOicpICsgMSkpLmNoYXJDb2RlQXQoMCkgPyBQKGQucmVwbGFjZSgnc3RyZXRjaCcsICdmaWxsLWF2YWlsYWJsZScpLCBjLCBlLCBoKS5yZXBsYWNlKCc6ZmlsbC1hdmFpbGFibGUnLCAnOnN0cmV0Y2gnKSA6IGEucmVwbGFjZShiLCAnLXdlYmtpdC0nICsgYikgKyBhLnJlcGxhY2UoYiwgJy1tb3otJyArIGIucmVwbGFjZSgnZmlsbC0nLCAnJykpICsgYTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTYyOlxuICAgICAgICBpZiAoYSA9ICctd2Via2l0LScgKyBhICsgKDEwMiA9PT0gYS5jaGFyQ29kZUF0KDUpID8gJy1tcy0nICsgYSA6ICcnKSArIGEsIDIxMSA9PT0gZSArIGggJiYgMTA1ID09PSBhLmNoYXJDb2RlQXQoMTMpICYmIDAgPCBhLmluZGV4T2YoJ3RyYW5zZm9ybScsIDEwKSkgcmV0dXJuIGEuc3Vic3RyaW5nKDAsIGEuaW5kZXhPZignOycsIDI3KSArIDEpLnJlcGxhY2UobWEsICckMS13ZWJraXQtJDInKSArIGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICBmdW5jdGlvbiBMKGQsIGMpIHtcbiAgICB2YXIgZSA9IGQuaW5kZXhPZigxID09PSBjID8gJzonIDogJ3snKSxcbiAgICAgICAgaCA9IGQuc3Vic3RyaW5nKDAsIDMgIT09IGMgPyBlIDogMTApO1xuICAgIGUgPSBkLnN1YnN0cmluZyhlICsgMSwgZC5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gUigyICE9PSBjID8gaCA6IGgucmVwbGFjZShuYSwgJyQxJyksIGUsIGMpO1xuICB9XG5cbiAgZnVuY3Rpb24gZWEoZCwgYykge1xuICAgIHZhciBlID0gUChjLCBjLmNoYXJDb2RlQXQoMCksIGMuY2hhckNvZGVBdCgxKSwgYy5jaGFyQ29kZUF0KDIpKTtcbiAgICByZXR1cm4gZSAhPT0gYyArICc7JyA/IGUucmVwbGFjZShvYSwgJyBvciAoJDEpJykuc3Vic3RyaW5nKDQpIDogJygnICsgYyArICcpJztcbiAgfVxuXG4gIGZ1bmN0aW9uIEgoZCwgYywgZSwgaCwgYSwgbSwgYiwgdiwgbiwgcSkge1xuICAgIGZvciAodmFyIGcgPSAwLCB4ID0gYywgdzsgZyA8IEE7ICsrZykge1xuICAgICAgc3dpdGNoICh3ID0gU1tnXS5jYWxsKEIsIGQsIHgsIGUsIGgsIGEsIG0sIGIsIHYsIG4sIHEpKSB7XG4gICAgICAgIGNhc2Ugdm9pZCAwOlxuICAgICAgICBjYXNlICExOlxuICAgICAgICBjYXNlICEwOlxuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB4ID0gdztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoeCAhPT0gYykgcmV0dXJuIHg7XG4gIH1cblxuICBmdW5jdGlvbiBUKGQpIHtcbiAgICBzd2l0Y2ggKGQpIHtcbiAgICAgIGNhc2Ugdm9pZCAwOlxuICAgICAgY2FzZSBudWxsOlxuICAgICAgICBBID0gUy5sZW5ndGggPSAwO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBkKSBTW0ErK10gPSBkO2Vsc2UgaWYgKCdvYmplY3QnID09PSB0eXBlb2YgZCkgZm9yICh2YXIgYyA9IDAsIGUgPSBkLmxlbmd0aDsgYyA8IGU7ICsrYykge1xuICAgICAgICAgIFQoZFtjXSk7XG4gICAgICAgIH0gZWxzZSBZID0gISFkIHwgMDtcbiAgICB9XG5cbiAgICByZXR1cm4gVDtcbiAgfVxuXG4gIGZ1bmN0aW9uIFUoZCkge1xuICAgIGQgPSBkLnByZWZpeDtcbiAgICB2b2lkIDAgIT09IGQgJiYgKFIgPSBudWxsLCBkID8gJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGQgPyB3ID0gMSA6ICh3ID0gMiwgUiA9IGQpIDogdyA9IDApO1xuICAgIHJldHVybiBVO1xuICB9XG5cbiAgZnVuY3Rpb24gQihkLCBjKSB7XG4gICAgdmFyIGUgPSBkO1xuICAgIDMzID4gZS5jaGFyQ29kZUF0KDApICYmIChlID0gZS50cmltKCkpO1xuICAgIFYgPSBlO1xuICAgIGUgPSBbVl07XG5cbiAgICBpZiAoMCA8IEEpIHtcbiAgICAgIHZhciBoID0gSCgtMSwgYywgZSwgZSwgRCwgeiwgMCwgMCwgMCwgMCk7XG4gICAgICB2b2lkIDAgIT09IGggJiYgJ3N0cmluZycgPT09IHR5cGVvZiBoICYmIChjID0gaCk7XG4gICAgfVxuXG4gICAgdmFyIGEgPSBNKE8sIGUsIGMsIDAsIDApO1xuICAgIDAgPCBBICYmIChoID0gSCgtMiwgYSwgZSwgZSwgRCwgeiwgYS5sZW5ndGgsIDAsIDAsIDApLCB2b2lkIDAgIT09IGggJiYgKGEgPSBoKSk7XG4gICAgViA9ICcnO1xuICAgIEUgPSAwO1xuICAgIHogPSBEID0gMTtcbiAgICByZXR1cm4gYTtcbiAgfVxuXG4gIHZhciBjYSA9IC9eXFwwKy9nLFxuICAgICAgTiA9IC9bXFwwXFxyXFxmXS9nLFxuICAgICAgYWEgPSAvOiAqL2csXG4gICAgICBrYSA9IC96b298Z3JhLyxcbiAgICAgIG1hID0gLyhbLDogXSkodHJhbnNmb3JtKS9nLFxuICAgICAgaWEgPSAvLFxccis/L2csXG4gICAgICBGID0gLyhbXFx0XFxyXFxuIF0pKlxcZj8mL2csXG4gICAgICBmYSA9IC9AKGtcXHcrKVxccyooXFxTKilcXHMqLyxcbiAgICAgIFEgPSAvOjoocGxhY2UpL2csXG4gICAgICBoYSA9IC86KHJlYWQtb25seSkvZyxcbiAgICAgIEcgPSAvW3N2aF1cXHcrLVt0YmxyXXsyfS8sXG4gICAgICBkYSA9IC9cXChcXHMqKC4qKVxccypcXCkvZyxcbiAgICAgIG9hID0gLyhbXFxzXFxTXSo/KTsvZyxcbiAgICAgIGJhID0gLy1zZWxmfGZsZXgtL2csXG4gICAgICBuYSA9IC9bXl0qPyg6W3JwXVtlbF1hW1xcdy1dKylbXl0qLyxcbiAgICAgIGxhID0gL3N0cmV0Y2h8OlxccypcXHcrXFwtKD86Y29udGV8YXZhaWwpLyxcbiAgICAgIGphID0gLyhbXi1dKShpbWFnZS1zZXRcXCgpLyxcbiAgICAgIHogPSAxLFxuICAgICAgRCA9IDEsXG4gICAgICBFID0gMCxcbiAgICAgIHcgPSAxLFxuICAgICAgTyA9IFtdLFxuICAgICAgUyA9IFtdLFxuICAgICAgQSA9IDAsXG4gICAgICBSID0gbnVsbCxcbiAgICAgIFkgPSAwLFxuICAgICAgViA9ICcnO1xuICBCLnVzZSA9IFQ7XG4gIEIuc2V0ID0gVTtcbiAgdm9pZCAwICE9PSBXICYmIFUoVyk7XG4gIHJldHVybiBCO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBzdHlsaXNfbWluO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgdW5pdGxlc3NLZXlzID0ge1xuICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogMSxcbiAgYm9yZGVySW1hZ2VPdXRzZXQ6IDEsXG4gIGJvcmRlckltYWdlU2xpY2U6IDEsXG4gIGJvcmRlckltYWdlV2lkdGg6IDEsXG4gIGJveEZsZXg6IDEsXG4gIGJveEZsZXhHcm91cDogMSxcbiAgYm94T3JkaW5hbEdyb3VwOiAxLFxuICBjb2x1bW5Db3VudDogMSxcbiAgY29sdW1uczogMSxcbiAgZmxleDogMSxcbiAgZmxleEdyb3c6IDEsXG4gIGZsZXhQb3NpdGl2ZTogMSxcbiAgZmxleFNocmluazogMSxcbiAgZmxleE5lZ2F0aXZlOiAxLFxuICBmbGV4T3JkZXI6IDEsXG4gIGdyaWRSb3c6IDEsXG4gIGdyaWRSb3dFbmQ6IDEsXG4gIGdyaWRSb3dTcGFuOiAxLFxuICBncmlkUm93U3RhcnQ6IDEsXG4gIGdyaWRDb2x1bW46IDEsXG4gIGdyaWRDb2x1bW5FbmQ6IDEsXG4gIGdyaWRDb2x1bW5TcGFuOiAxLFxuICBncmlkQ29sdW1uU3RhcnQ6IDEsXG4gIG1zR3JpZFJvdzogMSxcbiAgbXNHcmlkUm93U3BhbjogMSxcbiAgbXNHcmlkQ29sdW1uOiAxLFxuICBtc0dyaWRDb2x1bW5TcGFuOiAxLFxuICBmb250V2VpZ2h0OiAxLFxuICBsaW5lSGVpZ2h0OiAxLFxuICBvcGFjaXR5OiAxLFxuICBvcmRlcjogMSxcbiAgb3JwaGFuczogMSxcbiAgdGFiU2l6ZTogMSxcbiAgd2lkb3dzOiAxLFxuICB6SW5kZXg6IDEsXG4gIHpvb206IDEsXG4gIFdlYmtpdExpbmVDbGFtcDogMSxcbiAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICBmaWxsT3BhY2l0eTogMSxcbiAgZmxvb2RPcGFjaXR5OiAxLFxuICBzdG9wT3BhY2l0eTogMSxcbiAgc3Ryb2tlRGFzaGFycmF5OiAxLFxuICBzdHJva2VEYXNob2Zmc2V0OiAxLFxuICBzdHJva2VNaXRlcmxpbWl0OiAxLFxuICBzdHJva2VPcGFjaXR5OiAxLFxuICBzdHJva2VXaWR0aDogMVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gdW5pdGxlc3NLZXlzO1xuIiwiZnVuY3Rpb24gbWVtb2l6ZShmbikge1xuICB2YXIgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgIGlmIChjYWNoZVthcmddID09PSB1bmRlZmluZWQpIGNhY2hlW2FyZ10gPSBmbihhcmcpO1xuICAgIHJldHVybiBjYWNoZVthcmddO1xuICB9O1xufVxuXG5leHBvcnQgeyBtZW1vaXplIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBtZW1vaXplIGZyb20gJ0BlbW90aW9uL21lbW9pemUnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbnZhciByZWFjdFByb3BzUmVnZXggPSAvXigoY2hpbGRyZW58ZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUx8a2V5fHJlZnxhdXRvRm9jdXN8ZGVmYXVsdFZhbHVlfGRlZmF1bHRDaGVja2VkfGlubmVySFRNTHxzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmd8c3VwcHJlc3NIeWRyYXRpb25XYXJuaW5nfHZhbHVlTGlua3xhYmJyfGFjY2VwdHxhY2NlcHRDaGFyc2V0fGFjY2Vzc0tleXxhY3Rpb258YWxsb3d8YWxsb3dVc2VyTWVkaWF8YWxsb3dQYXltZW50UmVxdWVzdHxhbGxvd0Z1bGxTY3JlZW58YWxsb3dUcmFuc3BhcmVuY3l8YWx0fGFzeW5jfGF1dG9Db21wbGV0ZXxhdXRvUGxheXxjYXB0dXJlfGNlbGxQYWRkaW5nfGNlbGxTcGFjaW5nfGNoYWxsZW5nZXxjaGFyU2V0fGNoZWNrZWR8Y2l0ZXxjbGFzc0lEfGNsYXNzTmFtZXxjb2xzfGNvbFNwYW58Y29udGVudHxjb250ZW50RWRpdGFibGV8Y29udGV4dE1lbnV8Y29udHJvbHN8Y29udHJvbHNMaXN0fGNvb3Jkc3xjcm9zc09yaWdpbnxkYXRhfGRhdGVUaW1lfGRlY29kaW5nfGRlZmF1bHR8ZGVmZXJ8ZGlyfGRpc2FibGVkfGRpc2FibGVQaWN0dXJlSW5QaWN0dXJlfGRpc2FibGVSZW1vdGVQbGF5YmFja3xkb3dubG9hZHxkcmFnZ2FibGV8ZW5jVHlwZXxlbnRlcktleUhpbnR8ZmV0Y2hwcmlvcml0eXxmZXRjaFByaW9yaXR5fGZvcm18Zm9ybUFjdGlvbnxmb3JtRW5jVHlwZXxmb3JtTWV0aG9kfGZvcm1Ob1ZhbGlkYXRlfGZvcm1UYXJnZXR8ZnJhbWVCb3JkZXJ8aGVhZGVyc3xoZWlnaHR8aGlkZGVufGhpZ2h8aHJlZnxocmVmTGFuZ3xodG1sRm9yfGh0dHBFcXVpdnxpZHxpbnB1dE1vZGV8aW50ZWdyaXR5fGlzfGtleVBhcmFtc3xrZXlUeXBlfGtpbmR8bGFiZWx8bGFuZ3xsaXN0fGxvYWRpbmd8bG9vcHxsb3d8bWFyZ2luSGVpZ2h0fG1hcmdpbldpZHRofG1heHxtYXhMZW5ndGh8bWVkaWF8bWVkaWFHcm91cHxtZXRob2R8bWlufG1pbkxlbmd0aHxtdWx0aXBsZXxtdXRlZHxuYW1lfG5vbmNlfG5vVmFsaWRhdGV8b3BlbnxvcHRpbXVtfHBhdHRlcm58cGxhY2Vob2xkZXJ8cGxheXNJbmxpbmV8cG9zdGVyfHByZWxvYWR8cHJvZmlsZXxyYWRpb0dyb3VwfHJlYWRPbmx5fHJlZmVycmVyUG9saWN5fHJlbHxyZXF1aXJlZHxyZXZlcnNlZHxyb2xlfHJvd3N8cm93U3BhbnxzYW5kYm94fHNjb3BlfHNjb3BlZHxzY3JvbGxpbmd8c2VhbWxlc3N8c2VsZWN0ZWR8c2hhcGV8c2l6ZXxzaXplc3xzbG90fHNwYW58c3BlbGxDaGVja3xzcmN8c3JjRG9jfHNyY0xhbmd8c3JjU2V0fHN0YXJ0fHN0ZXB8c3R5bGV8c3VtbWFyeXx0YWJJbmRleHx0YXJnZXR8dGl0bGV8dHJhbnNsYXRlfHR5cGV8dXNlTWFwfHZhbHVlfHdpZHRofHdtb2RlfHdyYXB8YWJvdXR8ZGF0YXR5cGV8aW5saXN0fHByZWZpeHxwcm9wZXJ0eXxyZXNvdXJjZXx0eXBlb2Z8dm9jYWJ8YXV0b0NhcGl0YWxpemV8YXV0b0NvcnJlY3R8YXV0b1NhdmV8Y29sb3J8aW5jcmVtZW50YWx8ZmFsbGJhY2t8aW5lcnR8aXRlbVByb3B8aXRlbVNjb3BlfGl0ZW1UeXBlfGl0ZW1JRHxpdGVtUmVmfG9ufG9wdGlvbnxyZXN1bHRzfHNlY3VyaXR5fHVuc2VsZWN0YWJsZXxhY2NlbnRIZWlnaHR8YWNjdW11bGF0ZXxhZGRpdGl2ZXxhbGlnbm1lbnRCYXNlbGluZXxhbGxvd1Jlb3JkZXJ8YWxwaGFiZXRpY3xhbXBsaXR1ZGV8YXJhYmljRm9ybXxhc2NlbnR8YXR0cmlidXRlTmFtZXxhdHRyaWJ1dGVUeXBlfGF1dG9SZXZlcnNlfGF6aW11dGh8YmFzZUZyZXF1ZW5jeXxiYXNlbGluZVNoaWZ0fGJhc2VQcm9maWxlfGJib3h8YmVnaW58Ymlhc3xieXxjYWxjTW9kZXxjYXBIZWlnaHR8Y2xpcHxjbGlwUGF0aFVuaXRzfGNsaXBQYXRofGNsaXBSdWxlfGNvbG9ySW50ZXJwb2xhdGlvbnxjb2xvckludGVycG9sYXRpb25GaWx0ZXJzfGNvbG9yUHJvZmlsZXxjb2xvclJlbmRlcmluZ3xjb250ZW50U2NyaXB0VHlwZXxjb250ZW50U3R5bGVUeXBlfGN1cnNvcnxjeHxjeXxkfGRlY2VsZXJhdGV8ZGVzY2VudHxkaWZmdXNlQ29uc3RhbnR8ZGlyZWN0aW9ufGRpc3BsYXl8ZGl2aXNvcnxkb21pbmFudEJhc2VsaW5lfGR1cnxkeHxkeXxlZGdlTW9kZXxlbGV2YXRpb258ZW5hYmxlQmFja2dyb3VuZHxlbmR8ZXhwb25lbnR8ZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZHxmaWxsfGZpbGxPcGFjaXR5fGZpbGxSdWxlfGZpbHRlcnxmaWx0ZXJSZXN8ZmlsdGVyVW5pdHN8Zmxvb2RDb2xvcnxmbG9vZE9wYWNpdHl8Zm9jdXNhYmxlfGZvbnRGYW1pbHl8Zm9udFNpemV8Zm9udFNpemVBZGp1c3R8Zm9udFN0cmV0Y2h8Zm9udFN0eWxlfGZvbnRWYXJpYW50fGZvbnRXZWlnaHR8Zm9ybWF0fGZyb218ZnJ8Znh8Znl8ZzF8ZzJ8Z2x5cGhOYW1lfGdseXBoT3JpZW50YXRpb25Ib3Jpem9udGFsfGdseXBoT3JpZW50YXRpb25WZXJ0aWNhbHxnbHlwaFJlZnxncmFkaWVudFRyYW5zZm9ybXxncmFkaWVudFVuaXRzfGhhbmdpbmd8aG9yaXpBZHZYfGhvcml6T3JpZ2luWHxpZGVvZ3JhcGhpY3xpbWFnZVJlbmRlcmluZ3xpbnxpbjJ8aW50ZXJjZXB0fGt8azF8azJ8azN8azR8a2VybmVsTWF0cml4fGtlcm5lbFVuaXRMZW5ndGh8a2VybmluZ3xrZXlQb2ludHN8a2V5U3BsaW5lc3xrZXlUaW1lc3xsZW5ndGhBZGp1c3R8bGV0dGVyU3BhY2luZ3xsaWdodGluZ0NvbG9yfGxpbWl0aW5nQ29uZUFuZ2xlfGxvY2FsfG1hcmtlckVuZHxtYXJrZXJNaWR8bWFya2VyU3RhcnR8bWFya2VySGVpZ2h0fG1hcmtlclVuaXRzfG1hcmtlcldpZHRofG1hc2t8bWFza0NvbnRlbnRVbml0c3xtYXNrVW5pdHN8bWF0aGVtYXRpY2FsfG1vZGV8bnVtT2N0YXZlc3xvZmZzZXR8b3BhY2l0eXxvcGVyYXRvcnxvcmRlcnxvcmllbnR8b3JpZW50YXRpb258b3JpZ2lufG92ZXJmbG93fG92ZXJsaW5lUG9zaXRpb258b3ZlcmxpbmVUaGlja25lc3N8cGFub3NlMXxwYWludE9yZGVyfHBhdGhMZW5ndGh8cGF0dGVybkNvbnRlbnRVbml0c3xwYXR0ZXJuVHJhbnNmb3JtfHBhdHRlcm5Vbml0c3xwb2ludGVyRXZlbnRzfHBvaW50c3xwb2ludHNBdFh8cG9pbnRzQXRZfHBvaW50c0F0WnxwcmVzZXJ2ZUFscGhhfHByZXNlcnZlQXNwZWN0UmF0aW98cHJpbWl0aXZlVW5pdHN8cnxyYWRpdXN8cmVmWHxyZWZZfHJlbmRlcmluZ0ludGVudHxyZXBlYXRDb3VudHxyZXBlYXREdXJ8cmVxdWlyZWRFeHRlbnNpb25zfHJlcXVpcmVkRmVhdHVyZXN8cmVzdGFydHxyZXN1bHR8cm90YXRlfHJ4fHJ5fHNjYWxlfHNlZWR8c2hhcGVSZW5kZXJpbmd8c2xvcGV8c3BhY2luZ3xzcGVjdWxhckNvbnN0YW50fHNwZWN1bGFyRXhwb25lbnR8c3BlZWR8c3ByZWFkTWV0aG9kfHN0YXJ0T2Zmc2V0fHN0ZERldmlhdGlvbnxzdGVtaHxzdGVtdnxzdGl0Y2hUaWxlc3xzdG9wQ29sb3J8c3RvcE9wYWNpdHl8c3RyaWtldGhyb3VnaFBvc2l0aW9ufHN0cmlrZXRocm91Z2hUaGlja25lc3N8c3RyaW5nfHN0cm9rZXxzdHJva2VEYXNoYXJyYXl8c3Ryb2tlRGFzaG9mZnNldHxzdHJva2VMaW5lY2FwfHN0cm9rZUxpbmVqb2lufHN0cm9rZU1pdGVybGltaXR8c3Ryb2tlT3BhY2l0eXxzdHJva2VXaWR0aHxzdXJmYWNlU2NhbGV8c3lzdGVtTGFuZ3VhZ2V8dGFibGVWYWx1ZXN8dGFyZ2V0WHx0YXJnZXRZfHRleHRBbmNob3J8dGV4dERlY29yYXRpb258dGV4dFJlbmRlcmluZ3x0ZXh0TGVuZ3RofHRvfHRyYW5zZm9ybXx1MXx1Mnx1bmRlcmxpbmVQb3NpdGlvbnx1bmRlcmxpbmVUaGlja25lc3N8dW5pY29kZXx1bmljb2RlQmlkaXx1bmljb2RlUmFuZ2V8dW5pdHNQZXJFbXx2QWxwaGFiZXRpY3x2SGFuZ2luZ3x2SWRlb2dyYXBoaWN8dk1hdGhlbWF0aWNhbHx2YWx1ZXN8dmVjdG9yRWZmZWN0fHZlcnNpb258dmVydEFkdll8dmVydE9yaWdpblh8dmVydE9yaWdpbll8dmlld0JveHx2aWV3VGFyZ2V0fHZpc2liaWxpdHl8d2lkdGhzfHdvcmRTcGFjaW5nfHdyaXRpbmdNb2RlfHh8eEhlaWdodHx4MXx4Mnx4Q2hhbm5lbFNlbGVjdG9yfHhsaW5rQWN0dWF0ZXx4bGlua0FyY3JvbGV8eGxpbmtIcmVmfHhsaW5rUm9sZXx4bGlua1Nob3d8eGxpbmtUaXRsZXx4bGlua1R5cGV8eG1sQmFzZXx4bWxuc3x4bWxuc1hsaW5rfHhtbExhbmd8eG1sU3BhY2V8eXx5MXx5Mnx5Q2hhbm5lbFNlbGVjdG9yfHp8em9vbUFuZFBhbnxmb3J8Y2xhc3N8YXV0b2ZvY3VzKXwoKFtEZF1bQWFdW1R0XVtBYV18W0FhXVtScl1bSWldW0FhXXx4KS0uKikpJC87IC8vIGh0dHBzOi8vZXNiZW5jaC5jb20vYmVuY2gvNWJmZWU2OGE0Y2Q3ZTYwMDllZjYxZDIzXG5cbnZhciBpc1Byb3BWYWxpZCA9IC8qICNfX1BVUkVfXyAqL21lbW9pemUoZnVuY3Rpb24gKHByb3ApIHtcbiAgcmV0dXJuIHJlYWN0UHJvcHNSZWdleC50ZXN0KHByb3ApIHx8IHByb3AuY2hhckNvZGVBdCgwKSA9PT0gMTExXG4gIC8qIG8gKi9cbiAgJiYgcHJvcC5jaGFyQ29kZUF0KDEpID09PSAxMTBcbiAgLyogbiAqL1xuICAmJiBwcm9wLmNoYXJDb2RlQXQoMikgPCA5MTtcbn1cbi8qIForMSAqL1xuKTtcblxuZXhwb3J0IHsgaXNQcm9wVmFsaWQgYXMgZGVmYXVsdCB9O1xuIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi4xMy4xXG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7IC8vIFRPRE86IFdlIGRvbid0IHVzZSBBc3luY01vZGUgb3IgQ29uY3VycmVudE1vZGUgYW55bW9yZS4gVGhleSB3ZXJlIHRlbXBvcmFyeVxuLy8gKHVuc3RhYmxlKSBBUElzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWQuIENhbiB3ZSByZW1vdmUgdGhlIHN5bWJvbHM/XG5cbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZV9saXN0JykgOiAweGVhZDg7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubWVtbycpIDogMHhlYWQzO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcbnZhciBSRUFDVF9CTE9DS19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYmxvY2snKSA6IDB4ZWFkOTtcbnZhciBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnVuZGFtZW50YWwnKSA6IDB4ZWFkNTtcbnZhciBSRUFDVF9SRVNQT05ERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnJlc3BvbmRlcicpIDogMHhlYWQ2O1xudmFyIFJFQUNUX1NDT1BFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zY29wZScpIDogMHhlYWQ3O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9SRVNQT05ERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9TQ09QRV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0JMT0NLX1RZUEUpO1xufVxuXG5mdW5jdGlvbiB0eXBlT2Yob2JqZWN0KSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwpIHtcbiAgICB2YXIgJCR0eXBlb2YgPSBvYmplY3QuJCR0eXBlb2Y7XG5cbiAgICBzd2l0Y2ggKCQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgdmFyIHR5cGUgPSBvYmplY3QudHlwZTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0FTWU5DX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZlR5cGU7XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn0gLy8gQXN5bmNNb2RlIGlzIGRlcHJlY2F0ZWQgYWxvbmcgd2l0aCBpc0FzeW5jTW9kZVxuXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG52YXIgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSBmYWxzZTsgLy8gQXN5bmNNb2RlIHNob3VsZCBiZSBkZXByZWNhdGVkXG5cbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlOyAvLyBVc2luZyBjb25zb2xlWyd3YXJuJ10gdG8gZXZhZGUgQmFiZWwgYW5kIEVTTGludFxuXG4gICAgICBjb25zb2xlWyd3YXJuJ10oJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE3Ky4gVXBkYXRlIHlvdXIgY29kZSB0byB1c2UgJyArICdSZWFjdElzLmlzQ29uY3VycmVudE1vZGUoKSBpbnN0ZWFkLiBJdCBoYXMgdGhlIGV4YWN0IHNhbWUgQVBJLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkgfHwgdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRDb25zdW1lcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05URVhUX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRQcm92aWRlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9WSURFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNGb3J3YXJkUmVmKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZyYWdtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0xhenkob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTEFaWV9UWVBFO1xufVxuZnVuY3Rpb24gaXNNZW1vKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX01FTU9fVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUG9ydGFsKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BPUlRBTF9UWVBFO1xufVxuZnVuY3Rpb24gaXNQcm9maWxlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdHJpY3RNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG59XG5cbmV4cG9ydHMuQXN5bmNNb2RlID0gQXN5bmNNb2RlO1xuZXhwb3J0cy5Db25jdXJyZW50TW9kZSA9IENvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5Db250ZXh0Q29uc3VtZXIgPSBDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLkNvbnRleHRQcm92aWRlciA9IENvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuRWxlbWVudCA9IEVsZW1lbnQ7XG5leHBvcnRzLkZvcndhcmRSZWYgPSBGb3J3YXJkUmVmO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuZXhwb3J0cy5MYXp5ID0gTGF6eTtcbmV4cG9ydHMuTWVtbyA9IE1lbW87XG5leHBvcnRzLlBvcnRhbCA9IFBvcnRhbDtcbmV4cG9ydHMuUHJvZmlsZXIgPSBQcm9maWxlcjtcbmV4cG9ydHMuU3RyaWN0TW9kZSA9IFN0cmljdE1vZGU7XG5leHBvcnRzLlN1c3BlbnNlID0gU3VzcGVuc2U7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlO1xuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG52YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgY2hpbGRDb250ZXh0VHlwZXM6IHRydWUsXG4gIGNvbnRleHRUeXBlOiB0cnVlLFxuICBjb250ZXh0VHlwZXM6IHRydWUsXG4gIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgZGlzcGxheU5hbWU6IHRydWUsXG4gIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yOiB0cnVlLFxuICBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHM6IHRydWUsXG4gIG1peGluczogdHJ1ZSxcbiAgcHJvcFR5cGVzOiB0cnVlLFxuICB0eXBlOiB0cnVlXG59O1xudmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gIG5hbWU6IHRydWUsXG4gIGxlbmd0aDogdHJ1ZSxcbiAgcHJvdG90eXBlOiB0cnVlLFxuICBjYWxsZXI6IHRydWUsXG4gIGNhbGxlZTogdHJ1ZSxcbiAgYXJndW1lbnRzOiB0cnVlLFxuICBhcml0eTogdHJ1ZVxufTtcbnZhciBGT1JXQVJEX1JFRl9TVEFUSUNTID0ge1xuICAnJCR0eXBlb2YnOiB0cnVlLFxuICByZW5kZXI6IHRydWUsXG4gIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgZGlzcGxheU5hbWU6IHRydWUsXG4gIHByb3BUeXBlczogdHJ1ZVxufTtcbnZhciBNRU1PX1NUQVRJQ1MgPSB7XG4gICckJHR5cGVvZic6IHRydWUsXG4gIGNvbXBhcmU6IHRydWUsXG4gIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgZGlzcGxheU5hbWU6IHRydWUsXG4gIHByb3BUeXBlczogdHJ1ZSxcbiAgdHlwZTogdHJ1ZVxufTtcbnZhciBUWVBFX1NUQVRJQ1MgPSB7fTtcblRZUEVfU1RBVElDU1tyZWFjdElzLkZvcndhcmRSZWZdID0gRk9SV0FSRF9SRUZfU1RBVElDUztcblRZUEVfU1RBVElDU1tyZWFjdElzLk1lbW9dID0gTUVNT19TVEFUSUNTO1xuXG5mdW5jdGlvbiBnZXRTdGF0aWNzKGNvbXBvbmVudCkge1xuICAvLyBSZWFjdCB2MTYuMTEgYW5kIGJlbG93XG4gIGlmIChyZWFjdElzLmlzTWVtbyhjb21wb25lbnQpKSB7XG4gICAgcmV0dXJuIE1FTU9fU1RBVElDUztcbiAgfSAvLyBSZWFjdCB2MTYuMTIgYW5kIGFib3ZlXG5cblxuICByZXR1cm4gVFlQRV9TVEFUSUNTW2NvbXBvbmVudFsnJCR0eXBlb2YnXV0gfHwgUkVBQ1RfU1RBVElDUztcbn1cblxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIGdldE93blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgb2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcbmZ1bmN0aW9uIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50LCBibGFja2xpc3QpIHtcbiAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgaG9pc3Qgb3ZlciBzdHJpbmcgKGh0bWwpIGNvbXBvbmVudHNcbiAgICBpZiAob2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICB2YXIgaW5oZXJpdGVkQ29tcG9uZW50ID0gZ2V0UHJvdG90eXBlT2Yoc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgaWYgKGluaGVyaXRlZENvbXBvbmVudCAmJiBpbmhlcml0ZWRDb21wb25lbnQgIT09IG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIGluaGVyaXRlZENvbXBvbmVudCwgYmxhY2tsaXN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXMoc291cmNlQ29tcG9uZW50KTtcblxuICAgIGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlQ29tcG9uZW50KSk7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldFN0YXRpY3MgPSBnZXRTdGF0aWNzKHRhcmdldENvbXBvbmVudCk7XG4gICAgdmFyIHNvdXJjZVN0YXRpY3MgPSBnZXRTdGF0aWNzKHNvdXJjZUNvbXBvbmVudCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICBpZiAoIUtOT1dOX1NUQVRJQ1Nba2V5XSAmJiAhKGJsYWNrbGlzdCAmJiBibGFja2xpc3Rba2V5XSkgJiYgIShzb3VyY2VTdGF0aWNzICYmIHNvdXJjZVN0YXRpY3Nba2V5XSkgJiYgISh0YXJnZXRTdGF0aWNzICYmIHRhcmdldFN0YXRpY3Nba2V5XSkpIHtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlQ29tcG9uZW50LCBrZXkpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gQXZvaWQgZmFpbHVyZXMgZnJvbSByZWFkLW9ubHkgcHJvcGVydGllc1xuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldENvbXBvbmVudCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhvaXN0Tm9uUmVhY3RTdGF0aWNzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZShlKXtyZXR1cm4gZSYmXCJvYmplY3RcIj09dHlwZW9mIGUmJlwiZGVmYXVsdFwiaW4gZT9lLmRlZmF1bHQ6ZX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgdD1yZXF1aXJlKFwicmVhY3QtaXNcIiksbj1yZXF1aXJlKFwicmVhY3RcIikscj1lKG4pLG89ZShyZXF1aXJlKFwic2hhbGxvd2VxdWFsXCIpKSxzPWUocmVxdWlyZShcIkBlbW90aW9uL3N0eWxpc1wiKSksaT1lKHJlcXVpcmUoXCJAZW1vdGlvbi91bml0bGVzc1wiKSksYT1lKHJlcXVpcmUoXCJAZW1vdGlvbi9pcy1wcm9wLXZhbGlkXCIpKSxjPWUocmVxdWlyZShcImhvaXN0LW5vbi1yZWFjdC1zdGF0aWNzXCIpKTtmdW5jdGlvbiB1KCl7cmV0dXJuKHU9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTE7dDxhcmd1bWVudHMubGVuZ3RoO3QrKyl7dmFyIG49YXJndW1lbnRzW3RdO2Zvcih2YXIgciBpbiBuKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLHIpJiYoZVtyXT1uW3JdKX1yZXR1cm4gZX0pLmFwcGx5KHRoaXMsYXJndW1lbnRzKX12YXIgbD1mdW5jdGlvbihlLHQpe2Zvcih2YXIgbj1bZVswXV0scj0wLG89dC5sZW5ndGg7cjxvO3IrPTEpbi5wdXNoKHRbcl0sZVtyKzFdKTtyZXR1cm4gbn0sZD1mdW5jdGlvbihlKXtyZXR1cm4gbnVsbCE9PWUmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZcIltvYmplY3QgT2JqZWN0XVwiPT09KGUudG9TdHJpbmc/ZS50b1N0cmluZygpOk9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSkmJiF0LnR5cGVPZihlKX0saD1PYmplY3QuZnJlZXplKFtdKSxwPU9iamVjdC5mcmVlemUoe30pO2Z1bmN0aW9uIGYoZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZX1mdW5jdGlvbiBtKGUpe3JldHVyblwicHJvZHVjdGlvblwiIT09cHJvY2Vzcy5lbnYuTk9ERV9FTlYmJlwic3RyaW5nXCI9PXR5cGVvZiBlJiZlfHxlLmRpc3BsYXlOYW1lfHxlLm5hbWV8fFwiQ29tcG9uZW50XCJ9ZnVuY3Rpb24geShlKXtyZXR1cm4gZSYmXCJzdHJpbmdcIj09dHlwZW9mIGUuc3R5bGVkQ29tcG9uZW50SWR9dmFyIHY9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHByb2Nlc3MmJnZvaWQgMCE9PXByb2Nlc3MuZW52JiYocHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX1NDX0FUVFJ8fHByb2Nlc3MuZW52LlNDX0FUVFIpfHxcImRhdGEtc3R5bGVkXCIsZz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZcIkhUTUxFbGVtZW50XCJpbiB3aW5kb3csUz1Cb29sZWFuKFwiYm9vbGVhblwiPT10eXBlb2YgU0NfRElTQUJMRV9TUEVFRFk/U0NfRElTQUJMRV9TUEVFRFk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHByb2Nlc3MmJnZvaWQgMCE9PXByb2Nlc3MuZW52JiYodm9pZCAwIT09cHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX1NDX0RJU0FCTEVfU1BFRURZJiZcIlwiIT09cHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX1NDX0RJU0FCTEVfU1BFRURZP1wiZmFsc2VcIiE9PXByb2Nlc3MuZW52LlJFQUNUX0FQUF9TQ19ESVNBQkxFX1NQRUVEWSYmcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX1NDX0RJU0FCTEVfU1BFRURZOnZvaWQgMCE9PXByb2Nlc3MuZW52LlNDX0RJU0FCTEVfU1BFRURZJiZcIlwiIT09cHJvY2Vzcy5lbnYuU0NfRElTQUJMRV9TUEVFRFk/XCJmYWxzZVwiIT09cHJvY2Vzcy5lbnYuU0NfRElTQUJMRV9TUEVFRFkmJnByb2Nlc3MuZW52LlNDX0RJU0FCTEVfU1BFRURZOlwicHJvZHVjdGlvblwiIT09cHJvY2Vzcy5lbnYuTk9ERV9FTlYpKSx3PXt9LEU9XCJwcm9kdWN0aW9uXCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOVj97MTpcIkNhbm5vdCBjcmVhdGUgc3R5bGVkLWNvbXBvbmVudCBmb3IgY29tcG9uZW50OiAlcy5cXG5cXG5cIiwyOlwiQ2FuJ3QgY29sbGVjdCBzdHlsZXMgb25jZSB5b3UndmUgY29uc3VtZWQgYSBgU2VydmVyU3R5bGVTaGVldGAncyBzdHlsZXMhIGBTZXJ2ZXJTdHlsZVNoZWV0YCBpcyBhIG9uZSBvZmYgaW5zdGFuY2UgZm9yIGVhY2ggc2VydmVyLXNpZGUgcmVuZGVyIGN5Y2xlLlxcblxcbi0gQXJlIHlvdSB0cnlpbmcgdG8gcmV1c2UgaXQgYWNyb3NzIHJlbmRlcnM/XFxuLSBBcmUgeW91IGFjY2lkZW50YWxseSBjYWxsaW5nIGNvbGxlY3RTdHlsZXMgdHdpY2U/XFxuXFxuXCIsMzpcIlN0cmVhbWluZyBTU1IgaXMgb25seSBzdXBwb3J0ZWQgaW4gYSBOb2RlLmpzIGVudmlyb25tZW50OyBQbGVhc2UgZG8gbm90IHRyeSB0byBjYWxsIHRoaXMgbWV0aG9kIGluIHRoZSBicm93c2VyLlxcblxcblwiLDQ6XCJUaGUgYFN0eWxlU2hlZXRNYW5hZ2VyYCBleHBlY3RzIGEgdmFsaWQgdGFyZ2V0IG9yIHNoZWV0IHByb3AhXFxuXFxuLSBEb2VzIHRoaXMgZXJyb3Igb2NjdXIgb24gdGhlIGNsaWVudCBhbmQgaXMgeW91ciB0YXJnZXQgZmFsc3k/XFxuLSBEb2VzIHRoaXMgZXJyb3Igb2NjdXIgb24gdGhlIHNlcnZlciBhbmQgaXMgdGhlIHNoZWV0IGZhbHN5P1xcblxcblwiLDU6XCJUaGUgY2xvbmUgbWV0aG9kIGNhbm5vdCBiZSB1c2VkIG9uIHRoZSBjbGllbnQhXFxuXFxuLSBBcmUgeW91IHJ1bm5pbmcgaW4gYSBjbGllbnQtbGlrZSBlbnZpcm9ubWVudCBvbiB0aGUgc2VydmVyP1xcbi0gQXJlIHlvdSB0cnlpbmcgdG8gcnVuIFNTUiBvbiB0aGUgY2xpZW50P1xcblxcblwiLDY6XCJUcnlpbmcgdG8gaW5zZXJ0IGEgbmV3IHN0eWxlIHRhZywgYnV0IHRoZSBnaXZlbiBOb2RlIGlzIHVubW91bnRlZCFcXG5cXG4tIEFyZSB5b3UgdXNpbmcgYSBjdXN0b20gdGFyZ2V0IHRoYXQgaXNuJ3QgbW91bnRlZD9cXG4tIERvZXMgeW91ciBkb2N1bWVudCBub3QgaGF2ZSBhIHZhbGlkIGhlYWQgZWxlbWVudD9cXG4tIEhhdmUgeW91IGFjY2lkZW50YWxseSByZW1vdmVkIGEgc3R5bGUgdGFnIG1hbnVhbGx5P1xcblxcblwiLDc6J1RoZW1lUHJvdmlkZXI6IFBsZWFzZSByZXR1cm4gYW4gb2JqZWN0IGZyb20geW91ciBcInRoZW1lXCIgcHJvcCBmdW5jdGlvbiwgZS5nLlxcblxcbmBgYGpzXFxudGhlbWU9eygpID0+ICh7fSl9XFxuYGBgXFxuXFxuJyw4OidUaGVtZVByb3ZpZGVyOiBQbGVhc2UgbWFrZSB5b3VyIFwidGhlbWVcIiBwcm9wIGFuIG9iamVjdC5cXG5cXG4nLDk6XCJNaXNzaW5nIGRvY3VtZW50IGA8aGVhZD5gXFxuXFxuXCIsMTA6XCJDYW5ub3QgZmluZCBhIFN0eWxlU2hlZXQgaW5zdGFuY2UuIFVzdWFsbHkgdGhpcyBoYXBwZW5zIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBjb3BpZXMgb2Ygc3R5bGVkLWNvbXBvbmVudHMgbG9hZGVkIGF0IG9uY2UuIENoZWNrIG91dCB0aGlzIGlzc3VlIGZvciBob3cgdG8gdHJvdWJsZXNob290IGFuZCBmaXggdGhlIGNvbW1vbiBjYXNlcyB3aGVyZSB0aGlzIHNpdHVhdGlvbiBjYW4gaGFwcGVuOiBodHRwczovL2dpdGh1Yi5jb20vc3R5bGVkLWNvbXBvbmVudHMvc3R5bGVkLWNvbXBvbmVudHMvaXNzdWVzLzE5NDEjaXNzdWVjb21tZW50LTQxNzg2MjAyMVxcblxcblwiLDExOlwiX1RoaXMgZXJyb3Igd2FzIHJlcGxhY2VkIHdpdGggYSBkZXYtdGltZSB3YXJuaW5nLCBpdCB3aWxsIGJlIGRlbGV0ZWQgZm9yIHY0IGZpbmFsLl8gW2NyZWF0ZUdsb2JhbFN0eWxlXSByZWNlaXZlZCBjaGlsZHJlbiB3aGljaCB3aWxsIG5vdCBiZSByZW5kZXJlZC4gUGxlYXNlIHVzZSB0aGUgY29tcG9uZW50IHdpdGhvdXQgcGFzc2luZyBjaGlsZHJlbiBlbGVtZW50cy5cXG5cXG5cIiwxMjpcIkl0IHNlZW1zIHlvdSBhcmUgaW50ZXJwb2xhdGluZyBhIGtleWZyYW1lIGRlY2xhcmF0aW9uICglcykgaW50byBhbiB1bnRhZ2dlZCBzdHJpbmcuIFRoaXMgd2FzIHN1cHBvcnRlZCBpbiBzdHlsZWQtY29tcG9uZW50cyB2MywgYnV0IGlzIG5vdCBsb25nZXIgc3VwcG9ydGVkIGluIHY0IGFzIGtleWZyYW1lcyBhcmUgbm93IGluamVjdGVkIG9uLWRlbWFuZC4gUGxlYXNlIHdyYXAgeW91ciBzdHJpbmcgaW4gdGhlIGNzc1xcXFxgXFxcXGAgaGVscGVyIHdoaWNoIGVuc3VyZXMgdGhlIHN0eWxlcyBhcmUgaW5qZWN0ZWQgY29ycmVjdGx5LiBTZWUgaHR0cHM6Ly93d3cuc3R5bGVkLWNvbXBvbmVudHMuY29tL2RvY3MvYXBpI2Nzc1xcblxcblwiLDEzOlwiJXMgaXMgbm90IGEgc3R5bGVkIGNvbXBvbmVudCBhbmQgY2Fubm90IGJlIHJlZmVycmVkIHRvIHZpYSBjb21wb25lbnQgc2VsZWN0b3IuIFNlZSBodHRwczovL3d3dy5zdHlsZWQtY29tcG9uZW50cy5jb20vZG9jcy9hZHZhbmNlZCNyZWZlcnJpbmctdG8tb3RoZXItY29tcG9uZW50cyBmb3IgbW9yZSBkZXRhaWxzLlxcblxcblwiLDE0OidUaGVtZVByb3ZpZGVyOiBcInRoZW1lXCIgcHJvcCBpcyByZXF1aXJlZC5cXG5cXG4nLDE1OlwiQSBzdHlsaXMgcGx1Z2luIGhhcyBiZWVuIHN1cHBsaWVkIHRoYXQgaXMgbm90IG5hbWVkLiBXZSBuZWVkIGEgbmFtZSBmb3IgZWFjaCBwbHVnaW4gdG8gYmUgYWJsZSB0byBwcmV2ZW50IHN0eWxpbmcgY29sbGlzaW9ucyBiZXR3ZWVuIGRpZmZlcmVudCBzdHlsaXMgY29uZmlndXJhdGlvbnMgd2l0aGluIHRoZSBzYW1lIGFwcC4gQmVmb3JlIHlvdSBwYXNzIHlvdXIgcGx1Z2luIHRvIGA8U3R5bGVTaGVldE1hbmFnZXIgc3R5bGlzUGx1Z2lucz17W119PmAsIHBsZWFzZSBtYWtlIHN1cmUgZWFjaCBwbHVnaW4gaXMgdW5pcXVlbHktbmFtZWQsIGUuZy5cXG5cXG5gYGBqc1xcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbXBvcnRlZFBsdWdpbiwgJ25hbWUnLCB7IHZhbHVlOiAnc29tZS11bmlxdWUtbmFtZScgfSk7XFxuYGBgXFxuXFxuXCIsMTY6XCJSZWFjaGVkIHRoZSBsaW1pdCBvZiBob3cgbWFueSBzdHlsZWQgY29tcG9uZW50cyBtYXkgYmUgY3JlYXRlZCBhdCBncm91cCAlcy5cXG5Zb3UgbWF5IG9ubHkgY3JlYXRlIHVwIHRvIDEsMDczLDc0MSw4MjQgY29tcG9uZW50cy4gSWYgeW91J3JlIGNyZWF0aW5nIGNvbXBvbmVudHMgZHluYW1pY2FsbHksXFxuYXMgZm9yIGluc3RhbmNlIGluIHlvdXIgcmVuZGVyIG1ldGhvZCB0aGVuIHlvdSBtYXkgYmUgcnVubmluZyBpbnRvIHRoaXMgbGltaXRhdGlvbi5cXG5cXG5cIiwxNzpcIkNTU1N0eWxlU2hlZXQgY291bGQgbm90IGJlIGZvdW5kIG9uIEhUTUxTdHlsZUVsZW1lbnQuXFxuSGFzIHN0eWxlZC1jb21wb25lbnRzJyBzdHlsZSB0YWcgYmVlbiB1bm1vdW50ZWQgb3IgYWx0ZXJlZCBieSBhbm90aGVyIHNjcmlwdD9cXG5cIn06e307ZnVuY3Rpb24gYigpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoPD0wP3ZvaWQgMDphcmd1bWVudHNbMF0sdD1bXSxuPTEscj1hcmd1bWVudHMubGVuZ3RoO248cjtuKz0xKXQucHVzaChuPDB8fGFyZ3VtZW50cy5sZW5ndGg8PW4/dm9pZCAwOmFyZ3VtZW50c1tuXSk7cmV0dXJuIHQuZm9yRWFjaCgoZnVuY3Rpb24odCl7ZT1lLnJlcGxhY2UoLyVbYS16XS8sdCl9KSksZX1mdW5jdGlvbiBfKGUpe2Zvcih2YXIgdD1hcmd1bWVudHMubGVuZ3RoLG49bmV3IEFycmF5KHQ+MT90LTE6MCkscj0xO3I8dDtyKyspbltyLTFdPWFyZ3VtZW50c1tyXTt0aHJvd1wicHJvZHVjdGlvblwiPT09cHJvY2Vzcy5lbnYuTk9ERV9FTlY/bmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQuIFNlZSBodHRwczovL2dpdC5pby9KVUlhRSNcIitlK1wiIGZvciBtb3JlIGluZm9ybWF0aW9uLlwiKyhuLmxlbmd0aD4wP1wiIEFyZ3M6IFwiK24uam9pbihcIiwgXCIpOlwiXCIpKTpuZXcgRXJyb3IoYi5hcHBseSh2b2lkIDAsW0VbZV1dLmNvbmNhdChuKSkudHJpbSgpKX12YXIgTj1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSl7dGhpcy5ncm91cFNpemVzPW5ldyBVaW50MzJBcnJheSg1MTIpLHRoaXMubGVuZ3RoPTUxMix0aGlzLnRhZz1lfXZhciB0PWUucHJvdG90eXBlO3JldHVybiB0LmluZGV4T2ZHcm91cD1mdW5jdGlvbihlKXtmb3IodmFyIHQ9MCxuPTA7bjxlO24rKyl0Kz10aGlzLmdyb3VwU2l6ZXNbbl07cmV0dXJuIHR9LHQuaW5zZXJ0UnVsZXM9ZnVuY3Rpb24oZSx0KXtpZihlPj10aGlzLmdyb3VwU2l6ZXMubGVuZ3RoKXtmb3IodmFyIG49dGhpcy5ncm91cFNpemVzLHI9bi5sZW5ndGgsbz1yO2U+PW87KShvPDw9MSk8MCYmXygxNixcIlwiK2UpO3RoaXMuZ3JvdXBTaXplcz1uZXcgVWludDMyQXJyYXkobyksdGhpcy5ncm91cFNpemVzLnNldChuKSx0aGlzLmxlbmd0aD1vO2Zvcih2YXIgcz1yO3M8bztzKyspdGhpcy5ncm91cFNpemVzW3NdPTB9Zm9yKHZhciBpPXRoaXMuaW5kZXhPZkdyb3VwKGUrMSksYT0wLGM9dC5sZW5ndGg7YTxjO2ErKyl0aGlzLnRhZy5pbnNlcnRSdWxlKGksdFthXSkmJih0aGlzLmdyb3VwU2l6ZXNbZV0rKyxpKyspfSx0LmNsZWFyR3JvdXA9ZnVuY3Rpb24oZSl7aWYoZTx0aGlzLmxlbmd0aCl7dmFyIHQ9dGhpcy5ncm91cFNpemVzW2VdLG49dGhpcy5pbmRleE9mR3JvdXAoZSkscj1uK3Q7dGhpcy5ncm91cFNpemVzW2VdPTA7Zm9yKHZhciBvPW47bzxyO28rKyl0aGlzLnRhZy5kZWxldGVSdWxlKG4pfX0sdC5nZXRHcm91cD1mdW5jdGlvbihlKXt2YXIgdD1cIlwiO2lmKGU+PXRoaXMubGVuZ3RofHwwPT09dGhpcy5ncm91cFNpemVzW2VdKXJldHVybiB0O2Zvcih2YXIgbj10aGlzLmdyb3VwU2l6ZXNbZV0scj10aGlzLmluZGV4T2ZHcm91cChlKSxvPXIrbixzPXI7czxvO3MrKyl0Kz10aGlzLnRhZy5nZXRSdWxlKHMpK1wiLyohc2MqL1xcblwiO3JldHVybiB0fSxlfSgpLEM9bmV3IE1hcCxBPW5ldyBNYXAsST0xLFA9ZnVuY3Rpb24oZSl7aWYoQy5oYXMoZSkpcmV0dXJuIEMuZ2V0KGUpO2Zvcig7QS5oYXMoSSk7KUkrKzt2YXIgdD1JKys7cmV0dXJuXCJwcm9kdWN0aW9uXCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOViYmKCgwfHQpPDB8fHQ+MTw8MzApJiZfKDE2LFwiXCIrdCksQy5zZXQoZSx0KSxBLnNldCh0LGUpLHR9LE89ZnVuY3Rpb24oZSl7cmV0dXJuIEEuZ2V0KGUpfSx4PWZ1bmN0aW9uKGUsdCl7dD49SSYmKEk9dCsxKSxDLnNldChlLHQpLEEuc2V0KHQsZSl9LFI9XCJzdHlsZVtcIit2KyddW2RhdGEtc3R5bGVkLXZlcnNpb249XCI1LjMuOVwiXScsRD1uZXcgUmVnRXhwKFwiXlwiK3YrJ1xcXFwuZyhcXFxcZCspXFxcXFtpZD1cIihbXFxcXHdcXFxcZC1dKylcIlxcXFxdLio/XCIoW15cIl0qKScpLFQ9ZnVuY3Rpb24oZSx0LG4pe2Zvcih2YXIgcixvPW4uc3BsaXQoXCIsXCIpLHM9MCxpPW8ubGVuZ3RoO3M8aTtzKyspKHI9b1tzXSkmJmUucmVnaXN0ZXJOYW1lKHQscil9LGo9ZnVuY3Rpb24oZSx0KXtmb3IodmFyIG49KHQudGV4dENvbnRlbnR8fFwiXCIpLnNwbGl0KFwiLyohc2MqL1xcblwiKSxyPVtdLG89MCxzPW4ubGVuZ3RoO288cztvKyspe3ZhciBpPW5bb10udHJpbSgpO2lmKGkpe3ZhciBhPWkubWF0Y2goRCk7aWYoYSl7dmFyIGM9MHxwYXJzZUludChhWzFdLDEwKSx1PWFbMl07MCE9PWMmJih4KHUsYyksVChlLHUsYVszXSksZS5nZXRUYWcoKS5pbnNlcnRSdWxlcyhjLHIpKSxyLmxlbmd0aD0wfWVsc2Ugci5wdXNoKGkpfX19LGs9ZnVuY3Rpb24oKXtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2YgX193ZWJwYWNrX25vbmNlX18/X193ZWJwYWNrX25vbmNlX186bnVsbH0sVj1mdW5jdGlvbihlKXt2YXIgdD1kb2N1bWVudC5oZWFkLG49ZXx8dCxyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKSxvPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1lLmNoaWxkTm9kZXMsbj10Lmxlbmd0aDtuPj0wO24tLSl7dmFyIHI9dFtuXTtpZihyJiYxPT09ci5ub2RlVHlwZSYmci5oYXNBdHRyaWJ1dGUodikpcmV0dXJuIHJ9fShuKSxzPXZvaWQgMCE9PW8/by5uZXh0U2libGluZzpudWxsO3Iuc2V0QXR0cmlidXRlKHYsXCJhY3RpdmVcIiksci5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0eWxlZC12ZXJzaW9uXCIsXCI1LjMuOVwiKTt2YXIgaT1rKCk7cmV0dXJuIGkmJnIuc2V0QXR0cmlidXRlKFwibm9uY2VcIixpKSxuLmluc2VydEJlZm9yZShyLHMpLHJ9LE09ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUpe3ZhciB0PXRoaXMuZWxlbWVudD1WKGUpO3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIikpLHRoaXMuc2hlZXQ9ZnVuY3Rpb24oZSl7aWYoZS5zaGVldClyZXR1cm4gZS5zaGVldDtmb3IodmFyIHQ9ZG9jdW1lbnQuc3R5bGVTaGVldHMsbj0wLHI9dC5sZW5ndGg7bjxyO24rKyl7dmFyIG89dFtuXTtpZihvLm93bmVyTm9kZT09PWUpcmV0dXJuIG99XygxNyl9KHQpLHRoaXMubGVuZ3RoPTB9dmFyIHQ9ZS5wcm90b3R5cGU7cmV0dXJuIHQuaW5zZXJ0UnVsZT1mdW5jdGlvbihlLHQpe3RyeXtyZXR1cm4gdGhpcy5zaGVldC5pbnNlcnRSdWxlKHQsZSksdGhpcy5sZW5ndGgrKywhMH1jYXRjaChlKXtyZXR1cm4hMX19LHQuZGVsZXRlUnVsZT1mdW5jdGlvbihlKXt0aGlzLnNoZWV0LmRlbGV0ZVJ1bGUoZSksdGhpcy5sZW5ndGgtLX0sdC5nZXRSdWxlPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuc2hlZXQuY3NzUnVsZXNbZV07cmV0dXJuIHZvaWQgMCE9PXQmJlwic3RyaW5nXCI9PXR5cGVvZiB0LmNzc1RleHQ/dC5jc3NUZXh0OlwiXCJ9LGV9KCksQj1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSl7dmFyIHQ9dGhpcy5lbGVtZW50PVYoZSk7dGhpcy5ub2Rlcz10LmNoaWxkTm9kZXMsdGhpcy5sZW5ndGg9MH12YXIgdD1lLnByb3RvdHlwZTtyZXR1cm4gdC5pbnNlcnRSdWxlPWZ1bmN0aW9uKGUsdCl7aWYoZTw9dGhpcy5sZW5ndGgmJmU+PTApe3ZhciBuPWRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHQpLHI9dGhpcy5ub2Rlc1tlXTtyZXR1cm4gdGhpcy5lbGVtZW50Lmluc2VydEJlZm9yZShuLHJ8fG51bGwpLHRoaXMubGVuZ3RoKyssITB9cmV0dXJuITF9LHQuZGVsZXRlUnVsZT1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5ub2Rlc1tlXSksdGhpcy5sZW5ndGgtLX0sdC5nZXRSdWxlPWZ1bmN0aW9uKGUpe3JldHVybiBlPHRoaXMubGVuZ3RoP3RoaXMubm9kZXNbZV0udGV4dENvbnRlbnQ6XCJcIn0sZX0oKSx6PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlKXt0aGlzLnJ1bGVzPVtdLHRoaXMubGVuZ3RoPTB9dmFyIHQ9ZS5wcm90b3R5cGU7cmV0dXJuIHQuaW5zZXJ0UnVsZT1mdW5jdGlvbihlLHQpe3JldHVybiBlPD10aGlzLmxlbmd0aCYmKHRoaXMucnVsZXMuc3BsaWNlKGUsMCx0KSx0aGlzLmxlbmd0aCsrLCEwKX0sdC5kZWxldGVSdWxlPWZ1bmN0aW9uKGUpe3RoaXMucnVsZXMuc3BsaWNlKGUsMSksdGhpcy5sZW5ndGgtLX0sdC5nZXRSdWxlPWZ1bmN0aW9uKGUpe3JldHVybiBlPHRoaXMubGVuZ3RoP3RoaXMucnVsZXNbZV06XCJcIn0sZX0oKSxxPWcsRz17aXNTZXJ2ZXI6IWcsdXNlQ1NTT01JbmplY3Rpb246IVN9LEw9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCxuKXt2b2lkIDA9PT1lJiYoZT1wKSx2b2lkIDA9PT10JiYodD17fSksdGhpcy5vcHRpb25zPXUoe30sRyx7fSxlKSx0aGlzLmdzPXQsdGhpcy5uYW1lcz1uZXcgTWFwKG4pLHRoaXMuc2VydmVyPSEhZS5pc1NlcnZlciwhdGhpcy5zZXJ2ZXImJmcmJnEmJihxPSExLGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFIpLG49MCxyPXQubGVuZ3RoO248cjtuKyspe3ZhciBvPXRbbl07byYmXCJhY3RpdmVcIiE9PW8uZ2V0QXR0cmlidXRlKHYpJiYoaihlLG8pLG8ucGFyZW50Tm9kZSYmby5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG8pKX19KHRoaXMpKX1lLnJlZ2lzdGVySWQ9ZnVuY3Rpb24oZSl7cmV0dXJuIFAoZSl9O3ZhciB0PWUucHJvdG90eXBlO3JldHVybiB0LnJlY29uc3RydWN0V2l0aE9wdGlvbnM9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdm9pZCAwPT09biYmKG49ITApLG5ldyBlKHUoe30sdGhpcy5vcHRpb25zLHt9LHQpLHRoaXMuZ3MsbiYmdGhpcy5uYW1lc3x8dm9pZCAwKX0sdC5hbGxvY2F0ZUdTSW5zdGFuY2U9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZ3NbZV09KHRoaXMuZ3NbZV18fDApKzF9LHQuZ2V0VGFnPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudGFnfHwodGhpcy50YWc9KG49KHQ9dGhpcy5vcHRpb25zKS5pc1NlcnZlcixyPXQudXNlQ1NTT01JbmplY3Rpb24sbz10LnRhcmdldCxlPW4/bmV3IHoobyk6cj9uZXcgTShvKTpuZXcgQihvKSxuZXcgTihlKSkpO3ZhciBlLHQsbixyLG99LHQuaGFzTmFtZUZvcklkPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMubmFtZXMuaGFzKGUpJiZ0aGlzLm5hbWVzLmdldChlKS5oYXModCl9LHQucmVnaXN0ZXJOYW1lPWZ1bmN0aW9uKGUsdCl7aWYoUChlKSx0aGlzLm5hbWVzLmhhcyhlKSl0aGlzLm5hbWVzLmdldChlKS5hZGQodCk7ZWxzZXt2YXIgbj1uZXcgU2V0O24uYWRkKHQpLHRoaXMubmFtZXMuc2V0KGUsbil9fSx0Lmluc2VydFJ1bGVzPWZ1bmN0aW9uKGUsdCxuKXt0aGlzLnJlZ2lzdGVyTmFtZShlLHQpLHRoaXMuZ2V0VGFnKCkuaW5zZXJ0UnVsZXMoUChlKSxuKX0sdC5jbGVhck5hbWVzPWZ1bmN0aW9uKGUpe3RoaXMubmFtZXMuaGFzKGUpJiZ0aGlzLm5hbWVzLmdldChlKS5jbGVhcigpfSx0LmNsZWFyUnVsZXM9ZnVuY3Rpb24oZSl7dGhpcy5nZXRUYWcoKS5jbGVhckdyb3VwKFAoZSkpLHRoaXMuY2xlYXJOYW1lcyhlKX0sdC5jbGVhclRhZz1mdW5jdGlvbigpe3RoaXMudGFnPXZvaWQgMH0sdC50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5nZXRUYWcoKSxuPXQubGVuZ3RoLHI9XCJcIixvPTA7bzxuO28rKyl7dmFyIHM9TyhvKTtpZih2b2lkIDAhPT1zKXt2YXIgaT1lLm5hbWVzLmdldChzKSxhPXQuZ2V0R3JvdXAobyk7aWYoaSYmYSYmaS5zaXplKXt2YXIgYz12K1wiLmdcIitvKydbaWQ9XCInK3MrJ1wiXScsdT1cIlwiO3ZvaWQgMCE9PWkmJmkuZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZS5sZW5ndGg+MCYmKHUrPWUrXCIsXCIpfSkpLHIrPVwiXCIrYStjKyd7Y29udGVudDpcIicrdSsnXCJ9Lyohc2MqL1xcbid9fX1yZXR1cm4gcn0odGhpcyl9LGV9KCksRj0vKGEpKGQpL2dpLFk9ZnVuY3Rpb24oZSl7cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZSsoZT4yNT8zOTo5NykpfTtmdW5jdGlvbiBIKGUpe3ZhciB0LG49XCJcIjtmb3IodD1NYXRoLmFicyhlKTt0PjUyO3Q9dC81MnwwKW49WSh0JTUyKStuO3JldHVybihZKHQlNTIpK24pLnJlcGxhY2UoRixcIiQxLSQyXCIpfXZhciAkPWZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPXQubGVuZ3RoO247KWU9MzMqZV50LmNoYXJDb2RlQXQoLS1uKTtyZXR1cm4gZX0sVz1mdW5jdGlvbihlKXtyZXR1cm4gJCg1MzgxLGUpfTtmdW5jdGlvbiBVKGUpe2Zvcih2YXIgdD0wO3Q8ZS5sZW5ndGg7dCs9MSl7dmFyIG49ZVt0XTtpZihmKG4pJiYheShuKSlyZXR1cm4hMX1yZXR1cm4hMH12YXIgSj1XKFwiNS4zLjlcIiksWD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0LG4pe3RoaXMucnVsZXM9ZSx0aGlzLnN0YXRpY1J1bGVzSWQ9XCJcIix0aGlzLmlzU3RhdGljPVwicHJvZHVjdGlvblwiPT09cHJvY2Vzcy5lbnYuTk9ERV9FTlYmJih2b2lkIDA9PT1ufHxuLmlzU3RhdGljKSYmVShlKSx0aGlzLmNvbXBvbmVudElkPXQsdGhpcy5iYXNlSGFzaD0kKEosdCksdGhpcy5iYXNlU3R5bGU9bixMLnJlZ2lzdGVySWQodCl9cmV0dXJuIGUucHJvdG90eXBlLmdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzPWZ1bmN0aW9uKGUsdCxuKXt2YXIgcj10aGlzLmNvbXBvbmVudElkLG89W107aWYodGhpcy5iYXNlU3R5bGUmJm8ucHVzaCh0aGlzLmJhc2VTdHlsZS5nZW5lcmF0ZUFuZEluamVjdFN0eWxlcyhlLHQsbikpLHRoaXMuaXNTdGF0aWMmJiFuLmhhc2gpaWYodGhpcy5zdGF0aWNSdWxlc0lkJiZ0Lmhhc05hbWVGb3JJZChyLHRoaXMuc3RhdGljUnVsZXNJZCkpby5wdXNoKHRoaXMuc3RhdGljUnVsZXNJZCk7ZWxzZXt2YXIgcz1tZSh0aGlzLnJ1bGVzLGUsdCxuKS5qb2luKFwiXCIpLGk9SCgkKHRoaXMuYmFzZUhhc2gscyk+Pj4wKTtpZighdC5oYXNOYW1lRm9ySWQocixpKSl7dmFyIGE9bihzLFwiLlwiK2ksdm9pZCAwLHIpO3QuaW5zZXJ0UnVsZXMocixpLGEpfW8ucHVzaChpKSx0aGlzLnN0YXRpY1J1bGVzSWQ9aX1lbHNle2Zvcih2YXIgYz10aGlzLnJ1bGVzLmxlbmd0aCx1PSQodGhpcy5iYXNlSGFzaCxuLmhhc2gpLGw9XCJcIixkPTA7ZDxjO2QrKyl7dmFyIGg9dGhpcy5ydWxlc1tkXTtpZihcInN0cmluZ1wiPT10eXBlb2YgaClsKz1oLFwicHJvZHVjdGlvblwiIT09cHJvY2Vzcy5lbnYuTk9ERV9FTlYmJih1PSQodSxoK2QpKTtlbHNlIGlmKGgpe3ZhciBwPW1lKGgsZSx0LG4pLGY9QXJyYXkuaXNBcnJheShwKT9wLmpvaW4oXCJcIik6cDt1PSQodSxmK2QpLGwrPWZ9fWlmKGwpe3ZhciBtPUgodT4+PjApO2lmKCF0Lmhhc05hbWVGb3JJZChyLG0pKXt2YXIgeT1uKGwsXCIuXCIrbSx2b2lkIDAscik7dC5pbnNlcnRSdWxlcyhyLG0seSl9by5wdXNoKG0pfX1yZXR1cm4gby5qb2luKFwiIFwiKX0sZX0oKSxaPS9eXFxzKlxcL1xcLy4qJC9nbSxLPVtcIjpcIixcIltcIixcIi5cIixcIiNcIl07ZnVuY3Rpb24gUShlKXt2YXIgdCxuLHIsbyxpPXZvaWQgMD09PWU/cDplLGE9aS5vcHRpb25zLGM9dm9pZCAwPT09YT9wOmEsdT1pLnBsdWdpbnMsbD12b2lkIDA9PT11P2g6dSxkPW5ldyBzKGMpLGY9W10sbT1mdW5jdGlvbihlKXtmdW5jdGlvbiB0KHQpe2lmKHQpdHJ5e2UodCtcIn1cIil9Y2F0Y2goZSl7fX1yZXR1cm4gZnVuY3Rpb24obixyLG8scyxpLGEsYyx1LGwsZCl7c3dpdGNoKG4pe2Nhc2UgMTppZigwPT09bCYmNjQ9PT1yLmNoYXJDb2RlQXQoMCkpcmV0dXJuIGUocitcIjtcIiksXCJcIjticmVhaztjYXNlIDI6aWYoMD09PXUpcmV0dXJuIHIrXCIvKnwqL1wiO2JyZWFrO2Nhc2UgMzpzd2l0Y2godSl7Y2FzZSAxMDI6Y2FzZSAxMTI6cmV0dXJuIGUob1swXStyKSxcIlwiO2RlZmF1bHQ6cmV0dXJuIHIrKDA9PT1kP1wiLyp8Ki9cIjpcIlwiKX1jYXNlLTI6ci5zcGxpdChcIi8qfCovfVwiKS5mb3JFYWNoKHQpfX19KChmdW5jdGlvbihlKXtmLnB1c2goZSl9KSkseT1mdW5jdGlvbihlLHIscyl7cmV0dXJuIDA9PT1yJiYtMSE9PUsuaW5kZXhPZihzW24ubGVuZ3RoXSl8fHMubWF0Y2gobyk/ZTpcIi5cIit0fTtmdW5jdGlvbiB2KGUscyxpLGEpe3ZvaWQgMD09PWEmJihhPVwiJlwiKTt2YXIgYz1lLnJlcGxhY2UoWixcIlwiKSx1PXMmJmk/aStcIiBcIitzK1wiIHsgXCIrYytcIiB9XCI6YztyZXR1cm4gdD1hLG49cyxyPW5ldyBSZWdFeHAoXCJcXFxcXCIrbitcIlxcXFxiXCIsXCJnXCIpLG89bmV3IFJlZ0V4cChcIihcXFxcXCIrbitcIlxcXFxiKXsyLH1cIiksZChpfHwhcz9cIlwiOnMsdSl9cmV0dXJuIGQudXNlKFtdLmNvbmNhdChsLFtmdW5jdGlvbihlLHQsbyl7Mj09PWUmJm8ubGVuZ3RoJiZvWzBdLmxhc3RJbmRleE9mKG4pPjAmJihvWzBdPW9bMF0ucmVwbGFjZShyLHkpKX0sbSxmdW5jdGlvbihlKXtpZigtMj09PWUpe3ZhciB0PWY7cmV0dXJuIGY9W10sdH19XSkpLHYuaGFzaD1sLmxlbmd0aD9sLnJlZHVjZSgoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5uYW1lfHxfKDE1KSwkKGUsdC5uYW1lKX0pLDUzODEpLnRvU3RyaW5nKCk6XCJcIix2fXZhciBlZT1yLmNyZWF0ZUNvbnRleHQoKSx0ZT1lZS5Db25zdW1lcixuZT1yLmNyZWF0ZUNvbnRleHQoKSxyZT0obmUuQ29uc3VtZXIsbmV3IEwpLG9lPVEoKTtmdW5jdGlvbiBzZSgpe3JldHVybiBuLnVzZUNvbnRleHQoZWUpfHxyZX1mdW5jdGlvbiBpZSgpe3JldHVybiBuLnVzZUNvbnRleHQobmUpfHxvZX1mdW5jdGlvbiBhZShlKXt2YXIgdD1uLnVzZVN0YXRlKGUuc3R5bGlzUGx1Z2lucykscz10WzBdLGk9dFsxXSxhPXNlKCksYz1uLnVzZU1lbW8oKGZ1bmN0aW9uKCl7dmFyIHQ9YTtyZXR1cm4gZS5zaGVldD90PWUuc2hlZXQ6ZS50YXJnZXQmJih0PXQucmVjb25zdHJ1Y3RXaXRoT3B0aW9ucyh7dGFyZ2V0OmUudGFyZ2V0fSwhMSkpLGUuZGlzYWJsZUNTU09NSW5qZWN0aW9uJiYodD10LnJlY29uc3RydWN0V2l0aE9wdGlvbnMoe3VzZUNTU09NSW5qZWN0aW9uOiExfSkpLHR9KSxbZS5kaXNhYmxlQ1NTT01JbmplY3Rpb24sZS5zaGVldCxlLnRhcmdldF0pLHU9bi51c2VNZW1vKChmdW5jdGlvbigpe3JldHVybiBRKHtvcHRpb25zOntwcmVmaXg6IWUuZGlzYWJsZVZlbmRvclByZWZpeGVzfSxwbHVnaW5zOnN9KX0pLFtlLmRpc2FibGVWZW5kb3JQcmVmaXhlcyxzXSk7cmV0dXJuIG4udXNlRWZmZWN0KChmdW5jdGlvbigpe28ocyxlLnN0eWxpc1BsdWdpbnMpfHxpKGUuc3R5bGlzUGx1Z2lucyl9KSxbZS5zdHlsaXNQbHVnaW5zXSksci5jcmVhdGVFbGVtZW50KGVlLlByb3ZpZGVyLHt2YWx1ZTpjfSxyLmNyZWF0ZUVsZW1lbnQobmUuUHJvdmlkZXIse3ZhbHVlOnV9LFwicHJvZHVjdGlvblwiIT09cHJvY2Vzcy5lbnYuTk9ERV9FTlY/ci5DaGlsZHJlbi5vbmx5KGUuY2hpbGRyZW4pOmUuY2hpbGRyZW4pKX12YXIgY2U9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7dmFyIG49dGhpczt0aGlzLmluamVjdD1mdW5jdGlvbihlLHQpe3ZvaWQgMD09PXQmJih0PW9lKTt2YXIgcj1uLm5hbWUrdC5oYXNoO2UuaGFzTmFtZUZvcklkKG4uaWQscil8fGUuaW5zZXJ0UnVsZXMobi5pZCxyLHQobi5ydWxlcyxyLFwiQGtleWZyYW1lc1wiKSl9LHRoaXMudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gXygxMixTdHJpbmcobi5uYW1lKSl9LHRoaXMubmFtZT1lLHRoaXMuaWQ9XCJzYy1rZXlmcmFtZXMtXCIrZSx0aGlzLnJ1bGVzPXR9cmV0dXJuIGUucHJvdG90eXBlLmdldE5hbWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHZvaWQgMD09PWUmJihlPW9lKSx0aGlzLm5hbWUrZS5oYXNofSxlfSgpLHVlPS8oW0EtWl0pLyxsZT0vKFtBLVpdKS9nLGRlPS9ebXMtLyxoZT1mdW5jdGlvbihlKXtyZXR1cm5cIi1cIitlLnRvTG93ZXJDYXNlKCl9O2Z1bmN0aW9uIHBlKGUpe3JldHVybiB1ZS50ZXN0KGUpP2UucmVwbGFjZShsZSxoZSkucmVwbGFjZShkZSxcIi1tcy1cIik6ZX12YXIgZmU9ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGw9PWV8fCExPT09ZXx8XCJcIj09PWV9O2Z1bmN0aW9uIG1lKGUsbixyLG8pe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgcyxhPVtdLGM9MCx1PWUubGVuZ3RoO2M8dTtjKz0xKVwiXCIhPT0ocz1tZShlW2NdLG4scixvKSkmJihBcnJheS5pc0FycmF5KHMpP2EucHVzaC5hcHBseShhLHMpOmEucHVzaChzKSk7cmV0dXJuIGF9aWYoZmUoZSkpcmV0dXJuXCJcIjtpZih5KGUpKXJldHVyblwiLlwiK2Uuc3R5bGVkQ29tcG9uZW50SWQ7aWYoZihlKSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YoaD1lKXx8aC5wcm90b3R5cGUmJmgucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnR8fCFuKXJldHVybiBlO3ZhciBsPWUobik7cmV0dXJuXCJwcm9kdWN0aW9uXCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOViYmdC5pc0VsZW1lbnQobCkmJmNvbnNvbGUud2FybihtKGUpK1wiIGlzIG5vdCBhIHN0eWxlZCBjb21wb25lbnQgYW5kIGNhbm5vdCBiZSByZWZlcnJlZCB0byB2aWEgY29tcG9uZW50IHNlbGVjdG9yLiBTZWUgaHR0cHM6Ly93d3cuc3R5bGVkLWNvbXBvbmVudHMuY29tL2RvY3MvYWR2YW5jZWQjcmVmZXJyaW5nLXRvLW90aGVyLWNvbXBvbmVudHMgZm9yIG1vcmUgZGV0YWlscy5cIiksbWUobCxuLHIsbyl9dmFyIGg7cmV0dXJuIGUgaW5zdGFuY2VvZiBjZT9yPyhlLmluamVjdChyLG8pLGUuZ2V0TmFtZShvKSk6ZTpkKGUpP2Z1bmN0aW9uIGUodCxuKXt2YXIgcixvLHM9W107Zm9yKHZhciBhIGluIHQpdC5oYXNPd25Qcm9wZXJ0eShhKSYmIWZlKHRbYV0pJiYoQXJyYXkuaXNBcnJheSh0W2FdKSYmdFthXS5pc0Nzc3x8Zih0W2FdKT9zLnB1c2gocGUoYSkrXCI6XCIsdFthXSxcIjtcIik6ZCh0W2FdKT9zLnB1c2guYXBwbHkocyxlKHRbYV0sYSkpOnMucHVzaChwZShhKStcIjogXCIrKHI9YSxudWxsPT0obz10W2FdKXx8XCJib29sZWFuXCI9PXR5cGVvZiBvfHxcIlwiPT09bz9cIlwiOlwibnVtYmVyXCIhPXR5cGVvZiBvfHwwPT09b3x8ciBpbiBpP1N0cmluZyhvKS50cmltKCk6bytcInB4XCIpK1wiO1wiKSk7cmV0dXJuIG4/W24rXCIge1wiXS5jb25jYXQocyxbXCJ9XCJdKTpzfShlKTplLnRvU3RyaW5nKCl9dmFyIHllPWZ1bmN0aW9uKGUpe3JldHVybiBBcnJheS5pc0FycmF5KGUpJiYoZS5pc0Nzcz0hMCksZX07ZnVuY3Rpb24gdmUoZSl7Zm9yKHZhciB0PWFyZ3VtZW50cy5sZW5ndGgsbj1uZXcgQXJyYXkodD4xP3QtMTowKSxyPTE7cjx0O3IrKyluW3ItMV09YXJndW1lbnRzW3JdO3JldHVybiBmKGUpfHxkKGUpP3llKG1lKGwoaCxbZV0uY29uY2F0KG4pKSkpOjA9PT1uLmxlbmd0aCYmMT09PWUubGVuZ3RoJiZcInN0cmluZ1wiPT10eXBlb2YgZVswXT9lOnllKG1lKGwoZSxuKSkpfXZhciBnZT0vaW52YWxpZCBob29rIGNhbGwvaSxTZT1uZXcgU2V0LHdlPWZ1bmN0aW9uKGUsdCl7aWYoXCJwcm9kdWN0aW9uXCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOVil7dmFyIHI9XCJUaGUgY29tcG9uZW50IFwiK2UrKHQ/JyB3aXRoIHRoZSBpZCBvZiBcIicrdCsnXCInOlwiXCIpK1wiIGhhcyBiZWVuIGNyZWF0ZWQgZHluYW1pY2FsbHkuXFxuWW91IG1heSBzZWUgdGhpcyB3YXJuaW5nIGJlY2F1c2UgeW91J3ZlIGNhbGxlZCBzdHlsZWQgaW5zaWRlIGFub3RoZXIgY29tcG9uZW50LlxcblRvIHJlc29sdmUgdGhpcyBvbmx5IGNyZWF0ZSBuZXcgU3R5bGVkQ29tcG9uZW50cyBvdXRzaWRlIG9mIGFueSByZW5kZXIgbWV0aG9kIGFuZCBmdW5jdGlvbiBjb21wb25lbnQuXCIsbz1jb25zb2xlLmVycm9yO3RyeXt2YXIgcz0hMDtjb25zb2xlLmVycm9yPWZ1bmN0aW9uKGUpe2lmKGdlLnRlc3QoZSkpcz0hMSxTZS5kZWxldGUocik7ZWxzZXtmb3IodmFyIHQ9YXJndW1lbnRzLmxlbmd0aCxuPW5ldyBBcnJheSh0PjE/dC0xOjApLGk9MTtpPHQ7aSsrKW5baS0xXT1hcmd1bWVudHNbaV07by5hcHBseSh2b2lkIDAsW2VdLmNvbmNhdChuKSl9fSxuLnVzZVJlZigpLHMmJiFTZS5oYXMocikmJihjb25zb2xlLndhcm4ociksU2UuYWRkKHIpKX1jYXRjaChlKXtnZS50ZXN0KGUubWVzc2FnZSkmJlNlLmRlbGV0ZShyKX1maW5hbGx5e2NvbnNvbGUuZXJyb3I9b319fSxFZT1mdW5jdGlvbihlLHQsbil7cmV0dXJuIHZvaWQgMD09PW4mJihuPXApLGUudGhlbWUhPT1uLnRoZW1lJiZlLnRoZW1lfHx0fHxuLnRoZW1lfSxiZT0vWyFcIiMkJSYnKCkqKywuLzo7PD0+P0BbXFxcXFxcXV5ge3x9fi1dKy9nLF9lPS8oXi18LSQpL2c7ZnVuY3Rpb24gTmUoZSl7cmV0dXJuIGUucmVwbGFjZShiZSxcIi1cIikucmVwbGFjZShfZSxcIlwiKX12YXIgQ2U9ZnVuY3Rpb24oZSl7cmV0dXJuIEgoVyhlKT4+PjApfTtmdW5jdGlvbiBBZShlKXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZSYmKFwicHJvZHVjdGlvblwiPT09cHJvY2Vzcy5lbnYuTk9ERV9FTlZ8fGUuY2hhckF0KDApPT09ZS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSl9dmFyIEllPWZ1bmN0aW9uKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGV8fFwib2JqZWN0XCI9PXR5cGVvZiBlJiZudWxsIT09ZSYmIUFycmF5LmlzQXJyYXkoZSl9LFBlPWZ1bmN0aW9uKGUpe3JldHVyblwiX19wcm90b19fXCIhPT1lJiZcImNvbnN0cnVjdG9yXCIhPT1lJiZcInByb3RvdHlwZVwiIT09ZX07ZnVuY3Rpb24gT2UoZSx0LG4pe3ZhciByPWVbbl07SWUodCkmJkllKHIpP3hlKHIsdCk6ZVtuXT10fWZ1bmN0aW9uIHhlKGUpe2Zvcih2YXIgdD1hcmd1bWVudHMubGVuZ3RoLG49bmV3IEFycmF5KHQ+MT90LTE6MCkscj0xO3I8dDtyKyspbltyLTFdPWFyZ3VtZW50c1tyXTtmb3IodmFyIG89MCxzPW47bzxzLmxlbmd0aDtvKyspe3ZhciBpPXNbb107aWYoSWUoaSkpZm9yKHZhciBhIGluIGkpUGUoYSkmJk9lKGUsaVthXSxhKX1yZXR1cm4gZX12YXIgUmU9ci5jcmVhdGVDb250ZXh0KCksRGU9UmUuQ29uc3VtZXIsVGU9e307ZnVuY3Rpb24gamUoZSx0LG8pe3ZhciBzPXkoZSksaT0hQWUoZSksbD10LmF0dHJzLGQ9dm9pZCAwPT09bD9oOmwsdj10LmNvbXBvbmVudElkLGc9dm9pZCAwPT09dj9mdW5jdGlvbihlLHQpe3ZhciBuPVwic3RyaW5nXCIhPXR5cGVvZiBlP1wic2NcIjpOZShlKTtUZVtuXT0oVGVbbl18fDApKzE7dmFyIHI9bitcIi1cIitDZShcIjUuMy45XCIrbitUZVtuXSk7cmV0dXJuIHQ/dCtcIi1cIityOnJ9KHQuZGlzcGxheU5hbWUsdC5wYXJlbnRDb21wb25lbnRJZCk6dixTPXQuZGlzcGxheU5hbWUsdz12b2lkIDA9PT1TP2Z1bmN0aW9uKGUpe3JldHVybiBBZShlKT9cInN0eWxlZC5cIitlOlwiU3R5bGVkKFwiK20oZSkrXCIpXCJ9KGUpOlMsRT10LmRpc3BsYXlOYW1lJiZ0LmNvbXBvbmVudElkP05lKHQuZGlzcGxheU5hbWUpK1wiLVwiK3QuY29tcG9uZW50SWQ6dC5jb21wb25lbnRJZHx8ZyxiPXMmJmUuYXR0cnM/QXJyYXkucHJvdG90eXBlLmNvbmNhdChlLmF0dHJzLGQpLmZpbHRlcihCb29sZWFuKTpkLF89dC5zaG91bGRGb3J3YXJkUHJvcDtzJiZlLnNob3VsZEZvcndhcmRQcm9wJiYoXz10LnNob3VsZEZvcndhcmRQcm9wP2Z1bmN0aW9uKG4scixvKXtyZXR1cm4gZS5zaG91bGRGb3J3YXJkUHJvcChuLHIsbykmJnQuc2hvdWxkRm9yd2FyZFByb3AobixyLG8pfTplLnNob3VsZEZvcndhcmRQcm9wKTt2YXIgTixDPW5ldyBYKG8sRSxzP2UuY29tcG9uZW50U3R5bGU6dm9pZCAwKSxBPUMuaXNTdGF0aWMmJjA9PT1kLmxlbmd0aCxJPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGZ1bmN0aW9uKGUsdCxyLG8pe3ZhciBzPWUuYXR0cnMsaT1lLmNvbXBvbmVudFN0eWxlLGM9ZS5kZWZhdWx0UHJvcHMsbD1lLmZvbGRlZENvbXBvbmVudElkcyxkPWUuc2hvdWxkRm9yd2FyZFByb3AsaD1lLnN0eWxlZENvbXBvbmVudElkLG09ZS50YXJnZXQ7XCJwcm9kdWN0aW9uXCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOViYmbi51c2VEZWJ1Z1ZhbHVlKGgpO3ZhciB5PWZ1bmN0aW9uKGUsdCxuKXt2b2lkIDA9PT1lJiYoZT1wKTt2YXIgcj11KHt9LHQse3RoZW1lOmV9KSxvPXt9O3JldHVybiBuLmZvckVhY2goKGZ1bmN0aW9uKGUpe3ZhciB0LG4scyxpPWU7Zm9yKHQgaW4gZihpKSYmKGk9aShyKSksaSlyW3RdPW9bdF09XCJjbGFzc05hbWVcIj09PXQ/KG49b1t0XSxzPWlbdF0sbiYmcz9uK1wiIFwiK3M6bnx8cyk6aVt0XX0pKSxbcixvXX0oRWUodCxuLnVzZUNvbnRleHQoUmUpLGMpfHxwLHQscyksdj15WzBdLGc9eVsxXSxTPWZ1bmN0aW9uKGUsdCxyLG8pe3ZhciBzPXNlKCksaT1pZSgpLGE9dD9lLmdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzKHAscyxpKTplLmdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzKHIscyxpKTtyZXR1cm5cInByb2R1Y3Rpb25cIiE9PXByb2Nlc3MuZW52Lk5PREVfRU5WJiZuLnVzZURlYnVnVmFsdWUoYSksXCJwcm9kdWN0aW9uXCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOViYmIXQmJm8mJm8oYSksYX0oaSxvLHYsXCJwcm9kdWN0aW9uXCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOVj9lLndhcm5Ub29NYW55Q2xhc3Nlczp2b2lkIDApLHc9cixFPWcuJGFzfHx0LiRhc3x8Zy5hc3x8dC5hc3x8bSxiPUFlKEUpLF89ZyE9PXQ/dSh7fSx0LHt9LGcpOnQsTj17fTtmb3IodmFyIEMgaW4gXylcIiRcIiE9PUNbMF0mJlwiYXNcIiE9PUMmJihcImZvcndhcmRlZEFzXCI9PT1DP04uYXM9X1tDXTooZD9kKEMsYSxFKTohYnx8YShDKSkmJihOW0NdPV9bQ10pKTtyZXR1cm4gdC5zdHlsZSYmZy5zdHlsZSE9PXQuc3R5bGUmJihOLnN0eWxlPXUoe30sdC5zdHlsZSx7fSxnLnN0eWxlKSksTi5jbGFzc05hbWU9QXJyYXkucHJvdG90eXBlLmNvbmNhdChsLGgsUyE9PWg/UzpudWxsLHQuY2xhc3NOYW1lLGcuY2xhc3NOYW1lKS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIiksTi5yZWY9dyxuLmNyZWF0ZUVsZW1lbnQoRSxOKX0oTixlLHQsQSl9O3JldHVybiBJLmRpc3BsYXlOYW1lPXcsKE49ci5mb3J3YXJkUmVmKEkpKS5hdHRycz1iLE4uY29tcG9uZW50U3R5bGU9QyxOLmRpc3BsYXlOYW1lPXcsTi5zaG91bGRGb3J3YXJkUHJvcD1fLE4uZm9sZGVkQ29tcG9uZW50SWRzPXM/QXJyYXkucHJvdG90eXBlLmNvbmNhdChlLmZvbGRlZENvbXBvbmVudElkcyxlLnN0eWxlZENvbXBvbmVudElkKTpoLE4uc3R5bGVkQ29tcG9uZW50SWQ9RSxOLnRhcmdldD1zP2UudGFyZ2V0OmUsTi53aXRoQ29tcG9uZW50PWZ1bmN0aW9uKGUpe3ZhciBuPXQuY29tcG9uZW50SWQscj1mdW5jdGlvbihlLHQpe2lmKG51bGw9PWUpcmV0dXJue307dmFyIG4scixvPXt9LHM9T2JqZWN0LmtleXMoZSk7Zm9yKHI9MDtyPHMubGVuZ3RoO3IrKyluPXNbcl0sdC5pbmRleE9mKG4pPj0wfHwob1tuXT1lW25dKTtyZXR1cm4gb30odCxbXCJjb21wb25lbnRJZFwiXSkscz1uJiZuK1wiLVwiKyhBZShlKT9lOk5lKG0oZSkpKTtyZXR1cm4gamUoZSx1KHt9LHIse2F0dHJzOmIsY29tcG9uZW50SWQ6c30pLG8pfSxPYmplY3QuZGVmaW5lUHJvcGVydHkoTixcImRlZmF1bHRQcm9wc1wiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZm9sZGVkRGVmYXVsdFByb3BzfSxzZXQ6ZnVuY3Rpb24odCl7dGhpcy5fZm9sZGVkRGVmYXVsdFByb3BzPXM/eGUoe30sZS5kZWZhdWx0UHJvcHMsdCk6dH19KSxcInByb2R1Y3Rpb25cIiE9PXByb2Nlc3MuZW52Lk5PREVfRU5WJiYod2UodyxFKSxOLndhcm5Ub29NYW55Q2xhc3Nlcz1mdW5jdGlvbihlLHQpe3ZhciBuPXt9LHI9ITE7cmV0dXJuIGZ1bmN0aW9uKG8pe2lmKCFyJiYobltvXT0hMCxPYmplY3Qua2V5cyhuKS5sZW5ndGg+PTIwMCkpe3ZhciBzPXQ/JyB3aXRoIHRoZSBpZCBvZiBcIicrdCsnXCInOlwiXCI7Y29uc29sZS53YXJuKFwiT3ZlciAyMDAgY2xhc3NlcyB3ZXJlIGdlbmVyYXRlZCBmb3IgY29tcG9uZW50IFwiK2UrcytcIi5cXG5Db25zaWRlciB1c2luZyB0aGUgYXR0cnMgbWV0aG9kLCB0b2dldGhlciB3aXRoIGEgc3R5bGUgb2JqZWN0IGZvciBmcmVxdWVudGx5IGNoYW5nZWQgc3R5bGVzLlxcbkV4YW1wbGU6XFxuICBjb25zdCBDb21wb25lbnQgPSBzdHlsZWQuZGl2LmF0dHJzKHByb3BzID0+ICh7XFxuICAgIHN0eWxlOiB7XFxuICAgICAgYmFja2dyb3VuZDogcHJvcHMuYmFja2dyb3VuZCxcXG4gICAgfSxcXG4gIH0pKWB3aWR0aDogMTAwJTtgXFxuXFxuICA8Q29tcG9uZW50IC8+XCIpLHI9ITAsbj17fX19fSh3LEUpKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoTixcInRvU3RyaW5nXCIse3ZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCIuXCIrTi5zdHlsZWRDb21wb25lbnRJZH19KSxpJiZjKE4sZSx7YXR0cnM6ITAsY29tcG9uZW50U3R5bGU6ITAsZGlzcGxheU5hbWU6ITAsZm9sZGVkQ29tcG9uZW50SWRzOiEwLHNob3VsZEZvcndhcmRQcm9wOiEwLHN0eWxlZENvbXBvbmVudElkOiEwLHRhcmdldDohMCx3aXRoQ29tcG9uZW50OiEwfSksTn12YXIga2U9ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uIGUobixyLG8pe2lmKHZvaWQgMD09PW8mJihvPXApLCF0LmlzVmFsaWRFbGVtZW50VHlwZShyKSlyZXR1cm4gXygxLFN0cmluZyhyKSk7dmFyIHM9ZnVuY3Rpb24oKXtyZXR1cm4gbihyLG8sdmUuYXBwbHkodm9pZCAwLGFyZ3VtZW50cykpfTtyZXR1cm4gcy53aXRoQ29uZmlnPWZ1bmN0aW9uKHQpe3JldHVybiBlKG4scix1KHt9LG8se30sdCkpfSxzLmF0dHJzPWZ1bmN0aW9uKHQpe3JldHVybiBlKG4scix1KHt9LG8se2F0dHJzOkFycmF5LnByb3RvdHlwZS5jb25jYXQoby5hdHRycyx0KS5maWx0ZXIoQm9vbGVhbil9KSl9LHN9KGplLGUpfTtbXCJhXCIsXCJhYmJyXCIsXCJhZGRyZXNzXCIsXCJhcmVhXCIsXCJhcnRpY2xlXCIsXCJhc2lkZVwiLFwiYXVkaW9cIixcImJcIixcImJhc2VcIixcImJkaVwiLFwiYmRvXCIsXCJiaWdcIixcImJsb2NrcXVvdGVcIixcImJvZHlcIixcImJyXCIsXCJidXR0b25cIixcImNhbnZhc1wiLFwiY2FwdGlvblwiLFwiY2l0ZVwiLFwiY29kZVwiLFwiY29sXCIsXCJjb2xncm91cFwiLFwiZGF0YVwiLFwiZGF0YWxpc3RcIixcImRkXCIsXCJkZWxcIixcImRldGFpbHNcIixcImRmblwiLFwiZGlhbG9nXCIsXCJkaXZcIixcImRsXCIsXCJkdFwiLFwiZW1cIixcImVtYmVkXCIsXCJmaWVsZHNldFwiLFwiZmlnY2FwdGlvblwiLFwiZmlndXJlXCIsXCJmb290ZXJcIixcImZvcm1cIixcImgxXCIsXCJoMlwiLFwiaDNcIixcImg0XCIsXCJoNVwiLFwiaDZcIixcImhlYWRcIixcImhlYWRlclwiLFwiaGdyb3VwXCIsXCJoclwiLFwiaHRtbFwiLFwiaVwiLFwiaWZyYW1lXCIsXCJpbWdcIixcImlucHV0XCIsXCJpbnNcIixcImtiZFwiLFwia2V5Z2VuXCIsXCJsYWJlbFwiLFwibGVnZW5kXCIsXCJsaVwiLFwibGlua1wiLFwibWFpblwiLFwibWFwXCIsXCJtYXJrXCIsXCJtYXJxdWVlXCIsXCJtZW51XCIsXCJtZW51aXRlbVwiLFwibWV0YVwiLFwibWV0ZXJcIixcIm5hdlwiLFwibm9zY3JpcHRcIixcIm9iamVjdFwiLFwib2xcIixcIm9wdGdyb3VwXCIsXCJvcHRpb25cIixcIm91dHB1dFwiLFwicFwiLFwicGFyYW1cIixcInBpY3R1cmVcIixcInByZVwiLFwicHJvZ3Jlc3NcIixcInFcIixcInJwXCIsXCJydFwiLFwicnVieVwiLFwic1wiLFwic2FtcFwiLFwic2NyaXB0XCIsXCJzZWN0aW9uXCIsXCJzZWxlY3RcIixcInNtYWxsXCIsXCJzb3VyY2VcIixcInNwYW5cIixcInN0cm9uZ1wiLFwic3R5bGVcIixcInN1YlwiLFwic3VtbWFyeVwiLFwic3VwXCIsXCJ0YWJsZVwiLFwidGJvZHlcIixcInRkXCIsXCJ0ZXh0YXJlYVwiLFwidGZvb3RcIixcInRoXCIsXCJ0aGVhZFwiLFwidGltZVwiLFwidGl0bGVcIixcInRyXCIsXCJ0cmFja1wiLFwidVwiLFwidWxcIixcInZhclwiLFwidmlkZW9cIixcIndiclwiLFwiY2lyY2xlXCIsXCJjbGlwUGF0aFwiLFwiZGVmc1wiLFwiZWxsaXBzZVwiLFwiZm9yZWlnbk9iamVjdFwiLFwiZ1wiLFwiaW1hZ2VcIixcImxpbmVcIixcImxpbmVhckdyYWRpZW50XCIsXCJtYXJrZXJcIixcIm1hc2tcIixcInBhdGhcIixcInBhdHRlcm5cIixcInBvbHlnb25cIixcInBvbHlsaW5lXCIsXCJyYWRpYWxHcmFkaWVudFwiLFwicmVjdFwiLFwic3RvcFwiLFwic3ZnXCIsXCJ0ZXh0XCIsXCJ0ZXh0UGF0aFwiLFwidHNwYW5cIl0uZm9yRWFjaCgoZnVuY3Rpb24oZSl7a2VbZV09a2UoZSl9KSk7dmFyIFZlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe3RoaXMucnVsZXM9ZSx0aGlzLmNvbXBvbmVudElkPXQsdGhpcy5pc1N0YXRpYz1VKGUpLEwucmVnaXN0ZXJJZCh0aGlzLmNvbXBvbmVudElkKzEpfXZhciB0PWUucHJvdG90eXBlO3JldHVybiB0LmNyZWF0ZVN0eWxlcz1mdW5jdGlvbihlLHQsbixyKXt2YXIgbz1yKG1lKHRoaXMucnVsZXMsdCxuLHIpLmpvaW4oXCJcIiksXCJcIikscz10aGlzLmNvbXBvbmVudElkK2U7bi5pbnNlcnRSdWxlcyhzLHMsbyl9LHQucmVtb3ZlU3R5bGVzPWZ1bmN0aW9uKGUsdCl7dC5jbGVhclJ1bGVzKHRoaXMuY29tcG9uZW50SWQrZSl9LHQucmVuZGVyU3R5bGVzPWZ1bmN0aW9uKGUsdCxuLHIpe2U+MiYmTC5yZWdpc3RlcklkKHRoaXMuY29tcG9uZW50SWQrZSksdGhpcy5yZW1vdmVTdHlsZXMoZSxuKSx0aGlzLmNyZWF0ZVN0eWxlcyhlLHQsbixyKX0sZX0oKSxNZT1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXt2YXIgZT10aGlzO3RoaXMuX2VtaXRTaGVldENTUz1mdW5jdGlvbigpe3ZhciB0PWUuaW5zdGFuY2UudG9TdHJpbmcoKTtpZighdClyZXR1cm5cIlwiO3ZhciBuPWsoKTtyZXR1cm5cIjxzdHlsZSBcIitbbiYmJ25vbmNlPVwiJytuKydcIicsdisnPVwidHJ1ZVwiJywnZGF0YS1zdHlsZWQtdmVyc2lvbj1cIjUuMy45XCInXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIikrXCI+XCIrdCtcIjwvc3R5bGU+XCJ9LHRoaXMuZ2V0U3R5bGVUYWdzPWZ1bmN0aW9uKCl7cmV0dXJuIGUuc2VhbGVkP18oMik6ZS5fZW1pdFNoZWV0Q1NTKCl9LHRoaXMuZ2V0U3R5bGVFbGVtZW50PWZ1bmN0aW9uKCl7dmFyIHQ7aWYoZS5zZWFsZWQpcmV0dXJuIF8oMik7dmFyIG49KCh0PXt9KVt2XT1cIlwiLHRbXCJkYXRhLXN0eWxlZC12ZXJzaW9uXCJdPVwiNS4zLjlcIix0LmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtfX2h0bWw6ZS5pbnN0YW5jZS50b1N0cmluZygpfSx0KSxvPWsoKTtyZXR1cm4gbyYmKG4ubm9uY2U9byksW3IuY3JlYXRlRWxlbWVudChcInN0eWxlXCIsdSh7fSxuLHtrZXk6XCJzYy0wLTBcIn0pKV19LHRoaXMuc2VhbD1mdW5jdGlvbigpe2Uuc2VhbGVkPSEwfSx0aGlzLmluc3RhbmNlPW5ldyBMKHtpc1NlcnZlcjohMH0pLHRoaXMuc2VhbGVkPSExfXZhciB0PWUucHJvdG90eXBlO3JldHVybiB0LmNvbGxlY3RTdHlsZXM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuc2VhbGVkP18oMik6ci5jcmVhdGVFbGVtZW50KGFlLHtzaGVldDp0aGlzLmluc3RhbmNlfSxlKX0sdC5pbnRlcmxlYXZlV2l0aE5vZGVTdHJlYW09ZnVuY3Rpb24oZSl7cmV0dXJuIF8oMyl9LGV9KCksQmU9e1N0eWxlU2hlZXQ6TCxtYXN0ZXJTaGVldDpyZX07XCJwcm9kdWN0aW9uXCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOViYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG5hdmlnYXRvciYmXCJSZWFjdE5hdGl2ZVwiPT09bmF2aWdhdG9yLnByb2R1Y3QmJmNvbnNvbGUud2FybihcIkl0IGxvb2tzIGxpa2UgeW91J3ZlIGltcG9ydGVkICdzdHlsZWQtY29tcG9uZW50cycgb24gUmVhY3QgTmF0aXZlLlxcblBlcmhhcHMgeW91J3JlIGxvb2tpbmcgdG8gaW1wb3J0ICdzdHlsZWQtY29tcG9uZW50cy9uYXRpdmUnP1xcblJlYWQgbW9yZSBhYm91dCB0aGlzIGF0IGh0dHBzOi8vd3d3LnN0eWxlZC1jb21wb25lbnRzLmNvbS9kb2NzL2Jhc2ljcyNyZWFjdC1uYXRpdmVcIiksXCJwcm9kdWN0aW9uXCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOViYmXCJ0ZXN0XCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOViYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKHdpbmRvd1tcIl9fc3R5bGVkLWNvbXBvbmVudHMtaW5pdF9fXCJdPXdpbmRvd1tcIl9fc3R5bGVkLWNvbXBvbmVudHMtaW5pdF9fXCJdfHwwLDE9PT13aW5kb3dbXCJfX3N0eWxlZC1jb21wb25lbnRzLWluaXRfX1wiXSYmY29uc29sZS53YXJuKFwiSXQgbG9va3MgbGlrZSB0aGVyZSBhcmUgc2V2ZXJhbCBpbnN0YW5jZXMgb2YgJ3N0eWxlZC1jb21wb25lbnRzJyBpbml0aWFsaXplZCBpbiB0aGlzIGFwcGxpY2F0aW9uLiBUaGlzIG1heSBjYXVzZSBkeW5hbWljIHN0eWxlcyB0byBub3QgcmVuZGVyIHByb3Blcmx5LCBlcnJvcnMgZHVyaW5nIHRoZSByZWh5ZHJhdGlvbiBwcm9jZXNzLCBhIG1pc3NpbmcgdGhlbWUgcHJvcCwgYW5kIG1ha2VzIHlvdXIgYXBwbGljYXRpb24gYmlnZ2VyIHdpdGhvdXQgZ29vZCByZWFzb24uXFxuXFxuU2VlIGh0dHBzOi8vcy1jLnNoLzJCQVh6ZWQgZm9yIG1vcmUgaW5mby5cIiksd2luZG93W1wiX19zdHlsZWQtY29tcG9uZW50cy1pbml0X19cIl0rPTEpLGV4cG9ydHMuU2VydmVyU3R5bGVTaGVldD1NZSxleHBvcnRzLlN0eWxlU2hlZXRDb25zdW1lcj10ZSxleHBvcnRzLlN0eWxlU2hlZXRDb250ZXh0PWVlLGV4cG9ydHMuU3R5bGVTaGVldE1hbmFnZXI9YWUsZXhwb3J0cy5UaGVtZUNvbnN1bWVyPURlLGV4cG9ydHMuVGhlbWVDb250ZXh0PVJlLGV4cG9ydHMuVGhlbWVQcm92aWRlcj1mdW5jdGlvbihlKXt2YXIgdD1uLnVzZUNvbnRleHQoUmUpLG89bi51c2VNZW1vKChmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlLHQpe2lmKCFlKXJldHVybiBfKDE0KTtpZihmKGUpKXt2YXIgbj1lKHQpO3JldHVyblwicHJvZHVjdGlvblwiPT09cHJvY2Vzcy5lbnYuTk9ERV9FTlZ8fG51bGwhPT1uJiYhQXJyYXkuaXNBcnJheShuKSYmXCJvYmplY3RcIj09dHlwZW9mIG4/bjpfKDcpfXJldHVybiBBcnJheS5pc0FycmF5KGUpfHxcIm9iamVjdFwiIT10eXBlb2YgZT9fKDgpOnQ/dSh7fSx0LHt9LGUpOmV9KGUudGhlbWUsdCl9KSxbZS50aGVtZSx0XSk7cmV0dXJuIGUuY2hpbGRyZW4/ci5jcmVhdGVFbGVtZW50KFJlLlByb3ZpZGVyLHt2YWx1ZTpvfSxlLmNoaWxkcmVuKTpudWxsfSxleHBvcnRzLl9fUFJJVkFURV9fPUJlLGV4cG9ydHMuY3JlYXRlR2xvYmFsU3R5bGU9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PWFyZ3VtZW50cy5sZW5ndGgsbz1uZXcgQXJyYXkodD4xP3QtMTowKSxzPTE7czx0O3MrKylvW3MtMV09YXJndW1lbnRzW3NdO3ZhciBpPXZlLmFwcGx5KHZvaWQgMCxbZV0uY29uY2F0KG8pKSxhPVwic2MtZ2xvYmFsLVwiK0NlKEpTT04uc3RyaW5naWZ5KGkpKSxjPW5ldyBWZShpLGEpO2Z1bmN0aW9uIGwoZSl7dmFyIHQ9c2UoKSxvPWllKCkscz1uLnVzZUNvbnRleHQoUmUpLHU9bi51c2VSZWYodC5hbGxvY2F0ZUdTSW5zdGFuY2UoYSkpLmN1cnJlbnQ7cmV0dXJuXCJwcm9kdWN0aW9uXCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOViYmci5DaGlsZHJlbi5jb3VudChlLmNoaWxkcmVuKSYmY29uc29sZS53YXJuKFwiVGhlIGdsb2JhbCBzdHlsZSBjb21wb25lbnQgXCIrYStcIiB3YXMgZ2l2ZW4gY2hpbGQgSlNYLiBjcmVhdGVHbG9iYWxTdHlsZSBkb2VzIG5vdCByZW5kZXIgY2hpbGRyZW4uXCIpLFwicHJvZHVjdGlvblwiIT09cHJvY2Vzcy5lbnYuTk9ERV9FTlYmJmkuc29tZSgoZnVuY3Rpb24oZSl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGUmJi0xIT09ZS5pbmRleE9mKFwiQGltcG9ydFwiKX0pKSYmY29uc29sZS53YXJuKFwiUGxlYXNlIGRvIG5vdCB1c2UgQGltcG9ydCBDU1Mgc3ludGF4IGluIGNyZWF0ZUdsb2JhbFN0eWxlIGF0IHRoaXMgdGltZSwgYXMgdGhlIENTU09NIEFQSXMgd2UgdXNlIGluIHByb2R1Y3Rpb24gZG8gbm90IGhhbmRsZSBpdCB3ZWxsLiBJbnN0ZWFkLCB3ZSByZWNvbW1lbmQgdXNpbmcgYSBsaWJyYXJ5IHN1Y2ggYXMgcmVhY3QtaGVsbWV0IHRvIGluamVjdCBhIHR5cGljYWwgPGxpbms+IG1ldGEgdGFnIHRvIHRoZSBzdHlsZXNoZWV0LCBvciBzaW1wbHkgZW1iZWRkaW5nIGl0IG1hbnVhbGx5IGluIHlvdXIgaW5kZXguaHRtbCA8aGVhZD4gc2VjdGlvbiBmb3IgYSBzaW1wbGVyIGFwcC5cIiksdC5zZXJ2ZXImJmQodSxlLHQscyxvKSxuLnVzZUxheW91dEVmZmVjdCgoZnVuY3Rpb24oKXtpZighdC5zZXJ2ZXIpcmV0dXJuIGQodSxlLHQscyxvKSxmdW5jdGlvbigpe3JldHVybiBjLnJlbW92ZVN0eWxlcyh1LHQpfX0pLFt1LGUsdCxzLG9dKSxudWxsfWZ1bmN0aW9uIGQoZSx0LG4scixvKXtpZihjLmlzU3RhdGljKWMucmVuZGVyU3R5bGVzKGUsdyxuLG8pO2Vsc2V7dmFyIHM9dSh7fSx0LHt0aGVtZTpFZSh0LHIsbC5kZWZhdWx0UHJvcHMpfSk7Yy5yZW5kZXJTdHlsZXMoZSxzLG4sbyl9fXJldHVyblwicHJvZHVjdGlvblwiIT09cHJvY2Vzcy5lbnYuTk9ERV9FTlYmJndlKGEpLHIubWVtbyhsKX0sZXhwb3J0cy5jc3M9dmUsZXhwb3J0cy5kZWZhdWx0PWtlLGV4cG9ydHMuaXNTdHlsZWRDb21wb25lbnQ9eSxleHBvcnRzLmtleWZyYW1lcz1mdW5jdGlvbihlKXtcInByb2R1Y3Rpb25cIiE9PXByb2Nlc3MuZW52Lk5PREVfRU5WJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbmF2aWdhdG9yJiZcIlJlYWN0TmF0aXZlXCI9PT1uYXZpZ2F0b3IucHJvZHVjdCYmY29uc29sZS53YXJuKFwiYGtleWZyYW1lc2AgY2Fubm90IGJlIHVzZWQgb24gUmVhY3ROYXRpdmUsIG9ubHkgb24gdGhlIHdlYi4gVG8gZG8gYW5pbWF0aW9uIGluIFJlYWN0TmF0aXZlIHBsZWFzZSB1c2UgQW5pbWF0ZWQuXCIpO2Zvcih2YXIgdD1hcmd1bWVudHMubGVuZ3RoLG49bmV3IEFycmF5KHQ+MT90LTE6MCkscj0xO3I8dDtyKyspbltyLTFdPWFyZ3VtZW50c1tyXTt2YXIgbz12ZS5hcHBseSh2b2lkIDAsW2VdLmNvbmNhdChuKSkuam9pbihcIlwiKSxzPUNlKG8pO3JldHVybiBuZXcgY2UocyxvKX0sZXhwb3J0cy51c2VUaGVtZT1mdW5jdGlvbigpe3JldHVybiBuLnVzZUNvbnRleHQoUmUpfSxleHBvcnRzLnZlcnNpb249XCI1LjMuOVwiLGV4cG9ydHMud2l0aFRoZW1lPWZ1bmN0aW9uKGUpe3ZhciB0PXIuZm9yd2FyZFJlZigoZnVuY3Rpb24odCxvKXt2YXIgcz1uLnVzZUNvbnRleHQoUmUpLGk9ZS5kZWZhdWx0UHJvcHMsYT1FZSh0LHMsaSk7cmV0dXJuXCJwcm9kdWN0aW9uXCIhPT1wcm9jZXNzLmVudi5OT0RFX0VOViYmdm9pZCAwPT09YSYmY29uc29sZS53YXJuKCdbd2l0aFRoZW1lXSBZb3UgYXJlIG5vdCB1c2luZyBhIFRoZW1lUHJvdmlkZXIgbm9yIHBhc3NpbmcgYSB0aGVtZSBwcm9wIG9yIGEgdGhlbWUgaW4gZGVmYXVsdFByb3BzIGluIGNvbXBvbmVudCBjbGFzcyBcIicrbShlKSsnXCInKSxyLmNyZWF0ZUVsZW1lbnQoZSx1KHt9LHQse3RoZW1lOmEscmVmOm99KSl9KSk7cmV0dXJuIGModCxlKSx0LmRpc3BsYXlOYW1lPVwiV2l0aFRoZW1lKFwiK20oZSkrXCIpXCIsdH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdHlsZWQtY29tcG9uZW50cy5icm93c2VyLmNqcy5qcy5tYXBcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMywgTGFiZWwsIFRleHQsIEJ1dHRvbiwgTWVzc2FnZUJveCwgTG9hZGVyLCBGb3JtR3JvdXAsIFRleHRBcmVhIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBBcGlDbGllbnQsIFJlY29yZEpTT04gfSBmcm9tICdhZG1pbmpzJztcblxuLy8gSW1wb3J0IHN0eWxlZCBjb21wb25lbnRzIGZvciBtaXNzaW5nIGNvbXBvbmVudHNcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG4vLyBDcmVhdGUgc3R5bGVkIGNvbXBvbmVudHMgZm9yIG1pc3NpbmcgZGVzaWduLXN5c3RlbSBjb21wb25lbnRzXG5jb25zdCBUZXh0SW5wdXQgPSBzdHlsZWQuaW5wdXRgXG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI0MwQzlENDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICBvdXRsaW5lOiBub25lO1xuICBcbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjMzc5NUJFO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKDU1LCAxNDksIDE5MCwgMC4yKTtcbiAgfVxuYDtcblxuY29uc3QgU3dpdGNoID0gc3R5bGVkLmlucHV0LmF0dHJzKHsgdHlwZTogJ2NoZWNrYm94JyB9KWBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTRlN2VhO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3M7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgXG4gICY6Y2hlY2tlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFEQzlBNDtcbiAgfVxuICBcbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDE4cHg7XG4gICAgaGVpZ2h0OiAxOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICB0b3A6IDFweDtcbiAgICBsZWZ0OiAxcHg7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3M7XG4gIH1cbiAgXG4gICY6Y2hlY2tlZDo6YmVmb3JlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7XG4gIH1cbmA7XG5cbi8vIEZpZWxkIHJlbmRlcmVyIGNvbXBvbmVudCBiYXNlZCBvbiBhdHRyaWJ1dGUgdHlwZVxuY29uc3QgQXR0cmlidXRlRmllbGQgPSAoeyBhdHRyaWJ1dGUsIHZhbHVlLCBvbkNoYW5nZSB9KSA9PiB7XG4gIGNvbnN0IHsgdHlwZSwgaGFuZGxlLCBuYW1lLCByZXF1aXJlZCwgY29uZmlndXJhdGlvbiA9IHt9IH0gPSBhdHRyaWJ1dGU7XG4gIGNvbnN0IGpzb25OYW1lID0gdHlwZW9mIG5hbWUgPT09ICdvYmplY3QnID8gbmFtZS5lbiB8fCBPYmplY3QudmFsdWVzKG5hbWUpWzBdIDogbmFtZTtcbiAgXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3RleHQnOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ9e3JlcXVpcmVkfT57anNvbk5hbWV9PC9MYWJlbD5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICBpZD17aGFuZGxlfVxuICAgICAgICAgICAgbmFtZT17aGFuZGxlfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZShoYW5kbGUsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIHZhbHVlPXt2YWx1ZSB8fCAnJ31cbiAgICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cbiAgICAgICAgICAgIHsuLi5jb25maWd1cmF0aW9ufVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgKTtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ9e3JlcXVpcmVkfT57anNvbk5hbWV9PC9MYWJlbD5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICBpZD17aGFuZGxlfVxuICAgICAgICAgICAgbmFtZT17aGFuZGxlfVxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uQ2hhbmdlKGhhbmRsZSwgcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgdmFsdWU9e3ZhbHVlIHx8ICcnfVxuICAgICAgICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxuICAgICAgICAgICAgey4uLmNvbmZpZ3VyYXRpb259XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICApO1xuICAgIGNhc2UgJ3RyYW5zbGF0ZWQtdGV4dCc6XG4gICAgICAvLyBTaW1wbGUgdmVyc2lvbiBmb3Igbm93IC0ganVzdCBoYW5kbGluZyBFbmdsaXNoXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD17cmVxdWlyZWR9Pntqc29uTmFtZX0gKEVuZ2xpc2gpPC9MYWJlbD5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICBpZD17YCR7aGFuZGxlfS1lbmB9XG4gICAgICAgICAgICBuYW1lPXtgJHtoYW5kbGV9LWVuYH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoaGFuZGxlLCB7IGVuOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgIHZhbHVlPXsodmFsdWUgJiYgdmFsdWUuZW4pIHx8ICcnfVxuICAgICAgICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxuICAgICAgICAgICAgey4uLmNvbmZpZ3VyYXRpb259XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICApO1xuICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPXtyZXF1aXJlZH0+e2pzb25OYW1lfTwvTGFiZWw+XG4gICAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgICBpZD17aGFuZGxlfVxuICAgICAgICAgICAgbmFtZT17aGFuZGxlfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZShoYW5kbGUsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIHZhbHVlPXt2YWx1ZSB8fCAnJ31cbiAgICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cbiAgICAgICAgICAgIHsuLi5jb25maWd1cmF0aW9ufVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgKTtcbiAgICBjYXNlICdsaXN0JzpcbiAgICAgIC8vIFNpbXBsZSBpbXBsZW1lbnRhdGlvbiAtIGNvbW1hIHNlcGFyYXRlZCB2YWx1ZXNcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPXtyZXF1aXJlZH0+e2pzb25OYW1lfSAoY29tbWEgc2VwYXJhdGVkKTwvTGFiZWw+XG4gICAgICAgICAgPFRleHRJbnB1dFxuICAgICAgICAgICAgaWQ9e2hhbmRsZX1cbiAgICAgICAgICAgIG5hbWU9e2hhbmRsZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoaGFuZGxlLCBlLnRhcmdldC52YWx1ZS5zcGxpdCgnLCcpLm1hcChpdGVtID0+IGl0ZW0udHJpbSgpKSl9XG4gICAgICAgICAgICB2YWx1ZT17QXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKCcsICcpIDogdmFsdWUgfHwgJyd9XG4gICAgICAgICAgICByZXF1aXJlZD17cmVxdWlyZWR9XG4gICAgICAgICAgICB7Li4uY29uZmlndXJhdGlvbn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICk7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD57anNvbk5hbWV9PC9MYWJlbD5cbiAgICAgICAgICA8U3dpdGNoXG4gICAgICAgICAgICBpZD17aGFuZGxlfVxuICAgICAgICAgICAgbmFtZT17aGFuZGxlfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZShoYW5kbGUsIGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgY2hlY2tlZD17ISF2YWx1ZX1cbiAgICAgICAgICAgIHsuLi5jb25maWd1cmF0aW9ufVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgKTtcbiAgICBjYXNlICdpbWFnZSc6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD17cmVxdWlyZWR9Pntqc29uTmFtZX08L0xhYmVsPlxuICAgICAgICAgIDxCb3g+XG4gICAgICAgICAgICB7dmFsdWUgJiYgdmFsdWUudXJsICYmIChcbiAgICAgICAgICAgICAgPEJveCBtYj1cImRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgc3JjPXt2YWx1ZS51cmx9IFxuICAgICAgICAgICAgICAgICAgYWx0PXt2YWx1ZS5hbHQgfHwganNvbk5hbWV9IFxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4V2lkdGg6ICcyMDBweCcsIG1heEhlaWdodDogJzIwMHB4JyB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICAgICAgaWQ9e2Ake2hhbmRsZX0tdXJsYH1cbiAgICAgICAgICAgICAgbmFtZT17YCR7aGFuZGxlfS11cmxgfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkltYWdlIFVSTFwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoaGFuZGxlLCB7IC4uLnZhbHVlLCB1cmw6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICB2YWx1ZT17KHZhbHVlICYmIHZhbHVlLnVybCkgfHwgJyd9XG4gICAgICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICAgIGlkPXtgJHtoYW5kbGV9LWFsdGB9XG4gICAgICAgICAgICAgIG5hbWU9e2Ake2hhbmRsZX0tYWx0YH1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBbHQgdGV4dFwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoaGFuZGxlLCB7IC4uLnZhbHVlLCBhbHQ6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICB2YWx1ZT17KHZhbHVlICYmIHZhbHVlLmFsdCkgfHwgJyd9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpblRvcDogJzhweCcgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ9e3JlcXVpcmVkfT57anNvbk5hbWV9PC9MYWJlbD5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICBpZD17aGFuZGxlfVxuICAgICAgICAgICAgbmFtZT17aGFuZGxlfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZShoYW5kbGUsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIHZhbHVlPXt2YWx1ZSB8fCAnJ31cbiAgICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICk7XG4gIH1cbn07XG5cbmludGVyZmFjZSBBdHRyaWJ1dGVFZGl0b3JQcm9wcyB7XG4gIHJlY29yZD86IFJlY29yZEpTT047XG4gIG9uQ2hhbmdlPzogKHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB2b2lkO1xufVxuXG5jb25zdCBBdHRyaWJ1dGVFZGl0b3I6IFJlYWN0LkZDPEF0dHJpYnV0ZUVkaXRvclByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCwgb25DaGFuZ2UgfSA9IHByb3BzO1xuICBjb25zdCBbYXR0cmlidXRlcywgc2V0QXR0cmlidXRlc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFthdHRyaWJ1dGVWYWx1ZXMsIHNldEF0dHJpYnV0ZVZhbHVlc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBcbiAgLy8gRmV0Y2ggcHJvZHVjdCBhdHRyaWJ1dGVzIG9uIGNvbXBvbmVudCBtb3VudFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoQXR0cmlidXRlcyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvcHJvZHVjdC1hdHRyaWJ1dGVzJyk7XG4gICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgc2V0QXR0cmlidXRlcyhkYXRhKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBJbml0aWFsaXplIGF0dHJpYnV0ZSB2YWx1ZXMgZnJvbSByZWNvcmRcbiAgICAgICAgICBpZiAocmVjb3JkICYmIHJlY29yZC5wYXJhbXMuYXR0cmlidXRlX2RhdGEpIHtcbiAgICAgICAgICAgIGxldCBpbml0aWFsVmFsdWVzO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlcyA9IHR5cGVvZiByZWNvcmQucGFyYW1zLmF0dHJpYnV0ZV9kYXRhID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgID8gSlNPTi5wYXJzZShyZWNvcmQucGFyYW1zLmF0dHJpYnV0ZV9kYXRhKVxuICAgICAgICAgICAgICAgIDogcmVjb3JkLnBhcmFtcy5hdHRyaWJ1dGVfZGF0YTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHNldEF0dHJpYnV0ZVZhbHVlcyhpbml0aWFsVmFsdWVzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcGFyc2luZyBhdHRyaWJ1dGUgZGF0YTonLCBlKTtcbiAgICAgICAgICAgICAgc2V0QXR0cmlidXRlVmFsdWVzKHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGF0dHJpYnV0ZXMnKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGF0dHJpYnV0ZXM6JywgZSk7XG4gICAgICAgIHNldEVycm9yKGBFcnJvciBsb2FkaW5nIGF0dHJpYnV0ZXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBcbiAgICBmZXRjaEF0dHJpYnV0ZXMoKTtcbiAgfSwgW3JlY29yZF0pO1xuICBcbiAgLy8gVXBkYXRlIHJlY29yZCB3aGVuIGF0dHJpYnV0ZSB2YWx1ZXMgY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFsb2FkaW5nICYmIE9iamVjdC5rZXlzKGF0dHJpYnV0ZVZhbHVlcykubGVuZ3RoID4gMCAmJiBvbkNoYW5nZSkge1xuICAgICAgb25DaGFuZ2UoJ2F0dHJpYnV0ZV9kYXRhJywgYXR0cmlidXRlVmFsdWVzKTtcbiAgICB9XG4gIH0sIFthdHRyaWJ1dGVWYWx1ZXMsIGxvYWRpbmcsIG9uQ2hhbmdlXSk7XG4gIFxuICBjb25zdCBoYW5kbGVBdHRyaWJ1dGVDaGFuZ2UgPSAoaGFuZGxlLCB2YWx1ZSkgPT4ge1xuICAgIHNldEF0dHJpYnV0ZVZhbHVlcyhwcmV2ID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgW2hhbmRsZV06IHsgdHlwZTogZ2V0QXR0cmlidXRlVHlwZShoYW5kbGUpLCB2YWx1ZSB9XG4gICAgfSkpO1xuICB9O1xuICBcbiAgY29uc3QgZ2V0QXR0cmlidXRlVHlwZSA9IChoYW5kbGUpID0+IHtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzLmZpbmQoYXR0ciA9PiBhdHRyLmhhbmRsZSA9PT0gaGFuZGxlKTtcbiAgICByZXR1cm4gYXR0cmlidXRlID8gYXR0cmlidXRlLnR5cGUgOiAndGV4dCc7XG4gIH07XG4gIFxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICAgIDxUZXh0IG10PVwiZGVmYXVsdFwiPkxvYWRpbmcgYXR0cmlidXRlcy4uLjwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cbiAgXG4gIGlmIChlcnJvcikge1xuICAgIHJldHVybiA8TWVzc2FnZUJveCBtZXNzYWdlPXtlcnJvcn0gdmFyaWFudD1cImRhbmdlclwiIC8+O1xuICB9XG4gIFxuICByZXR1cm4gKFxuICAgIDxCb3g+XG4gICAgICA8SDMgbWI9XCJsZ1wiPlByb2R1Y3QgQXR0cmlidXRlczwvSDM+XG4gICAgICBcbiAgICAgIHthdHRyaWJ1dGVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPE1lc3NhZ2VCb3ggbWVzc2FnZT1cIk5vIGF0dHJpYnV0ZXMgZm91bmQgZm9yIHRoaXMgcHJvZHVjdCB0eXBlXCIgdmFyaWFudD1cImluZm9cIiAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPEJveD5cbiAgICAgICAgICB7YXR0cmlidXRlcy5tYXAoYXR0cmlidXRlID0+IHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgY3VycmVudCB2YWx1ZSBmb3IgdGhpcyBhdHRyaWJ1dGUgZnJvbSB0aGUgc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZURhdGEgPSBhdHRyaWJ1dGVWYWx1ZXNbYXR0cmlidXRlLmhhbmRsZV0gfHwge307XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxCb3gga2V5PXthdHRyaWJ1dGUuaGFuZGxlfSBtYj1cInhsXCI+XG4gICAgICAgICAgICAgICAgPEF0dHJpYnV0ZUZpZWxkXG4gICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU9e2F0dHJpYnV0ZX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXthdHRyaWJ1dGVEYXRhLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUF0dHJpYnV0ZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHthdHRyaWJ1dGUuZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIHZhcmlhbnQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0eXBlb2YgYXR0cmlidXRlLmRlc2NyaXB0aW9uID09PSAnb2JqZWN0JyBcbiAgICAgICAgICAgICAgICAgICAgICA/IGF0dHJpYnV0ZS5kZXNjcmlwdGlvbi5lbiB8fCBPYmplY3QudmFsdWVzKGF0dHJpYnV0ZS5kZXNjcmlwdGlvbilbMF0gXG4gICAgICAgICAgICAgICAgICAgICAgOiBhdHRyaWJ1dGUuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBdHRyaWJ1dGVFZGl0b3I7ICIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBINCwgSDUsIFRleHQsIExvYWRlciwgSWxsdXN0cmF0aW9uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmludGVyZmFjZSBDdXN0b21lclN0YXRpc3RpY3Mge1xuICB0b3RhbEN1c3RvbWVyczogbnVtYmVyO1xuICBuZXdDdXN0b21lcnM6IG51bWJlcjtcbiAgdG9wQ3VzdG9tZXI6IHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBvcmRlckNvdW50OiBudW1iZXI7XG4gIH0gfCBudWxsO1xuICBjdXN0b21lcnNCeUdyb3VwOiB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY291bnQ6IG51bWJlcjtcbiAgfVtdO1xufVxuXG5jb25zdCBDdXN0b21lclN0YXRpc3RpY3M6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbc3RhdGlzdGljcywgc2V0U3RhdGlzdGljc10gPSB1c2VTdGF0ZTxDdXN0b21lclN0YXRpc3RpY3MgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaFN0YXRpc3RpY3MgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL2N1c3RvbWVyLXN0YXRpc3RpY3MnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgc2V0U3RhdGlzdGljcyhkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgc2V0RXJyb3IoZXJyb3JEYXRhLmVycm9yIHx8ICdGYWlsZWQgdG8gbG9hZCBjdXN0b21lciBzdGF0aXN0aWNzJyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGN1c3RvbWVyIHN0YXRpc3RpY3M6JywgZXJyb3IpO1xuICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIGxvYWQgY3VzdG9tZXIgc3RhdGlzdGljcycpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoU3RhdGlzdGljcygpO1xuICB9LCBbXSk7XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveCBwPVwieGxcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgICA8VGV4dCBtdD1cImRlZmF1bHRcIj5Mb2FkaW5nIGN1c3RvbWVyIHN0YXRpc3RpY3MuLi48L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggcD1cInhsXCIgdGV4dEFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxJbGx1c3RyYXRpb24gdmFyaWFudD1cIlJvY2tldFwiIHdpZHRoPXsxMDB9IGhlaWdodD17MTAwfSAvPlxuICAgICAgICA8VGV4dCBtdD1cImRlZmF1bHRcIj57ZXJyb3J9PC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuXG4gIGlmICghc3RhdGlzdGljcykge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94IHA9XCJ4bFwiIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICA8VGV4dD5ObyBzdGF0aXN0aWNzIGF2YWlsYWJsZTwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxCb3g+XG4gICAgICA8SDQgbWI9XCJsZ1wiPkN1c3RvbWVyIFN0YXRpc3RpY3M8L0g0PlxuICAgICAgXG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZmxleERpcmVjdGlvbj17Wydjb2x1bW4nLCAncm93J119IGZsZXhXcmFwPVwid3JhcFwiPlxuICAgICAgICA8Qm94IGZsZXg9ezF9IHA9XCJsZ1wiIGJnPVwid2hpdGVcIiBtcj1cImxnXCIgbWI9XCJsZ1wiIGJveFNoYWRvdz1cImNhcmRcIiB3aWR0aD17WzEsIDEvM119PlxuICAgICAgICAgIDxINSBtYj1cIm1kXCI+VG90YWwgQ3VzdG9tZXJzPC9INT5cbiAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiIGZvbnRTaXplPVwieGxcIj57c3RhdGlzdGljcy50b3RhbEN1c3RvbWVyc308L1RleHQ+XG4gICAgICAgICAgICA8SWxsdXN0cmF0aW9uIHZhcmlhbnQ9XCJNb29uXCIgd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfSAvPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgICAgXG4gICAgICAgIDxCb3ggZmxleD17MX0gcD1cImxnXCIgYmc9XCJ3aGl0ZVwiIG1yPVwibGdcIiBtYj1cImxnXCIgYm94U2hhZG93PVwiY2FyZFwiIHdpZHRoPXtbMSwgMS8zXX0+XG4gICAgICAgICAgPEg1IG1iPVwibWRcIj5OZXcgQ3VzdG9tZXJzICgzMCBkYXlzKTwvSDU+XG4gICAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiPlxuICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIiBmb250U2l6ZT1cInhsXCI+e3N0YXRpc3RpY3MubmV3Q3VzdG9tZXJzfTwvVGV4dD5cbiAgICAgICAgICAgIDxJbGx1c3RyYXRpb24gdmFyaWFudD1cIkRvY3VtZW50Q2hlY2tcIiB3aWR0aD17NDB9IGhlaWdodD17NDB9IC8+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgICBcbiAgICAgICAgPEJveCBmbGV4PXsxfSBwPVwibGdcIiBiZz1cIndoaXRlXCIgbWI9XCJsZ1wiIGJveFNoYWRvdz1cImNhcmRcIiB3aWR0aD17WzEsIDEvM119PlxuICAgICAgICAgIDxINSBtYj1cIm1kXCI+VG9wIEN1c3RvbWVyPC9INT5cbiAgICAgICAgICB7c3RhdGlzdGljcy50b3BDdXN0b21lciA/IChcbiAgICAgICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPEJveD5cbiAgICAgICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiPlxuICAgICAgICAgICAgICAgICAge3N0YXRpc3RpY3MudG9wQ3VzdG9tZXIubmFtZX1cbiAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgPFRleHQ+XG4gICAgICAgICAgICAgICAgICB7c3RhdGlzdGljcy50b3BDdXN0b21lci5vcmRlckNvdW50fSBvcmRlcnNcbiAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICA8SWxsdXN0cmF0aW9uIHZhcmlhbnQ9XCJGbGFnSW5Db2dcIiB3aWR0aD17NDB9IGhlaWdodD17NDB9IC8+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFRleHQ+Tm8gb3JkZXJzIHlldDwvVGV4dD5cbiAgICAgICAgICApfVxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICB7c3RhdGlzdGljcy5jdXN0b21lcnNCeUdyb3VwLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICA8Qm94PlxuICAgICAgICAgIDxINSBtYj1cIm1kXCI+Q3VzdG9tZXJzIGJ5IEdyb3VwPC9INT5cbiAgICAgICAgICA8Qm94IGJnPVwid2hpdGVcIiBwPVwibGdcIiBib3hTaGFkb3c9XCJjYXJkXCI+XG4gICAgICAgICAgICB7c3RhdGlzdGljcy5jdXN0b21lcnNCeUdyb3VwLm1hcChncm91cCA9PiAoXG4gICAgICAgICAgICAgIDxCb3ggXG4gICAgICAgICAgICAgICAga2V5PXtncm91cC5pZH0gXG4gICAgICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIiBcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIlxuICAgICAgICAgICAgICAgIHA9XCJtZFwiXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tPVwiMXB4IHNvbGlkXCJcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcj1cImdyZXkyMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8VGV4dD57Z3JvdXAubmFtZX08L1RleHQ+XG4gICAgICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIj57Z3JvdXAuY291bnR9PC9UZXh0PlxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21lclN0YXRpc3RpY3M7ICIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIElsbHVzdHJhdGlvbiwgSDQsIEJ1dHRvbiB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgQ3VzdG9tZXJTdGF0aXN0aWNzIGZyb20gJy4vY3VzdG9tZXItc3RhdGlzdGljcy5qcyc7XG5cbmludGVyZmFjZSBEYXNoYm9hcmREYXRhIHtcbiAgcHJvZHVjdHM6IG51bWJlcjtcbiAgb3JkZXJzOiBudW1iZXI7XG4gIGN1c3RvbWVyczogbnVtYmVyO1xuICByZXZlbnVlOiBudW1iZXI7XG59XG5cbmNvbnN0IERhc2hib2FyZDogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlPERhc2hib2FyZERhdGE+KHtcbiAgICBwcm9kdWN0czogMCxcbiAgICBvcmRlcnM6IDAsXG4gICAgY3VzdG9tZXJzOiAwLFxuICAgIHJldmVudWU6IDAsXG4gIH0pO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIExvYWQgZGFzaGJvYXJkIGRhdGFcbiAgICBjb25zdCBmZXRjaERhc2hib2FyZERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICAvLyBT4butIGThu6VuZyBmZXRjaCB0aGF5IHbDrCBBcGlDbGllbnQgxJHhu4MgZ+G7jWkgQVBJIG3hu5tpXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvZGFzaGJvYXJkJyk7XG4gICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgIGNvbnN0IGpzb25EYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgIHNldERhdGEoe1xuICAgICAgICAgICAgcHJvZHVjdHM6IGpzb25EYXRhLnByb2R1Y3RzIHx8IDAsXG4gICAgICAgICAgICBvcmRlcnM6IGpzb25EYXRhLm9yZGVycyB8fCAwLFxuICAgICAgICAgICAgY3VzdG9tZXJzOiBqc29uRGF0YS5jdXN0b21lcnMgfHwgMCxcbiAgICAgICAgICAgIHJldmVudWU6IGpzb25EYXRhLnJldmVudWUgfHwgMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZGFzaGJvYXJkIGRhdGE6JywgZXJyb3IpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoRGFzaGJvYXJkRGF0YSgpO1xuICB9LCBbXSk7XG5cbiAgLy8gRm9ybWF0IHJldmVudWUgd2l0aCAyIGRlY2ltYWwgcGxhY2VzIG9yIHNob3cgMFxuICBjb25zdCBmb3JtYXR0ZWRSZXZlbnVlID0gdHlwZW9mIGRhdGEucmV2ZW51ZSA9PT0gJ251bWJlcicgXG4gICAgPyBkYXRhLnJldmVudWUudG9GaXhlZCgyKSBcbiAgICA6ICcwLjAwJztcblxuICByZXR1cm4gKFxuICAgIDxCb3g+XG4gICAgICA8Qm94IHBvc2l0aW9uPVwicmVsYXRpdmVcIiBvdmVyZmxvdz1cImhpZGRlblwiIGJnPVwid2hpdGVcIiBtYj1cInh4bFwiPlxuICAgICAgICA8Qm94IHBvc2l0aW9uPVwiYWJzb2x1dGVcIiB0b3A9ey0zMH0gbGVmdD17LTMwfSBvcGFjaXR5PXswLjJ9PlxuICAgICAgICAgIDxJbGx1c3RyYXRpb24gdmFyaWFudD1cIlJvY2tldFwiIHdpZHRoPXsyMDB9IGhlaWdodD17MjAwfSAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICAgPEJveCBwPVwieGxcIiBwb3NpdGlvbj1cInJlbGF0aXZlXCIgekluZGV4PXsyfT5cbiAgICAgICAgICA8SDI+V2VsY29tZSB0byBZb3VyIEx1bmFyIEVjb21tZXJjZSBBZG1pbjwvSDI+XG4gICAgICAgICAgPFRleHQ+TWFuYWdlIHlvdXIgcHJvZHVjdHMsIG9yZGVycywgY3VzdG9tZXJzLCBhbmQgbW9yZS48L1RleHQ+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBNZXRyaWNzICovfVxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhEaXJlY3Rpb249e1snY29sdW1uJywgJ3JvdyddfSBtYj1cInhsXCI+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBmbGV4PXsxfVxuICAgICAgICAgIHA9XCJsZ1wiXG4gICAgICAgICAgYmc9XCJ3aGl0ZVwiXG4gICAgICAgICAgbXI9XCJsZ1wiXG4gICAgICAgICAgbWI9XCJsZ1wiXG4gICAgICAgICAgYm94U2hhZG93PVwiY2FyZFwiXG4gICAgICAgICAgd2lkdGg9e1sxLCAxLzRdfVxuICAgICAgICAgIGFzPVwiYVwiXG4gICAgICAgICAgaHJlZj1cIi9hZG1pbi9yZXNvdXJjZXMvUHJvZHVjdFwiXG4gICAgICAgICAgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fVxuICAgICAgICA+XG4gICAgICAgICAgPEg1IG1iPVwibWRcIj5Qcm9kdWN0czwvSDU+XG4gICAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiPlxuICAgICAgICAgICAgPEg0PntkYXRhLnByb2R1Y3RzfTwvSDQ+XG4gICAgICAgICAgICA8SWxsdXN0cmF0aW9uIHZhcmlhbnQ9XCJEb2N1bWVudENoZWNrXCIgd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfSAvPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgICAgXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBmbGV4PXsxfVxuICAgICAgICAgIHA9XCJsZ1wiXG4gICAgICAgICAgYmc9XCJ3aGl0ZVwiXG4gICAgICAgICAgbXI9XCJsZ1wiXG4gICAgICAgICAgbWI9XCJsZ1wiXG4gICAgICAgICAgYm94U2hhZG93PVwiY2FyZFwiXG4gICAgICAgICAgd2lkdGg9e1sxLCAxLzRdfVxuICAgICAgICAgIGFzPVwiYVwiXG4gICAgICAgICAgaHJlZj1cIi9hZG1pbi9yZXNvdXJjZXMvT3JkZXJcIlxuICAgICAgICAgIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAnbm9uZScsIGJvcmRlclJhZGl1czogJzRweCcgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxINSBtYj1cIm1kXCI+T3JkZXJzPC9INT5cbiAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8SDQ+e2RhdGEub3JkZXJzfTwvSDQ+XG4gICAgICAgICAgICA8SWxsdXN0cmF0aW9uIHZhcmlhbnQ9XCJEb2N1bWVudFNlYXJjaFwiIHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0gLz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIFxuICAgICAgICA8Qm94XG4gICAgICAgICAgZmxleD17MX1cbiAgICAgICAgICBwPVwibGdcIlxuICAgICAgICAgIGJnPVwid2hpdGVcIlxuICAgICAgICAgIG1yPVwibGdcIlxuICAgICAgICAgIG1iPVwibGdcIlxuICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxuICAgICAgICAgIHdpZHRoPXtbMSwgMS80XX1cbiAgICAgICAgICBhcz1cImFcIlxuICAgICAgICAgIGhyZWY9XCIvYWRtaW4vcmVzb3VyY2VzL0N1c3RvbWVyXCJcbiAgICAgICAgICBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19XG4gICAgICAgID5cbiAgICAgICAgICA8SDUgbWI9XCJtZFwiPkN1c3RvbWVyczwvSDU+XG4gICAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiPlxuICAgICAgICAgICAgPEg0PntkYXRhLmN1c3RvbWVyc308L0g0PlxuICAgICAgICAgICAgPElsbHVzdHJhdGlvbiB2YXJpYW50PVwiTW9vblwiIHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0gLz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIFxuICAgICAgICA8Qm94XG4gICAgICAgICAgZmxleD17MX1cbiAgICAgICAgICBwPVwibGdcIlxuICAgICAgICAgIGJnPVwid2hpdGVcIlxuICAgICAgICAgIG1iPVwibGdcIlxuICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxuICAgICAgICAgIHdpZHRoPXtbMSwgMS80XX1cbiAgICAgICAgICBhcz1cImFcIlxuICAgICAgICAgIGhyZWY9XCIvYWRtaW4vcmVzb3VyY2VzL09yZGVyXCJcbiAgICAgICAgICBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19XG4gICAgICAgID5cbiAgICAgICAgICA8SDUgbWI9XCJtZFwiPlJldmVudWU8L0g1PlxuICAgICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxIND4ke2Zvcm1hdHRlZFJldmVudWV9PC9IND5cbiAgICAgICAgICAgIDxJbGx1c3RyYXRpb24gdmFyaWFudD1cIlBsYW5ldFwiIHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0gLz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgey8qIEN1c3RvbWVyIFN0YXRpc3RpY3MgKi99XG4gICAgICA8Qm94IG1iPVwieGxcIj5cbiAgICAgICAgPEN1c3RvbWVyU3RhdGlzdGljcyAvPlxuICAgICAgPC9Cb3g+XG4gICAgICBcbiAgICAgIHsvKiBRdWljayBBY3Rpb25zICovfVxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxINSBtYj1cImxnXCI+UXVpY2sgQWN0aW9uczwvSDU+XG4gICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBmbGV4RGlyZWN0aW9uPXtbJ2NvbHVtbicsICdyb3cnXX0gZmxleFdyYXA9XCJ3cmFwXCI+XG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAgcD1cImxnXCJcbiAgICAgICAgICAgIGJnPVwid2hpdGVcIlxuICAgICAgICAgICAgbXI9XCJsZ1wiXG4gICAgICAgICAgICBtYj1cImxnXCJcbiAgICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxuICAgICAgICAgICAgd2lkdGg9e1sxLCAxLzRdfVxuICAgICAgICAgICAgYXM9XCJhXCJcbiAgICAgICAgICAgIGhyZWY9XCIvYWRtaW4vcmVzb3VyY2VzL1Byb2R1Y3QvYWN0aW9ucy9uZXdcIlxuICAgICAgICAgICAgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxCb3ggcD1cIm1kXCIgdGV4dEFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxJbGx1c3RyYXRpb24gdmFyaWFudD1cIkZpbGVTZWFyY2hcIiB3aWR0aD17NDB9IGhlaWdodD17NDB9IC8+XG4gICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCI+QWRkIE5ldyBQcm9kdWN0PC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgXG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAgcD1cImxnXCJcbiAgICAgICAgICAgIGJnPVwid2hpdGVcIlxuICAgICAgICAgICAgbXI9XCJsZ1wiXG4gICAgICAgICAgICBtYj1cImxnXCJcbiAgICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxuICAgICAgICAgICAgd2lkdGg9e1sxLCAxLzRdfVxuICAgICAgICAgICAgYXM9XCJhXCJcbiAgICAgICAgICAgIGhyZWY9XCIvYWRtaW4vcmVzb3VyY2VzL0N1c3RvbWVyL2FjdGlvbnMvbmV3XCJcbiAgICAgICAgICAgIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAnbm9uZScsIGJvcmRlclJhZGl1czogJzRweCcgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Qm94IHA9XCJtZFwiIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgICA8SWxsdXN0cmF0aW9uIHZhcmlhbnQ9XCJGbGFnSW5Db2dcIiB3aWR0aD17NDB9IGhlaWdodD17NDB9IC8+XG4gICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCI+QWRkIE5ldyBDdXN0b21lcjwvVGV4dD5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIFxuICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgIHA9XCJsZ1wiXG4gICAgICAgICAgICBiZz1cIndoaXRlXCJcbiAgICAgICAgICAgIG1yPVwibGdcIlxuICAgICAgICAgICAgbWI9XCJsZ1wiXG4gICAgICAgICAgICBib3hTaGFkb3c9XCJjYXJkXCJcbiAgICAgICAgICAgIHdpZHRoPXtbMSwgMS80XX1cbiAgICAgICAgICAgIGFzPVwiYVwiXG4gICAgICAgICAgICBocmVmPVwiL2FkbWluL3Jlc291cmNlcy9EaXNjb3VudC9hY3Rpb25zL25ld1wiXG4gICAgICAgICAgICBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEJveCBwPVwibWRcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgPElsbHVzdHJhdGlvbiB2YXJpYW50PVwiRG9jdW1lbnRDaGVja1wiIHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0gLz5cbiAgICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIj5DcmVhdGUgRGlzY291bnQ8L1RleHQ+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICBcbiAgICAgICAgICA8Qm94XG4gICAgICAgICAgICBwPVwibGdcIlxuICAgICAgICAgICAgYmc9XCJ3aGl0ZVwiXG4gICAgICAgICAgICBtYj1cImxnXCJcbiAgICAgICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxuICAgICAgICAgICAgd2lkdGg9e1sxLCAxLzRdfVxuICAgICAgICAgICAgYXM9XCJhXCJcbiAgICAgICAgICAgIGhyZWY9XCIvYWRtaW4vcmVzb3VyY2VzL0NvbGxlY3Rpb24vYWN0aW9ucy9uZXdcIlxuICAgICAgICAgICAgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxCb3ggcD1cIm1kXCIgdGV4dEFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxJbGx1c3RyYXRpb24gdmFyaWFudD1cIkZvbGRlcnNcIiB3aWR0aD17NDB9IGhlaWdodD17NDB9IC8+XG4gICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCI+Q3JlYXRlIENvbGxlY3Rpb248L1RleHQ+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgey8qIERvY3VtZW50YXRpb24gKi99XG4gICAgICA8Qm94IHA9XCJ4bFwiIGJnPVwiZ3JleTEwMFwiIG10PVwieGxcIiBib3hTaGFkb3c9XCJjYXJkXCIgc3R5bGU9e3sgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fT5cbiAgICAgICAgPEg1PkRvY3VtZW50YXRpb24gJiBSZXNvdXJjZXM8L0g1PlxuICAgICAgICA8VGV4dCBtYj1cImxnXCI+RmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHlvdXIgZWNvbW1lcmNlIHBsYXRmb3JtIGluIHRoZSBsaW5rcyBiZWxvdzo8L1RleHQ+XG4gICAgICAgIFxuICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZmxleERpcmVjdGlvbj17Wydjb2x1bW4nLCAncm93J119PlxuICAgICAgICAgIDxCdXR0b24gYXM9XCJhXCIgaHJlZj1cImh0dHBzOi8vZG9jcy5sdW5hcnBocC5pby9cIiB0YXJnZXQ9XCJfYmxhbmtcIiBtcj1cImRlZmF1bHRcIiBtYj17WydkZWZhdWx0JywgMF19PlxuICAgICAgICAgICAgRG9jdW1lbnRhdGlvblxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gYXM9XCJhXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9sdW5hcnBocC9sdW5hclwiIHRhcmdldD1cIl9ibGFua1wiIG1yPVwiZGVmYXVsdFwiIG1iPXtbJ2RlZmF1bHQnLCAwXX0gdmFyaWFudD1cImxpZ2h0XCI+XG4gICAgICAgICAgICBHaXRIdWJcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIGFzPVwiYVwiIGhyZWY9XCJodHRwczovL2Rpc2NvcmQuY29tL2ludml0ZS92NnFWV21BXCIgdGFyZ2V0PVwiX2JsYW5rXCIgdmFyaWFudD1cImxpZ2h0XCI+XG4gICAgICAgICAgICBEaXNjb3JkIENvbW11bml0eVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkOyAiLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgSDMsIExhYmVsLCBUZXh0LCBCdXR0b24sIE1lc3NhZ2VCb3gsIExvYWRlciwgRm9ybUdyb3VwLCBUZXh0QXJlYSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBBdHRyaWJ1dGVFZGl0b3IgZnJvbSAnLi9hdHRyaWJ1dGUtZWRpdG9yLmpzJztcblxuLy8gQ3JlYXRlIHN0eWxlZCBjb21wb25lbnRzIGZvciBpbnB1dHNcbmNvbnN0IFRleHRJbnB1dCA9IHN0eWxlZC5pbnB1dGBcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjQzBDOUQ0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIG91dGxpbmU6IG5vbmU7XG4gIFxuICAmOmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICMzNzk1QkU7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoNTUsIDE0OSwgMTkwLCAwLjIpO1xuICB9XG5gO1xuXG5jb25zdCBTdGF0dXNTZWxlY3QgPSBzdHlsZWQuc2VsZWN0YFxuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNDMEM5RDQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgb3V0bGluZTogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIFxuICAmOmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICMzNzk1QkU7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoNTUsIDE0OSwgMTkwLCAwLjIpO1xuICB9XG5gO1xuXG5jb25zdCBTd2l0Y2ggPSBzdHlsZWQuaW5wdXQuYXR0cnMoeyB0eXBlOiAnY2hlY2tib3gnIH0pYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNGU3ZWE7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcztcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBcbiAgJjpjaGVja2VkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMURDOUE0O1xuICB9XG4gIFxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMThweDtcbiAgICBoZWlnaHQ6IDE4cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIHRvcDogMXB4O1xuICAgIGxlZnQ6IDFweDtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcztcbiAgfVxuICBcbiAgJjpjaGVja2VkOjpiZWZvcmUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTtcbiAgfVxuYDtcblxuY29uc3QgUHJvZHVjdEZvcm0gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlLCBhY3Rpb24gfSA9IHByb3BzO1xuICBjb25zdCBpc0VkaXRpbmcgPSByZWNvcmQgJiYgcmVjb3JkLmlkO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzdWNjZXNzLCBzZXRTdWNjZXNzXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XG4gICAgcHJvZHVjdF90eXBlX2lkOiAnJyxcbiAgICBzdGF0dXM6ICdkcmFmdCcsXG4gICAgYXR0cmlidXRlX2RhdGE6IHt9LFxuICAgIGNyZWF0ZURlZmF1bHRWYXJpYW50OiB0cnVlLFxuICB9KTtcbiAgY29uc3QgW3Byb2R1Y3RUeXBlcywgc2V0UHJvZHVjdFR5cGVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG4gIC8vIEZldGNoIHByb2R1Y3QgdHlwZXMgb24gY29tcG9uZW50IG1vdW50XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgXG4gICAgICAgIC8vIE9ubHkgZmV0Y2ggcHJvZHVjdCB0eXBlcyB3aGljaCBzaG91bGQgZGVmaW5pdGVseSBleGlzdFxuICAgICAgICBjb25zdCBwcm9kdWN0VHlwZXNSZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7IHJlc291cmNlSWQ6ICdQcm9kdWN0VHlwZScsIGFjdGlvbk5hbWU6ICdsaXN0JyB9KTtcbiAgICAgICAgc2V0UHJvZHVjdFR5cGVzKHByb2R1Y3RUeXBlc1Jlc3BvbnNlLmRhdGEucmVjb3JkcyB8fCBbXSk7XG4gICAgICAgIFxuICAgICAgICAvLyBJZiBlZGl0aW5nLCBsb2FkIHRoZSBwcm9kdWN0IGRhdGFcbiAgICAgICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FkbWluL2FwaS9wcm9kdWN0cy8ke3JlY29yZC5pZH1gKTtcbiAgICAgICAgICAgIGlmIChwcm9kdWN0UmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdERhdGEgPSBhd2FpdCBwcm9kdWN0UmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICBzZXRGb3JtRGF0YSh7XG4gICAgICAgICAgICAgICAgcHJvZHVjdF90eXBlX2lkOiBwcm9kdWN0RGF0YS5wcm9kdWN0X3R5cGVfaWQgfHwgJycsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBwcm9kdWN0RGF0YS5zdGF0dXMgfHwgJ2RyYWZ0JyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVfZGF0YTogcHJvZHVjdERhdGEuYXR0cmlidXRlX2RhdGEgfHwge30sXG4gICAgICAgICAgICAgICAgY3JlYXRlRGVmYXVsdFZhcmlhbnQ6IGZhbHNlLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHByb2R1Y3QgZGF0YTonLCBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBmb3JtIGRhdGE6JywgZSk7XG4gICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBmb3JtIGRhdGEuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbaXNFZGl0aW5nLCByZWNvcmRdKTtcbiAgXG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHZhbHVlLCB0eXBlLCBjaGVja2VkIH0gPSBlLnRhcmdldDtcbiAgICBzZXRGb3JtRGF0YShwcmV2ID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgW25hbWVdOiB0eXBlID09PSAnY2hlY2tib3gnID8gY2hlY2tlZCA6IHZhbHVlXG4gICAgfSkpO1xuICB9O1xuICBcbiAgY29uc3QgaGFuZGxlQXR0cmlidXRlQ2hhbmdlID0gKHByb3BlcnR5TmFtZSwgdmFsdWUpID0+IHtcbiAgICBzZXRGb3JtRGF0YShwcmV2ID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgW3Byb3BlcnR5TmFtZV06IHZhbHVlXG4gICAgfSkpO1xuICB9O1xuICBcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvcihudWxsKTtcbiAgICAgIHNldFN1Y2Nlc3MoZmFsc2UpO1xuICAgICAgXG4gICAgICBjb25zdCBhcGlFbmRwb2ludCA9IGlzRWRpdGluZyBcbiAgICAgICAgPyBgL2FkbWluL2FwaS9wcm9kdWN0cy8ke3JlY29yZC5pZH1gXG4gICAgICAgIDogJy9hZG1pbi9hcGkvcHJvZHVjdHMnO1xuICAgICAgXG4gICAgICBjb25zdCBtZXRob2QgPSBpc0VkaXRpbmcgPyAnUFVUJyA6ICdQT1NUJztcbiAgICAgIFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGlFbmRwb2ludCwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShmb3JtRGF0YSksXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEuZXJyb3IgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNhdmluZyB0aGUgcHJvZHVjdCcpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgXG4gICAgICBzZXRTdWNjZXNzKHRydWUpO1xuICAgICAgXG4gICAgICAvLyBSZWRpcmVjdCB0byB0aGUgcHJvZHVjdCBsaXN0IGFmdGVyIGEgc2hvcnQgZGVsYXkgaWYgY3JlYXRpbmcgbmV3IHByb2R1Y3RcbiAgICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hZG1pbi9yZXNvdXJjZXMvUHJvZHVjdCc7XG4gICAgICAgIH0sIDE1MDApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNhdmluZyBwcm9kdWN0OicsIGUpO1xuICAgICAgc2V0RXJyb3IoZS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2F2ZSBwcm9kdWN0LiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG4gIFxuICBpZiAobG9hZGluZyAmJiAhZm9ybURhdGEucHJvZHVjdF90eXBlX2lkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3g+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgICAgPFRleHQgbXQ9XCJkZWZhdWx0XCI+TG9hZGluZy4uLjwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cbiAgXG4gIHJldHVybiAoXG4gICAgPEJveCBhcz1cImZvcm1cIiBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgIDxIMyBtYj1cInhsXCI+e2lzRWRpdGluZyA/ICdFZGl0IFByb2R1Y3QnIDogJ0NyZWF0ZSBOZXcgUHJvZHVjdCd9PC9IMz5cbiAgICAgIFxuICAgICAge2Vycm9yICYmIChcbiAgICAgICAgPE1lc3NhZ2VCb3ggbWI9XCJ4bFwiIG1lc3NhZ2U9e2Vycm9yfSB2YXJpYW50PVwiZGFuZ2VyXCIgLz5cbiAgICAgICl9XG4gICAgICBcbiAgICAgIHtzdWNjZXNzICYmIChcbiAgICAgICAgPE1lc3NhZ2VCb3ggbWI9XCJ4bFwiIG1lc3NhZ2U9XCJQcm9kdWN0IHNhdmVkIHN1Y2Nlc3NmdWxseSFcIiB2YXJpYW50PVwic3VjY2Vzc1wiIC8+XG4gICAgICApfVxuICAgICAgXG4gICAgICA8Qm94IG1iPVwieGxcIj5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+UHJvZHVjdCBUeXBlPC9MYWJlbD5cbiAgICAgICAgICA8U3RhdHVzU2VsZWN0XG4gICAgICAgICAgICBuYW1lPVwicHJvZHVjdF90eXBlX2lkXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5wcm9kdWN0X3R5cGVfaWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgUHJvZHVjdCBUeXBlPC9vcHRpb24+XG4gICAgICAgICAgICB7cHJvZHVjdFR5cGVzLm1hcCh0eXBlID0+IChcbiAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3R5cGUuaWR9IHZhbHVlPXt0eXBlLmlkfT5cbiAgICAgICAgICAgICAgICB7dHlwZS5wYXJhbXMubmFtZX1cbiAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L1N0YXR1c1NlbGVjdD5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5TdGF0dXM8L0xhYmVsPlxuICAgICAgICAgIDxTdGF0dXNTZWxlY3RcbiAgICAgICAgICAgIG5hbWU9XCJzdGF0dXNcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnN0YXR1c31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRyYWZ0XCI+RHJhZnQ8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwdWJsaXNoZWRcIj5QdWJsaXNoZWQ8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhcmNoaXZlZFwiPkFyY2hpdmVkPC9vcHRpb24+XG4gICAgICAgICAgPC9TdGF0dXNTZWxlY3Q+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgeyFpc0VkaXRpbmcgJiYgKFxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWw+Q3JlYXRlIERlZmF1bHQgVmFyaWFudDwvTGFiZWw+XG4gICAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiPlxuICAgICAgICAgICAgICA8U3dpdGNoXG4gICAgICAgICAgICAgICAgbmFtZT1cImNyZWF0ZURlZmF1bHRWYXJpYW50XCJcbiAgICAgICAgICAgICAgICBjaGVja2VkPXtmb3JtRGF0YS5jcmVhdGVEZWZhdWx0VmFyaWFudH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxUZXh0IG1sPVwiZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgIHtmb3JtRGF0YS5jcmVhdGVEZWZhdWx0VmFyaWFudCA/ICdZZXMnIDogJ05vJ31cbiAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgdmFyaWFudD1cInNtXCIgY29sb3I9XCJncmV5MTAwXCI+XG4gICAgICAgICAgICAgIFRoaXMgd2lsbCBjcmVhdGUgYSBkZWZhdWx0IHZhcmlhbnQgZm9yIHRoaXMgcHJvZHVjdCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICApfVxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+UHJvZHVjdCBBdHRyaWJ1dGVzPC9MYWJlbD5cbiAgICAgICAgICA8QXR0cmlidXRlRWRpdG9yXG4gICAgICAgICAgICByZWNvcmQ9e3tcbiAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlX2RhdGE6IGZvcm1EYXRhLmF0dHJpYnV0ZV9kYXRhXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHBvcHVsYXRlZDoge30sXG4gICAgICAgICAgICAgIGVycm9yczoge30sXG4gICAgICAgICAgICAgIHJlY29yZEFjdGlvbnM6IFtdLFxuICAgICAgICAgICAgICBidWxrQWN0aW9uczogW10sXG4gICAgICAgICAgICAgIGlkOiBpc0VkaXRpbmcgPyByZWNvcmQ/LmlkIDogJycsXG4gICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgYmFzZUVycm9yOiBudWxsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiBoYW5kbGVBdHRyaWJ1dGVDaGFuZ2UocHJvcGVydHlOYW1lLCB2YWx1ZSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e2xvYWRpbmd9PlxuICAgICAgICB7bG9hZGluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUgUHJvZHVjdCd9XG4gICAgICA8L0J1dHRvbj5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RGb3JtOyAiLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgSDMsIExhYmVsLCBUZXh0LCBCdXR0b24sIE1lc3NhZ2VCb3gsIExvYWRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG4vLyBDcmVhdGUgc3R5bGVkIGNvbXBvbmVudHMgZm9yIGlucHV0c1xuY29uc3QgVGV4dElucHV0ID0gc3R5bGVkLmlucHV0YFxuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNDMEM5RDQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgb3V0bGluZTogbm9uZTtcbiAgXG4gICY6Zm9jdXMge1xuICAgIGJvcmRlci1jb2xvcjogIzM3OTVCRTtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSg1NSwgMTQ5LCAxOTAsIDAuMik7XG4gIH1cbmA7XG5cbmNvbnN0IE51bWJlcklucHV0ID0gc3R5bGVkLmlucHV0LmF0dHJzKHsgdHlwZTogJ251bWJlcicgfSlgXG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI0MwQzlENDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICBvdXRsaW5lOiBub25lO1xuICBcbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjMzc5NUJFO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKDU1LCAxNDksIDE5MCwgMC4yKTtcbiAgfVxuYDtcblxuY29uc3QgU2VsZWN0ID0gc3R5bGVkLnNlbGVjdGBcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjQzBDOUQ0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBcbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjMzc5NUJFO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKDU1LCAxNDksIDE5MCwgMC4yKTtcbiAgfVxuYDtcblxuY29uc3QgSW1hZ2VVcGxvYWQgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBib3JkZXI6IDJweCBkYXNoZWQgI0MwQzlENDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG4gIFxuICAmOmhvdmVyIHtcbiAgICBib3JkZXItY29sb3I6ICMzNzk1QkU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg1NSwgMTQ5LCAxOTAsIDAuMDUpO1xuICB9XG4gIFxuICBpbnB1dCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuYDtcblxuY29uc3QgSW1hZ2VQcmV2aWV3Q29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG5gO1xuXG5jb25zdCBJbWFnZVByZXZpZXcgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDBweDtcbiAgaGVpZ2h0OiAxMDBweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBcbiAgaW1nIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gIH1cbiAgXG4gIC5yZW1vdmUtYnRuIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAycHg7XG4gICAgcmlnaHQ6IDJweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCk7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHdpZHRoOiAyMnB4O1xuICAgIGhlaWdodDogMjJweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGNvbG9yOiAjRkY1QzVDO1xuICAgIFxuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBjb2xvcjogI0ZGMDAwMDtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IFByb2R1Y3RWYXJpYW50Rm9ybSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UsIGFjdGlvbiB9ID0gcHJvcHM7XG4gIGNvbnN0IGlzRWRpdGluZyA9IHJlY29yZCAmJiByZWNvcmQuaWQ7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBcbiAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XG4gICAgcHJvZHVjdF9pZDogJycsXG4gICAgc2t1OiAnJyxcbiAgICBzdG9jazogMCxcbiAgICB1bml0X3F1YW50aXR5OiAxLFxuICAgIGJhY2tvcmRlcjogbnVsbCxcbiAgICBwdXJjaGFzYWJsZTogJ2Fsd2F5cycsXG4gICAgYXR0cmlidXRlX2RhdGE6IHt9LFxuICB9KTtcbiAgXG4gIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtleGlzdGluZ0ltYWdlcywgc2V0RXhpc3RpbmdJbWFnZXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbcHJvZHVjdHMsIHNldFByb2R1Y3RzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG4gIC8vIEZldGNoIHByb2R1Y3RzIG9uIGNvbXBvbmVudCBtb3VudFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIFxuICAgICAgICAvLyBPbmx5IHRyeSB0byBmZXRjaCBwcm9kdWN0cywgc2luY2UgdGhleSBzaG91bGQgZGVmaW5pdGVseSBleGlzdFxuICAgICAgICBjb25zdCBwcm9kdWN0c1Jlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHsgcmVzb3VyY2VJZDogJ1Byb2R1Y3QnLCBhY3Rpb25OYW1lOiAnbGlzdCcgfSk7XG4gICAgICAgIHNldFByb2R1Y3RzKHByb2R1Y3RzUmVzcG9uc2UuZGF0YS5yZWNvcmRzIHx8IFtdKTtcbiAgICAgICAgXG4gICAgICAgIC8vIElmIGVkaXRpbmcsIGxvYWQgdGhlIHByb2R1Y3QgdmFyaWFudCBkYXRhXG4gICAgICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdmFyaWFudFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hZG1pbi9hcGkvcHJvZHVjdC12YXJpYW50cy8ke3JlY29yZC5pZH1gKTtcbiAgICAgICAgICAgIGlmICh2YXJpYW50UmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgY29uc3QgdmFyaWFudERhdGEgPSBhd2FpdCB2YXJpYW50UmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICBzZXRGb3JtRGF0YSh7XG4gICAgICAgICAgICAgICAgcHJvZHVjdF9pZDogdmFyaWFudERhdGEucHJvZHVjdF9pZCB8fCAnJyxcbiAgICAgICAgICAgICAgICBza3U6IHZhcmlhbnREYXRhLnNrdSB8fCAnJyxcbiAgICAgICAgICAgICAgICBzdG9jazogdmFyaWFudERhdGEuc3RvY2sgfHwgMCxcbiAgICAgICAgICAgICAgICB1bml0X3F1YW50aXR5OiB2YXJpYW50RGF0YS51bml0X3F1YW50aXR5IHx8IDEsXG4gICAgICAgICAgICAgICAgYmFja29yZGVyOiB2YXJpYW50RGF0YS5iYWNrb3JkZXIgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICBwdXJjaGFzYWJsZTogdmFyaWFudERhdGEucHVyY2hhc2FibGUgfHwgJ2Fsd2F5cycsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlX2RhdGE6IHZhcmlhbnREYXRhLmF0dHJpYnV0ZV9kYXRhIHx8IHt9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHZhcmlhbnQgZGF0YTonLCBlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gRmV0Y2ggZXhpc3RpbmcgaW1hZ2VzXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hZG1pbi9hcGkvcHJvZHVjdC12YXJpYW50cy8ke3JlY29yZC5pZH0vaW1hZ2VzYCk7XG4gICAgICAgICAgICBpZiAoaW1hZ2VzUmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgY29uc3QgaW1hZ2VzRGF0YSA9IGF3YWl0IGltYWdlc1Jlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgc2V0RXhpc3RpbmdJbWFnZXMoaW1hZ2VzRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdmFyaWFudCBpbWFnZXM6JywgZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgZm9ybSBkYXRhOicsIGUpO1xuICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIGxvYWQgZm9ybSBkYXRhLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBcbiAgICBmZXRjaERhdGEoKTtcbiAgfSwgW2lzRWRpdGluZywgcmVjb3JkXSk7XG4gIFxuICBjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSwgdHlwZSB9ID0gZS50YXJnZXQ7XG4gICAgc2V0Rm9ybURhdGEocHJldiA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIFtuYW1lXTogdHlwZSA9PT0gJ251bWJlcicgPyBOdW1iZXIodmFsdWUpIDogdmFsdWVcbiAgICB9KSk7XG4gIH07XG4gIFxuICBjb25zdCBoYW5kbGVJbWFnZVNlbGVjdCA9IChlKSA9PiB7XG4gICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKGUudGFyZ2V0LmZpbGVzIHx8IFtdKTtcbiAgICBjb25zdCBuZXdJbWFnZXMgPSBmaWxlcy5tYXAoZmlsZSA9PiAoe1xuICAgICAgZmlsZSxcbiAgICAgIHByZXZpZXc6IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSBhcyBCbG9iKVxuICAgIH0pKTtcbiAgICBcbiAgICBzZXRJbWFnZXMocHJldiA9PiBbLi4ucHJldiwgLi4ubmV3SW1hZ2VzXSk7XG4gIH07XG4gIFxuICBjb25zdCByZW1vdmVJbWFnZSA9IChpbmRleCkgPT4ge1xuICAgIHNldEltYWdlcyhwcmV2ID0+IHByZXYuZmlsdGVyKChfLCBpKSA9PiBpICE9PSBpbmRleCkpO1xuICB9O1xuICBcbiAgY29uc3QgcmVtb3ZlRXhpc3RpbmdJbWFnZSA9IGFzeW5jIChpbWFnZUlkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hZG1pbi9hcGkvbWVkaWEvJHtpbWFnZUlkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgc2V0RXhpc3RpbmdJbWFnZXMocHJldiA9PiBwcmV2LmZpbHRlcihpbWcgPT4gaW1nLmlkICE9PSBpbWFnZUlkKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIHJlbW92ZSBpbWFnZS4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciByZW1vdmluZyBpbWFnZTonLCBlKTtcbiAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gcmVtb3ZlIGltYWdlLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgIH1cbiAgfTtcbiAgXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIHRyeSB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgICBzZXRTdWNjZXNzKGZhbHNlKTtcbiAgICAgIFxuICAgICAgY29uc3QgYXBpRW5kcG9pbnQgPSBpc0VkaXRpbmcgXG4gICAgICAgID8gYC9hZG1pbi9hcGkvcHJvZHVjdC12YXJpYW50cy8ke3JlY29yZC5pZH1gXG4gICAgICAgIDogJy9hZG1pbi9hcGkvcHJvZHVjdC12YXJpYW50cyc7XG4gICAgICBcbiAgICAgIGNvbnN0IG1ldGhvZCA9IGlzRWRpdGluZyA/ICdQVVQnIDogJ1BPU1QnO1xuICAgICAgXG4gICAgICAvLyBGaXJzdCBzYXZlIHRoZSBwcm9kdWN0IHZhcmlhbnRcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpRW5kcG9pbnQsIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZm9ybURhdGEpLFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLmVycm9yIHx8ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzYXZpbmcgdGhlIHByb2R1Y3QgdmFyaWFudCcpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgY29uc3QgdmFyaWFudElkID0gZGF0YS5pZCB8fCByZWNvcmQuaWQ7XG4gICAgICBcbiAgICAgIC8vIFRoZW4gdXBsb2FkIGFueSBpbWFnZXMgaWYgcHJlc2VudFxuICAgICAgaWYgKGltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGltYWdlcy5mb3JFYWNoKGltZyA9PiB7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdpbWFnZXMnLCBpbWcuZmlsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdXBsb2FkUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FkbWluL2FwaS9wcm9kdWN0LXZhcmlhbnRzLyR7dmFyaWFudElkfS9pbWFnZXNgLCB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKCF1cGxvYWRSZXNwb25zZS5vaykge1xuICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHVwbG9hZFJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLmVycm9yIHx8ICdJbWFnZXMgd2VyZSB1cGxvYWRlZCBidXQgZmFpbGVkIHRvIGFzc29jaWF0ZSB3aXRoIHRoZSB2YXJpYW50Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgc2V0U3VjY2Vzcyh0cnVlKTtcbiAgICAgIFxuICAgICAgLy8gUmVkaXJlY3QgdG8gdGhlIHByb2R1Y3QgdmFyaWFudCBsaXN0IGFmdGVyIGEgc2hvcnQgZGVsYXkgaWYgY3JlYXRpbmcgbmV3IHZhcmlhbnRcbiAgICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hZG1pbi9yZXNvdXJjZXMvUHJvZHVjdFZhcmlhbnQnO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgcHJvZHVjdCB2YXJpYW50OicsIGUpO1xuICAgICAgc2V0RXJyb3IoZS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2F2ZSBwcm9kdWN0IHZhcmlhbnQuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcbiAgXG4gIGlmIChsb2FkaW5nICYmICFmb3JtRGF0YS5wcm9kdWN0X2lkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3g+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgICAgPFRleHQgbXQ9XCJkZWZhdWx0XCI+TG9hZGluZy4uLjwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cbiAgXG4gIHJldHVybiAoXG4gICAgPEJveCBhcz1cImZvcm1cIiBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgIDxIMyBtYj1cInhsXCI+e2lzRWRpdGluZyA/ICdFZGl0IFByb2R1Y3QgVmFyaWFudCcgOiAnQ3JlYXRlIE5ldyBQcm9kdWN0IFZhcmlhbnQnfTwvSDM+XG4gICAgICBcbiAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgIDxNZXNzYWdlQm94IG1iPVwieGxcIiBtZXNzYWdlPXtlcnJvcn0gdmFyaWFudD1cImRhbmdlclwiIC8+XG4gICAgICApfVxuICAgICAgXG4gICAgICB7c3VjY2VzcyAmJiAoXG4gICAgICAgIDxNZXNzYWdlQm94IG1iPVwieGxcIiBtZXNzYWdlPVwiUHJvZHVjdCB2YXJpYW50IHNhdmVkIHN1Y2Nlc3NmdWxseSFcIiB2YXJpYW50PVwic3VjY2Vzc1wiIC8+XG4gICAgICApfVxuICAgICAgXG4gICAgICA8Qm94IG1iPVwieGxcIj5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+UHJvZHVjdDwvTGFiZWw+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgbmFtZT1cInByb2R1Y3RfaWRcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnByb2R1Y3RfaWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgUHJvZHVjdDwvb3B0aW9uPlxuICAgICAgICAgICAge3Byb2R1Y3RzLm1hcChwcm9kdWN0ID0+IChcbiAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3Byb2R1Y3QuaWR9IHZhbHVlPXtwcm9kdWN0LmlkfT5cbiAgICAgICAgICAgICAgICB7cHJvZHVjdC5pZH0gLSB7cHJvZHVjdC5wYXJhbXMuYXR0cmlidXRlX2RhdGE/Lm5hbWUgfHwgJ1VubmFtZWQgUHJvZHVjdCd9XG4gICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9TZWxlY3Q+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+U0tVPC9MYWJlbD5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICBuYW1lPVwic2t1XCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5za3V9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNLVVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD5TdG9jazwvTGFiZWw+XG4gICAgICAgICAgPE51bWJlcklucHV0XG4gICAgICAgICAgICBuYW1lPVwic3RvY2tcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnN0b2NrfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD5Vbml0IFF1YW50aXR5PC9MYWJlbD5cbiAgICAgICAgICA8TnVtYmVySW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJ1bml0X3F1YW50aXR5XCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS51bml0X3F1YW50aXR5fVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgbWluPVwiMVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD5QdXJjaGFzYWJsZTwvTGFiZWw+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgbmFtZT1cInB1cmNoYXNhYmxlXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5wdXJjaGFzYWJsZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYWx3YXlzXCI+QWx3YXlzPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwid2hlbl9pbl9zdG9ja1wiPldoZW4gSW4gU3RvY2s8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJuZXZlclwiPk5ldmVyPC9vcHRpb24+XG4gICAgICAgICAgPC9TZWxlY3Q+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+SW1hZ2VzPC9MYWJlbD5cbiAgICAgICAgICA8SW1hZ2VVcGxvYWQ+XG4gICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCIgXG4gICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIiBcbiAgICAgICAgICAgICAgbXVsdGlwbGUgXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbWFnZVNlbGVjdH0gXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFRleHQ+Q2xpY2sgdG8gdXBsb2FkIG9yIGRyYWcgYW5kIGRyb3A8L1RleHQ+XG4gICAgICAgICAgICA8VGV4dCB2YXJpYW50PVwic21cIiBtdD1cImRlZmF1bHRcIj5KUEVHLCBQTkcsIEdJRiB1cCB0byA1TUI8L1RleHQ+XG4gICAgICAgICAgPC9JbWFnZVVwbG9hZD5cbiAgICAgICAgICBcbiAgICAgICAgICB7aW1hZ2VzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgPEltYWdlUHJldmlld0NvbnRhaW5lcj5cbiAgICAgICAgICAgICAge2ltYWdlcy5tYXAoKGltZywgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8SW1hZ2VQcmV2aWV3IGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2ltZy5wcmV2aWV3fSBhbHQ9XCJQcmV2aWV3XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVtb3ZlLWJ0blwiIG9uQ2xpY2s9eygpID0+IHJlbW92ZUltYWdlKGluZGV4KX0+w5c8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L0ltYWdlUHJldmlldz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L0ltYWdlUHJldmlld0NvbnRhaW5lcj5cbiAgICAgICAgICApfVxuICAgICAgICAgIFxuICAgICAgICAgIHtleGlzdGluZ0ltYWdlcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxUZXh0IG10PVwibGdcIiBtYj1cInNtXCI+RXhpc3RpbmcgSW1hZ2VzPC9UZXh0PlxuICAgICAgICAgICAgICA8SW1hZ2VQcmV2aWV3Q29udGFpbmVyPlxuICAgICAgICAgICAgICAgIHtleGlzdGluZ0ltYWdlcy5tYXAoaW1nID0+IChcbiAgICAgICAgICAgICAgICAgIDxJbWFnZVByZXZpZXcga2V5PXtpbWcuaWR9PlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17aW1nLnVybH0gYWx0PXtpbWcubmFtZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZW1vdmUtYnRuXCIgb25DbGljaz17KCkgPT4gcmVtb3ZlRXhpc3RpbmdJbWFnZShpbWcuaWQpfT7DlzwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9JbWFnZVByZXZpZXc+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvSW1hZ2VQcmV2aWV3Q29udGFpbmVyPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e2xvYWRpbmd9PlxuICAgICAgICB7bG9hZGluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUgUHJvZHVjdCBWYXJpYW50J31cbiAgICAgIDwvQnV0dG9uPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvZHVjdFZhcmlhbnRGb3JtOyAiLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgSDMsIExhYmVsLCBUZXh0LCBCdXR0b24sIE1lc3NhZ2VCb3gsIExvYWRlciwgRm9ybUdyb3VwLCBUZXh0QXJlYSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBBdHRyaWJ1dGVFZGl0b3IgZnJvbSAnLi9hdHRyaWJ1dGUtZWRpdG9yLmpzJztcblxuLy8gQ3JlYXRlIHN0eWxlZCBjb21wb25lbnRzIGZvciBpbnB1dHNcbmNvbnN0IFRleHRJbnB1dCA9IHN0eWxlZC5pbnB1dGBcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjQzBDOUQ0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIG91dGxpbmU6IG5vbmU7XG4gIFxuICAmOmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICMzNzk1QkU7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoNTUsIDE0OSwgMTkwLCAwLjIpO1xuICB9XG5gO1xuXG5jb25zdCBTdGF0dXNTZWxlY3QgPSBzdHlsZWQuc2VsZWN0YFxuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNDMEM5RDQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgb3V0bGluZTogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIFxuICAmOmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICMzNzk1QkU7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoNTUsIDE0OSwgMTkwLCAwLjIpO1xuICB9XG5gO1xuXG4vLyBNdWx0aS1zZWxlY3QgY29tcG9uZW50IGZvciBwcm9kdWN0c1xuY29uc3QgUHJvZHVjdFNlbGVjdCA9IHN0eWxlZC5zZWxlY3RgXG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI0MwQzlENDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICBvdXRsaW5lOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgbWluLWhlaWdodDogMTUwcHg7XG4gIFxuICAmOmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICMzNzk1QkU7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoNTUsIDE0OSwgMTkwLCAwLjIpO1xuICB9XG5gO1xuXG5jb25zdCBDb2xsZWN0aW9uRm9ybSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UsIGFjdGlvbiB9ID0gcHJvcHM7XG4gIGNvbnN0IGlzRWRpdGluZyA9IHJlY29yZCAmJiByZWNvcmQuaWQ7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICBjb2xsZWN0aW9uX2dyb3VwX2lkOiAnJyxcbiAgICBwYXJlbnRfaWQ6IG51bGwsXG4gICAgdHlwZTogJ3N0YXRpYycsXG4gICAgc29ydDogJ2N1c3RvbScsXG4gICAgcHJvZHVjdF9pZHM6IFtdLFxuICAgIGF0dHJpYnV0ZV9kYXRhOiB7fSxcbiAgfSk7XG4gIGNvbnN0IFtncm91cHMsIHNldEdyb3Vwc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtjb2xsZWN0aW9ucywgc2V0Q29sbGVjdGlvbnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbcHJvZHVjdHMsIHNldFByb2R1Y3RzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG4gIC8vIEZldGNoIGNvbGxlY3Rpb24gZ3JvdXBzLCBwYXJlbnQgY29sbGVjdGlvbnMgYW5kIHByb2R1Y3RzIG9uIGNvbXBvbmVudCBtb3VudFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIFxuICAgICAgICAvLyBGZXRjaCBjb2xsZWN0aW9uIGdyb3Vwc1xuICAgICAgICBjb25zdCBncm91cHNSZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL2NvbGxlY3Rpb24tZ3JvdXBzJyk7XG4gICAgICAgIGNvbnN0IGdyb3Vwc0RhdGEgPSBhd2FpdCBncm91cHNSZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHNldEdyb3Vwcyhncm91cHNEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEZldGNoIGFsbCBjb2xsZWN0aW9ucyBmb3IgcGFyZW50IHNlbGVjdGlvblxuICAgICAgICBjb25zdCBjb2xsZWN0aW9uc1Jlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHsgcmVzb3VyY2VJZDogJ0NvbGxlY3Rpb24nLCBhY3Rpb25OYW1lOiAnbGlzdCcgfSk7XG4gICAgICAgIHNldENvbGxlY3Rpb25zKGNvbGxlY3Rpb25zUmVzcG9uc2UuZGF0YS5yZWNvcmRzIHx8IFtdKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEZldGNoIHByb2R1Y3RzXG4gICAgICAgIGNvbnN0IHByb2R1Y3RzUmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oeyByZXNvdXJjZUlkOiAnUHJvZHVjdCcsIGFjdGlvbk5hbWU6ICdsaXN0JyB9KTtcbiAgICAgICAgc2V0UHJvZHVjdHMocHJvZHVjdHNSZXNwb25zZS5kYXRhLnJlY29yZHMgfHwgW10pO1xuICAgICAgICBcbiAgICAgICAgLy8gSWYgZWRpdGluZywgbG9hZCB0aGUgY29sbGVjdGlvbiBkYXRhXG4gICAgICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgICAgICAvLyBGZXRjaCBjb2xsZWN0aW9uIGRldGFpbHMgd2l0aCBwcm9kdWN0c1xuICAgICAgICAgIGNvbnN0IGNvbGxlY3Rpb25SZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYWRtaW4vYXBpL2NvbGxlY3Rpb25zLyR7cmVjb3JkLmlkfWApO1xuICAgICAgICAgIGlmIChjb2xsZWN0aW9uUmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxlY3Rpb25EYXRhID0gYXdhaXQgY29sbGVjdGlvblJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHNldEZvcm1EYXRhKHtcbiAgICAgICAgICAgICAgY29sbGVjdGlvbl9ncm91cF9pZDogY29sbGVjdGlvbkRhdGEuY29sbGVjdGlvbl9ncm91cF9pZCB8fCAnJyxcbiAgICAgICAgICAgICAgcGFyZW50X2lkOiBjb2xsZWN0aW9uRGF0YS5wYXJlbnRfaWQgfHwgbnVsbCxcbiAgICAgICAgICAgICAgdHlwZTogY29sbGVjdGlvbkRhdGEudHlwZSB8fCAnc3RhdGljJyxcbiAgICAgICAgICAgICAgc29ydDogY29sbGVjdGlvbkRhdGEuc29ydCB8fCAnY3VzdG9tJyxcbiAgICAgICAgICAgICAgcHJvZHVjdF9pZHM6IChjb2xsZWN0aW9uRGF0YS5wcm9kdWN0cyB8fCBbXSkubWFwKHAgPT4gcC5pZCksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZV9kYXRhOiBjb2xsZWN0aW9uRGF0YS5hdHRyaWJ1dGVfZGF0YSB8fCB7fSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGZvcm0gZGF0YTonLCBlKTtcbiAgICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGZvcm0gZGF0YS4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgZmV0Y2hEYXRhKCk7XG4gIH0sIFtpc0VkaXRpbmcsIHJlY29yZCwgYXBpXSk7XG4gIFxuICBjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSwgdHlwZSB9ID0gZS50YXJnZXQ7XG4gICAgXG4gICAgaWYgKG5hbWUgPT09ICdwcm9kdWN0X2lkcycpIHtcbiAgICAgIC8vIEdldCBzZWxlY3RlZCBvcHRpb25zIGZvciBtdWx0aS1zZWxlY3RcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9ucyA9IEFycmF5LmZyb20oZS50YXJnZXQuc2VsZWN0ZWRPcHRpb25zIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTE9wdGlvbkVsZW1lbnQ+LCBcbiAgICAgICAgKG9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpID0+IG9wdGlvbi52YWx1ZSk7XG4gICAgICBzZXRGb3JtRGF0YShwcmV2ID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIFtuYW1lXTogc2VsZWN0ZWRPcHRpb25zXG4gICAgICB9KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEZvcm1EYXRhKHByZXYgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW25hbWVdOiB2YWx1ZVxuICAgICAgfSkpO1xuICAgIH1cbiAgfTtcbiAgXG4gIGNvbnN0IGhhbmRsZUF0dHJpYnV0ZUNoYW5nZSA9IChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiB7XG4gICAgc2V0Rm9ybURhdGEocHJldiA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIFtwcm9wZXJ0eU5hbWVdOiB2YWx1ZVxuICAgIH0pKTtcbiAgfTtcbiAgXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIHRyeSB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgICBzZXRTdWNjZXNzKGZhbHNlKTtcbiAgICAgIFxuICAgICAgY29uc3QgYXBpRW5kcG9pbnQgPSBpc0VkaXRpbmcgXG4gICAgICAgID8gYC9hZG1pbi9hcGkvY29sbGVjdGlvbnMvJHtyZWNvcmQuaWR9YFxuICAgICAgICA6ICcvYWRtaW4vYXBpL2NvbGxlY3Rpb25zJztcbiAgICAgIFxuICAgICAgY29uc3QgbWV0aG9kID0gaXNFZGl0aW5nID8gJ1BVVCcgOiAnUE9TVCc7XG4gICAgICBcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpRW5kcG9pbnQsIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZm9ybURhdGEpLFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLmVycm9yIHx8ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzYXZpbmcgdGhlIGNvbGxlY3Rpb24nKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIFxuICAgICAgc2V0U3VjY2Vzcyh0cnVlKTtcbiAgICAgIFxuICAgICAgLy8gUmVkaXJlY3QgdG8gdGhlIGNvbGxlY3Rpb24gbGlzdCBhZnRlciBhIHNob3J0IGRlbGF5IGlmIGNyZWF0aW5nIG5ldyBjb2xsZWN0aW9uXG4gICAgICBpZiAoIWlzRWRpdGluZykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYWRtaW4vcmVzb3VyY2VzL0NvbGxlY3Rpb24nO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgY29sbGVjdGlvbjonLCBlKTtcbiAgICAgIHNldEVycm9yKGUubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHNhdmUgY29sbGVjdGlvbi4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuICBcbiAgaWYgKGxvYWRpbmcgJiYgIWZvcm1EYXRhLmNvbGxlY3Rpb25fZ3JvdXBfaWQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveD5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgICA8VGV4dCBtdD1cImRlZmF1bHRcIj5Mb2FkaW5nLi4uPC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuICBcbiAgcmV0dXJuIChcbiAgICA8Qm94IGFzPVwiZm9ybVwiIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxuICAgICAgPEgzIG1iPVwieGxcIj57aXNFZGl0aW5nID8gJ0VkaXQgQ29sbGVjdGlvbicgOiAnQ3JlYXRlIE5ldyBDb2xsZWN0aW9uJ308L0gzPlxuICAgICAgXG4gICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICA8TWVzc2FnZUJveCBtYj1cInhsXCIgbWVzc2FnZT17ZXJyb3J9IHZhcmlhbnQ9XCJkYW5nZXJcIiAvPlxuICAgICAgKX1cbiAgICAgIFxuICAgICAge3N1Y2Nlc3MgJiYgKFxuICAgICAgICA8TWVzc2FnZUJveCBtYj1cInhsXCIgbWVzc2FnZT1cIkNvbGxlY3Rpb24gc2F2ZWQgc3VjY2Vzc2Z1bGx5IVwiIHZhcmlhbnQ9XCJzdWNjZXNzXCIgLz5cbiAgICAgICl9XG4gICAgICBcbiAgICAgIDxCb3ggbWI9XCJ4bFwiPlxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5Db2xsZWN0aW9uIEdyb3VwPC9MYWJlbD5cbiAgICAgICAgICA8U3RhdHVzU2VsZWN0XG4gICAgICAgICAgICBuYW1lPVwiY29sbGVjdGlvbl9ncm91cF9pZFwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuY29sbGVjdGlvbl9ncm91cF9pZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBDb2xsZWN0aW9uIEdyb3VwPC9vcHRpb24+XG4gICAgICAgICAgICB7Z3JvdXBzLm1hcChncm91cCA9PiAoXG4gICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtncm91cC5pZH0gdmFsdWU9e2dyb3VwLmlkfT5cbiAgICAgICAgICAgICAgICB7Z3JvdXAubmFtZX1cbiAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L1N0YXR1c1NlbGVjdD5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD5QYXJlbnQgQ29sbGVjdGlvbjwvTGFiZWw+XG4gICAgICAgICAgPFN0YXR1c1NlbGVjdFxuICAgICAgICAgICAgbmFtZT1cInBhcmVudF9pZFwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEucGFyZW50X2lkIHx8ICcnfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5ObyBQYXJlbnQgKFJvb3QgQ29sbGVjdGlvbik8L29wdGlvbj5cbiAgICAgICAgICAgIHtjb2xsZWN0aW9uc1xuICAgICAgICAgICAgICAuZmlsdGVyKGMgPT4gYy5pZCAhPT0gcmVjb3JkPy5pZCkgLy8gRG9uJ3Qgc2hvdyBjdXJyZW50IGNvbGxlY3Rpb24gYXMgcGFyZW50IG9wdGlvblxuICAgICAgICAgICAgICAubWFwKGNvbGxlY3Rpb24gPT4gKFxuICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtjb2xsZWN0aW9uLmlkfSB2YWx1ZT17Y29sbGVjdGlvbi5pZH0+XG4gICAgICAgICAgICAgICAgICB7Y29sbGVjdGlvbi5wYXJhbXMuYXR0cmlidXRlX2RhdGE/Lm5hbWU/LnZhbHVlIHx8IGBDb2xsZWN0aW9uICMke2NvbGxlY3Rpb24uaWR9YH1cbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L1N0YXR1c1NlbGVjdD5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5UeXBlPC9MYWJlbD5cbiAgICAgICAgICA8U3RhdHVzU2VsZWN0XG4gICAgICAgICAgICBuYW1lPVwidHlwZVwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEudHlwZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInN0YXRpY1wiPlN0YXRpYzwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImR5bmFtaWNcIj5EeW5hbWljPC9vcHRpb24+XG4gICAgICAgICAgPC9TdGF0dXNTZWxlY3Q+XG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIHZhcmlhbnQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCI+XG4gICAgICAgICAgICBTdGF0aWMgY29sbGVjdGlvbnMgaGF2ZSBtYW51YWxseSBhc3NpZ25lZCBwcm9kdWN0cy4gRHluYW1pYyBjb2xsZWN0aW9ucyB1c2UgcnVsZXMgdG8gYXV0b21hdGljYWxseSBhc3NpZ24gcHJvZHVjdHMuXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPlNvcnQ8L0xhYmVsPlxuICAgICAgICAgIDxTdGF0dXNTZWxlY3RcbiAgICAgICAgICAgIG5hbWU9XCJzb3J0XCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5zb3J0fVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY3VzdG9tXCI+Q3VzdG9tPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibmFtZV9hc2NcIj5OYW1lIChBLVopPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibmFtZV9kZXNjXCI+TmFtZSAoWi1BKTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInByaWNlX2FzY1wiPlByaWNlIChMb3cgdG8gSGlnaCk8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwcmljZV9kZXNjXCI+UHJpY2UgKEhpZ2ggdG8gTG93KTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm5ld2VzdFwiPk5ld2VzdCBGaXJzdDwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm9sZGVzdFwiPk9sZGVzdCBGaXJzdDwvb3B0aW9uPlxuICAgICAgICAgIDwvU3RhdHVzU2VsZWN0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIHtmb3JtRGF0YS50eXBlID09PSAnc3RhdGljJyAmJiAoXG4gICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgIDxMYWJlbD5Qcm9kdWN0czwvTGFiZWw+XG4gICAgICAgICAgICA8UHJvZHVjdFNlbGVjdFxuICAgICAgICAgICAgICBuYW1lPVwicHJvZHVjdF9pZHNcIlxuICAgICAgICAgICAgICBtdWx0aXBsZVxuICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEucHJvZHVjdF9pZHN9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3Byb2R1Y3RzLm1hcChwcm9kdWN0ID0+IChcbiAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17cHJvZHVjdC5pZH0gdmFsdWU9e3Byb2R1Y3QuaWR9PlxuICAgICAgICAgICAgICAgICAge3Byb2R1Y3QucGFyYW1zLmF0dHJpYnV0ZV9kYXRhPy5uYW1lPy52YWx1ZSB8fCBgUHJvZHVjdCAjJHtwcm9kdWN0LmlkfWB9XG4gICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9Qcm9kdWN0U2VsZWN0PlxuICAgICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIHZhcmlhbnQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCI+XG4gICAgICAgICAgICAgIEhvbGQgQ3RybCAob3IgQ29tbWFuZCBvbiBNYWMpIHRvIHNlbGVjdCBtdWx0aXBsZSBwcm9kdWN0c1xuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgICBcbiAgICAgIHsvKiBBdHRyaWJ1dGUgRWRpdG9yICovfVxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxBdHRyaWJ1dGVFZGl0b3IgXG4gICAgICAgICAgcmVjb3JkPXt7XG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgYXR0cmlidXRlX2RhdGE6IGZvcm1EYXRhLmF0dHJpYnV0ZV9kYXRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wdWxhdGVkOiB7fSxcbiAgICAgICAgICAgIGVycm9yczoge30sXG4gICAgICAgICAgICByZWNvcmRBY3Rpb25zOiBbXSxcbiAgICAgICAgICAgIGJ1bGtBY3Rpb25zOiBbXSxcbiAgICAgICAgICAgIGlkOiBpc0VkaXRpbmcgPyByZWNvcmQ/LmlkIDogJycsXG4gICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICBiYXNlRXJyb3I6IG51bGxcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVBdHRyaWJ1dGVDaGFuZ2V9XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwiZmxleC1lbmRcIj5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGFzPVwiYVwiXG4gICAgICAgICAgaHJlZj1cIi9hZG1pbi9yZXNvdXJjZXMvQ29sbGVjdGlvblwiXG4gICAgICAgICAgdmFyaWFudD1cImxpZ2h0XCJcbiAgICAgICAgICBtcj1cImxnXCJcbiAgICAgICAgPlxuICAgICAgICAgIENhbmNlbFxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcbiAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cbiAgICAgICAgPlxuICAgICAgICAgIHtsb2FkaW5nID8gJ1NhdmluZy4uLicgOiAoaXNFZGl0aW5nID8gJ1VwZGF0ZSBDb2xsZWN0aW9uJyA6ICdDcmVhdGUgQ29sbGVjdGlvbicpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvbkZvcm07ICIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIEZvcm1Hcm91cCxcbiAgTGFiZWwsXG4gIElucHV0LFxuICBDaGVja0JveCxcbiAgU2VjdGlvbixcbiAgVGV4dCxcbiAgTG9hZGVyLFxuICBNZXNzYWdlQm94LFxufSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZVJlY29yZCwgdXNlVHJhbnNsYXRpb24gfSBmcm9tICdhZG1pbmpzJztcblxuLy8gRGVmaW5lIGludGVyZmFjZXMgZm9yIHN0cm9uZ2x5IHR5cGVkIGNvbXBvbmVudHNcbmludGVyZmFjZSBDdXN0b21lckdyb3VwIHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTWVzc2FnZVN0YXRlIHtcbiAgdHlwZTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG59XG5cbmNvbnN0IEN1c3RvbWVyRm9ybTogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIC8vIEB0cy1pZ25vcmUgLSBJZ25vcmUgdGhlIHR5cGUgZXJyb3IgZm9yIHVzZVJlY29yZFxuICBjb25zdCB7IHJlY29yZCwgaGFuZGxlQ2hhbmdlLCBzdWJtaXQgfSA9IHVzZVJlY29yZCgpO1xuICBjb25zdCB7IHRyYW5zbGF0ZUJ1dHRvbiB9ID0gdXNlVHJhbnNsYXRpb24oKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWVzc2FnZSwgc2V0TWVzc2FnZV0gPSB1c2VTdGF0ZTxNZXNzYWdlU3RhdGU+KHsgdHlwZTogJycsIHRleHQ6ICcnIH0pO1xuICBjb25zdCBbY3VzdG9tZXJHcm91cHMsIHNldEN1c3RvbWVyR3JvdXBzXSA9IHVzZVN0YXRlPEN1c3RvbWVyR3JvdXBbXT4oW10pO1xuICBjb25zdCBbc2VsZWN0ZWRHcm91cHMsIHNldFNlbGVjdGVkR3JvdXBzXSA9IHVzZVN0YXRlPG51bWJlcltdPihbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBMb2FkIGN1c3RvbWVyIGdyb3Vwc1xuICAgIGNvbnN0IGZldGNoQ3VzdG9tZXJHcm91cHMgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL2N1c3RvbWVyLWdyb3VwcycpO1xuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgIHNldEN1c3RvbWVyR3JvdXBzKGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBjdXN0b21lciBncm91cHM6JywgZXJyb3IpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBMb2FkIHNlbGVjdGVkIGdyb3VwcyBpZiBlZGl0aW5nIGFuIGV4aXN0aW5nIGN1c3RvbWVyXG4gICAgY29uc3QgZmV0Y2hDdXN0b21lckRhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAocmVjb3JkLmlkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FkbWluL2FwaS9jdXN0b21lcnMvJHtyZWNvcmQuaWR9YCk7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgaWYgKGRhdGEuY3VzdG9tZXJHcm91cHMgJiYgQXJyYXkuaXNBcnJheShkYXRhLmN1c3RvbWVyR3JvdXBzKSkge1xuICAgICAgICAgICAgICBzZXRTZWxlY3RlZEdyb3VwcyhkYXRhLmN1c3RvbWVyR3JvdXBzLm1hcCgoZ3JvdXA6IGFueSkgPT4gZ3JvdXAuaWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgY3VzdG9tZXIgZGF0YTonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZmV0Y2hDdXN0b21lckdyb3VwcygpO1xuICAgIGZldGNoQ3VzdG9tZXJEYXRhKCk7XG4gIH0sIFtyZWNvcmQuaWRdKTtcblxuICBjb25zdCBoYW5kbGVHcm91cHNDaGFuZ2UgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IG51bVZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICBpZiAoc2VsZWN0ZWRHcm91cHMuaW5jbHVkZXMobnVtVmFsdWUpKSB7XG4gICAgICBzZXRTZWxlY3RlZEdyb3VwcyhzZWxlY3RlZEdyb3Vwcy5maWx0ZXIoaWQgPT4gaWQgIT09IG51bVZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFNlbGVjdGVkR3JvdXBzKFsuLi5zZWxlY3RlZEdyb3VwcywgbnVtVmFsdWVdKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGV2ZW50OiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TWVzc2FnZSh7IHR5cGU6ICcnLCB0ZXh0OiAnJyB9KTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBQcmVwYXJlIGZvcm0gZGF0YVxuICAgICAgY29uc3QgZm9ybURhdGEgPSB7XG4gICAgICAgIHRpdGxlOiByZWNvcmQucGFyYW1zLnRpdGxlLFxuICAgICAgICBmaXJzdF9uYW1lOiByZWNvcmQucGFyYW1zLmZpcnN0X25hbWUsXG4gICAgICAgIGxhc3RfbmFtZTogcmVjb3JkLnBhcmFtcy5sYXN0X25hbWUsXG4gICAgICAgIGVtYWlsOiByZWNvcmQucGFyYW1zLmVtYWlsLFxuICAgICAgICBwaG9uZTogcmVjb3JkLnBhcmFtcy5waG9uZSxcbiAgICAgICAgY29tcGFueV9uYW1lOiByZWNvcmQucGFyYW1zLmNvbXBhbnlfbmFtZSxcbiAgICAgICAgdmF0X25vOiByZWNvcmQucGFyYW1zLnZhdF9ubyxcbiAgICAgICAgZ3JvdXBfaWRzOiBzZWxlY3RlZEdyb3VwcyxcbiAgICAgICAgbWV0YTogcmVjb3JkLnBhcmFtcy5tZXRhIHx8IHt9LFxuICAgICAgfTtcblxuICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgaWYgKHJlY29yZC5pZCkge1xuICAgICAgICAvLyBVcGRhdGUgZXhpc3RpbmcgY3VzdG9tZXJcbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FkbWluL2FwaS9jdXN0b21lcnMvJHtyZWNvcmQuaWR9YCwge1xuICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZm9ybURhdGEpLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENyZWF0ZSBuZXcgY3VzdG9tZXJcbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FkbWluL2FwaS9jdXN0b21lcnMnLCB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZm9ybURhdGEpLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHNldE1lc3NhZ2UoeyBcbiAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsIFxuICAgICAgICAgIHRleHQ6IHJlY29yZC5pZCBcbiAgICAgICAgICAgID8gJ0N1c3RvbWVyIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JyBcbiAgICAgICAgICAgIDogJ0N1c3RvbWVyIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5JyBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBSZWZyZXNoIHRoZSByZWNvcmRcbiAgICAgICAgaWYgKCFyZWNvcmQuaWQpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvYWRtaW4vcmVzb3VyY2VzL0N1c3RvbWVyL3JlY29yZHMvJHtkYXRhLmlkfS9lZGl0YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJtaXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdGhlIHBhZ2UgdG8gc2hvdyB1cGRhdGVkIGRhdGFcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBzZXRNZXNzYWdlKHsgdHlwZTogJ2RhbmdlcicsIHRleHQ6IGVycm9yRGF0YS5lcnJvciB8fCAnQW4gZXJyb3Igb2NjdXJyZWQnIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgY3VzdG9tZXI6JywgZXJyb3IpO1xuICAgICAgc2V0TWVzc2FnZSh7IHR5cGU6ICdkYW5nZXInLCB0ZXh0OiAnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgc2F2aW5nIGN1c3RvbWVyJyB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFub255bWl6ZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXJlY29yZC5pZCkgcmV0dXJuO1xuXG4gICAgaWYgKCF3aW5kb3cuY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGFub255bWl6ZSB0aGlzIGN1c3RvbWVyPyBUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lLicpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICBzZXRNZXNzYWdlKHsgdHlwZTogJycsIHRleHQ6ICcnIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hZG1pbi9hcGkvY3VzdG9tZXJzLyR7cmVjb3JkLmlkfS9hbm9ueW1pemVgLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgc2V0TWVzc2FnZSh7IHR5cGU6ICdzdWNjZXNzJywgdGV4dDogJ0N1c3RvbWVyIGFub255bWl6ZWQgc3VjY2Vzc2Z1bGx5JyB9KTtcbiAgICAgICAgLy8gUmVmcmVzaCB0aGUgcGFnZSB0byBzaG93IHVwZGF0ZWQgZGF0YVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHNldE1lc3NhZ2UoeyB0eXBlOiAnZGFuZ2VyJywgdGV4dDogZXJyb3JEYXRhLmVycm9yIHx8ICdBbiBlcnJvciBvY2N1cnJlZCcgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFub255bWl6aW5nIGN1c3RvbWVyOicsIGVycm9yKTtcbiAgICAgIHNldE1lc3NhZ2UoeyB0eXBlOiAnZGFuZ2VyJywgdGV4dDogJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGFub255bWl6aW5nIGN1c3RvbWVyJyB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBhcz1cImZvcm1cIiBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgIHttZXNzYWdlLnRleHQgJiYgKFxuICAgICAgICA8TWVzc2FnZUJveFxuICAgICAgICAgIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzFyZW0nIH19XG4gICAgICAgICAgdmFyaWFudD17bWVzc2FnZS50eXBlIGFzIGFueX1cbiAgICAgICAgICBtZXNzYWdlPXttZXNzYWdlLnRleHR9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICA8U2VjdGlvbj5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+VGl0bGU8L0xhYmVsPlxuICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluanMtc2VsZWN0XCJcbiAgICAgICAgICAgIHZhbHVlPXtyZWNvcmQucGFyYW1zLnRpdGxlIHx8ICcnfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MU2VsZWN0RWxlbWVudD4pID0+IGhhbmRsZUNoYW5nZSgndGl0bGUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdC4uLjwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1yXCI+TXI8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNcnNcIj5NcnM8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNc1wiPk1zPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRHJcIj5Ecjwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5GaXJzdCBOYW1lPC9MYWJlbD5cbiAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICB2YWx1ZT17cmVjb3JkLnBhcmFtcy5maXJzdF9uYW1lIHx8ICcnfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4gaGFuZGxlQ2hhbmdlKCdmaXJzdF9uYW1lJywgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPkxhc3QgTmFtZTwvTGFiZWw+XG4gICAgICAgICAgPElucHV0XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgdmFsdWU9e3JlY29yZC5wYXJhbXMubGFzdF9uYW1lIHx8ICcnfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4gaGFuZGxlQ2hhbmdlKCdsYXN0X25hbWUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+RW1haWwgQWRkcmVzczwvTGFiZWw+XG4gICAgICAgICAgPElucHV0XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgIHZhbHVlPXtyZWNvcmQucGFyYW1zLmVtYWlsIHx8ICcnfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4gaGFuZGxlQ2hhbmdlKCdlbWFpbCcsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD5QaG9uZTwvTGFiZWw+XG4gICAgICAgICAgPElucHV0XG4gICAgICAgICAgICB2YWx1ZT17cmVjb3JkLnBhcmFtcy5waG9uZSB8fCAnJ31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IGhhbmRsZUNoYW5nZSgncGhvbmUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICA8L1NlY3Rpb24+XG5cbiAgICAgIDxTZWN0aW9uIHRpdGxlPVwiQ29tcGFueSBJbmZvcm1hdGlvblwiPlxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD5Db21wYW55IE5hbWU8L0xhYmVsPlxuICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgdmFsdWU9e3JlY29yZC5wYXJhbXMuY29tcGFueV9uYW1lIHx8ICcnfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4gaGFuZGxlQ2hhbmdlKCdjb21wYW55X25hbWUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+VkFUIE51bWJlcjwvTGFiZWw+XG4gICAgICAgICAgPElucHV0XG4gICAgICAgICAgICB2YWx1ZT17cmVjb3JkLnBhcmFtcy52YXRfbm8gfHwgJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiBoYW5kbGVDaGFuZ2UoJ3ZhdF9ubycsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgPFNlY3Rpb24gdGl0bGU9XCJDdXN0b21lciBHcm91cHNcIj5cbiAgICAgICAge2N1c3RvbWVyR3JvdXBzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgIHtjdXN0b21lckdyb3Vwcy5tYXAoZ3JvdXAgPT4gKFxuICAgICAgICAgICAgICA8Qm94IG1iPVwiZGVmYXVsdFwiIGtleT17Z3JvdXAuaWR9PlxuICAgICAgICAgICAgICAgIDxDaGVja0JveFxuICAgICAgICAgICAgICAgICAgaWQ9e2Bncm91cC0ke2dyb3VwLmlkfWB9XG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZEdyb3Vwcy5pbmNsdWRlcyhncm91cC5pZCl9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlR3JvdXBzQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2dyb3VwLmlkLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgaW5saW5lIGh0bWxGb3I9e2Bncm91cC0ke2dyb3VwLmlkfWB9PlxuICAgICAgICAgICAgICAgICAge2dyb3VwLm5hbWV9XG4gICAgICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8VGV4dD5ObyBjdXN0b21lciBncm91cHMgYXZhaWxhYmxlPC9UZXh0PlxuICAgICAgICApfVxuICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICA8Qm94IG10PVwieGxcIj5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD17bG9hZGluZ30+XG4gICAgICAgICAge2xvYWRpbmcgPyA8TG9hZGVyIC8+IDogKHJlY29yZC5pZCA/ICdVcGRhdGUgQ3VzdG9tZXInIDogJ0NyZWF0ZSBDdXN0b21lcicpfVxuICAgICAgICA8L0J1dHRvbj5cblxuICAgICAgICB7cmVjb3JkLmlkICYmIChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBtbD1cImRlZmF1bHRcIlxuICAgICAgICAgICAgdmFyaWFudD1cImRhbmdlclwiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUFub255bWl6ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIEFub255bWl6ZSBDdXN0b21lclxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21lckZvcm07ICIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIEZvcm1Hcm91cCxcbiAgTGFiZWwsXG4gIElucHV0LFxuICBDaGVja0JveCxcbiAgU2VjdGlvbixcbiAgVGV4dCxcbiAgTG9hZGVyLFxuICBNZXNzYWdlQm94LFxuICBEYXRlUGlja2VyLFxuICBEcm9wRG93bixcbiAgRHJvcERvd25JdGVtLFxufSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZVJlY29yZCwgdXNlVHJhbnNsYXRpb24gfSBmcm9tICdhZG1pbmpzJztcblxuLy8gRGVmaW5lIGludGVyZmFjZXMgZm9yIHN0cm9uZ2x5IHR5cGVkIGNvbXBvbmVudHNcbmludGVyZmFjZSBQcm9kdWN0IHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgQ29sbGVjdGlvbiB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEN1c3RvbWVyR3JvdXAge1xuICBpZDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBNZXNzYWdlU3RhdGUge1xuICB0eXBlOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbn1cblxuY29uc3QgRGlzY291bnRGb3JtOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgLy8gQHRzLWlnbm9yZSAtIElnbm9yZSB0aGUgdHlwZSBlcnJvciBmb3IgdXNlUmVjb3JkXG4gIGNvbnN0IHsgcmVjb3JkLCBoYW5kbGVDaGFuZ2UsIHN1Ym1pdCB9ID0gdXNlUmVjb3JkKCk7XG4gIGNvbnN0IHsgdHJhbnNsYXRlQnV0dG9uIH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuICBcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWVzc2FnZSwgc2V0TWVzc2FnZV0gPSB1c2VTdGF0ZTxNZXNzYWdlU3RhdGU+KHsgdHlwZTogJycsIHRleHQ6ICcnIH0pO1xuICBcbiAgY29uc3QgW3Byb2R1Y3RzLCBzZXRQcm9kdWN0c10gPSB1c2VTdGF0ZTxQcm9kdWN0W10+KFtdKTtcbiAgY29uc3QgW2NvbGxlY3Rpb25zLCBzZXRDb2xsZWN0aW9uc10gPSB1c2VTdGF0ZTxDb2xsZWN0aW9uW10+KFtdKTtcbiAgY29uc3QgW2N1c3RvbWVyR3JvdXBzLCBzZXRDdXN0b21lckdyb3Vwc10gPSB1c2VTdGF0ZTxDdXN0b21lckdyb3VwW10+KFtdKTtcbiAgXG4gIGNvbnN0IFtzZWxlY3RlZFByb2R1Y3RzLCBzZXRTZWxlY3RlZFByb2R1Y3RzXSA9IHVzZVN0YXRlPG51bWJlcltdPihbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZENvbGxlY3Rpb25zLCBzZXRTZWxlY3RlZENvbGxlY3Rpb25zXSA9IHVzZVN0YXRlPG51bWJlcltdPihbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZEN1c3RvbWVyR3JvdXBzLCBzZXRTZWxlY3RlZEN1c3RvbWVyR3JvdXBzXSA9IHVzZVN0YXRlPG51bWJlcltdPihbXSk7XG4gIFxuICBjb25zdCBbZGlzY291bnRUeXBlLCBzZXREaXNjb3VudFR5cGVdID0gdXNlU3RhdGUoJ3BlcmNlbnRhZ2UnKTtcbiAgY29uc3QgW3N0YXJ0RGF0ZSwgc2V0U3RhcnREYXRlXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkpO1xuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0FjdGl2ZSwgc2V0SXNBY3RpdmVdID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBMb2FkIHByb2R1Y3RzLCBjb2xsZWN0aW9ucyBhbmQgY3VzdG9tZXIgZ3JvdXBzXG4gICAgY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gRmV0Y2ggcHJvZHVjdHNcbiAgICAgICAgY29uc3QgcHJvZHVjdHNSZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL3Byb2R1Y3RzP2xpbWl0PTEwMCcpO1xuICAgICAgICBpZiAocHJvZHVjdHNSZXNwb25zZS5vaykge1xuICAgICAgICAgIGNvbnN0IHByb2R1Y3RzRGF0YSA9IGF3YWl0IHByb2R1Y3RzUmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgIHNldFByb2R1Y3RzKHByb2R1Y3RzRGF0YS5wcm9kdWN0cyB8fCBbXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGZXRjaCBjb2xsZWN0aW9uc1xuICAgICAgICBjb25zdCBjb2xsZWN0aW9uc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvY29sbGVjdGlvbnM/bGltaXQ9MTAwJyk7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uc1Jlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgY29uc3QgY29sbGVjdGlvbnNEYXRhID0gYXdhaXQgY29sbGVjdGlvbnNSZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgc2V0Q29sbGVjdGlvbnMoY29sbGVjdGlvbnNEYXRhLmNvbGxlY3Rpb25zIHx8IFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZldGNoIGN1c3RvbWVyIGdyb3Vwc1xuICAgICAgICBjb25zdCBncm91cHNSZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL2N1c3RvbWVyLWdyb3VwcycpO1xuICAgICAgICBpZiAoZ3JvdXBzUmVzcG9uc2Uub2spIHtcbiAgICAgICAgICBjb25zdCBncm91cHNEYXRhID0gYXdhaXQgZ3JvdXBzUmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgIHNldEN1c3RvbWVyR3JvdXBzKGdyb3Vwc0RhdGEuZ3JvdXBzIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZGF0YTonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIExvYWQgZGlzY291bnQgZGF0YSBpZiBlZGl0aW5nIGFuIGV4aXN0aW5nIGRpc2NvdW50XG4gICAgY29uc3QgZmV0Y2hEaXNjb3VudERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAocmVjb3JkLmlkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc2V0RGlzY291bnRUeXBlKHJlY29yZC5wYXJhbXMudHlwZSB8fCAncGVyY2VudGFnZScpO1xuICAgICAgICAgIHNldElzQWN0aXZlKHJlY29yZC5wYXJhbXMuaXNfYWN0aXZlICE9PSAnZmFsc2UnKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAocmVjb3JkLnBhcmFtcy5zdGFydHNfYXQpIHtcbiAgICAgICAgICAgIHNldFN0YXJ0RGF0ZShuZXcgRGF0ZShyZWNvcmQucGFyYW1zLnN0YXJ0c19hdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBpZiAocmVjb3JkLnBhcmFtcy5lbmRzX2F0KSB7XG4gICAgICAgICAgICBzZXRFbmREYXRlKG5ldyBEYXRlKHJlY29yZC5wYXJhbXMuZW5kc19hdCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hZG1pbi9hcGkvZGlzY291bnRzLyR7cmVjb3JkLmlkfWApO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU2V0IHNlbGVjdGVkIHByb2R1Y3RzXG4gICAgICAgICAgICBpZiAoZGF0YS5wcm9kdWN0cyAmJiBBcnJheS5pc0FycmF5KGRhdGEucHJvZHVjdHMpKSB7XG4gICAgICAgICAgICAgIHNldFNlbGVjdGVkUHJvZHVjdHMoZGF0YS5wcm9kdWN0cy5tYXAoKHByb2R1Y3Q6IGFueSkgPT4gcHJvZHVjdC5pZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTZXQgc2VsZWN0ZWQgY29sbGVjdGlvbnNcbiAgICAgICAgICAgIGlmIChkYXRhLmNvbGxlY3Rpb25zICYmIEFycmF5LmlzQXJyYXkoZGF0YS5jb2xsZWN0aW9ucykpIHtcbiAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRDb2xsZWN0aW9ucyhkYXRhLmNvbGxlY3Rpb25zLm1hcCgoY29sbGVjdGlvbjogYW55KSA9PiBjb2xsZWN0aW9uLmlkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFNldCBzZWxlY3RlZCBjdXN0b21lciBncm91cHNcbiAgICAgICAgICAgIGlmIChkYXRhLmN1c3RvbWVyR3JvdXBzICYmIEFycmF5LmlzQXJyYXkoZGF0YS5jdXN0b21lckdyb3VwcykpIHtcbiAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRDdXN0b21lckdyb3VwcyhkYXRhLmN1c3RvbWVyR3JvdXBzLm1hcCgoZ3JvdXA6IGFueSkgPT4gZ3JvdXAuaWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZGlzY291bnQgZGF0YTonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZmV0Y2hEYXRhKCk7XG4gICAgZmV0Y2hEaXNjb3VudERhdGEoKTtcbiAgfSwgW3JlY29yZC5pZF0pO1xuXG4gIGNvbnN0IGhhbmRsZVByb2R1Y3RDaGFuZ2UgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IG51bVZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICBpZiAoc2VsZWN0ZWRQcm9kdWN0cy5pbmNsdWRlcyhudW1WYWx1ZSkpIHtcbiAgICAgIHNldFNlbGVjdGVkUHJvZHVjdHMoc2VsZWN0ZWRQcm9kdWN0cy5maWx0ZXIoaWQgPT4gaWQgIT09IG51bVZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFNlbGVjdGVkUHJvZHVjdHMoWy4uLnNlbGVjdGVkUHJvZHVjdHMsIG51bVZhbHVlXSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvbGxlY3Rpb25DaGFuZ2UgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IG51bVZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICBpZiAoc2VsZWN0ZWRDb2xsZWN0aW9ucy5pbmNsdWRlcyhudW1WYWx1ZSkpIHtcbiAgICAgIHNldFNlbGVjdGVkQ29sbGVjdGlvbnMoc2VsZWN0ZWRDb2xsZWN0aW9ucy5maWx0ZXIoaWQgPT4gaWQgIT09IG51bVZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFNlbGVjdGVkQ29sbGVjdGlvbnMoWy4uLnNlbGVjdGVkQ29sbGVjdGlvbnMsIG51bVZhbHVlXSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUN1c3RvbWVyR3JvdXBDaGFuZ2UgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IG51bVZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICBpZiAoc2VsZWN0ZWRDdXN0b21lckdyb3Vwcy5pbmNsdWRlcyhudW1WYWx1ZSkpIHtcbiAgICAgIHNldFNlbGVjdGVkQ3VzdG9tZXJHcm91cHMoc2VsZWN0ZWRDdXN0b21lckdyb3Vwcy5maWx0ZXIoaWQgPT4gaWQgIT09IG51bVZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFNlbGVjdGVkQ3VzdG9tZXJHcm91cHMoWy4uLnNlbGVjdGVkQ3VzdG9tZXJHcm91cHMsIG51bVZhbHVlXSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChldmVudDogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgIHNldE1lc3NhZ2UoeyB0eXBlOiAnJywgdGV4dDogJycgfSk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gRm9ybWF0IGRhdGVzXG4gICAgICBjb25zdCBmb3JtYXR0ZWRTdGFydERhdGUgPSBzdGFydERhdGUgPyBzdGFydERhdGUudG9JU09TdHJpbmcoKSA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZEVuZERhdGUgPSBlbmREYXRlID8gZW5kRGF0ZS50b0lTT1N0cmluZygpIDogbnVsbDtcblxuICAgICAgLy8gUHJlcGFyZSBmb3JtIGRhdGFcbiAgICAgIGNvbnN0IGZvcm1EYXRhID0ge1xuICAgICAgICBuYW1lOiByZWNvcmQucGFyYW1zLm5hbWUsXG4gICAgICAgIGNvZGU6IHJlY29yZC5wYXJhbXMuY29kZSxcbiAgICAgICAgdHlwZTogZGlzY291bnRUeXBlLFxuICAgICAgICB2YWx1ZTogcGFyc2VGbG9hdChyZWNvcmQucGFyYW1zLnZhbHVlIHx8ICcwJyksXG4gICAgICAgIG1pbl9vcmRlcl92YWx1ZTogcGFyc2VGbG9hdChyZWNvcmQucGFyYW1zLm1pbl9vcmRlcl92YWx1ZSB8fCAnMCcpLFxuICAgICAgICBtYXhfdXNlczogcmVjb3JkLnBhcmFtcy5tYXhfdXNlcyA/IHBhcnNlSW50KHJlY29yZC5wYXJhbXMubWF4X3VzZXMsIDEwKSA6IG51bGwsXG4gICAgICAgIHN0YXJ0c19hdDogZm9ybWF0dGVkU3RhcnREYXRlLFxuICAgICAgICBlbmRzX2F0OiBmb3JtYXR0ZWRFbmREYXRlLFxuICAgICAgICBpc19hY3RpdmU6IGlzQWN0aXZlLFxuICAgICAgICBwcm9kdWN0X2lkczogc2VsZWN0ZWRQcm9kdWN0cyxcbiAgICAgICAgY29sbGVjdGlvbl9pZHM6IHNlbGVjdGVkQ29sbGVjdGlvbnMsXG4gICAgICAgIGN1c3RvbWVyX2dyb3VwX2lkczogc2VsZWN0ZWRDdXN0b21lckdyb3VwcyxcbiAgICAgIH07XG5cbiAgICAgIGxldCByZXNwb25zZTtcbiAgICAgIGlmIChyZWNvcmQuaWQpIHtcbiAgICAgICAgLy8gVXBkYXRlIGV4aXN0aW5nIGRpc2NvdW50XG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hZG1pbi9hcGkvZGlzY291bnRzLyR7cmVjb3JkLmlkfWAsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhKSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDcmVhdGUgbmV3IGRpc2NvdW50XG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvZGlzY291bnRzJywge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBzZXRNZXNzYWdlKHsgXG4gICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLCBcbiAgICAgICAgICB0ZXh0OiByZWNvcmQuaWQgXG4gICAgICAgICAgICA/ICdEaXNjb3VudCB1cGRhdGVkIHN1Y2Nlc3NmdWxseScgXG4gICAgICAgICAgICA6ICdEaXNjb3VudCBjcmVhdGVkIHN1Y2Nlc3NmdWxseScgXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gUmVmcmVzaCB0aGUgcmVjb3JkXG4gICAgICAgIGlmICghcmVjb3JkLmlkKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL2FkbWluL3Jlc291cmNlcy9EaXNjb3VudC9yZWNvcmRzLyR7ZGF0YS5pZH0vZWRpdGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VibWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBSZWZyZXNoIHRoZSBwYWdlIHRvIHNob3cgdXBkYXRlZCBkYXRhXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgc2V0TWVzc2FnZSh7IHR5cGU6ICdkYW5nZXInLCB0ZXh0OiBlcnJvckRhdGEuZXJyb3IgfHwgJ0FuIGVycm9yIG9jY3VycmVkJyB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIGRpc2NvdW50OicsIGVycm9yKTtcbiAgICAgIHNldE1lc3NhZ2UoeyB0eXBlOiAnZGFuZ2VyJywgdGV4dDogJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNhdmluZyBkaXNjb3VudCcgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICAvLyBGdW5jdGlvbiB0byBoYW5kbGUgZGF0ZSBjaGFuZ2VzIGZyb20gRGF0ZVBpY2tlclxuICBjb25zdCBoYW5kbGVTdGFydERhdGVDaGFuZ2UgPSAodmFsdWU6IHN0cmluZyB8IERhdGUpID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgc2V0U3RhcnREYXRlKG5ldyBEYXRlKHZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFN0YXJ0RGF0ZSh2YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUVuZERhdGVDaGFuZ2UgPSAodmFsdWU6IHN0cmluZyB8IERhdGUpID0+IHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzZXRFbmREYXRlKG5ldyBEYXRlKHZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEVuZERhdGUodmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggYXM9XCJmb3JtXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XG4gICAgICB7bWVzc2FnZS50ZXh0ICYmIChcbiAgICAgICAgPE1lc3NhZ2VCb3hcbiAgICAgICAgICBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxcmVtJyB9fVxuICAgICAgICAgIHZhcmlhbnQ9e21lc3NhZ2UudHlwZSBhcyBhbnl9XG4gICAgICAgICAgbWVzc2FnZT17bWVzc2FnZS50ZXh0fVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgPFNlY3Rpb24+XG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPkRpc2NvdW50IE5hbWU8L0xhYmVsPlxuICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgIHZhbHVlPXtyZWNvcmQucGFyYW1zLm5hbWUgfHwgJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiBoYW5kbGVDaGFuZ2UoJ25hbWUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+RGlzY291bnQgQ29kZTwvTGFiZWw+XG4gICAgICAgICAgPElucHV0XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgdmFsdWU9e3JlY29yZC5wYXJhbXMuY29kZSB8fCAnJ31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IGhhbmRsZUNoYW5nZSgnY29kZScsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxUZXh0IG10PVwic21cIiB2YXJpYW50PVwic21cIj5UaGlzIGlzIHRoZSBjb2RlIGN1c3RvbWVycyB3aWxsIGVudGVyIGF0IGNoZWNrb3V0PC9UZXh0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5EaXNjb3VudCBUeXBlPC9MYWJlbD5cbiAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAgPENoZWNrQm94XG4gICAgICAgICAgICAgIGlkPVwiZGlzY291bnQtdHlwZS1wZXJjZW50YWdlXCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17ZGlzY291bnRUeXBlID09PSAncGVyY2VudGFnZSd9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBzZXREaXNjb3VudFR5cGUoJ3BlcmNlbnRhZ2UnKX1cbiAgICAgICAgICAgICAgdmFsdWU9XCJwZXJjZW50YWdlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8TGFiZWwgaW5saW5lIGh0bWxGb3I9XCJkaXNjb3VudC10eXBlLXBlcmNlbnRhZ2VcIj5cbiAgICAgICAgICAgICAgUGVyY2VudGFnZSAoJSlcbiAgICAgICAgICAgIDwvTGFiZWw+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPEJveCBtdD1cInNtXCI+XG4gICAgICAgICAgICA8Q2hlY2tCb3hcbiAgICAgICAgICAgICAgaWQ9XCJkaXNjb3VudC10eXBlLWZpeGVkXCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17ZGlzY291bnRUeXBlID09PSAnZml4ZWQnfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gc2V0RGlzY291bnRUeXBlKCdmaXhlZCcpfVxuICAgICAgICAgICAgICB2YWx1ZT1cImZpeGVkXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8TGFiZWwgaW5saW5lIGh0bWxGb3I9XCJkaXNjb3VudC10eXBlLWZpeGVkXCI+XG4gICAgICAgICAgICAgIEZpeGVkIEFtb3VudFxuICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+VmFsdWU8L0xhYmVsPlxuICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICBzdGVwPXtkaXNjb3VudFR5cGUgPT09ICdwZXJjZW50YWdlJyA/ICcxJyA6ICcwLjAxJ31cbiAgICAgICAgICAgIHZhbHVlPXtyZWNvcmQucGFyYW1zLnZhbHVlIHx8ICcnfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4gaGFuZGxlQ2hhbmdlKCd2YWx1ZScsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxUZXh0IG10PVwic21cIiB2YXJpYW50PVwic21cIj5cbiAgICAgICAgICAgIHtkaXNjb3VudFR5cGUgPT09ICdwZXJjZW50YWdlJyBcbiAgICAgICAgICAgICAgPyAnUGVyY2VudGFnZSBkaXNjb3VudCAoZS5nLiAxMCBmb3IgMTAlKScgXG4gICAgICAgICAgICAgIDogJ0ZpeGVkIGFtb3VudCBkaXNjb3VudCd9XG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD5NaW5pbXVtIE9yZGVyIFZhbHVlPC9MYWJlbD5cbiAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICBzdGVwPVwiMC4wMVwiXG4gICAgICAgICAgICB2YWx1ZT17cmVjb3JkLnBhcmFtcy5taW5fb3JkZXJfdmFsdWUgfHwgJzAnfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4gaGFuZGxlQ2hhbmdlKCdtaW5fb3JkZXJfdmFsdWUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgdmFyaWFudD1cInNtXCI+TWluaW11bSBjYXJ0IHZhbHVlIHJlcXVpcmVkIHRvIHVzZSB0aGlzIGRpc2NvdW50ICgwID0gbm8gbWluaW11bSk8L1RleHQ+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsPk1heGltdW0gVXNlczwvTGFiZWw+XG4gICAgICAgICAgPElucHV0XG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgICAgdmFsdWU9e3JlY29yZC5wYXJhbXMubWF4X3VzZXMgfHwgJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiBoYW5kbGVDaGFuZ2UoJ21heF91c2VzJywgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIHZhcmlhbnQ9XCJzbVwiPk1heGltdW0gbnVtYmVyIG9mIHRpbWVzIHRoaXMgZGlzY291bnQgY2FuIGJlIHVzZWQgKGxlYXZlIGVtcHR5IGZvciB1bmxpbWl0ZWQpPC9UZXh0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgPFNlY3Rpb24gdGl0bGU9XCJWYWxpZGl0eSBQZXJpb2RcIj5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+U3RhcnQgRGF0ZTwvTGFiZWw+XG4gICAgICAgICAgPERhdGVQaWNrZXJcbiAgICAgICAgICAgIHZhbHVlPXtzdGFydERhdGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlU3RhcnREYXRlQ2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsPkVuZCBEYXRlIChPcHRpb25hbCk8L0xhYmVsPlxuICAgICAgICAgIDxEYXRlUGlja2VyXG4gICAgICAgICAgICB2YWx1ZT17ZW5kRGF0ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVFbmREYXRlQ2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIHZhcmlhbnQ9XCJzbVwiPkxlYXZlIGVtcHR5IGZvciBhIGRpc2NvdW50IHdpdGggbm8gZXhwaXJhdGlvbiBkYXRlPC9UZXh0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxCb3ggbXQ9XCJsZ1wiPlxuICAgICAgICAgICAgPENoZWNrQm94XG4gICAgICAgICAgICAgIGlkPVwiaXMtYWN0aXZlXCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17aXNBY3RpdmV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBzZXRJc0FjdGl2ZSghaXNBY3RpdmUpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxMYWJlbCBpbmxpbmUgaHRtbEZvcj1cImlzLWFjdGl2ZVwiPlxuICAgICAgICAgICAgICBBY3RpdmVcbiAgICAgICAgICAgIDwvTGFiZWw+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICA8U2VjdGlvbiB0aXRsZT1cIkRpc2NvdW50IFJlc3RyaWN0aW9uc1wiPlxuICAgICAgICA8VGV4dCBtYj1cImxnXCI+XG4gICAgICAgICAgWW91IGNhbiByZXN0cmljdCB0aGlzIGRpc2NvdW50IHRvIHNwZWNpZmljIHByb2R1Y3RzLCBjb2xsZWN0aW9ucywgb3IgY3VzdG9tZXIgZ3JvdXBzLlxuICAgICAgICAgIElmIG5vbmUgYXJlIHNlbGVjdGVkLCB0aGUgZGlzY291bnQgd2lsbCBhcHBseSB0byBhbGwgZWxpZ2libGUgb3JkZXJzLlxuICAgICAgICA8L1RleHQ+XG5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+UHJvZHVjdHM8L0xhYmVsPlxuICAgICAgICAgIDxCb3ggbWF4SGVpZ2h0PVwiMjAwcHhcIiBvdmVyZmxvdz1cImF1dG9cIiBib3JkZXI9XCIxcHggc29saWRcIiBib3JkZXJDb2xvcj1cImdyZXkyMFwiIHA9XCJtZFwiPlxuICAgICAgICAgICAge3Byb2R1Y3RzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgIHByb2R1Y3RzLm1hcChwcm9kdWN0ID0+IChcbiAgICAgICAgICAgICAgICA8Qm94IG1iPVwic21cIiBrZXk9e3Byb2R1Y3QuaWR9PlxuICAgICAgICAgICAgICAgICAgPENoZWNrQm94XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgcHJvZHVjdC0ke3Byb2R1Y3QuaWR9YH1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWRQcm9kdWN0cy5pbmNsdWRlcyhwcm9kdWN0LmlkKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVByb2R1Y3RDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9kdWN0LmlkLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPExhYmVsIGlubGluZSBodG1sRm9yPXtgcHJvZHVjdC0ke3Byb2R1Y3QuaWR9YH0+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0Lm5hbWV9XG4gICAgICAgICAgICAgICAgICA8L0xhYmVsPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPFRleHQ+Tm8gcHJvZHVjdHMgYXZhaWxhYmxlPC9UZXh0PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+Q29sbGVjdGlvbnM8L0xhYmVsPlxuICAgICAgICAgIDxCb3ggbWF4SGVpZ2h0PVwiMjAwcHhcIiBvdmVyZmxvdz1cImF1dG9cIiBib3JkZXI9XCIxcHggc29saWRcIiBib3JkZXJDb2xvcj1cImdyZXkyMFwiIHA9XCJtZFwiPlxuICAgICAgICAgICAge2NvbGxlY3Rpb25zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgIGNvbGxlY3Rpb25zLm1hcChjb2xsZWN0aW9uID0+IChcbiAgICAgICAgICAgICAgICA8Qm94IG1iPVwic21cIiBrZXk9e2NvbGxlY3Rpb24uaWR9PlxuICAgICAgICAgICAgICAgICAgPENoZWNrQm94XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgY29sbGVjdGlvbi0ke2NvbGxlY3Rpb24uaWR9YH1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWRDb2xsZWN0aW9ucy5pbmNsdWRlcyhjb2xsZWN0aW9uLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNvbGxlY3Rpb25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb2xsZWN0aW9uLmlkLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPExhYmVsIGlubGluZSBodG1sRm9yPXtgY29sbGVjdGlvbi0ke2NvbGxlY3Rpb24uaWR9YH0+XG4gICAgICAgICAgICAgICAgICAgIHtjb2xsZWN0aW9uLm5hbWV9XG4gICAgICAgICAgICAgICAgICA8L0xhYmVsPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPFRleHQ+Tm8gY29sbGVjdGlvbnMgYXZhaWxhYmxlPC9UZXh0PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+Q3VzdG9tZXIgR3JvdXBzPC9MYWJlbD5cbiAgICAgICAgICA8Qm94IG1heEhlaWdodD1cIjIwMHB4XCIgb3ZlcmZsb3c9XCJhdXRvXCIgYm9yZGVyPVwiMXB4IHNvbGlkXCIgYm9yZGVyQ29sb3I9XCJncmV5MjBcIiBwPVwibWRcIj5cbiAgICAgICAgICAgIHtjdXN0b21lckdyb3Vwcy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICBjdXN0b21lckdyb3Vwcy5tYXAoZ3JvdXAgPT4gKFxuICAgICAgICAgICAgICAgIDxCb3ggbWI9XCJzbVwiIGtleT17Z3JvdXAuaWR9PlxuICAgICAgICAgICAgICAgICAgPENoZWNrQm94XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgZ3JvdXAtJHtncm91cC5pZH1gfVxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZEN1c3RvbWVyR3JvdXBzLmluY2x1ZGVzKGdyb3VwLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUN1c3RvbWVyR3JvdXBDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtncm91cC5pZC50b1N0cmluZygpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxMYWJlbCBpbmxpbmUgaHRtbEZvcj17YGdyb3VwLSR7Z3JvdXAuaWR9YH0+XG4gICAgICAgICAgICAgICAgICAgIHtncm91cC5uYW1lfVxuICAgICAgICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxUZXh0Pk5vIGN1c3RvbWVyIGdyb3VwcyBhdmFpbGFibGU8L1RleHQ+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgPEJveCBtdD1cInhsXCI+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e2xvYWRpbmd9PlxuICAgICAgICAgIHtsb2FkaW5nID8gPExvYWRlciAvPiA6IChyZWNvcmQuaWQgPyAnVXBkYXRlIERpc2NvdW50JyA6ICdDcmVhdGUgRGlzY291bnQnKX1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc2NvdW50Rm9ybTsgIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEg0LCBINSwgVGV4dCwgTG9hZGVyLCBJbGx1c3RyYXRpb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuaW50ZXJmYWNlIERpc2NvdW50U3RhdGlzdGljcyB7XG4gIHRvdGFsRGlzY291bnRzOiBudW1iZXI7XG4gIGFjdGl2ZURpc2NvdW50czogbnVtYmVyO1xuICBtb3N0VXNlZERpc2NvdW50OiB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBjb2RlOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHVzZWRDb3VudDogbnVtYmVyO1xuICB9IHwgbnVsbDtcbiAgdG90YWxEaXNjb3VudEFtb3VudDogbnVtYmVyO1xufVxuXG5jb25zdCBEaXNjb3VudFN0YXRpc3RpY3M6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbc3RhdGlzdGljcywgc2V0U3RhdGlzdGljc10gPSB1c2VTdGF0ZTxEaXNjb3VudFN0YXRpc3RpY3MgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaFN0YXRpc3RpY3MgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL2Rpc2NvdW50LXN0YXRpc3RpY3MnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgc2V0U3RhdGlzdGljcyhkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgc2V0RXJyb3IoZXJyb3JEYXRhLmVycm9yIHx8ICdGYWlsZWQgdG8gbG9hZCBkaXNjb3VudCBzdGF0aXN0aWNzJyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGRpc2NvdW50IHN0YXRpc3RpY3M6JywgZXJyb3IpO1xuICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIGxvYWQgZGlzY291bnQgc3RhdGlzdGljcycpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoU3RhdGlzdGljcygpO1xuICB9LCBbXSk7XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveCBwPVwieGxcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgICA8VGV4dCBtdD1cImRlZmF1bHRcIj5Mb2FkaW5nIGRpc2NvdW50IHN0YXRpc3RpY3MuLi48L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggcD1cInhsXCIgdGV4dEFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxJbGx1c3RyYXRpb24gdmFyaWFudD1cIlJvY2tldFwiIHdpZHRoPXsxMDB9IGhlaWdodD17MTAwfSAvPlxuICAgICAgICA8VGV4dCBtdD1cImRlZmF1bHRcIj57ZXJyb3J9PC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuXG4gIGlmICghc3RhdGlzdGljcykge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94IHA9XCJ4bFwiIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICA8VGV4dD5ObyBzdGF0aXN0aWNzIGF2YWlsYWJsZTwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cblxuICAvLyBGb3JtYXQgY3VycmVuY3kgYW1vdW50XG4gIGNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKGFtb3VudDogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIGFtb3VudC50b0ZpeGVkKDIpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEJveD5cbiAgICAgIDxINCBtYj1cImxnXCI+RGlzY291bnQgU3RhdGlzdGljczwvSDQ+XG4gICAgICBcbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBmbGV4RGlyZWN0aW9uPXtbJ2NvbHVtbicsICdyb3cnXX0gZmxleFdyYXA9XCJ3cmFwXCI+XG4gICAgICAgIDxCb3ggZmxleD17MX0gcD1cImxnXCIgYmc9XCJ3aGl0ZVwiIG1yPVwibGdcIiBtYj1cImxnXCIgYm94U2hhZG93PVwiY2FyZFwiIHdpZHRoPXtbMSwgMS8zXX0+XG4gICAgICAgICAgPEg1IG1iPVwibWRcIj5Ub3RhbCBEaXNjb3VudHM8L0g1PlxuICAgICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCIgZm9udFNpemU9XCJ4bFwiPntzdGF0aXN0aWNzLnRvdGFsRGlzY291bnRzfTwvVGV4dD5cbiAgICAgICAgICAgIDxJbGx1c3RyYXRpb24gdmFyaWFudD1cIkRvY3VtZW50U2VhcmNoXCIgd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfSAvPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgICAgXG4gICAgICAgIDxCb3ggZmxleD17MX0gcD1cImxnXCIgYmc9XCJ3aGl0ZVwiIG1yPVwibGdcIiBtYj1cImxnXCIgYm94U2hhZG93PVwiY2FyZFwiIHdpZHRoPXtbMSwgMS8zXX0+XG4gICAgICAgICAgPEg1IG1iPVwibWRcIj5BY3RpdmUgRGlzY291bnRzPC9INT5cbiAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiIGZvbnRTaXplPVwieGxcIj57c3RhdGlzdGljcy5hY3RpdmVEaXNjb3VudHN9PC9UZXh0PlxuICAgICAgICAgICAgPElsbHVzdHJhdGlvbiB2YXJpYW50PVwiRG9jdW1lbnRDaGVja1wiIHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0gLz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIFxuICAgICAgICA8Qm94IGZsZXg9ezF9IHA9XCJsZ1wiIGJnPVwid2hpdGVcIiBtYj1cImxnXCIgYm94U2hhZG93PVwiY2FyZFwiIHdpZHRoPXtbMSwgMS8zXX0+XG4gICAgICAgICAgPEg1IG1iPVwibWRcIj5Ub3RhbCBEaXNjb3VudCBBbW91bnQ8L0g1PlxuICAgICAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCIgZm9udFNpemU9XCJ4bFwiPiR7Zm9ybWF0Q3VycmVuY3koc3RhdGlzdGljcy50b3RhbERpc2NvdW50QW1vdW50KX08L1RleHQ+XG4gICAgICAgICAgICA8SWxsdXN0cmF0aW9uIHZhcmlhbnQ9XCJQbGFuZXRcIiB3aWR0aD17NDB9IGhlaWdodD17NDB9IC8+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG4gICAgICBcbiAgICAgIHtzdGF0aXN0aWNzLm1vc3RVc2VkRGlzY291bnQgJiYgKFxuICAgICAgICA8Qm94IHA9XCJsZ1wiIGJnPVwid2hpdGVcIiBib3hTaGFkb3c9XCJjYXJkXCIgbXQ9XCJsZ1wiPlxuICAgICAgICAgIDxINSBtYj1cIm1kXCI+TW9zdCBVc2VkIERpc2NvdW50PC9INT5cbiAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCIgYWxpZ25JdGVtcz1cImNlbnRlclwiPlxuICAgICAgICAgICAgPEJveD5cbiAgICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIj5cbiAgICAgICAgICAgICAgICB7c3RhdGlzdGljcy5tb3N0VXNlZERpc2NvdW50Lm5hbWV9ICh7c3RhdGlzdGljcy5tb3N0VXNlZERpc2NvdW50LmNvZGV9KVxuICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IG10PVwic21cIj5cbiAgICAgICAgICAgICAgICBVc2VkIHtzdGF0aXN0aWNzLm1vc3RVc2VkRGlzY291bnQudXNlZENvdW50fSB0aW1lc1xuICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDxCb3ggXG4gICAgICAgICAgICAgIGFzPVwiYVwiIFxuICAgICAgICAgICAgICBocmVmPXtgL2FkbWluL3Jlc291cmNlcy9EaXNjb3VudC9yZWNvcmRzLyR7c3RhdGlzdGljcy5tb3N0VXNlZERpc2NvdW50LmlkfS9zaG93YH1cbiAgICAgICAgICAgICAgcHk9XCJzbVwiIFxuICAgICAgICAgICAgICBweD1cImxnXCIgXG4gICAgICAgICAgICAgIGJnPVwicHJpbWFyeTEwMFwiIFxuICAgICAgICAgICAgICBjb2xvcj1cIndoaXRlXCIgXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxuICAgICAgICAgICAgICBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFZpZXcgRGV0YWlsc1xuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc2NvdW50U3RhdGlzdGljczsgIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEgzLCBMYWJlbCwgVGV4dCwgQnV0dG9uLCBNZXNzYWdlQm94LCBMb2FkZXIsIEZvcm1Hcm91cCwgVGV4dEFyZWEgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbi8vIENyZWF0ZSBzdHlsZWQgY29tcG9uZW50cyBmb3IgaW5wdXRzXG5jb25zdCBUZXh0SW5wdXQgPSBzdHlsZWQuaW5wdXRgXG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI0MwQzlENDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICBvdXRsaW5lOiBub25lO1xuICBcbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjMzc5NUJFO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKDU1LCAxNDksIDE5MCwgMC4yKTtcbiAgfVxuYDtcblxuY29uc3QgU3RhdHVzU2VsZWN0ID0gc3R5bGVkLnNlbGVjdGBcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjQzBDOUQ0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBcbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjMzc5NUJFO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKDU1LCAxNDksIDE5MCwgMC4yKTtcbiAgfVxuYDtcblxuY29uc3QgT3JkZXJGb3JtID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcmVjb3JkLCByZXNvdXJjZSwgYWN0aW9uIH0gPSBwcm9wcztcbiAgY29uc3QgaXNFZGl0aW5nID0gcmVjb3JkICYmIHJlY29yZC5pZDtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtmb3JtRGF0YSwgc2V0Rm9ybURhdGFdID0gdXNlU3RhdGUoe1xuICAgIGN1c3RvbWVyX2lkOiAnJyxcbiAgICBjaGFubmVsX2lkOiAnJyxcbiAgICBzdGF0dXM6ICdwZW5kaW5nJyxcbiAgICByZWZlcmVuY2U6ICcnLFxuICAgIGN1c3RvbWVyX3JlZmVyZW5jZTogJycsXG4gICAgc3ViX3RvdGFsOiAwLFxuICAgIGRpc2NvdW50X3RvdGFsOiAwLFxuICAgIHNoaXBwaW5nX3RvdGFsOiAwLFxuICAgIHRheF90b3RhbDogMCxcbiAgICB0b3RhbDogMCxcbiAgICBub3RlczogJycsXG4gICAgY3VycmVuY3lfY29kZTogJ1VTRCcsXG4gICAgY29tcGFyZV9jdXJyZW5jeV9jb2RlOiAnJyxcbiAgICBleGNoYW5nZV9yYXRlOiAxLFxuICAgIG1ldGE6IHt9LFxuICB9KTtcbiAgY29uc3QgW2N1c3RvbWVycywgc2V0Q3VzdG9tZXJzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2NoYW5uZWxzLCBzZXRDaGFubmVsc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuICAvLyBGZXRjaCBjdXN0b21lcnMgYW5kIGNoYW5uZWxzIG9uIGNvbXBvbmVudCBtb3VudFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIFxuICAgICAgICAvLyBGZXRjaCBlYWNoIHJlc291cmNlIGluZGl2aWR1YWxseSB3aXRoIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY3VzdG9tZXJzUmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oeyByZXNvdXJjZUlkOiAnbHVuYXJfY3VzdG9tZXJzJywgYWN0aW9uTmFtZTogJ2xpc3QnIH0pO1xuICAgICAgICAgIHNldEN1c3RvbWVycyhjdXN0b21lcnNSZXNwb25zZS5kYXRhLnJlY29yZHMgfHwgW10pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUud2FybignRXJyb3IgZmV0Y2hpbmcgY3VzdG9tZXJzOicsIGVycm9yKTtcbiAgICAgICAgICBzZXRDdXN0b21lcnMoW10pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGNoYW5uZWxzUmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oeyByZXNvdXJjZUlkOiAnbHVuYXJfY2hhbm5lbHMnLCBhY3Rpb25OYW1lOiAnbGlzdCcgfSk7XG4gICAgICAgICAgc2V0Q2hhbm5lbHMoY2hhbm5lbHNSZXNwb25zZS5kYXRhLnJlY29yZHMgfHwgW10pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUud2FybignRXJyb3IgZmV0Y2hpbmcgY2hhbm5lbHM6JywgZXJyb3IpO1xuICAgICAgICAgIHNldENoYW5uZWxzKFtdKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gSWYgZWRpdGluZywgbG9hZCB0aGUgb3JkZXIgZGF0YVxuICAgICAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICAgICAgc2V0Rm9ybURhdGEoe1xuICAgICAgICAgICAgY3VzdG9tZXJfaWQ6IHJlY29yZC5wYXJhbXMuY3VzdG9tZXJfaWQgfHwgJycsXG4gICAgICAgICAgICBjaGFubmVsX2lkOiByZWNvcmQucGFyYW1zLmNoYW5uZWxfaWQgfHwgJycsXG4gICAgICAgICAgICBzdGF0dXM6IHJlY29yZC5wYXJhbXMuc3RhdHVzIHx8ICdwZW5kaW5nJyxcbiAgICAgICAgICAgIHJlZmVyZW5jZTogcmVjb3JkLnBhcmFtcy5yZWZlcmVuY2UgfHwgJycsXG4gICAgICAgICAgICBjdXN0b21lcl9yZWZlcmVuY2U6IHJlY29yZC5wYXJhbXMuY3VzdG9tZXJfcmVmZXJlbmNlIHx8ICcnLFxuICAgICAgICAgICAgc3ViX3RvdGFsOiByZWNvcmQucGFyYW1zLnN1Yl90b3RhbCB8fCAwLFxuICAgICAgICAgICAgZGlzY291bnRfdG90YWw6IHJlY29yZC5wYXJhbXMuZGlzY291bnRfdG90YWwgfHwgMCxcbiAgICAgICAgICAgIHNoaXBwaW5nX3RvdGFsOiByZWNvcmQucGFyYW1zLnNoaXBwaW5nX3RvdGFsIHx8IDAsXG4gICAgICAgICAgICB0YXhfdG90YWw6IHJlY29yZC5wYXJhbXMudGF4X3RvdGFsIHx8IDAsXG4gICAgICAgICAgICB0b3RhbDogcmVjb3JkLnBhcmFtcy50b3RhbCB8fCAwLFxuICAgICAgICAgICAgbm90ZXM6IHJlY29yZC5wYXJhbXMubm90ZXMgfHwgJycsXG4gICAgICAgICAgICBjdXJyZW5jeV9jb2RlOiByZWNvcmQucGFyYW1zLmN1cnJlbmN5X2NvZGUgfHwgJ1VTRCcsXG4gICAgICAgICAgICBjb21wYXJlX2N1cnJlbmN5X2NvZGU6IHJlY29yZC5wYXJhbXMuY29tcGFyZV9jdXJyZW5jeV9jb2RlIHx8ICcnLFxuICAgICAgICAgICAgZXhjaGFuZ2VfcmF0ZTogcmVjb3JkLnBhcmFtcy5leGNoYW5nZV9yYXRlIHx8IDEsXG4gICAgICAgICAgICBtZXRhOiByZWNvcmQucGFyYW1zLm1ldGEgfHwge30sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBmb3JtIGRhdGE6JywgZSk7XG4gICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBmb3JtIGRhdGEuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbaXNFZGl0aW5nLCByZWNvcmRdKTtcbiAgXG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHZhbHVlLCB0eXBlIH0gPSBlLnRhcmdldDtcbiAgICBcbiAgICAvLyBIYW5kbGUgbnVtZXJpYyBmaWVsZHNcbiAgICBpZiAobmFtZSA9PT0gJ3N1Yl90b3RhbCcgfHwgbmFtZSA9PT0gJ2Rpc2NvdW50X3RvdGFsJyB8fCBuYW1lID09PSAnc2hpcHBpbmdfdG90YWwnIHx8IFxuICAgICAgICBuYW1lID09PSAndGF4X3RvdGFsJyB8fCBuYW1lID09PSAndG90YWwnIHx8IG5hbWUgPT09ICdleGNoYW5nZV9yYXRlJykge1xuICAgICAgY29uc3QgbnVtVmFsdWUgPSB0eXBlID09PSAnbnVtYmVyJyA/IHBhcnNlRmxvYXQodmFsdWUpIDogdmFsdWU7XG4gICAgICBzZXRGb3JtRGF0YShwcmV2ID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIFtuYW1lXTogbnVtVmFsdWVcbiAgICAgIH0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0Rm9ybURhdGEocHJldiA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbbmFtZV06IHZhbHVlXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuICBcbiAgY29uc3QgY2FsY3VsYXRlVG90YWwgPSAoKSA9PiB7XG4gICAgLy8gQ29udmVydCBudW1lcmljIHZhbHVlcyBzYWZlbHkgdXNpbmcgTnVtYmVyKCkgaW5zdGVhZCBvZiBwYXJzZUZsb2F0XG4gICAgY29uc3Qgc3ViVG90YWwgPSBOdW1iZXIoZm9ybURhdGEuc3ViX3RvdGFsKSB8fCAwO1xuICAgIGNvbnN0IGRpc2NvdW50VG90YWwgPSBOdW1iZXIoZm9ybURhdGEuZGlzY291bnRfdG90YWwpIHx8IDA7XG4gICAgY29uc3Qgc2hpcHBpbmdUb3RhbCA9IE51bWJlcihmb3JtRGF0YS5zaGlwcGluZ190b3RhbCkgfHwgMDtcbiAgICBjb25zdCB0YXhUb3RhbCA9IE51bWJlcihmb3JtRGF0YS50YXhfdG90YWwpIHx8IDA7XG4gICAgXG4gICAgY29uc3QgdG90YWwgPSBzdWJUb3RhbCAtIGRpc2NvdW50VG90YWwgKyBzaGlwcGluZ1RvdGFsICsgdGF4VG90YWw7XG4gICAgXG4gICAgc2V0Rm9ybURhdGEocHJldiA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIHRvdGFsXG4gICAgfSkpO1xuICB9O1xuICBcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjYWxjdWxhdGVUb3RhbCgpO1xuICB9LCBbZm9ybURhdGEuc3ViX3RvdGFsLCBmb3JtRGF0YS5kaXNjb3VudF90b3RhbCwgZm9ybURhdGEuc2hpcHBpbmdfdG90YWwsIGZvcm1EYXRhLnRheF90b3RhbF0pO1xuICBcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvcihudWxsKTtcbiAgICAgIHNldFN1Y2Nlc3MoZmFsc2UpO1xuICAgICAgXG4gICAgICBjb25zdCBhcGlFbmRwb2ludCA9IGlzRWRpdGluZyBcbiAgICAgICAgPyBgL2FkbWluL2FwaS9yZXNvdXJjZXMvbHVuYXJfb3JkZXJzL3JlY29yZHMvJHtyZWNvcmQuaWR9YFxuICAgICAgICA6ICcvYWRtaW4vYXBpL3Jlc291cmNlcy9sdW5hcl9vcmRlcnMvYWN0aW9ucy9uZXcnO1xuICAgICAgXG4gICAgICBjb25zdCBtZXRob2QgPSBpc0VkaXRpbmcgPyAnUFVUJyA6ICdQT1NUJztcbiAgICAgIFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGlFbmRwb2ludCwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShmb3JtRGF0YSksXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEuZXJyb3IgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNhdmluZyB0aGUgb3JkZXInKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIFxuICAgICAgc2V0U3VjY2Vzcyh0cnVlKTtcbiAgICAgIFxuICAgICAgLy8gUmVkaXJlY3QgdG8gdGhlIG9yZGVyIGxpc3QgYWZ0ZXIgYSBzaG9ydCBkZWxheSBpZiBjcmVhdGluZyBuZXcgb3JkZXJcbiAgICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hZG1pbi9yZXNvdXJjZXMvbHVuYXJfb3JkZXJzJztcbiAgICAgICAgfSwgMTUwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIG9yZGVyOicsIGUpO1xuICAgICAgc2V0RXJyb3IoZS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2F2ZSBvcmRlci4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuICBcbiAgaWYgKGxvYWRpbmcgJiYgIWZvcm1EYXRhLnN0YXR1cykge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICAgIDxUZXh0IG10PVwiZGVmYXVsdFwiPkxvYWRpbmcuLi48L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG4gIFxuICByZXR1cm4gKFxuICAgIDxCb3ggYXM9XCJmb3JtXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XG4gICAgICA8SDMgbWI9XCJ4bFwiPntpc0VkaXRpbmcgPyAnRWRpdCBPcmRlcicgOiAnQ3JlYXRlIE5ldyBPcmRlcid9PC9IMz5cbiAgICAgIFxuICAgICAge2Vycm9yICYmIChcbiAgICAgICAgPE1lc3NhZ2VCb3ggbWI9XCJ4bFwiIG1lc3NhZ2U9e2Vycm9yfSB2YXJpYW50PVwiZGFuZ2VyXCIgLz5cbiAgICAgICl9XG4gICAgICBcbiAgICAgIHtzdWNjZXNzICYmIChcbiAgICAgICAgPE1lc3NhZ2VCb3ggbWI9XCJ4bFwiIG1lc3NhZ2U9XCJPcmRlciBzYXZlZCBzdWNjZXNzZnVsbHkhXCIgdmFyaWFudD1cInN1Y2Nlc3NcIiAvPlxuICAgICAgKX1cbiAgICAgIFxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsPkN1c3RvbWVyPC9MYWJlbD5cbiAgICAgICAgICA8U3RhdHVzU2VsZWN0XG4gICAgICAgICAgICBuYW1lPVwiY3VzdG9tZXJfaWRcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLmN1c3RvbWVyX2lkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgQ3VzdG9tZXI8L29wdGlvbj5cbiAgICAgICAgICAgIHtjdXN0b21lcnMubWFwKGN1c3RvbWVyID0+IChcbiAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2N1c3RvbWVyLmlkfSB2YWx1ZT17Y3VzdG9tZXIuaWR9PlxuICAgICAgICAgICAgICAgIHtjdXN0b21lci5wYXJhbXMuZmlyc3RfbmFtZX0ge2N1c3RvbWVyLnBhcmFtcy5sYXN0X25hbWV9XG4gICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9TdGF0dXNTZWxlY3Q+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+Q2hhbm5lbDwvTGFiZWw+XG4gICAgICAgICAgPFN0YXR1c1NlbGVjdFxuICAgICAgICAgICAgbmFtZT1cImNoYW5uZWxfaWRcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLmNoYW5uZWxfaWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBDaGFubmVsPC9vcHRpb24+XG4gICAgICAgICAgICB7Y2hhbm5lbHMubWFwKGNoYW5uZWwgPT4gKFxuICAgICAgICAgICAgICA8b3B0aW9uIGtleT17Y2hhbm5lbC5pZH0gdmFsdWU9e2NoYW5uZWwuaWR9PlxuICAgICAgICAgICAgICAgIHtjaGFubmVsLnBhcmFtcy5uYW1lfVxuICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvU3RhdHVzU2VsZWN0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPlN0YXR1czwvTGFiZWw+XG4gICAgICAgICAgPFN0YXR1c1NlbGVjdFxuICAgICAgICAgICAgbmFtZT1cInN0YXR1c1wiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuc3RhdHVzfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicGVuZGluZ1wiPlBlbmRpbmc8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwcm9jZXNzaW5nXCI+UHJvY2Vzc2luZzwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImNvbXBsZXRlZFwiPkNvbXBsZXRlZDwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImNhbmNlbGxlZFwiPkNhbmNlbGxlZDwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJlZnVuZGVkXCI+UmVmdW5kZWQ8L29wdGlvbj5cbiAgICAgICAgICA8L1N0YXR1c1NlbGVjdD5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5SZWZlcmVuY2U8L0xhYmVsPlxuICAgICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJyZWZlcmVuY2VcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnJlZmVyZW5jZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD5DdXN0b21lciBSZWZlcmVuY2U8L0xhYmVsPlxuICAgICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJjdXN0b21lcl9yZWZlcmVuY2VcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLmN1c3RvbWVyX3JlZmVyZW5jZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPlN1YiBUb3RhbDwvTGFiZWw+XG4gICAgICAgICAgPFRleHRJbnB1dFxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBuYW1lPVwic3ViX3RvdGFsXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5zdWJfdG90YWx9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+RGlzY291bnQgVG90YWw8L0xhYmVsPlxuICAgICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgbmFtZT1cImRpc2NvdW50X3RvdGFsXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5kaXNjb3VudF90b3RhbH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5TaGlwcGluZyBUb3RhbDwvTGFiZWw+XG4gICAgICAgICAgPFRleHRJbnB1dFxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBuYW1lPVwic2hpcHBpbmdfdG90YWxcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnNoaXBwaW5nX3RvdGFsfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPlRheCBUb3RhbDwvTGFiZWw+XG4gICAgICAgICAgPFRleHRJbnB1dFxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBuYW1lPVwidGF4X3RvdGFsXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS50YXhfdG90YWx9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+VG90YWw8L0xhYmVsPlxuICAgICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgbmFtZT1cInRvdGFsXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS50b3RhbH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+Tm90ZXM8L0xhYmVsPlxuICAgICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgICAgbmFtZT1cIm5vdGVzXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5ub3Rlc31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPkN1cnJlbmN5IENvZGU8L0xhYmVsPlxuICAgICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJjdXJyZW5jeV9jb2RlXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5jdXJyZW5jeV9jb2RlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsPkNvbXBhcmUgQ3VycmVuY3kgQ29kZTwvTGFiZWw+XG4gICAgICAgICAgPFRleHRJbnB1dFxuICAgICAgICAgICAgbmFtZT1cImNvbXBhcmVfY3VycmVuY3lfY29kZVwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuY29tcGFyZV9jdXJyZW5jeV9jb2RlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+RXhjaGFuZ2UgUmF0ZTwvTGFiZWw+XG4gICAgICAgICAgPFRleHRJbnB1dFxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBuYW1lPVwiZXhjaGFuZ2VfcmF0ZVwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuZXhjaGFuZ2VfcmF0ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgPEJveD5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD17bG9hZGluZ30+XG4gICAgICAgICAge2xvYWRpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlIE9yZGVyJ31cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyRm9ybTsgIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEgzLCBMYWJlbCwgVGV4dCwgQnV0dG9uLCBNZXNzYWdlQm94LCBMb2FkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuLy8gQ3JlYXRlIHN0eWxlZCBjb21wb25lbnRzIGZvciBpbnB1dHNcbmNvbnN0IFRleHRJbnB1dCA9IHN0eWxlZC5pbnB1dGBcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjQzBDOUQ0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIG91dGxpbmU6IG5vbmU7XG4gIFxuICAmOmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICMzNzk1QkU7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoNTUsIDE0OSwgMTkwLCAwLjIpO1xuICB9XG5gO1xuXG5jb25zdCBTdGF0dXNTZWxlY3QgPSBzdHlsZWQuc2VsZWN0YFxuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNDMEM5RDQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgb3V0bGluZTogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIFxuICAmOmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICMzNzk1QkU7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoNTUsIDE0OSwgMTkwLCAwLjIpO1xuICB9XG5gO1xuXG5jb25zdCBTd2l0Y2ggPSBzdHlsZWQuaW5wdXQuYXR0cnMoeyB0eXBlOiAnY2hlY2tib3gnIH0pYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNGU3ZWE7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcztcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBcbiAgJjpjaGVja2VkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMURDOUE0O1xuICB9XG4gIFxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMThweDtcbiAgICBoZWlnaHQ6IDE4cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIHRvcDogMXB4O1xuICAgIGxlZnQ6IDFweDtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcztcbiAgfVxuICBcbiAgJjpjaGVja2VkOjpiZWZvcmUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTtcbiAgfVxuYDtcblxuY29uc3QgQnJhbmRGb3JtID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcmVjb3JkLCByZXNvdXJjZSwgYWN0aW9uIH0gPSBwcm9wcztcbiAgY29uc3QgaXNFZGl0aW5nID0gcmVjb3JkICYmIHJlY29yZC5pZDtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtmb3JtRGF0YSwgc2V0Rm9ybURhdGFdID0gdXNlU3RhdGUoe1xuICAgIG5hbWU6ICcnLFxuICAgIGlzX2FjdGl2ZTogdHJ1ZSxcbiAgfSk7XG4gIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuICAvLyBMb2FkIGJyYW5kIGRhdGEgaWYgZWRpdGluZ1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIHNldEZvcm1EYXRhKHtcbiAgICAgICAgbmFtZTogcmVjb3JkLnBhcmFtcy5uYW1lIHx8ICcnLFxuICAgICAgICBpc19hY3RpdmU6IHJlY29yZC5wYXJhbXMuaXNfYWN0aXZlICE9PSBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW2lzRWRpdGluZywgcmVjb3JkXSk7XG4gIFxuICBjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSwgdHlwZSwgY2hlY2tlZCB9ID0gZS50YXJnZXQ7XG4gICAgc2V0Rm9ybURhdGEocHJldiA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIFtuYW1lXTogdHlwZSA9PT0gJ2NoZWNrYm94JyA/IGNoZWNrZWQgOiB2YWx1ZVxuICAgIH0pKTtcbiAgfTtcbiAgXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIHRyeSB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgICBzZXRTdWNjZXNzKGZhbHNlKTtcbiAgICAgIFxuICAgICAgY29uc3QgYXBpRW5kcG9pbnQgPSBpc0VkaXRpbmcgXG4gICAgICAgID8gYC9hZG1pbi9hcGkvYnJhbmRzLyR7cmVjb3JkLmlkfWBcbiAgICAgICAgOiAnL2FkbWluL2FwaS9icmFuZHMnO1xuICAgICAgXG4gICAgICBjb25zdCBtZXRob2QgPSBpc0VkaXRpbmcgPyAnUFVUJyA6ICdQT1NUJztcbiAgICAgIFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGlFbmRwb2ludCwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShmb3JtRGF0YSksXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEuZXJyb3IgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNhdmluZyB0aGUgYnJhbmQnKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIFxuICAgICAgc2V0U3VjY2Vzcyh0cnVlKTtcbiAgICAgIFxuICAgICAgLy8gUmVkaXJlY3QgdG8gdGhlIGJyYW5kIGxpc3QgYWZ0ZXIgYSBzaG9ydCBkZWxheSBpZiBjcmVhdGluZyBuZXcgYnJhbmRcbiAgICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hZG1pbi9yZXNvdXJjZXMvQnJhbmQnO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgYnJhbmQ6JywgZSk7XG4gICAgICBzZXRFcnJvcihlLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBzYXZlIGJyYW5kLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG4gIFxuICBpZiAobG9hZGluZyAmJiAhZm9ybURhdGEubmFtZSAmJiBpc0VkaXRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveD5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgICA8VGV4dCBtdD1cImRlZmF1bHRcIj5Mb2FkaW5nLi4uPC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuICBcbiAgcmV0dXJuIChcbiAgICA8Qm94IGFzPVwiZm9ybVwiIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxuICAgICAgPEgzIG1iPVwieGxcIj57aXNFZGl0aW5nID8gJ0VkaXQgQnJhbmQnIDogJ0NyZWF0ZSBOZXcgQnJhbmQnfTwvSDM+XG4gICAgICBcbiAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgIDxNZXNzYWdlQm94IG1iPVwieGxcIiBtZXNzYWdlPXtlcnJvcn0gdmFyaWFudD1cImRhbmdlclwiIC8+XG4gICAgICApfVxuICAgICAgXG4gICAgICB7c3VjY2VzcyAmJiAoXG4gICAgICAgIDxNZXNzYWdlQm94IG1iPVwieGxcIiBtZXNzYWdlPVwiQnJhbmQgc2F2ZWQgc3VjY2Vzc2Z1bGx5IVwiIHZhcmlhbnQ9XCJzdWNjZXNzXCIgLz5cbiAgICAgICl9XG4gICAgICBcbiAgICAgIDxCb3ggbWI9XCJ4bFwiPlxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5CcmFuZCBOYW1lPC9MYWJlbD5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICBuYW1lPVwibmFtZVwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEubmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD5BY3RpdmU8L0xhYmVsPlxuICAgICAgICAgIDxCb3ggbXQ9XCJkZWZhdWx0XCI+XG4gICAgICAgICAgICA8U3dpdGNoXG4gICAgICAgICAgICAgIG5hbWU9XCJpc19hY3RpdmVcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtmb3JtRGF0YS5pc19hY3RpdmV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgPC9Cb3g+XG4gICAgICBcbiAgICAgIDxCb3g+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e2xvYWRpbmd9PlxuICAgICAgICAgIHtsb2FkaW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSBCcmFuZCd9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCcmFuZEZvcm07ICIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMywgTGFiZWwsIFRleHQsIEJ1dHRvbiwgTWVzc2FnZUJveCwgTG9hZGVyLCBGb3JtR3JvdXAsIFRleHRBcmVhIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG4vLyBDcmVhdGUgc3R5bGVkIGNvbXBvbmVudHMgZm9yIGlucHV0c1xuY29uc3QgVGV4dElucHV0ID0gc3R5bGVkLmlucHV0YFxuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNDMEM5RDQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgb3V0bGluZTogbm9uZTtcbiAgXG4gICY6Zm9jdXMge1xuICAgIGJvcmRlci1jb2xvcjogIzM3OTVCRTtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSg1NSwgMTQ5LCAxOTAsIDAuMik7XG4gIH1cbmA7XG5cbmNvbnN0IFN3aXRjaCA9IHN0eWxlZC5pbnB1dC5hdHRycyh7IHR5cGU6ICdjaGVja2JveCcgfSlgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U0ZTdlYTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIFxuICAmOmNoZWNrZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMxREM5QTQ7XG4gIH1cbiAgXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAxOHB4O1xuICAgIGhlaWdodDogMThweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgdG9wOiAxcHg7XG4gICAgbGVmdDogMXB4O1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzO1xuICB9XG4gIFxuICAmOmNoZWNrZWQ6OmJlZm9yZSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwcHgpO1xuICB9XG5gO1xuXG5jb25zdCBDdXN0b21lckdyb3VwRm9ybSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UsIGFjdGlvbiB9ID0gcHJvcHM7XG4gIGNvbnN0IGlzRWRpdGluZyA9IHJlY29yZCAmJiByZWNvcmQuaWQ7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICBuYW1lOiAnJyxcbiAgICBoYW5kbGU6ICcnLFxuICAgIGlzX2RlZmF1bHQ6IGZhbHNlLFxuICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgfSk7XG4gIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuICAvLyBMb2FkIGN1c3RvbWVyIGdyb3VwIGRhdGEgaWYgZWRpdGluZ1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIHNldEZvcm1EYXRhKHtcbiAgICAgICAgbmFtZTogcmVjb3JkLnBhcmFtcy5uYW1lIHx8ICcnLFxuICAgICAgICBoYW5kbGU6IHJlY29yZC5wYXJhbXMuaGFuZGxlIHx8ICcnLFxuICAgICAgICBpc19kZWZhdWx0OiByZWNvcmQucGFyYW1zLmlzX2RlZmF1bHQgPT09IHRydWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiByZWNvcmQucGFyYW1zLmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgfSk7XG4gICAgfVxuICB9LCBbaXNFZGl0aW5nLCByZWNvcmRdKTtcbiAgXG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHZhbHVlLCB0eXBlLCBjaGVja2VkIH0gPSBlLnRhcmdldDtcbiAgICBcbiAgICBpZiAobmFtZSA9PT0gJ25hbWUnICYmICFpc0VkaXRpbmcpIHtcbiAgICAgIC8vIEF1dG8tZ2VuZXJhdGUgaGFuZGxlIGZyb20gbmFtZVxuICAgICAgY29uc3QgaGFuZGxlID0gdmFsdWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICctJykucmVwbGFjZSgvW15hLXowLTktXS9nLCAnJyk7XG4gICAgICBzZXRGb3JtRGF0YShwcmV2ID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIFtuYW1lXTogdmFsdWUsXG4gICAgICAgIGhhbmRsZSxcbiAgICAgIH0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0Rm9ybURhdGEocHJldiA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbbmFtZV06IHR5cGUgPT09ICdjaGVja2JveCcgPyBjaGVja2VkIDogdmFsdWVcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG4gIFxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yKG51bGwpO1xuICAgICAgc2V0U3VjY2VzcyhmYWxzZSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGFwaUVuZHBvaW50ID0gaXNFZGl0aW5nIFxuICAgICAgICA/IGAvYWRtaW4vYXBpL2N1c3RvbWVyLWdyb3Vwcy8ke3JlY29yZC5pZH1gXG4gICAgICAgIDogJy9hZG1pbi9hcGkvY3VzdG9tZXItZ3JvdXBzJztcbiAgICAgIFxuICAgICAgY29uc3QgbWV0aG9kID0gaXNFZGl0aW5nID8gJ1BVVCcgOiAnUE9TVCc7XG4gICAgICBcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpRW5kcG9pbnQsIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZm9ybURhdGEpLFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLmVycm9yIHx8ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzYXZpbmcgdGhlIGN1c3RvbWVyIGdyb3VwJyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBcbiAgICAgIHNldFN1Y2Nlc3ModHJ1ZSk7XG4gICAgICBcbiAgICAgIC8vIFJlZGlyZWN0IHRvIHRoZSBjdXN0b21lciBncm91cCBsaXN0IGFmdGVyIGEgc2hvcnQgZGVsYXkgaWYgY3JlYXRpbmcgbmV3IGdyb3VwXG4gICAgICBpZiAoIWlzRWRpdGluZykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYWRtaW4vcmVzb3VyY2VzL0N1c3RvbWVyR3JvdXAnO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgY3VzdG9tZXIgZ3JvdXA6JywgZSk7XG4gICAgICBzZXRFcnJvcihlLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBzYXZlIGN1c3RvbWVyIGdyb3VwLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG4gIFxuICBpZiAobG9hZGluZyAmJiAhZm9ybURhdGEubmFtZSAmJiBpc0VkaXRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveD5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgICA8VGV4dCBtdD1cImRlZmF1bHRcIj5Mb2FkaW5nLi4uPC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuICBcbiAgcmV0dXJuIChcbiAgICA8Qm94IGFzPVwiZm9ybVwiIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxuICAgICAgPEgzIG1iPVwieGxcIj57aXNFZGl0aW5nID8gJ0VkaXQgQ3VzdG9tZXIgR3JvdXAnIDogJ0NyZWF0ZSBOZXcgQ3VzdG9tZXIgR3JvdXAnfTwvSDM+XG4gICAgICBcbiAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgIDxNZXNzYWdlQm94IG1iPVwieGxcIiBtZXNzYWdlPXtlcnJvcn0gdmFyaWFudD1cImRhbmdlclwiIC8+XG4gICAgICApfVxuICAgICAgXG4gICAgICB7c3VjY2VzcyAmJiAoXG4gICAgICAgIDxNZXNzYWdlQm94IG1iPVwieGxcIiBtZXNzYWdlPVwiQ3VzdG9tZXIgZ3JvdXAgc2F2ZWQgc3VjY2Vzc2Z1bGx5IVwiIHZhcmlhbnQ9XCJzdWNjZXNzXCIgLz5cbiAgICAgICl9XG4gICAgICBcbiAgICAgIDxCb3ggbWI9XCJ4bFwiPlxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5Hcm91cCBOYW1lPC9MYWJlbD5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICBuYW1lPVwibmFtZVwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEubmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5IYW5kbGU8L0xhYmVsPlxuICAgICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJoYW5kbGVcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLmhhbmRsZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgYXM9XCJwXCIgZm9udFNpemU9XCJzbVwiIGNvbG9yPVwiZ3JleTgwXCI+XG4gICAgICAgICAgICBVc2VkIGluIFVSTHMgYW5kIEFQSSBjYWxscy4gQXV0by1nZW5lcmF0ZWQgZnJvbSBuYW1lIGlmIGxlZnQgZW1wdHkuXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsPkRlc2NyaXB0aW9uPC9MYWJlbD5cbiAgICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICAgIG5hbWU9XCJkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuZGVzY3JpcHRpb259XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD5EZWZhdWx0IEdyb3VwPC9MYWJlbD5cbiAgICAgICAgICA8Qm94IG10PVwiZGVmYXVsdFwiPlxuICAgICAgICAgICAgPFN3aXRjaFxuICAgICAgICAgICAgICBuYW1lPVwiaXNfZGVmYXVsdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e2Zvcm1EYXRhLmlzX2RlZmF1bHR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgYXM9XCJwXCIgZm9udFNpemU9XCJzbVwiIGNvbG9yPVwiZ3JleTgwXCI+XG4gICAgICAgICAgICAgIElmIGVuYWJsZWQsIG5ldyBjdXN0b21lcnMgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIGFzc2lnbmVkIHRvIHRoaXMgZ3JvdXAuXG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgPC9Cb3g+XG4gICAgICBcbiAgICAgIDxCb3g+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e2xvYWRpbmd9PlxuICAgICAgICAgIHtsb2FkaW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSBDdXN0b21lciBHcm91cCd9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21lckdyb3VwRm9ybTsgIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEgzLCBMYWJlbCwgVGV4dCwgQnV0dG9uLCBNZXNzYWdlQm94LCBMb2FkZXIsIEZvcm1Hcm91cCwgVGV4dEFyZWEgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbi8vIENyZWF0ZSBzdHlsZWQgY29tcG9uZW50cyBmb3IgaW5wdXRzXG5jb25zdCBUZXh0SW5wdXQgPSBzdHlsZWQuaW5wdXRgXG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI0MwQzlENDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICBvdXRsaW5lOiBub25lO1xuICBcbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjMzc5NUJFO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKDU1LCAxNDksIDE5MCwgMC4yKTtcbiAgfVxuYDtcblxuY29uc3QgU3RhdHVzU2VsZWN0ID0gc3R5bGVkLnNlbGVjdGBcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjQzBDOUQ0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBcbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjMzc5NUJFO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKDU1LCAxNDksIDE5MCwgMC4yKTtcbiAgfVxuYDtcblxuY29uc3QgQ2FydEZvcm0gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlLCBhY3Rpb24gfSA9IHByb3BzO1xuICBjb25zdCBpc0VkaXRpbmcgPSByZWNvcmQgJiYgcmVjb3JkLmlkO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzdWNjZXNzLCBzZXRTdWNjZXNzXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XG4gICAgdXNlcl9pZDogJycsXG4gICAgY3VzdG9tZXJfaWQ6ICcnLFxuICAgIG1lcmdlZF9pZDogJycsXG4gICAgY2hhbm5lbF9pZDogJycsXG4gICAgY3VycmVuY3lfaWQ6ICcnLFxuICAgIGNvdXBvbl9jb2RlOiAnJyxcbiAgICBjb21wbGV0ZWRfYXQ6IG51bGwsXG4gICAgbWV0YToge30sXG4gIH0pO1xuICBjb25zdCBbY3VzdG9tZXJzLCBzZXRDdXN0b21lcnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbdXNlcnMsIHNldFVzZXJzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2NoYW5uZWxzLCBzZXRDaGFubmVsc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtjdXJyZW5jaWVzLCBzZXRDdXJyZW5jaWVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG4gIC8vIEZldGNoIHJlbGF0ZWQgZGF0YSBvbiBjb21wb25lbnQgbW91bnRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICBcbiAgICAgICAgLy8gRmV0Y2ggZWFjaCByZXNvdXJjZSBpbmRpdmlkdWFsbHkgd2l0aCBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGN1c3RvbWVyc1Jlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHsgcmVzb3VyY2VJZDogJ2x1bmFyX2N1c3RvbWVycycsIGFjdGlvbk5hbWU6ICdsaXN0JyB9KTtcbiAgICAgICAgICBzZXRDdXN0b21lcnMoY3VzdG9tZXJzUmVzcG9uc2UuZGF0YS5yZWNvcmRzIHx8IFtdKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIGZldGNoaW5nIGN1c3RvbWVyczonLCBlcnJvcik7XG4gICAgICAgICAgc2V0Q3VzdG9tZXJzKFtdKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB1c2Vyc1Jlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHsgcmVzb3VyY2VJZDogJ3VzZXJzJywgYWN0aW9uTmFtZTogJ2xpc3QnIH0pO1xuICAgICAgICAgIHNldFVzZXJzKHVzZXJzUmVzcG9uc2UuZGF0YS5yZWNvcmRzIHx8IFtdKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIGZldGNoaW5nIHVzZXJzOicsIGVycm9yKTtcbiAgICAgICAgICBzZXRVc2VycyhbXSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY2hhbm5lbHNSZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7IHJlc291cmNlSWQ6ICdsdW5hcl9jaGFubmVscycsIGFjdGlvbk5hbWU6ICdsaXN0JyB9KTtcbiAgICAgICAgICBzZXRDaGFubmVscyhjaGFubmVsc1Jlc3BvbnNlLmRhdGEucmVjb3JkcyB8fCBbXSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdFcnJvciBmZXRjaGluZyBjaGFubmVsczonLCBlcnJvcik7XG4gICAgICAgICAgc2V0Q2hhbm5lbHMoW10pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbmNpZXNSZXNwb25zZSA9IGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7IHJlc291cmNlSWQ6ICdsdW5hcl9jdXJyZW5jaWVzJywgYWN0aW9uTmFtZTogJ2xpc3QnIH0pO1xuICAgICAgICAgIHNldEN1cnJlbmNpZXMoY3VycmVuY2llc1Jlc3BvbnNlLmRhdGEucmVjb3JkcyB8fCBbXSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdFcnJvciBmZXRjaGluZyBjdXJyZW5jaWVzOicsIGVycm9yKTtcbiAgICAgICAgICBzZXRDdXJyZW5jaWVzKFtdKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gSWYgZWRpdGluZywgbG9hZCB0aGUgY2FydCBkYXRhXG4gICAgICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgICAgICBzZXRGb3JtRGF0YSh7XG4gICAgICAgICAgICB1c2VyX2lkOiByZWNvcmQucGFyYW1zLnVzZXJfaWQgfHwgJycsXG4gICAgICAgICAgICBjdXN0b21lcl9pZDogcmVjb3JkLnBhcmFtcy5jdXN0b21lcl9pZCB8fCAnJyxcbiAgICAgICAgICAgIG1lcmdlZF9pZDogcmVjb3JkLnBhcmFtcy5tZXJnZWRfaWQgfHwgJycsXG4gICAgICAgICAgICBjaGFubmVsX2lkOiByZWNvcmQucGFyYW1zLmNoYW5uZWxfaWQgfHwgJycsXG4gICAgICAgICAgICBjdXJyZW5jeV9pZDogcmVjb3JkLnBhcmFtcy5jdXJyZW5jeV9pZCB8fCAnJyxcbiAgICAgICAgICAgIGNvdXBvbl9jb2RlOiByZWNvcmQucGFyYW1zLmNvdXBvbl9jb2RlIHx8ICcnLFxuICAgICAgICAgICAgY29tcGxldGVkX2F0OiByZWNvcmQucGFyYW1zLmNvbXBsZXRlZF9hdCB8fCBudWxsLFxuICAgICAgICAgICAgbWV0YTogcmVjb3JkLnBhcmFtcy5tZXRhIHx8IHt9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgZm9ybSBkYXRhOicsIGUpO1xuICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIGxvYWQgZm9ybSBkYXRhLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBcbiAgICBmZXRjaERhdGEoKTtcbiAgfSwgW2lzRWRpdGluZywgcmVjb3JkXSk7XG4gIFxuICBjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZS50YXJnZXQ7XG4gICAgc2V0Rm9ybURhdGEocHJldiA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIFtuYW1lXTogdmFsdWVcbiAgICB9KSk7XG4gIH07XG4gIFxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yKG51bGwpO1xuICAgICAgc2V0U3VjY2VzcyhmYWxzZSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGFwaUVuZHBvaW50ID0gaXNFZGl0aW5nIFxuICAgICAgICA/IGAvYWRtaW4vYXBpL3Jlc291cmNlcy9sdW5hcl9jYXJ0cy9yZWNvcmRzLyR7cmVjb3JkLmlkfWBcbiAgICAgICAgOiAnL2FkbWluL2FwaS9yZXNvdXJjZXMvbHVuYXJfY2FydHMvYWN0aW9ucy9uZXcnO1xuICAgICAgXG4gICAgICBjb25zdCBtZXRob2QgPSBpc0VkaXRpbmcgPyAnUFVUJyA6ICdQT1NUJztcbiAgICAgIFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGlFbmRwb2ludCwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShmb3JtRGF0YSksXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEuZXJyb3IgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNhdmluZyB0aGUgY2FydCcpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgXG4gICAgICBzZXRTdWNjZXNzKHRydWUpO1xuICAgICAgXG4gICAgICAvLyBSZWRpcmVjdCB0byB0aGUgY2FydCBsaXN0IGFmdGVyIGEgc2hvcnQgZGVsYXkgaWYgY3JlYXRpbmcgbmV3IGNhcnRcbiAgICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hZG1pbi9yZXNvdXJjZXMvbHVuYXJfY2FydHMnO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgY2FydDonLCBlKTtcbiAgICAgIHNldEVycm9yKGUubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHNhdmUgY2FydC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuICBcbiAgaWYgKGxvYWRpbmcgJiYgIWZvcm1EYXRhLmN1c3RvbWVyX2lkICYmIGlzRWRpdGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICAgIDxUZXh0IG10PVwiZGVmYXVsdFwiPkxvYWRpbmcuLi48L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG4gIFxuICByZXR1cm4gKFxuICAgIDxCb3ggYXM9XCJmb3JtXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XG4gICAgICA8SDMgbWI9XCJ4bFwiPntpc0VkaXRpbmcgPyAnRWRpdCBDYXJ0JyA6ICdDcmVhdGUgTmV3IENhcnQnfTwvSDM+XG4gICAgICBcbiAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgIDxNZXNzYWdlQm94IG1iPVwieGxcIiBtZXNzYWdlPXtlcnJvcn0gdmFyaWFudD1cImRhbmdlclwiIC8+XG4gICAgICApfVxuICAgICAgXG4gICAgICB7c3VjY2VzcyAmJiAoXG4gICAgICAgIDxNZXNzYWdlQm94IG1iPVwieGxcIiBtZXNzYWdlPVwiQ2FydCBzYXZlZCBzdWNjZXNzZnVsbHkhXCIgdmFyaWFudD1cInN1Y2Nlc3NcIiAvPlxuICAgICAgKX1cbiAgICAgIFxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsPlVzZXI8L0xhYmVsPlxuICAgICAgICAgIDxTdGF0dXNTZWxlY3RcbiAgICAgICAgICAgIG5hbWU9XCJ1c2VyX2lkXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS51c2VyX2lkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgVXNlcjwvb3B0aW9uPlxuICAgICAgICAgICAge3VzZXJzLm1hcCh1c2VyID0+IChcbiAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3VzZXIuaWR9IHZhbHVlPXt1c2VyLmlkfT5cbiAgICAgICAgICAgICAgICB7dXNlci5wYXJhbXMuZW1haWx9XG4gICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9TdGF0dXNTZWxlY3Q+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+Q3VzdG9tZXI8L0xhYmVsPlxuICAgICAgICAgIDxTdGF0dXNTZWxlY3RcbiAgICAgICAgICAgIG5hbWU9XCJjdXN0b21lcl9pZFwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuY3VzdG9tZXJfaWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBDdXN0b21lcjwvb3B0aW9uPlxuICAgICAgICAgICAge2N1c3RvbWVycy5tYXAoY3VzdG9tZXIgPT4gKFxuICAgICAgICAgICAgICA8b3B0aW9uIGtleT17Y3VzdG9tZXIuaWR9IHZhbHVlPXtjdXN0b21lci5pZH0+XG4gICAgICAgICAgICAgICAge2N1c3RvbWVyLnBhcmFtcy5maXJzdF9uYW1lfSB7Y3VzdG9tZXIucGFyYW1zLmxhc3RfbmFtZX1cbiAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L1N0YXR1c1NlbGVjdD5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbD5DaGFubmVsPC9MYWJlbD5cbiAgICAgICAgICA8U3RhdHVzU2VsZWN0XG4gICAgICAgICAgICBuYW1lPVwiY2hhbm5lbF9pZFwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuY2hhbm5lbF9pZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IENoYW5uZWw8L29wdGlvbj5cbiAgICAgICAgICAgIHtjaGFubmVscy5tYXAoY2hhbm5lbCA9PiAoXG4gICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtjaGFubmVsLmlkfSB2YWx1ZT17Y2hhbm5lbC5pZH0+XG4gICAgICAgICAgICAgICAge2NoYW5uZWwucGFyYW1zLm5hbWV9XG4gICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9TdGF0dXNTZWxlY3Q+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+Q3VycmVuY3k8L0xhYmVsPlxuICAgICAgICAgIDxTdGF0dXNTZWxlY3RcbiAgICAgICAgICAgIG5hbWU9XCJjdXJyZW5jeV9pZFwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuY3VycmVuY3lfaWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBDdXJyZW5jeTwvb3B0aW9uPlxuICAgICAgICAgICAge2N1cnJlbmNpZXMubWFwKGN1cnJlbmN5ID0+IChcbiAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2N1cnJlbmN5LmlkfSB2YWx1ZT17Y3VycmVuY3kuaWR9PlxuICAgICAgICAgICAgICAgIHtjdXJyZW5jeS5wYXJhbXMuY29kZX0gKHtjdXJyZW5jeS5wYXJhbXMubmFtZX0pXG4gICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9TdGF0dXNTZWxlY3Q+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+Q291cG9uIENvZGU8L0xhYmVsPlxuICAgICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJjb3Vwb25fY29kZVwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuY291cG9uX2NvZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgIFxuICAgICAgICB7aXNFZGl0aW5nICYmIChcbiAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgPExhYmVsPkNvbXBsZXRlZCBBdDwvTGFiZWw+XG4gICAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJkYXRldGltZS1sb2NhbFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJjb21wbGV0ZWRfYXRcIlxuICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuY29tcGxldGVkX2F0ID8gbmV3IERhdGUoZm9ybURhdGEuY29tcGxldGVkX2F0KS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDE2KSA6ICcnfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgICBcbiAgICAgIDxCb3g+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e2xvYWRpbmd9PlxuICAgICAgICAgIHtsb2FkaW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSBDYXJ0J31cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRGb3JtOyAiLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgSDMsIExhYmVsLCBUZXh0LCBCdXR0b24sIE1lc3NhZ2VCb3gsIExvYWRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG4vLyBDcmVhdGUgc3R5bGVkIGNvbXBvbmVudHMgZm9yIGlucHV0c1xuY29uc3QgVGV4dElucHV0ID0gc3R5bGVkLmlucHV0YFxuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNDMEM5RDQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgb3V0bGluZTogbm9uZTtcbiAgXG4gICY6Zm9jdXMge1xuICAgIGJvcmRlci1jb2xvcjogIzM3OTVCRTtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSg1NSwgMTQ5LCAxOTAsIDAuMik7XG4gIH1cbmA7XG5cbmNvbnN0IFN0YXR1c1NlbGVjdCA9IHN0eWxlZC5zZWxlY3RgXG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI0MwQzlENDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICBvdXRsaW5lOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgXG4gICY6Zm9jdXMge1xuICAgIGJvcmRlci1jb2xvcjogIzM3OTVCRTtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSg1NSwgMTQ5LCAxOTAsIDAuMik7XG4gIH1cbmA7XG5cbmNvbnN0IFN3aXRjaCA9IHN0eWxlZC5pbnB1dC5hdHRycyh7IHR5cGU6ICdjaGVja2JveCcgfSlgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U0ZTdlYTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIFxuICAmOmNoZWNrZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMxREM5QTQ7XG4gIH1cbiAgXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAxOHB4O1xuICAgIGhlaWdodDogMThweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgdG9wOiAxcHg7XG4gICAgbGVmdDogMXB4O1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzO1xuICB9XG4gIFxuICAmOmNoZWNrZWQ6OmJlZm9yZSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwcHgpO1xuICB9XG5gO1xuXG5jb25zdCBUYXhSYXRlRm9ybSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UsIGFjdGlvbiB9ID0gcHJvcHM7XG4gIGNvbnN0IGlzRWRpdGluZyA9IHJlY29yZCAmJiByZWNvcmQuaWQ7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICB0YXhfY2xhc3NfaWQ6ICcnLFxuICAgIHRheF96b25lX2lkOiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBwcmlvcml0eTogMCxcbiAgICBpc19hY3RpdmU6IHRydWUsXG4gIH0pO1xuICBjb25zdCBbdGF4Q2xhc3Nlcywgc2V0VGF4Q2xhc3Nlc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFt0YXhab25lcywgc2V0VGF4Wm9uZXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cbiAgLy8gRmV0Y2ggcmVsYXRlZCBkYXRhIG9uIGNvbXBvbmVudCBtb3VudFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBbdGF4Q2xhc3Nlc1Jlc3BvbnNlLCB0YXhab25lc1Jlc3BvbnNlXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICBhcGkucmVzb3VyY2VBY3Rpb24oeyByZXNvdXJjZUlkOiAnVGF4Q2xhc3MnLCBhY3Rpb25OYW1lOiAnbGlzdCcgfSksXG4gICAgICAgICAgYXBpLnJlc291cmNlQWN0aW9uKHsgcmVzb3VyY2VJZDogJ1RheFpvbmUnLCBhY3Rpb25OYW1lOiAnbGlzdCcgfSlcbiAgICAgICAgXSk7XG4gICAgICAgIFxuICAgICAgICBzZXRUYXhDbGFzc2VzKHRheENsYXNzZXNSZXNwb25zZS5kYXRhLnJlY29yZHMgfHwgW10pO1xuICAgICAgICBzZXRUYXhab25lcyh0YXhab25lc1Jlc3BvbnNlLmRhdGEucmVjb3JkcyB8fCBbXSk7XG4gICAgICAgIFxuICAgICAgICAvLyBJZiBlZGl0aW5nLCBsb2FkIHRoZSB0YXggcmF0ZSBkYXRhXG4gICAgICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgICAgICBzZXRGb3JtRGF0YSh7XG4gICAgICAgICAgICB0YXhfY2xhc3NfaWQ6IHJlY29yZC5wYXJhbXMudGF4X2NsYXNzX2lkIHx8ICcnLFxuICAgICAgICAgICAgdGF4X3pvbmVfaWQ6IHJlY29yZC5wYXJhbXMudGF4X3pvbmVfaWQgfHwgJycsXG4gICAgICAgICAgICBuYW1lOiByZWNvcmQucGFyYW1zLm5hbWUgfHwgJycsXG4gICAgICAgICAgICBwcmlvcml0eTogcmVjb3JkLnBhcmFtcy5wcmlvcml0eSB8fCAwLFxuICAgICAgICAgICAgaXNfYWN0aXZlOiByZWNvcmQucGFyYW1zLmlzX2FjdGl2ZSAhPT0gZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBmb3JtIGRhdGE6JywgZSk7XG4gICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBmb3JtIGRhdGEuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbaXNFZGl0aW5nLCByZWNvcmRdKTtcbiAgXG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHZhbHVlLCB0eXBlLCBjaGVja2VkIH0gPSBlLnRhcmdldDtcbiAgICBcbiAgICBpZiAobmFtZSA9PT0gJ3ByaW9yaXR5Jykge1xuICAgICAgc2V0Rm9ybURhdGEocHJldiA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbbmFtZV06IHBhcnNlSW50KHZhbHVlKSB8fCAwXG4gICAgICB9KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEZvcm1EYXRhKHByZXYgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW25hbWVdOiB0eXBlID09PSAnY2hlY2tib3gnID8gY2hlY2tlZCA6IHZhbHVlXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuICBcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvcihudWxsKTtcbiAgICAgIHNldFN1Y2Nlc3MoZmFsc2UpO1xuICAgICAgXG4gICAgICBjb25zdCBhcGlFbmRwb2ludCA9IGlzRWRpdGluZyBcbiAgICAgICAgPyBgL2FkbWluL2FwaS90YXgtcmF0ZXMvJHtyZWNvcmQuaWR9YFxuICAgICAgICA6ICcvYWRtaW4vYXBpL3RheC1yYXRlcyc7XG4gICAgICBcbiAgICAgIGNvbnN0IG1ldGhvZCA9IGlzRWRpdGluZyA/ICdQVVQnIDogJ1BPU1QnO1xuICAgICAgXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFwaUVuZHBvaW50LCB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhKSxcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yRGF0YS5lcnJvciB8fCAnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgc2F2aW5nIHRoZSB0YXggcmF0ZScpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgXG4gICAgICBzZXRTdWNjZXNzKHRydWUpO1xuICAgICAgXG4gICAgICAvLyBSZWRpcmVjdCB0byB0aGUgdGF4IHJhdGUgbGlzdCBhZnRlciBhIHNob3J0IGRlbGF5IGlmIGNyZWF0aW5nIG5ldyB0YXggcmF0ZVxuICAgICAgaWYgKCFpc0VkaXRpbmcpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2FkbWluL3Jlc291cmNlcy9UYXhSYXRlJztcbiAgICAgICAgfSwgMTUwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIHRheCByYXRlOicsIGUpO1xuICAgICAgc2V0RXJyb3IoZS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2F2ZSB0YXggcmF0ZS4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuICBcbiAgaWYgKGxvYWRpbmcgJiYgIWZvcm1EYXRhLm5hbWUgJiYgaXNFZGl0aW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3g+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgICAgPFRleHQgbXQ9XCJkZWZhdWx0XCI+TG9hZGluZy4uLjwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cbiAgXG4gIHJldHVybiAoXG4gICAgPEJveCBhcz1cImZvcm1cIiBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgIDxIMyBtYj1cInhsXCI+e2lzRWRpdGluZyA/ICdFZGl0IFRheCBSYXRlJyA6ICdDcmVhdGUgTmV3IFRheCBSYXRlJ308L0gzPlxuICAgICAgXG4gICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICA8TWVzc2FnZUJveCBtYj1cInhsXCIgbWVzc2FnZT17ZXJyb3J9IHZhcmlhbnQ9XCJkYW5nZXJcIiAvPlxuICAgICAgKX1cbiAgICAgIFxuICAgICAge3N1Y2Nlc3MgJiYgKFxuICAgICAgICA8TWVzc2FnZUJveCBtYj1cInhsXCIgbWVzc2FnZT1cIlRheCByYXRlIHNhdmVkIHN1Y2Nlc3NmdWxseSFcIiB2YXJpYW50PVwic3VjY2Vzc1wiIC8+XG4gICAgICApfVxuICAgICAgXG4gICAgICA8Qm94IG1iPVwieGxcIj5cbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+TmFtZTwvTGFiZWw+XG4gICAgICAgICAgPFRleHRJbnB1dFxuICAgICAgICAgICAgbmFtZT1cIm5hbWVcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLm5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+VGF4IENsYXNzPC9MYWJlbD5cbiAgICAgICAgICA8U3RhdHVzU2VsZWN0XG4gICAgICAgICAgICBuYW1lPVwidGF4X2NsYXNzX2lkXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS50YXhfY2xhc3NfaWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgVGF4IENsYXNzPC9vcHRpb24+XG4gICAgICAgICAgICB7dGF4Q2xhc3Nlcy5tYXAodGF4Q2xhc3MgPT4gKFxuICAgICAgICAgICAgICA8b3B0aW9uIGtleT17dGF4Q2xhc3MuaWR9IHZhbHVlPXt0YXhDbGFzcy5pZH0+XG4gICAgICAgICAgICAgICAge3RheENsYXNzLnBhcmFtcy5uYW1lfVxuICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvU3RhdHVzU2VsZWN0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPlRheCBab25lPC9MYWJlbD5cbiAgICAgICAgICA8U3RhdHVzU2VsZWN0XG4gICAgICAgICAgICBuYW1lPVwidGF4X3pvbmVfaWRcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnRheF96b25lX2lkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IFRheCBab25lPC9vcHRpb24+XG4gICAgICAgICAgICB7dGF4Wm9uZXMubWFwKHRheFpvbmUgPT4gKFxuICAgICAgICAgICAgICA8b3B0aW9uIGtleT17dGF4Wm9uZS5pZH0gdmFsdWU9e3RheFpvbmUuaWR9PlxuICAgICAgICAgICAgICAgIHt0YXhab25lLnBhcmFtcy5uYW1lfVxuICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvU3RhdHVzU2VsZWN0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPlByaW9yaXR5PC9MYWJlbD5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIG5hbWU9XCJwcmlvcml0eVwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEucHJpb3JpdHl9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGFzPVwicFwiIGZvbnRTaXplPVwic21cIiBjb2xvcj1cImdyZXk4MFwiPlxuICAgICAgICAgICAgSGlnaGVyIHByaW9yaXR5IHRheCByYXRlcyB3aWxsIGJlIGFwcGxpZWQgZmlyc3QuXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsPkFjdGl2ZTwvTGFiZWw+XG4gICAgICAgICAgPEJveCBtdD1cImRlZmF1bHRcIj5cbiAgICAgICAgICAgIDxTd2l0Y2hcbiAgICAgICAgICAgICAgbmFtZT1cImlzX2FjdGl2ZVwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e2Zvcm1EYXRhLmlzX2FjdGl2ZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgPEJveD5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD17bG9hZGluZ30+XG4gICAgICAgICAge2xvYWRpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlIFRheCBSYXRlJ31cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRheFJhdGVGb3JtOyAiLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgSDMsIExhYmVsLCBUZXh0LCBCdXR0b24sIE1lc3NhZ2VCb3gsIExvYWRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG4vLyBDcmVhdGUgc3R5bGVkIGNvbXBvbmVudHMgZm9yIGlucHV0c1xuY29uc3QgVGV4dElucHV0ID0gc3R5bGVkLmlucHV0YFxuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNDMEM5RDQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgb3V0bGluZTogbm9uZTtcbiAgXG4gICY6Zm9jdXMge1xuICAgIGJvcmRlci1jb2xvcjogIzM3OTVCRTtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSg1NSwgMTQ5LCAxOTAsIDAuMik7XG4gIH1cbmA7XG5cbmNvbnN0IFByb2R1Y3RUeXBlRm9ybSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UsIGFjdGlvbiB9ID0gcHJvcHM7XG4gIGNvbnN0IGlzRWRpdGluZyA9IHJlY29yZCAmJiByZWNvcmQuaWQ7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICBuYW1lOiAnJyxcbiAgfSk7XG4gIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuICAvLyBMb2FkIHByb2R1Y3QgdHlwZSBkYXRhIGlmIGVkaXRpbmdcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICBzZXRGb3JtRGF0YSh7XG4gICAgICAgIG5hbWU6IHJlY29yZC5wYXJhbXMubmFtZSB8fCAnJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW2lzRWRpdGluZywgcmVjb3JkXSk7XG4gIFxuICBjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZS50YXJnZXQ7XG4gICAgc2V0Rm9ybURhdGEocHJldiA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIFtuYW1lXTogdmFsdWVcbiAgICB9KSk7XG4gIH07XG4gIFxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yKG51bGwpO1xuICAgICAgc2V0U3VjY2VzcyhmYWxzZSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGFwaUVuZHBvaW50ID0gaXNFZGl0aW5nIFxuICAgICAgICA/IGAvYWRtaW4vYXBpL3Byb2R1Y3QtdHlwZXMvJHtyZWNvcmQuaWR9YFxuICAgICAgICA6ICcvYWRtaW4vYXBpL3Byb2R1Y3QtdHlwZXMnO1xuICAgICAgXG4gICAgICBjb25zdCBtZXRob2QgPSBpc0VkaXRpbmcgPyAnUFVUJyA6ICdQT1NUJztcbiAgICAgIFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGlFbmRwb2ludCwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShmb3JtRGF0YSksXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEuZXJyb3IgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNhdmluZyB0aGUgcHJvZHVjdCB0eXBlJyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBcbiAgICAgIHNldFN1Y2Nlc3ModHJ1ZSk7XG4gICAgICBcbiAgICAgIC8vIFJlZGlyZWN0IHRvIHRoZSBwcm9kdWN0IHR5cGUgbGlzdCBhZnRlciBhIHNob3J0IGRlbGF5IGlmIGNyZWF0aW5nIG5ldyBwcm9kdWN0IHR5cGVcbiAgICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hZG1pbi9yZXNvdXJjZXMvUHJvZHVjdFR5cGUnO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgcHJvZHVjdCB0eXBlOicsIGUpO1xuICAgICAgc2V0RXJyb3IoZS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2F2ZSBwcm9kdWN0IHR5cGUuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcbiAgXG4gIGlmIChsb2FkaW5nICYmICFmb3JtRGF0YS5uYW1lICYmIGlzRWRpdGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICAgIDxUZXh0IG10PVwiZGVmYXVsdFwiPkxvYWRpbmcuLi48L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG4gIFxuICByZXR1cm4gKFxuICAgIDxCb3ggYXM9XCJmb3JtXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XG4gICAgICA8SDMgbWI9XCJ4bFwiPntpc0VkaXRpbmcgPyAnRWRpdCBQcm9kdWN0IFR5cGUnIDogJ0NyZWF0ZSBOZXcgUHJvZHVjdCBUeXBlJ308L0gzPlxuICAgICAgXG4gICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICA8TWVzc2FnZUJveCBtYj1cInhsXCIgbWVzc2FnZT17ZXJyb3J9IHZhcmlhbnQ9XCJkYW5nZXJcIiAvPlxuICAgICAgKX1cbiAgICAgIFxuICAgICAge3N1Y2Nlc3MgJiYgKFxuICAgICAgICA8TWVzc2FnZUJveCBtYj1cInhsXCIgbWVzc2FnZT1cIlByb2R1Y3QgdHlwZSBzYXZlZCBzdWNjZXNzZnVsbHkhXCIgdmFyaWFudD1cInN1Y2Nlc3NcIiAvPlxuICAgICAgKX1cbiAgICAgIFxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPk5hbWU8L0xhYmVsPlxuICAgICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5uYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICA8Qm94PlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgdHlwZT1cInN1Ym1pdFwiIGRpc2FibGVkPXtsb2FkaW5nfT5cbiAgICAgICAgICB7bG9hZGluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUgUHJvZHVjdCBUeXBlJ31cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RUeXBlRm9ybTsgIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEgzLCBMYWJlbCwgVGV4dCwgQnV0dG9uLCBNZXNzYWdlQm94LCBMb2FkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuLy8gQ3JlYXRlIHN0eWxlZCBjb21wb25lbnRzIGZvciBpbnB1dHNcbmNvbnN0IFRleHRJbnB1dCA9IHN0eWxlZC5pbnB1dGBcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjQzBDOUQ0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIG91dGxpbmU6IG5vbmU7XG4gIFxuICAmOmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICMzNzk1QkU7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoNTUsIDE0OSwgMTkwLCAwLjIpO1xuICB9XG5gO1xuXG5jb25zdCBUYXhDbGFzc0Zvcm0gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlLCBhY3Rpb24gfSA9IHByb3BzO1xuICBjb25zdCBpc0VkaXRpbmcgPSByZWNvcmQgJiYgcmVjb3JkLmlkO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzdWNjZXNzLCBzZXRTdWNjZXNzXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XG4gICAgbmFtZTogJycsXG4gIH0pO1xuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cbiAgLy8gTG9hZCB0YXggY2xhc3MgZGF0YSBpZiBlZGl0aW5nXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgc2V0Rm9ybURhdGEoe1xuICAgICAgICBuYW1lOiByZWNvcmQucGFyYW1zLm5hbWUgfHwgJycsXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIFtpc0VkaXRpbmcsIHJlY29yZF0pO1xuICBcbiAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGUudGFyZ2V0O1xuICAgIHNldEZvcm1EYXRhKHByZXYgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICBbbmFtZV06IHZhbHVlXG4gICAgfSkpO1xuICB9O1xuICBcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvcihudWxsKTtcbiAgICAgIHNldFN1Y2Nlc3MoZmFsc2UpO1xuICAgICAgXG4gICAgICBjb25zdCBhcGlFbmRwb2ludCA9IGlzRWRpdGluZyBcbiAgICAgICAgPyBgL2FkbWluL2FwaS90YXgtY2xhc3Nlcy8ke3JlY29yZC5pZH1gXG4gICAgICAgIDogJy9hZG1pbi9hcGkvdGF4LWNsYXNzZXMnO1xuICAgICAgXG4gICAgICBjb25zdCBtZXRob2QgPSBpc0VkaXRpbmcgPyAnUFVUJyA6ICdQT1NUJztcbiAgICAgIFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGlFbmRwb2ludCwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShmb3JtRGF0YSksXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEuZXJyb3IgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNhdmluZyB0aGUgdGF4IGNsYXNzJyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBcbiAgICAgIHNldFN1Y2Nlc3ModHJ1ZSk7XG4gICAgICBcbiAgICAgIC8vIFJlZGlyZWN0IHRvIHRoZSB0YXggY2xhc3MgbGlzdCBhZnRlciBhIHNob3J0IGRlbGF5IGlmIGNyZWF0aW5nIG5ldyB0YXggY2xhc3NcbiAgICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hZG1pbi9yZXNvdXJjZXMvVGF4Q2xhc3MnO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgdGF4IGNsYXNzOicsIGUpO1xuICAgICAgc2V0RXJyb3IoZS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2F2ZSB0YXggY2xhc3MuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcbiAgXG4gIGlmIChsb2FkaW5nICYmICFmb3JtRGF0YS5uYW1lICYmIGlzRWRpdGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICAgIDxUZXh0IG10PVwiZGVmYXVsdFwiPkxvYWRpbmcuLi48L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG4gIFxuICByZXR1cm4gKFxuICAgIDxCb3ggYXM9XCJmb3JtXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XG4gICAgICA8SDMgbWI9XCJ4bFwiPntpc0VkaXRpbmcgPyAnRWRpdCBUYXggQ2xhc3MnIDogJ0NyZWF0ZSBOZXcgVGF4IENsYXNzJ308L0gzPlxuICAgICAgXG4gICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICA8TWVzc2FnZUJveCBtYj1cInhsXCIgbWVzc2FnZT17ZXJyb3J9IHZhcmlhbnQ9XCJkYW5nZXJcIiAvPlxuICAgICAgKX1cbiAgICAgIFxuICAgICAge3N1Y2Nlc3MgJiYgKFxuICAgICAgICA8TWVzc2FnZUJveCBtYj1cInhsXCIgbWVzc2FnZT1cIlRheCBjbGFzcyBzYXZlZCBzdWNjZXNzZnVsbHkhXCIgdmFyaWFudD1cInN1Y2Nlc3NcIiAvPlxuICAgICAgKX1cbiAgICAgIFxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsIHJlcXVpcmVkPk5hbWU8L0xhYmVsPlxuICAgICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5uYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxUZXh0IG10PVwic21cIiBhcz1cInBcIiBmb250U2l6ZT1cInNtXCIgY29sb3I9XCJncmV5ODBcIj5cbiAgICAgICAgICAgIEV4YW1wbGVzOiBTdGFuZGFyZCBSYXRlLCBSZWR1Y2VkIFJhdGUsIFplcm8gUmF0ZSwgZXRjLlxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgPEJveD5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD17bG9hZGluZ30+XG4gICAgICAgICAge2xvYWRpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlIFRheCBDbGFzcyd9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYXhDbGFzc0Zvcm07ICIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMywgTGFiZWwsIFRleHQsIEJ1dHRvbiwgTWVzc2FnZUJveCwgTG9hZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbi8vIENyZWF0ZSBzdHlsZWQgY29tcG9uZW50cyBmb3IgaW5wdXRzXG5jb25zdCBUZXh0SW5wdXQgPSBzdHlsZWQuaW5wdXRgXG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI0MwQzlENDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICBvdXRsaW5lOiBub25lO1xuICBcbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjMzc5NUJFO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKDU1LCAxNDksIDE5MCwgMC4yKTtcbiAgfVxuYDtcblxuY29uc3QgU3RhdHVzU2VsZWN0ID0gc3R5bGVkLnNlbGVjdGBcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjQzBDOUQ0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBcbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjMzc5NUJFO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKDU1LCAxNDksIDE5MCwgMC4yKTtcbiAgfVxuYDtcblxuY29uc3QgU3dpdGNoID0gc3R5bGVkLmlucHV0LmF0dHJzKHsgdHlwZTogJ2NoZWNrYm94JyB9KWBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTRlN2VhO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3M7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgXG4gICY6Y2hlY2tlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFEQzlBNDtcbiAgfVxuICBcbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDE4cHg7XG4gICAgaGVpZ2h0OiAxOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICB0b3A6IDFweDtcbiAgICBsZWZ0OiAxcHg7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3M7XG4gIH1cbiAgXG4gICY6Y2hlY2tlZDo6YmVmb3JlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7XG4gIH1cbmA7XG5cbmNvbnN0IFRheFpvbmVGb3JtID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcmVjb3JkLCByZXNvdXJjZSwgYWN0aW9uIH0gPSBwcm9wcztcbiAgY29uc3QgaXNFZGl0aW5nID0gcmVjb3JkICYmIHJlY29yZC5pZDtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtmb3JtRGF0YSwgc2V0Rm9ybURhdGFdID0gdXNlU3RhdGUoe1xuICAgIG5hbWU6ICcnLFxuICAgIHpvbmVfdHlwZTogJ2NvdW50cnknLFxuICAgIHByaWNlX2Rpc3BsYXk6ICd0YXhfaW5jbHVzaXZlJyxcbiAgICBhY3RpdmU6IHRydWUsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gIH0pO1xuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cbiAgLy8gTG9hZCB0YXggem9uZSBkYXRhIGlmIGVkaXRpbmdcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICBzZXRGb3JtRGF0YSh7XG4gICAgICAgIG5hbWU6IHJlY29yZC5wYXJhbXMubmFtZSB8fCAnJyxcbiAgICAgICAgem9uZV90eXBlOiByZWNvcmQucGFyYW1zLnpvbmVfdHlwZSB8fCAnY291bnRyeScsXG4gICAgICAgIHByaWNlX2Rpc3BsYXk6IHJlY29yZC5wYXJhbXMucHJpY2VfZGlzcGxheSB8fCAndGF4X2luY2x1c2l2ZScsXG4gICAgICAgIGFjdGl2ZTogcmVjb3JkLnBhcmFtcy5hY3RpdmUgIT09IGZhbHNlLFxuICAgICAgICBkZWZhdWx0OiByZWNvcmQucGFyYW1zLmRlZmF1bHQgPT09IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIFtpc0VkaXRpbmcsIHJlY29yZF0pO1xuICBcbiAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUsIHR5cGUsIGNoZWNrZWQgfSA9IGUudGFyZ2V0O1xuICAgIHNldEZvcm1EYXRhKHByZXYgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICBbbmFtZV06IHR5cGUgPT09ICdjaGVja2JveCcgPyBjaGVja2VkIDogdmFsdWVcbiAgICB9KSk7XG4gIH07XG4gIFxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yKG51bGwpO1xuICAgICAgc2V0U3VjY2VzcyhmYWxzZSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGFwaUVuZHBvaW50ID0gaXNFZGl0aW5nIFxuICAgICAgICA/IGAvYWRtaW4vYXBpL3RheC16b25lcy8ke3JlY29yZC5pZH1gXG4gICAgICAgIDogJy9hZG1pbi9hcGkvdGF4LXpvbmVzJztcbiAgICAgIFxuICAgICAgY29uc3QgbWV0aG9kID0gaXNFZGl0aW5nID8gJ1BVVCcgOiAnUE9TVCc7XG4gICAgICBcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpRW5kcG9pbnQsIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZm9ybURhdGEpLFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLmVycm9yIHx8ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzYXZpbmcgdGhlIHRheCB6b25lJyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBcbiAgICAgIHNldFN1Y2Nlc3ModHJ1ZSk7XG4gICAgICBcbiAgICAgIC8vIFJlZGlyZWN0IHRvIHRoZSB0YXggem9uZSBsaXN0IGFmdGVyIGEgc2hvcnQgZGVsYXkgaWYgY3JlYXRpbmcgbmV3IHRheCB6b25lXG4gICAgICBpZiAoIWlzRWRpdGluZykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYWRtaW4vcmVzb3VyY2VzL1RheFpvbmUnO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgdGF4IHpvbmU6JywgZSk7XG4gICAgICBzZXRFcnJvcihlLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBzYXZlIHRheCB6b25lLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG4gIFxuICBpZiAobG9hZGluZyAmJiAhZm9ybURhdGEubmFtZSAmJiBpc0VkaXRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveD5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgICA8VGV4dCBtdD1cImRlZmF1bHRcIj5Mb2FkaW5nLi4uPC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuICBcbiAgcmV0dXJuIChcbiAgICA8Qm94IGFzPVwiZm9ybVwiIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxuICAgICAgPEgzIG1iPVwieGxcIj57aXNFZGl0aW5nID8gJ0VkaXQgVGF4IFpvbmUnIDogJ0NyZWF0ZSBOZXcgVGF4IFpvbmUnfTwvSDM+XG4gICAgICBcbiAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgIDxNZXNzYWdlQm94IG1iPVwieGxcIiBtZXNzYWdlPXtlcnJvcn0gdmFyaWFudD1cImRhbmdlclwiIC8+XG4gICAgICApfVxuICAgICAgXG4gICAgICB7c3VjY2VzcyAmJiAoXG4gICAgICAgIDxNZXNzYWdlQm94IG1iPVwieGxcIiBtZXNzYWdlPVwiVGF4IHpvbmUgc2F2ZWQgc3VjY2Vzc2Z1bGx5IVwiIHZhcmlhbnQ9XCJzdWNjZXNzXCIgLz5cbiAgICAgICl9XG4gICAgICBcbiAgICAgIDxCb3ggbWI9XCJ4bFwiPlxuICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5OYW1lPC9MYWJlbD5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICBuYW1lPVwibmFtZVwiXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEubmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8VGV4dCBtdD1cInNtXCIgYXM9XCJwXCIgZm9udFNpemU9XCJzbVwiIGNvbG9yPVwiZ3JleTgwXCI+XG4gICAgICAgICAgICBFeGFtcGxlczogRVUgWm9uZSwgVUssIE5vcnRoIEFtZXJpY2EsIGV0Yy5cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+Wm9uZSBUeXBlPC9MYWJlbD5cbiAgICAgICAgICA8U3RhdHVzU2VsZWN0XG4gICAgICAgICAgICBuYW1lPVwiem9uZV90eXBlXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS56b25lX3R5cGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJjb3VudHJ5XCI+Q291bnRyeTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInN0YXRlXCI+U3RhdGUvUmVnaW9uPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicG9zdGNvZGVcIj5Qb3N0Y29kZS9aSVA8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJjdXN0b21lcl9ncm91cFwiPkN1c3RvbWVyIEdyb3VwPC9vcHRpb24+XG4gICAgICAgICAgPC9TdGF0dXNTZWxlY3Q+XG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGFzPVwicFwiIGZvbnRTaXplPVwic21cIiBjb2xvcj1cImdyZXk4MFwiPlxuICAgICAgICAgICAgRGV0ZXJtaW5lcyBob3cgdGhpcyB6b25lIHdpbGwgYmUgYXBwbGllZC5cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+UHJpY2UgRGlzcGxheTwvTGFiZWw+XG4gICAgICAgICAgPFN0YXR1c1NlbGVjdFxuICAgICAgICAgICAgbmFtZT1cInByaWNlX2Rpc3BsYXlcIlxuICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnByaWNlX2Rpc3BsYXl9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ0YXhfaW5jbHVzaXZlXCI+VGF4IEluY2x1c2l2ZTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInRheF9leGNsdXNpdmVcIj5UYXggRXhjbHVzaXZlPC9vcHRpb24+XG4gICAgICAgICAgPC9TdGF0dXNTZWxlY3Q+XG4gICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGFzPVwicFwiIGZvbnRTaXplPVwic21cIiBjb2xvcj1cImdyZXk4MFwiPlxuICAgICAgICAgICAgSG93IHNob3VsZCBwcmljZXMgYmUgZGlzcGxheWVkIGluIHRoaXMgem9uZS5cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICBcbiAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICA8TGFiZWw+QWN0aXZlPC9MYWJlbD5cbiAgICAgICAgICA8Qm94IG10PVwiZGVmYXVsdFwiPlxuICAgICAgICAgICAgPFN3aXRjaFxuICAgICAgICAgICAgICBuYW1lPVwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17Zm9ybURhdGEuYWN0aXZlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgXG4gICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgPExhYmVsPkRlZmF1bHQgWm9uZTwvTGFiZWw+XG4gICAgICAgICAgPEJveCBtdD1cImRlZmF1bHRcIj5cbiAgICAgICAgICAgIDxTd2l0Y2hcbiAgICAgICAgICAgICAgbmFtZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtmb3JtRGF0YS5kZWZhdWx0fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFRleHQgbXQ9XCJzbVwiIGFzPVwicFwiIGZvbnRTaXplPVwic21cIiBjb2xvcj1cImdyZXk4MFwiPlxuICAgICAgICAgICAgICBJZiBlbmFibGVkLCB0aGlzIHpvbmUgd2lsbCBiZSB1c2VkIGFzIHRoZSBkZWZhdWx0IHdoZW4gbm8gb3RoZXIgem9uZSBtYXRjaGVzLlxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICA8Qm94PlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgdHlwZT1cInN1Ym1pdFwiIGRpc2FibGVkPXtsb2FkaW5nfT5cbiAgICAgICAgICB7bG9hZGluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUgVGF4IFpvbmUnfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGF4Wm9uZUZvcm07ICIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBMYWJlbCxJbnB1dCwgU2VsZWN0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cblxuY29uc3QgQXR0cmlidXRlR3JvdXBGb3JtID0gKHByb3BzOiBhbnkpID0+IHtcbiAgY29uc3QgeyByZWNvcmQsIG9uQ2hhbmdlIH0gPSBwcm9wcztcbiAgY29uc3QgW25hbWUsIHNldE5hbWVdID0gdXNlU3RhdGUocmVjb3JkPy5wYXJhbXM/Lm5hbWUgPyBKU09OLnN0cmluZ2lmeShyZWNvcmQucGFyYW1zLm5hbWUpIDogJycpO1xuICBjb25zdCBbaGFuZGxlLCBzZXRIYW5kbGVdID0gdXNlU3RhdGUocmVjb3JkPy5wYXJhbXM/LmhhbmRsZSB8fCAnJyk7XG4gIGNvbnN0IFtwb3NpdGlvbiwgc2V0UG9zaXRpb25dID0gdXNlU3RhdGUocmVjb3JkPy5wYXJhbXM/LnBvc2l0aW9uIHx8IDApO1xuICBjb25zdCBbYXR0cmlidXRhYmxlVHlwZSwgc2V0QXR0cmlidXRhYmxlVHlwZV0gPSB1c2VTdGF0ZShyZWNvcmQ/LnBhcmFtcz8uYXR0cmlidXRhYmxlX3R5cGUgfHwgJycpO1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIG5hbWU6IEpTT04ucGFyc2UobmFtZSksXG4gICAgICBoYW5kbGUsXG4gICAgICBwb3NpdGlvbjogcGFyc2VJbnQocG9zaXRpb24pLFxuICAgICAgYXR0cmlidXRhYmxlX3R5cGU6IGF0dHJpYnV0YWJsZVR5cGUsXG4gICAgfTtcbiAgICBvbkNoYW5nZShkYXRhKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggYXM9XCJmb3JtXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XG4gICAgICA8Qm94IG1iPVwieGxcIj5cbiAgICAgICAgPExhYmVsPk5hbWUgKEpTT04pPC9MYWJlbD5cbiAgICAgICAgPElucHV0XG4gICAgICAgICAgdmFsdWU9e25hbWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj0ne1wiZW5cIjogXCJHcm91cCBOYW1lXCJ9J1xuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG4gICAgICBcbiAgICAgIDxCb3ggbWI9XCJ4bFwiPlxuICAgICAgICA8TGFiZWw+SGFuZGxlPC9MYWJlbD5cbiAgICAgICAgPElucHV0XG4gICAgICAgICAgdmFsdWU9e2hhbmRsZX1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEhhbmRsZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cblxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxMYWJlbD5Qb3NpdGlvbjwvTGFiZWw+XG4gICAgICAgIDxJbnB1dFxuICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgIHZhbHVlPXtwb3NpdGlvbn1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBvc2l0aW9uKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuXG4gICAgICA8Qm94IG1iPVwieGxcIj5cbiAgICAgICAgPExhYmVsPkF0dHJpYnV0YWJsZSBUeXBlPC9MYWJlbD5cbiAgICAgICAgPFNlbGVjdFxuICAgICAgICAgIHZhbHVlPXthdHRyaWJ1dGFibGVUeXBlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QXR0cmlidXRhYmxlVHlwZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgb3B0aW9ucz17W1xuICAgICAgICAgICAgeyB2YWx1ZTogJ3Byb2R1Y3QnLCBsYWJlbDogJ1Byb2R1Y3QnIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiAnY29sbGVjdGlvbicsIGxhYmVsOiAnQ29sbGVjdGlvbicgfVxuICAgICAgICAgIF19XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cblxuICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2F2ZTwvQnV0dG9uPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXR0cmlidXRlR3JvdXBGb3JtOyIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IEF0dHJpYnV0ZUVkaXRvciBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9hdHRyaWJ1dGUtZWRpdG9yJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5BdHRyaWJ1dGVFZGl0b3IgPSBBdHRyaWJ1dGVFZGl0b3JcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBQcm9kdWN0Rm9ybSBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9wcm9kdWN0LWZvcm0nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlByb2R1Y3RGb3JtID0gUHJvZHVjdEZvcm1cbmltcG9ydCBQcm9kdWN0VmFyaWFudEZvcm0gZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvcHJvZHVjdC12YXJpYW50LWZvcm0nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlByb2R1Y3RWYXJpYW50Rm9ybSA9IFByb2R1Y3RWYXJpYW50Rm9ybVxuaW1wb3J0IENvbGxlY3Rpb25Gb3JtIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tZm9ybSdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29sbGVjdGlvbkZvcm0gPSBDb2xsZWN0aW9uRm9ybVxuaW1wb3J0IEN1c3RvbWVyRm9ybSBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9jdXN0b21lci1mb3JtJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DdXN0b21lckZvcm0gPSBDdXN0b21lckZvcm1cbmltcG9ydCBDdXN0b21lclN0YXRpc3RpY3MgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvY3VzdG9tZXItc3RhdGlzdGljcydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ3VzdG9tZXJTdGF0aXN0aWNzID0gQ3VzdG9tZXJTdGF0aXN0aWNzXG5pbXBvcnQgRGlzY291bnRGb3JtIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL2Rpc2NvdW50LWZvcm0nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRpc2NvdW50Rm9ybSA9IERpc2NvdW50Rm9ybVxuaW1wb3J0IERpc2NvdW50U3RhdGlzdGljcyBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9kaXNjb3VudC1zdGF0aXN0aWNzJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EaXNjb3VudFN0YXRpc3RpY3MgPSBEaXNjb3VudFN0YXRpc3RpY3NcbmltcG9ydCBPcmRlckZvcm0gZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvb3JkZXItZm9ybSdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuT3JkZXJGb3JtID0gT3JkZXJGb3JtXG5pbXBvcnQgQnJhbmRGb3JtIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL2JyYW5kLWZvcm0nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkJyYW5kRm9ybSA9IEJyYW5kRm9ybVxuaW1wb3J0IEN1c3RvbWVyR3JvdXBGb3JtIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL2N1c3RvbWVyLWdyb3VwLWZvcm0nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkN1c3RvbWVyR3JvdXBGb3JtID0gQ3VzdG9tZXJHcm91cEZvcm1cbmltcG9ydCBDYXJ0Rm9ybSBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9jYXJ0LWZvcm0nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNhcnRGb3JtID0gQ2FydEZvcm1cbmltcG9ydCBUYXhSYXRlRm9ybSBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy90YXgtcmF0ZS1mb3JtJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5UYXhSYXRlRm9ybSA9IFRheFJhdGVGb3JtXG5pbXBvcnQgUHJvZHVjdFR5cGVGb3JtIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL3Byb2R1Y3QtdHlwZS1mb3JtJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Qcm9kdWN0VHlwZUZvcm0gPSBQcm9kdWN0VHlwZUZvcm1cbmltcG9ydCBUYXhDbGFzc0Zvcm0gZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvdGF4LWNsYXNzLWZvcm0nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlRheENsYXNzRm9ybSA9IFRheENsYXNzRm9ybVxuaW1wb3J0IFRheFpvbmVGb3JtIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL3RheC16b25lLWZvcm0nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlRheFpvbmVGb3JtID0gVGF4Wm9uZUZvcm1cbmltcG9ydCBBdHRyaWJ1dGVHcm91cEZvcm0gZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvYXR0cmlidXRlLWdyb3VwLWZvcm0nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkF0dHJpYnV0ZUdyb3VwRm9ybSA9IEF0dHJpYnV0ZUdyb3VwRm9ybSJdLCJuYW1lcyI6WyJyZWFjdElzX2RldmVsb3BtZW50IiwicmVhY3RJc01vZHVsZSIsInJlcXVpcmUkJDAiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJyZXF1aXJlJCQ0IiwicmVxdWlyZSQkNiIsIlRleHRJbnB1dCIsInN0eWxlZCIsImlucHV0IiwiU3dpdGNoIiwiYXR0cnMiLCJ0eXBlIiwiQXR0cmlidXRlRmllbGQiLCJhdHRyaWJ1dGUiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiaGFuZGxlIiwibmFtZSIsInJlcXVpcmVkIiwiY29uZmlndXJhdGlvbiIsImpzb25OYW1lIiwiZW4iLCJPYmplY3QiLCJ2YWx1ZXMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJGb3JtR3JvdXAiLCJMYWJlbCIsIl9leHRlbmRzIiwiaWQiLCJlIiwidGFyZ2V0IiwicGFyc2VGbG9hdCIsIlRleHRBcmVhIiwic3BsaXQiLCJtYXAiLCJpdGVtIiwidHJpbSIsIkFycmF5IiwiaXNBcnJheSIsImpvaW4iLCJjaGVja2VkIiwiQm94IiwidXJsIiwibWIiLCJzcmMiLCJhbHQiLCJzdHlsZSIsIm1heFdpZHRoIiwibWF4SGVpZ2h0IiwicGxhY2Vob2xkZXIiLCJtYXJnaW5Ub3AiLCJBdHRyaWJ1dGVFZGl0b3IiLCJwcm9wcyIsInJlY29yZCIsImF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGVzIiwidXNlU3RhdGUiLCJhdHRyaWJ1dGVWYWx1ZXMiLCJzZXRBdHRyaWJ1dGVWYWx1ZXMiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJ1c2VFZmZlY3QiLCJmZXRjaEF0dHJpYnV0ZXMiLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJkYXRhIiwianNvbiIsInBhcmFtcyIsImF0dHJpYnV0ZV9kYXRhIiwiaW5pdGlhbFZhbHVlcyIsIkpTT04iLCJwYXJzZSIsImNvbnNvbGUiLCJtZXNzYWdlIiwia2V5cyIsImxlbmd0aCIsImhhbmRsZUF0dHJpYnV0ZUNoYW5nZSIsInByZXYiLCJnZXRBdHRyaWJ1dGVUeXBlIiwiZmluZCIsImF0dHIiLCJMb2FkZXIiLCJUZXh0IiwibXQiLCJNZXNzYWdlQm94IiwidmFyaWFudCIsIkgzIiwiYXR0cmlidXRlRGF0YSIsImtleSIsImRlc2NyaXB0aW9uIiwiY29sb3IiLCJDdXN0b21lclN0YXRpc3RpY3MiLCJzdGF0aXN0aWNzIiwic2V0U3RhdGlzdGljcyIsImZldGNoU3RhdGlzdGljcyIsImVycm9yRGF0YSIsInAiLCJ0ZXh0QWxpZ24iLCJJbGx1c3RyYXRpb24iLCJ3aWR0aCIsImhlaWdodCIsIkg0IiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJmbGV4V3JhcCIsImZsZXgiLCJiZyIsIm1yIiwiYm94U2hhZG93IiwiSDUiLCJqdXN0aWZ5Q29udGVudCIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsInRvdGFsQ3VzdG9tZXJzIiwibmV3Q3VzdG9tZXJzIiwidG9wQ3VzdG9tZXIiLCJvcmRlckNvdW50IiwiY3VzdG9tZXJzQnlHcm91cCIsImdyb3VwIiwiYm9yZGVyQm90dG9tIiwiYm9yZGVyQ29sb3IiLCJjb3VudCIsIkRhc2hib2FyZCIsInNldERhdGEiLCJwcm9kdWN0cyIsIm9yZGVycyIsImN1c3RvbWVycyIsInJldmVudWUiLCJmZXRjaERhc2hib2FyZERhdGEiLCJqc29uRGF0YSIsImZvcm1hdHRlZFJldmVudWUiLCJ0b0ZpeGVkIiwicG9zaXRpb24iLCJvdmVyZmxvdyIsInRvcCIsImxlZnQiLCJvcGFjaXR5IiwiekluZGV4IiwiSDIiLCJhcyIsImhyZWYiLCJ0ZXh0RGVjb3JhdGlvbiIsImJvcmRlclJhZGl1cyIsIkJ1dHRvbiIsIlN0YXR1c1NlbGVjdCIsInNlbGVjdCIsIlByb2R1Y3RGb3JtIiwicmVzb3VyY2UiLCJhY3Rpb24iLCJpc0VkaXRpbmciLCJzdWNjZXNzIiwic2V0U3VjY2VzcyIsImZvcm1EYXRhIiwic2V0Rm9ybURhdGEiLCJwcm9kdWN0X3R5cGVfaWQiLCJzdGF0dXMiLCJjcmVhdGVEZWZhdWx0VmFyaWFudCIsInByb2R1Y3RUeXBlcyIsInNldFByb2R1Y3RUeXBlcyIsImFwaSIsIkFwaUNsaWVudCIsImZldGNoRGF0YSIsInByb2R1Y3RUeXBlc1Jlc3BvbnNlIiwicmVzb3VyY2VBY3Rpb24iLCJyZXNvdXJjZUlkIiwiYWN0aW9uTmFtZSIsInJlY29yZHMiLCJwcm9kdWN0UmVzcG9uc2UiLCJwcm9kdWN0RGF0YSIsImhhbmRsZUlucHV0Q2hhbmdlIiwicHJvcGVydHlOYW1lIiwiaGFuZGxlU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJhcGlFbmRwb2ludCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5Iiwic3RyaW5naWZ5IiwiRXJyb3IiLCJzZXRUaW1lb3V0Iiwid2luZG93IiwibG9jYXRpb24iLCJvblN1Ym1pdCIsImFsaWduSXRlbXMiLCJtbCIsInBvcHVsYXRlZCIsImVycm9ycyIsInJlY29yZEFjdGlvbnMiLCJidWxrQWN0aW9ucyIsInRpdGxlIiwiYmFzZUVycm9yIiwiZGlzYWJsZWQiLCJOdW1iZXJJbnB1dCIsIlNlbGVjdCIsIkltYWdlVXBsb2FkIiwiZGl2IiwiSW1hZ2VQcmV2aWV3Q29udGFpbmVyIiwiSW1hZ2VQcmV2aWV3IiwiUHJvZHVjdFZhcmlhbnRGb3JtIiwicHJvZHVjdF9pZCIsInNrdSIsInN0b2NrIiwidW5pdF9xdWFudGl0eSIsImJhY2tvcmRlciIsInB1cmNoYXNhYmxlIiwiaW1hZ2VzIiwic2V0SW1hZ2VzIiwiZXhpc3RpbmdJbWFnZXMiLCJzZXRFeGlzdGluZ0ltYWdlcyIsInNldFByb2R1Y3RzIiwicHJvZHVjdHNSZXNwb25zZSIsInZhcmlhbnRSZXNwb25zZSIsInZhcmlhbnREYXRhIiwiaW1hZ2VzUmVzcG9uc2UiLCJpbWFnZXNEYXRhIiwiTnVtYmVyIiwiaGFuZGxlSW1hZ2VTZWxlY3QiLCJmaWxlcyIsImZyb20iLCJuZXdJbWFnZXMiLCJmaWxlIiwicHJldmlldyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInJlbW92ZUltYWdlIiwiaW5kZXgiLCJmaWx0ZXIiLCJfIiwiaSIsInJlbW92ZUV4aXN0aW5nSW1hZ2UiLCJpbWFnZUlkIiwiaW1nIiwidmFyaWFudElkIiwiRm9ybURhdGEiLCJmb3JFYWNoIiwiYXBwZW5kIiwidXBsb2FkUmVzcG9uc2UiLCJwcm9kdWN0IiwibWluIiwiYWNjZXB0IiwibXVsdGlwbGUiLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwiRnJhZ21lbnQiLCJQcm9kdWN0U2VsZWN0IiwiQ29sbGVjdGlvbkZvcm0iLCJjb2xsZWN0aW9uX2dyb3VwX2lkIiwicGFyZW50X2lkIiwic29ydCIsInByb2R1Y3RfaWRzIiwiZ3JvdXBzIiwic2V0R3JvdXBzIiwiY29sbGVjdGlvbnMiLCJzZXRDb2xsZWN0aW9ucyIsImdyb3Vwc1Jlc3BvbnNlIiwiZ3JvdXBzRGF0YSIsImNvbGxlY3Rpb25zUmVzcG9uc2UiLCJjb2xsZWN0aW9uUmVzcG9uc2UiLCJjb2xsZWN0aW9uRGF0YSIsInNlbGVjdGVkT3B0aW9ucyIsIm9wdGlvbiIsImMiLCJjb2xsZWN0aW9uIiwiQ3VzdG9tZXJGb3JtIiwiaGFuZGxlQ2hhbmdlIiwic3VibWl0IiwidXNlUmVjb3JkIiwidHJhbnNsYXRlQnV0dG9uIiwidXNlVHJhbnNsYXRpb24iLCJzZXRNZXNzYWdlIiwidGV4dCIsImN1c3RvbWVyR3JvdXBzIiwic2V0Q3VzdG9tZXJHcm91cHMiLCJzZWxlY3RlZEdyb3VwcyIsInNldFNlbGVjdGVkR3JvdXBzIiwiZmV0Y2hDdXN0b21lckdyb3VwcyIsImZldGNoQ3VzdG9tZXJEYXRhIiwiaGFuZGxlR3JvdXBzQ2hhbmdlIiwiZXZlbnQiLCJudW1WYWx1ZSIsInBhcnNlSW50IiwiaW5jbHVkZXMiLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwiZW1haWwiLCJwaG9uZSIsImNvbXBhbnlfbmFtZSIsInZhdF9ubyIsImdyb3VwX2lkcyIsIm1ldGEiLCJ0aGVuIiwicmVsb2FkIiwiaGFuZGxlQW5vbnltaXplIiwiY29uZmlybSIsIm1hcmdpbkJvdHRvbSIsIlNlY3Rpb24iLCJJbnB1dCIsIkNoZWNrQm94IiwidG9TdHJpbmciLCJpbmxpbmUiLCJodG1sRm9yIiwiRGlzY291bnRGb3JtIiwic2VsZWN0ZWRQcm9kdWN0cyIsInNldFNlbGVjdGVkUHJvZHVjdHMiLCJzZWxlY3RlZENvbGxlY3Rpb25zIiwic2V0U2VsZWN0ZWRDb2xsZWN0aW9ucyIsInNlbGVjdGVkQ3VzdG9tZXJHcm91cHMiLCJzZXRTZWxlY3RlZEN1c3RvbWVyR3JvdXBzIiwiZGlzY291bnRUeXBlIiwic2V0RGlzY291bnRUeXBlIiwic3RhcnREYXRlIiwic2V0U3RhcnREYXRlIiwiRGF0ZSIsImVuZERhdGUiLCJzZXRFbmREYXRlIiwiaXNBY3RpdmUiLCJzZXRJc0FjdGl2ZSIsInByb2R1Y3RzRGF0YSIsImNvbGxlY3Rpb25zRGF0YSIsImZldGNoRGlzY291bnREYXRhIiwiaXNfYWN0aXZlIiwic3RhcnRzX2F0IiwiZW5kc19hdCIsImhhbmRsZVByb2R1Y3RDaGFuZ2UiLCJoYW5kbGVDb2xsZWN0aW9uQ2hhbmdlIiwiaGFuZGxlQ3VzdG9tZXJHcm91cENoYW5nZSIsImZvcm1hdHRlZFN0YXJ0RGF0ZSIsInRvSVNPU3RyaW5nIiwiZm9ybWF0dGVkRW5kRGF0ZSIsImNvZGUiLCJtaW5fb3JkZXJfdmFsdWUiLCJtYXhfdXNlcyIsImNvbGxlY3Rpb25faWRzIiwiY3VzdG9tZXJfZ3JvdXBfaWRzIiwiaGFuZGxlU3RhcnREYXRlQ2hhbmdlIiwiaGFuZGxlRW5kRGF0ZUNoYW5nZSIsInN0ZXAiLCJEYXRlUGlja2VyIiwiYm9yZGVyIiwiRGlzY291bnRTdGF0aXN0aWNzIiwiZm9ybWF0Q3VycmVuY3kiLCJhbW91bnQiLCJ0b3RhbERpc2NvdW50cyIsImFjdGl2ZURpc2NvdW50cyIsInRvdGFsRGlzY291bnRBbW91bnQiLCJtb3N0VXNlZERpc2NvdW50IiwidXNlZENvdW50IiwicHkiLCJweCIsIk9yZGVyRm9ybSIsImN1c3RvbWVyX2lkIiwiY2hhbm5lbF9pZCIsInJlZmVyZW5jZSIsImN1c3RvbWVyX3JlZmVyZW5jZSIsInN1Yl90b3RhbCIsImRpc2NvdW50X3RvdGFsIiwic2hpcHBpbmdfdG90YWwiLCJ0YXhfdG90YWwiLCJ0b3RhbCIsIm5vdGVzIiwiY3VycmVuY3lfY29kZSIsImNvbXBhcmVfY3VycmVuY3lfY29kZSIsImV4Y2hhbmdlX3JhdGUiLCJzZXRDdXN0b21lcnMiLCJjaGFubmVscyIsInNldENoYW5uZWxzIiwiY3VzdG9tZXJzUmVzcG9uc2UiLCJ3YXJuIiwiY2hhbm5lbHNSZXNwb25zZSIsImNhbGN1bGF0ZVRvdGFsIiwic3ViVG90YWwiLCJkaXNjb3VudFRvdGFsIiwic2hpcHBpbmdUb3RhbCIsInRheFRvdGFsIiwiY3VzdG9tZXIiLCJjaGFubmVsIiwiQnJhbmRGb3JtIiwiQ3VzdG9tZXJHcm91cEZvcm0iLCJpc19kZWZhdWx0IiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiQ2FydEZvcm0iLCJ1c2VyX2lkIiwibWVyZ2VkX2lkIiwiY3VycmVuY3lfaWQiLCJjb3Vwb25fY29kZSIsImNvbXBsZXRlZF9hdCIsInVzZXJzIiwic2V0VXNlcnMiLCJjdXJyZW5jaWVzIiwic2V0Q3VycmVuY2llcyIsInVzZXJzUmVzcG9uc2UiLCJjdXJyZW5jaWVzUmVzcG9uc2UiLCJ1c2VyIiwiY3VycmVuY3kiLCJzbGljZSIsIlRheFJhdGVGb3JtIiwidGF4X2NsYXNzX2lkIiwidGF4X3pvbmVfaWQiLCJwcmlvcml0eSIsInRheENsYXNzZXMiLCJzZXRUYXhDbGFzc2VzIiwidGF4Wm9uZXMiLCJzZXRUYXhab25lcyIsInRheENsYXNzZXNSZXNwb25zZSIsInRheFpvbmVzUmVzcG9uc2UiLCJQcm9taXNlIiwiYWxsIiwidGF4Q2xhc3MiLCJ0YXhab25lIiwiUHJvZHVjdFR5cGVGb3JtIiwiVGF4Q2xhc3NGb3JtIiwiVGF4Wm9uZUZvcm0iLCJ6b25lX3R5cGUiLCJwcmljZV9kaXNwbGF5IiwiYWN0aXZlIiwiZGVmYXVsdCIsIkF0dHJpYnV0ZUdyb3VwRm9ybSIsInNldE5hbWUiLCJzZXRIYW5kbGUiLCJzZXRQb3NpdGlvbiIsImF0dHJpYnV0YWJsZVR5cGUiLCJzZXRBdHRyaWJ1dGFibGVUeXBlIiwiYXR0cmlidXRhYmxlX3R5cGUiLCJvcHRpb25zIiwibGFiZWwiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFZMkM7RUFDM0MsRUFBRSxDQUFDLFdBQVc7O0VBR2Q7RUFDQTtFQUNBO0VBQ0E7RUFDQSxJQUFJLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO0VBQ3BELElBQUksaUJBQWlCLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7RUFDbEQsSUFBSSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0VBQ3RELElBQUksc0JBQXNCLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztF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RSxDQUFDLEVBQUU7RUFDakMsVUFBVSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0VBQ3RDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtFQUNsRDtFQUNBOztFQUVBOztFQUVBLElBQUksT0FBTyxDQUFDO0VBQ1o7O0VBRUEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN0QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0VBQzNCLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7RUFFaEQsSUFBSSxRQUFRLENBQUM7RUFDYixNQUFNLEtBQUssRUFBRTtFQUNiLFFBQVEsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztFQUU1QyxNQUFNLEtBQUssRUFBRTtFQUNiLFFBQVEsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7RUFFdkQsTUFBTTtFQUNOLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7RUFDbEg7O0VBRUEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDO0VBQ2hCOztFQUVBLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3pCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUc7RUFDbkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDOztFQUVqQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtFQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7RUFDakQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUc7RUFDNUMsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7RUFDbkU7O0VBRUEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDOztFQUVoRCxJQUFJLFFBQVEsQ0FBQztFQUNiLE1BQU0sS0FBSyxJQUFJO0VBQ2YsUUFBUSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7O0VBRS9ELE1BQU0sS0FBSyxHQUFHO0VBQ2QsUUFBUSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7O0VBRS9ELE1BQU0sS0FBSyxHQUFHO0VBQ2QsUUFBUSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7O0VBRS9ELE1BQU0sS0FBSyxJQUFJO0VBQ2YsUUFBUSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFOztFQUVyQyxNQUFNLEtBQUssR0FBRztFQUNkLE1BQU0sS0FBSyxHQUFHO0VBQ2QsUUFBUSxPQUFPLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7RUFFakMsTUFBTSxLQUFLLEdBQUc7RUFDZCxRQUFRLE9BQU8sVUFBVSxHQUFHLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUM7O0VBRS9DLE1BQU0sS0FBSyxJQUFJO0VBQ2YsTUFBTSxLQUFLLEdBQUc7RUFDZCxRQUFRLE9BQU8sVUFBVSxHQUFHLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQzs7RUFFNUQsTUFBTSxLQUFLLEdBQUc7RUFDZCxRQUFRLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUM7RUFDN0QsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FB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Qzs7RUFFOUMsTUFBTSxLQUFLLElBQUk7RUFDZixRQUFRLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFOztFQUUzQyxNQUFNLEtBQUssR0FBRztFQUNkLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRTtFQUMvQixRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFOztFQUVwRyxRQUFRLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDM0QsVUFBVSxLQUFLLEdBQUc7RUFDbEIsWUFBWSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFOztFQUV2QyxVQUFVLEtBQUssR0FBRztFQUNsQixZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7RUFDdEQsWUFBWTs7RUFFWixVQUFVLEtBQUssR0FBRztFQUNsQixVQUFVLEtBQUssR0FBRztFQUNsQixZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxVQUFVLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxTQUFTLEdBQUcsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztFQUNySzs7RUFFQSxRQUFRLE9BQU8sQ0FBQyxHQUFHLEdBQUc7O0VBRXRCLE1BQU0sS0FBSyxHQUFHO0VBQ2QsUUFBUSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7RUFDM0QsVUFBVSxLQUFLLEdBQUc7RUFDbEIsWUFBWSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxVQUFVLEdBQUcsQ0FBQyxHQUFHLGNBQWMsR0FBRyxDQUFDLEdBQUcsV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDOztFQUV6RyxVQUFVLEtBQUssR0FBRztFQUNsQixZQUFZLE9BQU8sVUFBVSxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDOztFQUU1RSxVQUFVO0VBQ1YsWUFBWSxPQUFPLFVBQVUsR0FBRyxDQUFDLEdBQUcsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDO0VBQzdHO0VBQ0EsUUFBUTs7RUFFUixNQUFNLEtBQUssR0FBRztFQUNkLE1BQU0sS0FBSyxHQUFHO0VBQ2QsUUFBUSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFOztFQUUvRCxNQUFNLEtBQUssR0FBRztFQUNkLE1BQU0sS0FBSyxHQUFHO0VBQ2QsUUFBUSxJQUFJLElBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDalIsUUFBUTs7RUFFUixNQUFNLEtBQUssR0FBRztFQUNkLFFBQVEsSUFBSSxDQUFDLEdBQUcsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUM7RUFDNU87O0VBRUEs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QUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsaUJBQWlCLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBMkMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxPQUFPLEVBQUUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsT0FBQSxDQUFBLEdBQUEsQ0FBWSxpQkFBaUIsRUFBRSxPQUFZLENBQUEsR0FBQSxDQUFBLE9BQU8sQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLE9BQU8sTUFBTSxFQUFFLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsT0FBTyxPQUFPLEVBQUUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTSxHQUFHLE9BQVksQ0FBQSxHQUFBLENBQUEsMkJBQTJCLEVBQUUsRUFBRSxHQUFHLFlBQVksMkJBQTJCLENBQUMsT0FBTyxHQUFHLFlBQVksMkJBQTJCLEVBQUUsT0FBWSxDQUFBLEdBQUEsQ0FBQSwyQkFBMkIsQ0FBQyxNQUFNLEdBQUcsWUFBWSxpQkFBaUIsRUFBRSxFQUFFLEdBQUcsT0FBQSxDQUFBLEdBQUEsQ0FBWSxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsT0FBQSxDQUFBLEdBQUEsQ0FBWSxpQkFBaUIsRUFBRSxPQUFBLENBQUEsR0FBQSxDQUFZLGlCQUFpQixDQUFDLFlBQVksR0FBRyxhQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBcUMsQ0FBQyxDQUFDLENBQUMsdURBQXVELENBQUMsQ0FBQyxDQUFDLCtQQUErUCxDQUFDLENBQUMsQ0FBQyxxSEFBcUgsQ0FBQyxDQUFDLENBQUMscU1BQXFNLENBQUMsQ0FBQyxDQUFDLGlLQUFpSyxDQUFDLENBQUMsQ0FBQywyT0FBMk8sQ0FBQyxDQUFDLENBQUMsb0hBQW9ILENBQUMsQ0FBQyxDQUFDLDZEQUE2RCxDQUFDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxFQUFFLENBQUMsZ1VBQWdVLENBQUMsRUFBRSxDQUFDLHVOQUF1TixDQUFDLEVBQUUsQ0FBQyxvV0FBb1csQ0FBQyxFQUFFLENBQUMsd0xBQXdMLENBQUMsRUFBRSxDQUFDLDhDQUE4QyxDQUFDLEVBQUUsQ0FBQywwWkFBMFosQ0FBQyxFQUFFLENBQUMsc1FBQXNRLENBQUMsRUFBRSxDQUFDLHdJQUF3SSxDQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFxSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQTRDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFNLFdBQVcsRUFBRSxPQUFPLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTSxNQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFFLENBQUMsT0FBTSxNQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLGNBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLE1BQUUsQ0FBQyxPQUFNLEtBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLGFBQW9ELENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQW9DLENBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUksR0FBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFxQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUEyQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtMQUFrTCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBd0MsQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsd05BQXdOLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLHVDQUF1QyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQXdDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTSxXQUFXLEdBQUcsQ0FBQyxFQUFFLGFBQWEsR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBc0MsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQTJDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQXNDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQXFDLENBQUMsQ0FBQyxrQkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsR0FBRyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUF1QyxDQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBRSxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdRQUFnUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFFLENBQUMsY0FBYyxDQUFDLElBQUUsQ0FBQyxXQUFXLENBQUMsSUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFFLENBQUMsYUFBYSxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFzQyxXQUFXLEVBQUUsT0FBTyxTQUFTLEVBQUUsYUFBYSxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxzTkFBc04sQ0FBQyxDQUFxRSxXQUFXLEVBQUUsT0FBTyxNQUFNLEdBQUcsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsNEJBQTRCLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLDBUQUEwVCxDQUFDLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsNEJBQUEsQ0FBQSxnQkFBd0IsQ0FBQyxFQUFFLENBQTJCLDRCQUFBLENBQUEsa0JBQUEsQ0FBQyxFQUFFLENBQTBCLDRCQUFBLENBQUEsaUJBQUEsQ0FBQyxFQUFFLENBQUMsNEJBQUEsQ0FBQSxpQkFBeUIsQ0FBQyxFQUFFLENBQUMsNEJBQUEsQ0FBQSxhQUFxQixDQUFDLEVBQUUsQ0FBQyw0QkFBQSxDQUFBLFlBQW9CLENBQUMsRUFBRSxDQUFDLDRCQUFBLENBQUEsYUFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUEyQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBb0IsNEJBQUEsQ0FBQSxXQUFBLENBQUMsRUFBRSxDQUEwQiw0QkFBQSxDQUFBLGlCQUFBLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQTJDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxtRUFBbUUsQ0FBQyxDQUFzQyxDQUFDLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTSxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsOFVBQThVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQTJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsNEJBQUEsQ0FBQSxHQUFXLENBQUMsRUFBRSxDQUFDLFFBQUEsR0FBQSw0QkFBQSxDQUFBLE9BQWUsQ0FBQyxFQUFFLENBQTBCLDRCQUFBLENBQUEsaUJBQUEsQ0FBQyxDQUFDLENBQWtCLDRCQUFBLENBQUEsU0FBQSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQXNDLFdBQVcsRUFBRSxPQUFPLFNBQVMsRUFBRSxhQUFhLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLGlIQUFpSCxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVB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R0FBR0Esa0JBQWtCO0VBRTlEK1UsT0FBTyxDQUFDQyxjQUFjLENBQUM5SCxZQUFZLEdBQUdBLFlBQVk7RUFFbEQ2SCxPQUFPLENBQUNDLGNBQWMsQ0FBQ3hGLGtCQUFrQixHQUFHQSxrQkFBa0I7RUFFOUR1RixPQUFPLENBQUNDLGNBQWMsQ0FBQzlFLFNBQVMsR0FBR0EsU0FBUztFQUU1QzZFLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDbkQsU0FBUyxHQUFHQSxTQUFTO0VBRTVDa0QsT0FBTyxDQUFDQyxjQUFjLENBQUNsRCxpQkFBaUIsR0FBR0EsaUJBQWlCO0VBRTVEaUQsT0FBTyxDQUFDQyxjQUFjLENBQUM5QyxRQUFRLEdBQUdBLFFBQVE7RUFFMUM2QyxPQUFPLENBQUNDLGNBQWMsQ0FBQy9CLFdBQVcsR0FBR0EsV0FBVztFQUVoRDhCLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDakIsZUFBZSxHQUFHQSxlQUFlO0VBRXhEZ0IsT0FBTyxDQUFDQyxjQUFjLENBQUNoQixZQUFZLEdBQUdBLFlBQVk7RUFFbERlLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDZixXQUFXLEdBQUdBLFdBQVc7RUFFaERjLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDVixrQkFBa0IsR0FBR0Esa0JBQWtCOzs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTBdfQ==
