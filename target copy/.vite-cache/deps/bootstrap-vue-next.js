import {
  Fragment,
  Teleport,
  Transition,
  TransitionGroup,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  customRef,
  defineComponent,
  effectScope,
  getCurrentInstance,
  getCurrentScope,
  guardReactiveProps,
  h,
  inject,
  isRef,
  markRaw,
  mergeModels,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onActivated,
  onBeforeUnmount,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  provide,
  reactive,
  readonly,
  ref,
  render,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  shallowReadonly,
  shallowRef,
  toDisplayString,
  toRef,
  toValue,
  unref,
  useAttrs,
  useId,
  useModel,
  useSlots,
  useTemplateRef,
  vModelCheckbox,
  vModelRadio,
  vModelSelect,
  vShow,
  watch,
  watchEffect,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers,
} from './chunk-XS7RG5R4.js';
import './chunk-HKJ2B2AA.js';

// node_modules/bootstrap-vue-next/dist/keys-41Cw9q6f.mjs
var withBvnPrefix = (value, suffix = '') => {
  const suffixWithTrail = `${suffix}___`;
  return `___BVN__ID__${value}__${suffix ? suffixWithTrail : ''}`;
};
var createBvnInjectionKey = name => withBvnPrefix(name);
var createBvnPluginInjectionKey = name => withBvnPrefix(`${name}__plugin`);
var carouselInjectionKey = createBvnInjectionKey('carousel');
var tabsInjectionKey = createBvnInjectionKey('tabs');
var progressInjectionKey = createBvnInjectionKey('progress');
var listGroupInjectionKey = createBvnInjectionKey('listGroup');
var avatarGroupInjectionKey = createBvnInjectionKey('avatarGroup');
var accordionInjectionKey = createBvnInjectionKey('accordion');
var checkboxGroupKey = createBvnInjectionKey('checkboxGroup');
var radioGroupKey = createBvnInjectionKey('radioGroup');
var collapseInjectionKey = createBvnInjectionKey('collapse');
var globalShowHideStorageInjectionKey = createBvnPluginInjectionKey('globalShowHideStorage');
var dropdownInjectionKey = createBvnInjectionKey('dropdown');
var navbarInjectionKey = createBvnInjectionKey('navbar');
var rtlPluginKey = createBvnPluginInjectionKey('rtl');
var breadcrumbPluginKey = createBvnPluginInjectionKey('breadcrumbPlugin');
var modalManagerPluginKey = createBvnPluginInjectionKey('modalManager');
var defaultsKey = createBvnPluginInjectionKey('defaults');
var inputGroupKey = createBvnInjectionKey('inputGroup');
var buttonGroupKey = createBvnInjectionKey('buttonGroup');
var toastPluginKey = createBvnPluginInjectionKey('toast');
var modalControllerPluginKey = createBvnPluginInjectionKey('modalController');
var popoverPluginKey = createBvnPluginInjectionKey('popover');
var formGroupPluginKey = createBvnInjectionKey('formGroupPlugin');

// node_modules/bootstrap-vue-next/dist/src/composables/useBreadcrumb/index.mjs
var useBreadcrumb = () => ({ ...inject(breadcrumbPluginKey) });

// node_modules/bootstrap-vue-next/dist/index-D3jGjWWk.mjs
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function createSharedComposable(composable) {
  let subscribers = 0;
  let state;
  let scope;
  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = void 0;
      scope = void 0;
    }
  };
  return (...args) => {
    subscribers += 1;
    if (!scope) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  };
}
function makeDestructurable(obj, arr) {
  if (typeof Symbol !== 'undefined') {
    const clone = { ...obj };
    Object.defineProperty(clone, Symbol.iterator, {
      enumerable: false,
      value() {
        let index8 = 0;
        return {
          next: () => ({
            value: arr[index8++],
            done: index8 > arr.length,
          }),
        };
      },
    });
    return clone;
  } else {
    return Object.assign([...arr], obj);
  }
}
function toValue2(r) {
  return typeof r === 'function' ? r() : unref(r);
}
var isClient = typeof window !== 'undefined' && typeof document !== 'undefined';
typeof WorkerGlobalScope !== 'undefined' && globalThis instanceof WorkerGlobalScope;
var notNullish = val => val != null;
var toString = Object.prototype.toString;
var isObject = val => toString.call(val) === '[object Object]';
var timestamp = () => +Date.now();
var noop = () => {};
var isIOS = getIsIOS();
function getIsIOS() {
  var _a, _b;
  return (
    isClient &&
    ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) &&
    (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) ||
      (((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 &&
        /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent)))
  );
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args }))
        .then(resolve)
        .catch(reject);
    });
  }
  return wrapper;
}
var bypassFilter = invoke => {
  return invoke();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = timer2 => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  const filter = invoke => {
    const duration = toValue2(ms);
    const maxDuration = toValue2(options.maxWait);
    if (timer) _clearTimeout(timer);
    if (duration <= 0 || (maxDuration !== void 0 && maxDuration <= 0)) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer) _clearTimeout(timer);
          maxTimer = null;
          resolve(invoke());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer) _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke());
      }, duration);
    });
  };
  return filter;
}
function throttleFilter(...args) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop;
  let lastValue;
  let ms;
  let trailing;
  let leading;
  let rejectOnCancel;
  if (!isRef(args[0]) && typeof args[0] === 'object') ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0]);
  else [ms, trailing = true, leading = true, rejectOnCancel = false] = args;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
      lastRejector();
      lastRejector = noop;
    }
  };
  const filter = _invoke => {
    const duration = toValue2(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return (lastValue = _invoke());
    };
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve;
        timer = setTimeout(
          () => {
            lastExec = Date.now();
            isLeading = true;
            resolve(invoke());
            clear();
          },
          Math.max(0, duration - elapsed),
        );
      });
    }
    if (!leading && !timer) timer = setTimeout(() => (isLeading = true), duration);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter2 = (...args) => {
    if (isActive.value) extendFilter(...args);
  };
  return { isActive: readonly(isActive), pause, resume, eventFilter: eventFilter2 };
}
function cacheStringFunction(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return str => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction(str => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});
function increaseWithUnit(target, delta) {
  var _a;
  if (typeof target === 'number') return target + delta;
  const value = ((_a = target.match(/^-?\d+\.?\d*/)) == null ? void 0 : _a[0]) || '';
  const unit = target.slice(value.length);
  const result = Number.parseFloat(value) + delta;
  if (Number.isNaN(result)) return target;
  return result + unit;
}
function getLifeCycleTarget(target) {
  return getCurrentInstance();
}
function toRef2(...args) {
  if (args.length !== 1) return toRef(...args);
  const r = args[0];
  return typeof r === 'function' ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(throttleFilter(ms, trailing, leading, rejectOnCancel), fn);
}
function watchWithFilter(source, cb, options = {}) {
  const { eventFilter: eventFilter2 = bypassFilter, ...watchOptions } = options;
  return watch(source, createFilterWrapper(eventFilter2, cb), watchOptions);
}
function watchPausable(source, cb, options = {}) {
  const { eventFilter: filter, ...watchOptions } = options;
  const { eventFilter: eventFilter2, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(source, cb, {
    ...watchOptions,
    eventFilter: eventFilter2,
  });
  return { stop, pause, resume, isActive };
}
function syncRef(left, right, ...[options]) {
  const { flush = 'sync', deep = false, immediate = true, direction = 'both', transform = {} } = options || {};
  const watchers = [];
  const transformLTR = ('ltr' in transform && transform.ltr) || (v => v);
  const transformRTL = ('rtl' in transform && transform.rtl) || (v => v);
  if (direction === 'both' || direction === 'ltr') {
    watchers.push(
      watchPausable(
        left,
        newValue => {
          watchers.forEach(w => w.pause());
          right.value = transformLTR(newValue);
          watchers.forEach(w => w.resume());
        },
        { flush, deep, immediate },
      ),
    );
  }
  if (direction === 'both' || direction === 'rtl') {
    watchers.push(
      watchPausable(
        right,
        newValue => {
          watchers.forEach(w => w.pause());
          left.value = transformRTL(newValue);
          watchers.forEach(w => w.resume());
        },
        { flush, deep, immediate },
      ),
    );
  }
  const stop = () => {
    watchers.forEach(w => w.stop());
  };
  return stop;
}
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget();
  if (instance) onMounted(fn, target);
  else if (sync) fn();
  else nextTick(fn);
}
function useIntervalFn(cb, interval = 1e3, options = {}) {
  const { immediate = true, immediateCallback = false } = options;
  let timer = null;
  const isActive = ref(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue2(interval);
    if (intervalValue <= 0) return;
    isActive.value = true;
    if (immediateCallback) cb();
    clean();
    if (isActive.value) timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient) resume();
  if (isRef(interval) || typeof interval === 'function') {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient) resume();
    });
    tryOnScopeDispose(stopWatch);
  }
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume,
  };
}
function useToNumber(value, options = {}) {
  const { method = 'parseFloat', radix, nanToZero } = options;
  return computed(() => {
    let resolved = toValue2(value);
    if (typeof resolved === 'string') resolved = Number[method](resolved, radix);
    if (nanToZero && Number.isNaN(resolved)) resolved = 0;
    return resolved;
  });
}

// node_modules/bootstrap-vue-next/dist/index-Bkyn4R9C.mjs
function createReusableTemplate(options = {}) {
  const { inheritAttrs = true } = options;
  const render2 = shallowRef();
  const define = defineComponent({
    setup(_, { slots }) {
      return () => {
        render2.value = slots.default;
      };
    },
  });
  const reuse = defineComponent({
    inheritAttrs,
    setup(_, { attrs, slots }) {
      return () => {
        var _a;
        if (!render2.value && true) throw new Error('[VueUse] Failed to find the definition of reusable template');
        const vnode = (_a = render2.value) == null ? void 0 : _a.call(render2, { ...keysToCamelKebabCase(attrs), $slots: slots });
        return inheritAttrs && (vnode == null ? void 0 : vnode.length) === 1 ? vnode[0] : vnode;
      };
    },
  });
  return makeDestructurable({ define, reuse }, [define, reuse]);
}
function keysToCamelKebabCase(obj) {
  const newObj = {};
  for (const key in obj) newObj[camelize(key)] = obj[key];
  return newObj;
}
var defaultWindow = isClient ? window : void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue2(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target) return noop;
  if (!Array.isArray(events)) events = [events];
  if (!Array.isArray(listeners)) listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach(fn => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue2(options)],
    ([el, options2]) => {
      cleanup();
      if (!el) return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events.flatMap(event => {
          return listeners.map(listener => register(el, event, listener, optionsClone));
        }),
      );
    },
    { immediate: true, flush: 'post' },
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
var _iOSWorkaround = false;
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window2) return noop;
  if (isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true;
    Array.from(window2.document.body.children).forEach(el => el.addEventListener('click', noop));
    window2.document.documentElement.addEventListener('click', noop);
  }
  let shouldListen = true;
  const shouldIgnore = event => {
    return toValue2(ignore).some(target2 => {
      if (typeof target2 === 'string') {
        return Array.from(window2.document.querySelectorAll(target2)).some(el => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  function hasMultipleRoots(target2) {
    const vm = toValue2(target2);
    return vm && vm.$.subTree.shapeFlag === 16;
  }
  function checkMultipleRoots(target2, event) {
    const vm = toValue2(target2);
    const children = vm.$.subTree && vm.$.subTree.children;
    if (children == null || !Array.isArray(children)) return false;
    return children.some(child => child.el === event.target || event.composedPath().includes(child.el));
  }
  const listener = event => {
    const el = unrefElement(target);
    if (event.target == null) return;
    if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event)) return;
    if (!el || el === event.target || event.composedPath().includes(el)) return;
    if (event.detail === 0) shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  let isProcessingClick = false;
  const cleanup = [
    useEventListener(
      window2,
      'click',
      event => {
        if (!isProcessingClick) {
          isProcessingClick = true;
          setTimeout(() => {
            isProcessingClick = false;
          }, 0);
          listener(event);
        }
      },
      { passive: true, capture },
    ),
    useEventListener(
      window2,
      'pointerdown',
      e => {
        const el = unrefElement(target);
        shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
      },
      { passive: true },
    ),
    detectIframe &&
      useEventListener(window2, 'blur', event => {
        setTimeout(() => {
          var _a;
          const el = unrefElement(target);
          if (
            ((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === 'IFRAME' &&
            !(el == null ? void 0 : el.contains(window2.document.activeElement))
          ) {
            handler(event);
          }
        }, 0);
      }),
  ].filter(Boolean);
  const stop = () => cleanup.forEach(fn => fn());
  return stop;
}
function createKeyPredicate(keyFilter) {
  if (typeof keyFilter === 'function') return keyFilter;
  else if (typeof keyFilter === 'string') return event => event.key === keyFilter;
  else if (Array.isArray(keyFilter)) return event => keyFilter.includes(event.key);
  return () => true;
}
function onKeyStroke(...args) {
  let key;
  let handler;
  let options = {};
  if (args.length === 3) {
    key = args[0];
    handler = args[1];
    options = args[2];
  } else if (args.length === 2) {
    if (typeof args[1] === 'object') {
      key = true;
      handler = args[0];
      options = args[1];
    } else {
      key = args[0];
      handler = args[1];
    }
  } else {
    key = true;
    handler = args[0];
  }
  const { target = defaultWindow, eventName = 'keydown', passive = false, dedupe = false } = options;
  const predicate = createKeyPredicate(key);
  const listener = e => {
    if (e.repeat && toValue2(dedupe)) return;
    if (predicate(e)) handler(e);
  };
  return useEventListener(target, eventName, listener, passive);
}
function useMounted() {
  const isMounted = ref(false);
  const instance = getCurrentInstance();
  if (instance) {
    onMounted(() => {
      isMounted.value = true;
    }, instance);
  }
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && 'MutationObserver' in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => {
    const value = toValue2(target);
    const items = (Array.isArray(value) ? value : [value]).map(unrefElement).filter(notNullish);
    return new Set(items);
  });
  const stopWatch = watch(
    () => targets.value,
    targets2 => {
      cleanup();
      if (isSupported.value && targets2.size) {
        observer = new MutationObserver(callback);
        targets2.forEach(el => observer.observe(el, mutationOptions));
      }
    },
    { immediate: true, flush: 'post' },
  );
  const takeRecords = () => {
    return observer == null ? void 0 : observer.takeRecords();
  };
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop,
    takeRecords,
  };
}
function useRafFn(fn, options = {}) {
  const { immediate = true, fpsLimit = void 0, window: window2 = defaultWindow } = options;
  const isActive = ref(false);
  const intervalLimit = fpsLimit ? 1e3 / fpsLimit : null;
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp2) {
    if (!isActive.value || !window2) return;
    if (!previousFrameTimestamp) previousFrameTimestamp = timestamp2;
    const delta = timestamp2 - previousFrameTimestamp;
    if (intervalLimit && delta < intervalLimit) {
      rafId = window2.requestAnimationFrame(loop);
      return;
    }
    previousFrameTimestamp = timestamp2;
    fn({ delta, timestamp: timestamp2 });
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      previousFrameTimestamp = 0;
      rafId = window2.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate) resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume,
  };
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  const isSupported = useSupported(() => window2 && 'matchMedia' in window2 && typeof window2.matchMedia === 'function');
  let mediaQuery;
  const matches2 = ref(false);
  const handler = event => {
    matches2.value = event.matches;
  };
  const cleanup = () => {
    if (!mediaQuery) return;
    if ('removeEventListener' in mediaQuery) mediaQuery.removeEventListener('change', handler);
    else mediaQuery.removeListener(handler);
  };
  const stopWatch = watchEffect(() => {
    if (!isSupported.value) return;
    cleanup();
    mediaQuery = window2.matchMedia(toValue2(query));
    if ('addEventListener' in mediaQuery) mediaQuery.addEventListener('change', handler);
    else mediaQuery.addListener(handler);
    matches2.value = mediaQuery.matches;
  });
  tryOnScopeDispose(() => {
    stopWatch();
    cleanup();
    mediaQuery = void 0;
  });
  return matches2;
}
var breakpointsBootstrapV5 = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};
function useBreakpoints(breakpoints, options = {}) {
  function getValue(k, delta) {
    let v = toValue2(breakpoints[toValue2(k)]);
    if (delta != null) v = increaseWithUnit(v, delta);
    if (typeof v === 'number') v = `${v}px`;
    return v;
  }
  const { window: window2 = defaultWindow, strategy = 'min-width' } = options;
  function match(query) {
    if (!window2) return false;
    return window2.matchMedia(query).matches;
  }
  const greaterOrEqual = k => {
    return useMediaQuery(() => `(min-width: ${getValue(k)})`, options);
  };
  const smallerOrEqual = k => {
    return useMediaQuery(() => `(max-width: ${getValue(k)})`, options);
  };
  const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
    Object.defineProperty(shortcuts, k, {
      get: () => (strategy === 'min-width' ? greaterOrEqual(k) : smallerOrEqual(k)),
      enumerable: true,
      configurable: true,
    });
    return shortcuts;
  }, {});
  function current() {
    const points = Object.keys(breakpoints).map(i => [i, greaterOrEqual(i)]);
    return computed(() => points.filter(([, v]) => v.value).map(([k]) => k));
  }
  return Object.assign(shortcutMethods, {
    greaterOrEqual,
    smallerOrEqual,
    greater(k) {
      return useMediaQuery(() => `(min-width: ${getValue(k, 0.1)})`, options);
    },
    smaller(k) {
      return useMediaQuery(() => `(max-width: ${getValue(k, -0.1)})`, options);
    },
    between(a, b) {
      return useMediaQuery(() => `(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`, options);
    },
    isGreater(k) {
      return match(`(min-width: ${getValue(k, 0.1)})`);
    },
    isGreaterOrEqual(k) {
      return match(`(min-width: ${getValue(k)})`);
    },
    isSmaller(k) {
      return match(`(max-width: ${getValue(k, -0.1)})`);
    },
    isSmallerOrEqual(k) {
      return match(`(max-width: ${getValue(k)})`);
    },
    isInBetween(a, b) {
      return match(`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`);
    },
    current,
    active() {
      const bps = current();
      return computed(() => (bps.value.length === 0 ? '' : bps.value.at(-1)));
    },
  });
}
var _global =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined'
          ? self
          : {};
var globalKey = '__vueuse_ssr_handlers__';
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global)) _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function usePreferredDark(options) {
  return useMediaQuery('(prefers-color-scheme: dark)', options);
}
function guessSerializerType(rawInit) {
  return rawInit == null
    ? 'any'
    : rawInit instanceof Set
      ? 'set'
      : rawInit instanceof Map
        ? 'map'
        : rawInit instanceof Date
          ? 'date'
          : typeof rawInit === 'boolean'
            ? 'boolean'
            : typeof rawInit === 'string'
              ? 'string'
              : typeof rawInit === 'object'
                ? 'object'
                : !Number.isNaN(rawInit)
                  ? 'number'
                  : 'any';
}
var StorageSerializers = {
  boolean: {
    read: v => v === 'true',
    write: v => String(v),
  },
  object: {
    read: v => JSON.parse(v),
    write: v => JSON.stringify(v),
  },
  number: {
    read: v => Number.parseFloat(v),
    write: v => String(v),
  },
  any: {
    read: v => v,
    write: v => String(v),
  },
  string: {
    read: v => v,
    write: v => String(v),
  },
  map: {
    read: v => new Map(JSON.parse(v)),
    write: v => JSON.stringify(Array.from(v.entries())),
  },
  set: {
    read: v => new Set(JSON.parse(v)),
    write: v => JSON.stringify(Array.from(v)),
  },
  date: {
    read: v => new Date(v),
    write: v => v.toISOString(),
  },
};
var customStorageEventName = 'vueuse-storage';
function useStorage(key, defaults, storage, options = {}) {
  var _a;
  const {
    flush = 'pre',
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window: window2 = defaultWindow,
    eventFilter: eventFilter2,
    onError = e => {
      console.error(e);
    },
    initOnMounted,
  } = options;
  const data = (shallow ? shallowRef : ref)(typeof defaults === 'function' ? defaults() : defaults);
  if (!storage) {
    try {
      storage = getSSRHandler('getDefaultStorage', () => {
        var _a2;
        return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  if (!storage) return data;
  const rawInit = toValue2(defaults);
  const type = guessSerializerType(rawInit);
  const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, () => write(data.value), {
    flush,
    deep,
    eventFilter: eventFilter2,
  });
  if (window2 && listenToStorageChanges) {
    tryOnMounted(() => {
      if (storage instanceof Storage) useEventListener(window2, 'storage', update);
      else useEventListener(window2, customStorageEventName, updateFromCustomEvent);
      if (initOnMounted) update();
    });
  }
  if (!initOnMounted) update();
  function dispatchWriteEvent(oldValue, newValue) {
    if (window2) {
      const payload = {
        key,
        oldValue,
        newValue,
        storageArea: storage,
      };
      window2.dispatchEvent(
        storage instanceof Storage
          ? new StorageEvent('storage', payload)
          : new CustomEvent(customStorageEventName, {
              detail: payload,
            }),
      );
    }
  }
  function write(v) {
    try {
      const oldValue = storage.getItem(key);
      if (v == null) {
        dispatchWriteEvent(oldValue, null);
        storage.removeItem(key);
      } else {
        const serialized = serializer.write(v);
        if (oldValue !== serialized) {
          storage.setItem(key, serialized);
          dispatchWriteEvent(oldValue, serialized);
        }
      }
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(key);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null) storage.setItem(key, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === 'function') return mergeDefaults(value, rawInit);
      else if (type === 'object' && !Array.isArray(value)) return { ...rawInit, ...value };
      return value;
    } else if (typeof rawValue !== 'string') {
      return rawValue;
    } else {
      return serializer.read(rawValue);
    }
  }
  function update(event) {
    if (event && event.storageArea !== storage) return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== key) return;
    pauseWatch();
    try {
      if ((event == null ? void 0 : event.newValue) !== serializer.write(data.value)) data.value = read(event);
    } catch (e) {
      onError(e);
    } finally {
      if (event) nextTick(resumeWatch);
      else resumeWatch();
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  return data;
}
var CSS_DISABLE_TRANS =
  '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}';
function useColorMode(options = {}) {
  const {
    selector = 'html',
    attribute = 'class',
    initialValue = 'auto',
    window: window2 = defaultWindow,
    storage,
    storageKey = 'vueuse-color-scheme',
    listenToStorageChanges = true,
    storageRef,
    emitAuto,
    disableTransition = true,
  } = options;
  const modes = {
    auto: '',
    light: 'light',
    dark: 'dark',
    ...(options.modes || {}),
  };
  const preferredDark = usePreferredDark({ window: window2 });
  const system = computed(() => (preferredDark.value ? 'dark' : 'light'));
  const store =
    storageRef ||
    (storageKey == null
      ? toRef2(initialValue)
      : useStorage(storageKey, initialValue, storage, { window: window2, listenToStorageChanges }));
  const state = computed(() => (store.value === 'auto' ? system.value : store.value));
  const updateHTMLAttrs = getSSRHandler('updateHTMLAttrs', (selector2, attribute2, value) => {
    const el =
      typeof selector2 === 'string' ? (window2 == null ? void 0 : window2.document.querySelector(selector2)) : unrefElement(selector2);
    if (!el) return;
    const classesToAdd = /* @__PURE__ */ new Set();
    const classesToRemove = /* @__PURE__ */ new Set();
    let attributeToChange = null;
    if (attribute2 === 'class') {
      const current = value.split(/\s/g);
      Object.values(modes)
        .flatMap(i => (i || '').split(/\s/g))
        .filter(Boolean)
        .forEach(v => {
          if (current.includes(v)) classesToAdd.add(v);
          else classesToRemove.add(v);
        });
    } else {
      attributeToChange = { key: attribute2, value };
    }
    if (classesToAdd.size === 0 && classesToRemove.size === 0 && attributeToChange === null) return;
    let style;
    if (disableTransition) {
      style = window2.document.createElement('style');
      style.appendChild(document.createTextNode(CSS_DISABLE_TRANS));
      window2.document.head.appendChild(style);
    }
    for (const c of classesToAdd) {
      el.classList.add(c);
    }
    for (const c of classesToRemove) {
      el.classList.remove(c);
    }
    if (attributeToChange) {
      el.setAttribute(attributeToChange.key, attributeToChange.value);
    }
    if (disableTransition) {
      window2.getComputedStyle(style).opacity;
      document.head.removeChild(style);
    }
  });
  function defaultOnChanged(mode) {
    var _a;
    updateHTMLAttrs(selector, attribute, (_a = modes[mode]) != null ? _a : mode);
  }
  function onChanged(mode) {
    if (options.onChanged) options.onChanged(mode, defaultOnChanged);
    else defaultOnChanged(mode);
  }
  watch(state, onChanged, { flush: 'post', immediate: true });
  tryOnMounted(() => onChanged(state.value));
  const auto = computed({
    get() {
      return emitAuto ? store.value : state.value;
    },
    set(v) {
      store.value = v;
    },
  });
  return Object.assign(auto, { store, system, state });
}
function useElementHover(el, options = {}) {
  const { delayEnter = 0, delayLeave = 0, window: window2 = defaultWindow } = options;
  const isHovered = ref(false);
  let timer;
  const toggle2 = entering => {
    const delay3 = entering ? delayEnter : delayLeave;
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
    if (delay3) timer = setTimeout(() => (isHovered.value = entering), delay3);
    else isHovered.value = entering;
  };
  if (!window2) return isHovered;
  useEventListener(el, 'mouseenter', () => toggle2(true), { passive: true });
  useEventListener(el, 'mouseleave', () => toggle2(false), { passive: true });
  return isHovered;
}
function useIntersectionObserver(target, callback, options = {}) {
  const { root, rootMargin = '0px', threshold = 0, window: window2 = defaultWindow, immediate = true } = options;
  const isSupported = useSupported(() => window2 && 'IntersectionObserver' in window2);
  const targets = computed(() => {
    const _target = toValue2(target);
    return (Array.isArray(_target) ? _target : [_target]).map(unrefElement).filter(notNullish);
  });
  let cleanup = noop;
  const isActive = ref(immediate);
  const stopWatch = isSupported.value
    ? watch(
        () => [targets.value, unrefElement(root), isActive.value],
        ([targets2, root2]) => {
          cleanup();
          if (!isActive.value) return;
          if (!targets2.length) return;
          const observer = new IntersectionObserver(callback, {
            root: unrefElement(root2),
            rootMargin,
            threshold,
          });
          targets2.forEach(el => el && observer.observe(el));
          cleanup = () => {
            observer.disconnect();
            cleanup = noop;
          };
        },
        { immediate, flush: 'post' },
      )
    : noop;
  const stop = () => {
    cleanup();
    stopWatch();
    isActive.value = false;
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    isActive,
    pause() {
      cleanup();
      isActive.value = false;
    },
    resume() {
      isActive.value = true;
    },
    stop,
  };
}
function useFocus(target, options = {}) {
  const { initialValue = false, focusVisible = false, preventScroll = false } = options;
  const innerFocused = ref(false);
  const targetElement = computed(() => unrefElement(target));
  useEventListener(targetElement, 'focus', event => {
    var _a, _b;
    if (!focusVisible || ((_b = (_a = event.target).matches) == null ? void 0 : _b.call(_a, ':focus-visible'))) innerFocused.value = true;
  });
  useEventListener(targetElement, 'blur', () => (innerFocused.value = false));
  const focused = computed({
    get: () => innerFocused.value,
    set(value) {
      var _a, _b;
      if (!value && innerFocused.value) (_a = targetElement.value) == null ? void 0 : _a.blur();
      else if (value && !innerFocused.value) (_b = targetElement.value) == null ? void 0 : _b.focus({ preventScroll });
    },
  });
  watch(
    targetElement,
    () => {
      focused.value = initialValue;
    },
    { immediate: true, flush: 'post' },
  );
  return { focused };
}
function resolveElement(el) {
  if (typeof Window !== 'undefined' && el instanceof Window) return el.document.documentElement;
  if (typeof Document !== 'undefined' && el instanceof Document) return el.documentElement;
  return el;
}
var UseMouseBuiltinExtractors = {
  page: event => [event.pageX, event.pageY],
  client: event => [event.clientX, event.clientY],
  screen: event => [event.screenX, event.screenY],
  movement: event => (event instanceof Touch ? null : [event.movementX, event.movementY]),
};
function useMouse(options = {}) {
  const {
    type = 'page',
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
    window: window2 = defaultWindow,
    target = window2,
    scroll = true,
    eventFilter: eventFilter2,
  } = options;
  let _prevMouseEvent = null;
  let _prevScrollX = 0;
  let _prevScrollY = 0;
  const x = ref(initialValue.x);
  const y = ref(initialValue.y);
  const sourceType = ref(null);
  const extractor = typeof type === 'function' ? type : UseMouseBuiltinExtractors[type];
  const mouseHandler = event => {
    const result = extractor(event);
    _prevMouseEvent = event;
    if (result) {
      [x.value, y.value] = result;
      sourceType.value = 'mouse';
    }
    if (window2) {
      _prevScrollX = window2.scrollX;
      _prevScrollY = window2.scrollY;
    }
  };
  const touchHandler = event => {
    if (event.touches.length > 0) {
      const result = extractor(event.touches[0]);
      if (result) {
        [x.value, y.value] = result;
        sourceType.value = 'touch';
      }
    }
  };
  const scrollHandler = () => {
    if (!_prevMouseEvent || !window2) return;
    const pos = extractor(_prevMouseEvent);
    if (_prevMouseEvent instanceof MouseEvent && pos) {
      x.value = pos[0] + window2.scrollX - _prevScrollX;
      y.value = pos[1] + window2.scrollY - _prevScrollY;
    }
  };
  const reset = () => {
    x.value = initialValue.x;
    y.value = initialValue.y;
  };
  const mouseHandlerWrapper = eventFilter2 ? event => eventFilter2(() => mouseHandler(event), {}) : event => mouseHandler(event);
  const touchHandlerWrapper = eventFilter2 ? event => eventFilter2(() => touchHandler(event), {}) : event => touchHandler(event);
  const scrollHandlerWrapper = eventFilter2 ? () => eventFilter2(() => scrollHandler(), {}) : () => scrollHandler();
  if (target) {
    const listenerOptions = { passive: true };
    useEventListener(target, ['mousemove', 'dragover'], mouseHandlerWrapper, listenerOptions);
    if (touch && type !== 'movement') {
      useEventListener(target, ['touchstart', 'touchmove'], touchHandlerWrapper, listenerOptions);
      if (resetOnTouchEnds) useEventListener(target, 'touchend', reset, listenerOptions);
    }
    if (scroll && type === 'page') useEventListener(window2, 'scroll', scrollHandlerWrapper, { passive: true });
  }
  return {
    x,
    y,
    sourceType,
  };
}
function checkOverflowScroll(ele) {
  const style = window.getComputedStyle(ele);
  if (
    style.overflowX === 'scroll' ||
    style.overflowY === 'scroll' ||
    (style.overflowX === 'auto' && ele.clientWidth < ele.scrollWidth) ||
    (style.overflowY === 'auto' && ele.clientHeight < ele.scrollHeight)
  ) {
    return true;
  } else {
    const parent = ele.parentNode;
    if (!parent || parent.tagName === 'BODY') return false;
    return checkOverflowScroll(parent);
  }
}
function preventDefault(rawEvent) {
  const e = rawEvent || window.event;
  const _target = e.target;
  if (checkOverflowScroll(_target)) return false;
  if (e.touches.length > 1) return true;
  if (e.preventDefault) e.preventDefault();
  return false;
}
var elInitialOverflow = /* @__PURE__ */ new WeakMap();
function useScrollLock(element, initialState = false) {
  const isLocked = ref(initialState);
  let stopTouchMoveListener = null;
  let initialOverflow = '';
  watch(
    toRef2(element),
    el => {
      const target = resolveElement(toValue2(el));
      if (target) {
        const ele = target;
        if (!elInitialOverflow.get(ele)) elInitialOverflow.set(ele, ele.style.overflow);
        if (ele.style.overflow !== 'hidden') initialOverflow = ele.style.overflow;
        if (ele.style.overflow === 'hidden') return (isLocked.value = true);
        if (isLocked.value) return (ele.style.overflow = 'hidden');
      }
    },
    {
      immediate: true,
    },
  );
  const lock = () => {
    const el = resolveElement(toValue2(element));
    if (!el || isLocked.value) return;
    if (isIOS) {
      stopTouchMoveListener = useEventListener(
        el,
        'touchmove',
        e => {
          preventDefault(e);
        },
        { passive: false },
      );
    }
    el.style.overflow = 'hidden';
    isLocked.value = true;
  };
  const unlock = () => {
    const el = resolveElement(toValue2(element));
    if (!el || !isLocked.value) return;
    if (isIOS) stopTouchMoveListener == null ? void 0 : stopTouchMoveListener();
    el.style.overflow = initialOverflow;
    elInitialOverflow.delete(el);
    isLocked.value = false;
  };
  tryOnScopeDispose(unlock);
  return computed({
    get() {
      return isLocked.value;
    },
    set(v) {
      if (v) lock();
      else unlock();
    },
  });
}
function useSwipe(target, options = {}) {
  const { threshold = 50, onSwipe, onSwipeEnd, onSwipeStart, passive = true, window: window2 = defaultWindow } = options;
  const coordsStart = reactive({ x: 0, y: 0 });
  const coordsEnd = reactive({ x: 0, y: 0 });
  const diffX = computed(() => coordsStart.x - coordsEnd.x);
  const diffY = computed(() => coordsStart.y - coordsEnd.y);
  const { max: max2, abs } = Math;
  const isThresholdExceeded = computed(() => max2(abs(diffX.value), abs(diffY.value)) >= threshold);
  const isSwiping = ref(false);
  const direction = computed(() => {
    if (!isThresholdExceeded.value) return 'none';
    if (abs(diffX.value) > abs(diffY.value)) {
      return diffX.value > 0 ? 'left' : 'right';
    } else {
      return diffY.value > 0 ? 'up' : 'down';
    }
  });
  const getTouchEventCoords = e => [e.touches[0].clientX, e.touches[0].clientY];
  const updateCoordsStart = (x, y) => {
    coordsStart.x = x;
    coordsStart.y = y;
  };
  const updateCoordsEnd = (x, y) => {
    coordsEnd.x = x;
    coordsEnd.y = y;
  };
  let listenerOptions;
  const isPassiveEventSupported = checkPassiveEventSupport(window2 == null ? void 0 : window2.document);
  if (!passive) listenerOptions = isPassiveEventSupported ? { passive: false, capture: true } : { capture: true };
  else listenerOptions = isPassiveEventSupported ? { passive: true } : { capture: false };
  const onTouchEnd = e => {
    if (isSwiping.value) onSwipeEnd == null ? void 0 : onSwipeEnd(e, direction.value);
    isSwiping.value = false;
  };
  const stops = [
    useEventListener(
      target,
      'touchstart',
      e => {
        if (e.touches.length !== 1) return;
        const [x, y] = getTouchEventCoords(e);
        updateCoordsStart(x, y);
        updateCoordsEnd(x, y);
        onSwipeStart == null ? void 0 : onSwipeStart(e);
      },
      listenerOptions,
    ),
    useEventListener(
      target,
      'touchmove',
      e => {
        if (e.touches.length !== 1) return;
        const [x, y] = getTouchEventCoords(e);
        updateCoordsEnd(x, y);
        if (listenerOptions.capture && !listenerOptions.passive && Math.abs(diffX.value) > Math.abs(diffY.value)) e.preventDefault();
        if (!isSwiping.value && isThresholdExceeded.value) isSwiping.value = true;
        if (isSwiping.value) onSwipe == null ? void 0 : onSwipe(e);
      },
      listenerOptions,
    ),
    useEventListener(target, ['touchend', 'touchcancel'], onTouchEnd, listenerOptions),
  ];
  const stop = () => stops.forEach(s => s());
  return {
    isPassiveEventSupported,
    isSwiping,
    direction,
    coordsStart,
    coordsEnd,
    lengthX: diffX,
    lengthY: diffY,
    stop,
  };
}
function checkPassiveEventSupport(document2) {
  if (!document2) return false;
  let supportsPassive = false;
  const optionsBlock = {
    get passive() {
      supportsPassive = true;
      return false;
    },
  };
  document2.addEventListener('x', noop, optionsBlock);
  document2.removeEventListener('x', noop);
  return supportsPassive;
}
function useTimestamp(options = {}) {
  const { controls: exposeControls = false, offset: offset2 = 0, immediate = true, interval = 'requestAnimationFrame', callback } = options;
  const ts = ref(timestamp() + offset2);
  const update = () => (ts.value = timestamp() + offset2);
  const cb = callback
    ? () => {
        update();
        callback(ts.value);
      }
    : update;
  const controls = interval === 'requestAnimationFrame' ? useRafFn(cb, { immediate }) : useIntervalFn(cb, interval, { immediate });
  if (exposeControls) {
    return {
      timestamp: ts,
      ...controls,
    };
  } else {
    return ts;
  }
}

// node_modules/bootstrap-vue-next/dist/src/composables/useColorMode/index.mjs
var useColorMode2 = (opts = {}) => {
  const persist = opts.persist ?? false;
  const attribute = 'data-bs-theme';
  const selector = 'body';
  return useColorMode({
    attribute,
    selector,
    storageKey: persist === true ? `bv-color-${opts.attribute ?? attribute}-${opts.selector ?? selector}` : null,
    ...opts,
  });
};

// node_modules/bootstrap-vue-next/dist/useModalManager-mJhdG47N.mjs
var modalOpenClassName = 'modal-open';
var useSharedModalStack = () => {
  const modalManagerPlugin2 = inject(modalManagerPluginKey);
  const dispose = modal => {
    modalManagerPlugin2 == null ? void 0 : modalManagerPlugin2.removeStack(modal);
    modalManagerPlugin2 == null ? void 0 : modalManagerPlugin2.removeRegistry(modal);
  };
  const updateHTMLAttrs = getSSRHandler('updateHTMLAttrs', (selector, attribute, value) => {
    const el = typeof selector === 'string' ? (window == null ? void 0 : window.document.querySelector(selector)) : unrefElement(selector);
    if (!el) return;
    if (attribute === 'class') {
      el.classList.toggle(modalOpenClassName, value === modalOpenClassName);
    } else {
      el.setAttribute(attribute, value);
    }
  });
  tryOnScopeDispose(() => {
    updateHTMLAttrs('body', 'class', '');
  });
  watch(
    () => (modalManagerPlugin2 == null ? void 0 : modalManagerPlugin2.countStack.value),
    newValue => {
      if (newValue === void 0) return;
      updateHTMLAttrs('body', 'class', newValue > 0 ? modalOpenClassName : '');
    },
  );
  return {
    ...modalManagerPlugin2,
    dispose,
  };
};
var useModalManager = (modalOpen, initialValue) => {
  const { pushRegistry, pushStack, removeStack, stack, dispose, countStack } = useSharedModalStack();
  const currentModal = getCurrentInstance();
  if (!currentModal || currentModal.type.__name !== 'BModal') {
    throw new Error('useModalManager must only use in BModal component');
  }
  pushRegistry == null ? void 0 : pushRegistry(currentModal);
  tryOnScopeDispose(() => {
    dispose(currentModal);
  });
  const setInStack = (newValue, oldValue) => {
    if (newValue) {
      pushStack == null ? void 0 : pushStack(currentModal);
    } else if (oldValue && !newValue) {
      removeStack == null ? void 0 : removeStack(currentModal);
    }
  };
  setInStack(initialValue, initialValue);
  watch(modalOpen, setInStack);
  return {
    activePosition: computed(() =>
      stack == null
        ? void 0
        : stack.value.findIndex(el => {
            var _a, _b;
            return toValue((_a = el.exposed) == null ? void 0 : _a.id) === toValue((_b = currentModal.exposed) == null ? void 0 : _b.id);
          }),
    ),
    activeModalCount: countStack,
    stackWithoutSelf: computed(
      () =>
        (stack == null
          ? void 0
          : stack.value.filter(el => {
              var _a, _b;
              return toValue((_a = el.exposed) == null ? void 0 : _a.id) !== toValue((_b = currentModal.exposed) == null ? void 0 : _b.id);
            })) ?? [],
    ),
  };
};

// node_modules/bootstrap-vue-next/dist/src/composables/useModal/index.mjs
var useModal = (id = void 0) => {
  const { registry } = useSharedModalStack();
  const instance = getCurrentInstance();
  const findBModal = component => {
    if (!component.parent) {
      return null;
    }
    if (component.parent.type.__name === 'BModal') {
      return component.parent;
    }
    return findBModal(component.parent);
  };
  const modalComponent = computed(() => {
    var _a;
    const resolvedId = toValue(id);
    if (resolvedId) {
      if (!registry) return null;
      for (const [, modal2] of registry.value) {
        if (toValue((_a = modal2 == null ? void 0 : modal2.exposed) == null ? void 0 : _a.id) === resolvedId) {
          return modal2;
        }
      }
      return null;
    }
    if (!instance) {
      return null;
    }
    return findBModal(instance);
  });
  const modal = computed(() => {
    var _a;
    return (_a = modalComponent.value) == null ? void 0 : _a.proxy;
  });
  return {
    show() {
      var _a, _b;
      (_b = (_a = modalComponent.value) == null ? void 0 : _a.exposed) == null ? void 0 : _b.show();
    },
    hide(trigger = '') {
      var _a, _b;
      (_b = (_a = modalComponent.value) == null ? void 0 : _a.exposed) == null ? void 0 : _b.hide(trigger);
    },
    modal,
  };
};

// node_modules/bootstrap-vue-next/dist/src/composables/useModalController/index.mjs
var useModalController = () => {
  const { lastStack, stack } = useSharedModalStack();
  const modalControllerPlugin2 = inject(modalControllerPluginKey);
  const hide2 = (trigger = '') => {
    var _a;
    if (lastStack == null ? void 0 : lastStack.value) {
      (_a = lastStack == null ? void 0 : lastStack.value.exposed) == null ? void 0 : _a.hide(trigger);
    }
  };
  const hideAll = (trigger = '') => {
    stack == null
      ? void 0
      : stack.value.forEach(modal => {
          var _a;
          (_a = modal.exposed) == null ? void 0 : _a.hide(trigger);
        });
  };
  return {
    ...modalControllerPlugin2,
    hide: hide2,
    hideAll,
    // Todo: Supports listening events globally in the future
  };
};

// node_modules/bootstrap-vue-next/dist/getElement-D_JPfLJS.mjs
var getElement = element => {
  if (!element) return void 0;
  if (typeof element === 'string') {
    if (typeof document === 'undefined') return void 0;
    const idElement = document.getElementById(element);
    return idElement ?? document.querySelector(element) ?? void 0;
  }
  return element.$el ?? element;
};

// node_modules/bootstrap-vue-next/dist/src/composables/useScrollspy/index.mjs
var useScrollspy = (content, target, options = {}) => {
  const cont = toRef(content);
  const tar = toRef(target);
  const resolvedContent = ref(getElement(cont.value));
  const resolvedTarget = ref(getElement(tar.value));
  watch([cont, tar], () => {
    updateList();
  });
  const {
    contentQuery = ':scope > [id]',
    targetQuery = '[href]',
    manual = false,
    root,
    rootMargin = '0px 0px -25%',
    threshold = [0.1, 0.5, 1],
    watchChanges = true,
  } = options;
  const current = ref(null);
  const list = ref([]);
  const nodeList = ref([]);
  const ctx = getCurrentInstance();
  if (!ctx) {
    nextTick(() => {
      updateList();
    });
  } else {
    onMounted(() => {
      syncRef(cont, resolvedContent, {
        transform: {
          ltr: v => getElement(v),
        },
        direction: 'ltr',
        immediate: true,
      });
      syncRef(tar, resolvedTarget, {
        transform: {
          ltr: v => getElement(v),
        },
        direction: 'ltr',
        immediate: true,
      });
      updateList();
    });
  }
  const updateList = () => {
    nodeList.value = resolvedContent.value ? Array.from(resolvedContent.value.querySelectorAll(contentQuery)) : [];
    list.value = nodeList.value.map(el => ({
      id: el.id,
      el,
      visible: false,
      text: el.textContent,
    }));
  };
  let isScrollingDown = true;
  let previousScrollTop = 0;
  const scrollRoot = computed(() =>
    resolvedContent.value && getComputedStyle(resolvedContent.value).overflowY === 'visible' ? null : resolvedContent.value,
  );
  const iobs = useIntersectionObserver(
    nodeList,
    entries => {
      var _a, _b, _c, _d;
      const scrollTop = (_a = scrollRoot.value || (document == null ? void 0 : document.documentElement)) == null ? void 0 : _a.scrollTop;
      isScrollingDown = scrollTop > previousScrollTop;
      previousScrollTop = scrollTop;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          list.value.forEach(node => {
            if (node.el === entry.target) {
              node.visible = true;
            }
          });
          return;
        }
        list.value.forEach(node => {
          if (node.el === entry.target) {
            node.visible = false;
          }
        });
      });
      let newId = null;
      if (isScrollingDown) {
        newId = ((_b = [...list.value].reverse().find(node => node.visible)) == null ? void 0 : _b.id) || null;
      } else {
        newId = ((_c = list.value.find(node => node.visible)) == null ? void 0 : _c.id) || null;
      }
      if (newId !== null) {
        current.value = newId;
      }
      if (!current.value) {
        current.value = ((_d = list.value[0]) == null ? void 0 : _d.id) || null;
      }
    },
    {
      root: root ? getElement(root) : scrollRoot,
      rootMargin,
      threshold,
    },
  );
  watch(current, newId => {
    var _a;
    if (manual) return;
    const nodes = (_a = resolvedTarget.value) == null ? void 0 : _a.querySelectorAll(targetQuery);
    if (nodes === void 0) return;
    let foundParent = false;
    let activeElement = null;
    nodes.forEach(node => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const parentDropdown = node.closest('.dropdown');
      if ((_a2 = node.getAttribute('href')) == null ? void 0 : _a2.includes(`#${newId}`)) {
        activeElement = node;
        node.classList.add('active');
        if (parentDropdown) {
          (_b = parentDropdown == null ? void 0 : parentDropdown.querySelector('.dropdown-toggle')) == null
            ? void 0
            : _b.classList.add('active');
          foundParent = true;
        }
        let parentNav = (_c = node.closest('.nav')) == null ? void 0 : _c.previousSibling;
        while ((_d = parentNav == null ? void 0 : parentNav.classList) == null ? void 0 : _d.contains('nav-item')) {
          foundParent = true;
          (_e = parentNav.querySelector('.nav-link')) == null ? void 0 : _e.classList.add('active');
          parentNav = (_f = parentNav.closest('.nav')) == null ? void 0 : _f.previousSibling;
        }
      } else {
        node.classList.remove('active');
        if (parentDropdown && !foundParent) {
          (_g = parentDropdown == null ? void 0 : parentDropdown.querySelector('.dropdown-toggle')) == null
            ? void 0
            : _g.classList.remove('active');
        }
        if (!foundParent) {
          let parentNav = (_h = node.closest('.nav')) == null ? void 0 : _h.previousSibling;
          while ((_i = parentNav == null ? void 0 : parentNav.classList) == null ? void 0 : _i.contains('nav-item')) {
            foundParent = true;
            if (parentNav.querySelector('.nav-link') !== activeElement) {
              (_j = parentNav.querySelector('.nav-link')) == null ? void 0 : _j.classList.remove('active');
            }
            parentNav = (_k = parentNav.closest('.nav')) == null ? void 0 : _k.previousSibling;
          }
        }
      }
    });
  });
  const mobs = !watchChanges
    ? { stop: () => {} }
    : useMutationObserver(
        resolvedContent,
        () => {
          updateList();
        },
        {
          childList: true,
        },
      );
  const scrollIntoView = (event, smooth = false) => {
    var _a, _b;
    event.preventDefault();
    const href = (_b = (_a = event.target) == null ? void 0 : _a.getAttribute) == null ? void 0 : _b.call(_a, 'href');
    const el = href ? (document == null ? void 0 : document.querySelector(href)) : null;
    if (el && resolvedContent.value) {
      if (resolvedContent.value.scrollTo) {
        resolvedContent.value.scrollTo({ top: el.offsetTop, behavior: smooth ? 'smooth' : 'auto' });
      } else {
        resolvedContent.value.scrollTop = el.offsetTop;
      }
    }
  };
  const cleanup = () => {
    iobs.stop();
    mobs.stop();
  };
  return {
    current: readonly(current),
    list,
    content: resolvedContent,
    target: resolvedTarget,
    scrollIntoView,
    updateList,
    cleanup,
  };
};

// node_modules/bootstrap-vue-next/dist/src/composables/useToastController/index.mjs
var useToastController = () => ({ ...inject(toastPluginKey) });

// node_modules/bootstrap-vue-next/dist/src/composables/usePopoverController/index.mjs
var usePopoverController = () => ({ ...inject(popoverPluginKey) });

// node_modules/bootstrap-vue-next/dist/index-BjYm4lhC.mjs
var index = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      useBreadcrumb,
      useColorMode: useColorMode2,
      useModal,
      useModalController,
      usePopoverController,
      useScrollspy,
      useToastController,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

// node_modules/bootstrap-vue-next/dist/src/directives/BColorMode/index.mjs
var setTheme = (el, value) => el.setAttribute('data-bs-theme', value);
var vBColorMode = {
  mounted(el, binding) {
    setTheme(el, binding.value);
  },
  updated(el, binding) {
    setTheme(el, binding.value);
  },
};

// node_modules/bootstrap-vue-next/dist/constants-DY6pmjuU.mjs
var CODE_DOWN = 'ArrowDown';
var CODE_END = 'End';
var CODE_HOME = 'Home';
var CODE_LEFT = 'ArrowLeft';
var CODE_PAGEDOWN = 'PageDown';
var CODE_PAGEUP = 'PageUp';
var CODE_RIGHT = 'ArrowRight';
var CODE_UP = 'ArrowUp';
var RX_UNDERSCORE = /_/g;
var RX_LOWER_UPPER = /([a-z])([A-Z])/g;
var RX_NUMBER = /^[0-9]*\.?[0-9]+$/;
var RX_START_SPACE_WORD = /(\s|^)(\w)/g;
var RX_FIRST_START_SPACE_WORD = /(\s|^)(\w)/;
var RX_SPACE_SPLIT = /\s+/;
var RX_HASH = /^#/;
var RX_HASH_ID = /^#[A-Za-z]+[\w\-:.]*$/;
var RX_REGEXP_REPLACE = /[-/\\^$*+?.()|[\]{}]/g;
var RX_SPACES = /[\s\uFEFF\xA0]+/g;

// node_modules/bootstrap-vue-next/dist/utils-DPq73bs8.mjs
function findProvides(binding, vnode) {
  var _a, _b;
  const provides =
    (vnode.ctx === binding.instance.$
      ? (_a = findComponentParent(vnode, binding.instance.$)) == null
        ? void 0
        : _a.provides
      : (_b = vnode.ctx) == null
        ? void 0
        : _b.provides) ?? binding.instance.$.provides;
  return provides;
}
function findComponentParent(vnode, root) {
  const stack = /* @__PURE__ */ new Set();
  const walk = children => {
    var _a, _b;
    for (const child of children) {
      if (!child) continue;
      if (child === vnode || (child.el && vnode.el && child.el === vnode.el)) {
        return true;
      }
      stack.add(child);
      let result2;
      if (child.suspense) {
        result2 = walk([child.ssContent]);
      } else if (Array.isArray(child.children)) {
        result2 = walk(child.children);
      } else if ((_a = child.component) == null ? void 0 : _a.vnode) {
        result2 = walk([(_b = child.component) == null ? void 0 : _b.subTree]);
      }
      if (result2) {
        return result2;
      }
      stack.delete(child);
    }
    return false;
  };
  if (!walk([root.subTree])) {
    console.error('Could not find original vnode,  will not inherit provides');
    return root;
  }
  const result = Array.from(stack).reverse();
  for (const child of result) {
    if (child.component) {
      return child.component;
    }
  }
  return root;
}

// node_modules/bootstrap-vue-next/dist/src/directives/BToggle/index.mjs
var getTargets = (binding, el) => {
  const { modifiers, arg, value } = binding;
  const targets = Object.keys(modifiers || {});
  const localValue = typeof value === 'string' ? value.split(RX_SPACE_SPLIT) : value;
  if (el.tagName.toLowerCase() === 'a') {
    const href = el.getAttribute('href') || '';
    if (RX_HASH_ID.test(href)) {
      targets.push(href.replace(RX_HASH, ''));
    }
  }
  Array.prototype.concat.apply([], [arg, localValue]).forEach(t => typeof t === 'string' && targets.push(t));
  return targets.filter((t, index8, arr) => t && arr.indexOf(t) === index8);
};
var toggle = (targetIds, el, binding, vnode) => {
  var _a;
  const provides = findProvides(binding, vnode);
  const showHide = (_a = provides[globalShowHideStorageInjectionKey]) == null ? void 0 : _a.map;
  targetIds.forEach(targetId => {
    if (showHide == null ? void 0 : showHide[targetId]) {
      showHide[targetId].toggle();
      return;
    }
    const target = document.getElementById(targetId);
    if (target !== null) {
      target.dispatchEvent(new Event('bv-toggle'));
    }
  });
  setTimeout(() => checkVisibility(targetIds, el), 50);
};
var checkVisibility = (targetIds, el) => {
  let visible = false;
  targetIds.forEach(targetId => {
    const target = document.getElementById(targetId);
    if (target == null ? void 0 : target.classList.contains('show')) {
      visible = true;
    }
    if (target == null ? void 0 : target.classList.contains('closing')) {
      visible = false;
    }
  });
  el.setAttribute('aria-expanded', visible ? 'true' : 'false');
  el.classList.remove(visible ? 'collapsed' : 'not-collapsed');
  el.classList.add(visible ? 'not-collapsed' : 'collapsed');
};
var handleUpdate = (el, binding, vnode) => {
  const targets = getTargets(binding, el);
  if (targets.length === 0) return;
  if (el.__toggle) {
    setTimeout(() => {
      el.removeEventListener('click', el.__toggle);
      el.__toggle = () => toggle(targets, el, binding, vnode);
      el.addEventListener('click', el.__toggle);
    }, 0);
  } else {
    el.__toggle = () => toggle(targets, el, binding, vnode);
    el.addEventListener('click', el.__toggle);
  }
  el.setAttribute('aria-controls', targets.join(' '));
  checkVisibility(targets, el);
};
var vBToggle = {
  mounted: handleUpdate,
  updated: handleUpdate,
  unmounted(el) {
    el.removeEventListener('click', el.__toggle);
    el.removeAttribute('aria-controls');
    el.removeAttribute('aria-expanded');
  },
};

// node_modules/bootstrap-vue-next/dist/useDefaults-BTLXvYhO.mjs
function injectSelf(key, vm = getCurrentInstance2('injectSelf')) {
  const { provides } = vm;
  if (provides && key in provides) {
    return provides[key];
  }
  return void 0;
}
function getCurrentInstance2(name, message) {
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error(`[Bvn] ${name} ${'must be called from inside a setup function'}`);
  }
  return vm;
}
var toKebabCase = (str = '') =>
  str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase();
var isObject2 = obj => obj !== null && typeof obj === 'object' && !Array.isArray(obj);
function mergeDeep(source = {}, target = {}, arrayFn) {
  const out = {};
  for (const key in source) {
    out[key] = source[key];
  }
  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key];
    if (isObject2(sourceProperty) && isObject2(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
      continue;
    }
    if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
      out[key] = arrayFn(sourceProperty, targetProperty);
      continue;
    }
    out[key] = targetProperty;
  }
  return out;
}
var propIsDefined = (vnode, prop) => {
  var _a, _b;
  return (
    typeof ((_a = vnode.props) == null ? void 0 : _a[prop]) !== 'undefined' ||
    typeof ((_b = vnode.props) == null ? void 0 : _b[toKebabCase(prop)]) !== 'undefined'
  );
};
function internalUseDefaults(props = {}, name) {
  const defaults = inject(defaultsKey, ref({}));
  const vm = getCurrentInstance2('useDefaults');
  name = name ?? vm.type.name ?? vm.type.__name;
  if (!name) {
    throw new Error('[Bvn] Could not determine component name');
  }
  const componentDefaults = computed(() => {
    var _a;
    return (_a = defaults.value) == null ? void 0 : _a[props._as ?? name];
  });
  const _props = new Proxy(props, {
    get(target, prop) {
      var _a, _b, _c, _d;
      const propValue = Reflect.get(target, prop);
      if (prop === 'class' || prop === 'style') {
        return [(_a = componentDefaults.value) == null ? void 0 : _a[prop], propValue].filter(v => v != null);
      } else if (typeof prop === 'string' && !propIsDefined(vm.vnode, prop)) {
        return (
          ((_b = componentDefaults.value) == null ? void 0 : _b[prop]) ??
          ((_d = (_c = defaults.value) == null ? void 0 : _c.global) == null ? void 0 : _d[prop]) ??
          propValue
        );
      }
      return propValue;
    },
  });
  const _subcomponentDefaults = shallowRef();
  watchEffect(() => {
    if (componentDefaults.value) {
      const subComponents = Object.entries(componentDefaults.value).filter(([key]) => key.startsWith(key[0].toUpperCase()));
      _subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : void 0;
    } else {
      _subcomponentDefaults.value = void 0;
    }
  });
  function provideSubDefaults() {
    const injected = injectSelf(defaultsKey, vm);
    provide(
      defaultsKey,
      computed(() =>
        _subcomponentDefaults.value
          ? mergeDeep((injected == null ? void 0 : injected.value) ?? {}, _subcomponentDefaults.value)
          : injected == null
            ? void 0
            : injected.value,
      ),
    );
  }
  return { props: _props, provideSubDefaults };
}
function useDefaults(props, name) {
  const { props: _props, provideSubDefaults } = internalUseDefaults(props, name);
  provideSubDefaults();
  return _props;
}

// node_modules/bootstrap-vue-next/dist/useId-c2wnQbyL.mjs
var useId2 = (id, suffix) => {
  const genId = useId();
  return computed(() => toValue(id) || withBvnPrefix(genId || '', suffix));
};

// node_modules/bootstrap-vue-next/dist/ConditionalTeleport.vue_vue_type_script_lang-2PJ2jBTg.mjs
var _sfc_main = defineComponent({
  name: 'ConditionalTeleport',
  inheritAttrs: false,
  slots: Object,
  props: {
    to: {
      type: [String, Object],
      default: null,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => {
      var _a, _b;
      return !props.to
        ? (_a = slots.default) == null
          ? void 0
          : _a.call(slots, {})
        : h(Teleport, { to: props.to, disabled: props.disabled || !props.to }, [
            (_b = slots.default) == null ? void 0 : _b.call(slots, {}),
          ]);
    };
  },
});

// node_modules/bootstrap-vue-next/dist/classes-IC0yVJlq.mjs
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) =>
  key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : (obj[key] = value);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value);
var BvEvent = class _BvEvent {
  constructor(eventType, eventInit = {}) {
    __publicField(this, 'cancelable', true);
    __publicField(this, 'componentId', null);
    __publicField(this, '_defaultPrevented', false);
    __publicField(this, 'eventType', '');
    __publicField(this, 'nativeEvent', null);
    __publicField(this, '_preventDefault');
    __publicField(this, 'relatedTarget', null);
    __publicField(this, 'target', null);
    if (!eventType) {
      throw new TypeError(`Failed to construct '${this.constructor.name}'. 1 argument required, ${arguments.length} given.`);
    }
    Object.assign(this, _BvEvent.Defaults, eventInit, { eventType });
    this._preventDefault = function _preventDefault() {
      if (this.cancelable) {
        this.defaultPrevented = true;
      }
    };
  }
  // Readable by everyone,
  // But only overwritten by inherrited constructors
  get defaultPrevented() {
    return this._defaultPrevented;
  }
  set defaultPrevented(prop) {
    this._defaultPrevented = prop;
  }
  // I think this is right
  // We want to be able to have it callable to everyone,
  // But only overwritten by inherrited constructors
  get preventDefault() {
    return this._preventDefault;
  }
  // This may not be correct, because it doesn't get correct type inferences in children
  // Ex overwrite this.preventDefault = () => true is valid. Could be a TS issue
  set preventDefault(setter) {
    this._preventDefault = setter;
  }
  static get Defaults() {
    return {
      cancelable: true,
      componentId: null,
      eventType: '',
      nativeEvent: null,
      relatedTarget: null,
      target: null,
    };
  }
};
var BvTriggerableEvent = class extends BvEvent {
  constructor(eventType, eventInit = {}) {
    super(eventType, eventInit);
    __publicField(this, 'trigger', null);
    Object.assign(this, BvEvent.Defaults, eventInit, { eventType });
  }
  static get Defaults() {
    return {
      ...super.Defaults,
      trigger: null,
    };
  }
};
var BvCarouselEvent = class extends BvEvent {
  constructor(eventType, eventInit) {
    super(eventType, eventInit);
    __publicField(this, 'from');
    __publicField(this, 'to');
    __publicField(this, 'direction');
    Object.assign(this, BvEvent.Defaults, eventInit, { eventType });
    const { from, direction, to } = eventInit;
    this.from = from;
    this.to = to;
    this.direction = direction;
  }
  static get Defaults() {
    return {
      ...super.Defaults,
    };
  }
};

// node_modules/bootstrap-vue-next/dist/useShowHide-DPX837gG.mjs
var fadeBaseTransitionProps = {
  name: 'fade',
  enterActiveClass: '',
  enterFromClass: 'showing',
  enterToClass: '',
  leaveActiveClass: '',
  leaveFromClass: '',
  leaveToClass: 'showing',
  css: true,
};
var useShowHide = (
  modelValue,
  props,
  emit,
  element,
  computedId,
  options = {
    transitionProps: {},
    showFn: () => {},
    hideFn: () => {},
  },
) => {
  var _a;
  let noAction = false;
  const initialShow = (!!modelValue.value && !props.initialAnimation) || props.visible || false;
  const showRef = ref(false);
  const renderRef = ref(initialShow);
  const renderBackdropRef = ref(initialShow);
  let isCountdown = typeof modelValue.value !== 'boolean';
  watch(modelValue, () => {
    isCountdown = typeof modelValue.value !== 'boolean';
    if (noAction) {
      noAction = false;
      return;
    }
    if (modelValue.value) {
      show();
    } else {
      hide2();
    }
  });
  const localNoAnimation = ref(initialShow);
  const localTemporaryHide = ref(false);
  const computedNoAnimation = computed(() => props.noAnimation || props.noFade || localNoAnimation.value || false);
  onMounted(() => {
    var _a2;
    if (!props.show && initialShow) {
      const event = buildTriggerableEvent('show', { cancelable: true });
      emit('show', event);
      if (event.defaultPrevented) {
        emit('show-prevented', buildTriggerableEvent('show-prevented'));
        return;
      }
      localNoAnimation.value = true;
      if (!modelValue.value) {
        noAction = true;
        modelValue.value = true;
      }
      renderRef.value = true;
      renderBackdropRef.value = true;
      isVisible2.value = true;
      backdropVisible.value = true;
      backdropReady.value = true;
      showRef.value = true;
      (_a2 = options.showFn) == null ? void 0 : _a2.call(options);
    } else if (props.show || (!!modelValue.value && props.initialAnimation)) {
      show();
    }
  });
  watch(
    () => props.visible,
    newval => {
      localNoAnimation.value = true;
      nextTick(() => {
        if (newval) isVisible2.value = true;
        if (newval) {
          show();
        } else {
          hide2();
        }
      });
    },
  );
  watch(
    () => props.show,
    newval => {
      if (newval) {
        show();
      } else {
        hide2();
      }
    },
  );
  useEventListener(element, 'bv-toggle', () => {
    modelValue.value = !modelValue.value;
  });
  const buildTriggerableEvent = (type, opts = {}) =>
    new BvTriggerableEvent(type, {
      cancelable: false,
      target: (element == null ? void 0 : element.value) || null,
      relatedTarget: null,
      trigger: null,
      ...opts,
      componentId: computedId == null ? void 0 : computedId.value,
    });
  let showTimeout;
  const show = () => {
    if (showRef.value) return;
    const event = buildTriggerableEvent('show', { cancelable: true });
    emit('show', event);
    if (event.defaultPrevented) {
      emit('show-prevented', buildTriggerableEvent('show-prevented'));
      if (isVisible2.value) {
        isVisible2.value = false;
      }
      if (modelValue.value && !isCountdown) {
        noAction = true;
        nextTick(() => {
          modelValue.value = false;
        });
      }
      return;
    }
    renderRef.value = true;
    renderBackdropRef.value = true;
    requestAnimationFrame(() => {
      var _a2;
      showTimeout = setTimeout(
        () => {
          var _a3;
          showRef.value = true;
          (_a3 = options.showFn) == null ? void 0 : _a3.call(options);
          if (!modelValue.value) {
            noAction = true;
            nextTick(() => {
              modelValue.value = true;
            });
          }
        },
        localNoAnimation.value ? 0 : typeof props.delay === 'number' ? props.delay : ((_a2 = props.delay) == null ? void 0 : _a2.show) || 0,
      );
    });
  };
  const hide2 = trigger => {
    var _a2;
    if (!showRef.value) return;
    const event = buildTriggerableEvent('hide', { cancelable: true, trigger });
    const event2 = buildTriggerableEvent(trigger || 'ignore', { cancelable: true, trigger });
    if ((trigger === 'backdrop' && props.noCloseOnBackdrop) || (trigger === 'esc' && props.noCloseOnEsc)) {
      emit('hide-prevented', buildTriggerableEvent('hide-prevented'));
      return;
    }
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = void 0;
    }
    if (trigger) {
      emit(trigger, event2);
    }
    emit('hide', event);
    if (event.defaultPrevented || event2.defaultPrevented) {
      emit('hide-prevented', buildTriggerableEvent('hide-prevented'));
      if (!modelValue.value) {
        nextTick(() => {
          noAction = true;
          modelValue.value = true;
        });
      }
      return;
    }
    setTimeout(
      () => {
        var _a3;
        isLeaving.value = true;
        showRef.value = false;
        (_a3 = options.hideFn) == null ? void 0 : _a3.call(options);
        if (modelValue.value) {
          noAction = true;
          modelValue.value = isCountdown ? 0 : false;
        }
      },
      localNoAnimation.value ? 0 : typeof props.delay === 'number' ? props.delay : ((_a2 = props.delay) == null ? void 0 : _a2.hide) || 0,
    );
  };
  const throttleHide = useThrottleFn(a => hide2(a), 500);
  const throttleShow = useThrottleFn(() => show(), 500);
  const toggle2 = () => {
    const e = buildTriggerableEvent('toggle', { cancelable: true });
    emit('toggle', e);
    if (e.defaultPrevented) {
      emit('toggle-prevented', buildTriggerableEvent('toggle-prevented'));
      return;
    }
    if (showRef.value) {
      hide2();
    } else {
      show();
    }
  };
  const appRegistry =
    (_a = inject(globalShowHideStorageInjectionKey, void 0)) == null
      ? void 0
      : _a({
          id: computedId.value,
          toggle: toggle2,
          show,
          hide: hide2,
          value: readonly(showRef),
        });
  onBeforeUnmount(() => {
    appRegistry == null ? void 0 : appRegistry.unregister();
  });
  const lazyLoadCompleted = ref(false);
  const markLazyLoadCompleted = () => {
    if (props.lazy === true) lazyLoadCompleted.value = true;
  };
  const isLeaving = ref(false);
  const isActive = ref(false);
  const isVisible2 = ref(false);
  const onBeforeEnter = el => {
    var _a2, _b, _c, _d;
    (_b = (_a2 = options.transitionProps) == null ? void 0 : _a2.onBeforeEnter) == null ? void 0 : _b.call(_a2, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onBeforeEnter) == null ? void 0 : _d.call(_c, el);
    isActive.value = true;
  };
  const onEnter = el => {
    var _a2, _b, _c, _d;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isVisible2.value = true;
      });
    });
    (_b = (_a2 = options.transitionProps) == null ? void 0 : _a2.onEnter) == null ? void 0 : _b.call(_a2, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onEnter) == null ? void 0 : _d.call(_c, el);
  };
  const onAfterEnter = el => {
    var _a2, _b, _c, _d;
    emit('shown', buildTriggerableEvent('shown'));
    markLazyLoadCompleted();
    (_b = (_a2 = options.transitionProps) == null ? void 0 : _a2.onAfterEnter) == null ? void 0 : _b.call(_a2, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onAfterEnter) == null ? void 0 : _d.call(_c, el);
    if (localNoAnimation.value) {
      requestAnimationFrame(() => {
        localNoAnimation.value = false;
      });
    }
    if (localTemporaryHide.value) {
      localTemporaryHide.value = false;
    }
  };
  const onBeforeLeave = el => {
    var _a2, _b, _c, _d;
    if (!isLeaving.value) isLeaving.value = true;
    (_b = (_a2 = options.transitionProps) == null ? void 0 : _a2.onBeforeLeave) == null ? void 0 : _b.call(_a2, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onBeforeLeave) == null ? void 0 : _d.call(_c, el);
  };
  const onLeave = el => {
    var _a2, _b, _c, _d;
    isVisible2.value = false;
    (_b = (_a2 = options.transitionProps) == null ? void 0 : _a2.onLeave) == null ? void 0 : _b.call(_a2, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onLeave) == null ? void 0 : _d.call(_c, el);
  };
  const onAfterLeave = el => {
    var _a2, _b, _c, _d;
    emit('hidden', buildTriggerableEvent('hidden'));
    (_b = (_a2 = options.transitionProps) == null ? void 0 : _a2.onAfterLeave) == null ? void 0 : _b.call(_a2, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onAfterLeave) == null ? void 0 : _d.call(_c, el);
    isLeaving.value = false;
    isActive.value = false;
    if (localNoAnimation.value) {
      requestAnimationFrame(() => {
        localNoAnimation.value = false;
      });
    }
    requestAnimationFrame(() => {
      if (!localTemporaryHide.value) renderRef.value = false;
    });
  };
  const contentShowing = computed(
    () =>
      localTemporaryHide.value === true ||
      isActive.value === true ||
      props.lazy === false ||
      (props.lazy === true && lazyLoadCompleted.value === true && props.unmountLazy === false),
  );
  const trapActive = ref(false);
  watch(isVisible2, val => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              trapActive.value = val;
            }, 32);
          });
        });
      });
    });
  });
  const backdropVisible = ref(false);
  const backdropReady = ref(false);
  const transitionFunctions = {
    ...options.transitionProps,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
  };
  return {
    showRef,
    renderRef,
    renderBackdropRef,
    isVisible: isVisible2,
    isActive,
    trapActive,
    show,
    hide: hide2,
    toggle: toggle2,
    throttleHide,
    throttleShow,
    buildTriggerableEvent,
    computedNoAnimation,
    localNoAnimation,
    localTemporaryHide,
    isLeaving,
    transitionProps: {
      ...fadeBaseTransitionProps,
      ...props.transitionProps,
      ...transitionFunctions,
    },
    lazyLoadCompleted,
    markLazyLoadCompleted,
    contentShowing,
    backdropReady,
    backdropVisible,
    backdropTransitionProps: {
      ...fadeBaseTransitionProps,
      onBeforeEnter: () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            backdropVisible.value = true;
          });
        });
        backdropReady.value = false;
      },
      onAfterEnter: () => {
        backdropReady.value = true;
      },
      onBeforeLeave: () => {
        backdropVisible.value = false;
      },
      onAfterLeave: () => {
        backdropReady.value = false;
        requestAnimationFrame(() => {
          renderBackdropRef.value = false;
        });
      },
    },
  };
};

// node_modules/bootstrap-vue-next/dist/_plugin-vue_export-helper-1tPrXgE0.mjs
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

// node_modules/bootstrap-vue-next/dist/floatingUi-CNPoh8hs.mjs
var sides = ['top', 'right', 'bottom', 'left'];
var alignments = ['start', 'end'];
var placements = sides.reduce((acc, side) => acc.concat(side, side + '-' + alignments[0], side + '-' + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = v => ({
  x: v,
  y: v,
});
var oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};
var oppositeAlignmentMap = {
  start: 'end',
  end: 'start',
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide =
    alignmentAxis === 'x' ? (alignment === (rtl ? 'end' : 'start') ? 'right' : 'left') : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + '-' + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding,
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number'
    ? expandPaddingObject(padding)
    : {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding,
      };
}
function rectToClientRect(rect) {
  const { x, y, width, height } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y,
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let { reference, floating } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height,
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height,
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY,
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY,
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y,
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition$1 = async (reference, floating, config) => {
  const { placement = 'bottom', strategy = 'absolute', middleware = [], platform: platform2 } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy,
  });
  let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const { name, fn } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset,
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating,
      },
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data,
      },
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects =
            reset.rects === true
              ? await platform2.getElementRects({
                  reference,
                  floating,
                  strategy,
                })
              : reset.rects;
        }
        ({ x, y } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData,
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const { x, y, platform: platform2, rects, elements, strategy } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0,
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(
    await platform2.getClippingRect({
      element: (
        (_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null
          ? _await$platform$isEle
          : true
      )
        ? element
        : element.contextElement ||
          (await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy,
    }),
  );
  const rect =
    elementContext === 'floating'
      ? {
          x,
          y,
          width: rects.floating.width,
          height: rects.floating.height,
        }
      : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = (await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)))
    ? (await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent))) || {
        x: 1,
        y: 1,
      }
    : {
        x: 1,
        y: 1,
      };
  const elementClientRect = rectToClientRect(
    platform2.convertOffsetParentRelativeRectToViewportRelativeRect
      ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
          elements,
          rect,
          offsetParent,
          strategy,
        })
      : rect,
  );
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x,
  };
}
var arrow$2 = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const { x, y, placement, rects, platform: platform2, elements, middlewareData } = state;
    const { element, padding = 0 } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y,
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !(await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset =
      !middlewareData.arrow &&
      getAlignment(placement) != null &&
      center !== offset2 &&
      rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? (center < min$1 ? center - min$1 : center - max2) : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset,
        }),
      },
      reset: shouldAddOffset,
    };
  },
});
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment
    ? [
        ...allowedPlacements.filter(placement => getAlignment(placement) === alignment),
        ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment),
      ]
    : allowedPlacements.filter(placement => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter(placement => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
var autoPlacement$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'autoPlacement',
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const { rects, middlewareData, placement, platform: platform2, elements } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 =
        alignment !== void 0 || allowedPlacements === placements
          ? getPlacementList(alignment || null, autoAlignment, allowedPlacements)
          : allowedPlacements;
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(
        currentPlacement,
        rects,
        await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)),
      );
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0],
          },
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [
        ...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []),
        {
          placement: currentPlacement,
          overflows: currentOverflows,
        },
      ];
      const nextPlacement = placements$1[currentIndex + 1];
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows,
          },
          reset: {
            placement: nextPlacement,
          },
        };
      }
      const placementsSortedByMostSpace = allOverflows
        .map(d => {
          const alignment2 = getAlignment(d.placement);
          return [
            d.placement,
            alignment2 && crossAxis
              ? // Check along the mainAxis and main crossAxis side.
                d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0)
              : // Check only the mainAxis.
                d.overflows[0],
            d.overflows,
          ];
        })
        .sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d =>
        d[2]
          .slice(
            0,
            // Aligned placements should not check their opposite crossAxis
            // side.
            getAlignment(d[0]) ? 2 : 3,
          )
          .every(v => v <= 0),
      );
      const resetPlacement =
        ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) ||
        placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows,
          },
          reset: {
            placement: resetPlacement,
          },
        };
      }
      return {};
    },
  };
};
var flip$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const { placement, middlewareData, rects, initialPlacement, platform: platform2, elements } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements =
        specifiedFallbackPlacements ||
        (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [
        ...overflowsData,
        {
          placement,
          overflows,
        },
      ];
      if (!overflows.every(side2 => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData,
            },
            reset: {
              placement: nextPlacement,
            },
          };
        }
        let resetPlacement =
          (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) ==
          null
            ? void 0
            : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit': {
              var _overflowsData$filter2;
              const placement2 =
                (_overflowsData$filter2 = overflowsData
                  .filter(d => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement);
                      return (
                        currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                        // reading directions favoring greater width.
                        currentSideAxis === 'y'
                      );
                    }
                    return true;
                  })
                  .map(d => [d.placement, d.overflows.filter(overflow2 => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)])
                  .sort((a, b) => a[1] - b[1])[0]) == null
                  ? void 0
                  : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement,
            },
          };
        }
      }
      return {};
    },
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width,
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some(side => overflow[side] >= 0);
}
var hide$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'hide',
    options,
    async fn(state) {
      const { rects } = state;
      const { strategy = 'referenceHidden', ...detectOverflowOptions } = evaluate(options, state);
      switch (strategy) {
        case 'referenceHidden': {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: 'reference',
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets),
            },
          };
        }
        case 'escaped': {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true,
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets),
            },
          };
        }
        default: {
          return {};
        }
      }
    },
  };
};
function getBoundingRect(rects) {
  const minX = min(...rects.map(rect => rect.left));
  const minY = min(...rects.map(rect => rect.top));
  const maxX = max(...rects.map(rect => rect.right));
  const maxY = max(...rects.map(rect => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map(rect => rectToClientRect(getBoundingRect(rect)));
}
var inline$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'inline',
    options,
    async fn(state) {
      const { placement, elements, rects, platform: platform2, strategy } = state;
      const { padding = 2, x, y } = evaluate(options, state);
      const nativeClientRects = Array.from(
        (await (platform2.getClientRects == null ? void 0 : platform2.getClientRects(elements.reference))) || [],
      );
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
      const paddingObject = getPaddingObject(padding);
      function getBoundingClientRect2() {
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          return (
            clientRects.find(
              rect =>
                x > rect.left - paddingObject.left &&
                x < rect.right + paddingObject.right &&
                y > rect.top - paddingObject.top &&
                y < rect.bottom + paddingObject.bottom,
            ) || fallback
          );
        }
        if (clientRects.length >= 2) {
          if (getSideAxis(placement) === 'y') {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === 'top';
            const top2 = firstRect.top;
            const bottom2 = lastRect.bottom;
            const left2 = isTop ? firstRect.left : lastRect.left;
            const right2 = isTop ? firstRect.right : lastRect.right;
            const width2 = right2 - left2;
            const height2 = bottom2 - top2;
            return {
              top: top2,
              bottom: bottom2,
              left: left2,
              right: right2,
              width: width2,
              height: height2,
              x: left2,
              y: top2,
            };
          }
          const isLeftSide = getSide(placement) === 'left';
          const maxRight = max(...clientRects.map(rect => rect.right));
          const minLeft = min(...clientRects.map(rect => rect.left));
          const measureRects = clientRects.filter(rect => (isLeftSide ? rect.left === minLeft : rect.right === maxRight));
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top,
          };
        }
        return fallback;
      }
      const resetRects = await platform2.getElementRects({
        reference: {
          getBoundingClientRect: getBoundingClientRect2,
        },
        floating: elements.floating,
        strategy,
      });
      if (
        rects.reference.x !== resetRects.reference.x ||
        rects.reference.y !== resetRects.reference.y ||
        rects.reference.width !== resetRects.reference.width ||
        rects.reference.height !== resetRects.reference.height
      ) {
        return {
          reset: {
            rects: resetRects,
          },
        };
      }
      return {};
    },
  };
};
async function convertValueToCoords(state, options) {
  const { placement, platform: platform2, elements } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let { mainAxis, crossAxis, alignmentAxis } =
    typeof rawValue === 'number'
      ? {
          mainAxis: rawValue,
          crossAxis: 0,
          alignmentAxis: null,
        }
      : {
          mainAxis: rawValue.mainAxis || 0,
          crossAxis: rawValue.crossAxis || 0,
          alignmentAxis: rawValue.alignmentAxis,
        };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical
    ? {
        x: crossAxis * crossAxisMulti,
        y: mainAxis * mainAxisMulti,
      }
    : {
        x: mainAxis * mainAxisMulti,
        y: crossAxis * crossAxisMulti,
      };
}
var offset$1 = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const { x, y, placement, middlewareData } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (
        placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) &&
        (_middlewareData$arrow = middlewareData.arrow) != null &&
        _middlewareData$arrow.alignmentOffset
      ) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement,
        },
      };
    },
  };
};
var shift$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const { x, y, placement } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let { x: x2, y: y2 } = _ref;
            return {
              x: x2,
              y: y2,
            };
          },
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y,
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord,
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis,
          },
        },
      };
    },
  };
};
var size$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const { placement, rects, platform: platform2, elements } = state;
      const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === 'y';
      const { width, height } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide =
          alignment === ((await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating))) ? 'start' : 'end')
            ? 'left'
            : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight,
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true,
          },
        };
      }
      return {};
    },
  };
};
function hasWindow() {
  return typeof window !== 'undefined';
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const { overflow, overflowX, overflowY, display } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [':popover-open', ':modal'].some(selector => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return (
    css.transform !== 'none' ||
    css.perspective !== 'none' ||
    (css.containerType ? css.containerType !== 'normal' : false) ||
    (!webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false)) ||
    (!webkit && (css.filter ? css.filter !== 'none' : false)) ||
    ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) ||
    ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value))
  );
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY,
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    (isShadowRoot(node) && node.host) || // Fallback.
    getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(
      win,
      win.visualViewport || [],
      isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
      frameElement && traverseIframes ? getOverflowAncestors(frameElement) : [],
    );
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback,
  };
}
function unwrapElement$1(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement$1(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const { width, height, $ } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y,
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop,
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || (isFixed && floatingOffsetParent !== getWindow(element))) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement$1(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y,
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x =
    htmlRect.left +
    scroll.scrollLeft -
    (ignoreScrollbarX
      ? 0
      : // RTL <body> scrollbar.
        getWindowScrollBarX(documentElement, htmlRect));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y,
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let { elements, rect, offsetParent, strategy } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || (topLayer && isFixed)) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y,
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y,
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || (visualViewportBased && strategy === 'fixed')) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y,
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y,
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height,
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed
      ? !currentNodeIsContaining && !currentContainingBlockComputedStyle
      : (!currentNodeIsContaining &&
          computedStyle.position === 'static' &&
          !!currentContainingBlockComputedStyle &&
          ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position)) ||
        (isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode));
    if (shouldDropCurrentNode) {
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let { element, boundary, rootBoundary, strategy } = _ref;
  const elementClippingAncestors =
    boundary === 'clippingAncestors' ? (isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c)) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce(
    (accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    },
    getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy),
  );
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top,
  };
}
function getDimensions(element) {
  const { width, height } = getCssDimensions(element);
  return {
    width,
    height,
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height,
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === 'static';
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height,
    },
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === 'rtl';
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL,
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const { left, top, width, height } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + 'px ' + -insetRight + 'px ' + -insetBottom + 'px ' + -insetLeft + 'px';
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1,
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument,
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false,
  } = options;
  const referenceEl = unwrapElement$1(reference);
  const ancestors =
    ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll &&
      ancestor.addEventListener('scroll', update, {
        passive: true,
      });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (
      prevRefRect &&
      (nextRefRect.x !== prevRefRect.x ||
        nextRefRect.y !== prevRefRect.y ||
        nextRefRect.width !== prevRefRect.width ||
        nextRefRect.height !== prevRefRect.height)
    ) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset = offset$1;
var autoPlacement = autoPlacement$1;
var shift = shift$1;
var flip = flip$1;
var size = size$1;
var hide = hide$1;
var arrow$1 = arrow$2;
var inline = inline$1;
var computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options,
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache,
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache,
  });
};
function isComponentPublicInstance(target) {
  return target != null && typeof target === 'object' && '$el' in target;
}
function unwrapElement(target) {
  if (isComponentPublicInstance(target)) {
    const element = target.$el;
    return isNode(element) && getNodeName(element) === '#comment' ? null : element;
  }
  return target;
}
function toValue3(source) {
  return typeof source === 'function' ? source() : unref(source);
}
function arrow(options) {
  return {
    name: 'arrow',
    options,
    fn(args) {
      const element = unwrapElement(toValue3(options.element));
      if (element == null) {
        return {};
      }
      return arrow$1({
        element,
        padding: options.padding,
      }).fn(args);
    },
  };
}
function getDPR(element) {
  if (typeof window === 'undefined') {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useFloating(reference, floating, options) {
  if (options === void 0) {
    options = {};
  }
  const whileElementsMountedOption = options.whileElementsMounted;
  const openOption = computed(() => {
    var _toValue;
    return (_toValue = toValue3(options.open)) != null ? _toValue : true;
  });
  const middlewareOption = computed(() => toValue3(options.middleware));
  const placementOption = computed(() => {
    var _toValue2;
    return (_toValue2 = toValue3(options.placement)) != null ? _toValue2 : 'bottom';
  });
  const strategyOption = computed(() => {
    var _toValue3;
    return (_toValue3 = toValue3(options.strategy)) != null ? _toValue3 : 'absolute';
  });
  const transformOption = computed(() => {
    var _toValue4;
    return (_toValue4 = toValue3(options.transform)) != null ? _toValue4 : true;
  });
  const referenceElement = computed(() => unwrapElement(reference.value));
  const floatingElement = computed(() => unwrapElement(floating.value));
  const x = ref(0);
  const y = ref(0);
  const strategy = ref(strategyOption.value);
  const placement = ref(placementOption.value);
  const middlewareData = shallowRef({});
  const isPositioned = ref(false);
  const floatingStyles = computed(() => {
    const initialStyles = {
      position: strategy.value,
      left: '0',
      top: '0',
    };
    if (!floatingElement.value) {
      return initialStyles;
    }
    const xVal = roundByDPR(floatingElement.value, x.value);
    const yVal = roundByDPR(floatingElement.value, y.value);
    if (transformOption.value) {
      return {
        ...initialStyles,
        transform: 'translate(' + xVal + 'px, ' + yVal + 'px)',
        ...(getDPR(floatingElement.value) >= 1.5 && {
          willChange: 'transform',
        }),
      };
    }
    return {
      position: strategy.value,
      left: xVal + 'px',
      top: yVal + 'px',
    };
  });
  let whileElementsMountedCleanup;
  function update() {
    if (referenceElement.value == null || floatingElement.value == null) {
      return;
    }
    const open = openOption.value;
    computePosition(referenceElement.value, floatingElement.value, {
      middleware: middlewareOption.value,
      placement: placementOption.value,
      strategy: strategyOption.value,
    }).then(position => {
      x.value = position.x;
      y.value = position.y;
      strategy.value = position.strategy;
      placement.value = position.placement;
      middlewareData.value = position.middlewareData;
      isPositioned.value = open !== false;
    });
  }
  function cleanup() {
    if (typeof whileElementsMountedCleanup === 'function') {
      whileElementsMountedCleanup();
      whileElementsMountedCleanup = void 0;
    }
  }
  function attach() {
    cleanup();
    if (whileElementsMountedOption === void 0) {
      update();
      return;
    }
    if (referenceElement.value != null && floatingElement.value != null) {
      whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
      return;
    }
  }
  function reset() {
    if (!openOption.value) {
      isPositioned.value = false;
    }
  }
  watch([middlewareOption, placementOption, strategyOption, openOption], update, {
    flush: 'sync',
  });
  watch([referenceElement, floatingElement], attach, {
    flush: 'sync',
  });
  watch(openOption, reset, {
    flush: 'sync',
  });
  if (getCurrentScope()) {
    onScopeDispose(cleanup);
  }
  return {
    x: shallowReadonly(x),
    y: shallowReadonly(y),
    strategy: shallowReadonly(strategy),
    placement: shallowReadonly(placement),
    middlewareData: shallowReadonly(middlewareData),
    isPositioned: shallowReadonly(isPositioned),
    floatingStyles,
    update,
  };
}
var useMouse2 = createSharedComposable(useMouse);
var _hoisted_1 = ['id'];
var _hoisted_2 = ['id'];
var _sfc_main2 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BPopover',
  props: mergeModels(
    {
      boundary: { default: 'clippingAncestors' },
      boundaryPadding: { default: void 0 },
      click: { type: Boolean, default: false },
      closeOnHide: { type: Boolean, default: false },
      content: { default: void 0 },
      customClass: { default: '' },
      delay: { default: () => ({ show: 100, hide: 300 }) },
      floatingMiddleware: { default: void 0 },
      hideMargin: { default: 2 },
      id: { default: void 0 },
      inline: { type: Boolean, default: false },
      manual: { type: Boolean, default: false },
      noAutoClose: { type: Boolean, default: false },
      noFlip: { type: Boolean, default: false },
      noHide: { type: Boolean, default: false },
      noShift: { type: Boolean, default: false },
      noSize: { type: Boolean, default: false },
      noninteractive: { type: Boolean, default: false },
      offset: { default: null },
      placement: { default: 'top' },
      realtime: { type: Boolean, default: false },
      reference: { default: null },
      strategy: { default: 'absolute' },
      target: { default: null },
      title: { default: void 0 },
      tooltip: { type: Boolean, default: false },
      variant: { default: null },
      teleportDisabled: { type: Boolean, default: false },
      teleportTo: { default: void 0 },
      initialAnimation: { type: Boolean, default: false },
      noAnimation: { type: Boolean },
      noFade: { type: Boolean, default: false },
      lazy: { type: Boolean, default: false },
      unmountLazy: { type: Boolean, default: false },
      show: { type: Boolean, default: false },
      transProps: {},
      visible: { type: Boolean, default: false },
    },
    {
      modelValue: {
        type: Boolean,
        ...{
          default: false,
        },
      },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(
    [
      'pointerleave',
      'blur',
      'click-outside',
      'close-on-hide',
      'hide',
      'hide-prevented',
      'hidden',
      'show',
      'show-prevented',
      'shown',
      'toggle',
      'toggle-prevented',
    ],
    ['update:modelValue'],
  ),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BPopover');
    const emit = __emit;
    const slots = useSlots();
    const modelValue = useModel(__props, 'modelValue');
    const computedId = useId2(() => props.id, 'popover');
    const hidden = ref(false);
    const element = useTemplateRef('_element');
    const content = useTemplateRef('_content');
    const arrow$12 = useTemplateRef('_arrow');
    const placeholder = useTemplateRef('_placeholder');
    const floatingTarget = ref(null);
    const trigger = ref(null);
    const isAutoPlacement = computed(() => props.placement.startsWith('auto'));
    const offsetNumber = useToNumber(() => props.offset ?? NaN);
    const boundary = computed(() => (isBoundary(props.boundary) ? props.boundary : void 0));
    const rootBoundary = computed(() => (isRootBoundary(props.boundary) ? props.boundary : void 0));
    const sizeStyles = ref({});
    const floatingMiddleware = computed(() => {
      if (props.floatingMiddleware !== void 0) {
        return props.floatingMiddleware;
      }
      const off = props.offset !== null ? offsetNumber.value : props.tooltip ? 6 : 8;
      const arr = [offset(off)];
      if (props.noFlip === false && !isAutoPlacement.value) {
        arr.push(
          flip({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding,
          }),
        );
      }
      if (isAutoPlacement.value) {
        arr.push(
          autoPlacement({
            alignment: props.placement.split('-')[1] || void 0,
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding,
          }),
        );
      }
      if (props.noShift === false) {
        arr.push(
          shift({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding,
          }),
        );
      }
      if (props.noHide === false) {
        arr.push(
          hide({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding,
          }),
        );
      }
      if (props.inline === true) {
        arr.push(inline());
      }
      arr.push(arrow({ element: arrow$12, padding: 10 }));
      if (props.noSize === false) {
        arr.push(
          size({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding,
            apply({ availableWidth, availableHeight }) {
              var _a, _b;
              sizeStyles.value = {
                maxHeight:
                  availableHeight >= (((_a = content.value) == null ? void 0 : _a.scrollHeight) ?? 0)
                    ? void 0
                    : availableHeight
                      ? `${Math.max(0, availableHeight)}px`
                      : void 0,
                maxWidth:
                  availableWidth >= (((_b = content.value) == null ? void 0 : _b.scrollWidth) ?? 0)
                    ? void 0
                    : availableWidth
                      ? `${Math.max(0, availableWidth)}px`
                      : void 0,
              };
            },
          }),
        );
      }
      return arr;
    });
    const placementRef = computed(() => (isAutoPlacement.value ? void 0 : props.placement));
    const { floatingStyles, middlewareData, placement, update } = useFloating(floatingTarget, element, {
      placement: placementRef,
      middleware: floatingMiddleware,
      strategy: toRef(() => props.strategy),
    });
    const arrowStyle = ref({ position: 'absolute' });
    watch(middlewareData, newValue => {
      var _a, _b;
      if (props.noHide === false) {
        if (((_a = newValue.hide) == null ? void 0 : _a.referenceHidden) && !hidden.value && showRef.value) {
          if (props.closeOnHide && !props.noAutoClose && !props.manual) {
            throttleHide('close-on-hide');
          } else {
            localTemporaryHide.value = true;
            hidden.value = true;
          }
        } else if (localTemporaryHide.value && !((_b = newValue.hide) == null ? void 0 : _b.referenceHidden)) {
          localTemporaryHide.value = false;
          hidden.value = false;
        }
      }
      if (newValue.arrow) {
        const { x: x2, y: y2 } = newValue.arrow;
        arrowStyle.value = {
          position: 'absolute',
          top: y2 ? `${y2}px` : '',
          left: x2 ? `${x2}px` : '',
        };
      }
    });
    let cleanup;
    const {
      showRef,
      hide: hide$12,
      show,
      toggle: toggle2,
      throttleHide,
      computedNoAnimation,
      transitionProps,
      contentShowing,
      isVisible: isVisible2,
      renderRef,
      localTemporaryHide,
    } = useShowHide(modelValue, props, emit, element, computedId, {
      showFn: () => {
        update();
        nextTick(() => {
          cleanup = autoUpdate(floatingTarget.value, element.value, update, { animationFrame: props.realtime });
        });
      },
      hideFn: () => {
        if (cleanup) {
          cleanup();
          cleanup = void 0;
        }
      },
    });
    const computedClasses = computed(() => {
      const type = props.tooltip ? 'tooltip' : 'popover';
      return [
        type,
        `b-${type}`,
        {
          [`b-${type}-${props.variant}`]: props.variant !== null,
          show: isVisible2.value && !hidden.value,
          fade: !computedNoAnimation.value,
          [`${props.customClass}`]: props.customClass !== void 0,
          [`bs-${type}-${resolveBootstrapPlacement(placement.value)}`]: placement.value !== void 0,
        },
      ];
    });
    const { x, y } = useMouse2();
    const isElementAndTriggerOutside = () => {
      var _a, _b;
      const triggerRect = (_a = trigger.value) == null ? void 0 : _a.getBoundingClientRect();
      const elementRect = (_b = element.value) == null ? void 0 : _b.getBoundingClientRect();
      const margin = parseInt(props.hideMargin, 10) || 0;
      const offsetX = (window == null ? void 0 : window.scrollX) || 0;
      const offsetY = (window == null ? void 0 : window.scrollY) || 0;
      const triggerIsOutside =
        !triggerRect ||
        x.value < triggerRect.left + offsetX - margin ||
        x.value > triggerRect.right + offsetX + margin ||
        y.value < triggerRect.top + offsetY - margin ||
        y.value > triggerRect.bottom + offsetY + margin;
      const isOutside =
        !elementRect ||
        x.value < elementRect.left + offsetX - margin ||
        x.value > elementRect.right + offsetX + margin ||
        y.value < elementRect.top + offsetY - margin ||
        y.value > elementRect.bottom + offsetY + margin;
      return { triggerIsOutside, isOutside };
    };
    let looptimeout;
    const tryHide = e => {
      var _a, _b, _c;
      const delay3 = typeof props.delay === 'number' ? props.delay : ((_a = props.delay) == null ? void 0 : _a.hide) || 0;
      const { triggerIsOutside, isOutside } = isElementAndTriggerOutside();
      if (
        (!props.noninteractive &&
          isOutside &&
          triggerIsOutside &&
          !((_b = element.value) == null ? void 0 : _b.contains(document == null ? void 0 : document.activeElement)) &&
          !((_c = trigger.value) == null ? void 0 : _c.contains(document == null ? void 0 : document.activeElement))) ||
        (props.noninteractive && triggerIsOutside)
      ) {
        hide$12(e == null ? void 0 : e.type);
      } else {
        if (looptimeout) clearTimeout(looptimeout);
        looptimeout = setTimeout(
          () => {
            tryHide(e);
          },
          delay3 < 50 ? 50 : delay3,
        );
      }
    };
    watch(isVisible2, () => {
      update();
    });
    __expose({
      hide: hide$12,
      show,
      toggle: toggle2,
    });
    const localToggle = e => {
      if (showRef.value) {
        hide$12(e.type === 'click' ? 'click' : 'toggle');
      } else {
        show();
      }
    };
    const bind22 = () => {
      var _a;
      if (props.target) {
        const elem = getElement(toValue(props.target));
        if (elem) {
          trigger.value = elem;
        } else {
          console.warn('Target element not found', props.target);
        }
      } else {
        trigger.value = (_a = placeholder.value) == null ? void 0 : _a.nextElementSibling;
      }
      if (props.reference) {
        const elem = getElement(toValue(props.reference));
        if (elem) {
          floatingTarget.value = elem;
        } else {
          console.warn('Reference element not found', props.reference);
        }
      } else {
        floatingTarget.value = trigger.value;
      }
      if (!trigger.value || props.manual) {
        return;
      }
      if (props.click) {
        trigger.value.addEventListener('click', localToggle);
        return;
      }
      trigger.value.addEventListener('pointerenter', show);
      trigger.value.addEventListener('pointerleave', tryHide);
      trigger.value.addEventListener('focus', show);
      trigger.value.addEventListener('blur', tryHide);
    };
    const unbind2 = () => {
      if (trigger.value) {
        trigger.value.removeEventListener('click', localToggle);
        trigger.value.removeEventListener('pointerenter', show);
        trigger.value.removeEventListener('pointerleave', tryHide);
        trigger.value.removeEventListener('focus', show);
        trigger.value.removeEventListener('blur', tryHide);
      }
    };
    onClickOutside(
      element,
      () => {
        if (showRef.value && props.click && !props.noAutoClose && !props.manual) hide$12('click-outside');
      },
      { ignore: [trigger] },
    );
    watch([() => props.click, () => props.target, () => props.reference], () => {
      unbind2();
      bind22();
    });
    onMounted(() => {
      bind22();
      nextTick(() => {
        update();
      });
    });
    onBeforeUnmount(unbind2);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode(
              'span',
              {
                id: unref(computedId) + '_placeholder',
                ref: '_placeholder',
                style: { display: 'none' },
              },
              null,
              8,
              _hoisted_1,
            ),
            renderSlot(
              _ctx.$slots,
              'target',
              {
                show: unref(show),
                hide: unref(hide$12),
                toggle: unref(toggle2),
                visible: unref(showRef),
              },
              void 0,
              true,
            ),
            createVNode(
              _sfc_main,
              {
                to: unref(props).teleportTo,
                disabled: !unref(props).teleportTo || unref(props).teleportDisabled,
              },
              {
                default: withCtx(() => [
                  unref(renderRef) || unref(contentShowing)
                    ? (openBlock(),
                      createBlock(
                        Transition,
                        mergeProps({ key: 0 }, unref(transitionProps), {
                          appear: modelValue.value || unref(props).visible,
                        }),
                        {
                          default: withCtx(() => [
                            withDirectives(
                              createBaseVNode(
                                'div',
                                mergeProps({ id: unref(computedId) }, _ctx.$attrs, {
                                  ref: '_element',
                                  class: computedClasses.value,
                                  role: 'tooltip',
                                  tabindex: '-1',
                                  style: unref(floatingStyles),
                                }),
                                [
                                  createBaseVNode(
                                    'div',
                                    {
                                      ref: '_arrow',
                                      class: normalizeClass(`${unref(props).tooltip ? 'tooltip' : 'popover'}-arrow`),
                                      style: normalizeStyle(arrowStyle.value),
                                      'data-popper-arrow': '',
                                    },
                                    null,
                                    6,
                                  ),
                                  createBaseVNode(
                                    'div',
                                    {
                                      ref: '_content',
                                      class: 'overflow-auto',
                                      style: normalizeStyle(sizeStyles.value),
                                    },
                                    [
                                      unref(props).title || slots.title
                                        ? (openBlock(),
                                          createElementBlock(
                                            'div',
                                            {
                                              key: 0,
                                              class: normalizeClass([
                                                'position-sticky top-0',
                                                unref(props).tooltip ? 'tooltip-inner' : 'popover-header',
                                              ]),
                                            },
                                            [
                                              renderSlot(
                                                _ctx.$slots,
                                                'title',
                                                {},
                                                () => [createTextVNode(toDisplayString(unref(props).title), 1)],
                                                true,
                                              ),
                                            ],
                                            2,
                                          ))
                                        : createCommentVNode('', true),
                                      (unref(props).tooltip && !slots.title && !unref(props).title) || !unref(props).tooltip
                                        ? (openBlock(),
                                          createElementBlock(
                                            'div',
                                            {
                                              key: 1,
                                              class: normalizeClass(unref(props).tooltip ? 'tooltip-inner' : 'popover-body'),
                                            },
                                            [
                                              renderSlot(
                                                _ctx.$slots,
                                                'default',
                                                {},
                                                () => [createTextVNode(toDisplayString(unref(props).content), 1)],
                                                true,
                                              ),
                                            ],
                                            2,
                                          ))
                                        : createCommentVNode('', true),
                                    ],
                                    4,
                                  ),
                                ],
                                16,
                                _hoisted_2,
                              ),
                              [[vShow, unref(showRef) && !hidden.value]],
                            ),
                          ]),
                          _: 3,
                        },
                        16,
                        ['appear'],
                      ))
                    : createCommentVNode('', true),
                ]),
                _: 3,
              },
              8,
              ['to', 'disabled'],
            ),
          ],
          64,
        )
      );
    };
  },
});
var BPopover = _export_sfc(_sfc_main2, [['__scopeId', 'data-v-9445feff']]);
var resolveBootstrapPlacement = placement => {
  const [_placement] = placement.split('-');
  switch (_placement) {
    case 'left':
      return 'start';
    case 'right':
      return 'end';
    default:
      return _placement;
  }
};
var resolveBootstrapCaret = placement => {
  const [_placement] = placement.split('-');
  switch (_placement) {
    case 'left':
      return 'start';
    case 'right':
      return 'end';
    case 'top':
      return 'up';
    case 'bottom':
      return 'down';
    default:
      return _placement;
  }
};
var resolveActiveStatus = values => typeof values !== 'object' || values.active !== false;
var resolveContent = (values, el) => {
  const isActive = resolveActiveStatus(values);
  if (!isActive) return {};
  const missingBindingValue = typeof values === 'undefined' || (typeof values === 'object' && !values.title && !values.content);
  const title = el.getAttribute('title') || el.getAttribute('data-original-title');
  if (missingBindingValue) {
    if (title) {
      el.removeAttribute('title');
      el.setAttribute('data-original-title', title);
      return {
        content: title,
      };
    }
    return {};
  }
  if (typeof values === 'string') {
    return {
      content: values,
    };
  }
  return {
    title: (values == null ? void 0 : values.title) ? (values == null ? void 0 : values.title) : void 0,
    content: (values == null ? void 0 : values.content) ? (values == null ? void 0 : values.content) : void 0,
  };
};
var resolveDirectiveProps = (binding, el) => ({
  target: el,
  modelValue: binding.modifiers.show,
  inline: binding.modifiers.inline,
  click: binding.modifiers.click,
  realtime: binding.modifiers.realtime,
  lazy: binding.modifiers.lazy,
  placement: binding.modifiers.left
    ? 'left'
    : binding.modifiers.right
      ? 'right'
      : binding.modifiers.bottom
        ? 'bottom'
        : binding.modifiers.top
          ? 'top'
          : void 0,
  html: true,
  ...(typeof binding.value === 'object' ? binding.value : void 0),
  ...(binding.modifiers.interactive ? { noninteractive: false } : void 0),
  title: null,
  content: null,
});
var bind = (el, binding, props) => {
  var _a;
  const div = document.createElement('span');
  if (binding.modifiers.body) document.body.appendChild(div);
  else if (binding.modifiers.child) el.appendChild(div);
  else (_a = el.parentNode) == null ? void 0 : _a.insertBefore(div, el.nextSibling);
  render(h(BPopover, props), div);
  el.$__element = div;
};
var unbind = el => {
  const div = el.$__element;
  if (div) render(null, div);
  setTimeout(() => {
    div == null ? void 0 : div.remove();
  }, 0);
  delete el.$__element;
};
var isBoundary = input => input === 'clippingAncestors' || input instanceof Element || Array.isArray(input);
var isRootBoundary = input => !isBoundary(input);

// node_modules/bootstrap-vue-next/dist/src/directives/BPopover/index.mjs
var vBPopover = {
  mounted(el, binding, vnode) {
    var _a;
    const defaults = (_a = findProvides(binding, vnode)[defaultsKey]) == null ? void 0 : _a.value;
    const isActive = resolveActiveStatus(binding.value);
    if (!isActive) return;
    const text = resolveContent(binding.value, el);
    if (!text.content && !text.title) return;
    el.$__binding = JSON.stringify([binding.modifiers, binding.value]);
    bind(el, binding, {
      ...(defaults['BPopover'] || void 0),
      ...resolveDirectiveProps(binding, el),
      ...text,
    });
  },
  updated(el, binding, vnode) {
    var _a;
    const defaults = (_a = findProvides(binding, vnode)[defaultsKey]) == null ? void 0 : _a.value;
    const isActive = resolveActiveStatus(binding.value);
    if (!isActive) return;
    const text = resolveContent(binding.value, el);
    if (!text.content && !text.title) return;
    delete binding.oldValue;
    if (el.$__binding === JSON.stringify([binding.modifiers, binding.value])) return;
    unbind(el);
    bind(el, binding, {
      ...(defaults['BPopover'] || void 0),
      ...resolveDirectiveProps(binding, el),
      ...text,
    });
    el.$__binding = JSON.stringify([binding.modifiers, binding.value]);
  },
  beforeUnmount(el) {
    unbind(el);
  },
};

// node_modules/bootstrap-vue-next/dist/object-DIbMZaP9.mjs
var omit = (objToPluck, keysToPluck) =>
  Object.keys(objToPluck)
    .filter(key => !keysToPluck.map(el => el.toString()).includes(key))
    .reduce((result, key) => ({ ...result, [key]: objToPluck[key] }), {});
var pick = (objToPluck, keysToPluck) =>
  [...keysToPluck].reduce((memo, prop) => {
    memo[prop] = objToPluck[prop];
    return memo;
  }, {});
var get = (value, path, defaultValue) => {
  const segments = path.split(/[.[\]]/g);
  let current = value;
  for (const key of segments) {
    if (current === null) return defaultValue;
    if (current === void 0) return defaultValue;
    if (key.trim() === '') continue;
    current = current[key];
  }
  if (current === void 0) return defaultValue;
  return current;
};
var set = (initial, path, value) => {
  const clone = obj => {
    const isPrimitive = value2 => value2 === void 0 || value2 === null || (typeof value2 !== 'object' && typeof value2 !== 'function');
    if (isPrimitive(obj)) {
      return obj;
    }
    if (typeof obj === 'function') {
      return obj.bind({});
    }
    const newObj = new obj.constructor();
    Object.getOwnPropertyNames(obj).forEach(prop => {
      newObj[prop] = obj[prop];
    });
    return newObj;
  };
  const toInt = (value2, defaultValue) => {
    const def = defaultValue === void 0 ? 0 : defaultValue;
    if (value2 === null || value2 === void 0) {
      return def;
    }
    const result = Number.parseInt(value2);
    return Number.isNaN(result) ? def : result;
  };
  if (!initial) return {};
  if (!path || value === void 0) return initial;
  const segments = path.split(/[.[\]]/g).filter(x => !!x.trim());
  const _set = node => {
    if (segments.length > 1) {
      const key = segments.shift();
      const nextIsNum = toInt(segments[0], null) === null ? false : true;
      node[key] = node[key] === void 0 ? (nextIsNum ? [] : {}) : node[key];
      _set(node[key]);
    } else {
      node[segments[0]] = value;
    }
  };
  const cloned = clone(initial);
  _set(cloned);
  return cloned;
};

// node_modules/bootstrap-vue-next/dist/src/directives/BScrollspy/index.mjs
var bind2 = (el, binding) => {
  if (el.$__scrollspy) el.$__scrollspy.cleanup();
  const { arg, value } = binding;
  const isObject3 = typeof value === 'object' && value !== null;
  const content = arg ? arg : typeof value === 'string' ? value : isObject3 ? value.content || value.element : null;
  el.$__scrollspy = useScrollspy(content, el, isObject3 ? omit(value, ['content', 'element']) : {});
};
var vBScrollspy = {
  mounted: bind2,
  updated: bind2,
  beforeUnmount(el) {
    if (el.$__scrollspy) el.$__scrollspy.cleanup();
  },
};

// node_modules/bootstrap-vue-next/dist/src/directives/BTooltip/index.mjs
var vBTooltip = {
  mounted(el, binding, vnode) {
    var _a;
    const defaults = (_a = findProvides(binding, vnode)[defaultsKey]) == null ? void 0 : _a.value;
    const isActive = resolveActiveStatus(binding.value);
    if (!isActive) return;
    const text = resolveContent(binding.value, el);
    if (!text.content && !text.title) return;
    el.$__binding = JSON.stringify([binding.modifiers, binding.value]);
    bind(el, binding, {
      noninteractive: true,
      ...(defaults['BTooltip'] || void 0),
      ...resolveDirectiveProps(binding, el),
      title: text.title ?? text.content ?? '',
      tooltip: isActive,
    });
  },
  updated(el, binding, vnode) {
    var _a;
    const defaults = (_a = findProvides(binding, vnode)[defaultsKey]) == null ? void 0 : _a.value;
    const isActive = resolveActiveStatus(binding.value);
    if (!isActive) return;
    const text = resolveContent(binding.value, el);
    if (!text.content && !text.title) return;
    delete binding.oldValue;
    if (el.$__binding === JSON.stringify([binding.modifiers, binding.value])) return;
    unbind(el);
    bind(el, binding, {
      noninteractive: true,
      ...(defaults['BTooltip'] || void 0),
      ...resolveDirectiveProps(binding, el),
      title: text.title ?? text.content ?? '',
      tooltip: isActive,
    });
    el.$__binding = JSON.stringify([binding.modifiers, binding.value]);
  },
  beforeUnmount(el) {
    unbind(el);
  },
};

// node_modules/bootstrap-vue-next/dist/index-CXpBEYSc.mjs
var index2 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      vBColorMode,
      vBModal: vBToggle,
      vBPopover,
      vBScrollspy,
      vBToggle,
      vBTooltip,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

// node_modules/bootstrap-vue-next/dist/index-i-UFv70c.mjs
var index3 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      BvCarouselEvent,
      BvEvent,
      BvTriggerableEvent,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

// node_modules/bootstrap-vue-next/dist/BCollapse.vue_vue_type_script_setup_true_lang-DjUDEnp7.mjs
var _sfc_main3 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BCollapse',
  props: mergeModels(
    {
      horizontal: { type: Boolean, default: false },
      id: { default: void 0 },
      isNav: { type: Boolean, default: false },
      tag: { default: 'div' },
      initialAnimation: { type: Boolean, default: false },
      noAnimation: { type: Boolean, default: false },
      noFade: { type: Boolean },
      lazy: { type: Boolean, default: false },
      unmountLazy: { type: Boolean, default: false },
      show: { type: Boolean, default: false },
      transProps: {},
      visible: { type: Boolean, default: false },
    },
    {
      modelValue: {
        type: Boolean,
        ...{
          default: false,
        },
      },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(
    ['hide', 'hide-prevented', 'hidden', 'show', 'show-prevented', 'shown', 'toggle', 'toggle-prevented'],
    ['update:modelValue'],
  ),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BCollapse');
    const emit = __emit;
    const modelValue = useModel(__props, 'modelValue');
    const computedId = useId2(() => props.id, 'collapse');
    const element = useTemplateRef('_element');
    let inCollapse = false;
    const onEnter = el => {
      inCollapse = true;
      requestAnimationFrame(() => {
        if (props.horizontal) {
          el.style.width = `${el.scrollWidth}px`;
        } else {
          el.style.height = `${el.scrollHeight}px`;
        }
      });
    };
    const onBeforeLeave = el => {
      if (inCollapse) {
        return;
      }
      if (props.horizontal) {
        el.style.width = `${el.scrollWidth}px`;
      } else {
        el.style.height = `${el.scrollHeight}px`;
      }
      el.offsetHeight;
    };
    const onLeave = el => {
      requestAnimationFrame(() => {
        if (props.horizontal) {
          el.style.width = ``;
        } else {
          el.style.height = ``;
        }
      });
    };
    const onAfterEnter = el => {
      el.style.height = ``;
      el.style.width = ``;
      inCollapse = false;
    };
    const onAfterLeave = el => {
      el.style.height = ``;
      el.style.width = ``;
      inCollapse = false;
    };
    const {
      showRef,
      renderRef,
      hide: hide2,
      show,
      toggle: toggle2,
      isActive,
      computedNoAnimation,
      contentShowing,
      transitionProps,
    } = useShowHide(modelValue, props, emit, element, computedId, {
      // addShowClass: false,
      transitionProps: {
        onBeforeLeave,
        onEnter,
        onLeave,
        onAfterEnter,
        onAfterLeave,
        enterToClass: '',
        leaveToClass: '',
        enterFromClass: '',
        leaveFromClass: '',
        enterActiveClass: '',
        leaveActiveClass: '',
      },
    });
    const computedClasses = computed(() => ({
      show: isActive.value,
      'navbar-collapse': props.isNav,
      'collapse-horizontal': props.horizontal,
    }));
    const sharedSlots = computed(() => ({
      toggle: toggle2,
      show,
      hide: hide2,
      id: computedId.value,
      visible: showRef.value,
    }));
    __expose({
      hide: hide2,
      isNav: props.isNav,
      show,
      toggle: toggle2,
      visible: readonly(showRef),
    });
    provide(collapseInjectionKey, {
      id: computedId,
      hide: hide2,
      show,
      toggle: toggle2,
      visible: readonly(showRef),
      isNav: toRef(() => props.isNav),
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            renderSlot(_ctx.$slots, 'header', normalizeProps(guardReactiveProps(sharedSlots.value))),
            unref(renderRef) || unref(contentShowing)
              ? (openBlock(),
                createBlock(
                  Transition,
                  mergeProps({ key: 0 }, unref(transitionProps), {
                    'enter-active-class': unref(computedNoAnimation) ? '' : 'collapsing',
                    'leave-active-class': unref(computedNoAnimation) ? '' : 'collapsing',
                    appear: modelValue.value || unref(props).visible,
                  }),
                  {
                    default: withCtx(() => [
                      withDirectives(
                        (openBlock(),
                        createBlock(
                          resolveDynamicComponent(unref(props).tag),
                          mergeProps(
                            {
                              id: unref(computedId),
                              ref: '_element',
                              class: ['collapse', computedClasses.value],
                              'is-nav': unref(props).isNav,
                            },
                            _ctx.$attrs,
                          ),
                          {
                            default: withCtx(() => [
                              unref(contentShowing)
                                ? renderSlot(_ctx.$slots, 'default', normalizeProps(mergeProps({ key: 0 }, sharedSlots.value)))
                                : createCommentVNode('', true),
                            ]),
                            _: 3,
                          },
                          16,
                          ['id', 'class', 'is-nav'],
                        )),
                        [[vShow, unref(showRef)]],
                      ),
                    ]),
                    _: 3,
                  },
                  16,
                  ['enter-active-class', 'leave-active-class', 'appear'],
                ))
              : createCommentVNode('', true),
            renderSlot(_ctx.$slots, 'footer', normalizeProps(guardReactiveProps(sharedSlots.value))),
          ],
          64,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BAccordionItem.vue_vue_type_script_setup_true_lang-qX-1Wfby.mjs
var _hoisted_1$1 = ['id'];
var _sfc_main$1 = defineComponent({
  __name: 'BAccordion',
  props: mergeModels(
    {
      flush: { type: Boolean, default: false },
      free: { type: Boolean, default: false },
      id: { default: void 0 },
      initialAnimation: { type: Boolean, default: false },
      lazy: { type: Boolean, default: false },
      unmountLazy: { type: Boolean, default: false },
    },
    {
      modelValue: {
        default: void 0,
      },
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BAccordion');
    const modelValue = useModel(__props, 'modelValue');
    const computedId = useId2(() => props.id, 'accordion');
    const computedClasses = computed(() => ({
      'accordion-flush': props.flush,
    }));
    provide(accordionInjectionKey, {
      openItem: readonly(modelValue),
      free: toRef(() => props.free),
      initialAnimation: toRef(() => props.initialAnimation),
      lazy: toRef(() => props.lazy),
      unmountLazy: toRef(() => props.unmountLazy),
      setOpenItem: id => {
        modelValue.value = id;
      },
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            id: unref(computedId),
            class: normalizeClass(['accordion', computedClasses.value]),
          },
          [renderSlot(_ctx.$slots, 'default')],
          10,
          _hoisted_1$1,
        )
      );
    };
  },
});
var _hoisted_12 = ['aria-expanded', 'aria-controls', 'onClick'];
var _sfc_main4 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BAccordionItem',
  props: mergeModels(
    {
      bodyAttrs: { default: void 0 },
      bodyClass: { default: void 0 },
      buttonAttrs: { default: void 0 },
      buttonClass: { default: void 0 },
      collapseClass: { default: void 0 },
      headerAttrs: { default: void 0 },
      headerClass: { default: void 0 },
      headerTag: { default: 'h2' },
      horizontal: { type: Boolean, default: void 0 },
      id: { default: void 0 },
      isNav: { type: Boolean, default: void 0 },
      lazy: { type: Boolean, default: false },
      unmountLazy: { type: Boolean, default: false },
      tag: { default: void 0 },
      title: { default: void 0 },
      show: { type: Boolean, default: void 0 },
      visible: { type: Boolean, default: false },
      wrapperAttrs: { default: void 0 },
    },
    {
      modelValue: {
        type: Boolean,
        ...{
          default: false,
        },
      },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(
    ['hide', 'hide-prevented', 'hidden', 'show', 'show-prevented', 'shown', 'toggle', 'toggle-prevented'],
    ['update:modelValue'],
  ),
  setup(__props, { emit: __emit }) {
    const attrs = useAttrs();
    const processedAttrs = computed(() => {
      const { class: wrapperClass, ...collapseAttrs } = attrs;
      return { wrapperClass, collapseAttrs };
    });
    const _props = __props;
    const props = useDefaults(_props, 'BAccordionItem');
    const emit = __emit;
    const parentData = inject(accordionInjectionKey, null);
    const computedId = useId2(() => props.id, 'accordion_item');
    const modelValue = useModel(__props, 'modelValue');
    modelValue.value =
      (parentData == null ? void 0 : parentData.openItem.value) === computedId.value &&
      !(parentData == null ? void 0 : parentData.initialAnimation.value);
    if (modelValue.value && !(parentData == null ? void 0 : parentData.free.value)) {
      parentData == null ? void 0 : parentData.setOpenItem(computedId.value);
    }
    onMounted(() => {
      if (!modelValue.value && (parentData == null ? void 0 : parentData.openItem.value) === computedId.value) {
        nextTick(() => {
          modelValue.value = true;
        });
      }
    });
    watch(
      () => (parentData == null ? void 0 : parentData.openItem.value),
      () =>
        (modelValue.value =
          (parentData == null ? void 0 : parentData.openItem.value) === computedId.value &&
          !(parentData == null ? void 0 : parentData.free.value)),
    );
    watch(modelValue, () => {
      if (modelValue.value && !(parentData == null ? void 0 : parentData.free.value))
        parentData == null ? void 0 : parentData.setOpenItem(computedId.value);
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return (
        openBlock(),
        createElementBlock(
          'div',
          mergeProps({ class: 'accordion-item' }, unref(props).wrapperAttrs, {
            class: processedAttrs.value.wrapperClass,
          }),
          [
            createVNode(
              _sfc_main3,
              mergeProps(
                {
                  id: unref(computedId),
                  modelValue: modelValue.value,
                  'onUpdate:modelValue': _cache[0] || (_cache[0] = $event => (modelValue.value = $event)),
                  class: ['accordion-collapse', unref(props).collapseClass],
                  'aria-labelledby': `${unref(computedId)}-heading`,
                },
                processedAttrs.value.collapseAttrs,
                {
                  tag: unref(props).tag,
                  show: unref(props).show,
                  horizontal: unref(props).horizontal,
                  visible: unref(props).visible,
                  'is-nav': unref(props).isNav,
                  lazy: unref(props).lazy || ((_a = unref(parentData)) == null ? void 0 : _a.lazy.value),
                  'unmount-lazy': unref(props).unmountLazy || ((_b = unref(parentData)) == null ? void 0 : _b.unmountLazy.value),
                  onShow: _cache[1] || (_cache[1] = $event => emit('show', $event)),
                  onShown: _cache[2] || (_cache[2] = $event => emit('shown', $event)),
                  onHide: _cache[3] || (_cache[3] = $event => emit('hide', $event)),
                  onHidden: _cache[4] || (_cache[4] = $event => emit('hidden', $event)),
                  onHidePrevented: _cache[5] || (_cache[5] = $event => emit('hide-prevented', $event)),
                  onShowPrevented: _cache[6] || (_cache[6] = $event => emit('show-prevented', $event)),
                  onTogglePrevented: _cache[7] || (_cache[7] = $event => emit('toggle-prevented', $event)),
                  onToggle: _cache[8] || (_cache[8] = $event => emit('toggle', $event)),
                },
              ),
              {
                header: withCtx(({ visible: toggleVisible, toggle: slotToggle }) => [
                  (openBlock(),
                  createBlock(
                    resolveDynamicComponent(unref(props).headerTag),
                    mergeProps(
                      {
                        id: `${unref(computedId)}-heading`,
                        class: ['accordion-header', unref(props).headerClass],
                      },
                      unref(props).headerAttrs,
                    ),
                    {
                      default: withCtx(() => [
                        createBaseVNode(
                          'button',
                          mergeProps({ class: 'accordion-button' }, unref(props).buttonAttrs, {
                            class: [{ collapsed: !toggleVisible }, unref(props).buttonClass],
                            type: 'button',
                            'aria-expanded': toggleVisible ? 'true' : 'false',
                            'aria-controls': unref(computedId),
                            onClick: slotToggle,
                          }),
                          [renderSlot(_ctx.$slots, 'title', {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])],
                          16,
                          _hoisted_12,
                        ),
                      ]),
                      _: 2,
                    },
                    1040,
                    ['id', 'class'],
                  )),
                ]),
                default: withCtx(() => [
                  createBaseVNode(
                    'div',
                    mergeProps({ class: 'accordion-body' }, unref(props).bodyAttrs, {
                      class: unref(props).bodyClass,
                    }),
                    [renderSlot(_ctx.$slots, 'default')],
                    16,
                  ),
                ]),
                _: 3,
              },
              16,
              ['id', 'modelValue', 'class', 'aria-labelledby', 'tag', 'show', 'horizontal', 'visible', 'is-nav', 'lazy', 'unmount-lazy'],
            ),
          ],
          16,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BCloseButton.vue_vue_type_script_setup_true_lang-B0EXlL9P.mjs
var _hoisted_13 = ['type', 'disabled', 'aria-label'];
var _sfc_main5 = defineComponent({
  __name: 'BCloseButton',
  props: {
    ariaLabel: { default: 'Close' },
    disabled: { type: Boolean, default: false },
    type: { default: 'button' },
  },
  emits: ['click'],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BCloseButton');
    const emit = __emit;
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'button',
          {
            type: unref(props).type,
            class: 'btn-close',
            disabled: unref(props).disabled,
            'aria-label': unref(props).ariaLabel,
            onClick: _cache[0] || (_cache[0] = $event => emit('click', $event)),
          },
          null,
          8,
          _hoisted_13,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/dom-BK2w00Ec.mjs
var getActiveElement = (excludes = []) => {
  const { activeElement } = document;
  return activeElement && !(excludes == null ? void 0 : excludes.some(el => el === activeElement)) ? activeElement : null;
};
var attemptFocus = (el, options = {}) => {
  const isActiveElement = el2 => el2 === getActiveElement();
  try {
    el.focus(options);
  } catch (e) {
    console.error(e);
  }
  return isActiveElement(el);
};
var isEmptySlot = el => ((el == null ? void 0 : el()) ?? []).length === 0;
var isVisible = el => {
  if (el.getAttribute('display') === 'none') {
    return false;
  }
  const bcr = el.getBoundingClientRect();
  return !!(bcr && bcr.height > 0 && bcr.width > 0);
};
var sortSlotElementsByPosition = (a, b) => {
  if (typeof Node === 'undefined' || !Node || !a || !b) return 0;
  const position = a.compareDocumentPosition(b);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  return 0;
};

// node_modules/bootstrap-vue-next/dist/useColorVariantClasses-ZDE19TZw.mjs
var useColorVariantClasses = obj =>
  computed(() => {
    let props = toValue(obj);
    props = {
      variant: props.variant ?? null,
      bgVariant: props.bgVariant ?? null,
      textVariant: props.textVariant ?? null,
      borderVariant: props.borderVariant ?? null,
    };
    return {
      [`text-bg-${props.variant}`]: props.variant !== null,
      [`text-${props.textVariant}`]: props.textVariant !== null,
      [`bg-${props.bgVariant}`]: props.bgVariant !== null,
      [`border-${props.borderVariant}`]: props.borderVariant !== null,
    };
  });

// node_modules/bootstrap-vue-next/dist/BSpinner.vue_vue_type_script_setup_true_lang-BBcjZkCi.mjs
var _hoisted_14 = {
  key: 0,
  class: 'visually-hidden',
};
var _sfc_main6 = defineComponent({
  __name: 'BSpinner',
  props: {
    label: { default: void 0 },
    role: { default: 'status' },
    small: { type: Boolean, default: false },
    tag: { default: 'span' },
    type: { default: 'border' },
    variant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BSpinner');
    const slots = useSlots();
    const colorClasses = useColorVariantClasses(
      computed(() => ({
        textVariant: props.variant,
      })),
    );
    const computedClasses = computed(() => [
      `spinner-${props.type}`,
      colorClasses.value,
      {
        [`spinner-${props.type}-sm`]: props.small,
      },
    ]);
    const hasLabelSlot = computed(() => !isEmptySlot(slots.label));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass(computedClasses.value),
            role: unref(props).label || hasLabelSlot.value ? unref(props).role : null,
            'aria-hidden': unref(props).label || hasLabelSlot.value ? null : true,
          },
          {
            default: withCtx(() => [
              unref(props).label || hasLabelSlot.value
                ? (openBlock(),
                  createElementBlock('span', _hoisted_14, [
                    renderSlot(_ctx.$slots, 'label', {}, () => [createTextVNode(toDisplayString(unref(props).label), 1)]),
                  ]))
                : createCommentVNode('', true),
            ]),
            _: 3,
          },
          8,
          ['class', 'role', 'aria-hidden'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/stringUtils-DNoLRB2A.mjs
var startCase = str =>
  str
    .replace(RX_UNDERSCORE, ' ')
    .replace(RX_LOWER_UPPER, (_, $1, $2) => `${$1} ${$2}`)
    .replace(RX_FIRST_START_SPACE_WORD, (_, $1, $2) => $1 + $2.toUpperCase());
var titleCase = str =>
  str
    .replace(RX_UNDERSCORE, ' ')
    .replace(RX_LOWER_UPPER, (_, $1, $2) => `${$1} ${$2}`)
    .replace(RX_START_SPACE_WORD, (_, $1, $2) => $1 + $2.toUpperCase());
var upperFirst = str => {
  const trim = str.trim();
  return trim.charAt(0).toUpperCase() + trim.slice(1);
};
var escapeRegExp = str => str.replace(RX_REGEXP_REPLACE, '\\$&');
var escapeRegExpChars = str => escapeRegExp(str).replace(RX_SPACES, '\\s');
var toPascalCase = str =>
  str
    .replace(/-./g, match => match.charAt(1).toUpperCase())
    .replace(/\b\w/g, match => match.toUpperCase())
    .replace(/\s+/g, '');

// node_modules/bootstrap-vue-next/dist/BLink.vue_vue_type_script_setup_true_lang-X9oGQtcq.mjs
var isLink = props => !!(props.href || props.to);
var useBLinkHelper = (props, pickProps) => {
  const pickPropsResolved = readonly(toRef(pickProps));
  const resolvedProps = readonly(toRef(props));
  const computedLink = computed(() => isLink(resolvedProps.value));
  const computedLinkProps = computed(() =>
    computedLink.value
      ? pick(
          resolvedProps.value,
          pickPropsResolved.value ?? [
            'active',
            'activeClass',
            'append',
            'href',
            'rel',
            'replace',
            'routerComponentName',
            'target',
            'to',
            'variant',
            'opacity',
            'opacityHover',
            'underlineVariant',
            'underlineOffset',
            'underlineOffsetHover',
            'underlineOpacity',
            'underlineOpacityHover',
          ],
        )
      : {},
  );
  return { computedLink, computedLinkProps };
};
var useBLinkTagResolver = props => {
  const instance = getCurrentInstance();
  const router = instance == null ? void 0 : instance.appContext.app.config.globalProperties.$router;
  const route = instance == null ? void 0 : instance.appContext.app.config.globalProperties.$route;
  const RouterLinkComponent = resolveDynamicComponent('RouterLink');
  const useLink = typeof RouterLinkComponent === 'string' ? null : RouterLinkComponent.useLink;
  const resolvedProps = toRef(props);
  const resolvedTo = toRef(() => resolvedProps.value.to || '');
  const resolvedReplace = toRef(() => resolvedProps.value.replace);
  const routerName = computed(() => toPascalCase(resolvedProps.value.routerComponentName));
  const tag = computed(() => {
    const hasRouter = (instance == null ? void 0 : instance.appContext.app.component(routerName.value)) !== void 0;
    if (!hasRouter || resolvedProps.value.disabled || !resolvedProps.value.to) {
      return 'a';
    }
    return routerName.value;
  });
  const isRouterLink = computed(() => tag.value === 'RouterLink');
  const isNuxtLink = computed(
    // @ts-expect-error we're doing an explicit check for Nuxt, so we can safely ignore this
    () => isRouterLink.value && typeof (instance == null ? void 0 : instance.appContext.app.$nuxt) !== 'undefined',
  );
  const isNonStandardTag = computed(() => tag.value !== 'a' && !isRouterLink.value && !isNuxtLink.value);
  const isOfRouterType = computed(() => isRouterLink.value || isNuxtLink.value);
  const linkProps = computed(() => ({
    to: resolvedTo.value,
    replace: resolvedReplace.value,
  }));
  const _link =
    useLink == null
      ? void 0
      : useLink({
          to: resolvedTo,
          replace: resolvedReplace,
        });
  const link = computed(() => (isOfRouterType.value ? _link : null));
  const computedHref = computed(() => {
    var _a;
    if ((_a = link.value) == null ? void 0 : _a.href.value) return link.value.href.value;
    const toFallback = '#';
    if (resolvedProps.value.href) return resolvedProps.value.href;
    if (typeof resolvedProps.value.to === 'string') return resolvedProps.value.to || toFallback;
    const { to: stableTo } = resolvedProps.value;
    if (stableTo !== void 0 && 'path' in stableTo) {
      const path = stableTo.path || '';
      const query = stableTo.query
        ? `?${Object.keys(stableTo.query)
            .map(e => {
              var _a2;
              return `${e}=${(_a2 = stableTo.query) == null ? void 0 : _a2[e]}`;
            })
            .join('=')}`
        : '';
      const hash = !stableTo.hash || stableTo.hash.charAt(0) === '#' ? stableTo.hash || '' : `#${stableTo.hash}`;
      return `${path}${query}${hash}` || toFallback;
    }
    return toFallback;
  });
  return {
    isNonStandardTag,
    tag,
    isRouterLink,
    isNuxtLink,
    computedHref,
    routerName,
    router,
    route,
    link,
    linkProps,
  };
};
var useLinkClasses = linkProps =>
  computed(() => {
    const props = toValue(linkProps);
    return {
      [`link-${props.variant}`]: props.variant !== null,
      [`link-opacity-${props.opacity}`]: props.opacity !== void 0,
      [`link-opacity-${props.opacityHover}-hover`]: props.opacityHover !== void 0,
      [`link-underline-${props.underlineVariant}`]: props.underlineVariant !== null,
      [`link-offset-${props.underlineOffset}`]: props.underlineOffset !== void 0,
      [`link-offset-${props.underlineOffsetHover}-hover`]: props.underlineOffsetHover !== void 0,
      ['link-underline']: props.underlineVariant === null && (props.underlineOpacity !== void 0 || props.underlineOpacityHover !== void 0),
      [`link-underline-opacity-${props.underlineOpacity}`]: props.underlineOpacity !== void 0,
      [`link-underline-opacity-${props.underlineOpacityHover}-hover`]: props.underlineOpacityHover !== void 0,
      'icon-link': props.icon === true,
    };
  });
var defaultActiveClass = 'active';
var _sfc_main7 = defineComponent({
  __name: 'BLink',
  props: {
    active: { type: Boolean, default: void 0 },
    activeClass: { default: 'router-link-active' },
    disabled: { type: Boolean, default: false },
    exactActiveClass: { default: 'router-link-exact-active' },
    href: { default: void 0 },
    icon: { type: Boolean, default: false },
    noRel: { type: Boolean, default: false },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    prefetch: { type: Boolean, default: void 0 },
    prefetchOn: { default: void 0 },
    noPrefetch: { type: Boolean, default: void 0 },
    prefetchedClass: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: false },
    routerComponentName: { default: 'router-link' },
    routerTag: { default: 'a' },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: null },
    variant: { default: null },
  },
  emits: ['click'],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BLink');
    const emit = __emit;
    const attrs = useAttrs();
    const { computedHref, tag, link, isNuxtLink, isRouterLink, linkProps, isNonStandardTag } = useBLinkTagResolver(
      computed(() => ({
        routerComponentName: props.routerComponentName,
        disabled: props.disabled,
        to: props.to,
        replace: props.replace,
        href: props.href,
      })),
    );
    const collapseData = inject(collapseInjectionKey, null);
    const navbarData = inject(navbarInjectionKey, null);
    const linkValueClasses = useLinkClasses(props);
    const computedClasses = computed(() => {
      var _a, _b;
      return [
        linkValueClasses.value,
        attrs.class,
        computedLinkClasses.value,
        {
          [defaultActiveClass]: props.active,
          [props.activeClass]: ((_a = link.value) == null ? void 0 : _a.isActive.value) || false,
          [props.exactActiveClass]: ((_b = link.value) == null ? void 0 : _b.isExactActive.value) || false,
          'stretched-link': props.stretched === true,
        },
      ];
    });
    const computedLinkClasses = computed(() => ({
      [defaultActiveClass]: props.active,
      disabled: props.disabled,
    }));
    const clicked = e => {
      var _a, _b, _c;
      if (props.disabled) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (
        (((_a = collapseData == null ? void 0 : collapseData.isNav) == null ? void 0 : _a.value) === true && navbarData === null) ||
        (navbarData !== null && ((_b = navbarData.autoClose) == null ? void 0 : _b.value) === true)
      ) {
        (_c = collapseData == null ? void 0 : collapseData.hide) == null ? void 0 : _c.call(collapseData);
      }
      emit('click', e);
    };
    const computedRel = computed(() => (props.target === '_blank' ? (!props.rel && props.noRel ? 'noopener' : props.rel) : void 0));
    const computedTabIndex = computed(() => (props.disabled ? '-1' : typeof attrs.tabindex === 'undefined' ? null : attrs.tabindex));
    const nuxtSpecificProps = computed(() => ({
      prefetch: props.prefetch,
      noPrefetch: props.noPrefetch,
      prefetchOn: props.prefetchOn,
      prefetchedClass: props.prefetchedClass,
      ...linkProps.value,
    }));
    const computedSpecificProps = computed(() => ({
      ...(isRouterLink.value ? linkProps.value : void 0),
      // In addition to being Nuxt specific, we add these values if it's some non-standard tag. We don't know what it is,
      // So we just add it anyways. It will be made as an attr if it's unused so it's fine
      ...(isNuxtLink.value || isNonStandardTag.value ? nuxtSpecificProps.value : void 0),
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(tag)),
          mergeProps(
            {
              class: computedClasses.value,
              target: unref(props).target,
              href: unref(computedHref),
              rel: computedRel.value,
              tabindex: computedTabIndex.value,
              'aria-disabled': unref(props).disabled ? true : null,
            },
            computedSpecificProps.value,
            {
              onClick:
                _cache[0] ||
                (_cache[0] = e => {
                  var _a;
                  clicked(e);
                  (_a = unref(link)) == null ? void 0 : _a.navigate(e);
                }),
            },
          ),
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          16,
          ['class', 'target', 'href', 'rel', 'tabindex', 'aria-disabled'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BButton.vue_vue_type_script_setup_true_lang-BC0Lfmfc.mjs
var _sfc_main8 = defineComponent({
  __name: 'BButton',
  props: mergeModels(
    {
      loading: { type: Boolean, default: false },
      loadingFill: { type: Boolean, default: false },
      loadingText: { default: 'Loading...' },
      pill: { type: Boolean, default: false },
      size: { default: 'md' },
      squared: { type: Boolean, default: false },
      tag: { default: 'button' },
      type: { default: 'button' },
      variant: { default: 'secondary' },
      active: { type: Boolean, default: false },
      activeClass: { default: void 0 },
      disabled: { type: Boolean, default: void 0 },
      exactActiveClass: { default: void 0 },
      href: { default: void 0 },
      icon: { type: Boolean, default: false },
      noRel: { type: Boolean },
      opacity: { default: void 0 },
      opacityHover: { default: void 0 },
      prefetch: { type: Boolean },
      prefetchOn: {},
      noPrefetch: { type: Boolean },
      prefetchedClass: {},
      rel: { default: void 0 },
      replace: { type: Boolean, default: void 0 },
      routerComponentName: { default: void 0 },
      routerTag: { default: void 0 },
      stretched: { type: Boolean, default: false },
      target: { default: void 0 },
      to: { default: void 0 },
      underlineOffset: { default: void 0 },
      underlineOffsetHover: { default: void 0 },
      underlineOpacity: { default: void 0 },
      underlineOpacityHover: { default: void 0 },
      underlineVariant: { default: null },
    },
    {
      pressed: { type: Boolean, ...{ default: void 0 } },
      pressedModifiers: {},
    },
  ),
  emits: mergeModels(['click'], ['update:pressed']),
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BButton');
    const emit = __emit;
    const element = useTemplateRef('_element');
    const pressedValue = useModel(__props, 'pressed');
    const { computedLink, computedLinkProps } = useBLinkHelper(props, [
      'active-class',
      'exact-active-class',
      'replace',
      'routerComponentName',
      'routerTag',
    ]);
    const isToggle = computed(() => typeof pressedValue.value === 'boolean');
    const isButton = computed(() => props.tag === 'button' && props.href === void 0 && props.to === void 0);
    const isBLink = computed(() => props.to !== void 0);
    const nonStandardTag = computed(() => (props.href !== void 0 ? false : !isButton.value));
    const linkProps = computed(() => (isBLink.value ? computedLinkProps.value : []));
    const computedAriaDisabled = computed(() => {
      if (props.href === '#' && props.disabled) return true;
      return nonStandardTag.value ? props.disabled : null;
    });
    const variantIsLinkType = computed(() => {
      var _a;
      return ((_a = props.variant) == null ? void 0 : _a.startsWith('link')) || false;
    });
    const variantIsLinkTypeSubset = computed(() => {
      var _a;
      return ((_a = props.variant) == null ? void 0 : _a.startsWith('link-')) || false;
    });
    const linkValueClasses = useLinkClasses(
      computed(() => {
        var _a;
        return {
          ...(variantIsLinkType.value
            ? {
                icon: props.icon,
                opacity: props.opacity,
                opacityHover: props.opacityHover,
                underlineOffset: props.underlineOffset,
                underlineOffsetHover: props.underlineOffsetHover,
                underlineOpacity: props.underlineOpacity,
                underlineOpacityHover: props.underlineOpacityHover,
                underlineVariant: props.underlineVariant,
                variant: variantIsLinkTypeSubset.value === true ? ((_a = props.variant) == null ? void 0 : _a.slice(5)) : null,
              }
            : void 0),
        };
      }),
    );
    const computedClasses = computed(() => [
      variantIsLinkType.value === true && computedLink.value === false ? linkValueClasses.value : void 0,
      [`btn-${props.size}`],
      {
        [`btn-${props.variant}`]: props.variant !== null && variantIsLinkTypeSubset.value === false,
        active: props.active || pressedValue.value,
        'rounded-pill': props.pill,
        'rounded-0': props.squared,
        disabled: props.disabled,
      },
    ]);
    const computedTag = computed(() => (isBLink.value ? _sfc_main7 : props.href ? 'a' : props.tag));
    const clicked = e => {
      if (props.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      emit('click', e);
      if (isToggle.value) pressedValue.value = !pressedValue.value;
    };
    onKeyStroke(
      [' ', 'enter'],
      e => {
        var _a;
        if (props.href === '#') {
          e.preventDefault();
          (_a = element.value) == null ? void 0 : _a.click();
        }
      },
      { target: element },
    );
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(computedTag.value),
          mergeProps(
            {
              ref: '_element',
              class: 'btn',
            },
            linkProps.value,
            {
              class: computedClasses.value,
              'aria-disabled': computedAriaDisabled.value,
              'aria-pressed': isToggle.value ? pressedValue.value : null,
              autocomplete: isToggle.value ? 'off' : null,
              disabled: isButton.value ? unref(props).disabled : null,
              href: unref(props).href,
              rel: unref(computedLink) ? unref(props).rel : null,
              role: nonStandardTag.value || unref(computedLink) ? 'button' : null,
              target: unref(computedLink) ? unref(props).target : null,
              type: isButton.value ? unref(props).type : null,
              to: !isButton.value ? unref(props).to : null,
              onClick: clicked,
            },
          ),
          {
            default: withCtx(() => [
              unref(props).loading
                ? renderSlot(_ctx.$slots, 'loading', { key: 0 }, () => [
                    !unref(props).loadingFill
                      ? (openBlock(),
                        createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(unref(props).loadingText), 1)], 64))
                      : createCommentVNode('', true),
                    renderSlot(_ctx.$slots, 'loading-spinner', {}, () => [
                      createVNode(
                        _sfc_main6,
                        {
                          small: unref(props).size !== 'lg',
                          label: unref(props).loadingFill ? unref(props).loadingText : void 0,
                        },
                        null,
                        8,
                        ['small', 'label'],
                      ),
                    ]),
                  ])
                : renderSlot(_ctx.$slots, 'default', { key: 1 }),
            ]),
            _: 3,
          },
          16,
          ['class', 'aria-disabled', 'aria-pressed', 'autocomplete', 'disabled', 'href', 'rel', 'role', 'target', 'type', 'to'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/useCountdownHover-CJ6C8i_a.mjs
var useCountdown = (length, interval, timestampOpts = {}) => {
  const resolvedLength = readonly(toRef(length));
  const isPaused = ref(false);
  const target = ref(Date.now() + resolvedLength.value);
  const {
    isActive,
    pause,
    resume,
    timestamp: timestamp2,
  } = useTimestamp({
    interval,
    controls: true,
    callback: v => {
      if (v >= target.value) {
        isPaused.value = false;
        pause();
      }
    },
    ...timestampOpts,
  });
  const value = computed(() => target.value - timestamp2.value);
  const restart = () => {
    target.value = Date.now() + resolvedLength.value;
    resume();
  };
  watch(resolvedLength, () => {
    restart();
  });
  const myPause = () => {
    isPaused.value = true;
    pause();
  };
  const myResume = () => {
    isPaused.value = false;
    const remainingTime = target.value - timestamp2.value;
    target.value = Date.now() + remainingTime;
    resume();
  };
  const stop = () => {
    pause();
    timestamp2.value = target.value;
    isPaused.value = false;
  };
  return {
    isActive: readonly(isActive),
    isPaused: readonly(isPaused),
    stop,
    pause: myPause,
    resume: myResume,
    restart,
    value,
  };
};
var useCountdownHover = (element, props, actions) => {
  const isHovering = useElementHover(element);
  const onMouseEnter = () => {
    if (toValue(props).noHoverPause) return;
    actions.pause();
  };
  const onMouseLeave = () => {
    if (toValue(props).noResumeOnHoverLeave) return;
    actions.resume();
  };
  watch(isHovering, newValue => {
    if (toValue(props).modelValueIgnoresHover) return;
    if (newValue) {
      onMouseEnter();
      return;
    }
    onMouseLeave();
  });
  return {
    isHovering,
  };
};

// node_modules/bootstrap-vue-next/dist/useTransitions-BJccF5e-.mjs
var useFadeTransition = fade =>
  computed(() => {
    const NO_FADE_PROPS = {
      name: '',
      enterActiveClass: '',
      enterToClass: '',
      leaveActiveClass: '',
      leaveToClass: 'showing',
      enterFromClass: 'showing',
      leaveFromClass: '',
    };
    const FADE_PROPS = {
      ...NO_FADE_PROPS,
      enterActiveClass: 'fade showing',
      leaveActiveClass: 'fade showing',
    };
    return toValue(fade) ? FADE_PROPS : NO_FADE_PROPS;
  });

// node_modules/bootstrap-vue-next/dist/BAlert-0UDGGiWI.mjs
var _sfc_main9 = defineComponent({
  __name: 'BAlert',
  props: mergeModels(
    {
      closeClass: { default: void 0 },
      closeContent: { default: void 0 },
      closeLabel: { default: 'Close' },
      closeVariant: { default: 'secondary' },
      dismissible: { type: Boolean, default: false },
      fade: { type: Boolean, default: false },
      immediate: { type: Boolean, default: true },
      interval: { default: 'requestAnimationFrame' },
      noHoverPause: { type: Boolean, default: false },
      noResumeOnHoverLeave: { type: Boolean, default: false },
      showOnPause: { type: Boolean, default: true },
      variant: { default: 'info' },
    },
    {
      modelValue: { type: [Boolean, Number], ...{ default: false } },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(['close', 'close-countdown', 'closed'], ['update:modelValue']),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BAlert');
    const emit = __emit;
    const slots = useSlots();
    const fadeTransitions = useFadeTransition(() => props.fade);
    const element = useTemplateRef('_element');
    const modelValue = useModel(__props, 'modelValue');
    const hasCloseSlot = computed(() => !isEmptySlot(slots.close));
    const countdownLength = computed(() => (typeof modelValue.value === 'boolean' ? 0 : modelValue.value));
    const computedClasses = computed(() => ({
      [`alert-${props.variant}`]: props.variant !== null,
      'alert-dismissible': props.dismissible,
    }));
    const closeClasses = computed(() => [props.closeClass, { 'btn-close-custom': hasCloseSlot.value }]);
    const {
      isActive,
      pause,
      resume,
      stop,
      isPaused,
      restart,
      value: remainingMs,
    } = useCountdown(countdownLength, props.interval, {
      immediate: typeof modelValue.value === 'number' && props.immediate,
    });
    useCountdownHover(
      element,
      computed(() => ({
        noHoverPause: props.noHoverPause,
        noResumeOnHoverLeave: props.noResumeOnHoverLeave,
        modelValueIgnoresHover: typeof modelValue.value === 'boolean',
      })),
      { pause, resume },
    );
    const isAlertVisible = computed(() =>
      typeof modelValue.value === 'boolean' ? modelValue.value : isActive.value || (props.showOnPause && isPaused.value),
    );
    const closeAttrs = computed(() => ({
      variant: hasCloseSlot.value ? props.closeVariant : void 0,
      class: closeClasses.value,
    }));
    watchEffect(() => {
      emit('close-countdown', remainingMs.value);
    });
    const hide2 = () => {
      emit('close');
      if (typeof modelValue.value === 'boolean') {
        modelValue.value = false;
      } else {
        modelValue.value = 0;
        stop();
      }
      emit('closed');
    };
    __expose({
      pause,
      resume,
      stop,
      restart,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          Transition,
          mergeProps(unref(fadeTransitions), { 'enter-to-class': 'show' }),
          {
            default: withCtx(() => [
              isAlertVisible.value
                ? (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 0,
                      ref: '_element',
                      class: normalizeClass(['alert', computedClasses.value]),
                      role: 'alert',
                      'aria-live': 'polite',
                      'aria-atomic': 'true',
                    },
                    [
                      renderSlot(_ctx.$slots, 'default', {}, void 0, true),
                      unref(props).dismissible
                        ? (openBlock(),
                          createElementBlock(
                            Fragment,
                            { key: 0 },
                            [
                              hasCloseSlot.value || unref(props).closeContent
                                ? (openBlock(),
                                  createBlock(
                                    _sfc_main8,
                                    mergeProps({ key: 0 }, closeAttrs.value, { onClick: hide2 }),
                                    {
                                      default: withCtx(() => [
                                        renderSlot(
                                          _ctx.$slots,
                                          'close',
                                          {},
                                          () => [createTextVNode(toDisplayString(unref(props).closeContent), 1)],
                                          true,
                                        ),
                                      ]),
                                      _: 3,
                                    },
                                    16,
                                  ))
                                : (openBlock(),
                                  createBlock(
                                    _sfc_main5,
                                    mergeProps(
                                      {
                                        key: 1,
                                        'aria-label': unref(props).closeLabel,
                                      },
                                      closeAttrs.value,
                                      { onClick: hide2 },
                                    ),
                                    null,
                                    16,
                                    ['aria-label'],
                                  )),
                            ],
                            64,
                          ))
                        : createCommentVNode('', true),
                    ],
                    2,
                  ))
                : createCommentVNode('', true),
            ]),
            _: 3,
          },
          16,
        )
      );
    };
  },
});
var BAlert = _export_sfc(_sfc_main9, [['__scopeId', 'data-v-141c4f93']]);

// node_modules/bootstrap-vue-next/dist/ConditionalWrapper.vue_vue_type_script_lang-CUX3HBqw.mjs
var _sfc_main10 = defineComponent({
  name: 'ConditionalWrapper',
  inheritAttrs: false,
  slots: Object,
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    skip: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      var _a, _b;
      return props.skip
        ? (_a = slots.default) == null
          ? void 0
          : _a.call(slots, {})
        : h(props.tag, { ...attrs }, [(_b = slots.default) == null ? void 0 : _b.call(slots, {})]);
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BBadge.vue_vue_type_script_setup_true_lang-IIZ8QpjG.mjs
var _sfc_main11 = defineComponent({
  __name: 'BBadge',
  props: {
    dotIndicator: { type: Boolean, default: false },
    pill: { type: Boolean, default: false },
    placement: { default: void 0 },
    tag: { default: 'span' },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    prefetchedClass: {},
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: 'secondary' },
    bgVariant: { default: null },
    textVariant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BBadge');
    const { computedLink, computedLinkProps } = useBLinkHelper(props, [
      'active',
      'activeClass',
      'append',
      'disabled',
      'href',
      'rel',
      'replace',
      'routerComponentName',
      'target',
      'to',
      'opacity',
      'opacityHover',
      'underlineVariant',
      'underlineOffset',
      'underlineOffsetHover',
      'underlineOpacity',
      'underlineOpacityHover',
      'icon',
    ]);
    const computedTag = computed(() => (computedLink.value ? _sfc_main7 : props.tag));
    const placementClasses = computed(() => {
      const pos = props.placement ?? (props.dotIndicator ? 'top-end' : void 0);
      return [
        'position-absolute',
        'translate-middle',
        {
          'start-0 top-0': pos === 'top-start',
          'start-0 top-50': pos === 'start',
          'start-0 top-100': pos === 'bottom-start',
          'start-50 top-0': pos === 'top',
          'start-50 top-100': pos === 'bottom',
          'start-100 top-0': pos === 'top-end',
          'start-100 top-50': pos === 'end',
          'start-100 top-100': pos === 'bottom-end',
        },
      ];
    });
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed(() => [
      colorClasses.value,
      props.placement !== void 0 || props.dotIndicator === true ? placementClasses.value : void 0,
      {
        active: props.active,
        disabled: props.disabled,
        'rounded-pill': props.pill,
        'p-2 border border-light rounded-circle': props.dotIndicator,
        'text-decoration-none': computedLink.value,
      },
    ]);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(computedTag.value),
          mergeProps(
            {
              class: ['badge', computedClasses.value],
            },
            unref(computedLinkProps),
          ),
          {
            default: withCtx(() => [
              createVNode(
                _sfc_main10,
                mergeProps(
                  {
                    skip: unref(props).dotIndicator !== true,
                    tag: 'span',
                  },
                  unref(props).dotIndicator ? { class: 'visually-hidden' } : {},
                ),
                {
                  default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
                  _: 3,
                },
                16,
                ['skip'],
              ),
            ]),
            _: 3,
          },
          16,
          ['class'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/useNumberishToStyle-BaHH1FuW.mjs
var useNumberishToStyle = (el, unit = 'px') =>
  computed(() => {
    const value = toValue(el);
    const resolvedUnit = toValue(unit);
    return RX_NUMBER.test(String(value)) ? `${Number(value)}${resolvedUnit}` : value;
  });

// node_modules/bootstrap-vue-next/dist/useRadiusElementClasses-DtKYQuWz.mjs
var useRadiusElementClasses = obj => {
  const resolveRadiusElement = (value, str) => {
    const strValue = str === null ? '' : `-${str}`;
    return value === 'circle'
      ? `rounded${strValue}-circle`
      : value === 'pill'
        ? `rounded${strValue}-pill`
        : typeof value === 'number' || value === '0' || value === '1' || value === '2' || value === '3' || value === '4' || value === '5'
          ? `rounded${strValue}-${value}`
          : value === 'none'
            ? `rounded${strValue}-0`
            : value === 'sm'
              ? `rounded${strValue}-1`
              : value === 'lg'
                ? `rounded${strValue}-5`
                : `rounded${strValue}`;
  };
  return computed(() => {
    const props = toValue(obj);
    return {
      [`${resolveRadiusElement(props.rounded, null)}`]: !!props.rounded,
      [`${resolveRadiusElement(props.roundedTop, 'top')}`]: !!props.roundedTop,
      [`${resolveRadiusElement(props.roundedBottom, 'bottom')}`]: !!props.roundedBottom,
      [`${resolveRadiusElement(props.roundedStart, 'start')}`]: !!props.roundedStart,
      [`${resolveRadiusElement(props.roundedEnd, 'end')}`]: !!props.roundedEnd,
    };
  });
};

// node_modules/bootstrap-vue-next/dist/BAvatarGroup.vue_vue_type_script_setup_true_lang-uRDCerzk.mjs
var _hoisted_15 = {
  key: 0,
  class: 'b-avatar-custom',
};
var _hoisted_22 = {
  key: 1,
  class: 'b-avatar-img',
};
var _hoisted_3 = ['src', 'alt'];
var _hoisted_4 = {
  key: 3,
  class: 'b-avatar-img',
};
var FONT_SIZE_SCALE = 0.4;
var _sfc_main$12 = defineComponent({
  __name: 'BAvatar',
  props: {
    alt: { default: 'avatar' },
    badge: { type: [Boolean, String], default: false },
    badgeBgVariant: { default: null },
    badgePlacement: { default: 'bottom-end' },
    badgeTextVariant: { default: null },
    badgeVariant: { default: 'primary' },
    badgePill: { type: Boolean, default: false },
    badgeDotIndicator: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    buttonType: { default: 'button' },
    size: { default: void 0 },
    square: { type: Boolean, default: false },
    src: { default: void 0 },
    text: { default: void 0 },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    prefetchedClass: {},
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: {},
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: 'secondary' },
    bgVariant: { default: null },
    textVariant: { default: null },
    rounded: { type: [Boolean, String, Number], default: 'circle' },
    roundedTop: { type: [Boolean, String, Number], default: void 0 },
    roundedBottom: { type: [Boolean, String, Number], default: void 0 },
    roundedStart: { type: [Boolean, String, Number], default: void 0 },
    roundedEnd: { type: [Boolean, String, Number], default: void 0 },
  },
  emits: ['click', 'img-error'],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const localSrc = ref(props.src);
    watch(
      () => props.src,
      value => {
        localSrc.value = value;
      },
    );
    const emit = __emit;
    const slots = useSlots();
    const { computedLink, computedLinkProps } = useBLinkHelper(props);
    const parentData = inject(avatarGroupInjectionKey, null);
    const SIZES = Object.freeze([
      null,
      ...Object.keys({
        lg: null,
        md: null,
        sm: null,
      }),
    ]);
    const BADGE_FONT_SIZE_SCALE = FONT_SIZE_SCALE * 0.7;
    const hasDefaultSlot = computed(() => !isEmptySlot(slots.default));
    const hasBadgeSlot = computed(() => !isEmptySlot(slots.badge));
    const showBadge = computed(() => !!props.badge || props.badge === '' || hasBadgeSlot.value);
    const computedSquare = computed(() => (parentData == null ? void 0 : parentData.square.value) || props.square);
    const computedSize = useNumberishToStyle(() => (parentData == null ? void 0 : parentData.size.value) ?? props.size);
    const computedSizeIsLiteralSize = computed(() => !!computedSize.value && SIZES.includes(computedSize.value));
    const computedVariant = computed(() => (parentData == null ? void 0 : parentData.variant.value) ?? props.variant);
    const computedRounded = computed(() => (parentData == null ? void 0 : parentData.rounded.value) ?? props.rounded);
    const computedRoundedTop = computed(() => (parentData == null ? void 0 : parentData.roundedTop.value) ?? props.roundedTop);
    const computedRoundedBottom = computed(() => (parentData == null ? void 0 : parentData.roundedBottom.value) ?? props.roundedBottom);
    const computedRoundedStart = computed(() => (parentData == null ? void 0 : parentData.roundedStart.value) ?? props.roundedStart);
    const computedRoundedEnd = computed(() => (parentData == null ? void 0 : parentData.roundedEnd.value) ?? props.roundedEnd);
    const radiusElementClasses = useRadiusElementClasses(() => ({
      rounded: computedRounded.value,
      roundedTop: computedRoundedTop.value,
      roundedBottom: computedRoundedBottom.value,
      roundedStart: computedRoundedStart.value,
      roundedEnd: computedRoundedEnd.value,
    }));
    const badgeText = computed(() => (props.badge === true ? '' : props.badge));
    const badgeImplicitlyDot = computed(() => !badgeText.value && !hasBadgeSlot.value);
    const colorClasses = useColorVariantClasses(() => ({
      bgVariant: (parentData == null ? void 0 : parentData.bgVariant.value) ?? props.bgVariant,
      textVariant: (parentData == null ? void 0 : parentData.textVariant.value) ?? props.textVariant,
      variant: computedVariant.value,
    }));
    const computedClasses = computed(() => [
      colorClasses.value,
      // Square overwrites all else
      computedSquare.value === true ? void 0 : radiusElementClasses.value,
      {
        [`b-avatar-${computedSize.value}`]: computedSizeIsLiteralSize.value && computedSize.value !== 'md',
        [`btn-${computedVariant.value}`]: props.button ? computedVariant.value !== null : false,
        badge: !props.button && computedVariant.value !== null && hasDefaultSlot.value,
        btn: props.button,
        // Square is the same as rounded-0 class
        'rounded-0': computedSquare.value === true,
      },
    ]);
    const badgeStyle = computed(() => ({
      fontSize: (!computedSizeIsLiteralSize.value ? `calc(${computedSize.value} * ${BADGE_FONT_SIZE_SCALE})` : '') || '',
    }));
    const textFontStyle = computed(() => {
      const fontSize = !computedSizeIsLiteralSize.value ? `calc(${computedSize.value} * ${FONT_SIZE_SCALE})` : null;
      return fontSize ? { fontSize } : {};
    });
    const marginStyle = computed(() => {
      var _a;
      const overlapScale = ((_a = parentData == null ? void 0 : parentData.overlapScale) == null ? void 0 : _a.value) || 0;
      const value = computedSize.value && overlapScale ? `calc(${computedSize.value} * -${overlapScale})` : null;
      return value ? { marginLeft: value, marginRight: value } : {};
    });
    const computedTag = computed(() => (computedLink.value ? _sfc_main7 : props.button ? 'button' : 'span'));
    const computedStyle = computed(() => ({
      ...marginStyle.value,
      ...(!computedSizeIsLiteralSize.value
        ? {
            width: computedSize.value,
            height: computedSize.value,
          }
        : void 0),
    }));
    const clicked = e => {
      if (!props.disabled && (computedLink.value || props.button)) emit('click', e);
    };
    const onImgError = e => {
      localSrc.value = void 0;
      emit('img-error', e);
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(computedTag.value),
          mergeProps(
            {
              class: ['b-avatar', computedClasses.value],
              style: computedStyle.value,
            },
            unref(computedLinkProps),
            {
              type: props.button && !unref(computedLink) ? props.buttonType : void 0,
              disabled: props.disabled || null,
              variant: null,
              onClick: clicked,
            },
          ),
          {
            default: withCtx(() => [
              hasDefaultSlot.value
                ? (openBlock(), createElementBlock('span', _hoisted_15, [renderSlot(_ctx.$slots, 'default')]))
                : !!localSrc.value
                  ? (openBlock(),
                    createElementBlock('span', _hoisted_22, [
                      createBaseVNode(
                        'img',
                        {
                          src: localSrc.value,
                          alt: props.alt,
                          onError: onImgError,
                        },
                        null,
                        40,
                        _hoisted_3,
                      ),
                    ]))
                  : !!props.text
                    ? (openBlock(),
                      createElementBlock(
                        'span',
                        {
                          key: 2,
                          class: 'b-avatar-text',
                          style: normalizeStyle(textFontStyle.value),
                        },
                        toDisplayString(props.text),
                        5,
                      ))
                    : (openBlock(),
                      createElementBlock(
                        'span',
                        _hoisted_4,
                        _cache[0] ||
                          (_cache[0] = [
                            createBaseVNode(
                              'svg',
                              {
                                xmlns: 'http://www.w3.org/2000/svg',
                                width: '80%',
                                height: '80%',
                                fill: 'currentColor',
                                class: 'bi bi-person-fill',
                                viewBox: '0 0 16 16',
                              },
                              [createBaseVNode('path', { d: 'M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6' })],
                              -1,
                            ),
                          ]),
                      )),
              showBadge.value
                ? (openBlock(),
                  createBlock(
                    _sfc_main11,
                    {
                      key: 4,
                      pill: props.badgePill,
                      'dot-indicator': props.badgeDotIndicator || badgeImplicitlyDot.value,
                      variant: props.badgeVariant,
                      'bg-variant': props.badgeBgVariant,
                      'text-variant': props.badgeTextVariant,
                      style: normalizeStyle(badgeStyle.value),
                      placement: props.badgePlacement,
                    },
                    {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, 'badge', {}, () => [createTextVNode(toDisplayString(badgeText.value), 1)]),
                      ]),
                      _: 3,
                    },
                    8,
                    ['pill', 'dot-indicator', 'variant', 'bg-variant', 'text-variant', 'style', 'placement'],
                  ))
                : createCommentVNode('', true),
            ]),
            _: 3,
          },
          16,
          ['class', 'style', 'type', 'disabled'],
        )
      );
    };
  },
});
var _sfc_main12 = defineComponent({
  __name: 'BAvatarGroup',
  props: {
    overlap: { default: 0.3 },
    size: { default: void 0 },
    square: { type: Boolean, default: false },
    tag: { default: 'div' },
    variant: { default: null },
    bgVariant: { default: null },
    textVariant: { default: null },
    rounded: { type: [Boolean, String, Number], default: 'circle' },
    roundedTop: { type: [Boolean, String, Number], default: void 0 },
    roundedBottom: { type: [Boolean, String, Number], default: void 0 },
    roundedStart: { type: [Boolean, String, Number], default: void 0 },
    roundedEnd: { type: [Boolean, String, Number], default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BAvatarGroup');
    const overlapNumber = useToNumber(() => props.overlap);
    const computedSize = useNumberishToStyle(() => props.size);
    const overlapScale = computed(() => Math.min(Math.max(overlapNumber.value, 0), 1) / 2);
    const paddingStyle = computed(() => {
      const value = computedSize.value ? `calc(${computedSize.value} * ${overlapScale.value})` : null;
      return value ? { paddingLeft: value, paddingRight: value } : {};
    });
    provide(avatarGroupInjectionKey, {
      overlapScale,
      size: toRef(() => props.size),
      square: toRef(() => props.square),
      rounded: toRef(() => props.rounded),
      roundedTop: toRef(() => props.roundedTop),
      roundedBottom: toRef(() => props.roundedBottom),
      roundedStart: toRef(() => props.roundedStart),
      roundedEnd: toRef(() => props.roundedEnd),
      variant: toRef(() => props.variant),
      bgVariant: toRef(() => props.bgVariant),
      textVariant: toRef(() => props.textVariant),
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: 'b-avatar-group',
            role: 'group',
          },
          {
            default: withCtx(() => [
              createBaseVNode(
                'div',
                {
                  class: 'b-avatar-group-inner',
                  style: normalizeStyle(paddingStyle.value),
                },
                [renderSlot(_ctx.$slots, 'default')],
                4,
              ),
            ]),
            _: 3,
          },
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BBreadcrumb.vue_vue_type_script_setup_true_lang-nd2E3QjW.mjs
var _sfc_main$13 = defineComponent({
  __name: 'BBreadcrumbItem',
  props: {
    ariaCurrent: { default: 'location' },
    text: { default: void 0 },
    active: { type: Boolean, default: false },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    prefetchedClass: {},
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: void 0 },
  },
  emits: ['click'],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BBreadcrumbItem');
    const emit = __emit;
    const computedClasses = computed(() => ({
      active: props.active,
    }));
    const computedTag = computed(() => (props.active ? 'span' : _sfc_main7));
    const computedAriaCurrent = computed(() => (props.active ? props.ariaCurrent : void 0));
    const computedLinkProps = computed(() =>
      computedTag.value !== 'span'
        ? pick(props, [
            'active',
            'activeClass',
            'append',
            'disabled',
            'href',
            'rel',
            'replace',
            'routerComponentName',
            'target',
            'to',
            'variant',
            'opacity',
            'opacityHover',
            'underlineVariant',
            'underlineOffset',
            'underlineOffsetHover',
            'underlineOpacity',
            'underlineOpacityHover',
            'icon',
          ])
        : {},
    );
    const clicked = e => {
      if (props.disabled || props.active) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (!props.disabled) emit('click', e);
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'li',
          {
            class: normalizeClass(['breadcrumb-item', computedClasses.value]),
          },
          [
            (openBlock(),
            createBlock(
              resolveDynamicComponent(computedTag.value),
              mergeProps({ 'aria-current': computedAriaCurrent.value }, computedLinkProps.value, { onClick: clicked }),
              {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
                ]),
                _: 3,
              },
              16,
              ['aria-current'],
            )),
          ],
          2,
        )
      );
    };
  },
});
var _hoisted_16 = { 'aria-label': 'breadcrumb' };
var _hoisted_23 = { class: 'breadcrumb' };
var _sfc_main13 = defineComponent({
  __name: 'BBreadcrumb',
  props: {
    items: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BBreadcrumb');
    const breadcrumb = useBreadcrumb();
    const breadcrumbItemObjects = computed(() => {
      var _a;
      const localItems = props.items || ((_a = breadcrumb.items) == null ? void 0 : _a.value) || [];
      let activeDefined = false;
      const items = localItems.map((item, idx) => {
        if (typeof item === 'string') {
          item = { text: item };
          if (idx < localItems.length - 1) item.href = '#';
        }
        if (item.active) activeDefined = true;
        if (!item.active && !activeDefined) {
          item.active = idx + 1 === localItems.length;
        }
        return item;
      });
      return items;
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('nav', _hoisted_16, [
          createBaseVNode('ol', _hoisted_23, [
            renderSlot(_ctx.$slots, 'prepend'),
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(breadcrumbItemObjects.value, (item, i) => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main$13,
                    mergeProps(
                      {
                        key: i,
                        ref_for: true,
                      },
                      item,
                    ),
                    {
                      default: withCtx(() => [createTextVNode(toDisplayString(item.text), 1)]),
                      _: 2,
                    },
                    1040,
                  )
                );
              }),
              128,
            )),
            renderSlot(_ctx.$slots, 'default'),
            renderSlot(_ctx.$slots, 'append'),
          ]),
        ])
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BButtonToolbar.vue_vue_type_script_setup_true_lang-Cw3YzCpt.mjs
var _sfc_main$14 = defineComponent({
  __name: 'BButtonGroup',
  props: {
    ariaLabel: { default: 'Group' },
    size: { default: 'md' },
    tag: { default: 'div' },
    vertical: { type: Boolean, default: false },
  },
  setup(__props) {
    provide(buttonGroupKey, true);
    const _props = __props;
    const props = useDefaults(_props, 'BButtonGroup');
    const computedClasses = computed(() => ({
      'btn-group': !props.vertical,
      [`btn-group-${props.size}`]: props.size !== 'md',
      'btn-group-vertical': props.vertical,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass(computedClasses.value),
            role: 'group',
            'aria-label': unref(props).ariaLabel,
          },
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          8,
          ['class', 'aria-label'],
        )
      );
    };
  },
});
var _hoisted_17 = ['role', 'aria-label'];
var _sfc_main14 = defineComponent({
  __name: 'BButtonToolbar',
  props: {
    ariaLabel: { default: 'Group' },
    justify: { type: Boolean, default: false },
    role: { default: 'toolbar' },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BButtonToolbar');
    const computedClasses = computed(() => ({
      'justify-content-between': props.justify,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([computedClasses.value, 'btn-toolbar']),
            role: unref(props).role,
            'aria-label': unref(props).ariaLabel,
          },
          [renderSlot(_ctx.$slots, 'default')],
          10,
          _hoisted_17,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BImg.vue_vue_type_script_setup_true_lang-CoowQ3jJ.mjs
var _sfc_main15 = defineComponent({
  __name: 'BImg',
  props: {
    blank: { type: Boolean, default: false },
    blankColor: { default: 'transparent' },
    block: { type: Boolean, default: false },
    fluid: { type: Boolean, default: false },
    fluidGrow: { type: Boolean, default: false },
    height: { default: void 0 },
    tag: { default: 'img' },
    lazy: { type: Boolean, default: false },
    sizes: { default: void 0 },
    src: { default: void 0 },
    srcset: { default: void 0 },
    thumbnail: { type: Boolean, default: false },
    width: { default: void 0 },
    placement: { default: void 0 },
    rounded: { type: [Boolean, String, Number], default: false },
    roundedTop: { type: [Boolean, String, Number], default: void 0 },
    roundedBottom: { type: [Boolean, String, Number], default: void 0 },
    roundedStart: { type: [Boolean, String, Number], default: void 0 },
    roundedEnd: { type: [Boolean, String, Number], default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BImg');
    const heightNumber = useToNumber(() => props.height ?? NaN);
    const widthNumber = useToNumber(() => props.width ?? NaN);
    const radiusElementClasses = useRadiusElementClasses(() => ({
      rounded: props.rounded,
      roundedTop: props.roundedTop,
      roundedBottom: props.roundedBottom,
      roundedStart: props.roundedStart,
      roundedEnd: props.roundedEnd,
    }));
    const computedSrcset = computed(() =>
      typeof props.srcset === 'string'
        ? props.srcset
            .split(',')
            .filter(x => x)
            .join(',')
        : Array.isArray(props.srcset)
          ? props.srcset.filter(x => x).join(',')
          : void 0,
    );
    const computedSizes = computed(() =>
      typeof props.sizes === 'string'
        ? props.sizes
            .split(',')
            .filter(x => x)
            .join(',')
        : Array.isArray(props.sizes)
          ? props.sizes.filter(x => x).join(',')
          : void 0,
    );
    const computedDimentions = computed(() => {
      const width = Number.isNaN(widthNumber.value) ? void 0 : widthNumber.value;
      const height = Number.isNaN(heightNumber.value) ? void 0 : heightNumber.value;
      if (props.blank) {
        if (width !== void 0 && height === void 0) return { height: width, width };
        if (width === void 0 && height !== void 0) return { height, width: height };
        if (width === void 0 && height === void 0) return { height: 1, width: 1 };
      }
      return {
        width,
        height,
      };
    });
    const computedBlankImgSrc = computed(() =>
      makeBlankImgSrc(computedDimentions.value.width, computedDimentions.value.height, props.blankColor),
    );
    const computedAlignment = computed(() => ({
      'float-start': props.placement === 'start',
      'float-end': props.placement === 'end',
      'mx-auto': props.placement === 'center',
    }));
    const computedClasses = computed(() => [
      radiusElementClasses.value,
      computedAlignment.value,
      {
        'img-thumbnail': props.thumbnail,
        'img-fluid': props.fluid || props.fluidGrow,
        'w-100': props.fluidGrow,
        'd-block': props.block || props.placement === 'center',
      },
    ]);
    const makeBlankImgSrc = (width, height, color) =>
      `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
    <rect width="100%" height="100%" style="fill:${color};"></rect>
    </svg>`)}`;
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass([computedClasses.value, 'b-img']),
            src: !unref(props).blank ? unref(props).src : computedBlankImgSrc.value,
            width: computedDimentions.value.width || void 0,
            height: computedDimentions.value.height || void 0,
            srcset: !unref(props).blank ? computedSrcset.value : void 0,
            sizes: !unref(props).blank ? computedSizes.value : void 0,
            loading: unref(props).lazy ? 'lazy' : 'eager',
          },
          null,
          8,
          ['class', 'src', 'width', 'height', 'srcset', 'sizes', 'loading'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BCard.vue_vue_type_script_setup_true_lang-BrZMYuL-.mjs
var _sfc_main$7 = defineComponent({
  __name: 'BCardImg',
  props: {
    placement: { default: 'top' },
    blank: { type: Boolean, default: void 0 },
    blankColor: { default: void 0 },
    block: { type: Boolean, default: void 0 },
    fluid: { type: Boolean, default: void 0 },
    fluidGrow: { type: Boolean, default: void 0 },
    height: { default: void 0 },
    tag: {},
    lazy: { type: Boolean, default: void 0 },
    sizes: { default: void 0 },
    src: { default: void 0 },
    srcset: { default: void 0 },
    thumbnail: { type: Boolean, default: void 0 },
    width: { default: void 0 },
    rounded: { type: [Boolean, String, Number], default: void 0 },
    roundedTop: { type: [Boolean, String, Number], default: void 0 },
    roundedBottom: { type: [Boolean, String, Number], default: void 0 },
    roundedStart: { type: [Boolean, String, Number], default: void 0 },
    roundedEnd: { type: [Boolean, String, Number], default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BCardImg');
    const baseAlignmentClasses = computed(() => ({
      'card-img-top': props.placement === 'top',
      // TODO implement this class
      'card-img-end': props.placement === 'end',
      'card-img-bottom': props.placement === 'bottom',
      // TODO implement this class
      'card-img-start': props.placement === 'start',
      'card-img': props.placement === 'overlay',
    }));
    const computedImgProps = computed(() => omit(props, ['placement']));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(_sfc_main15, mergeProps(computedImgProps.value, { class: baseAlignmentClasses.value }), null, 16, ['class'])
      );
    };
  },
});
var _sfc_main$6 = defineComponent({
  __name: 'BCardHeadFoot',
  props: {
    borderVariant: { default: null },
    tag: { default: 'div' },
    text: { default: void 0 },
    variant: { default: null },
    bgVariant: { default: null },
    textVariant: { default: null },
  },
  setup(__props) {
    const props = __props;
    const computedClasses = useColorVariantClasses(props);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(_ctx.tag),
          {
            class: normalizeClass(unref(computedClasses)),
          },
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(_ctx.text), 1)])]),
            _: 3,
          },
          8,
          ['class'],
        )
      );
    };
  },
});
var _sfc_main$5 = defineComponent({
  __name: 'BCardHeader',
  props: {
    borderVariant: { default: void 0 },
    tag: { default: 'div' },
    text: { default: void 0 },
    variant: { default: void 0 },
    bgVariant: { default: void 0 },
    textVariant: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BCardHeader');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$6,
          mergeProps({ class: 'card-header' }, unref(props)),
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          16,
        )
      );
    };
  },
});
var _sfc_main$4 = defineComponent({
  __name: 'BCardTitle',
  props: {
    tag: { default: 'h4' },
    text: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BCardTitle');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          { class: 'card-title' },
          {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
            ]),
            _: 3,
          },
        )
      );
    };
  },
});
var _sfc_main$3 = defineComponent({
  __name: 'BCardSubtitle',
  props: {
    text: { default: void 0 },
    tag: { default: 'h6' },
    textVariant: { default: 'body-secondary' },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BCardSubtitle');
    const computedClasses = useColorVariantClasses(props);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass(['card-subtitle mb-2', unref(computedClasses)]),
          },
          {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
            ]),
            _: 3,
          },
          8,
          ['class'],
        )
      );
    };
  },
});
var _sfc_main$2 = defineComponent({
  __name: 'BCardBody',
  props: {
    overlay: { type: Boolean, default: false },
    subtitle: { default: void 0 },
    subtitleTag: { default: 'h4' },
    subtitleTextVariant: { default: void 0 },
    tag: { default: 'div' },
    text: { default: void 0 },
    title: { default: void 0 },
    titleTag: { default: 'h4' },
    variant: { default: null },
    bgVariant: { default: null },
    textVariant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BCardBody');
    const slots = useSlots();
    const hasTitleSlot = computed(() => !isEmptySlot(slots.title));
    const hasSubtitleSlot = computed(() => !isEmptySlot(slots.subtitle));
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed(() => [colorClasses.value, props.overlay ? 'card-img-overlay' : 'card-body']);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass(computedClasses.value),
          },
          {
            default: withCtx(() => [
              !!unref(props).title || hasTitleSlot.value
                ? (openBlock(),
                  createBlock(
                    _sfc_main$4,
                    {
                      key: 0,
                      tag: unref(props).titleTag,
                    },
                    {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, 'title', {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)]),
                      ]),
                      _: 3,
                    },
                    8,
                    ['tag'],
                  ))
                : createCommentVNode('', true),
              !!unref(props).subtitle || hasSubtitleSlot.value
                ? (openBlock(),
                  createBlock(
                    _sfc_main$3,
                    {
                      key: 1,
                      tag: unref(props).subtitleTag,
                      'text-variant': unref(props).subtitleTextVariant,
                    },
                    {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, 'subtitle', {}, () => [createTextVNode(toDisplayString(unref(props).subtitle), 1)]),
                      ]),
                      _: 3,
                    },
                    8,
                    ['tag', 'text-variant'],
                  ))
                : createCommentVNode('', true),
              renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
            ]),
            _: 3,
          },
          8,
          ['class'],
        )
      );
    };
  },
});
var _sfc_main$15 = defineComponent({
  __name: 'BCardFooter',
  props: {
    borderVariant: { default: void 0 },
    tag: { default: 'div' },
    text: { default: void 0 },
    variant: { default: void 0 },
    bgVariant: { default: void 0 },
    textVariant: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BCardFooter');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$6,
          mergeProps({ class: 'card-footer' }, unref(props)),
          {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
            ]),
            _: 3,
          },
          16,
        )
      );
    };
  },
});
var _sfc_main16 = defineComponent({
  __name: 'BCard',
  props: {
    align: { default: void 0 },
    bodyBgVariant: { default: void 0 },
    bodyClass: { default: void 0 },
    bodyTag: { default: 'div' },
    bodyText: { default: '' },
    bodyTextVariant: { default: void 0 },
    borderVariant: { default: null },
    footer: { default: void 0 },
    footerBgVariant: { default: void 0 },
    footerBorderVariant: { default: void 0 },
    footerClass: { default: void 0 },
    footerTag: { default: 'div' },
    footerTextVariant: { default: void 0 },
    footerVariant: { default: null },
    header: { default: void 0 },
    headerBgVariant: { default: void 0 },
    headerBorderVariant: { default: void 0 },
    headerClass: { default: void 0 },
    headerTag: { default: 'div' },
    headerTextVariant: { default: void 0 },
    headerVariant: { default: null },
    imgAlt: { default: void 0 },
    imgPlacement: { default: 'top' },
    imgHeight: { default: void 0 },
    imgSrc: { default: void 0 },
    imgWidth: { default: void 0 },
    noBody: { type: Boolean, default: false },
    subtitle: { default: void 0 },
    subtitleTag: { default: 'h6' },
    subtitleTextVariant: { default: 'body-secondary' },
    tag: { default: 'div' },
    title: { default: void 0 },
    titleTag: { default: 'h4' },
    variant: { default: null },
    bgVariant: { default: null },
    textVariant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BCard');
    const slots = useSlots();
    const hasHeaderSlot = computed(() => !isEmptySlot(slots.header));
    const hasFooterSlot = computed(() => !isEmptySlot(slots.footer));
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed(() => [
      colorClasses.value,
      {
        [`text-${props.align}`]: props.align !== void 0,
        'flex-row': props.imgPlacement === 'start',
        'flex-row-reverse': props.imgPlacement === 'end',
      },
    ]);
    const imgAttr = computed(() => ({
      src: props.imgSrc,
      alt: props.imgAlt,
      height: props.imgHeight,
      width: props.imgWidth,
      placement: props.imgPlacement,
    }));
    const ReusableImg = createReusableTemplate();
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass(['card', computedClasses.value]),
          },
          {
            default: withCtx(() => [
              createVNode(unref(ReusableImg).define, null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, 'img', {}, () => [
                    unref(props).imgSrc
                      ? (openBlock(), createBlock(_sfc_main$7, normalizeProps(mergeProps({ key: 0 }, imgAttr.value)), null, 16))
                      : createCommentVNode('', true),
                  ]),
                ]),
                _: 3,
              }),
              unref(props).imgPlacement !== 'bottom'
                ? (openBlock(), createBlock(unref(ReusableImg).reuse, { key: 0 }))
                : createCommentVNode('', true),
              unref(props).header || hasHeaderSlot.value
                ? (openBlock(),
                  createBlock(
                    _sfc_main$5,
                    {
                      key: 1,
                      'bg-variant': unref(props).headerBgVariant,
                      variant: unref(props).headerVariant,
                      'border-variant': unref(props).headerBorderVariant,
                      tag: unref(props).headerTag,
                      'text-variant': unref(props).headerTextVariant,
                      class: normalizeClass(unref(props).headerClass),
                    },
                    {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, 'header', {}, () => [createTextVNode(toDisplayString(unref(props).header), 1)]),
                      ]),
                      _: 3,
                    },
                    8,
                    ['bg-variant', 'variant', 'border-variant', 'tag', 'text-variant', 'class'],
                  ))
                : createCommentVNode('', true),
              !unref(props).noBody
                ? (openBlock(),
                  createBlock(
                    _sfc_main$2,
                    {
                      key: 2,
                      overlay: unref(props).imgPlacement === 'overlay',
                      'bg-variant': unref(props).bodyBgVariant,
                      tag: unref(props).bodyTag,
                      'text-variant': unref(props).bodyTextVariant,
                      subtitle: unref(props).subtitle,
                      'subtitle-tag': unref(props).subtitleTag,
                      'subtitle-text-variant': unref(props).subtitleTextVariant,
                      title: unref(props).title,
                      'title-tag': unref(props).titleTag,
                      class: normalizeClass(unref(props).bodyClass),
                    },
                    {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).bodyText), 1)]),
                      ]),
                      _: 3,
                    },
                    8,
                    [
                      'overlay',
                      'bg-variant',
                      'tag',
                      'text-variant',
                      'subtitle',
                      'subtitle-tag',
                      'subtitle-text-variant',
                      'title',
                      'title-tag',
                      'class',
                    ],
                  ))
                : renderSlot(_ctx.$slots, 'default', { key: 3 }, () => [createTextVNode(toDisplayString(unref(props).bodyText), 1)]),
              unref(props).footer || hasFooterSlot.value
                ? (openBlock(),
                  createBlock(
                    _sfc_main$15,
                    {
                      key: 4,
                      'bg-variant': unref(props).footerBgVariant,
                      'border-variant': unref(props).footerBorderVariant,
                      variant: unref(props).footerVariant,
                      tag: unref(props).footerTag,
                      'text-variant': unref(props).footerTextVariant,
                      class: normalizeClass(unref(props).footerClass),
                    },
                    {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, 'footer', {}, () => [createTextVNode(toDisplayString(unref(props).footer), 1)]),
                      ]),
                      _: 3,
                    },
                    8,
                    ['bg-variant', 'border-variant', 'variant', 'tag', 'text-variant', 'class'],
                  ))
                : createCommentVNode('', true),
              unref(props).imgPlacement === 'bottom'
                ? (openBlock(), createBlock(unref(ReusableImg).reuse, { key: 5 }))
                : createCommentVNode('', true),
            ]),
            _: 3,
          },
          8,
          ['class'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BCardText.vue_vue_type_script_setup_true_lang-Be6CD36N.mjs
var _sfc_main$16 = defineComponent({
  __name: 'BCardGroup',
  props: {
    columns: { type: Boolean, default: false },
    deck: { type: Boolean, default: false },
    tag: { default: 'div' },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BCardGroup');
    const cardTypeClass = computed(() => (props.deck ? 'card-deck' : props.columns ? 'card-columns' : 'card-group'));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass(cardTypeClass.value),
          },
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          8,
          ['class'],
        )
      );
    };
  },
});
var _sfc_main17 = defineComponent({
  __name: 'BCardText',
  props: {
    tag: { default: 'p' },
    text: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BCardText');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          { class: 'card-text' },
          {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
            ]),
            _: 3,
          },
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BCarouselSlide.vue_vue_type_script_setup_true_lang-DyQMUAVG.mjs
var getSlotElements = (slot, filterBy) =>
  ((slot == null ? void 0 : slot()) ?? [])
    .reduce((arr, slot2) => {
      if (typeof slot2.type === 'symbol') {
        arr = arr.concat(slot2.children);
      } else {
        arr.push(slot2);
      }
      return arr;
    }, [])
    .filter(child => {
      var _a;
      return ((_a = child.type) == null ? void 0 : _a.__name) === filterBy;
    });
var _hoisted_1$12 = ['id'];
var _hoisted_24 = ['aria-label', 'aria-owns'];
var _hoisted_32 = ['aria-current', 'aria-label', 'aria-controls', 'aria-describedby', 'onClick'];
var _hoisted_42 = {
  ref: '_relatedTarget',
  class: 'carousel-inner',
};
var _hoisted_5 = { class: 'visually-hidden' };
var _hoisted_6 = { class: 'visually-hidden' };
var _sfc_main$17 = defineComponent({
  __name: 'BCarousel',
  props: mergeModels(
    {
      background: { default: void 0 },
      controls: { type: Boolean, default: false },
      controlsNextText: { default: 'Next' },
      controlsPrevText: { default: 'Previous' },
      fade: { type: Boolean, default: false },
      id: { default: void 0 },
      imgHeight: { default: void 0 },
      imgWidth: { default: void 0 },
      indicators: { type: Boolean, default: false },
      indicatorsButtonLabel: { default: 'Slide' },
      interval: { default: 5e3 },
      labelIndicators: { default: 'Select a slide to display' },
      keyboard: { type: Boolean, default: true },
      noAnimation: { type: Boolean, default: false },
      noHoverPause: { type: Boolean, default: false },
      noTouch: { type: Boolean, default: false },
      noWrap: { type: Boolean, default: false },
      ride: { type: [Boolean, String], default: false },
      rideReverse: { type: Boolean, default: false },
      touchThreshold: { default: 50 },
    },
    {
      modelValue: { default: 0 },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(['slide', 'slid', 'prev-click', 'next-click'], ['update:modelValue']),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BCarousel');
    const emit = __emit;
    const slots = useSlots();
    const computedId = useId2(() => props.id, 'carousel');
    const buttonOwnership = useId2(void 0, 'carousel-button-ownership');
    const modelValue = useModel(__props, 'modelValue');
    const slideValues = useTemplateRef('_slideValues');
    const touchThresholdNumber = useToNumber(() => props.touchThreshold);
    const slideInterval = ref(null);
    onMounted(() => {
      var _a, _b;
      slideInterval.value =
        ((_b = (_a = slideValues.value) == null ? void 0 : _a.find(slid => slid.$el.style.display !== 'none')) == null
          ? void 0
          : _b._interval) ?? null;
    });
    const intervalNumber = useToNumber(() => slideInterval.value ?? props.interval);
    const isTransitioning = ref(false);
    const rideStarted = ref(false);
    const direction = ref(true);
    const relatedTarget = useTemplateRef('_relatedTarget');
    const element = useTemplateRef('_element');
    const previousModelValue = ref(modelValue.value);
    const isHovering = useElementHover(element);
    const enterClasses = computed(
      () => `carousel-item carousel-item-${!direction.value ? 'next' : 'prev'} carousel-item-${!direction.value ? 'start' : 'end'}`,
    );
    const leaveClasses = computed(() => `carousel-item active carousel-item-${direction.value ? 'start' : 'end'}`);
    const { pause, resume } = useIntervalFn(
      () => {
        if (props.rideReverse) {
          prev();
          return;
        }
        next();
      },
      intervalNumber,
      { immediate: props.ride === 'carousel' },
    );
    const isRiding = computed(() => (props.ride === true && rideStarted.value === true) || props.ride === 'carousel');
    const slides = computed(() => getSlotElements(slots.default, 'BCarouselSlide'));
    const computedClasses = computed(() => ({ 'carousel-fade': props.fade }));
    const buildBvCarouselEvent = event => {
      var _a;
      return new BvCarouselEvent(event, {
        componentId: computedId.value,
        cancelable: false,
        target: element.value,
        direction: direction.value ? 'right' : 'left',
        from: previousModelValue.value,
        to: modelValue.value,
        relatedTarget: ((_a = relatedTarget.value) == null ? void 0 : _a.children[modelValue.value]) ?? null,
      });
    };
    const goToValue = value => {
      if (isTransitioning.value === true) return;
      if (props.ride === true) {
        rideStarted.value = true;
      }
      if (isRiding.value === true) {
        resume();
      }
      direction.value = value < modelValue.value ? false : true;
      if (value >= slides.value.length) {
        if (props.noWrap) return;
        modelValue.value = 0;
        return;
      }
      if (value < 0) {
        if (props.noWrap) return;
        modelValue.value = slides.value.length - 1;
        return;
      }
      previousModelValue.value = modelValue.value;
      modelValue.value = value;
    };
    const prev = () => {
      goToValue(modelValue.value - 1);
    };
    const next = () => {
      goToValue(modelValue.value + 1);
    };
    const onKeydown = fn => {
      if (props.keyboard === false) return;
      fn();
    };
    const onMouseEnter = () => {
      if (props.noHoverPause) return;
      pause();
    };
    const onMouseLeave = () => {
      if (!isRiding.value) return;
      resume();
    };
    const { lengthX } = useSwipe(element, {
      passive: true,
      onSwipeStart() {
        if (props.noTouch === true) return;
        pause();
      },
      onSwipeEnd() {
        if (props.noTouch === true) return;
        const resumeRiding = () => {
          if (isRiding.value === false) return;
          resume();
        };
        if (lengthX.value >= touchThresholdNumber.value) {
          next();
          resumeRiding();
          return;
        }
        if (lengthX.value <= -touchThresholdNumber.value) {
          prev();
          resumeRiding();
        }
      },
    });
    const onBeforeLeave = () => {
      emit('slide', buildBvCarouselEvent('slide'));
      isTransitioning.value = true;
    };
    const onAfterLeave = () => {
      emit('slid', buildBvCarouselEvent('slid'));
      isTransitioning.value = false;
    };
    const onAfterEnter = el => {
      if (modelValue.value !== 0) {
        el.classList.add('carousel-item');
      }
    };
    const onEnter = el => {
      var _a, _b;
      slideInterval.value =
        ((_b = (_a = slideValues.value) == null ? void 0 : _a.find(slid => slid.$el === el)) == null ? void 0 : _b._interval) ?? null;
    };
    onKeyStroke(
      'ArrowLeft',
      () => {
        onKeydown(prev);
      },
      { target: element },
    );
    onKeyStroke(
      'ArrowRight',
      () => {
        onKeydown(next);
      },
      { target: element },
    );
    watch(
      () => props.ride,
      () => {
        rideStarted.value = false;
      },
    );
    watch(isHovering, newValue => {
      if (newValue) {
        onMouseEnter();
        return;
      }
      onMouseLeave();
    });
    const onClickPrev = event => {
      emit('prev-click', event);
      if (event.defaultPrevented) return;
      prev();
    };
    const onClickNext = event => {
      emit('next-click', event);
      if (event.defaultPrevented) return;
      next();
    };
    __expose({
      next,
      pause,
      prev,
      resume,
    });
    provide(carouselInjectionKey, {
      background: toRef(() => props.background),
      width: toRef(() => props.imgWidth),
      height: toRef(() => props.imgHeight),
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            id: unref(computedId),
            ref: '_element',
            class: normalizeClass(['carousel slide pointer-event', computedClasses.value]),
          },
          [
            unref(props).indicators
              ? (openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: 'carousel-indicators',
                    'aria-label': unref(props).labelIndicators,
                    'aria-owns': unref(buttonOwnership),
                  },
                  [
                    (openBlock(true),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(slides.value.length, (_, i) => {
                        var _a;
                        return (
                          openBlock(),
                          createElementBlock(
                            'button',
                            {
                              key: i,
                              type: 'button',
                              'data-bs-target': '',
                              class: normalizeClass(i === modelValue.value ? 'active' : ''),
                              'aria-current': i === modelValue.value ? true : void 0,
                              'aria-label': `${unref(props).indicatorsButtonLabel} ${i}`,
                              'aria-controls': unref(buttonOwnership),
                              'aria-describedby': (_a = unref(slideValues)) == null ? void 0 : _a[i]._id,
                              onClick: $event => goToValue(i),
                            },
                            null,
                            10,
                            _hoisted_32,
                          )
                        );
                      }),
                      128,
                    )),
                  ],
                  8,
                  _hoisted_24,
                ))
              : createCommentVNode('', true),
            createBaseVNode(
              'div',
              _hoisted_42,
              [
                createVNode(
                  TransitionGroup,
                  {
                    'enter-from-class': enterClasses.value,
                    'enter-active-class': enterClasses.value,
                    'enter-to-class': enterClasses.value,
                    'leave-from-class': leaveClasses.value,
                    'leave-active-class': leaveClasses.value,
                    'leave-to-class': leaveClasses.value,
                    onBeforeLeave,
                    onAfterLeave,
                    onAfterEnter,
                    onEnter,
                  },
                  {
                    default: withCtx(() => [
                      (openBlock(true),
                      createElementBlock(
                        Fragment,
                        null,
                        renderList(slides.value, (slide, i) => {
                          return withDirectives(
                            (openBlock(),
                            createBlock(
                              resolveDynamicComponent(slide),
                              {
                                key: i,
                                ref_for: true,
                                ref: '_slideValues',
                                class: normalizeClass({ active: i === modelValue.value && isTransitioning.value === false }),
                                style: normalizeStyle(unref(props).noAnimation && { transition: 'none' }),
                              },
                              null,
                              8,
                              ['class', 'style'],
                            )),
                            [[vShow, i === modelValue.value]],
                          );
                        }),
                        128,
                      )),
                    ]),
                    _: 1,
                  },
                  8,
                  ['enter-from-class', 'enter-active-class', 'enter-to-class', 'leave-from-class', 'leave-active-class', 'leave-to-class'],
                ),
              ],
              512,
            ),
            unref(props).controls
              ? (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 1 },
                  [
                    createBaseVNode(
                      'button',
                      {
                        class: 'carousel-control-prev',
                        type: 'button',
                        onClick: onClickPrev,
                      },
                      [
                        _cache[0] ||
                          (_cache[0] = createBaseVNode(
                            'span',
                            {
                              class: 'carousel-control-prev-icon',
                              'aria-hidden': 'true',
                            },
                            null,
                            -1,
                          )),
                        createBaseVNode('span', _hoisted_5, toDisplayString(unref(props).controlsPrevText), 1),
                      ],
                    ),
                    createBaseVNode(
                      'button',
                      {
                        class: 'carousel-control-next',
                        type: 'button',
                        onClick: onClickNext,
                      },
                      [
                        _cache[1] ||
                          (_cache[1] = createBaseVNode(
                            'span',
                            {
                              class: 'carousel-control-next-icon',
                              'aria-hidden': 'true',
                            },
                            null,
                            -1,
                          )),
                        createBaseVNode('span', _hoisted_6, toDisplayString(unref(props).controlsNextText), 1),
                      ],
                    ),
                  ],
                  64,
                ))
              : createCommentVNode('', true),
          ],
          10,
          _hoisted_1$12,
        )
      );
    };
  },
});
var _hoisted_18 = ['id'];
var _sfc_main18 = defineComponent({
  __name: 'BCarouselSlide',
  props: {
    background: { default: void 0 },
    caption: { default: void 0 },
    captionTag: { default: 'h3' },
    contentTag: { default: 'div' },
    contentVisibleUp: { default: void 0 },
    id: { default: void 0 },
    imgAlt: { default: void 0 },
    imgBlank: { type: Boolean, default: false },
    imgBlankColor: { default: 'transparent' },
    imgHeight: { default: void 0 },
    imgSrc: { default: void 0 },
    imgSrcset: { default: void 0 },
    imgWidth: { default: void 0 },
    interval: { default: void 0 },
    text: { default: void 0 },
    textTag: { default: 'p' },
  },
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, 'BCarouselSlide');
    const slots = useSlots();
    const computedId = useId2(() => props.id, 'carousel-slide');
    const parentData = inject(carouselInjectionKey, null);
    const hasText = computed(() => props.text || !isEmptySlot(slots.text));
    const hasCaption = computed(() => props.caption || !isEmptySlot(slots.caption));
    const hasContent = computed(() => hasText.value || hasCaption.value || !isEmptySlot(slots.default));
    const computedStyle = computed(() => ({
      background: `${props.background || (parentData == null ? void 0 : parentData.background.value) || 'rgb(171, 171, 171)'} none repeat scroll 0% 0%`,
    }));
    const computedContentClasses = computed(() => ({
      'd-none': props.contentVisibleUp !== void 0,
      [`d-${props.contentVisibleUp}-block`]: props.contentVisibleUp !== void 0,
    }));
    __expose({
      _interval: toRef(() => props.interval),
      _id: computedId,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            id: unref(computedId),
            class: 'carousel-item',
            style: normalizeStyle(computedStyle.value),
          },
          [
            renderSlot(_ctx.$slots, 'img', {}, () => {
              var _a, _b;
              return [
                createVNode(
                  _sfc_main15,
                  {
                    class: 'd-block w-100',
                    alt: unref(props).imgAlt,
                    srcset: unref(props).imgSrcset,
                    src: unref(props).imgSrc,
                    width: unref(props).imgWidth || ((_a = unref(parentData)) == null ? void 0 : _a.width.value),
                    height: unref(props).imgHeight || ((_b = unref(parentData)) == null ? void 0 : _b.height.value),
                    blank: unref(props).imgBlank,
                    'blank-color': unref(props).imgBlankColor,
                  },
                  null,
                  8,
                  ['alt', 'srcset', 'src', 'width', 'height', 'blank', 'blank-color'],
                ),
              ];
            }),
            hasContent.value
              ? (openBlock(),
                createBlock(
                  resolveDynamicComponent(unref(props).contentTag),
                  {
                    key: 0,
                    class: normalizeClass(['carousel-caption', computedContentClasses.value]),
                  },
                  {
                    default: withCtx(() => [
                      hasCaption.value
                        ? (openBlock(),
                          createBlock(
                            resolveDynamicComponent(unref(props).captionTag),
                            { key: 0 },
                            {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, 'caption', {}, () => [
                                  createBaseVNode('span', null, toDisplayString(unref(props).caption), 1),
                                ]),
                              ]),
                              _: 3,
                            },
                          ))
                        : createCommentVNode('', true),
                      hasText.value
                        ? (openBlock(),
                          createBlock(
                            resolveDynamicComponent(unref(props).textTag),
                            { key: 1 },
                            {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, 'text', {}, () => [
                                  createBaseVNode('span', null, toDisplayString(unref(props).text), 1),
                                ]),
                              ]),
                              _: 3,
                            },
                          ))
                        : createCommentVNode('', true),
                      renderSlot(_ctx.$slots, 'default'),
                    ]),
                    _: 3,
                  },
                  8,
                  ['class'],
                ))
              : createCommentVNode('', true),
          ],
          12,
          _hoisted_18,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/getClasses-CsgNQabU.mjs
var getClasses = (props, els, propPrefix, classPrefix = propPrefix) =>
  els.reduce((arr, prop) => {
    if (!props[prop]) return arr;
    arr.push(
      [classPrefix, prop.replace(propPrefix, ''), props[prop]]
        .filter(e => e && typeof e !== 'boolean')
        .join('-')
        .toLowerCase(),
    );
    return arr;
  }, []);

// node_modules/bootstrap-vue-next/dist/BCol.vue_vue_type_script_setup_true_lang-zEDCknHc.mjs
var _sfc_main19 = defineComponent({
  __name: 'BCol',
  props: {
    alignSelf: { default: void 0 },
    tag: { default: 'div' },
    order: { default: void 0 },
    offset: { default: void 0 },
    cols: { default: void 0 },
    col: { type: Boolean, default: false },
    offsetSm: { default: void 0 },
    offsetMd: { default: void 0 },
    offsetLg: { default: void 0 },
    offsetXl: { default: void 0 },
    offsetXxl: { default: void 0 },
    orderSm: { default: void 0 },
    orderMd: { default: void 0 },
    orderLg: { default: void 0 },
    orderXl: { default: void 0 },
    orderXxl: { default: void 0 },
    sm: { type: [Boolean, Number, String], default: false },
    md: { type: [Boolean, Number, String], default: false },
    lg: { type: [Boolean, Number, String], default: false },
    xl: { type: [Boolean, Number, String], default: false },
    xxl: { type: [Boolean, Number, String], default: false },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BCol');
    const classList = computed(() => [
      ...getClasses(
        {
          sm: props.sm,
          md: props.md,
          lg: props.lg,
          xl: props.xl,
          xxl: props.xxl,
        },
        ['sm', 'md', 'lg', 'xl', 'xxl'],
        'col',
      ),
      ...getClasses(
        {
          order: props.order,
          orderLg: props.orderLg,
          orderMd: props.orderMd,
          orderSm: props.orderSm,
          orderXl: props.orderXl,
          orderXxl: props.orderXxl,
        },
        ['order', 'orderLg', 'orderMd', 'orderSm', 'orderXl', 'orderXxl'],
        'order',
      ),
      ...getClasses(
        {
          offset: props.offset,
          offsetLg: props.offsetLg,
          offsetMd: props.offsetMd,
          offsetSm: props.offsetSm,
          offsetXl: props.offsetXl,
          offsetXxl: props.offsetXxl,
        },
        ['offset', 'offsetLg', 'offsetMd', 'offsetSm', 'offsetXl', 'offsetXxl'],
        'offset',
      ),
    ]);
    const computedClasses = computed(() => [
      classList.value,
      {
        col: props.col || (!classList.value.some(v => v.startsWith('col-')) && !props.cols),
        [`col-${props.cols}`]: props.cols !== void 0,
        [`offset-${props.offset}`]: props.offset !== void 0,
        [`order-${props.order}`]: props.order !== void 0,
        [`align-self-${props.alignSelf}`]: props.alignSelf !== void 0,
      },
    ]);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass(computedClasses.value),
          },
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          8,
          ['class'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BContainer.vue_vue_type_script_setup_true_lang-w2M6sC0-.mjs
var _sfc_main20 = defineComponent({
  __name: 'BContainer',
  props: {
    fluid: { type: [Boolean, String], default: false },
    gutterX: { default: void 0 },
    gutterY: { default: void 0 },
    tag: { default: 'div' },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BContainer');
    const computedClasses = computed(() => ({
      container: props.fluid === false,
      [`container-fluid`]: props.fluid === true,
      [`container-${props.fluid}`]: typeof props.fluid === 'string',
      [`gx-${props.gutterX}`]: props.gutterX !== void 0,
      [`gy-${props.gutterY}`]: props.gutterY !== void 0,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass(computedClasses.value),
          },
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          8,
          ['class'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/useAlignment-Cw-9AVid.mjs
var useAlignment = align =>
  computed(() => {
    const value = toValue(align);
    return !value ? '' : `justify-content-${value}`;
  });

// node_modules/bootstrap-vue-next/dist/BRow.vue_vue_type_script_setup_true_lang-69TY75-8.mjs
var _sfc_main21 = defineComponent({
  __name: 'BRow',
  props: {
    tag: { default: 'div' },
    gutterX: { default: void 0 },
    gutterY: { default: void 0 },
    noGutters: { type: Boolean, default: false },
    alignV: { default: void 0 },
    alignH: { default: void 0 },
    alignContent: { default: void 0 },
    cols: { default: void 0 },
    colsSm: { default: void 0 },
    colsMd: { default: void 0 },
    colsLg: { default: void 0 },
    colsXl: { default: void 0 },
    colsXxl: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BRow');
    const alignment = useAlignment(() => props.alignH);
    const rowColsClasses = computed(() =>
      getClasses(
        {
          cols: props.cols,
          colsLg: props.colsLg,
          colsMd: props.colsMd,
          colsSm: props.colsSm,
          colsXl: props.colsXl,
          colsXxl: props.colsXxl,
        },
        ['cols', 'colsLg', 'colsMd', 'colsSm', 'colsXl', 'colsXxl'],
        'cols',
        'row-cols',
      ),
    );
    const computedClasses = computed(() => [
      rowColsClasses.value,
      {
        [`gx-${props.gutterX}`]: props.gutterX !== void 0,
        [`gy-${props.gutterY}`]: props.gutterY !== void 0,
        'g-0': props.noGutters,
        [`align-items-${props.alignV}`]: props.alignV !== void 0,
        [alignment.value]: props.alignH !== void 0,
        [`align-content-${props.alignContent}`]: props.alignContent !== void 0,
      },
    ]);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass(['row', computedClasses.value]),
          },
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          8,
          ['class'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BDropdown-DlCQsS9y.mjs
var _hoisted_19 = { class: 'visually-hidden' };
var _hoisted_25 = ['id', 'aria-labelledby', 'role'];
var _sfc_main22 = defineComponent({
  __name: 'BDropdown',
  props: mergeModels(
    {
      ariaLabel: { default: void 0 },
      autoClose: { type: [Boolean, String], default: true },
      boundary: { default: 'clippingAncestors' },
      boundaryPadding: { default: void 0 },
      disabled: { type: Boolean, default: false },
      floatingMiddleware: { default: void 0 },
      id: { default: void 0 },
      isNav: { type: Boolean, default: false },
      menuClass: { default: void 0 },
      noCaret: { type: Boolean, default: false },
      noFlip: { type: Boolean, default: false },
      noShift: { type: Boolean, default: false },
      noSize: { type: Boolean, default: false },
      offset: { default: 0 },
      role: { default: 'menu' },
      size: { default: 'md' },
      noWrapper: { type: Boolean, default: false },
      split: { type: Boolean, default: false },
      splitButtonType: { default: 'button' },
      splitClass: { default: void 0 },
      splitDisabled: { type: Boolean, default: void 0 },
      splitHref: { default: void 0 },
      splitTo: { default: void 0 },
      splitVariant: { default: void 0 },
      strategy: { default: 'absolute' },
      text: { default: void 0 },
      toggleClass: { default: void 0 },
      toggleText: { default: 'Toggle dropdown' },
      variant: { default: 'secondary' },
      wrapperClass: { default: void 0 },
      placement: { default: 'bottom-start' },
      teleportDisabled: { type: Boolean, default: false },
      teleportTo: { default: void 0 },
      initialAnimation: { type: Boolean, default: false },
      noAnimation: { type: Boolean },
      noFade: { type: Boolean, default: false },
      lazy: { type: Boolean, default: false },
      unmountLazy: { type: Boolean, default: false },
      show: { type: Boolean, default: false },
      transProps: { default: void 0 },
      visible: { type: Boolean, default: false },
    },
    {
      modelValue: { type: Boolean, ...{ default: false } },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(
    ['split-click', 'hide', 'hide-prevented', 'hidden', 'show', 'show-prevented', 'shown', 'toggle', 'toggle-prevented'],
    ['update:modelValue'],
  ),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BDropdown');
    const emit = __emit;
    const computedId = useId2(() => props.id, 'dropdown');
    const modelValue = useModel(__props, 'modelValue');
    const inInputGroup = inject(inputGroupKey, false);
    const inButtonGroup = inject(buttonGroupKey, false);
    const computedOffset = computed(() => (typeof props.offset === 'string' || typeof props.offset === 'number' ? props.offset : NaN));
    const offsetToNumber = useToNumber(computedOffset);
    const floating = useTemplateRef('_floating');
    const button = useTemplateRef('_button');
    const splitButton = useTemplateRef('_splitButton');
    const boundary = computed(() => (isBoundary(props.boundary) ? props.boundary : void 0));
    const rootBoundary = computed(() => (isRootBoundary(props.boundary) ? props.boundary : void 0));
    const referencePlacement = computed(() => (!props.split ? splitButton.value : button.value));
    const {
      showRef,
      renderRef,
      hide: hide2,
      show,
      toggle: toggle2,
      computedNoAnimation,
      transitionProps,
      contentShowing,
      isVisible: isVisible2,
    } = useShowHide(modelValue, props, emit, referencePlacement, computedId);
    const computedMenuClasses = computed(() => [
      {
        show: isVisible2.value,
        fade: !computedNoAnimation.value,
      },
    ]);
    onKeyStroke(
      'Escape',
      () => {
        var _a;
        hide2();
        (_a = getElement(referencePlacement.value)) == null ? void 0 : _a.focus();
      },
      { target: referencePlacement },
    );
    onKeyStroke(
      'Escape',
      () => {
        var _a;
        hide2();
        (_a = getElement(referencePlacement.value)) == null ? void 0 : _a.focus();
      },
      { target: floating },
    );
    const keynav = (e, v) => {
      var _a, _b, _c, _d, _e, _f, _g;
      if ((_b = floating.value) == null ? void 0 : _b.contains((_a = e.target) == null ? void 0 : _a.closest('form'))) return;
      if (/input|select|option|textarea|form/i.test((_c = e.target) == null ? void 0 : _c.tagName)) return;
      e.preventDefault();
      if (!showRef.value) {
        show();
        const loop = setInterval(() => {
          if (isVisible2.value) {
            clearInterval(loop);
            nextTick(() => keynav(e, v));
          }
        }, 16);
        return;
      }
      const list = (_d = floating.value) == null ? void 0 : _d.querySelectorAll('.dropdown-item:not(.disabled):not(:disabled)');
      if (!list) return;
      if ((_e = floating.value) == null ? void 0 : _e.contains(document.activeElement)) {
        const active = floating.value.querySelector('.dropdown-item:focus');
        const index8 = Array.prototype.indexOf.call(list, active) + v;
        if (index8 >= 0 && index8 < (list == null ? void 0 : list.length)) (_f = list[index8]) == null ? void 0 : _f.focus();
      } else {
        (_g = list[v === -1 ? list.length - 1 : 0]) == null ? void 0 : _g.focus();
      }
    };
    onKeyStroke('ArrowUp', e => keynav(e, -1), { target: referencePlacement });
    onKeyStroke('ArrowDown', e => keynav(e, 1), { target: referencePlacement });
    onKeyStroke('ArrowUp', e => keynav(e, -1), { target: floating });
    onKeyStroke('ArrowDown', e => keynav(e, 1), { target: floating });
    const sizeStyles = ref({});
    const floatingMiddleware = computed(() => {
      if (props.floatingMiddleware !== void 0) {
        return props.floatingMiddleware;
      }
      const localOffset = typeof props.offset === 'string' || typeof props.offset === 'number' ? offsetToNumber.value : props.offset;
      const arr = [offset(localOffset)];
      if (props.noFlip === false) {
        arr.push(
          flip({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding,
          }),
        );
      }
      if (props.noShift === false) {
        arr.push(
          shift({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding,
          }),
        );
      }
      if (props.noSize === false) {
        arr.push(
          size({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding,
            apply({ availableWidth, availableHeight }) {
              var _a, _b;
              sizeStyles.value = {
                maxHeight:
                  availableHeight >= (((_a = floating.value) == null ? void 0 : _a.scrollHeight) ?? 0)
                    ? void 0
                    : availableHeight
                      ? `${Math.max(0, availableHeight)}px`
                      : void 0,
                maxWidth:
                  availableWidth >= (((_b = floating.value) == null ? void 0 : _b.scrollWidth) ?? 0)
                    ? void 0
                    : availableWidth
                      ? `${Math.max(0, availableWidth)}px`
                      : void 0,
              };
            },
          }),
        );
      }
      return arr;
    });
    const { update, floatingStyles } = useFloating(referencePlacement, floating, {
      placement: () => props.placement,
      middleware: floatingMiddleware,
      strategy: toRef(() => props.strategy),
      whileElementsMounted: autoUpdate,
    });
    const inButtonGroupAttributes = inButtonGroup
      ? {
          class: 'btn-group',
          role: 'group',
        }
      : void 0;
    const computedClasses = computed(() => [
      inButtonGroupAttributes == null ? void 0 : inButtonGroupAttributes.class,
      props.wrapperClass,
      {
        'btn-group': !props.wrapperClass && props.split,
        [`drop${resolveBootstrapCaret(props.placement)}`]: !props.wrapperClass,
        'position-static': props.boundary !== 'clippingAncestors' && !props.isNav,
      },
    ]);
    const buttonClasses = computed(() => [
      props.split ? props.splitClass : props.toggleClass,
      {
        'nav-link': props.isNav,
        'dropdown-toggle': !props.split,
        'dropdown-toggle-no-caret': props.noCaret && !props.split,
        show: props.split ? void 0 : showRef.value,
      },
    ]);
    const onButtonClick = () => {
      toggle2();
    };
    const onSplitClick = event => {
      if (props.split) {
        emit('split-click', event);
        return;
      }
      onButtonClick();
    };
    onClickOutside(
      floating,
      () => {
        if (showRef.value && (props.autoClose === true || props.autoClose === 'outside')) {
          hide2();
        }
      },
      { ignore: [button, splitButton] },
    );
    const onClickInside = () => {
      if (showRef.value && (props.autoClose === true || props.autoClose === 'inside')) {
        hide2();
      }
    };
    watch(isVisible2, () => {
      update();
    });
    __expose({
      hide: hide2,
      show,
      toggle: toggle2,
    });
    provide(dropdownInjectionKey, {
      id: computedId,
      show,
      hide: hide2,
      toggle: toggle2,
      visible: toRef(() => showRef.value),
      isNav: toRef(() => props.isNav),
    });
    return (_ctx, _cache) => {
      var _a;
      return (
        openBlock(),
        createBlock(
          _sfc_main10,
          {
            skip: unref(inInputGroup) || unref(props).noWrapper,
            class: normalizeClass(computedClasses.value),
            role: (_a = unref(inButtonGroupAttributes)) == null ? void 0 : _a.role,
          },
          {
            default: withCtx(() => [
              createVNode(
                _sfc_main8,
                {
                  id: unref(computedId),
                  ref: '_splitButton',
                  variant: unref(props).splitVariant || unref(props).variant,
                  size: unref(props).size,
                  class: normalizeClass(buttonClasses.value),
                  disabled: unref(props).splitDisabled || unref(props).disabled,
                  type: unref(props).splitButtonType,
                  'aria-label': unref(props).ariaLabel,
                  'aria-expanded': unref(props).split ? void 0 : unref(showRef),
                  'aria-haspopup': unref(props).split ? void 0 : 'menu',
                  href: unref(props).split ? unref(props).splitHref : void 0,
                  to: unref(props).split && unref(props).splitTo ? unref(props).splitTo : void 0,
                  onClick: onSplitClick,
                },
                {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, 'button-content', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)], true),
                  ]),
                  _: 3,
                },
                8,
                ['id', 'variant', 'size', 'class', 'disabled', 'type', 'aria-label', 'aria-expanded', 'aria-haspopup', 'href', 'to'],
              ),
              unref(props).split
                ? (openBlock(),
                  createBlock(
                    _sfc_main8,
                    {
                      key: 0,
                      id: unref(computedId) + '-split',
                      ref: '_button',
                      variant: unref(props).variant,
                      size: unref(props).size,
                      disabled: unref(props).disabled,
                      class: normalizeClass([
                        [unref(props).toggleClass, { show: unref(showRef) }],
                        'dropdown-toggle-split dropdown-toggle',
                      ]),
                      'aria-expanded': unref(showRef),
                      'aria-haspopup': 'menu',
                      onClick: onButtonClick,
                    },
                    {
                      default: withCtx(() => [
                        createBaseVNode('span', _hoisted_19, [
                          renderSlot(
                            _ctx.$slots,
                            'toggle-text',
                            {},
                            () => [createTextVNode(toDisplayString(unref(props).toggleText), 1)],
                            true,
                          ),
                        ]),
                      ]),
                      _: 3,
                    },
                    8,
                    ['id', 'variant', 'size', 'disabled', 'class', 'aria-expanded'],
                  ))
                : createCommentVNode('', true),
              createVNode(
                _sfc_main,
                {
                  to: unref(props).teleportTo,
                  disabled: !unref(props).teleportTo || unref(props).teleportDisabled,
                },
                {
                  default: withCtx(() => [
                    unref(renderRef) || unref(contentShowing)
                      ? (openBlock(),
                        createBlock(
                          Transition,
                          mergeProps({ key: 0 }, unref(transitionProps), {
                            appear: modelValue.value || unref(props).visible,
                          }),
                          {
                            default: withCtx(() => [
                              withDirectives(
                                createBaseVNode(
                                  'ul',
                                  {
                                    id: unref(computedId) + '-menu',
                                    ref: '_floating',
                                    style: normalizeStyle([unref(floatingStyles), sizeStyles.value]),
                                    class: normalizeClass([
                                      'dropdown-menu overflow-auto',
                                      [unref(props).menuClass, computedMenuClasses.value],
                                    ]),
                                    'aria-labelledby': unref(computedId),
                                    role: unref(props).role,
                                    onClick: onClickInside,
                                  },
                                  [
                                    unref(contentShowing)
                                      ? renderSlot(
                                          _ctx.$slots,
                                          'default',
                                          {
                                            key: 0,
                                            hide: unref(hide2),
                                            show: unref(show),
                                            visible: unref(showRef),
                                          },
                                          void 0,
                                          true,
                                        )
                                      : createCommentVNode('', true),
                                  ],
                                  14,
                                  _hoisted_25,
                                ),
                                [[vShow, unref(showRef)]],
                              ),
                            ]),
                            _: 3,
                          },
                          16,
                          ['appear'],
                        ))
                      : createCommentVNode('', true),
                  ]),
                  _: 3,
                },
                8,
                ['to', 'disabled'],
              ),
            ]),
            _: 3,
          },
          8,
          ['skip', 'class', 'role'],
        )
      );
    };
  },
});
var BDropdown = _export_sfc(_sfc_main22, [['__scopeId', 'data-v-8ac2524d']]);

// node_modules/bootstrap-vue-next/dist/BDropdownText.vue_vue_type_script_setup_true_lang-BDYQbS3v.mjs
var _sfc_main$62 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BDropdownDivider',
  props: {
    dividerClass: { default: void 0 },
    tag: { default: 'hr' },
    variant: {},
    wrapperAttrs: { default: void 0 },
  },
  setup(__props) {
    const attrs = useAttrs();
    const processedAttrs = computed(() => {
      const { class: wrapperClass, ...dividerAttrs } = attrs;
      return { wrapperClass, dividerAttrs };
    });
    const _props = __props;
    const props = useDefaults(_props, 'BDropdownDivider');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'li',
          mergeProps(
            {
              role: 'presentation',
              class: processedAttrs.value.wrapperClass,
            },
            _ctx.wrapperAttrs,
          ),
          [
            (openBlock(),
            createBlock(
              resolveDynamicComponent(unref(props).tag),
              mergeProps(
                {
                  class: ['dropdown-divider', unref(props).dividerClass],
                  role: 'separator',
                  'aria-orientation': 'horizontal',
                },
                processedAttrs.value.dividerAttrs,
              ),
              null,
              16,
              ['class'],
            )),
          ],
          16,
        )
      );
    };
  },
});
var _hoisted_1$2 = ['novalidate'];
var _sfc_main$52 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BDropdownForm',
  props: {
    formClass: { default: void 0 },
    novalidate: { type: Boolean, default: void 0 },
    validated: { type: Boolean, default: void 0 },
    wrapperAttrs: { default: void 0 },
  },
  setup(__props) {
    const attrs = useAttrs();
    const processedAttrs = computed(() => {
      const { class: wrapperClass, ...formAttrs } = attrs;
      return { wrapperClass, formAttrs };
    });
    const _props = __props;
    const props = useDefaults(_props, 'BDropdownForm');
    const computedClasses = computed(() => ({
      'was-validated': props.validated,
      ...props.formClass,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'li',
          mergeProps(
            {
              role: 'presentation',
              class: processedAttrs.value.wrapperClass,
            },
            unref(props).wrapperAttrs,
          ),
          [
            createBaseVNode(
              'form',
              mergeProps(
                {
                  class: ['dropdown-item-text', computedClasses.value],
                  novalidate: unref(props).novalidate,
                },
                processedAttrs.value.formAttrs,
              ),
              [renderSlot(_ctx.$slots, 'default')],
              16,
              _hoisted_1$2,
            ),
          ],
          16,
        )
      );
    };
  },
});
var _hoisted_1$13 = { role: 'presentation' };
var _hoisted_26 = ['id', 'aria-describedby'];
var _sfc_main$42 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BDropdownGroup',
  props: {
    ariaDescribedby: { default: void 0 },
    header: { default: void 0 },
    headerClass: { default: void 0 },
    headerTag: { default: 'header' },
    headerVariant: { default: null },
    id: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BDropdownGroup');
    const headerId = computed(() => (props.id ? `${props.id}_group_dd_header` : void 0));
    const headerRole = computed(() => (props.headerTag === 'header' ? void 0 : 'heading'));
    const colorClasses = useColorVariantClasses(
      computed(() => ({
        textVariant: props.headerVariant,
      })),
    );
    const computedClasses = computed(() => [props.headerClass, colorClasses.value]);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('li', _hoisted_1$13, [
          (openBlock(),
          createBlock(
            resolveDynamicComponent(unref(props).headerTag),
            {
              id: headerId.value,
              class: normalizeClass(['dropdown-header', computedClasses.value]),
              role: headerRole.value,
            },
            {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, 'header', {}, () => [createTextVNode(toDisplayString(unref(props).header), 1)]),
              ]),
              _: 3,
            },
            8,
            ['id', 'class', 'role'],
          )),
          createBaseVNode(
            'ul',
            mergeProps(
              {
                id: unref(props).id,
                role: 'group',
                class: 'list-unstyled',
              },
              _ctx.$attrs,
              {
                'aria-describedby': unref(props).ariaDescribedby || headerId.value,
              },
            ),
            [renderSlot(_ctx.$slots, 'default')],
            16,
            _hoisted_26,
          ),
        ])
      );
    };
  },
});
var _sfc_main$32 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BDropdownHeader',
  props: {
    headerClass: { default: void 0 },
    tag: { default: 'h6' },
    text: { default: void 0 },
    variant: { default: null },
    wrapperAttrs: { default: void 0 },
  },
  setup(__props) {
    const attrs = useAttrs();
    const processedAttrs = computed(() => {
      const { class: wrapperClass, ...headerAttrs } = attrs;
      return { wrapperClass, headerAttrs };
    });
    const _props = __props;
    const props = useDefaults(_props, 'BDropdownHeader');
    const colorClasses = useColorVariantClasses(
      computed(() => ({
        textVariant: props.variant,
      })),
    );
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'li',
          mergeProps(
            {
              role: 'presentation',
              class: processedAttrs.value.wrapperClass,
            },
            _ctx.wrapperAttrs,
          ),
          [
            (openBlock(),
            createBlock(
              resolveDynamicComponent(unref(props).tag),
              mergeProps(
                {
                  class: ['dropdown-header', [unref(colorClasses), unref(props).headerClass]],
                },
                processedAttrs.value.headerAttrs,
              ),
              {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
                ]),
                _: 3,
              },
              16,
              ['class'],
            )),
          ],
          16,
        )
      );
    };
  },
});
var _sfc_main$22 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BDropdownItem',
  props: {
    linkClass: { default: void 0 },
    wrapperAttrs: { default: void 0 },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    prefetchedClass: {},
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: null },
  },
  emits: ['click'],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BDropdownItem');
    const emit = __emit;
    const attrs = useAttrs();
    const processedAttrs = computed(() => {
      const { class: wrapperClass, ...dropdownItemAttrs } = attrs;
      return { wrapperClass, dropdownItemAttrs };
    });
    const { computedLink, computedLinkProps } = useBLinkHelper(props);
    const colorClasses = useColorVariantClasses(
      computed(() => ({
        textVariant: props.variant,
      })),
    );
    const computedClasses = computed(() => [
      props.linkClass,
      colorClasses.value,
      {
        active: props.active,
        disabled: props.disabled,
      },
    ]);
    const computedTag = computed(() => (computedLink.value ? _sfc_main7 : props.href ? 'a' : 'button'));
    const collapseData = inject(collapseInjectionKey, null);
    const dropdownData = inject(dropdownInjectionKey, null);
    const navbarData = inject(navbarInjectionKey, null);
    const clicked = e => {
      var _a, _b, _c;
      emit('click', e);
      if (navbarData !== null && ((_a = navbarData == null ? void 0 : navbarData.autoClose) == null ? void 0 : _a.value) === true) {
        (_b = collapseData == null ? void 0 : collapseData.hide) == null ? void 0 : _b.call(collapseData);
      }
      (_c = dropdownData == null ? void 0 : dropdownData.hide) == null ? void 0 : _c.call(dropdownData);
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'li',
          mergeProps(
            {
              role: 'presentation',
              class: processedAttrs.value.wrapperClass,
            },
            unref(props).wrapperAttrs,
          ),
          [
            (openBlock(),
            createBlock(
              resolveDynamicComponent(computedTag.value),
              mergeProps(
                {
                  class: ['dropdown-item', computedClasses.value],
                  disabled: unref(props).disabled,
                  'aria-disabled': unref(props).disabled ? true : null,
                  'aria-current': unref(props).active ? true : null,
                  href: computedTag.value === 'a' ? unref(props).href : null,
                  rel: unref(props).rel,
                  role: 'menuitem',
                  type: computedTag.value === 'button' ? 'button' : null,
                  target: unref(props).target,
                },
                { ...unref(computedLinkProps), ...processedAttrs.value.dropdownItemAttrs },
                { onClick: clicked },
              ),
              {
                default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
                _: 3,
              },
              16,
              ['class', 'disabled', 'aria-disabled', 'aria-current', 'href', 'rel', 'type', 'target'],
            )),
          ],
          16,
        )
      );
    };
  },
});
var _hoisted_110 = ['disabled'];
var _sfc_main$18 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BDropdownItemButton',
  props: {
    active: { type: Boolean, default: false },
    activeClass: { default: 'active' },
    buttonClass: { default: void 0 },
    wrapperAttrs: { default: void 0 },
    disabled: { type: Boolean, default: false },
    variant: { default: null },
  },
  emits: ['click'],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BDropdownItemButton');
    const emit = __emit;
    const attrs = useAttrs();
    const processedAttrs = computed(() => {
      const { class: wrapperClass, ...buttonAttrs } = attrs;
      return { wrapperClass, buttonAttrs };
    });
    const colorClasses = useColorVariantClasses(
      computed(() => ({
        textVariant: props.variant,
      })),
    );
    const computedClasses = computed(() => [
      props.buttonClass,
      colorClasses.value,
      {
        [props.activeClass]: props.active,
        disabled: props.disabled,
      },
    ]);
    const clicked = e => {
      if (props.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      emit('click', e);
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'li',
          mergeProps(
            {
              role: 'presentation',
              class: processedAttrs.value.wrapperClass,
            },
            unref(props).wrapperAttrs,
          ),
          [
            createBaseVNode(
              'button',
              mergeProps(
                {
                  role: 'menu',
                  type: 'button',
                  class: ['dropdown-item', computedClasses.value],
                  disabled: unref(props).disabled,
                },
                processedAttrs.value.buttonAttrs,
                { onClick: clicked },
              ),
              [renderSlot(_ctx.$slots, 'default')],
              16,
              _hoisted_110,
            ),
          ],
          16,
        )
      );
    };
  },
});
var _sfc_main23 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BDropdownText',
  props: {
    textClass: { default: void 0 },
    tag: { default: 'span' },
    text: { default: void 0 },
    variant: { default: null },
    wrapperAttrs: { default: void 0 },
  },
  setup(__props) {
    const attrs = useAttrs();
    const processedAttrs = computed(() => {
      const { class: wrapperClass, ...textAttrs } = attrs;
      return { wrapperClass, textAttrs };
    });
    const _props = __props;
    const props = useDefaults(_props, 'BDropdownText');
    const colorClasses = useColorVariantClasses(
      computed(() => ({
        textVariant: props.variant,
      })),
    );
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'li',
          mergeProps(
            {
              role: 'presentation',
              class: processedAttrs.value.wrapperClass,
            },
            _ctx.wrapperAttrs,
          ),
          [
            (openBlock(),
            createBlock(
              resolveDynamicComponent(unref(props).tag),
              mergeProps(
                {
                  class: ['dropdown-item-text', [unref(colorClasses), unref(props).textClass]],
                },
                processedAttrs.value.textAttrs,
              ),
              {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
                ]),
                _: 3,
              },
              16,
              ['class'],
            )),
          ],
          16,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BForm.vue_vue_type_script_setup_true_lang-Crnxo4h0.mjs
var _hoisted_111 = ['id', 'novalidate'];
var _sfc_main24 = defineComponent({
  __name: 'BForm',
  props: {
    floating: { type: Boolean, default: false },
    id: { default: void 0 },
    novalidate: { type: Boolean, default: false },
    validated: { type: Boolean, default: false },
  },
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, 'BForm');
    const element = useTemplateRef('_element');
    const computedClasses = computed(() => ({
      'form-floating': props.floating,
      'was-validated': props.validated,
    }));
    __expose({
      element,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'form',
          {
            id: unref(props).id,
            ref: '_element',
            novalidate: unref(props).novalidate,
            class: normalizeClass(computedClasses.value),
          },
          [renderSlot(_ctx.$slots, 'default')],
          10,
          _hoisted_111,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/useFormSelect-BJO_8jcC.mjs
var _hoisted_112 = ['value', 'disabled'];
var _sfc_main25 = defineComponent({
  __name: 'BFormSelectOption',
  props: {
    disabled: { type: Boolean, default: false },
    value: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormSelectOption');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'option',
          {
            value: unref(props).value,
            disabled: unref(props).disabled,
          },
          [renderSlot(_ctx.$slots, 'default')],
          8,
          _hoisted_112,
        )
      );
    };
  },
});
var useFormSelect = (options, props) => {
  const isComplex = option => typeof option === 'object' && option !== null && 'label' in option;
  const normalizeOption = option => {
    const propsValue = toValue(props);
    if (typeof option === 'string') {
      return { value: option, text: option };
    }
    if (typeof option === 'number') {
      return { value: option, text: `${option}` };
    }
    if (option instanceof Date) {
      return { value: option, text: option.toLocaleString() };
    }
    const value = get(option, propsValue.valueField);
    const text = get(option, propsValue.textField);
    const disabled = get(option, propsValue.disabledField);
    const opts = propsValue.optionsField ? get(option, propsValue.optionsField) : void 0;
    if (opts !== void 0) {
      return {
        label: get(option, propsValue.labelField) || text,
        options: opts,
      };
    }
    return {
      ...(typeof option === 'object' ? option : void 0),
      value,
      text,
      disabled,
    };
  };
  const normalizeOptions = opts => opts.map(option => normalizeOption(option));
  const normalizedOptions = computed(() => normalizeOptions(toValue(options)));
  return { normalizedOptions, isComplex };
};

// node_modules/bootstrap-vue-next/dist/BFormFloatingLabel.vue_vue_type_script_setup_true_lang-BMvhcrPS.mjs
var _hoisted_1$14 = ['id'];
var _sfc_main$19 = defineComponent({
  __name: 'BFormDatalist',
  props: {
    disabledField: { default: 'disabled' },
    id: { default: void 0 },
    options: { default: () => [] },
    textField: { default: 'text' },
    valueField: { default: 'value' },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormDatalist');
    const computedId = useId2(() => props.id, 'datalist');
    const { normalizedOptions, isComplex } = useFormSelect(
      () => props.options,
      computed(() => ({ ...props, optionsField: 'options', labelField: 'label' })),
    );
    const normalizedOptsWrapper = computed(() =>
      // Datalist doesn't support complex options
      normalizedOptions.value.filter(opt => !isComplex(opt)),
    );
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'datalist',
          { id: unref(computedId) },
          [
            renderSlot(_ctx.$slots, 'first'),
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(normalizedOptsWrapper.value, (option, index8) => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main25,
                    mergeProps(
                      {
                        key: index8,
                        ref_for: true,
                      },
                      option,
                    ),
                    {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, 'option', mergeProps({ ref_for: true }, option), () => [
                          createTextVNode(toDisplayString(option.text), 1),
                        ]),
                      ]),
                      _: 2,
                    },
                    1040,
                  )
                );
              }),
              128,
            )),
            renderSlot(_ctx.$slots, 'default'),
          ],
          8,
          _hoisted_1$14,
        )
      );
    };
  },
});
var _hoisted_113 = { class: 'form-floating' };
var _hoisted_27 = ['for'];
var _sfc_main26 = defineComponent({
  __name: 'BFormFloatingLabel',
  props: {
    label: { default: void 0 },
    labelFor: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormFloatingLabel');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', _hoisted_113, [
          renderSlot(_ctx.$slots, 'default'),
          createBaseVNode(
            'label',
            {
              for: unref(props).labelFor,
            },
            [renderSlot(_ctx.$slots, 'label', {}, () => [createTextVNode(toDisplayString(unref(props).label), 1)])],
            8,
            _hoisted_27,
          ),
        ])
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BFormValidFeedback.vue_vue_type_script_setup_true_lang-Bs-YFQyq.mjs
var _sfc_main$33 = defineComponent({
  __name: 'BFormInvalidFeedback',
  props: {
    ariaLive: { default: void 0 },
    forceShow: { type: Boolean, default: false },
    id: { default: void 0 },
    role: { default: void 0 },
    state: { type: [Boolean, null], default: null },
    tag: { default: 'div' },
    text: { default: void 0 },
    tooltip: { type: Boolean, default: false },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormInvalidFeedback');
    const computedShow = computed(() => props.forceShow === true || props.state === false);
    const computedClasses = computed(() => ({
      'd-block': computedShow.value,
      'invalid-feedback': !props.tooltip,
      'invalid-tooltip': props.tooltip,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            id: unref(props).id,
            role: unref(props).role,
            'aria-live': unref(props).ariaLive,
            'aria-atomic': unref(props).ariaLive ? true : void 0,
            class: normalizeClass(computedClasses.value),
          },
          {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
            ]),
            _: 3,
          },
          8,
          ['id', 'role', 'aria-live', 'aria-atomic', 'class'],
        )
      );
    };
  },
});
var _sfc_main$23 = defineComponent({
  __name: 'BFormRow',
  props: {
    tag: { default: 'div' },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormRow');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          { class: 'row d-flex flex-wrap' },
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
        )
      );
    };
  },
});
var _sfc_main$110 = defineComponent({
  __name: 'BFormText',
  props: {
    id: { default: void 0 },
    inline: { type: Boolean, default: false },
    tag: { default: 'small' },
    text: { default: void 0 },
    textVariant: { default: 'body-secondary' },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormText');
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed(() => [
      colorClasses.value,
      {
        'form-text': !props.inline,
      },
    ]);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            id: unref(props).id,
            class: normalizeClass(computedClasses.value),
          },
          {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
            ]),
            _: 3,
          },
          8,
          ['id', 'class'],
        )
      );
    };
  },
});
var _sfc_main27 = defineComponent({
  __name: 'BFormValidFeedback',
  props: {
    ariaLive: { default: void 0 },
    forceShow: { type: Boolean, default: false },
    id: { default: void 0 },
    role: { default: void 0 },
    state: { type: [Boolean, null], default: null },
    tag: { default: 'div' },
    text: { default: void 0 },
    tooltip: { type: Boolean, default: false },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormInvalidFeedback');
    const computedShow = computed(() => props.forceShow === true || props.state === true);
    const computedClasses = computed(() => ({
      'd-block': computedShow.value,
      'valid-feedback': !props.tooltip,
      'valid-tooltip': props.tooltip,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            id: unref(props).id,
            role: unref(props).role,
            'aria-live': unref(props).ariaLive,
            'aria-atomic': unref(props).ariaLive ? true : void 0,
            class: normalizeClass(computedClasses.value),
          },
          {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
            ]),
            _: 3,
          },
          8,
          ['id', 'role', 'aria-live', 'aria-atomic', 'class'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/useAriaInvalid-BTUbGj3Y.mjs
var useAriaInvalid = (ariaInvalid, state) =>
  computed(() => {
    const resolvedAriaInvalid = toValue(ariaInvalid);
    const resolvedState = toValue(state);
    const resolvedAriaInvalidValue =
      resolvedAriaInvalid === true
        ? 'true'
        : typeof resolvedAriaInvalid === 'string'
          ? resolvedAriaInvalid
          : resolvedState === false
            ? 'true'
            : resolvedAriaInvalid === false
              ? 'false'
              : void 0;
    return resolvedAriaInvalidValue;
  });

// node_modules/bootstrap-vue-next/dist/useStateClass-BGbSLWFN.mjs
var useStateClass = value =>
  computed(() => {
    const resolvedValue = toValue(value);
    return resolvedValue === true ? 'is-valid' : resolvedValue === false ? 'is-invalid' : null;
  });

// node_modules/bootstrap-vue-next/dist/useFormCheck-Bcx8Ea7M.mjs
var getClasses2 = items =>
  computed(() => {
    const resolvedItems = toValue(items);
    return {
      'form-check': resolvedItems.plain === false && resolvedItems.button === false && resolvedItems.hasDefaultSlot,
      'form-check-reverse': resolvedItems.reverse === true,
      'form-check-inline': resolvedItems.inline === true,
      'form-switch': resolvedItems.switch === true,
      [`form-control-${resolvedItems.size}`]:
        resolvedItems.size !== void 0 && resolvedItems.size !== 'md' && resolvedItems.button === false,
    };
  });
var getInputClasses = items => {
  const resolvedItems = readonly(toRef(items));
  const stateClass = useStateClass(() => resolvedItems.value.state ?? null);
  return computed(() => [
    stateClass.value,
    {
      'form-check-input': resolvedItems.value.plain === false && resolvedItems.value.button === false,
      'btn-check': resolvedItems.value.button === true,
    },
  ]);
};
var getLabelClasses = items =>
  computed(() => {
    const resolvedItems = toValue(items);
    return {
      'form-check-label': resolvedItems.plain === false && resolvedItems.button === false,
      btn: resolvedItems.button === true,
      [`btn-${resolvedItems.buttonVariant}`]:
        resolvedItems.button === true && resolvedItems.buttonVariant !== void 0 && resolvedItems.buttonVariant !== null,
      [`btn-${resolvedItems.size}`]: resolvedItems.button && resolvedItems.size && resolvedItems.size !== 'md',
    };
  });
var getGroupAttr = items => {
  const resolvedItems = readonly(toRef(items));
  const computedAriaInvalid = useAriaInvalid(
    () => resolvedItems.value.ariaInvalid,
    () => resolvedItems.value.state,
  );
  return computed(() => ({
    'aria-invalid': computedAriaInvalid.value,
    'aria-required': resolvedItems.value.required === true ? true : void 0,
  }));
};
var getGroupClasses = items =>
  computed(() => {
    const resolvedItems = toValue(items);
    return {
      'was-validated': resolvedItems.validated === true,
      'btn-group': resolvedItems.buttons === true && resolvedItems.stacked === false,
      'btn-group-vertical': resolvedItems.stacked === true && resolvedItems.buttons === true,
      [`btn-group-${resolvedItems.size}`]: resolvedItems.size !== void 0,
    };
  });

// node_modules/bootstrap-vue-next/dist/BFormCheckboxGroup.vue_vue_type_script_setup_true_lang-Do7WryrT.mjs
var _hoisted_1$15 = [
  'id',
  'disabled',
  'required',
  'name',
  'form',
  'aria-label',
  'aria-labelledby',
  'aria-required',
  'value',
  'true-value',
  'false-value',
  'indeterminate',
];
var _hoisted_28 = ['for'];
var _sfc_main$111 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BFormCheckbox',
  props: mergeModels(
    {
      ariaLabel: { default: void 0 },
      ariaLabelledby: { default: void 0 },
      autofocus: { type: Boolean, default: false },
      button: { type: Boolean, default: false },
      buttonGroup: { type: Boolean, default: false },
      buttonVariant: { default: null },
      disabled: { type: Boolean, default: false },
      form: { default: void 0 },
      id: { default: void 0 },
      inline: { type: Boolean, default: false },
      name: { default: void 0 },
      plain: { type: Boolean, default: false },
      required: { type: Boolean, default: void 0 },
      reverse: { type: Boolean, default: false },
      size: { default: void 0 },
      state: { type: [Boolean, null], default: null },
      switch: { type: Boolean, default: false },
      uncheckedValue: { type: [Array, Set, String, Boolean, Object, Number, null], default: false },
      wrapperAttrs: { default: void 0 },
      inputClass: { default: void 0 },
      value: { type: [String, Boolean, Array, Set, Object, Number, null], default: true },
    },
    {
      modelValue: {
        type: [Array, Set, String, Boolean, Object, Number, null],
        ...{
          default: void 0,
        },
      },
      modelModifiers: {},
      indeterminate: {
        type: Boolean,
        ...{
          default: false,
        },
      },
      indeterminateModifiers: {},
    },
  ),
  emits: ['update:modelValue', 'update:indeterminate'],
  setup(__props, { expose: __expose }) {
    const attrs = useAttrs();
    const processedAttrs = computed(() => {
      const { class: wrapperClass, ...inputAttrs } = attrs;
      return { wrapperClass, inputAttrs };
    });
    const _props = __props;
    const props = useDefaults(_props, 'BFormCheckbox');
    const slots = useSlots();
    const modelValue = useModel(__props, 'modelValue');
    const indeterminate = useModel(__props, 'indeterminate');
    const computedId = useId2(() => props.id, 'form-check');
    const parentData = inject(checkboxGroupKey, null);
    const input = useTemplateRef('_input');
    const { focused } = useFocus(input, {
      initialValue: props.autofocus,
    });
    const hasDefaultSlot = computed(() => !isEmptySlot(slots.default));
    const localValue = computed({
      get: () => (parentData ? parentData.modelValue.value : modelValue.value),
      set: newVal => {
        if (newVal === void 0) return;
        indeterminate.value = false;
        if (parentData !== null && Array.isArray(newVal)) {
          parentData.modelValue.value = newVal;
          return;
        }
        modelValue.value = newVal;
      },
    });
    const computedRequired = computed(
      () =>
        !!(props.name ?? (parentData == null ? void 0 : parentData.name.value)) &&
        (props.required || (parentData == null ? void 0 : parentData.required.value)),
    );
    const isButtonGroup = computed(() => props.buttonGroup || ((parentData == null ? void 0 : parentData.buttons.value) ?? false));
    const classesObject = computed(() => ({
      plain: props.plain || ((parentData == null ? void 0 : parentData.plain.value) ?? false),
      button: props.button || ((parentData == null ? void 0 : parentData.buttons.value) ?? false),
      inline: props.inline || ((parentData == null ? void 0 : parentData.inline.value) ?? false),
      reverse: props.reverse || ((parentData == null ? void 0 : parentData.reverse.value) ?? false),
      switch: props.switch || ((parentData == null ? void 0 : parentData.switch.value) ?? false),
      state: props.state === true || props.state === false ? props.state : ((parentData == null ? void 0 : parentData.state.value) ?? null),
      size: props.size ?? (parentData == null ? void 0 : parentData.size.value) ?? 'md',
      // This is where the true default is made
      buttonVariant: props.buttonVariant ?? (parentData == null ? void 0 : parentData.buttonVariant.value) ?? 'secondary',
      // This is where the true default is made
      hasDefaultSlot: hasDefaultSlot.value,
    }));
    const wrapperClasses = getClasses2(classesObject);
    const computedWrapperClasses = computed(() => [wrapperClasses.value, processedAttrs.value.wrapperClass]);
    const inputClasses = getInputClasses(classesObject);
    const computedInputClasses = computed(() => [inputClasses.value, props.inputClass]);
    const labelClasses = getLabelClasses(classesObject);
    __expose({
      blur: () => {
        focused.value = false;
      },
      element: input,
      focus: () => {
        focused.value = true;
      },
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main10,
          mergeProps({ skip: isButtonGroup.value }, unref(props).wrapperAttrs, { class: computedWrapperClasses.value }),
          {
            default: withCtx(() => {
              var _a, _b, _c;
              return [
                withDirectives(
                  createBaseVNode(
                    'input',
                    mergeProps(
                      {
                        id: unref(computedId),
                        ref: '_input',
                        'onUpdate:modelValue': _cache[0] || (_cache[0] = $event => (localValue.value = $event)),
                        class: computedInputClasses.value,
                        type: 'checkbox',
                        disabled: unref(props).disabled || ((_a = unref(parentData)) == null ? void 0 : _a.disabled.value),
                        required: computedRequired.value || void 0,
                        name: unref(props).name || ((_b = unref(parentData)) == null ? void 0 : _b.name.value),
                        form: unref(props).form || ((_c = unref(parentData)) == null ? void 0 : _c.form.value),
                        'aria-label': unref(props).ariaLabel,
                        'aria-labelledby': unref(props).ariaLabelledby,
                        'aria-required': computedRequired.value || void 0,
                        value: unref(props).value,
                        'true-value': unref(props).value,
                        'false-value': unref(props).uncheckedValue,
                        indeterminate: indeterminate.value || void 0,
                      },
                      processedAttrs.value.inputAttrs,
                    ),
                    null,
                    16,
                    _hoisted_1$15,
                  ),
                  [[vModelCheckbox, localValue.value]],
                ),
                hasDefaultSlot.value || unref(props).plain === false
                  ? (openBlock(),
                    createElementBlock(
                      'label',
                      {
                        key: 0,
                        for: unref(computedId),
                        class: normalizeClass(unref(labelClasses)),
                      },
                      [renderSlot(_ctx.$slots, 'default')],
                      10,
                      _hoisted_28,
                    ))
                  : createCommentVNode('', true),
              ];
            }),
            _: 3,
          },
          16,
          ['skip', 'class'],
        )
      );
    };
  },
});
var _hoisted_114 = ['id'];
var _sfc_main28 = defineComponent({
  __name: 'BFormCheckboxGroup',
  props: mergeModels(
    {
      ariaInvalid: { type: [Boolean, String], default: void 0 },
      autofocus: { type: Boolean, default: false },
      buttonVariant: { default: 'secondary' },
      buttons: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      disabledField: { default: 'disabled' },
      form: { default: void 0 },
      id: { default: void 0 },
      name: { default: void 0 },
      options: { default: () => [] },
      plain: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      reverse: { type: Boolean, default: false },
      size: { default: 'md' },
      stacked: { type: Boolean, default: false },
      state: { type: [Boolean, null], default: null },
      switches: { type: Boolean, default: false },
      textField: { default: 'text' },
      validated: { type: Boolean, default: false },
      valueField: { default: 'value' },
    },
    {
      modelValue: {
        default: () => [],
      },
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormCheckboxGroup');
    const modelValue = useModel(__props, 'modelValue');
    const computedId = useId2(() => props.id, 'checkbox');
    const computedName = useId2(() => props.name, 'checkbox');
    const element = useTemplateRef('_element');
    const { focused } = useFocus(element, {
      initialValue: props.autofocus,
    });
    provide(checkboxGroupKey, {
      modelValue,
      switch: toRef(() => props.switches),
      buttonVariant: toRef(() => props.buttonVariant),
      form: toRef(() => props.form),
      name: computedName,
      state: toRef(() => props.state),
      plain: toRef(() => props.plain),
      size: toRef(() => props.size),
      inline: toRef(() => !props.stacked),
      reverse: toRef(() => props.reverse),
      required: toRef(() => props.required),
      buttons: toRef(() => props.buttons),
      disabled: toRef(() => props.disabled),
    });
    const normalizeOptions = computed(() =>
      props.options.map(el =>
        typeof el === 'string' || typeof el === 'number'
          ? {
              value: el,
              disabled: props.disabled,
              text: el.toString(),
            }
          : {
              value: el[props.valueField],
              disabled: el[props.disabledField],
              ...(el.props ? el.props : void 0),
              text: el[props.textField],
            },
      ),
    );
    const classesObject = computed(() => ({
      required: props.required,
      ariaInvalid: props.ariaInvalid,
      state: props.state,
      validated: props.validated,
      buttons: props.buttons,
      stacked: props.stacked,
      size: props.size,
    }));
    const computedAttrs = getGroupAttr(classesObject);
    const computedClasses = getGroupClasses(classesObject);
    __expose({
      blur: () => {
        focused.value = false;
      },
      focus: () => {
        focused.value = true;
      },
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          mergeProps(unref(computedAttrs), {
            id: unref(computedId),
            ref: '_element',
            role: 'group',
            class: [unref(computedClasses), 'bv-no-focus-ring'],
            tabindex: '-1',
          }),
          [
            renderSlot(_ctx.$slots, 'first'),
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(normalizeOptions.value, (item, index8) => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main$111,
                    mergeProps(
                      {
                        key: index8,
                        ref_for: true,
                      },
                      item,
                    ),
                    {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, 'option', mergeProps({ ref_for: true }, item), () => [
                          createTextVNode(toDisplayString(item.text), 1),
                        ]),
                      ]),
                      _: 2,
                    },
                    1040,
                  )
                );
              }),
              128,
            )),
            renderSlot(_ctx.$slots, 'default'),
          ],
          16,
          _hoisted_114,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BFormFile.vue_vue_type_script_setup_true_lang-BfwrNM0g.mjs
var _hoisted_115 = ['for'];
var _hoisted_29 = [
  'id',
  'form',
  'name',
  'multiple',
  'disabled',
  'capture',
  'accept',
  'required',
  'aria-label',
  'aria-labelledby',
  'aria-required',
  'directory',
  'webkitdirectory',
];
var _sfc_main29 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BFormFile',
  props: mergeModels(
    {
      ariaLabel: { default: void 0 },
      ariaLabelledby: { default: void 0 },
      accept: { default: '' },
      autofocus: { type: Boolean, default: false },
      capture: { type: [Boolean, String], default: void 0 },
      directory: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      form: { default: void 0 },
      id: { default: void 0 },
      label: { default: '' },
      labelClass: { default: void 0 },
      multiple: { type: Boolean, default: false },
      name: { default: void 0 },
      noButton: { type: Boolean, default: false },
      noDrop: { type: Boolean, default: false },
      noTraverse: { type: Boolean, default: false },
      plain: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      size: { default: void 0 },
      state: { type: [Boolean, null], default: null },
    },
    {
      modelValue: {
        default: null,
      },
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props, { expose: __expose }) {
    const slots = useSlots();
    const _props = __props;
    const props = useDefaults(_props, 'BFormFile');
    const modelValue = useModel(__props, 'modelValue');
    const computedId = useId2(() => props.id);
    const stateClass = useStateClass(() => props.state);
    const input = useTemplateRef('_input');
    const { focused } = useFocus(input, { initialValue: props.autofocus });
    const hasLabelSlot = computed(() => !isEmptySlot(slots['label']));
    const computedAccept = computed(() => (typeof props.accept === 'string' ? props.accept : props.accept.join(',')));
    const computedClasses = computed(() => [
      stateClass.value,
      {
        [`form-control-${props.size}`]: props.size !== void 0,
        'form-control': !props.plain,
        'form-control-input-file-hide-button': props.noButton,
      },
    ]);
    const onChange = () => {
      var _a, _b;
      const value =
        ((_a = input.value) == null ? void 0 : _a.files) === null || ((_b = input.value) == null ? void 0 : _b.files) === void 0
          ? null
          : [...input.value.files];
      modelValue.value = value === null ? null : props.multiple === true ? value : value[0];
    };
    const onDrop = e => {
      if (props.noDrop === true) {
        e.preventDefault();
      }
    };
    const reset = () => {
      modelValue.value = null;
    };
    watch(modelValue, newValue => {
      if (newValue === null && input.value !== null) {
        input.value.value = '';
      }
    });
    __expose({
      blur: () => {
        focused.value = false;
      },
      element: input,
      focus: () => {
        focused.value = true;
      },
      reset,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            hasLabelSlot.value || unref(props).label
              ? (openBlock(),
                createElementBlock(
                  'label',
                  {
                    key: 0,
                    class: normalizeClass(['form-label', unref(props).labelClass]),
                    for: unref(computedId),
                  },
                  [renderSlot(_ctx.$slots, 'label', {}, () => [createTextVNode(toDisplayString(unref(props).label), 1)])],
                  10,
                  _hoisted_115,
                ))
              : createCommentVNode('', true),
            createBaseVNode(
              'input',
              mergeProps({ id: unref(computedId) }, _ctx.$attrs, {
                ref: '_input',
                type: 'file',
                class: computedClasses.value,
                form: unref(props).form,
                name: unref(props).name,
                multiple: unref(props).multiple,
                disabled: unref(props).disabled,
                capture: unref(props).capture,
                accept: computedAccept.value || void 0,
                required: unref(props).required || void 0,
                'aria-label': unref(props).ariaLabel,
                'aria-labelledby': unref(props).ariaLabelledby,
                'aria-required': unref(props).required || void 0,
                directory: unref(props).directory,
                webkitdirectory: unref(props).directory,
                onChange,
                onDrop,
              }),
              null,
              16,
              _hoisted_29,
            ),
          ],
          64,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BFormGroup.vue_vue_type_script_setup_true_lang-4-YcPJAc.mjs
var suffixPropName = (suffix, value) => value + (suffix ? upperFirst(suffix) : '');
var _hoisted_116 = {
  key: 0,
  ref: '_content',
  class: 'form-floating',
};
var _sfc_main30 = defineComponent({
  __name: 'BFormGroup',
  props: {
    contentCols: { type: [Boolean, String, Number], default: void 0 },
    labelCols: { type: [Boolean, String, Number], default: void 0 },
    labelAlign: { default: void 0 },
    ariaInvalid: { type: [Boolean, String], default: void 0 },
    description: { default: void 0 },
    disabled: { type: Boolean, default: false },
    feedbackAriaLive: { default: 'assertive' },
    floating: { type: Boolean, default: false },
    id: { default: void 0 },
    invalidFeedback: { default: void 0 },
    label: { default: void 0 },
    labelClass: { default: void 0 },
    labelFor: { default: void 0 },
    labelSize: { default: void 0 },
    labelVisuallyHidden: { type: Boolean, default: false },
    state: { type: [Boolean, null], default: null },
    tooltip: { type: Boolean, default: false },
    validFeedback: { default: void 0 },
    validated: { type: Boolean, default: false },
    contentColsSm: { type: [Boolean, String, Number], default: void 0 },
    contentColsMd: { type: [Boolean, String, Number], default: void 0 },
    contentColsLg: { type: [Boolean, String, Number], default: void 0 },
    contentColsXl: { type: [Boolean, String, Number], default: void 0 },
    labelColsSm: { type: [Boolean, String, Number], default: void 0 },
    labelColsMd: { type: [Boolean, String, Number], default: void 0 },
    labelColsLg: { type: [Boolean, String, Number], default: void 0 },
    labelColsXl: { type: [Boolean, String, Number], default: void 0 },
    labelAlignSm: { default: void 0 },
    labelAlignMd: { default: void 0 },
    labelAlignLg: { default: void 0 },
    labelAlignXl: { default: void 0 },
  },
  setup(__props) {
    const INPUTS = ['input', 'select', 'textarea'];
    const _props = __props;
    const props = useDefaults(_props, 'BFormGroup');
    const slots = useSlots();
    const LabelContentTemplate = createReusableTemplate();
    const ContentTemplate = createReusableTemplate();
    const computedState = toRef(() => props.state);
    const childId = ref([]);
    provide(formGroupPluginKey, id => {
      childId.value = [id];
      return {
        state: computedState,
      };
    });
    const computedLabelFor = computed(() => {
      if (props.labelFor !== void 0) return props.labelFor;
      if (childId.value[0] && childId.value[0].value) return childId.value[0].value;
      return null;
    });
    const breakPoints = ['xs', 'sm', 'md', 'lg', 'xl'];
    const getColProps = (props2, prefix) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      breakPoints.reduce((result, breakpoint) => {
        const suffix = suffixPropName(breakpoint === 'xs' ? '' : breakpoint, `${prefix}Cols`);
        let propValue = props2[suffix];
        propValue = propValue === '' ? true : propValue || false;
        if (!(typeof propValue === 'boolean') && propValue !== 'auto') {
          const val = Number.parseInt(propValue);
          propValue = Number.isNaN(val) ? 0 : val;
          propValue = propValue > 0 ? propValue : false;
        }
        if (propValue) {
          if (breakpoint === 'xs') {
            result[typeof propValue === 'boolean' ? 'col' : 'cols'] = propValue;
          } else {
            result[breakpoint || (typeof propValue === 'boolean' ? 'col' : 'cols')] = propValue;
          }
        }
        return result;
      }, {});
    const content = useTemplateRef('_content');
    const contentColProps = computed(() => getColProps(props, 'content'));
    const labelAlignClasses = computed(() =>
      ((props2, prefix) =>
        breakPoints.reduce((result, breakpoint) => {
          const suffix = suffixPropName(breakpoint === 'xs' ? '' : breakpoint, `${prefix}Align`);
          const propValue = props2[suffix] || null;
          if (propValue) {
            if (breakpoint === 'xs') {
              result.push(`text-${propValue}`);
            } else {
              result.push(`text-${breakpoint}-${propValue}`);
            }
          }
          return result;
        }, []))(props, 'label'),
    );
    const labelColProps = computed(() => getColProps(props, 'label'));
    const isHorizontal = computed(() => Object.keys(contentColProps.value).length > 0 || Object.keys(labelColProps.value).length > 0);
    const stateClass = useStateClass(computedState);
    const computedAriaInvalid = useAriaInvalid(() => props.ariaInvalid, computedState);
    const onLegendClick = event => {
      if (computedLabelFor.value || content.value === null) return;
      const { target } = event;
      const tagName = target ? target.tagName : '';
      if ([...INPUTS, 'a', 'button', 'label'].indexOf(tagName) !== -1) return;
      const inputs = [...content.value.querySelectorAll(INPUTS.map(v => `${v}:not([disabled])`).join())].filter(isVisible);
      const [inp] = inputs;
      if (inputs.length === 1 && inp instanceof HTMLElement) {
        attemptFocus(inp);
      }
    };
    const computedId = useId2(() => props.id);
    const labelId = useId2(void 0, '_BV_label_');
    const labelTag = computed(() => (!computedLabelFor.value ? 'legend' : 'label'));
    const labelClasses = computed(() => [
      isHorizontal.value ? 'col-form-label' : 'form-label',
      {
        'bv-no-focus-ring': !computedLabelFor.value,
        'col-form-label': isHorizontal.value || !computedLabelFor.value,
        'pt-0': !isHorizontal.value && !computedLabelFor.value,
        'd-block': !isHorizontal.value && computedLabelFor.value,
        [`col-form-label-${props.labelSize}`]: !!props.labelSize,
        'visually-hidden': props.labelVisuallyHidden,
      },
      labelAlignClasses.value,
      props.labelClass,
    ]);
    const invalidFeedbackId = useId2(void 0, '_BV_feedback_invalid_');
    const validFeedbackId = useId2(void 0, '_BV_feedback_valid_');
    const descriptionId = useId2(void 0, '_BV_description_');
    const isFieldset = computed(() => !computedLabelFor.value);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(isFieldset.value ? 'fieldset' : 'div'),
          {
            id: unref(computedId),
            disabled: isFieldset.value ? unref(props).disabled : null,
            role: isFieldset.value ? null : 'group',
            'aria-invalid': unref(computedAriaInvalid),
            'aria-labelledby': isFieldset.value && isHorizontal.value ? unref(labelId) : null,
            class: normalizeClass([[unref(stateClass), { 'was-validated': unref(props).validated }], 'b-form-group']),
          },
          {
            default: withCtx(() => [
              createVNode(unref(ContentTemplate).define, null, {
                default: withCtx(() => [
                  slots['invalid-feedback'] || unref(props).invalidFeedback
                    ? (openBlock(),
                      createBlock(
                        _sfc_main$33,
                        {
                          key: 0,
                          id: unref(invalidFeedbackId),
                          'aria-live': unref(props).feedbackAriaLive,
                          state: computedState.value,
                          tooltip: unref(props).tooltip,
                        },
                        {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, 'invalid-feedback', {}, () => [
                              createTextVNode(toDisplayString(unref(props).invalidFeedback), 1),
                            ]),
                          ]),
                          _: 3,
                        },
                        8,
                        ['id', 'aria-live', 'state', 'tooltip'],
                      ))
                    : createCommentVNode('', true),
                  slots['valid-feedback'] || unref(props).validFeedback
                    ? (openBlock(),
                      createBlock(
                        _sfc_main27,
                        {
                          key: 1,
                          id: unref(validFeedbackId),
                          'aria-live': unref(props).feedbackAriaLive,
                          state: computedState.value,
                          tooltip: unref(props).tooltip,
                        },
                        {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, 'valid-feedback', {}, () => [
                              createTextVNode(toDisplayString(unref(props).validFeedback), 1),
                            ]),
                          ]),
                          _: 3,
                        },
                        8,
                        ['id', 'aria-live', 'state', 'tooltip'],
                      ))
                    : createCommentVNode('', true),
                  slots.description || unref(props).description
                    ? (openBlock(),
                      createBlock(
                        _sfc_main$110,
                        {
                          key: 2,
                          id: unref(descriptionId),
                        },
                        {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, 'description', {}, () => [
                              createTextVNode(toDisplayString(unref(props).description), 1),
                            ]),
                          ]),
                          _: 3,
                        },
                        8,
                        ['id'],
                      ))
                    : createCommentVNode('', true),
                ]),
                _: 3,
              }),
              createVNode(unref(LabelContentTemplate).define, null, {
                default: withCtx(() => [
                  slots.label || unref(props).label || isHorizontal.value
                    ? (openBlock(),
                      createElementBlock(
                        Fragment,
                        { key: 0 },
                        [
                          isHorizontal.value
                            ? (openBlock(),
                              createBlock(
                                _sfc_main19,
                                normalizeProps(mergeProps({ key: 0 }, labelColProps.value)),
                                {
                                  default: withCtx(() => [
                                    (openBlock(),
                                    createBlock(
                                      resolveDynamicComponent(labelTag.value),
                                      {
                                        id: unref(labelId),
                                        for: computedLabelFor.value || null,
                                        tabindex: isFieldset.value ? '-1' : null,
                                        class: normalizeClass(labelClasses.value),
                                        onClick: _cache[0] || (_cache[0] = $event => (isFieldset.value ? onLegendClick : null)),
                                      },
                                      {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, 'label', {}, () => [
                                            createTextVNode(toDisplayString(unref(props).label), 1),
                                          ]),
                                        ]),
                                        _: 3,
                                      },
                                      8,
                                      ['id', 'for', 'tabindex', 'class'],
                                    )),
                                  ]),
                                  _: 3,
                                },
                                16,
                              ))
                            : (openBlock(),
                              createBlock(
                                resolveDynamicComponent(labelTag.value),
                                {
                                  key: 1,
                                  id: unref(labelId),
                                  for: computedLabelFor.value || null,
                                  tabindex: isFieldset.value ? '-1' : null,
                                  class: normalizeClass(labelClasses.value),
                                  onClick: _cache[1] || (_cache[1] = $event => (isFieldset.value ? onLegendClick : null)),
                                },
                                {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, 'label', {}, () => [createTextVNode(toDisplayString(unref(props).label), 1)]),
                                  ]),
                                  _: 3,
                                },
                                8,
                                ['id', 'for', 'tabindex', 'class'],
                              )),
                        ],
                        64,
                      ))
                    : createCommentVNode('', true),
                ]),
                _: 3,
              }),
              isHorizontal.value
                ? (openBlock(),
                  createBlock(
                    _sfc_main$23,
                    { key: 0 },
                    {
                      default: withCtx(() => [
                        createVNode(unref(LabelContentTemplate).reuse),
                        createVNode(
                          _sfc_main19,
                          mergeProps(contentColProps.value, { ref: '_content' }),
                          {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, 'default', {
                                id: unref(computedId),
                                ariaDescribedby: null,
                                descriptionId: unref(descriptionId),
                                labelId: unref(labelId),
                              }),
                              createVNode(unref(ContentTemplate).reuse),
                            ]),
                            _: 3,
                          },
                          16,
                        ),
                      ]),
                      _: 3,
                    },
                  ))
                : (openBlock(),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    [
                      unref(props).floating && !isHorizontal.value
                        ? (openBlock(),
                          createElementBlock(
                            'div',
                            _hoisted_116,
                            [
                              renderSlot(_ctx.$slots, 'default', {
                                id: unref(computedId),
                                ariaDescribedby: null,
                                descriptionId: unref(descriptionId),
                                labelId: unref(labelId),
                              }),
                              createVNode(unref(LabelContentTemplate).reuse),
                              createVNode(unref(ContentTemplate).reuse),
                            ],
                            512,
                          ))
                        : (openBlock(),
                          createElementBlock(
                            Fragment,
                            { key: 1 },
                            [
                              createVNode(unref(LabelContentTemplate).reuse),
                              renderSlot(_ctx.$slots, 'default', {
                                id: unref(computedId),
                                ariaDescribedby: null,
                                descriptionId: unref(descriptionId),
                                labelId: unref(labelId),
                              }),
                              createVNode(unref(ContentTemplate).reuse),
                            ],
                            64,
                          )),
                    ],
                    64,
                  )),
            ]),
            _: 3,
          },
          8,
          ['id', 'disabled', 'role', 'aria-invalid', 'aria-labelledby', 'class'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/useFormInput-UKFmd5Ke.mjs
var normalizeInput = (v, modelModifiers) => {
  if (v === null) return;
  let update = v;
  if (modelModifiers.number && typeof update === 'string' && update !== '') {
    const parsed = Number.parseFloat(update);
    update = Number.isNaN(parsed) ? update : parsed;
  }
  return update;
};
var useFormInput = (props, input, modelValue, modelModifiers) => {
  var _a;
  const forceUpdateKey = ref(0);
  const computedId = useId2(() => props.id, 'input');
  const debounceNumber = useToNumber(() => props.debounce ?? 0);
  const debounceMaxWaitNumber = useToNumber(() => props.debounceMaxWait ?? NaN);
  const formGroupData = (_a = inject(formGroupPluginKey, null)) == null ? void 0 : _a(computedId);
  const computedState = computed(() =>
    props.state !== void 0 ? props.state : ((formGroupData == null ? void 0 : formGroupData.state.value) ?? null),
  );
  const computedAriaInvalid = useAriaInvalid(() => props.ariaInvalid, computedState);
  const stateClass = useStateClass(computedState);
  const internalUpdateModelValue = useDebounceFn(
    value => {
      modelValue.value = value;
    },
    () => (modelModifiers.lazy === true ? 0 : debounceNumber.value),
    { maxWait: () => (modelModifiers.lazy === true ? NaN : debounceMaxWaitNumber.value) },
  );
  const updateModelValue = (value, force = false) => {
    if (modelModifiers.lazy === true && force === false) return;
    internalUpdateModelValue(value);
  };
  const { focused } = useFocus(input, {
    initialValue: props.autofocus,
  });
  const _formatValue = (value, evt, force = false) => {
    if (props.formatter !== void 0 && (!props.lazyFormatter || force)) {
      return props.formatter(value, evt);
    }
    return value;
  };
  onMounted(() => {
    var _a2;
    if (input.value) {
      input.value.value = ((_a2 = modelValue.value) == null ? void 0 : _a2.toString()) ?? '';
    }
  });
  onActivated(() => {
    nextTick(() => {
      if (props.autofocus) {
        focused.value = true;
      }
    });
  });
  const onInput = evt => {
    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt);
    if (evt.defaultPrevented) {
      evt.preventDefault();
      return;
    }
    const nextModel = formattedValue;
    updateModelValue(nextModel);
  };
  const onChange = evt => {
    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt);
    if (evt.defaultPrevented) {
      evt.preventDefault();
      return;
    }
    const nextModel = formattedValue;
    if (modelValue.value !== nextModel) {
      updateModelValue(formattedValue, true);
    }
  };
  const onBlur = evt => {
    if (!modelModifiers.lazy && !props.lazyFormatter && !modelModifiers.trim) return;
    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt, true);
    const nextModel = modelModifiers.trim ? formattedValue.trim() : formattedValue;
    const needsForceUpdate = nextModel.length !== formattedValue.length;
    if (modelValue.value !== nextModel) {
      updateModelValue(formattedValue, true);
    }
    if (modelModifiers.trim && needsForceUpdate) {
      forceUpdateKey.value = forceUpdateKey.value + 1;
    }
  };
  const focus = () => {
    if (!props.disabled) {
      focused.value = true;
    }
  };
  const blur = () => {
    if (!props.disabled) {
      focused.value = false;
    }
  };
  return {
    input,
    computedId,
    computedAriaInvalid,
    onInput,
    onChange,
    onBlur,
    focus,
    blur,
    forceUpdateKey,
    stateClass,
  };
};

// node_modules/bootstrap-vue-next/dist/BFormInput.vue_vue_type_script_setup_true_lang-KuNFoABp.mjs
var _hoisted_117 = [
  'id',
  'value',
  'name',
  'form',
  'type',
  'disabled',
  'placeholder',
  'required',
  'autocomplete',
  'readonly',
  'min',
  'max',
  'step',
  'list',
  'aria-required',
  'aria-invalid',
];
var _sfc_main31 = defineComponent({
  __name: 'BFormInput',
  props: mergeModels(
    {
      max: { default: void 0 },
      min: { default: void 0 },
      step: { default: void 0 },
      type: { default: 'text' },
      ariaInvalid: { type: [Boolean, String], default: void 0 },
      autocomplete: { default: void 0 },
      autofocus: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      form: { default: void 0 },
      formatter: { type: Function, default: void 0 },
      id: { default: void 0 },
      lazyFormatter: { type: Boolean, default: false },
      list: { default: void 0 },
      name: { default: void 0 },
      placeholder: { default: void 0 },
      plaintext: { type: Boolean, default: false },
      readonly: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      size: { default: void 0 },
      state: { type: [Boolean, null], default: void 0 },
      debounce: { default: 0 },
      debounceMaxWait: { default: NaN },
    },
    {
      modelValue: {
        default: '',
      },
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormInput');
    const [modelValue, modelModifiers] = useModel(__props, 'modelValue', {
      set: v => normalizeInput(v, modelModifiers),
    });
    const input = useTemplateRef('_input');
    const { computedId, computedAriaInvalid, onInput, onChange, onBlur, stateClass, focus, blur, forceUpdateKey } = useFormInput(
      props,
      input,
      modelValue,
      modelModifiers,
    );
    const computedClasses = computed(() => {
      const isRange = props.type === 'range';
      const isColor = props.type === 'color';
      return [
        stateClass.value,
        {
          'form-range': isRange,
          'form-control': isColor || (!props.plaintext && !isRange),
          'form-control-color': isColor,
          'form-control-plaintext': props.plaintext && !isRange && !isColor,
          [`form-control-${props.size}`]: !!props.size,
        },
      ];
    });
    __expose({
      blur,
      element: input,
      focus,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'input',
          {
            id: unref(computedId),
            ref: '_input',
            key: unref(forceUpdateKey),
            value: unref(modelValue),
            class: normalizeClass(computedClasses.value),
            name: unref(props).name || void 0,
            form: unref(props).form || void 0,
            type: unref(props).type,
            disabled: unref(props).disabled,
            placeholder: unref(props).placeholder,
            required: unref(props).required || void 0,
            autocomplete: unref(props).autocomplete || void 0,
            readonly: unref(props).readonly || unref(props).plaintext,
            min: unref(props).min,
            max: unref(props).max,
            step: unref(props).step,
            list: unref(props).type !== 'password' ? unref(props).list : void 0,
            'aria-required': unref(props).required || void 0,
            'aria-invalid': unref(computedAriaInvalid),
            onInput:
              _cache[0] ||
              (_cache[0] = //@ts-ignore
                (...args) => unref(onInput) && unref(onInput)(...args)),
            onChange:
              _cache[1] ||
              (_cache[1] = //@ts-ignore
                (...args) => unref(onChange) && unref(onChange)(...args)),
            onBlur:
              _cache[2] ||
              (_cache[2] = //@ts-ignore
                (...args) => unref(onBlur) && unref(onBlur)(...args)),
          },
          null,
          42,
          _hoisted_117,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BFormRadioGroup.vue_vue_type_script_setup_true_lang--UYbn-2B.mjs
var _hoisted_1$16 = ['id', 'disabled', 'required', 'name', 'form', 'aria-label', 'aria-labelledby', 'value', 'aria-required'];
var _hoisted_210 = ['for'];
var _sfc_main$112 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BFormRadio',
  props: mergeModels(
    {
      ariaLabel: { default: void 0 },
      ariaLabelledby: { default: void 0 },
      autofocus: { type: Boolean, default: false },
      button: { type: Boolean, default: false },
      buttonGroup: { type: Boolean, default: false },
      buttonVariant: { default: null },
      disabled: { type: Boolean, default: false },
      form: { default: void 0 },
      id: { default: void 0 },
      inline: { type: Boolean, default: false },
      name: { default: void 0 },
      plain: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      reverse: { type: Boolean, default: false },
      size: { default: void 0 },
      state: { type: [Boolean, null], default: null },
      value: { type: [Boolean, String, Array, Object, Number, null], default: true },
    },
    {
      modelValue: {
        type: [Boolean, String, Array, Object, Number, null],
        ...{
          default: void 0,
        },
      },
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormRadio');
    const slots = useSlots();
    const modelValue = useModel(__props, 'modelValue');
    const computedId = useId2(() => props.id, 'form-check');
    const parentData = inject(radioGroupKey, null);
    const input = useTemplateRef('_input');
    const { focused } = useFocus(input, {
      initialValue: props.autofocus,
    });
    const hasDefaultSlot = computed(() => !isEmptySlot(slots.default));
    const localValue = computed({
      get: () => (parentData ? parentData.modelValue.value : modelValue.value),
      set: newValue => {
        if (newValue === void 0) return;
        if (parentData !== null) {
          parentData.modelValue.value = newValue;
          return;
        }
        modelValue.value = newValue;
      },
    });
    const computedRequired = computed(
      () =>
        !!(props.name ?? (parentData == null ? void 0 : parentData.name.value)) &&
        (props.required || (parentData == null ? void 0 : parentData.required.value)),
    );
    const isButtonGroup = computed(() => props.buttonGroup || ((parentData == null ? void 0 : parentData.buttons.value) ?? false));
    const classesObject = computed(() => ({
      plain: props.plain || ((parentData == null ? void 0 : parentData.plain.value) ?? false),
      button: props.button || ((parentData == null ? void 0 : parentData.buttons.value) ?? false),
      inline: props.inline || ((parentData == null ? void 0 : parentData.inline.value) ?? false),
      state: props.state || (parentData == null ? void 0 : parentData.state.value),
      reverse: props.reverse || ((parentData == null ? void 0 : parentData.reverse.value) ?? false),
      size: props.size ?? (parentData == null ? void 0 : parentData.size.value) ?? 'md',
      // This is where the true default is made
      buttonVariant: props.buttonVariant ?? (parentData == null ? void 0 : parentData.buttonVariant.value) ?? 'secondary',
      // This is where the true default is made
      hasDefaultSlot: hasDefaultSlot.value,
    }));
    const computedClasses = getClasses2(classesObject);
    const inputClasses = getInputClasses(classesObject);
    const labelClasses = getLabelClasses(classesObject);
    __expose({
      blur: () => {
        focused.value = false;
      },
      element: input,
      focus: () => {
        focused.value = true;
      },
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main10,
          {
            skip: isButtonGroup.value,
            class: normalizeClass(unref(computedClasses)),
          },
          {
            default: withCtx(() => {
              var _a, _b, _c;
              return [
                withDirectives(
                  createBaseVNode(
                    'input',
                    mergeProps({ id: unref(computedId) }, _ctx.$attrs, {
                      ref: '_input',
                      'onUpdate:modelValue': _cache[0] || (_cache[0] = $event => (localValue.value = $event)),
                      class: unref(inputClasses),
                      type: 'radio',
                      disabled: unref(props).disabled || ((_a = unref(parentData)) == null ? void 0 : _a.disabled.value),
                      required: computedRequired.value || void 0,
                      name: unref(props).name || ((_b = unref(parentData)) == null ? void 0 : _b.name.value),
                      form: unref(props).form || ((_c = unref(parentData)) == null ? void 0 : _c.form.value),
                      'aria-label': unref(props).ariaLabel,
                      'aria-labelledby': unref(props).ariaLabelledby,
                      value: unref(props).value,
                      'aria-required': computedRequired.value || void 0,
                    }),
                    null,
                    16,
                    _hoisted_1$16,
                  ),
                  [[vModelRadio, localValue.value]],
                ),
                hasDefaultSlot.value || unref(props).plain === false
                  ? (openBlock(),
                    createElementBlock(
                      'label',
                      {
                        key: 0,
                        for: unref(computedId),
                        class: normalizeClass(unref(labelClasses)),
                      },
                      [renderSlot(_ctx.$slots, 'default')],
                      10,
                      _hoisted_210,
                    ))
                  : createCommentVNode('', true),
              ];
            }),
            _: 3,
          },
          8,
          ['skip', 'class'],
        )
      );
    };
  },
});
var _hoisted_118 = ['id'];
var _sfc_main32 = defineComponent({
  __name: 'BFormRadioGroup',
  props: mergeModels(
    {
      ariaInvalid: { type: [Boolean, String], default: void 0 },
      autofocus: { type: Boolean, default: false },
      buttonVariant: { default: 'secondary' },
      buttons: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      disabledField: { default: 'disabled' },
      form: { default: void 0 },
      id: { default: void 0 },
      name: { default: void 0 },
      options: { default: () => [] },
      plain: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      reverse: { type: Boolean, default: false },
      size: { default: 'md' },
      stacked: { type: Boolean, default: false },
      state: { type: [Boolean, null], default: null },
      textField: { default: 'text' },
      validated: { type: Boolean, default: false },
      valueField: { default: 'value' },
    },
    {
      modelValue: {
        default: null,
      },
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormRadioGroup');
    const modelValue = useModel(__props, 'modelValue');
    const computedId = useId2(() => props.id, 'radio');
    const computedName = useId2(() => props.name, 'checkbox');
    const element = useTemplateRef('_element');
    const { focused } = useFocus(element, {
      initialValue: props.autofocus,
    });
    provide(radioGroupKey, {
      modelValue,
      buttonVariant: toRef(() => props.buttonVariant),
      form: toRef(() => props.form),
      name: computedName,
      buttons: toRef(() => props.buttons),
      state: toRef(() => props.state),
      plain: toRef(() => props.plain),
      size: toRef(() => props.size),
      inline: toRef(() => !props.stacked),
      reverse: toRef(() => props.reverse),
      required: toRef(() => props.required),
      disabled: toRef(() => props.disabled),
    });
    const normalizeOptions = computed(() =>
      props.options.map(el =>
        typeof el === 'string' || typeof el === 'number'
          ? {
              value: el,
              disabled: props.disabled,
              text: el.toString(),
            }
          : {
              value: el[props.valueField],
              disabled: el[props.disabledField],
              ...(el.props ? el.props : void 0),
              text: el[props.textField],
            },
      ),
    );
    const classesObject = computed(() => ({
      required: props.required,
      ariaInvalid: props.ariaInvalid,
      state: props.state,
      validated: props.validated,
      buttons: props.buttons,
      stacked: props.stacked,
      size: props.size,
    }));
    const computedAttrs = getGroupAttr(classesObject);
    const computedClasses = getGroupClasses(classesObject);
    __expose({
      blur: () => {
        focused.value = false;
      },
      focus: () => {
        focused.value = true;
      },
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          mergeProps(unref(computedAttrs), {
            id: unref(computedId),
            ref: '_element',
            role: 'radiogroup',
            class: [unref(computedClasses), 'bv-no-focus-ring'],
            tabindex: '-1',
          }),
          [
            renderSlot(_ctx.$slots, 'first'),
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(normalizeOptions.value, (item, index8) => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main$112,
                    mergeProps(
                      {
                        key: index8,
                        ref_for: true,
                      },
                      item,
                    ),
                    {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, 'option', mergeProps({ ref_for: true }, item), () => [
                          createTextVNode(toDisplayString(item.text), 1),
                        ]),
                      ]),
                      _: 2,
                    },
                    1040,
                  )
                );
              }),
              128,
            )),
            renderSlot(_ctx.$slots, 'default'),
          ],
          16,
          _hoisted_118,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BFormSelect.vue_vue_type_script_setup_true_lang-BigptVap.mjs
var _hoisted_1$17 = ['label'];
var _sfc_main$113 = defineComponent({
  __name: 'BFormSelectOptionGroup',
  props: {
    disabledField: { default: 'disabled' },
    label: { default: void 0 },
    options: { default: () => [] },
    textField: { default: 'text' },
    valueField: { default: 'value' },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormSelectOptionGroup');
    const { normalizedOptions } = useFormSelect(() => props.options, props);
    const normalizedOptsWrapper = computed(() => normalizedOptions.value);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'optgroup',
          {
            label: unref(props).label,
          },
          [
            renderSlot(_ctx.$slots, 'first'),
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(normalizedOptsWrapper.value, (option, index8) => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main25,
                    mergeProps(
                      {
                        key: index8,
                        disabled: option.disabled,
                        value: option.value,
                        ref_for: true,
                      },
                      _ctx.$attrs,
                    ),
                    {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, 'option', mergeProps({ ref_for: true }, option), () => [
                          createTextVNode(toDisplayString(option.text), 1),
                        ]),
                      ]),
                      _: 2,
                    },
                    1040,
                    ['disabled', 'value'],
                  )
                );
              }),
              128,
            )),
            renderSlot(_ctx.$slots, 'default'),
          ],
          8,
          _hoisted_1$17,
        )
      );
    };
  },
});
var _hoisted_119 = ['id', 'name', 'form', 'multiple', 'size', 'disabled', 'required', 'aria-required', 'aria-invalid'];
var _sfc_main33 = defineComponent({
  __name: 'BFormSelect',
  props: mergeModels(
    {
      ariaInvalid: { type: [Boolean, String], default: void 0 },
      autofocus: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      disabledField: { default: 'disabled' },
      form: { default: void 0 },
      id: { default: void 0 },
      labelField: { default: 'label' },
      multiple: { type: Boolean, default: false },
      name: { default: void 0 },
      options: { default: () => [] },
      optionsField: { default: 'options' },
      plain: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      selectSize: { default: 0 },
      size: { default: 'md' },
      state: { type: [Boolean, null], default: null },
      textField: { default: 'text' },
      valueField: { default: 'value' },
    },
    {
      modelValue: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        default: '',
      },
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormSelect');
    const modelValue = useModel(__props, 'modelValue');
    const computedId = useId2(() => props.id, 'input');
    const selectSizeNumber = useToNumber(() => props.selectSize);
    const stateClass = useStateClass(() => props.state);
    const input = useTemplateRef('_input');
    const { focused } = useFocus(input, {
      initialValue: props.autofocus,
    });
    const computedClasses = computed(() => [
      stateClass.value,
      {
        'form-control': props.plain,
        [`form-control-${props.size}`]: props.size !== 'md' && props.plain,
        'form-select': !props.plain,
        [`form-select-${props.size}`]: props.size !== 'md' && !props.plain,
      },
    ]);
    const computedSelectSize = computed(() => (selectSizeNumber.value || props.plain ? selectSizeNumber.value : void 0));
    const computedAriaInvalid = useAriaInvalid(
      () => props.ariaInvalid,
      () => props.state,
    );
    const { normalizedOptions, isComplex } = useFormSelect(() => props.options, props);
    const normalizedOptsWrapper = computed(() => normalizedOptions.value);
    const localValue = computed({
      get: () => modelValue.value,
      set: newValue => {
        modelValue.value = newValue;
      },
    });
    __expose({
      blur: () => {
        focused.value = false;
      },
      element: input,
      focus: () => {
        focused.value = true;
      },
    });
    return (_ctx, _cache) => {
      return withDirectives(
        (openBlock(),
        createElementBlock(
          'select',
          {
            id: unref(computedId),
            ref: '_input',
            'onUpdate:modelValue': _cache[0] || (_cache[0] = $event => (localValue.value = $event)),
            class: normalizeClass(computedClasses.value),
            name: unref(props).name,
            form: unref(props).form || void 0,
            multiple: unref(props).multiple || void 0,
            size: computedSelectSize.value,
            disabled: unref(props).disabled,
            required: unref(props).required || void 0,
            'aria-required': unref(props).required || void 0,
            'aria-invalid': unref(computedAriaInvalid),
          },
          [
            renderSlot(_ctx.$slots, 'first'),
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(normalizedOptsWrapper.value, (option, index8) => {
                return (
                  openBlock(),
                  createElementBlock(
                    Fragment,
                    { key: index8 },
                    [
                      unref(isComplex)(option)
                        ? (openBlock(),
                          createBlock(
                            _sfc_main$113,
                            {
                              key: 0,
                              label: option.label,
                              options: option.options,
                              'value-field': unref(props).valueField,
                              'text-field': unref(props).textField,
                              'disabled-field': unref(props).disabledField,
                            },
                            null,
                            8,
                            ['label', 'options', 'value-field', 'text-field', 'disabled-field'],
                          ))
                        : (openBlock(),
                          createBlock(
                            _sfc_main25,
                            {
                              key: 1,
                              value: option.value,
                              disabled: option.disabled,
                            },
                            {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, 'option', mergeProps({ ref_for: true }, option), () => [
                                  createTextVNode(toDisplayString(option.text), 1),
                                ]),
                              ]),
                              _: 2,
                            },
                            1032,
                            ['value', 'disabled'],
                          )),
                    ],
                    64,
                  )
                );
              }),
              128,
            )),
            renderSlot(_ctx.$slots, 'default'),
          ],
          10,
          _hoisted_119,
        )),
        [[vModelSelect, localValue.value]],
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/event-a_bi5ysw.mjs
var IS_BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';
var parseEventOptions = options => {
  const HAS_PASSIVE_EVENT_SUPPORT = (() => {
    let passiveEventSupported = false;
    if (IS_BROWSER) {
      try {
        const options2 = {
          // This function will be called when the browser
          // attempts to access the passive property
          get passive() {
            passiveEventSupported = true;
            return;
          },
        };
        WINDOW.addEventListener('test', options2, options2);
        WINDOW.removeEventListener('test', options2, options2);
      } catch {
        passiveEventSupported = false;
      }
    }
    return passiveEventSupported;
  })();
  if (HAS_PASSIVE_EVENT_SUPPORT) {
    return typeof options === 'object' ? options : { capture: !!options || false };
  }
  return typeof options === 'object' ? options.capture : options;
};
var eventOn = (el, eventName, handler, options) => {
  if (el && el.addEventListener) {
    el.addEventListener(eventName, handler, parseEventOptions(options));
  }
};
var eventOff = (el, eventName, handler, options) => {
  if (el && el.removeEventListener) {
    el.removeEventListener(eventName, handler, options);
  }
};
var eventOnOff = (on, eventParams) => {
  const method = on ? eventOn : eventOff;
  method(...eventParams);
};
var stopEvent = (event, { preventDefault: preventDefault2 = true, propagation = false, immediatePropagation = false } = {}) => {
  if (preventDefault2) {
    event.preventDefault();
  }
  if (propagation) {
    event.stopPropagation();
  }
  if (immediatePropagation) {
    event.stopImmediatePropagation();
  }
};

// node_modules/bootstrap-vue-next/dist/BFormSpinbutton.vue_vue_type_script_setup_true_lang-B-RgEb6R.mjs
var useRtl = () => {
  const rtlPlugin2 = inject(rtlPluginKey);
  onMounted(() => {
    watch(
      () => (rtlPlugin2 == null ? void 0 : rtlPlugin2.locale.value),
      newValue => {
        const html = document.documentElement;
        html.setAttribute('lang', newValue ?? '');
      },
      { immediate: true },
    );
    watch(
      () => (rtlPlugin2 == null ? void 0 : rtlPlugin2.isRtl.value),
      newValue => {
        const html = document.documentElement;
        html.setAttribute('dir', (newValue ?? false) ? 'rtl' : 'ltr');
      },
      { immediate: true },
    );
  });
  return { ...rtlPlugin2 };
};
var _hoisted_120 = ['lang', 'tabindex', 'title'];
var _hoisted_211 = ['name', 'form', 'value'];
var _hoisted_33 = [
  'id',
  'dir',
  'tabindex',
  'aria-label',
  'aria-invalid',
  'aria-required',
  'aria-valuemin',
  'aria-valuemax',
  'aria-valuenow',
  'aria-valuetext',
];
var defaultValues = {
  min: 1,
  max: 100,
  step: 1,
  repeatDelay: 500,
  repeatInterval: 100,
  repeatThreshold: 10,
  repeatMultiplier: 4,
};
var _sfc_main34 = defineComponent({
  __name: 'BFormSpinbutton',
  props: mergeModels(
    {
      ariaControls: { default: void 0 },
      ariaLabel: { default: void 0 },
      disabled: { type: Boolean, default: false },
      form: { default: void 0 },
      formatterFn: { type: Function, default: void 0 },
      id: { default: void 0 },
      inline: { type: Boolean, default: false },
      labelDecrement: { default: 'Decrement' },
      labelIncrement: { default: 'Increment' },
      locale: { default: void 0 },
      max: { default: defaultValues.max },
      min: { default: defaultValues.min },
      name: { default: void 0 },
      placeholder: { default: void 0 },
      readonly: { type: Boolean, default: false },
      repeatDelay: { default: defaultValues.repeatDelay },
      repeatInterval: { default: defaultValues.repeatInterval },
      repeatStepMultiplier: { default: defaultValues.repeatMultiplier },
      repeatThreshold: { default: defaultValues.repeatThreshold },
      required: { type: Boolean, default: false },
      size: { default: void 0 },
      state: { type: [Boolean, null], default: null },
      step: { default: defaultValues.step },
      vertical: { type: Boolean, default: false },
      wrap: { type: Boolean, default: false },
    },
    {
      modelValue: {
        default: null,
      },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(['change'], ['update:modelValue']),
  setup(__props, { emit: __emit }) {
    const KEY_CODES = [CODE_UP, CODE_DOWN, CODE_HOME, CODE_END, CODE_PAGEUP, CODE_PAGEDOWN];
    const _props = __props;
    const props = useDefaults(_props, 'BFormSpinbutton');
    const emit = __emit;
    const modelValue = useModel(__props, 'modelValue');
    const element = useTemplateRef('_element');
    const { focused } = useFocus(element);
    const computedId = useId2(() => props.id, 'spinbutton');
    const computedClasses = computed(() => ({
      disabled: props.disabled,
      readonly: props.readonly,
      focus: focused.value,
      'd-inline-flex': props.inline || props.vertical,
      'd-flex': !props.inline && !props.vertical,
      'align-items-stretch': !props.vertical,
      'flex-column': props.vertical,
      [`form-control-${props.size}`]: props.size !== void 0,
    }));
    const computedSpinClasses = computed(() => ({
      'd-flex': props.vertical,
      'align-self-center': !props.vertical,
      'align-items-center': props.vertical,
      'border-top': props.vertical,
      'border-bottom': props.vertical,
      'border-start': !props.vertical,
      'border-end': !props.vertical,
    }));
    let $_autoDelayTimer;
    let $_autoRepeatTimer;
    let $_keyIsDown = false;
    const stepNumber = useToNumber(() => props.step);
    const computedStep = computed(() => (Number.isNaN(stepNumber.value) ? defaultValues.step : stepNumber.value));
    const minNumber = useToNumber(() => props.min);
    const computedMin = computed(() => (Number.isNaN(minNumber.value) ? defaultValues.min : minNumber.value));
    const maxNumber = useToNumber(() => props.max);
    const computedMax = computed(() => {
      const step = computedStep.value;
      const min2 = computedMin.value;
      return Math.floor((maxNumber.value - min2) / step) * step + min2;
    });
    const repeatDelayNumber = useToNumber(() => props.repeatDelay, {
      nanToZero: true,
      method: 'parseInt',
    });
    const computedDelay = computed(() => (repeatDelayNumber.value > 0 ? repeatDelayNumber.value : defaultValues.repeatDelay));
    const repeatIntervalNumber = useToNumber(() => props.repeatInterval, {
      nanToZero: true,
      method: 'parseInt',
    });
    const computedInterval = computed(() => (repeatIntervalNumber.value > 0 ? repeatIntervalNumber.value : defaultValues.repeatInterval));
    const repeatThresholdNumber = useToNumber(() => props.repeatThreshold, {
      nanToZero: true,
      method: 'parseInt',
    });
    const computedThreshold = computed(() =>
      Math.max(Number.isNaN(repeatThresholdNumber.value) ? defaultValues.repeatThreshold : repeatThresholdNumber.value, 1),
    );
    const repeatStepMultiplierNumber = useToNumber(() => props.repeatStepMultiplier, {
      nanToZero: true,
      method: 'parseInt',
    });
    const computedStepMultiplier = computed(() =>
      Math.max(Number.isNaN(repeatStepMultiplierNumber.value) ? defaultValues.repeatMultiplier : repeatStepMultiplierNumber.value, 1),
    );
    const computedPrecision = computed(() => {
      const step = computedStep.value;
      return Math.floor(step) === step ? 0 : (step.toString().split('.')[1] || '').length;
    });
    const computedMultiplier = computed(() => Math.pow(10, computedPrecision.value || 0));
    const valueAsFixed = computed(() => (modelValue.value === null ? '' : modelValue.value.toFixed(computedPrecision.value)));
    const { isRtl, locale: globalLocale } = useRtl();
    const computedLocale = computed(() => {
      const loc = (props.locale ?? (globalLocale == null ? void 0 : globalLocale.value)) || 'locale';
      const locales = [loc];
      const nf = new Intl.NumberFormat(locales);
      return nf.resolvedOptions().locale;
    });
    const defaultFormatter = () =>
      new Intl.NumberFormat(computedLocale.value, {
        style: 'decimal',
        useGrouping: false,
        minimumIntegerDigits: 1,
        minimumFractionDigits: computedPrecision.value,
        maximumFractionDigits: computedPrecision.value,
        notation: 'standard',
      }).format;
    const computedFormatter = computed(() => props.formatterFn ?? defaultFormatter());
    const stepValue = direction => {
      let { value } = modelValue;
      if (!props.disabled && value !== null) {
        const step = computedStep.value * direction;
        const min2 = computedMin.value;
        const max2 = computedMax.value;
        const multiplier = computedMultiplier.value;
        const { wrap } = props;
        value = Math.round((value - min2) / step) * step + min2 + step;
        value = Math.round(value * multiplier) / multiplier;
        modelValue.value = value > max2 ? (wrap ? min2 : max2) : value < min2 ? (wrap ? max2 : min2) : value;
      }
    };
    const stepUp = (multiplier = 1) => {
      if (modelValue.value === null) {
        modelValue.value = computedMin.value;
        return;
      }
      stepValue(1 * multiplier);
    };
    const stepDown = (multiplier = 1) => {
      if (modelValue.value === null) {
        modelValue.value = props.wrap ? computedMax.value : computedMin.value;
        return;
      }
      stepValue(-1 * multiplier);
    };
    onKeyStroke(
      KEY_CODES,
      event => {
        const { code, altKey, ctrlKey, metaKey } = event;
        if (props.disabled || props.readonly || altKey || ctrlKey || metaKey) return;
        stopEvent(event, { immediatePropagation: true });
        if ($_keyIsDown) {
          return;
        }
        resetTimers();
        if ([CODE_UP, CODE_DOWN].includes(code)) {
          $_keyIsDown = true;
          if (code === CODE_UP) {
            handleStepRepeat(event, stepUp);
            return;
          }
          if (code === CODE_DOWN) {
            handleStepRepeat(event, stepDown);
          }
          return;
        }
        if (code === CODE_PAGEUP) {
          stepUp(computedStepMultiplier.value);
          return;
        }
        if (code === CODE_PAGEDOWN) {
          stepDown(computedStepMultiplier.value);
          return;
        }
        if (code === CODE_HOME) {
          modelValue.value = computedMin.value;
          return;
        }
        if (code === CODE_END) {
          modelValue.value = computedMax.value;
        }
      },
      { target: element, eventName: 'keydown' },
    );
    onKeyStroke(
      KEY_CODES,
      event => {
        const { altKey, ctrlKey, metaKey } = event;
        if (props.disabled || props.readonly || altKey || ctrlKey || metaKey) return;
        stopEvent(event, { immediatePropagation: true });
        resetTimers();
        $_keyIsDown = false;
        emit('change', modelValue.value);
      },
      { target: element, eventName: 'keyup' },
    );
    const handleStepRepeat = (event, stepper) => {
      const { type } = event || {};
      if (!props.disabled && !props.readonly) {
        if (isMouseEvent(event)) {
          if (type === 'mousedown' && event.button) return;
        }
        resetTimers();
        stepper(1);
        const threshold = computedThreshold.value;
        const multiplier = computedStepMultiplier.value;
        const delay3 = computedDelay.value;
        const interval = computedInterval.value;
        $_autoDelayTimer = setTimeout(() => {
          let count = 0;
          $_autoRepeatTimer = setInterval(() => {
            stepper(count < threshold ? 1 : multiplier);
            count++;
          }, interval);
        }, delay3);
      }
    };
    const isMouseEvent = evt => evt.type === 'mouseup' || evt.type === 'mousedown';
    const onMouseup = event => {
      if (isMouseEvent(event)) {
        if (event.type === 'mouseup' && event.button) {
          return;
        }
      }
      stopEvent(event, { immediatePropagation: true });
      resetTimers();
      setMouseup(false);
      emit('change', modelValue.value);
    };
    const setMouseup = on => {
      try {
        eventOnOff(on, [document.body, 'mouseup', onMouseup, false]);
        eventOnOff(on, [document.body, 'touchend', onMouseup, false]);
      } catch {}
    };
    const resetTimers = () => {
      clearTimeout($_autoDelayTimer);
      clearInterval($_autoRepeatTimer);
      $_autoDelayTimer = void 0;
      $_autoRepeatTimer = void 0;
    };
    const buttons = computed(() => {
      const incrementSvgAttrs = {
        svg: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '16',
          height: '16',
          fill: 'currentColor',
          class: 'bi bi-plus',
          viewBox: '0 0 16 16',
        },
        path: {
          d: 'M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z',
        },
      };
      const decrementSvgAttrs = {
        svg: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '16',
          height: '16',
          fill: 'currentColor',
          class: 'bi bi-dash',
          viewBox: '0 0 16 16',
        },
        path: { d: 'M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z' },
      };
      const sharedButtonAttrs = {
        class: [{ 'py-0': !props.vertical }, 'btn', 'btn-sm', 'border-0', 'rounded-0'],
        tabindex: '-1',
        type: 'button',
        disabled: props.disabled || props.readonly,
        'aria-disabled': props.disabled || props.readonly ? true : void 0,
        'aria-controls': computedId.value,
      };
      const sharedSvgAttrs = {
        'aria-hidden': true,
        scale: focused.value ? 1.5 : 1.25,
      };
      const handler = (event, stepper) => {
        if (!props.disabled && !props.readonly) {
          stopEvent(event, { immediatePropagation: true });
          setMouseup(true);
          focused.value = true;
          handleStepRepeat(event, stepper);
        }
      };
      const incrementAttrs = {
        button: {
          ...sharedButtonAttrs,
          'aria-label': props.labelIncrement || void 0,
          'aria-keyshortcuts': 'ArrowUp',
        },
        svg: {
          ...sharedSvgAttrs,
          ...incrementSvgAttrs.svg,
        },
        path: {
          ...incrementSvgAttrs.path,
        },
        slot: {
          name: 'increment',
        },
        handler: e => handler(e, stepUp),
      };
      const decrementAttrs = {
        button: {
          ...sharedButtonAttrs,
          'aria-label': props.labelDecrement || void 0,
          'aria-keyshortcuts': 'ArrowDown',
        },
        svg: {
          ...sharedSvgAttrs,
          ...decrementSvgAttrs.svg,
        },
        path: {
          ...decrementSvgAttrs.path,
        },
        slot: {
          name: 'decrement',
        },
        handler: e => handler(e, stepDown),
      };
      return {
        top: {
          ...(props.vertical ? incrementAttrs : decrementAttrs),
        },
        bottom: {
          ...(!props.vertical ? incrementAttrs : decrementAttrs),
        },
      };
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            ref: '_element',
            class: normalizeClass(['b-form-spinbutton form-control', computedClasses.value]),
            role: 'group',
            lang: computedLocale.value,
            tabindex: unref(props).disabled ? void 0 : '-1',
            title: unref(props).ariaLabel,
            onClick: _cache[4] || (_cache[4] = $event => (focused.value = true)),
          },
          [
            renderSlot(_ctx.$slots, buttons.value.top.slot.name, { hasFocus: unref(focused) }, () => [
              createBaseVNode(
                'button',
                mergeProps(buttons.value.top.button, {
                  onMousedown:
                    _cache[0] ||
                    (_cache[0] = //@ts-ignore
                      (...args) => buttons.value.top.handler && buttons.value.top.handler(...args)),
                  onTouchstart:
                    _cache[1] ||
                    (_cache[1] = //@ts-ignore
                      (...args) => buttons.value.top.handler && buttons.value.top.handler(...args)),
                }),
                [
                  (openBlock(),
                  createElementBlock(
                    'svg',
                    normalizeProps(guardReactiveProps(buttons.value.top.svg)),
                    [createBaseVNode('path', normalizeProps(guardReactiveProps(buttons.value.top.path)), null, 16)],
                    16,
                  )),
                ],
                16,
              ),
            ]),
            unref(props).name && !unref(props).disabled
              ? (openBlock(),
                createElementBlock(
                  'input',
                  {
                    key: 'hidden',
                    type: 'hidden',
                    name: unref(props).name,
                    form: unref(props).form,
                    value: valueAsFixed.value,
                  },
                  null,
                  8,
                  _hoisted_211,
                ))
              : createCommentVNode('', true),
            createBaseVNode(
              'output',
              {
                id: unref(computedId),
                key: 'output',
                class: normalizeClass(['flex-grow-1', computedSpinClasses.value]),
                dir: (unref(isRtl) ?? false) ? 'rtl' : 'ltr',
                tabindex: unref(props).disabled ? void 0 : '0',
                role: 'spinbutton',
                'aria-live': 'off',
                'aria-label': unref(props).ariaLabel || void 0,
                'aria-invalid': unref(props).state === false || (!modelValue.value !== null && unref(props).required) ? true : void 0,
                'aria-required': unref(props).required ? true : void 0,
                'aria-valuemin': computedMin.value,
                'aria-valuemax': computedMax.value,
                'aria-valuenow': modelValue.value !== null ? modelValue.value : void 0,
                'aria-valuetext': modelValue.value !== null ? computedFormatter.value(modelValue.value) : void 0,
              },
              [
                createBaseVNode(
                  'bdi',
                  null,
                  toDisplayString((modelValue.value !== null ? computedFormatter.value(modelValue.value) : unref(props).placeholder) || ''),
                  1,
                ),
              ],
              10,
              _hoisted_33,
            ),
            renderSlot(_ctx.$slots, buttons.value.bottom.slot.name, { hasFocus: unref(focused) }, () => [
              createBaseVNode(
                'button',
                mergeProps(buttons.value.bottom.button, {
                  onMousedown:
                    _cache[2] ||
                    (_cache[2] = //@ts-ignore
                      (...args) => buttons.value.bottom.handler && buttons.value.bottom.handler(...args)),
                  onTouchstart:
                    _cache[3] ||
                    (_cache[3] = //@ts-ignore
                      (...args) => buttons.value.bottom.handler && buttons.value.bottom.handler(...args)),
                }),
                [
                  (openBlock(),
                  createElementBlock(
                    'svg',
                    normalizeProps(guardReactiveProps(buttons.value.bottom.svg)),
                    [createBaseVNode('path', normalizeProps(guardReactiveProps(buttons.value.bottom.path)), null, 16)],
                    16,
                  )),
                ],
                16,
              ),
            ]),
          ],
          10,
          _hoisted_120,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BFormTags.vue_vue_type_script_setup_true_lang-FWDxfiLi.mjs
var _hoisted_1$18 = ['id'];
var _sfc_main$114 = defineComponent({
  __name: 'BFormTag',
  props: {
    disabled: { type: Boolean, default: false },
    id: { default: void 0 },
    noRemove: { type: Boolean, default: false },
    pill: { type: Boolean, default: false },
    removeLabel: { default: 'Remove tag' },
    tag: { default: 'span' },
    title: { default: void 0 },
    variant: { default: 'secondary' },
  },
  emits: ['remove'],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormTag');
    const emit = __emit;
    const slots = useSlots();
    const computedId = useId2(() => props.id);
    const tagText = computed(() => {
      var _a;
      return ((((_a = slots.default) == null ? void 0 : _a.call(slots, {})[0].children) ?? '').toString() || props.title) ?? '';
    });
    const taglabelId = computed(() => `${computedId.value}taglabel__`);
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed(() => [
      colorClasses.value,
      {
        'rounded-pill': props.pill,
        disabled: props.disabled,
      },
    ]);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            id: unref(computedId),
            title: tagText.value,
            class: normalizeClass(['badge b-form-tag d-inline-flex align-items-center mw-100', computedClasses.value]),
            'aria-labelledby': taglabelId.value,
          },
          {
            default: withCtx(() => [
              createBaseVNode(
                'span',
                {
                  id: taglabelId.value,
                  class: 'b-form-tag-content flex-grow-1 text-truncate',
                },
                [renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(tagText.value), 1)])],
                8,
                _hoisted_1$18,
              ),
              !unref(props).disabled && !unref(props).noRemove
                ? (openBlock(),
                  createBlock(
                    _sfc_main5,
                    {
                      key: 0,
                      'aria-keyshortcuts': 'Delete',
                      'aria-label': unref(props).removeLabel,
                      class: 'b-form-tag-remove',
                      'aria-describedby': taglabelId.value,
                      'aria-controls': unref(props).id,
                      onClick: _cache[0] || (_cache[0] = $event => emit('remove', tagText.value)),
                    },
                    null,
                    8,
                    ['aria-label', 'aria-describedby', 'aria-controls'],
                  ))
                : createCommentVNode('', true),
            ]),
            _: 3,
          },
          8,
          ['id', 'title', 'class', 'aria-labelledby'],
        )
      );
    };
  },
});
var _hoisted_121 = ['id'];
var _hoisted_212 = ['id', 'for', 'aria-live'];
var _hoisted_34 = ['id', 'aria-live'];
var _hoisted_43 = ['id'];
var _hoisted_52 = ['aria-controls'];
var _hoisted_62 = {
  role: 'group',
  class: 'd-flex',
};
var _hoisted_7 = ['id', 'disabled', 'value', 'type', 'placeholder', 'form', 'required', 'aria-required'];
var _hoisted_8 = ['disabled'];
var _hoisted_9 = {
  'aria-live': 'polite',
  'aria-atomic': 'true',
};
var _hoisted_10 = {
  key: 0,
  class: 'd-block invalid-feedback',
};
var _hoisted_11 = {
  key: 1,
  class: 'form-text text-body-secondary',
};
var _hoisted_122 = {
  key: 2,
  class: 'form-text text-body-secondary',
};
var _hoisted_132 = ['name', 'value'];
var _sfc_main35 = defineComponent({
  __name: 'BFormTags',
  props: mergeModels(
    {
      addButtonText: { default: 'Add' },
      addButtonVariant: { default: 'outline-secondary' },
      addOnChange: { type: Boolean, default: false },
      autofocus: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      duplicateTagText: { default: 'Duplicate tag(s)' },
      form: { default: void 0 },
      inputAttrs: { default: void 0 },
      inputClass: { default: void 0 },
      inputId: { default: void 0 },
      inputType: { default: 'text' },
      invalidTagText: { default: 'Invalid tag(s)' },
      limit: { default: void 0 },
      limitTagsText: { default: 'Tag limit reached' },
      name: { default: void 0 },
      noAddOnEnter: { type: Boolean, default: false },
      noOuterFocus: { type: Boolean, default: false },
      noTagRemove: { type: Boolean, default: false },
      placeholder: { default: 'Add tag...' },
      removeOnDelete: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      separator: { default: void 0 },
      size: { default: 'md' },
      state: { type: [Boolean, null], default: null },
      tagClass: { default: void 0 },
      tagPills: { type: Boolean, default: false },
      tagRemoveLabel: { default: void 0 },
      tagRemovedLabel: { default: 'Tag removed' },
      tagValidator: { type: Function, default: () => true },
      tagVariant: { default: 'secondary' },
    },
    {
      modelValue: {
        default: () => [],
      },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(['blur', 'focus', 'focusin', 'focusout', 'tag-state'], ['update:modelValue']),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormTags');
    const emit = __emit;
    const modelValue = useModel(__props, 'modelValue');
    const computedId = useId2();
    const limitNumber = useToNumber(() => props.limit ?? NaN);
    const stateClass = useStateClass(() => props.state);
    const input = useTemplateRef('_input');
    const { focused } = useFocus(input, {
      initialValue: props.autofocus,
    });
    const _inputId = computed(() => props.inputId || `${computedId.value}input__`);
    const tags = ref([...modelValue.value]);
    const inputValue = ref('');
    const shouldRemoveOnDelete = ref(modelValue.value.length > 0);
    const lastRemovedTag = ref('');
    const validTags = ref([]);
    const invalidTags = ref([]);
    const duplicateTags = ref([]);
    syncRef(modelValue, tags, {
      direction: 'ltr',
      transform: {
        ltr: v => [...v],
      },
    });
    const computedClasses = computed(() => [
      stateClass.value,
      {
        [`form-control-${props.size}`]: props.size !== 'md',
        disabled: props.disabled,
        focus: focused.value,
      },
    ]);
    const isDuplicate = computed(() => tags.value.includes(inputValue.value));
    const isInvalid = computed(() => (inputValue.value === '' ? false : !props.tagValidator(inputValue.value)));
    const isLimitReached = computed(() => tags.value.length === limitNumber.value);
    const disableAddButton = computed(() => !isInvalid.value && !isDuplicate.value);
    const slotAttrs = computed(() => ({
      addButtonText: props.addButtonText,
      addButtonVariant: props.addButtonVariant,
      addTag,
      disableAddButton: disableAddButton.value,
      disabled: props.disabled,
      duplicateTagText: props.duplicateTagText,
      duplicateTags: duplicateTags.value,
      form: props.form,
      inputAttrs: {
        ...props.inputAttrs,
        disabled: props.disabled,
        form: props.form,
        id: _inputId.value,
        value: inputValue.value,
      },
      inputClass: props.inputClass,
      inputHandlers: {
        input: onInput,
        keydown: onKeydown,
        change: onChange,
      },
      inputId: _inputId.value,
      inputType: props.inputType,
      invalidTagText: props.invalidTagText,
      invalidTags: invalidTags.value,
      isDuplicate: isDuplicate.value,
      isInvalid: isInvalid.value,
      isLimitReached: isLimitReached.value,
      limitTagsText: props.limitTagsText,
      limit: limitNumber.value,
      noTagRemove: props.noTagRemove,
      placeholder: props.placeholder,
      removeTag,
      required: props.required,
      separator: props.separator,
      size: props.size,
      state: props.state,
      tagClass: props.tagClass,
      tagPills: props.tagPills,
      tagRemoveLabel: props.tagRemoveLabel,
      tagVariant: props.tagVariant,
      tags: tags.value,
    }));
    const onFocusin = e => {
      if (props.disabled) {
        const target = e.target;
        target.blur();
        return;
      }
      emit('focusin', e);
    };
    const onFocus = e => {
      if (props.disabled || props.noOuterFocus) {
        return;
      }
      focused.value = true;
      emit('focus', e);
    };
    const onBlur = e => {
      focused.value = false;
      emit('blur', e);
    };
    const onInput = e => {
      var _a, _b;
      const value = typeof e === 'string' ? e : e.target.value;
      shouldRemoveOnDelete.value = false;
      if (((_a = props.separator) == null ? void 0 : _a.includes(value.charAt(0))) && value.length > 0) {
        if (input.value) {
          input.value.value = '';
        }
        return;
      }
      inputValue.value = value;
      if ((_b = props.separator) == null ? void 0 : _b.includes(value.charAt(value.length - 1))) {
        addTag(value.slice(0, value.length - 1));
        return;
      }
      validTags.value = props.tagValidator(value) && !isDuplicate.value ? [value] : [];
      invalidTags.value = props.tagValidator(value) ? [] : [value];
      duplicateTags.value = isDuplicate.value ? [value] : [];
      emit('tag-state', validTags.value, invalidTags.value, duplicateTags.value);
    };
    const onChange = e => {
      if (props.addOnChange) {
        onInput(e);
        if (!isDuplicate.value) {
          addTag(inputValue.value);
        }
      }
    };
    const onKeydown = e => {
      if (e.key === 'Enter' && !props.noAddOnEnter) {
        addTag(inputValue.value);
        return;
      }
      if (
        (e.key === 'Backspace' || e.key === 'Delete') &&
        props.removeOnDelete &&
        inputValue.value === '' &&
        shouldRemoveOnDelete.value &&
        tags.value.length > 0
      ) {
        removeTag(tags.value[tags.value.length - 1]);
      } else {
        shouldRemoveOnDelete.value = true;
      }
    };
    onKeyStroke(onKeydown, { target: input });
    const separator = computed(() => {
      if (!props.separator) {
        return;
      }
      return typeof props.separator === 'string' ? props.separator : props.separator.join('');
    });
    const separatorRegExp = computed(() => {
      if (!separator.value) {
        return;
      }
      return new RegExp(`[${escapeRegExpChars(separator.value)}]+`);
    });
    const addTag = tag => {
      tag = (tag ?? inputValue.value).trim();
      const newTags = separatorRegExp.value ? tag.split(separatorRegExp.value).map(t => t.trim()) : [tag];
      const validTags2 = [];
      for (const newTag of newTags) {
        if (newTag === '' || isDuplicate.value || !props.tagValidator(newTag)) {
          continue;
        }
        if (limitNumber.value && isLimitReached.value) {
          break;
        }
        validTags2.push(newTag);
      }
      const newValue = [...modelValue.value, ...validTags2];
      inputValue.value = '';
      shouldRemoveOnDelete.value = true;
      modelValue.value = newValue;
      focused.value = true;
    };
    const removeTag = tag => {
      const tagIndex = tags.value.indexOf((tag == null ? void 0 : tag.toString()) ?? '');
      if (tagIndex === -1) return;
      lastRemovedTag.value = tags.value.splice(tagIndex, 1).toString();
      modelValue.value = tags.value;
    };
    __expose({
      blur: () => {
        focused.value = false;
      },
      element: input,
      focus: () => {
        focused.value = true;
      },
      inputValue,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            id: unref(computedId),
            class: normalizeClass(['b-form-tags form-control h-auto', computedClasses.value]),
            role: 'group',
            tabindex: '-1',
            onFocusin,
            onFocusout: _cache[1] || (_cache[1] = $event => emit('focusout', $event)),
          },
          [
            createBaseVNode(
              'output',
              {
                id: `${unref(computedId)}selected_tags__`,
                class: 'visually-hidden',
                for: _inputId.value,
                'aria-live': unref(focused) ? 'polite' : 'off',
                'aria-atomic': 'true',
                'aria-relevant': 'additions text',
              },
              toDisplayString(tags.value.join(', ')),
              9,
              _hoisted_212,
            ),
            createBaseVNode(
              'div',
              {
                id: `${unref(computedId)}removed_tags__`,
                role: 'status',
                'aria-live': unref(focused) ? 'assertive' : 'off',
                'aria-atomic': 'true',
                class: 'visually-hidden',
              },
              ' (' + toDisplayString(unref(props).tagRemovedLabel) + ') ' + toDisplayString(lastRemovedTag.value),
              9,
              _hoisted_34,
            ),
            renderSlot(_ctx.$slots, 'default', normalizeProps(guardReactiveProps(slotAttrs.value)), () => [
              createBaseVNode(
                'ul',
                {
                  id: `${unref(computedId)}tag_list__`,
                  class: 'b-form-tags-list list-unstyled mb-0 d-flex flex-wrap align-items-center',
                },
                [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(tags.value, (tag, index8) => {
                      return renderSlot(
                        _ctx.$slots,
                        'tag',
                        {
                          key: index8,
                          tag,
                          tagClass: unref(props).tagClass,
                          tagVariant: unref(props).tagVariant,
                          tagPills: unref(props).tagPills,
                          removeTag,
                        },
                        () => [
                          (openBlock(),
                          createBlock(
                            _sfc_main$114,
                            {
                              key: tag,
                              class: normalizeClass(unref(props).tagClass),
                              tag: 'li',
                              variant: unref(props).tagVariant,
                              pill: unref(props).tagPills,
                              onRemove: removeTag,
                            },
                            {
                              default: withCtx(() => [createTextVNode(toDisplayString(tag), 1)]),
                              _: 2,
                            },
                            1032,
                            ['class', 'variant', 'pill'],
                          )),
                        ],
                      );
                    }),
                    128,
                  )),
                  createBaseVNode(
                    'li',
                    {
                      role: 'none',
                      'aria-live': 'off',
                      class: 'b-from-tags-field flex-grow-1',
                      'aria-controls': `${unref(computedId)}tag_list__`,
                    },
                    [
                      createBaseVNode('div', _hoisted_62, [
                        createBaseVNode(
                          'input',
                          mergeProps(
                            {
                              id: _inputId.value,
                              ref: '_input',
                              disabled: unref(props).disabled,
                              value: inputValue.value,
                              type: unref(props).inputType,
                              placeholder: unref(props).placeholder,
                              class: 'b-form-tags-input w-100 flex-grow-1 p-0 m-0 bg-transparent border-0',
                              style: { outline: 'currentcolor none 0px', 'min-width': '5rem' },
                            },
                            unref(props).inputAttrs,
                            {
                              form: unref(props).form,
                              required: unref(props).required || void 0,
                              'aria-required': unref(props).required || void 0,
                              onInput,
                              onChange,
                              onFocus,
                              onBlur,
                            },
                          ),
                          null,
                          16,
                          _hoisted_7,
                        ),
                        disableAddButton.value
                          ? (openBlock(),
                            createElementBlock(
                              'button',
                              {
                                key: 0,
                                type: 'button',
                                class: normalizeClass([
                                  'btn b-form-tags-button py-0',
                                  [
                                    _ctx.inputClass,
                                    {
                                      [`btn-${unref(props).addButtonVariant}`]: unref(props).addButtonVariant !== null,
                                      'disabled invisible': inputValue.value.length === 0,
                                    },
                                  ],
                                ]),
                                style: { 'font-size': '90%' },
                                disabled: unref(props).disabled || inputValue.value.length === 0 || isLimitReached.value,
                                onClick: _cache[0] || (_cache[0] = $event => addTag(inputValue.value)),
                              },
                              [
                                renderSlot(_ctx.$slots, 'add-button-text', {}, () => [
                                  createTextVNode(toDisplayString(unref(props).addButtonText), 1),
                                ]),
                              ],
                              10,
                              _hoisted_8,
                            ))
                          : createCommentVNode('', true),
                      ]),
                    ],
                    8,
                    _hoisted_52,
                  ),
                ],
                8,
                _hoisted_43,
              ),
              createBaseVNode('div', _hoisted_9, [
                isInvalid.value
                  ? (openBlock(),
                    createElementBlock(
                      'div',
                      _hoisted_10,
                      toDisplayString(unref(props).invalidTagText) + ': ' + toDisplayString(inputValue.value),
                      1,
                    ))
                  : createCommentVNode('', true),
                isDuplicate.value
                  ? (openBlock(),
                    createElementBlock(
                      'small',
                      _hoisted_11,
                      toDisplayString(unref(props).duplicateTagText) + ': ' + toDisplayString(inputValue.value),
                      1,
                    ))
                  : createCommentVNode('', true),
                tags.value.length === unref(props).limit
                  ? (openBlock(), createElementBlock('small', _hoisted_122, toDisplayString(unref(props).limitTagsText), 1))
                  : createCommentVNode('', true),
              ]),
            ]),
            unref(props).name
              ? (openBlock(true),
                createElementBlock(
                  Fragment,
                  { key: 0 },
                  renderList(tags.value, (tag, index8) => {
                    return (
                      openBlock(),
                      createElementBlock(
                        'input',
                        {
                          key: index8,
                          type: 'hidden',
                          name: unref(props).name,
                          value: tag,
                        },
                        null,
                        8,
                        _hoisted_132,
                      )
                    );
                  }),
                  128,
                ))
              : createCommentVNode('', true),
          ],
          42,
          _hoisted_121,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BFormTextarea.vue_vue_type_script_setup_true_lang-CVNC0lcp.mjs
var useTextareaResize = (input, props) => {
  const height = ref(0);
  const resolvedProps = readonly(toRef(props));
  const maxRowsNumber = useToNumber(() => resolvedProps.value.maxRows || NaN, {
    method: 'parseInt',
    nanToZero: true,
  });
  const rowsNumber = useToNumber(() => resolvedProps.value.rows || NaN, {
    method: 'parseInt',
    nanToZero: true,
  });
  const computedMinRows = computed(() => Math.max(rowsNumber.value || 2, 2));
  const computedMaxRows = computed(() => Math.max(computedMinRows.value, maxRowsNumber.value || 0));
  const computedRows = computed(() => (computedMinRows.value === computedMaxRows.value ? computedMinRows.value : null));
  const handleHeightChange = async () => {
    if (!input.value || !isVisible(input.value)) {
      height.value = null;
      return;
    }
    const computedStyle = getComputedStyle(input.value);
    const lineHeight = Number.parseFloat(computedStyle.lineHeight) || 1;
    const border = (Number.parseFloat(computedStyle.borderTopWidth) || 0) + (Number.parseFloat(computedStyle.borderBottomWidth) || 0);
    const padding = (Number.parseFloat(computedStyle.paddingTop) || 0) + (Number.parseFloat(computedStyle.paddingBottom) || 0);
    const offset2 = border + padding;
    const minHeight = lineHeight * computedMinRows.value + offset2;
    const oldHeight = input.value.style.height || computedStyle.height;
    height.value = 'auto';
    await nextTick();
    const { scrollHeight } = input.value;
    height.value = oldHeight;
    await nextTick();
    const contentRows = Math.max((scrollHeight - padding) / lineHeight, 2);
    const rows = Math.min(Math.max(contentRows, computedMinRows.value), computedMaxRows.value);
    const newHeight = Math.max(Math.ceil(rows * lineHeight + offset2), minHeight);
    if (resolvedProps.value.noAutoShrink && (Number.parseFloat(oldHeight.toString()) || 0) > newHeight) {
      height.value = oldHeight;
      return;
    }
    height.value = `${newHeight}px`;
  };
  onMounted(handleHeightChange);
  const computedStyles = computed(() => ({
    resize: 'none',
    height: typeof height.value === 'string' ? height.value : height.value ? `${height.value}px` : void 0,
  }));
  return {
    onInput: handleHeightChange,
    computedStyles,
    computedRows,
  };
};
var _hoisted_123 = [
  'id',
  'name',
  'form',
  'value',
  'disabled',
  'placeholder',
  'required',
  'autocomplete',
  'readonly',
  'aria-required',
  'aria-invalid',
  'rows',
  'wrap',
];
var _sfc_main36 = defineComponent({
  __name: 'BFormTextarea',
  props: mergeModels(
    {
      noResize: { type: Boolean, default: false },
      rows: { default: 2 },
      wrap: { default: 'soft' },
      noAutoShrink: { type: Boolean, default: false },
      maxRows: { default: void 0 },
      ariaInvalid: { type: [Boolean, String], default: void 0 },
      autocomplete: { default: void 0 },
      autofocus: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      form: { default: void 0 },
      formatter: { type: Function, default: void 0 },
      id: { default: void 0 },
      lazyFormatter: { type: Boolean, default: false },
      list: { default: void 0 },
      name: { default: void 0 },
      placeholder: { default: void 0 },
      plaintext: { type: Boolean, default: false },
      readonly: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      size: { default: void 0 },
      state: { type: [Boolean, null], default: void 0 },
      debounce: { default: 0 },
      debounceMaxWait: { default: NaN },
    },
    {
      modelValue: {
        default: '',
      },
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, 'BFormTextarea');
    const [modelValue, modelModifiers] = useModel(__props, 'modelValue', {
      set: v => normalizeInput(v, modelModifiers),
    });
    const input = useTemplateRef('_input');
    const { computedId, forceUpdateKey, computedAriaInvalid, onInput, stateClass, onChange, onBlur, focus, blur } = useFormInput(
      props,
      input,
      modelValue,
      modelModifiers,
    );
    const computedClasses = computed(() => [
      stateClass.value,
      props.plaintext ? 'form-control-plaintext' : 'form-control',
      {
        [`form-control-${props.size}`]: !!props.size,
      },
    ]);
    const {
      computedStyles: resizeStyles,
      onInput: handleHeightChange,
      computedRows,
    } = useTextareaResize(
      input,
      computed(() => ({
        maxRows: props.maxRows,
        rows: props.rows,
        noAutoShrink: props.noAutoShrink,
      })),
    );
    const computedStyles = computed(() => ({
      resize: props.noResize ? 'none' : void 0,
      ...(props.maxRows || props.noAutoShrink ? resizeStyles.value : void 0),
    }));
    __expose({
      blur,
      element: input,
      focus,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'textarea',
          {
            id: unref(computedId),
            ref: '_input',
            key: unref(forceUpdateKey),
            class: normalizeClass(computedClasses.value),
            name: unref(props).name || void 0,
            form: unref(props).form || void 0,
            value: unref(modelValue) ?? void 0,
            disabled: unref(props).disabled,
            placeholder: unref(props).placeholder,
            required: unref(props).required || void 0,
            autocomplete: unref(props).autocomplete || void 0,
            readonly: unref(props).readonly || unref(props).plaintext,
            'aria-required': unref(props).required || void 0,
            'aria-invalid': unref(computedAriaInvalid),
            rows: unref(computedRows) || 2,
            style: normalizeStyle(computedStyles.value),
            wrap: unref(props).wrap || void 0,
            onInput:
              _cache[0] ||
              (_cache[0] = e => {
                unref(onInput)(e);
                unref(handleHeightChange)();
              }),
            onChange:
              _cache[1] ||
              (_cache[1] = //@ts-ignore
                (...args) => unref(onChange) && unref(onChange)(...args)),
            onBlur:
              _cache[2] ||
              (_cache[2] = //@ts-ignore
                (...args) => unref(onBlur) && unref(onBlur)(...args)),
          },
          null,
          46,
          _hoisted_123,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BInputGroupText.vue_vue_type_script_setup_true_lang-C3oeIi3U.mjs
var _hoisted_124 = {
  key: 0,
  class: 'input-group-text',
};
var _hoisted_213 = {
  key: 0,
  class: 'input-group-text',
};
var _sfc_main$115 = defineComponent({
  __name: 'BInputGroup',
  props: {
    append: { default: void 0 },
    id: { default: void 0 },
    prepend: { default: void 0 },
    size: { default: 'md' },
    tag: { default: 'div' },
  },
  setup(__props) {
    provide(inputGroupKey, true);
    const _props = __props;
    const props = useDefaults(_props, 'BInputGroup');
    const computedClasses = computed(() => ({
      [`input-group-${props.size}`]: props.size !== 'md',
    }));
    const hasAppend = computed(() => !!props.append);
    const hasPrepend = computed(() => !!props.prepend);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            id: unref(props).id,
            class: normalizeClass(['input-group', computedClasses.value]),
            role: 'group',
          },
          {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, 'prepend', {}, () => [
                hasPrepend.value
                  ? (openBlock(),
                    createElementBlock('span', _hoisted_124, [createBaseVNode('span', null, toDisplayString(unref(props).prepend), 1)]))
                  : createCommentVNode('', true),
              ]),
              renderSlot(_ctx.$slots, 'default'),
              renderSlot(_ctx.$slots, 'append', {}, () => [
                hasAppend.value
                  ? (openBlock(),
                    createElementBlock('span', _hoisted_213, [createBaseVNode('span', null, toDisplayString(unref(props).append), 1)]))
                  : createCommentVNode('', true),
              ]),
            ]),
            _: 3,
          },
          8,
          ['id', 'class'],
        )
      );
    };
  },
});
var _sfc_main37 = defineComponent({
  __name: 'BInputGroupText',
  props: {
    tag: { default: 'div' },
    text: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BInputGroupText');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          { class: 'input-group-text' },
          {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
            ]),
            _: 3,
          },
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BListGroupItem.vue_vue_type_script_setup_true_lang-BvZYkKtO.mjs
var _sfc_main$116 = defineComponent({
  __name: 'BListGroup',
  props: {
    flush: { type: Boolean, default: false },
    horizontal: { type: [Boolean, String], default: false },
    numbered: { type: Boolean, default: false },
    tag: { default: 'div' },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BListGroup');
    const computedClasses = computed(() => {
      const horizontal = props.flush ? false : props.horizontal;
      return {
        'list-group-flush': props.flush,
        'list-group-horizontal': horizontal === true,
        [`list-group-horizontal-${horizontal}`]: typeof horizontal === 'string',
        'list-group-numbered': props.numbered,
      };
    });
    const computedTag = computed(() => (props.numbered === true ? 'ol' : props.tag));
    provide(listGroupInjectionKey, {
      numbered: toRef(() => props.numbered),
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(computedTag.value),
          {
            class: normalizeClass(['list-group', computedClasses.value]),
          },
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          8,
          ['class'],
        )
      );
    };
  },
});
var _sfc_main38 = defineComponent({
  __name: 'BListGroupItem',
  props: {
    action: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    tag: { default: 'div' },
    active: { type: Boolean, default: false },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    prefetchedClass: {},
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BListGroupItem');
    const attrs = useAttrs();
    const parentData = inject(listGroupInjectionKey, null);
    const { computedLink } = useBLinkHelper(props);
    const isLink2 = computed(() => !props.button && computedLink.value);
    const tagComputed = computed(() =>
      (parentData == null ? void 0 : parentData.numbered.value) ? 'li' : props.button ? 'button' : !isLink2.value ? props.tag : _sfc_main7,
    );
    const isAction = computed(
      () => props.action || isLink2.value || props.button || ['a', 'router-link', 'button', 'b-link'].includes(props.tag),
    );
    const computedClasses = computed(() => ({
      [`list-group-item-${props.variant}`]: props.variant !== null && props.variant !== void 0,
      'list-group-item-action': isAction.value,
      active: props.active,
      disabled: props.disabled,
    }));
    const computedAttrs = computed(() => {
      const localAttrs = {};
      if (props.button) {
        if (!attrs || !attrs.type) {
          localAttrs.type = 'button';
        }
        if (props.disabled) {
          localAttrs.disabled = true;
        }
      }
      return localAttrs;
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(tagComputed.value),
          mergeProps(
            {
              class: ['list-group-item', computedClasses.value],
              'aria-current': unref(props).active ? true : void 0,
              'aria-disabled': unref(props).disabled ? true : void 0,
              target: isLink2.value ? unref(props).target : void 0,
              href: !unref(props).button ? unref(props).href : void 0,
              to: !unref(props).button ? unref(props).to : void 0,
            },
            computedAttrs.value,
          ),
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          16,
          ['class', 'aria-current', 'aria-disabled', 'target', 'href', 'to'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/useSafeScrollLock-DjG0jeMK.mjs
function tryOnScopeDispose2(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue4(r) {
  return typeof r === 'function' ? r() : unref(r);
}
typeof WorkerGlobalScope !== 'undefined' && globalThis instanceof WorkerGlobalScope;
var notNullish2 = val => val != null;
function unrefElement2(elRef) {
  var _a;
  const plain = toValue4(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
var candidateSelectors = [
  'input:not([inert])',
  'select:not([inert])',
  'textarea:not([inert])',
  'a[href]:not([inert])',
  'button:not([inert])',
  '[tabindex]:not(slot):not([inert])',
  'audio[controls]:not([inert])',
  'video[controls]:not([inert])',
  '[contenteditable]:not([contenteditable="false"]):not([inert])',
  'details>summary:first-of-type:not([inert])',
  'details:not([inert])',
];
var candidateSelector = candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement
  ? function () {}
  : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode =
  !NoElement && Element.prototype.getRootNode
    ? function (element) {
        var _element$getRootNode;
        return element === null || element === void 0
          ? void 0
          : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0
            ? void 0
            : _element$getRootNode.call(element);
      }
    : function (element) {
        return element === null || element === void 0 ? void 0 : element.ownerDocument;
      };
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt =
    node === null || node === void 0
      ? void 0
      : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0
        ? void 0
        : _node$getAttribute.call(node, 'inert');
  var inert = inertAtt === '' || inertAtt === 'true';
  var result = inert || (lookUp && node && isInert2(node.parentNode));
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue =
    node === null || node === void 0
      ? void 0
      : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0
        ? void 0
        : _node$getAttribute2.call(node, 'contenteditable');
  return attValue === '' || attValue === 'true';
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      continue;
    }
    if (element.tagName === 'SLOT') {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates,
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot =
        element.shadowRoot || // check for an undisclosed shadow
        (typeof options.getShadowRoot === 'function' && options.getShadowRoot(element));
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates,
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute('tabindex'), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error('No node provided');
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === 'INPUT';
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === 'hidden';
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r =
    node.tagName === 'DETAILS' &&
    Array.prototype.slice.apply(node.children).some(function (child) {
      return child.tagName === 'SUMMARY';
    });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error(
        'Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s',
        err.message,
      );
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === 'radio';
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!(
      ((_nodeRootHost = nodeRootHost) !== null &&
        _nodeRootHost !== void 0 &&
        (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null &&
        _nodeRootHost$ownerDo !== void 0 &&
        _nodeRootHost$ownerDo.contains(nodeRootHost)) ||
      (node !== null &&
        node !== void 0 &&
        (_node$ownerDocument = node.ownerDocument) !== null &&
        _node$ownerDocument !== void 0 &&
        _node$ownerDocument.contains(node))
    );
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!(
        (_nodeRootHost2 = nodeRootHost) !== null &&
        _nodeRootHost2 !== void 0 &&
        (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null &&
        _nodeRootHost2$ownerD !== void 0 &&
        _nodeRootHost2$ownerD.contains(nodeRootHost)
      );
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
    width = _node$getBoundingClie.width,
    height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck,
    getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }
  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  }
  if (!displayCheck || displayCheck === 'full' || displayCheck === 'legacy-full') {
    if (typeof getShadowRoot === 'function') {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== 'legacy-full') {
      return true;
    }
  } else if (displayCheck === 'non-zero-area') {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === 'LEGEND') {
            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (
    node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
    //  because we're limited in the type of selectors we can use in JSDom (see related
    //  note related to `candidateSelectors`)
    isInert(node) ||
    isHiddenInput(node) ||
    isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
    isDetailsWithSummary(node) ||
    isDisabledFromFieldset(node)
  ) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function (item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements,
      });
    }
  });
  return orderedTabbables
    .sort(sortOrderedTabbables)
    .reduce(function (acc, sortable) {
      sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
      return acc;
    }, [])
    .concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable,
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot,
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = candidateSelectors.concat('iframe').join(',');
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _defineProperty(e, r, t) {
  return (
    (r = _toPropertyKey(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: true,
          configurable: true,
          writable: true,
        })
      : (e[r] = t),
    e
  );
}
function _iterableToArray(r) {
  if (('undefined' != typeof Symbol && null != r[Symbol.iterator]) || null != r['@@iterator']) return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r &&
      (o = o.filter(function (r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })),
      t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2
      ? ownKeys(Object(t), true).forEach(function (r2) {
          _defineProperty(e, r2, t[r2]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
        : ownKeys(Object(t)).forEach(function (r2) {
            Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
          });
  }
  return e;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ('object' != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || 'default');
    if ('object' != typeof i) return i;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return ('string' === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string');
  return 'symbol' == typeof i ? i : i + '';
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ('string' == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return (
      'Object' === t && r.constructor && (t = r.constructor.name),
      'Map' === t || 'Set' === t
        ? Array.from(r)
        : 'Arguments' === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? _arrayLikeToArray(r, a)
          : void 0
    );
  }
}
var activeFocusTraps = {
  activateTrap: function activateTrap(trapStack, trap) {
    if (trapStack.length > 0) {
      var activeTrap = trapStack[trapStack.length - 1];
      if (activeTrap !== trap) {
        activeTrap.pause();
      }
    }
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex === -1) {
      trapStack.push(trap);
    } else {
      trapStack.splice(trapIndex, 1);
      trapStack.push(trap);
    }
  },
  deactivateTrap: function deactivateTrap(trapStack, trap) {
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1);
    }
    if (trapStack.length > 0) {
      trapStack[trapStack.length - 1].unpause();
    }
  },
};
var isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};
var isEscapeEvent = function isEscapeEvent2(e) {
  return (
    (e === null || e === void 0 ? void 0 : e.key) === 'Escape' ||
    (e === null || e === void 0 ? void 0 : e.key) === 'Esc' ||
    (e === null || e === void 0 ? void 0 : e.keyCode) === 27
  );
};
var isTabEvent = function isTabEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === 'Tab' || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
};
var isKeyForward = function isKeyForward2(e) {
  return isTabEvent(e) && !e.shiftKey;
};
var isKeyBackward = function isKeyBackward2(e) {
  return isTabEvent(e) && e.shiftKey;
};
var delay = function delay2(fn) {
  return setTimeout(fn, 0);
};
var valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === 'function' ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget2(event) {
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
};
var internalTrapStack = [];
var createFocusTrap = function createFocusTrap2(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
  var config = _objectSpread2(
    {
      returnFocusOnDeactivate: true,
      escapeDeactivates: true,
      delayInitialFocus: true,
      isKeyForward,
      isKeyBackward,
    },
    userOptions,
  );
  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0,
  };
  var trap;
  var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0
      ? configOverrideOptions[optionName]
      : config[configOptionName || optionName];
  };
  var findContainerIndex = function findContainerIndex2(element, event) {
    var composedPath =
      typeof (event === null || event === void 0 ? void 0 : event.composedPath) === 'function' ? event.composedPath() : void 0;
    return state.containerGroups.findIndex(function (_ref) {
      var container = _ref.container,
        tabbableNodes = _ref.tabbableNodes;
      return (
        container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
        //  web components if the `tabbableOptions.getShadowRoot` option was used for
        //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
        //  look inside web components even if open)
        (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) ||
        tabbableNodes.find(function (node) {
          return node === element;
        })
      );
    });
  };
  var getNodeForOption = function getNodeForOption2(optionName) {
    var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      _ref2$hasFallback = _ref2.hasFallback,
      hasFallback = _ref2$hasFallback === void 0 ? false : _ref2$hasFallback,
      _ref2$params = _ref2.params,
      params = _ref2$params === void 0 ? [] : _ref2$params;
    var optionValue = config[optionName];
    if (typeof optionValue === 'function') {
      optionValue = optionValue.apply(void 0, _toConsumableArray(params));
    }
    if (optionValue === true) {
      optionValue = void 0;
    }
    if (!optionValue) {
      if (optionValue === void 0 || optionValue === false) {
        return optionValue;
      }
      throw new Error('`'.concat(optionName, '` was specified but was not a node, or did not return a node'));
    }
    var node = optionValue;
    if (typeof optionValue === 'string') {
      try {
        node = doc.querySelector(optionValue);
      } catch (err) {
        throw new Error('`'.concat(optionName, '` appears to be an invalid selector; error="').concat(err.message, '"'));
      }
      if (!node) {
        if (!hasFallback) {
          throw new Error('`'.concat(optionName, '` as selector refers to no known node'));
        }
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode2() {
    var node = getNodeForOption('initialFocus', {
      hasFallback: true,
    });
    if (node === false) {
      return false;
    }
    if (node === void 0 || (node && !isFocusable(node, config.tabbableOptions))) {
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
        node = firstTabbableNode || getNodeForOption('fallbackFocus');
      }
    } else if (node === null) {
      node = getNodeForOption('fallbackFocus');
    }
    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes2() {
    state.containerGroups = state.containers.map(function (container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions);
      var focusableNodes = focusable(container, config.tabbableOptions);
      var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
      var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
      var firstDomTabbableNode = focusableNodes.find(function (node) {
        return isTabbable(node);
      });
      var lastDomTabbableNode = focusableNodes
        .slice()
        .reverse()
        .find(function (node) {
          return isTabbable(node);
        });
      var posTabIndexesFound = !!tabbableNodes.find(function (node) {
        return getTabIndex(node) > 0;
      });
      return {
        container,
        tabbableNodes,
        focusableNodes,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var nodeIdx = tabbableNodes.indexOf(node);
          if (nodeIdx < 0) {
            if (forward) {
              return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function (el) {
                return isTabbable(el);
              });
            }
            return focusableNodes
              .slice(0, focusableNodes.indexOf(node))
              .reverse()
              .find(function (el) {
                return isTabbable(el);
              });
          }
          return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
        },
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function (group) {
      return group.tabbableNodes.length > 0;
    });
    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus')) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }
    if (
      state.containerGroups.find(function (g) {
        return g.posTabIndexesFound;
      }) &&
      state.containerGroups.length > 1
    ) {
      throw new Error(
        "At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.",
      );
    }
  };
  var _getActiveElement = function getActiveElement2(el) {
    var activeElement = el.activeElement;
    if (!activeElement) {
      return;
    }
    if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
      return _getActiveElement(activeElement.shadowRoot);
    }
    return activeElement;
  };
  var _tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }
    if (node === _getActiveElement(document)) {
      return;
    }
    if (!node || !node.focus) {
      _tryFocus(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll,
    });
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus', {
      params: [previousActiveElement],
    });
    return node ? node : node === false ? false : previousActiveElement;
  };
  var findNextNavNode = function findNextNavNode2(_ref3) {
    var target = _ref3.target,
      event = _ref3.event,
      _ref3$isBackward = _ref3.isBackward,
      isBackward = _ref3$isBackward === void 0 ? false : _ref3$isBackward;
    target = target || getActualTarget(event);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      var containerIndex = findContainerIndex(target, event);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
      if (containerIndex < 0) {
        if (isBackward) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (isBackward) {
        var startOfGroupIndex = state.tabbableGroups.findIndex(function (_ref4) {
          var firstTabbableNode = _ref4.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (
          startOfGroupIndex < 0 &&
          (containerGroup.container === target ||
            (isFocusable(target, config.tabbableOptions) &&
              !isTabbable(target, config.tabbableOptions) &&
              !containerGroup.nextTabbableNode(target, false)))
        ) {
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target, false);
        }
      } else {
        var lastOfGroupIndex = state.tabbableGroups.findIndex(function (_ref5) {
          var lastTabbableNode = _ref5.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (
          lastOfGroupIndex < 0 &&
          (containerGroup.container === target ||
            (isFocusable(target, config.tabbableOptions) &&
              !isTabbable(target, config.tabbableOptions) &&
              !containerGroup.nextTabbableNode(target)))
        ) {
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target);
        }
      }
    } else {
      destinationNode = getNodeForOption('fallbackFocus');
    }
    return destinationNode;
  };
  var checkPointerDown = function checkPointerDown2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      trap.deactivate({
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked (and if not focusable, to "nothing"); by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node), whether the
        //  outside click was on a focusable node or not
        returnFocus: config.returnFocusOnDeactivate,
      });
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
  };
  var checkFocusIn = function checkFocusIn2(event) {
    var target = getActualTarget(event);
    var targetContained = findContainerIndex(target, event) >= 0;
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      event.stopImmediatePropagation();
      var nextNode;
      var navAcrossContainers = true;
      if (state.mostRecentlyFocusedNode) {
        if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
          var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
          var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
          if (tabbableNodes.length > 0) {
            var mruTabIdx = tabbableNodes.findIndex(function (node) {
              return node === state.mostRecentlyFocusedNode;
            });
            if (mruTabIdx >= 0) {
              if (config.isKeyForward(state.recentNavEvent)) {
                if (mruTabIdx + 1 < tabbableNodes.length) {
                  nextNode = tabbableNodes[mruTabIdx + 1];
                  navAcrossContainers = false;
                }
              } else {
                if (mruTabIdx - 1 >= 0) {
                  nextNode = tabbableNodes[mruTabIdx - 1];
                  navAcrossContainers = false;
                }
              }
            }
          }
        } else {
          if (
            !state.containerGroups.some(function (g) {
              return g.tabbableNodes.some(function (n) {
                return getTabIndex(n) > 0;
              });
            })
          ) {
            navAcrossContainers = false;
          }
        }
      } else {
        navAcrossContainers = false;
      }
      if (navAcrossContainers) {
        nextNode = findNextNavNode({
          // move FROM the MRU node, not event-related node (which will be the node that is
          //  outside the trap causing the focus escape we're trying to fix)
          target: state.mostRecentlyFocusedNode,
          isBackward: config.isKeyBackward(state.recentNavEvent),
        });
      }
      if (nextNode) {
        _tryFocus(nextNode);
      } else {
        _tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
      }
    }
    state.recentNavEvent = void 0;
  };
  var checkKeyNav = function checkKeyNav2(event) {
    var isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    state.recentNavEvent = event;
    var destinationNode = findNextNavNode({
      event,
      isBackward,
    });
    if (destinationNode) {
      if (isTabEvent(event)) {
        event.preventDefault();
      }
      _tryFocus(destinationNode);
    }
  };
  var checkTabKey = function checkTabKey2(event) {
    if (config.isKeyForward(event) || config.isKeyBackward(event)) {
      checkKeyNav(event, config.isKeyBackward(event));
    }
  };
  var checkEscapeKey = function checkEscapeKey2(event) {
    if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
      event.preventDefault();
      trap.deactivate();
    }
  };
  var checkClick = function checkClick2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var addListeners = function addListeners2() {
    if (!state.active) {
      return;
    }
    activeFocusTraps.activateTrap(trapStack, trap);
    state.delayInitialFocusTimer = config.delayInitialFocus
      ? delay(function () {
          _tryFocus(getInitialFocusNode());
        })
      : _tryFocus(getInitialFocusNode());
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false,
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false,
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false,
    });
    doc.addEventListener('keydown', checkTabKey, {
      capture: true,
      passive: false,
    });
    doc.addEventListener('keydown', checkEscapeKey);
    return trap;
  };
  var removeListeners = function removeListeners2() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkTabKey, true);
    doc.removeEventListener('keydown', checkEscapeKey);
    return trap;
  };
  var checkDomRemoval = function checkDomRemoval2(mutations) {
    var isFocusedNodeRemoved = mutations.some(function (mutation) {
      var removedNodes = Array.from(mutation.removedNodes);
      return removedNodes.some(function (node) {
        return node === state.mostRecentlyFocusedNode;
      });
    });
    if (isFocusedNodeRemoved) {
      _tryFocus(getInitialFocusNode());
    }
  };
  var mutationObserver = typeof window !== 'undefined' && 'MutationObserver' in window ? new MutationObserver(checkDomRemoval) : void 0;
  var updateObservedNodes = function updateObservedNodes2() {
    if (!mutationObserver) {
      return;
    }
    mutationObserver.disconnect();
    if (state.active && !state.paused) {
      state.containers.map(function (container) {
        mutationObserver.observe(container, {
          subtree: true,
          childList: true,
        });
      });
    }
  };
  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;
      onActivate === null || onActivate === void 0 || onActivate();
      var finishActivation = function finishActivation2() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        updateObservedNodes();
        onPostActivate === null || onPostActivate === void 0 || onPostActivate();
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2(
        {
          onDeactivate: config.onDeactivate,
          onPostDeactivate: config.onPostDeactivate,
          checkCanReturnFocus: config.checkCanReturnFocus,
        },
        deactivateOptions,
      );
      clearTimeout(state.delayInitialFocusTimer);
      state.delayInitialFocusTimer = void 0;
      removeListeners();
      state.active = false;
      state.paused = false;
      updateObservedNodes();
      activeFocusTraps.deactivateTrap(trapStack, trap);
      var onDeactivate = getOption(options, 'onDeactivate');
      var onPostDeactivate = getOption(options, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(options, 'checkCanReturnFocus');
      var returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate');
      onDeactivate === null || onDeactivate === void 0 || onDeactivate();
      var finishDeactivation = function finishDeactivation2() {
        delay(function () {
          if (returnFocus) {
            _tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause(pauseOptions) {
      if (state.paused || !state.active) {
        return this;
      }
      var onPause = getOption(pauseOptions, 'onPause');
      var onPostPause = getOption(pauseOptions, 'onPostPause');
      state.paused = true;
      onPause === null || onPause === void 0 || onPause();
      removeListeners();
      updateObservedNodes();
      onPostPause === null || onPostPause === void 0 || onPostPause();
      return this;
    },
    unpause: function unpause(unpauseOptions) {
      if (!state.paused || !state.active) {
        return this;
      }
      var onUnpause = getOption(unpauseOptions, 'onUnpause');
      var onPostUnpause = getOption(unpauseOptions, 'onPostUnpause');
      state.paused = false;
      onUnpause === null || onUnpause === void 0 || onUnpause();
      updateTabbableNodes();
      addListeners();
      updateObservedNodes();
      onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      updateObservedNodes();
      return this;
    },
  };
  trap.updateContainerElements(elements);
  return trap;
};
function useFocusTrap(target, options = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = options;
  const hasFocus = ref(false);
  const isPaused = ref(false);
  const activate = opts => trap && trap.activate(opts);
  const deactivate = opts => trap && trap.deactivate(opts);
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.value = true;
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.value = false;
    }
  };
  const targets = computed(() => {
    const _targets = toValue4(target);
    return (Array.isArray(_targets) ? _targets : [_targets])
      .map(el => {
        const _el = toValue4(el);
        return typeof _el === 'string' ? _el : unrefElement2(_el);
      })
      .filter(notNullish2);
  });
  watch(
    targets,
    els => {
      if (!els.length) return;
      trap = createFocusTrap(els, {
        ...focusTrapOptions,
        onActivate() {
          hasFocus.value = true;
          if (options.onActivate) options.onActivate();
        },
        onDeactivate() {
          hasFocus.value = false;
          if (options.onDeactivate) options.onDeactivate();
        },
      });
      if (immediate) activate();
    },
    { flush: 'post' },
  );
  tryOnScopeDispose2(() => deactivate());
  return {
    hasFocus,
    isPaused,
    activate,
    deactivate,
    pause,
    unpause,
  };
}
var useActivatedFocusTrap = (
  { element, isActive, noTrap, fallbackFocus },
  focusTrapOpts = {
    allowOutsideClick: true,
    fallbackFocus: fallbackFocus.ref.value ?? void 0,
    escapeDeactivates: false,
  },
) => {
  const resolvedIsActive = readonly(toRef(isActive));
  const resolvedNoTrap = readonly(toRef(noTrap));
  const checkNeedsFocus = () => {
    var _a;
    const tabbableElements =
      (_a = element.value) == null
        ? void 0
        : _a.querySelectorAll(`a, button, input, select, textarea, [tabindex]:not([tabindex="-1"]):not(.${fallbackFocus.classSelector})`);
    return !tabbableElements || tabbableElements.length === 0;
  };
  const needsFallback = ref(checkNeedsFocus());
  onMounted(() => {
    useMutationObserver(
      element,
      () => {
        needsFallback.value = checkNeedsFocus();
      },
      { childList: true, subtree: true },
    );
  });
  const trap = useFocusTrap(element, focusTrapOpts);
  watch(resolvedIsActive, async newValue => {
    await nextTick();
    if (newValue && resolvedNoTrap.value === false) {
      trap.activate();
    } else {
      trap.deactivate();
    }
  });
  watch(resolvedNoTrap, newValue => {
    if (newValue === true) {
      trap.deactivate();
    }
  });
  return {
    needsFallback: readonly(needsFallback),
  };
};
var useScrollLock2 = createSharedComposable(useScrollLock);
var prevousRightPadding = '';
var lockRegistry = /* @__PURE__ */ new Map();
var useSafeScrollLock = (isOpen, bodyScroll) => {
  const resolvedIsOpen = readonly(toRef(isOpen));
  const id = useId();
  const inverseBodyScrollingValue = computed(() => !toValue(bodyScroll));
  const isLocked = useScrollLock2(
    typeof document !== 'undefined' ? document.body : null,
    resolvedIsOpen.value && inverseBodyScrollingValue.value,
  );
  onMounted(() => {
    if (typeof document === 'undefined') return;
    lockRegistry.set(id, false);
    watch(
      [resolvedIsOpen, inverseBodyScrollingValue],
      ([modelVal, bodyVal]) => {
        const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
        const hasLocked = Array.from(lockRegistry.values()).some(val => val === true);
        const myLocked = modelVal && bodyVal;
        lockRegistry.set(id, myLocked);
        if (myLocked && !hasLocked && !isLocked.value) {
          isLocked.value = true;
          if (scrollBarGap > 0) {
            prevousRightPadding = document.body.style.paddingRight;
            document.body.style.paddingRight = `${scrollBarGap + prevousRightPadding}px`;
          }
        }
        const hasLockedAfter = Array.from(lockRegistry.values()).some(val => val === true);
        if (hasLocked && !hasLockedAfter) {
          lockRegistry.set(id, false);
          isLocked.value = false;
          document.body.style.paddingRight = prevousRightPadding;
        }
      },
      { immediate: true },
    );
  });
  onUnmounted(() => {
    lockRegistry.delete(id);
    const hasLockedAfter = Array.from(lockRegistry.values()).some(val => val === true);
    if (!hasLockedAfter) {
      document.body.style.paddingRight = prevousRightPadding;
      isLocked.value = false;
    }
  });
};

// node_modules/bootstrap-vue-next/dist/BModalOrchestrator.vue_vue_type_script_setup_true_lang-CwsLFqd0.mjs
var _hoisted_125 = ['id', 'aria-labelledby', 'aria-describedby'];
var _hoisted_214 = ['id'];
var fallbackClassSelector = 'modal-fallback-focus';
var defaultModalDialogZIndex = 1056;
var _sfc_main$117 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BModal',
  props: mergeModels(
    {
      autofocus: { type: Boolean, default: true },
      autofocusButton: { default: void 0 },
      backdropFirst: { type: Boolean, default: false },
      body: { default: void 0 },
      bodyAttrs: { default: void 0 },
      bodyBgVariant: { default: null },
      bodyClass: { default: null },
      bodyScrolling: { type: Boolean, default: false },
      bodyTextVariant: { default: null },
      bodyVariant: { default: null },
      busy: { type: Boolean, default: false },
      buttonSize: { default: 'md' },
      cancelDisabled: { type: Boolean, default: false },
      cancelTitle: { default: 'Cancel' },
      cancelVariant: { default: 'secondary' },
      centered: { type: Boolean, default: false },
      contentClass: { default: void 0 },
      dialogClass: { default: void 0 },
      footerBgVariant: { default: null },
      footerBorderVariant: { default: null },
      footerClass: { default: void 0 },
      footerTextVariant: { default: null },
      footerVariant: { default: null },
      fullscreen: { type: [Boolean, String], default: false },
      headerBgVariant: { default: null },
      headerBorderVariant: { default: null },
      headerClass: { default: void 0 },
      headerCloseClass: { default: void 0 },
      headerCloseLabel: { default: 'Close' },
      headerCloseVariant: { default: 'secondary' },
      headerTextVariant: { default: null },
      headerVariant: { default: null },
      noBackdrop: { type: Boolean, default: false },
      noFooter: { type: Boolean, default: false },
      noHeader: { type: Boolean, default: false },
      noHeaderClose: { type: Boolean, default: false },
      id: { default: void 0 },
      modalClass: { default: void 0 },
      noCloseOnBackdrop: { type: Boolean, default: false },
      noCloseOnEsc: { type: Boolean, default: false },
      noTrap: { type: Boolean, default: false },
      noStacking: { type: Boolean },
      okDisabled: { type: Boolean, default: false },
      okOnly: { type: Boolean, default: false },
      okTitle: { default: 'OK' },
      okVariant: { default: 'primary' },
      scrollable: { type: Boolean, default: false },
      size: { default: 'md' },
      title: { default: void 0 },
      titleClass: { default: void 0 },
      titleVisuallyHidden: { type: Boolean, default: false },
      titleTag: { default: 'h5' },
      teleportDisabled: { type: Boolean, default: false },
      teleportTo: { default: 'body' },
      initialAnimation: { type: Boolean, default: false },
      noAnimation: { type: Boolean },
      noFade: { type: Boolean, default: false },
      lazy: { type: Boolean, default: false },
      unmountLazy: { type: Boolean, default: false },
      show: { type: Boolean, default: false },
      transProps: { default: void 0 },
      visible: { type: Boolean, default: false },
    },
    {
      modelValue: { type: Boolean, ...{ default: false } },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(
    [
      'backdrop',
      'cancel',
      'close',
      'esc',
      'ok',
      'hide',
      'hide-prevented',
      'hidden',
      'show',
      'show-prevented',
      'shown',
      'toggle',
      'toggle-prevented',
    ],
    ['update:modelValue'],
  ),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BModal');
    const emit = __emit;
    const slots = useSlots();
    const computedId = useId2(() => props.id, 'modal');
    const modelValue = useModel(__props, 'modelValue');
    const element = useTemplateRef('_element');
    const fallbackFocusElement = useTemplateRef('_fallbackFocusElement');
    const okButton = useTemplateRef('_okButton');
    const cancelButton = useTemplateRef('_cancelButton');
    const closeButton = useTemplateRef('_closeButton');
    const pickFocusItem = () => {
      if (props.autofocus === false) return;
      if (props.autofocusButton === 'ok') {
        okButtonFocus.value = true;
      } else if (props.autofocusButton === 'close') {
        closeButtonFocus.value = true;
      } else if (props.autofocusButton === 'cancel') {
        cancelButtonFocus.value = true;
      } else {
        modalFocus.value = true;
      }
    };
    const onAfterEnter = () => {
      pickFocusItem();
    };
    const {
      showRef,
      renderRef,
      renderBackdropRef,
      hide: hide2,
      show,
      toggle: toggle2,
      computedNoAnimation,
      transitionProps,
      backdropTransitionProps,
      isLeaving,
      isVisible: isVisible2,
      trapActive,
      contentShowing,
      backdropReady,
      backdropVisible,
    } = useShowHide(modelValue, props, emit, element, computedId, {
      // addShowClass: false,
      transitionProps: {
        onAfterEnter,
      },
    });
    const { needsFallback } = useActivatedFocusTrap({
      element,
      isActive: trapActive,
      noTrap: () => props.noTrap,
      fallbackFocus: {
        ref: fallbackFocusElement,
        classSelector: fallbackClassSelector,
      },
    });
    onKeyStroke(
      'Escape',
      () => {
        hide2('esc');
      },
      { target: element },
    );
    useSafeScrollLock(showRef, () => props.bodyScrolling);
    const { focused: modalFocus } = useFocus(element, {
      initialValue: modelValue.value && props.autofocusButton === void 0 && props.autofocus === true,
    });
    const { focused: okButtonFocus } = useFocus(okButton, {
      initialValue: modelValue.value && props.autofocusButton === 'ok' && props.autofocus === true,
    });
    const { focused: cancelButtonFocus } = useFocus(cancelButton, {
      initialValue: modelValue.value && props.autofocusButton === 'cancel' && props.autofocus === true,
    });
    const { focused: closeButtonFocus } = useFocus(closeButton, {
      initialValue: modelValue.value && props.autofocusButton === 'close' && props.autofocus === true,
    });
    const hasHeaderCloseSlot = computed(() => !isEmptySlot(slots['header-close']));
    const modalDialogClasses = computed(() => [
      props.dialogClass,
      {
        'modal-fullscreen': props.fullscreen === true,
        [`modal-fullscreen-${props.fullscreen}-down`]: typeof props.fullscreen === 'string',
        [`modal-${props.size}`]: props.size !== 'md',
        'modal-dialog-centered': props.centered,
        'modal-dialog-scrollable': props.scrollable,
      },
    ]);
    const bodyColorClasses = useColorVariantClasses(() => ({
      bgVariant: props.bodyBgVariant,
      textVariant: props.bodyTextVariant,
      variant: props.bodyVariant,
    }));
    const bodyClasses = computed(() => [props.bodyClass, bodyColorClasses.value]);
    const headerColorClasses = useColorVariantClasses(() => ({
      bgVariant: props.headerBgVariant,
      textVariant: props.headerTextVariant,
      variant: props.headerVariant,
      borderVariant: props.headerBorderVariant,
    }));
    const headerClasses = computed(() => [props.headerClass, headerColorClasses.value]);
    const headerCloseAttrs = computed(() => ({
      variant: hasHeaderCloseSlot.value ? props.headerCloseVariant : void 0,
      class: props.headerCloseClass,
    }));
    const footerColorClasses = useColorVariantClasses(() => ({
      bgVariant: props.footerBgVariant,
      textVariant: props.footerTextVariant,
      variant: props.footerVariant,
      borderVariant: props.footerBorderVariant,
    }));
    const footerClasses = computed(() => [props.footerClass, footerColorClasses.value]);
    const titleClasses = computed(() => [
      props.titleClass,
      {
        ['visually-hidden']: props.titleVisuallyHidden,
      },
    ]);
    const disableCancel = computed(() => props.cancelDisabled || props.busy);
    const disableOk = computed(() => props.okDisabled || props.busy);
    const { activePosition, activeModalCount, stackWithoutSelf } = useModalManager(showRef, modelValue.value);
    watch(stackWithoutSelf, (newValue, oldValue) => {
      if (newValue.length > oldValue.length && showRef.value === true && props.noStacking === true) hide2();
    });
    const computedZIndexNumber = computed(() =>
      // Make sure that newly opened modals have a higher z-index than currently active ones.
      // All active modals have a z-index of ('defaultZIndex' - 'stackSize' - 'positionInStack').
      //
      // This means inactive modals will already be higher than active ones when opened.
      showRef.value || isLeaving.value
        ? // Just for reference there is a single frame in which the modal is not active but still has a higher z-index than the active ones due to _when_ it calculates its position. It's a small visual effect
          defaultModalDialogZIndex -
          (((activeModalCount == null ? void 0 : activeModalCount.value) ?? 0) * 2 -
            ((activePosition == null ? void 0 : activePosition.value) ?? 0) * 2)
        : defaultModalDialogZIndex,
    );
    const computedZIndex = computed(() => ({
      'z-index': computedZIndexNumber.value,
    }));
    const computedZIndexBackdrop = computed(() => ({
      'z-index': computedZIndexNumber.value - 1,
    }));
    const sharedSlots = computed(() => ({
      cancel: () => {
        hide2('cancel');
      },
      close: () => {
        hide2('close');
      },
      hide: hide2,
      ok: () => {
        hide2('ok');
      },
      active: showRef.value,
      visible: showRef.value,
    }));
    __expose({
      hide: hide2,
      id: computedId,
      show,
      toggle: toggle2,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main,
          {
            to: unref(props).teleportTo,
            disabled: unref(props).teleportDisabled,
          },
          {
            default: withCtx(() => [
              unref(renderRef) || unref(contentShowing)
                ? (openBlock(),
                  createBlock(
                    Transition,
                    mergeProps({ key: 0 }, unref(transitionProps), {
                      appear: modelValue.value || unref(props).visible,
                      onAfterEnter,
                    }),
                    {
                      default: withCtx(() => [
                        withDirectives(
                          createBaseVNode(
                            'div',
                            mergeProps(
                              {
                                id: unref(computedId),
                                ref: '_element',
                                class: [
                                  'modal',
                                  [
                                    unref(props).modalClass,
                                    {
                                      fade: !unref(computedNoAnimation),
                                      show: unref(isVisible2),
                                    },
                                  ],
                                ],
                                role: 'dialog',
                                'aria-labelledby': !unref(props).noHeader ? `${unref(computedId)}-label` : void 0,
                                'aria-describedby': `${unref(computedId)}-body`,
                                tabindex: '-1',
                              },
                              _ctx.$attrs,
                              {
                                style: computedZIndex.value,
                                onClick: _cache[4] || (_cache[4] = withModifiers($event => unref(hide2)('backdrop'), ['self'])),
                              },
                            ),
                            [
                              createBaseVNode(
                                'div',
                                {
                                  class: normalizeClass(['modal-dialog', modalDialogClasses.value]),
                                },
                                [
                                  unref(contentShowing)
                                    ? (openBlock(),
                                      createElementBlock(
                                        'div',
                                        {
                                          key: 0,
                                          class: normalizeClass(['modal-content', unref(props).contentClass]),
                                        },
                                        [
                                          !unref(props).noHeader
                                            ? (openBlock(),
                                              createElementBlock(
                                                'div',
                                                {
                                                  key: 0,
                                                  class: normalizeClass(['modal-header', headerClasses.value]),
                                                },
                                                [
                                                  renderSlot(
                                                    _ctx.$slots,
                                                    'header',
                                                    normalizeProps(guardReactiveProps(sharedSlots.value)),
                                                    () => [
                                                      (openBlock(),
                                                      createBlock(
                                                        resolveDynamicComponent(unref(props).titleTag),
                                                        {
                                                          id: `${unref(computedId)}-label`,
                                                          class: normalizeClass(['modal-title', titleClasses.value]),
                                                        },
                                                        {
                                                          default: withCtx(() => [
                                                            renderSlot(
                                                              _ctx.$slots,
                                                              'title',
                                                              normalizeProps(guardReactiveProps(sharedSlots.value)),
                                                              () => [createTextVNode(toDisplayString(unref(props).title), 1)],
                                                              true,
                                                            ),
                                                          ]),
                                                          _: 3,
                                                        },
                                                        8,
                                                        ['id', 'class'],
                                                      )),
                                                      !unref(props).noHeaderClose
                                                        ? (openBlock(),
                                                          createElementBlock(
                                                            Fragment,
                                                            { key: 0 },
                                                            [
                                                              hasHeaderCloseSlot.value
                                                                ? (openBlock(),
                                                                  createBlock(
                                                                    _sfc_main8,
                                                                    mergeProps({ key: 0 }, headerCloseAttrs.value, {
                                                                      onClick: _cache[0] || (_cache[0] = $event => unref(hide2)('close')),
                                                                    }),
                                                                    {
                                                                      default: withCtx(() => [
                                                                        renderSlot(_ctx.$slots, 'header-close', {}, void 0, true),
                                                                      ]),
                                                                      _: 3,
                                                                    },
                                                                    16,
                                                                  ))
                                                                : (openBlock(),
                                                                  createBlock(
                                                                    _sfc_main5,
                                                                    mergeProps(
                                                                      {
                                                                        key: 1,
                                                                        'aria-label': unref(props).headerCloseLabel,
                                                                      },
                                                                      headerCloseAttrs.value,
                                                                      {
                                                                        onClick: _cache[1] || (_cache[1] = $event => unref(hide2)('close')),
                                                                      },
                                                                    ),
                                                                    null,
                                                                    16,
                                                                    ['aria-label'],
                                                                  )),
                                                            ],
                                                            64,
                                                          ))
                                                        : createCommentVNode('', true),
                                                    ],
                                                    true,
                                                  ),
                                                ],
                                                2,
                                              ))
                                            : createCommentVNode('', true),
                                          createBaseVNode(
                                            'div',
                                            mergeProps(
                                              {
                                                id: `${unref(computedId)}-body`,
                                                class: ['modal-body', bodyClasses.value],
                                              },
                                              unref(props).bodyAttrs,
                                            ),
                                            [
                                              renderSlot(
                                                _ctx.$slots,
                                                'default',
                                                normalizeProps(guardReactiveProps(sharedSlots.value)),
                                                () => [createTextVNode(toDisplayString(unref(props).body), 1)],
                                                true,
                                              ),
                                            ],
                                            16,
                                            _hoisted_214,
                                          ),
                                          !unref(props).noFooter
                                            ? (openBlock(),
                                              createElementBlock(
                                                'div',
                                                {
                                                  key: 1,
                                                  class: normalizeClass(['modal-footer', footerClasses.value]),
                                                },
                                                [
                                                  renderSlot(
                                                    _ctx.$slots,
                                                    'footer',
                                                    normalizeProps(guardReactiveProps(sharedSlots.value)),
                                                    () => [
                                                      renderSlot(
                                                        _ctx.$slots,
                                                        'cancel',
                                                        normalizeProps(guardReactiveProps(sharedSlots.value)),
                                                        () => [
                                                          !unref(props).okOnly
                                                            ? (openBlock(),
                                                              createBlock(
                                                                _sfc_main8,
                                                                {
                                                                  key: 0,
                                                                  ref: '_cancelButton',
                                                                  disabled: disableCancel.value,
                                                                  size: unref(props).buttonSize,
                                                                  variant: unref(props).cancelVariant,
                                                                  onClick: _cache[2] || (_cache[2] = $event => unref(hide2)('cancel')),
                                                                },
                                                                {
                                                                  default: withCtx(() => [
                                                                    createTextVNode(toDisplayString(unref(props).cancelTitle), 1),
                                                                  ]),
                                                                  _: 1,
                                                                },
                                                                8,
                                                                ['disabled', 'size', 'variant'],
                                                              ))
                                                            : createCommentVNode('', true),
                                                        ],
                                                        true,
                                                      ),
                                                      renderSlot(
                                                        _ctx.$slots,
                                                        'ok',
                                                        normalizeProps(guardReactiveProps(sharedSlots.value)),
                                                        () => [
                                                          createVNode(
                                                            _sfc_main8,
                                                            {
                                                              ref: '_okButton',
                                                              disabled: disableOk.value,
                                                              size: unref(props).buttonSize,
                                                              variant: unref(props).okVariant,
                                                              onClick: _cache[3] || (_cache[3] = $event => unref(hide2)('ok')),
                                                            },
                                                            {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(unref(props).okTitle), 1),
                                                              ]),
                                                              _: 1,
                                                            },
                                                            8,
                                                            ['disabled', 'size', 'variant'],
                                                          ),
                                                        ],
                                                        true,
                                                      ),
                                                    ],
                                                    true,
                                                  ),
                                                ],
                                                2,
                                              ))
                                            : createCommentVNode('', true),
                                        ],
                                        2,
                                      ))
                                    : createCommentVNode('', true),
                                ],
                                2,
                              ),
                              unref(needsFallback)
                                ? (openBlock(),
                                  createElementBlock(
                                    'div',
                                    {
                                      key: 0,
                                      ref: '_fallbackFocusElement',
                                      class: normalizeClass(fallbackClassSelector),
                                      tabindex: '0',
                                      style: { width: '0', height: '0', overflow: 'hidden' },
                                    },
                                    null,
                                    512,
                                  ))
                                : createCommentVNode('', true),
                            ],
                            16,
                            _hoisted_125,
                          ),
                          [
                            [
                              vShow,
                              unref(showRef) && ((unref(backdropReady) && unref(props).backdropFirst) || !unref(props).backdropFirst),
                            ],
                          ],
                        ),
                      ]),
                      _: 3,
                    },
                    16,
                    ['appear'],
                  ))
                : createCommentVNode('', true),
              !unref(props).noBackdrop
                ? renderSlot(
                    _ctx.$slots,
                    'backdrop',
                    normalizeProps(mergeProps({ key: 1 }, sharedSlots.value)),
                    () => [
                      unref(renderBackdropRef)
                        ? (openBlock(),
                          createBlock(
                            Transition,
                            normalizeProps(mergeProps({ key: 0 }, unref(backdropTransitionProps))),
                            {
                              default: withCtx(() => [
                                withDirectives(
                                  createBaseVNode(
                                    'div',
                                    {
                                      class: normalizeClass([
                                        'modal-backdrop',
                                        {
                                          fade: !unref(computedNoAnimation),
                                          show: unref(backdropVisible) || unref(computedNoAnimation),
                                        },
                                      ]),
                                      style: normalizeStyle(computedZIndexBackdrop.value),
                                      onClick: _cache[5] || (_cache[5] = $event => unref(hide2)('backdrop')),
                                    },
                                    null,
                                    6,
                                  ),
                                  [
                                    [
                                      vShow,
                                      unref(showRef) || (unref(isLeaving) && unref(props).backdropFirst && !unref(computedNoAnimation)),
                                    ],
                                  ],
                                ),
                              ]),
                              _: 1,
                            },
                            16,
                          ))
                        : createCommentVNode('', true),
                    ],
                    true,
                  )
                : createCommentVNode('', true),
            ]),
            _: 3,
          },
          8,
          ['to', 'disabled'],
        )
      );
    };
  },
});
var BModal = _export_sfc(_sfc_main$117, [['__scopeId', 'data-v-93972863']]);
var _sfc_main39 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BModalOrchestrator',
  props: {
    teleportDisabled: { type: Boolean, default: false },
    teleportTo: { default: 'body' },
  },
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, 'BModalOrchestrator');
    const tools = useModalController();
    __expose({
      ...tools,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main,
          {
            to: unref(props).teleportTo,
            disabled: unref(props).teleportDisabled,
          },
          {
            default: withCtx(() => {
              var _a;
              return [
                createBaseVNode(
                  'div',
                  mergeProps({ id: '__BVID__modal-container' }, _ctx.$attrs),
                  [
                    (openBlock(true),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList((_a = unref(tools).modals) == null ? void 0 : _a.value, ([self2, modal]) => {
                        return (
                          openBlock(),
                          createBlock(
                            resolveDynamicComponent(modal.component ?? BModal),
                            mergeProps(
                              {
                                key: self2,
                                ref_for: true,
                              },
                              modal.props,
                              {
                                modelValue: modal.props._modelValue,
                                'onUpdate:modelValue': [
                                  $event => (modal.props._modelValue = $event),
                                  $event => {
                                    var _a2, _b;
                                    return (_b = (_a2 = unref(tools)).leave) == null ? void 0 : _b.call(_a2, self2);
                                  },
                                ],
                                'initial-animation': '',
                                'teleport-disabled': true,
                                onHide: e => {
                                  if (modal.props._isConfirm === true) {
                                    if (e.trigger === 'ok') {
                                      modal.props._promise.resolve(true);
                                      return;
                                    }
                                    if (e.trigger === 'cancel') {
                                      modal.props._promise.resolve(false);
                                      return;
                                    }
                                    modal.props._promise.resolve(null);
                                  }
                                  modal.props._promise.resolve(true);
                                },
                                onHidden: $event => {
                                  var _a2, _b;
                                  return (_b = (_a2 = unref(tools)).remove) == null ? void 0 : _b.call(_a2, self2);
                                },
                              },
                            ),
                            null,
                            16,
                            ['modelValue', 'onUpdate:modelValue', 'onHide', 'onHidden'],
                          )
                        );
                      }),
                      128,
                    )),
                  ],
                  16,
                ),
              ];
            }),
            _: 1,
          },
          8,
          ['to', 'disabled'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BNavText.vue_vue_type_script_setup_true_lang-Bq76AlQQ.mjs
var _sfc_main$43 = defineComponent({
  __name: 'BNav',
  props: {
    align: { default: void 0 },
    cardHeader: { type: Boolean, default: false },
    fill: { type: Boolean, default: false },
    justified: { type: Boolean, default: false },
    pills: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    tabs: { type: Boolean, default: false },
    tag: { default: 'ul' },
    underline: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BNav');
    const alignment = useAlignment(() => props.align);
    const computedClasses = computed(() => ({
      'nav-tabs': props.tabs,
      'nav-pills': props.pills && !props.tabs,
      'card-header-tabs': !props.vertical && props.cardHeader && props.tabs,
      'card-header-pills': !props.vertical && props.cardHeader && props.pills && !props.tabs,
      'flex-column': props.vertical,
      'nav-fill': !props.vertical && props.fill,
      'nav-justified': !props.vertical && props.justified,
      [alignment.value]: !props.vertical && props.align !== void 0,
      small: props.small,
      'nav-underline': props.underline,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass(['nav', computedClasses.value]),
          },
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          8,
          ['class'],
        )
      );
    };
  },
});
var _sfc_main$34 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BNavForm',
  props: {
    role: { default: void 0 },
    wrapperAttrs: { default: void 0 },
    formClass: { default: void 0 },
    floating: { type: Boolean, default: void 0 },
    id: { default: void 0 },
    novalidate: { type: Boolean, default: void 0 },
    validated: { type: Boolean, default: void 0 },
  },
  emits: ['submit'],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BNavForm');
    const emit = __emit;
    const attrs = useAttrs();
    const processedAttrs = computed(() => {
      const { class: wrapperClass, ...formAttrs } = attrs;
      return { wrapperClass, formAttrs };
    });
    const submitted = e => {
      emit('submit', e);
    };
    const liClasses = computed(() => ['d-flex', 'flex-row', 'align-items-center', 'flex-wrap', processedAttrs.value.wrapperClass]);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'li',
          mergeProps({ class: liClasses.value }, _ctx.wrapperAttrs),
          [
            createVNode(
              _sfc_main24,
              mergeProps(processedAttrs.value.formAttrs, {
                id: unref(props).id,
                floating: unref(props).floating,
                role: unref(props).role,
                novalidate: unref(props).novalidate,
                validated: unref(props).validated,
                class: ['d-flex', unref(props).formClass],
                onSubmit: withModifiers(submitted, ['prevent']),
              }),
              {
                default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
                _: 3,
              },
              16,
              ['id', 'floating', 'role', 'novalidate', 'validated', 'class'],
            ),
          ],
          16,
        )
      );
    };
  },
});
var _hoisted_1$22 = { class: 'nav-item' };
var _sfc_main$24 = defineComponent({
  __name: 'BNavItem',
  props: {
    linkAttrs: { default: void 0 },
    linkClass: { default: void 0 },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    prefetchedClass: {},
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: void 0 },
  },
  emits: ['click'],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BNavItem');
    const emit = __emit;
    const computedLinkProps = computed(() =>
      pick(props, [
        'active',
        'activeClass',
        'exactActiveClass',
        'append',
        'disabled',
        'href',
        'icon',
        'opacity',
        'opacityHover',
        'rel',
        'replace',
        'routerComponentName',
        'target',
        'to',
        'underlineOffset',
        'underlineOffsetHover',
        'underlineOpacity',
        'underlineOpacityHover',
        'underlineVariant',
        'variant',
      ]),
    );
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('li', _hoisted_1$22, [
          createVNode(
            _sfc_main7,
            mergeProps(
              {
                class: ['nav-link', _ctx.linkClass],
                tabindex: unref(props).disabled ? -1 : void 0,
                'aria-disabled': unref(props).disabled ? true : void 0,
              },
              { ...computedLinkProps.value, ..._ctx.linkAttrs },
              {
                onClick: _cache[0] || (_cache[0] = $event => emit('click', $event)),
              },
            ),
            {
              default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
              _: 3,
            },
            16,
            ['class', 'tabindex', 'aria-disabled'],
          ),
          renderSlot(_ctx.$slots, 'after'),
        ])
      );
    };
  },
});
var _hoisted_1$19 = { class: 'nav-item dropdown' };
var _sfc_main$118 = defineComponent({
  __name: 'BNavItemDropdown',
  props: mergeModels(
    {
      ariaLabel: { default: void 0 },
      autoClose: { type: [Boolean, String], default: true },
      boundary: { default: 'clippingAncestors' },
      boundaryPadding: { default: void 0 },
      disabled: { type: Boolean, default: false },
      floatingMiddleware: { default: void 0 },
      id: { default: void 0 },
      isNav: { type: Boolean, default: true },
      menuClass: { default: void 0 },
      noCaret: { type: Boolean, default: false },
      noFlip: { type: Boolean, default: false },
      noShift: { type: Boolean, default: false },
      noSize: { type: Boolean, default: false },
      offset: { default: 0 },
      role: { default: 'menu' },
      size: { default: 'md' },
      noWrapper: { type: Boolean, default: void 0 },
      split: { type: Boolean, default: false },
      splitButtonType: { default: 'button' },
      splitClass: { default: void 0 },
      splitDisabled: { type: Boolean, default: void 0 },
      splitHref: { default: void 0 },
      splitTo: { default: void 0 },
      splitVariant: { default: void 0 },
      strategy: { default: 'absolute' },
      text: { default: void 0 },
      toggleClass: { default: void 0 },
      toggleText: { default: 'Toggle dropdown' },
      variant: { default: 'link' },
      wrapperClass: { default: void 0 },
      placement: { default: void 0 },
      teleportDisabled: { type: Boolean, default: false },
      teleportTo: { default: void 0 },
      initialAnimation: { type: Boolean, default: false },
      noAnimation: { type: Boolean },
      noFade: { type: Boolean },
      lazy: { type: Boolean, default: false },
      unmountLazy: { type: Boolean },
      show: { type: Boolean },
      transProps: {},
      visible: { type: Boolean },
    },
    {
      modelValue: { type: Boolean, ...{ default: false } },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(
    ['split-click', 'hide', 'hide-prevented', 'hidden', 'show', 'show-prevented', 'shown', 'toggle', 'toggle-prevented'],
    ['update:modelValue'],
  ),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BNavItemDropdown');
    const emit = __emit;
    const modelValue = useModel(__props, 'modelValue');
    const dropdown = useTemplateRef('_dropdown');
    const hide2 = () => {
      var _a;
      (_a = dropdown.value) == null ? void 0 : _a.hide();
    };
    const show = () => {
      var _a;
      (_a = dropdown.value) == null ? void 0 : _a.show();
    };
    const toggle2 = () => {
      var _a;
      (_a = dropdown.value) == null ? void 0 : _a.toggle();
    };
    __expose({
      hide: hide2,
      show,
      toggle: toggle2,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('li', _hoisted_1$19, [
          createVNode(
            BDropdown,
            mergeProps({ ref: '_dropdown' }, unref(props), {
              modelValue: modelValue.value,
              'onUpdate:modelValue': _cache[0] || (_cache[0] = $event => (modelValue.value = $event)),
              'is-nav': '',
              onShow: _cache[1] || (_cache[1] = $event => emit('show', $event)),
              onShown: _cache[2] || (_cache[2] = $event => emit('shown', $event)),
              onHide: _cache[3] || (_cache[3] = $event => emit('hide', $event)),
              onHidden: _cache[4] || (_cache[4] = $event => emit('hidden', $event)),
              onHidePrevented: _cache[5] || (_cache[5] = $event => emit('hide-prevented', $event)),
              onShowPrevented: _cache[6] || (_cache[6] = $event => emit('show-prevented', $event)),
              onTogglePrevented: _cache[7] || (_cache[7] = $event => emit('toggle-prevented', $event)),
              onToggle: _cache[8] || (_cache[8] = $event => emit('toggle', $event)),
              onSplitClick: _cache[9] || (_cache[9] = $event => emit('split-click', $event)),
            }),
            {
              'button-content': withCtx(() => [renderSlot(_ctx.$slots, 'button-content')]),
              'toggle-text': withCtx(() => [renderSlot(_ctx.$slots, 'toggle-text')]),
              default: withCtx(() => [
                renderSlot(_ctx.$slots, 'default', {
                  hide: hide2,
                  show,
                }),
              ]),
              _: 3,
            },
            16,
            ['modelValue'],
          ),
        ])
      );
    };
  },
});
var _hoisted_126 = { class: 'navbar-text' };
var _sfc_main40 = defineComponent({
  __name: 'BNavText',
  props: {
    text: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BNavText');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('li', _hoisted_126, [
          renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(unref(props).text), 1)]),
        ])
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BNavbarToggle.vue_vue_type_script_setup_true_lang-CCIDsf4z.mjs
var useContainerClasses = value =>
  computed(() => {
    const resolvedValue = toValue(value);
    return {
      container: resolvedValue === true,
      [`container-${resolvedValue}`]: typeof resolvedValue === 'string',
    };
  });
var _sfc_main$35 = defineComponent({
  __name: 'BNavbar',
  props: {
    autoClose: { type: Boolean, default: true },
    container: { type: [Boolean, String], default: 'fluid' },
    fixed: { default: void 0 },
    print: { type: Boolean, default: false },
    sticky: { default: void 0 },
    tag: { default: 'nav' },
    toggleable: { type: [Boolean, String], default: false },
    variant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BNavbar');
    const computedRole = computed(() => (props.tag === 'nav' ? void 0 : 'navigation'));
    const containerClass = useContainerClasses(() => props.container);
    const colorClasses = useColorVariantClasses(
      computed(() => ({
        bgVariant: props.variant,
      })),
    );
    const computedClasses = computed(() => [
      colorClasses.value,
      {
        'd-print': props.print,
        [`sticky-${props.sticky}`]: props.sticky !== void 0,
        [`fixed-${props.fixed}`]: props.fixed !== void 0,
        'navbar-expand': props.toggleable === false,
        [`navbar-expand-${props.toggleable}`]: typeof props.toggleable === 'string',
      },
    ]);
    provide(navbarInjectionKey, {
      tag: toRef(() => props.tag),
      autoClose: toRef(() => props.autoClose),
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            class: normalizeClass(['navbar', computedClasses.value]),
            role: computedRole.value,
          },
          {
            default: withCtx(() => [
              unref(props).container !== false
                ? (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 0,
                      class: normalizeClass(unref(containerClass)),
                    },
                    [renderSlot(_ctx.$slots, 'default')],
                    2,
                  ))
                : renderSlot(_ctx.$slots, 'default', { key: 1 }),
            ]),
            _: 3,
          },
          8,
          ['class', 'role'],
        )
      );
    };
  },
});
var _sfc_main$25 = defineComponent({
  __name: 'BNavbarBrand',
  props: {
    tag: { default: 'div' },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    prefetchedClass: {},
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BNavbarBrand');
    const { computedLink, computedLinkProps } = useBLinkHelper(props, [
      'active',
      'activeClass',
      'append',
      'disabled',
      'href',
      'rel',
      'replace',
      'routerComponentName',
      'target',
      'to',
      'variant',
      'opacity',
      'opacityHover',
      'underlineVariant',
      'underlineOffset',
      'underlineOffsetHover',
      'underlineOpacity',
      'underlineOpacityHover',
      'icon',
    ]);
    const computedTag = computed(() => (computedLink.value ? _sfc_main7 : props.tag));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(computedTag.value),
          mergeProps({ class: 'navbar-brand' }, unref(computedLinkProps)),
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          16,
        )
      );
    };
  },
});
var _sfc_main$119 = defineComponent({
  __name: 'BNavbarNav',
  props: {
    align: { default: void 0 },
    fill: { type: Boolean, default: false },
    justified: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    tag: { default: 'ul' },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BNavbarNav');
    const alignment = useAlignment(() => props.align);
    const computedClasses = computed(() => ({
      'nav-fill': props.fill,
      'nav-justified': props.justified,
      [alignment.value]: props.align !== void 0,
      small: props.small,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'ul',
          {
            class: normalizeClass(['navbar-nav', computedClasses.value]),
          },
          [renderSlot(_ctx.$slots, 'default')],
          2,
        )
      );
    };
  },
});
var _hoisted_127 = ['disabled', 'aria-label'];
var _sfc_main41 = defineComponent({
  __name: 'BNavbarToggle',
  props: {
    disabled: { type: Boolean, default: false },
    label: { default: 'Toggle navigation' },
    target: { default: void 0 },
  },
  emits: ['click'],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BNavbarToggle');
    const emit = __emit;
    const computedClasses = computed(() => ({
      disabled: props.disabled,
    }));
    const showHideData = inject(globalShowHideStorageInjectionKey, void 0);
    const collapseExpanded = computed(() => {
      var _a;
      if (!props.target || !showHideData) return false;
      if (typeof props.target === 'string') return ((_a = showHideData.map[props.target]) == null ? void 0 : _a.value) || false;
      return props.target.some(target => {
        var _a2;
        return (_a2 = showHideData.map[target]) == null ? void 0 : _a2.value;
      });
    });
    const toggleExpand = () => {
      var _a;
      if (!props.target || !showHideData) return;
      if (typeof props.target === 'string') {
        (_a = showHideData.map[props.target]) == null ? void 0 : _a.toggle();
        return;
      }
      props.target.forEach(target => {
        var _a2;
        return (_a2 = showHideData.map[target]) == null ? void 0 : _a2.toggle();
      });
    };
    const onClick = e => {
      if (!props.disabled) {
        emit('click', e);
        toggleExpand();
      }
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'button',
          {
            class: normalizeClass(['navbar-toggler', computedClasses.value]),
            type: 'button',
            disabled: unref(props).disabled,
            'aria-label': unref(props).label,
            onClick,
          },
          [
            renderSlot(_ctx.$slots, 'default', { expanded: collapseExpanded.value }, () => [
              _cache[0] || (_cache[0] = createBaseVNode('span', { class: 'navbar-toggler-icon' }, null, -1)),
            ]),
          ],
          10,
          _hoisted_127,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BOffcanvas-BEhqT7oK.mjs
var _hoisted_128 = ['id', 'aria-labelledby'];
var _hoisted_215 = ['id'];
var fallbackClassSelector2 = 'offcanvas-fallback-focus';
var _sfc_main42 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BOffcanvas',
  props: mergeModels(
    {
      noBackdrop: { type: Boolean, default: false },
      backdropFirst: { type: Boolean, default: false },
      bodyAttrs: { default: void 0 },
      bodyClass: { default: void 0 },
      bodyScrolling: { type: Boolean, default: false },
      footerClass: { default: void 0 },
      headerClass: { default: void 0 },
      headerCloseClass: { default: void 0 },
      headerCloseLabel: { default: 'Close' },
      headerCloseVariant: { default: 'secondary' },
      id: { default: void 0 },
      noCloseOnBackdrop: { type: Boolean, default: false },
      noCloseOnEsc: { type: Boolean, default: false },
      noFocus: { type: Boolean, default: false },
      noHeader: { type: Boolean, default: false },
      noTrap: { type: Boolean, default: false },
      noHeaderClose: { type: Boolean, default: false },
      placement: { default: 'start' },
      shadow: { type: [String, Boolean], default: false },
      title: { default: void 0 },
      responsive: {},
      width: { default: void 0 },
      teleportDisabled: { type: Boolean, default: false },
      teleportTo: { default: 'body' },
      initialAnimation: { type: Boolean, default: false },
      noAnimation: { type: Boolean, default: false },
      noFade: { type: Boolean },
      lazy: { type: Boolean, default: false },
      unmountLazy: { type: Boolean, default: false },
      show: { type: Boolean, default: false },
      transProps: {},
      visible: { type: Boolean, default: false },
    },
    {
      modelValue: {
        type: Boolean,
        ...{
          default: false,
        },
      },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(
    [
      'close',
      'esc',
      'backdrop',
      'breakpoint',
      'hide',
      'hide-prevented',
      'hidden',
      'show',
      'show-prevented',
      'shown',
      'toggle',
      'toggle-prevented',
    ],
    ['update:modelValue'],
  ),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BOffcanvas');
    const emit = __emit;
    const slots = useSlots();
    const modelValue = useModel(__props, 'modelValue');
    const computedId = useId2(() => props.id, 'offcanvas');
    const element = useTemplateRef('_element');
    const fallbackFocusElement = useTemplateRef('_fallbackFocusElement');
    const onAfterEnter = () => {
      nextTick(() => {
        if (props.noFocus === false && !isOpenByBreakpoint.value) {
          focused.value = true;
        }
      });
    };
    const {
      showRef,
      renderRef,
      renderBackdropRef,
      hide: hide2,
      show,
      toggle: toggle2,
      computedNoAnimation,
      contentShowing,
      transitionProps,
      backdropReady,
      backdropTransitionProps,
      backdropVisible,
      isVisible: isVisible2,
      buildTriggerableEvent,
      localNoAnimation,
      isLeaving,
      trapActive,
    } = useShowHide(modelValue, props, emit, element, computedId, {
      transitionProps: {
        onAfterEnter,
        enterToClass: 'showing',
        leaveToClass: 'hiding',
        enterActiveClass: '',
        leaveActiveClass: '',
        enterFromClass: '',
        leaveFromClass: '',
      },
    });
    const breakpoints = useBreakpoints(breakpointsBootstrapV5);
    const smallerOrEqualToBreakpoint = breakpoints.smallerOrEqual(() => props.responsive ?? 'xs');
    const isOpenByBreakpoint = ref(props.responsive !== void 0 && !smallerOrEqualToBreakpoint.value);
    onMounted(() => {
      if (props.responsive !== void 0) emit('breakpoint', buildTriggerableEvent('breakpoint'), isOpenByBreakpoint.value);
    });
    useSafeScrollLock(showRef, () => props.bodyScrolling || isOpenByBreakpoint.value);
    onKeyStroke(
      'Escape',
      () => {
        hide2('esc');
      },
      { target: element },
    );
    const { focused } = useFocus(element, {
      initialValue: modelValue.value && props.noFocus === false && !isOpenByBreakpoint.value,
    });
    const { needsFallback } = useActivatedFocusTrap({
      element,
      isActive: trapActive,
      noTrap: () => props.noTrap || isOpenByBreakpoint.value,
      fallbackFocus: {
        classSelector: fallbackClassSelector2,
        ref: fallbackFocusElement,
      },
    });
    const showBackdrop = computed(
      () =>
        (props.responsive === void 0 || !isOpenByBreakpoint.value) &&
        props.noBackdrop === false &&
        (showRef.value === true || (isLeaving.value && props.backdropFirst && !computedNoAnimation.value)),
    );
    const hasHeaderCloseSlot = computed(() => !isEmptySlot(slots['header-close']));
    const headerCloseClasses = computed(() => [{ 'text-reset': !hasHeaderCloseSlot.value }, props.headerCloseClass]);
    const headerCloseAttrs = computed(() => ({
      variant: hasHeaderCloseSlot.value ? props.headerCloseVariant : void 0,
      class: headerCloseClasses.value,
    }));
    const hasFooterSlot = computed(() => !isEmptySlot(slots.footer));
    const computedClasses = computed(() => [
      props.responsive === void 0 ? 'offcanvas' : `offcanvas-${props.responsive}`,
      `offcanvas-${props.placement}`,
      {
        show: isVisible2.value,
        [`shadow-${props.shadow}`]: !!props.shadow,
        'no-transition': computedNoAnimation.value,
      },
    ]);
    const computedStyles = computed(() => ({
      width: props.width,
    }));
    const sharedSlots = computed(() => ({
      visible: showRef.value,
      placement: props.placement,
      hide: hide2,
    }));
    watch(smallerOrEqualToBreakpoint, newValue => {
      if (props.responsive === void 0) return;
      if (newValue === true) {
        const opened = false;
        localNoAnimation.value = true;
        requestAnimationFrame(() => {
          isOpenByBreakpoint.value = opened;
        });
        emit('breakpoint', buildTriggerableEvent('breakpoint'), opened);
        emit('hide', buildTriggerableEvent('hide'));
      } else {
        const opened = true;
        localNoAnimation.value = true;
        requestAnimationFrame(() => {
          isOpenByBreakpoint.value = opened;
        });
        emit('breakpoint', buildTriggerableEvent('breakpoint'), opened);
        emit('show', buildTriggerableEvent('show'));
      }
    });
    __expose({
      hide: hide2,
      show,
      toggle: toggle2,
      isOpenByBreakpoint,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main,
          {
            to: unref(props).teleportTo,
            disabled: unref(props).teleportDisabled || isOpenByBreakpoint.value,
          },
          {
            default: withCtx(() => [
              unref(renderRef) || unref(contentShowing) || isOpenByBreakpoint.value
                ? (openBlock(),
                  createBlock(
                    Transition,
                    mergeProps({ key: 0 }, unref(transitionProps), {
                      appear: modelValue.value || unref(props).visible,
                    }),
                    {
                      default: withCtx(() => [
                        withDirectives(
                          createBaseVNode(
                            'div',
                            mergeProps(
                              {
                                id: unref(computedId),
                                ref: '_element',
                                'aria-modal': 'true',
                                role: 'dialog',
                                class: computedClasses.value,
                                style: computedStyles.value,
                                tabindex: '-1',
                                'aria-labelledby': `${unref(computedId)}-offcanvas-label`,
                                'data-bs-backdrop': 'false',
                              },
                              _ctx.$attrs,
                            ),
                            [
                              unref(contentShowing) || isOpenByBreakpoint.value
                                ? (openBlock(),
                                  createElementBlock(
                                    Fragment,
                                    { key: 0 },
                                    [
                                      !unref(props).noHeader
                                        ? (openBlock(),
                                          createElementBlock(
                                            'div',
                                            {
                                              key: 0,
                                              class: normalizeClass(['offcanvas-header', unref(props).headerClass]),
                                            },
                                            [
                                              renderSlot(
                                                _ctx.$slots,
                                                'header',
                                                normalizeProps(guardReactiveProps(sharedSlots.value)),
                                                () => [
                                                  createBaseVNode(
                                                    'h5',
                                                    {
                                                      id: `${unref(computedId)}-offcanvas-label`,
                                                      class: 'offcanvas-title',
                                                    },
                                                    [
                                                      renderSlot(
                                                        _ctx.$slots,
                                                        'title',
                                                        normalizeProps(guardReactiveProps(sharedSlots.value)),
                                                        () => [createTextVNode(toDisplayString(unref(props).title), 1)],
                                                        true,
                                                      ),
                                                    ],
                                                    8,
                                                    _hoisted_215,
                                                  ),
                                                  !unref(props).noHeaderClose
                                                    ? (openBlock(),
                                                      createElementBlock(
                                                        Fragment,
                                                        { key: 0 },
                                                        [
                                                          hasHeaderCloseSlot.value
                                                            ? (openBlock(),
                                                              createBlock(
                                                                _sfc_main8,
                                                                mergeProps({ key: 0 }, headerCloseAttrs.value, {
                                                                  onClick: _cache[0] || (_cache[0] = $event => unref(hide2)('close')),
                                                                }),
                                                                {
                                                                  default: withCtx(() => [
                                                                    renderSlot(_ctx.$slots, 'header-close', {}, void 0, true),
                                                                  ]),
                                                                  _: 3,
                                                                },
                                                                16,
                                                              ))
                                                            : (openBlock(),
                                                              createBlock(
                                                                _sfc_main5,
                                                                mergeProps(
                                                                  {
                                                                    key: 1,
                                                                    'aria-label': unref(props).headerCloseLabel,
                                                                  },
                                                                  headerCloseAttrs.value,
                                                                  {
                                                                    onClick: _cache[1] || (_cache[1] = $event => unref(hide2)('close')),
                                                                  },
                                                                ),
                                                                null,
                                                                16,
                                                                ['aria-label'],
                                                              )),
                                                        ],
                                                        64,
                                                      ))
                                                    : createCommentVNode('', true),
                                                ],
                                                true,
                                              ),
                                            ],
                                            2,
                                          ))
                                        : createCommentVNode('', true),
                                      createBaseVNode(
                                        'div',
                                        mergeProps(
                                          {
                                            class: ['offcanvas-body', unref(props).bodyClass],
                                          },
                                          unref(props).bodyAttrs,
                                        ),
                                        [
                                          renderSlot(
                                            _ctx.$slots,
                                            'default',
                                            normalizeProps(guardReactiveProps(sharedSlots.value)),
                                            void 0,
                                            true,
                                          ),
                                        ],
                                        16,
                                      ),
                                      hasFooterSlot.value
                                        ? (openBlock(),
                                          createElementBlock(
                                            'div',
                                            {
                                              key: 1,
                                              class: normalizeClass(unref(props).footerClass),
                                            },
                                            [
                                              renderSlot(
                                                _ctx.$slots,
                                                'footer',
                                                normalizeProps(guardReactiveProps(sharedSlots.value)),
                                                void 0,
                                                true,
                                              ),
                                            ],
                                            2,
                                          ))
                                        : createCommentVNode('', true),
                                    ],
                                    64,
                                  ))
                                : createCommentVNode('', true),
                              unref(needsFallback)
                                ? (openBlock(),
                                  createElementBlock(
                                    'div',
                                    {
                                      key: 1,
                                      ref: '_fallbackFocusElement',
                                      class: normalizeClass(fallbackClassSelector2),
                                      tabindex: '0',
                                      style: { width: '0', height: '0', overflow: 'hidden' },
                                    },
                                    null,
                                    512,
                                  ))
                                : createCommentVNode('', true),
                            ],
                            16,
                            _hoisted_128,
                          ),
                          [
                            [
                              vShow,
                              (unref(showRef) && ((unref(backdropReady) && unref(props).backdropFirst) || !unref(props).backdropFirst)) ||
                                isOpenByBreakpoint.value,
                            ],
                          ],
                        ),
                      ]),
                      _: 3,
                    },
                    16,
                    ['appear'],
                  ))
                : createCommentVNode('', true),
              !unref(props).noBackdrop
                ? renderSlot(
                    _ctx.$slots,
                    'backdrop',
                    normalizeProps(mergeProps({ key: 1 }, sharedSlots.value)),
                    () => [
                      unref(renderBackdropRef)
                        ? (openBlock(),
                          createBlock(
                            Transition,
                            normalizeProps(mergeProps({ key: 0 }, unref(backdropTransitionProps))),
                            {
                              default: withCtx(() => [
                                withDirectives(
                                  createBaseVNode(
                                    'div',
                                    {
                                      class: normalizeClass([
                                        'offcanvas-backdrop',
                                        {
                                          fade: !unref(computedNoAnimation),
                                          show: unref(backdropVisible) || unref(computedNoAnimation),
                                        },
                                      ]),
                                      onClick: _cache[2] || (_cache[2] = $event => unref(hide2)('backdrop')),
                                    },
                                    null,
                                    2,
                                  ),
                                  [[vShow, showBackdrop.value]],
                                ),
                              ]),
                              _: 1,
                            },
                            16,
                          ))
                        : createCommentVNode('', true),
                    ],
                    true,
                  )
                : createCommentVNode('', true),
            ]),
            _: 3,
          },
          8,
          ['to', 'disabled'],
        )
      );
    };
  },
});
var BOffcanvas = _export_sfc(_sfc_main42, [['__scopeId', 'data-v-77d852fe']]);

// node_modules/bootstrap-vue-next/dist/BOverlay.vue_vue_type_script_setup_true_lang-C5dzyxuB.mjs
var _sfc_main43 = defineComponent({
  __name: 'BOverlay',
  props: {
    bgColor: { default: void 0 },
    blur: { default: '2px' },
    fixed: { type: Boolean, default: false },
    noCenter: { type: Boolean, default: false },
    noFade: { type: Boolean, default: false },
    noSpinner: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },
    opacity: { default: 0.85 },
    overlayTag: { default: 'div' },
    show: { type: Boolean, default: false },
    spinnerSmall: { type: Boolean, default: false },
    spinnerType: { default: 'border' },
    spinnerVariant: { default: void 0 },
    variant: { default: 'light' },
    wrapTag: { default: 'div' },
    zIndex: { default: 10 },
    rounded: { type: [Boolean, String, Number], default: false },
    roundedTop: { type: [Boolean, String, Number], default: void 0 },
    roundedBottom: { type: [Boolean, String, Number], default: void 0 },
    roundedStart: { type: [Boolean, String, Number], default: void 0 },
    roundedEnd: { type: [Boolean, String, Number], default: void 0 },
  },
  emits: ['click', 'hidden', 'shown'],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BOverlay');
    const emit = __emit;
    const positionStyles = { top: 0, left: 0, bottom: 0, right: 0 };
    const fadeTransitions = useFadeTransition(() => !props.noFade);
    const radiusElementClasses = useRadiusElementClasses(() => ({
      rounded: props.rounded,
      roundedTop: props.roundedTop,
      roundedBottom: props.roundedBottom,
      roundedStart: props.roundedStart,
      roundedEnd: props.roundedEnd,
    }));
    const computedAriaBusy = computed(() => (props.show ? true : null));
    const spinnerAttrs = computed(() => ({
      type: props.spinnerType,
      variant: props.spinnerVariant,
      small: props.spinnerSmall,
    }));
    const overlayStyles = computed(() => ({
      ...positionStyles,
      zIndex: props.zIndex || 10,
    }));
    const overlayClasses = computed(() => ({
      'position-absolute': !props.noWrap || !props.fixed,
      'position-fixed': props.noWrap && props.fixed,
    }));
    const colorClasses = useColorVariantClasses(
      computed(() => ({
        bgVariant: props.variant !== null && !props.bgColor ? props.variant : null,
      })),
    );
    const blurClasses = computed(() => [colorClasses.value, radiusElementClasses.value]);
    const blurStyles = computed(() => ({
      ...positionStyles,
      opacity: props.opacity,
      backgroundColor: props.bgColor || void 0,
      backdropFilter: props.blur ? `blur(${props.blur})` : void 0,
    }));
    const spinWrapperStyles = computed(() =>
      props.noCenter
        ? positionStyles
        : {
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
          },
    );
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main10,
          {
            tag: unref(props).wrapTag,
            class: 'b-overlay-wrap position-relative',
            'aria-busy': computedAriaBusy.value,
            skip: unref(props).noWrap,
          },
          {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, 'default'),
              createVNode(
                Transition,
                mergeProps(unref(fadeTransitions), {
                  'enter-to-class': 'show',
                  name: 'fade',
                  onAfterEnter: _cache[1] || (_cache[1] = $event => emit('shown')),
                  onAfterLeave: _cache[2] || (_cache[2] = $event => emit('hidden')),
                }),
                {
                  default: withCtx(() => [
                    unref(props).show
                      ? (openBlock(),
                        createBlock(
                          resolveDynamicComponent(unref(props).overlayTag),
                          {
                            key: 0,
                            class: normalizeClass(['b-overlay', overlayClasses.value]),
                            style: normalizeStyle(overlayStyles.value),
                            onClick: _cache[0] || (_cache[0] = $event => emit('click', $event)),
                          },
                          {
                            default: withCtx(() => [
                              createBaseVNode(
                                'div',
                                {
                                  class: normalizeClass(['position-absolute', blurClasses.value]),
                                  style: normalizeStyle(blurStyles.value),
                                },
                                null,
                                6,
                              ),
                              createBaseVNode(
                                'div',
                                {
                                  class: 'position-absolute',
                                  style: normalizeStyle(spinWrapperStyles.value),
                                },
                                [
                                  renderSlot(_ctx.$slots, 'overlay', normalizeProps(guardReactiveProps(spinnerAttrs.value)), () => [
                                    !unref(props).noSpinner
                                      ? (openBlock(),
                                        createBlock(_sfc_main6, normalizeProps(mergeProps({ key: 0 }, spinnerAttrs.value)), null, 16))
                                      : createCommentVNode('', true),
                                  ]),
                                ],
                                4,
                              ),
                            ]),
                            _: 3,
                          },
                          8,
                          ['class', 'style'],
                        ))
                      : createCommentVNode('', true),
                  ]),
                  _: 3,
                },
                16,
              ),
            ]),
            _: 3,
          },
          8,
          ['tag', 'aria-busy', 'skip'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BPagination.vue_vue_type_script_setup_true_lang-DH_8I7Df.mjs
var _hoisted_129 = ['aria-disabled', 'aria-label'];
var DEFAULT_PER_PAGE = 20;
var DEFAULT_TOTAL_ROWS = 0;
var _sfc_main44 = defineComponent({
  __name: 'BPagination',
  props: mergeModels(
    {
      align: { default: 'start' },
      ariaControls: { default: void 0 },
      ariaLabel: { default: 'Pagination' },
      disabled: { type: Boolean, default: false },
      ellipsisClass: { default: void 0 },
      ellipsisText: { default: '…' },
      firstClass: { default: void 0 },
      firstNumber: { type: Boolean, default: false },
      firstText: { default: '«' },
      noEllipsis: { type: Boolean, default: false },
      noGotoEndButtons: { type: Boolean, default: false },
      labelFirstPage: { default: 'Go to first page' },
      labelLastPage: { default: 'Go to last page' },
      labelNextPage: { default: 'Go to next page' },
      labelPage: { default: 'Go to page' },
      labelPrevPage: { default: 'Go to previous page' },
      lastClass: { default: void 0 },
      lastNumber: { type: Boolean, default: false },
      lastText: { default: '»' },
      limit: { default: 5 },
      nextClass: { default: void 0 },
      nextText: { default: '›' },
      pageClass: { default: void 0 },
      perPage: { default: DEFAULT_PER_PAGE },
      pills: { type: Boolean, default: false },
      prevClass: { default: void 0 },
      prevText: { default: '‹' },
      size: { default: void 0 },
      totalRows: { default: DEFAULT_TOTAL_ROWS },
    },
    {
      modelValue: {
        default: 1,
      },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(['page-click'], ['update:modelValue']),
  setup(__props, { emit: __emit }) {
    const ELLIPSIS_THRESHOLD = 3;
    const FIRST_BUTTON = -1;
    const PREV_BUTTON = -2;
    const NEXT_BUTTON = -3;
    const LAST_BUTTON = -4;
    const FIRST_ELLIPSIS = -5;
    const LAST_ELLIPSIS = -6;
    const _props = __props;
    const props = useDefaults(_props, 'BPagination');
    const emit = __emit;
    const modelValue = useModel(__props, 'modelValue');
    const pageElements = useTemplateRef('_pageElements');
    const limitNumber = useToNumber(() => props.limit, { nanToZero: true, method: 'parseInt' });
    const perPageNumber = useToNumber(() => props.perPage, { nanToZero: true, method: 'parseInt' });
    const totalRowsNumber = useToNumber(() => props.totalRows, { nanToZero: true, method: 'parseInt' });
    const modelValueNumber = useToNumber(modelValue, { nanToZero: true, method: 'parseInt' });
    const perPageSanitized = computed(() => Math.max(perPageNumber.value || DEFAULT_PER_PAGE, 1));
    const totalRowsSanitized = computed(() => Math.max(totalRowsNumber.value || DEFAULT_TOTAL_ROWS, 0));
    const numberOfPages = computed(() => Math.ceil(totalRowsSanitized.value / perPageSanitized.value));
    const computedFill = computed(() => props.align === 'fill');
    const justifyAlign = computed(() => (props.align === 'fill' ? 'start' : props.align));
    const alignment = useAlignment(justifyAlign);
    const isActivePage = pageNumber => pageNumber === computedModelValue.value;
    const getTabIndex3 = num => (props.disabled ? null : isActivePage(num) ? '0' : '-1');
    const checkDisabled = num =>
      props.disabled ||
      isActivePage(num) ||
      computedModelValue.value < 1 || // Check if the number is out of bounds
      num < 1 ||
      num > numberOfPages.value;
    const firstDisabled = computed(() => checkDisabled(1));
    const prevDisabled = computed(() => checkDisabled(computedModelValue.value - 1));
    const lastDisabled = computed(() => checkDisabled(numberOfPages.value));
    const nextDisabled = computed(() => checkDisabled(computedModelValue.value + 1));
    const getBaseButtonProps = ({
      page,
      classVal,
      disabled,
      slotName,
      textValue,
      tabIndex,
      label,
      position,
      isActive,
      role,
      hidden,
      isSmHidden,
    }) => ({
      li: {
        class: [
          'page-item',
          {
            active: isActive,
            disabled,
            'bv-d-sm-down-none': isSmHidden,
            'flex-fill': computedFill.value,
            'd-flex': computedFill.value && !disabled,
          },
          classVal,
        ],
        role,
        'aria-hidden': hidden,
      },
      button: {
        is: disabled ? 'span' : 'button',
        class: ['page-link', 'text-center', { 'flex-grow-1': !disabled && computedFill.value }],
        'aria-label': label,
        'aria-controls': props.ariaControls || void 0,
        'aria-disabled': disabled ? true : void 0,
        'aria-posinset': position,
        'aria-setsize': position ? numberOfPages.value : void 0,
        role: 'menuitem',
        type: disabled ? void 0 : 'button',
        tabindex: disabled ? void 0 : tabIndex,
      },
      text: {
        name: slotName,
        active: isActive,
        value: textValue ?? page,
        page,
        disabled,
        index: page - 1,
        content: textValue ? void 0 : page,
      },
      clickHandler: e => pageClick(e, page),
    });
    const getButtonProps = ({ page, classVal, disabled, slotName, textValue, label }) =>
      getBaseButtonProps({ page, classVal, disabled, slotName, textValue, label, tabIndex: '-1' });
    const getPageButtonProps = (page, isSmHidden) =>
      getBaseButtonProps({
        page,
        disabled: props.disabled,
        classVal: props.pageClass,
        slotName: 'page',
        label: props.labelPage ? `${props.labelPage} ${page}` : void 0,
        tabIndex: getTabIndex3(page) ?? void 0,
        position: page,
        isActive: isActivePage(page),
        isSmHidden,
      });
    const firstButtonProps = computed(() =>
      getButtonProps({
        page: 1,
        disabled: firstDisabled.value,
        classVal: props.firstClass,
        slotName: 'first-text',
        textValue: props.firstText,
        label: props.labelFirstPage,
      }),
    );
    const prevButtonProps = computed(() =>
      getButtonProps({
        page: Math.max(computedModelValue.value - 1, 1),
        disabled: prevDisabled.value,
        classVal: props.prevClass,
        slotName: 'prev-text',
        textValue: props.prevText,
        label: props.labelPrevPage,
      }),
    );
    const nextButtonProps = computed(() =>
      getButtonProps({
        page: Math.min(computedModelValue.value + 1, numberOfPages.value),
        disabled: nextDisabled.value,
        classVal: props.nextClass,
        slotName: 'next-text',
        textValue: props.nextText,
        label: props.labelNextPage,
      }),
    );
    const lastButtonProps = computed(() =>
      getButtonProps({
        page: numberOfPages.value,
        disabled: lastDisabled.value,
        classVal: props.lastClass,
        slotName: 'last-text',
        textValue: props.lastText,
        label: props.labelLastPage,
      }),
    );
    const ellipsisProps = computed(() => ({
      li: {
        class: ['page-item', 'disabled', 'text-center', 'bv-d-sm-down-none', computedFill.value ? 'flex-fill' : '', props.ellipsisClass],
        role: 'separator',
      },
      span: {
        class: ['page-link'],
      },
    }));
    const computedWrapperClasses = computed(() => [
      alignment.value,
      {
        [`pagination-${props.size}`]: props.size !== void 0,
        'b-pagination-pills': props.pills,
      },
    ]);
    const pagination = computed(() => ({
      pageSize: perPageSanitized.value,
      totalRows: totalRowsNumber.value,
      numberOfPages: numberOfPages.value,
    }));
    const pageClick = (event, pageNumber) => {
      if (pageNumber === computedModelValue.value) return;
      const clickEvent = new BvEvent('page-click', {
        cancelable: true,
        target: event.target,
      });
      emit('page-click', clickEvent, pageNumber);
      if (clickEvent.defaultPrevented) return;
      modelValue.value = pageNumber;
    };
    const isDisabled = el => {
      const isElement2 = !!(el && el.nodeType === Node.ELEMENT_NODE);
      const hasAttr = isElement2 ? el.hasAttribute('disabled') : null;
      const hasClass = isElement2 && el.classList ? el.classList.contains('disabled') : false;
      return !isElement2 || el.disabled || hasAttr || hasClass;
    };
    const getButtons = () => {
      var _a;
      return (
        ((_a = pageElements.value) == null
          ? void 0
          : _a
              .map(page => page.children[0])
              .filter(btn => {
                if (btn.getAttribute('display') === 'none') {
                  return false;
                }
                const bcr = btn.getBoundingClientRect();
                return !!(bcr && bcr.height > 0 && bcr.width > 0);
              })) ?? []
      );
    };
    const focusFirst = () => {
      nextTick(() => {
        const btn = getButtons().find(el => !isDisabled(el));
        btn == null ? void 0 : btn.focus();
      });
    };
    const focusPrev = () => {
      nextTick(() => {
        var _a;
        const buttons = getButtons();
        const index8 = buttons.indexOf(getActiveElement());
        if (index8 > 0 && !isDisabled(buttons[index8 - 1])) {
          (_a = buttons[index8 - 1]) == null ? void 0 : _a.focus();
        }
      });
    };
    const focusLast = () => {
      nextTick(() => {
        const btn = getButtons()
          .reverse()
          .find(el => !isDisabled(el));
        btn == null ? void 0 : btn.focus();
      });
    };
    const focusNext = () => {
      nextTick(() => {
        var _a;
        const buttons = getButtons();
        const index8 = buttons.indexOf(getActiveElement());
        if (index8 < buttons.length - 1 && !isDisabled(buttons[index8 + 1])) {
          (_a = buttons[index8 + 1]) == null ? void 0 : _a.focus();
        }
      });
    };
    const handleKeyNav = event => {
      const { code, shiftKey } = event;
      if (code === CODE_LEFT || code === CODE_UP) {
        stopEvent(event);
        if (shiftKey) {
          focusFirst();
        } else {
          focusPrev();
        }
      } else if (code === CODE_RIGHT || code === CODE_DOWN) {
        stopEvent(event);
        if (shiftKey) {
          focusLast();
        } else {
          focusNext();
        }
      }
    };
    const computedModelValue = computed(() => {
      const page = modelValueNumber.value || 1;
      return page > numberOfPages.value ? numberOfPages.value : page < 1 ? 1 : page;
    });
    watch(pagination, (oldValue, newValue) => {
      if (newValue.pageSize !== oldValue.pageSize && newValue.totalRows === oldValue.totalRows) {
        modelValue.value = 1;
      }
    });
    const noFirstButton = computed(() => (props.noGotoEndButtons && !props.firstNumber ? 1 : 0));
    const noLastButton = computed(() => (props.noGotoEndButtons && !props.lastNumber ? 1 : 0));
    const showFirstButton = computed(() => (noFirstButton.value ? 0 : 1));
    const showLastButton = computed(() => (noLastButton.value ? 0 : 1));
    const firstPage = computed(() => (props.firstNumber ? 1 : 0));
    const lastPage = computed(() => (props.lastNumber ? 1 : 0));
    const halfLimit = computed(() => Math.floor(limitNumber.value / 2));
    const pages = computed(() => {
      const { value } = computedModelValue;
      const els = elements.value.map(p => {
        switch (p) {
          case FIRST_BUTTON:
            return { id: p, ...firstButtonProps.value };
          case PREV_BUTTON:
            return { id: p, ...prevButtonProps.value };
          case NEXT_BUTTON:
            return { id: p, ...nextButtonProps.value };
          case LAST_BUTTON:
            return { id: p, ...lastButtonProps.value };
          case FIRST_ELLIPSIS:
          case LAST_ELLIPSIS:
            return { id: p, ...ellipsisProps.value };
          default:
            return { id: p, ...getPageButtonProps(p) };
        }
      });
      if (numberOfPages.value > 3) {
        if (value > numberOfPages.value - halfLimit.value - lastPage.value) {
          const idx = 2 + showFirstButton.value;
          els[idx] = { id: els[idx].id, ...getPageButtonProps(els[idx].id, true) };
        }
        if (value <= halfLimit.value + firstPage.value) {
          const idx = els.length - (3 + showLastButton.value);
          els[idx] = { id: els[idx].id, ...getPageButtonProps(els[idx].id, true) };
        }
      }
      return els;
    });
    const elements = computed(() => {
      const pages2 = numberOfPages.value;
      const { value } = computedModelValue;
      const limit = limitNumber.value;
      const noEllipsis = props.noEllipsis || limit <= ELLIPSIS_THRESHOLD;
      if (pages2 < limit + firstPage.value + lastPage.value) {
        return [
          !firstPage.value && !noFirstButton.value ? FIRST_BUTTON : null,
          PREV_BUTTON,
          ...Array.from({ length: pages2 }, (_, index8) => index8 + 1),
          NEXT_BUTTON,
          !lastPage.value && !noLastButton.value ? LAST_BUTTON : null,
        ].filter(x => x !== null);
      }
      const buttons = Array.from({ length: limit + 4 - (noFirstButton.value + noLastButton.value) });
      if (!noFirstButton.value) {
        if (!firstPage.value) {
          buttons[0] = FIRST_BUTTON;
          buttons[1] = PREV_BUTTON;
        } else {
          buttons[0] = PREV_BUTTON;
          buttons[1] = 1;
        }
      } else {
        buttons[0] = PREV_BUTTON;
      }
      if (!noLastButton.value) {
        if (!lastPage.value) {
          buttons[buttons.length - 1] = LAST_BUTTON;
          buttons[buttons.length - 2] = NEXT_BUTTON;
        } else {
          buttons[buttons.length - 1] = NEXT_BUTTON;
          buttons[buttons.length - 2] = pages2;
        }
      } else {
        buttons[buttons.length - 1] = NEXT_BUTTON;
      }
      if (value <= halfLimit.value + firstPage.value) {
        for (let index8 = 1; index8 <= limit; index8++) {
          buttons[index8 + 1 - noFirstButton.value] = index8 + firstPage.value;
        }
        if (!noEllipsis) {
          buttons[buttons.length - (2 + showLastButton.value)] = LAST_ELLIPSIS;
        }
      }
      if (value > pages2 - halfLimit.value - lastPage.value) {
        const start = pages2 - (limit - 1) - lastPage.value;
        for (let index8 = 0; index8 < limit; index8++) {
          buttons[index8 + 2 - noFirstButton.value] = start + index8;
        }
        if (!noEllipsis) {
          buttons[1 + showFirstButton.value] = FIRST_ELLIPSIS;
        }
      }
      if (!buttons[2]) {
        const start = value - Math.floor(limit / 2);
        for (let index8 = 0; index8 < limit; index8++) {
          buttons[index8 + 2 - noFirstButton.value] = start + index8;
        }
        if (!noEllipsis) {
          buttons[1 + showFirstButton.value] = FIRST_ELLIPSIS;
          buttons[buttons.length - (2 + showLastButton.value)] = LAST_ELLIPSIS;
        }
      }
      return buttons.filter(x => x !== null);
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'ul',
          {
            class: normalizeClass(['pagination', computedWrapperClasses.value]),
            role: 'menubar',
            'aria-disabled': unref(props).disabled,
            'aria-label': unref(props).ariaLabel || void 0,
            onKeydown: handleKeyNav,
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(pages.value, page => {
                return (
                  openBlock(),
                  createElementBlock(
                    'li',
                    mergeProps(
                      {
                        key: `page-${page.id}`,
                        ref_for: true,
                      },
                      page.li,
                      {
                        ref_for: true,
                        ref: '_pageElements',
                      },
                    ),
                    [
                      page.id === FIRST_ELLIPSIS || page.id === LAST_ELLIPSIS
                        ? (openBlock(),
                          createElementBlock(
                            'span',
                            mergeProps(
                              {
                                key: 0,
                                ref_for: true,
                              },
                              ellipsisProps.value.span,
                            ),
                            [
                              renderSlot(_ctx.$slots, 'ellipsis-text', {}, () => [
                                createTextVNode(toDisplayString(unref(props).ellipsisText || '...'), 1),
                              ]),
                            ],
                            16,
                          ))
                        : (openBlock(),
                          createBlock(
                            resolveDynamicComponent(page.button.is),
                            mergeProps(
                              {
                                key: 1,
                                ref_for: true,
                              },
                              page.button,
                              {
                                onClick: page.clickHandler,
                              },
                            ),
                            {
                              default: withCtx(() => [
                                renderSlot(
                                  _ctx.$slots,
                                  page.text.name,
                                  {
                                    disabled: page.text.disabled,
                                    page: page.text.page,
                                    index: page.text.index,
                                    active: page.text.active,
                                    content: page.text.value,
                                  },
                                  () => [createTextVNode(toDisplayString(page.text.value), 1)],
                                ),
                              ]),
                              _: 2,
                            },
                            1040,
                            ['onClick'],
                          )),
                    ],
                    16,
                  )
                );
              }),
              128,
            )),
          ],
          42,
          _hoisted_129,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BTableSimple.vue_vue_type_script_setup_true_lang-Dbrg2rgZ.mjs
var defaultStickyHeaderHeight = '300px';
var _sfc_main45 = defineComponent({
  __name: 'BTableSimple',
  props: {
    bordered: { type: Boolean, default: false },
    borderless: { type: Boolean, default: false },
    borderVariant: { default: null },
    captionTop: { type: Boolean, default: false },
    dark: { type: Boolean, default: false },
    fixed: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    id: { default: void 0 },
    noBorderCollapse: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    responsive: { type: [Boolean, String], default: false },
    small: { type: Boolean, default: false },
    stacked: { type: [Boolean, String], default: false },
    stickyHeader: { type: [Boolean, String, Number], default: false },
    striped: { type: Boolean, default: false },
    stripedColumns: { type: Boolean, default: false },
    variant: { default: null },
    tableAttrs: { default: void 0 },
    tableClass: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BTableSimple');
    const computedId = useId2(() => props.id);
    const colorClasses = useColorVariantClasses(
      computed(() => ({
        borderVariant: props.borderVariant,
      })),
    );
    const computedClasses = computed(() => [
      props.tableClass,
      'table',
      'b-table',
      colorClasses.value,
      {
        border: props.outlined,
        'table-bordered': props.bordered,
        'table-borderless': props.borderless,
        'caption-top': props.captionTop,
        'table-dark': props.dark,
        'table-hover': props.hover,
        'b-table-stacked': props.stacked === true,
        [`b-table-stacked-${props.stacked}`]: typeof props.stacked === 'string',
        'table-striped': props.striped,
        'table-sm': props.small,
        [`table-${props.variant}`]: props.variant !== null,
        'table-striped-columns': props.stripedColumns,
      },
    ]);
    const computedTableAttrs = computed(() => ({
      id: computedId.value,
      class: computedClasses.value,
      ...props.tableAttrs,
    }));
    const computedSticky = useNumberishToStyle(
      computed(() => (props.stickyHeader === true ? defaultStickyHeaderHeight : props.stickyHeader) || NaN),
    );
    const stickyIsValid = computed(() => props.stickyHeader !== false);
    const isResponsive = computed(() => props.responsive !== false || stickyIsValid.value);
    const responsiveStyles = computed(() => (stickyIsValid.value ? { maxHeight: computedSticky.value } : void 0));
    const responsiveClasses = computed(() => ({
      'table-responsive': props.responsive === true,
      [`table-responsive-${props.responsive}`]: typeof props.responsive === 'string',
      'b-table-sticky-header': stickyIsValid.value,
    }));
    return (_ctx, _cache) => {
      return isResponsive.value
        ? (openBlock(),
          createElementBlock(
            'div',
            {
              key: 0,
              class: normalizeClass(responsiveClasses.value),
              style: normalizeStyle(responsiveStyles.value),
            },
            [
              createBaseVNode(
                'table',
                normalizeProps(guardReactiveProps(computedTableAttrs.value)),
                [renderSlot(_ctx.$slots, 'default')],
                16,
              ),
            ],
            6,
          ))
        : (openBlock(),
          createElementBlock(
            'table',
            normalizeProps(mergeProps({ key: 1 }, computedTableAttrs.value)),
            [renderSlot(_ctx.$slots, 'default')],
            16,
          ));
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BPlaceholderWrapper.vue_vue_type_script_setup_true_lang-CliOyeln.mjs
var _sfc_main$44 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BPlaceholder',
  props: {
    animation: { default: void 0 },
    cols: { default: 12 },
    size: { default: 'md' },
    tag: { default: 'span' },
    variant: { default: null },
    width: { default: void 0 },
    wrapperTag: { default: 'span' },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BPlaceholder');
    const widthString = computed(() =>
      props.width === void 0 ? void 0 : typeof props.width === 'number' ? props.width.toString() : props.width.replace('%', ''),
    );
    const colsString = computed(() =>
      props.cols === void 0 ? void 0 : typeof props.cols === 'number' ? props.cols.toString() : props.cols,
    );
    const colorClasses = useColorVariantClasses(
      computed(() => ({
        bgVariant: props.variant,
      })),
    );
    const computedClasses = computed(() => [
      colorClasses.value,
      {
        [`col-${colsString.value}`]: colsString.value !== void 0 && widthString.value === void 0,
        [`placeholder-${props.size}`]: props.size !== 'md',
      },
    ]);
    const wrapperClasses = computed(() => ({
      [`placeholder-${props.animation}`]: props.animation !== void 0,
    }));
    const computedStyle = computed(() => ({
      width: widthString.value === void 0 ? void 0 : `${widthString.value}%`,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).wrapperTag),
          {
            class: normalizeClass(wrapperClasses.value),
          },
          {
            default: withCtx(() => [
              (openBlock(),
              createBlock(
                resolveDynamicComponent(_ctx.tag),
                mergeProps(_ctx.$attrs, {
                  class: ['placeholder', computedClasses.value],
                  style: computedStyle.value,
                }),
                null,
                16,
                ['class', 'style'],
              )),
            ]),
            _: 1,
          },
          8,
          ['class'],
        )
      );
    };
  },
});
var _sfc_main$36 = defineComponent({
  __name: 'BPlaceholderButton',
  props: {
    animation: { default: void 0 },
    cols: { default: void 0 },
    tag: { default: 'div' },
    variant: { default: 'primary' },
    width: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BPlaceholderButton');
    const computedClasses = computed(() => ({
      [`btn-${props.variant}`]: props.variant !== null,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$44,
          {
            class: normalizeClass(['btn disabled', computedClasses.value]),
            animation: unref(props).animation,
            width: unref(props).width,
            cols: unref(props).cols,
            tag: unref(props).tag,
            style: { cursor: 'wait', 'pointer-events': 'auto' },
          },
          null,
          8,
          ['class', 'animation', 'width', 'cols', 'tag'],
        )
      );
    };
  },
});
var _sfc_main$26 = defineComponent({
  __name: 'BPlaceholderCard',
  props: {
    animation: { default: void 0 },
    footerAnimation: { default: void 0 },
    footerSize: { default: 'md' },
    footerVariant: { default: void 0 },
    footerWidth: { default: 100 },
    headerAnimation: { default: void 0 },
    headerSize: { default: 'md' },
    headerVariant: { default: void 0 },
    headerWidth: { default: 100 },
    imgBlankColor: { default: '#868e96' },
    imgPlacement: { default: 'top' },
    imgHeight: { default: 100 },
    imgSrc: { default: void 0 },
    noButton: { type: Boolean, default: false },
    noFooter: { type: Boolean, default: false },
    noHeader: { type: Boolean, default: false },
    noImg: { type: Boolean, default: false },
    size: { default: 'md' },
    variant: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BPlaceholderCard');
    const defaultAttrs = computed(() => ({
      animation: props.animation,
      size: props.size,
      variant: props.variant,
    }));
    const footerComponent = computed(() => (!props.noButton ? _sfc_main$36 : _sfc_main$44));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main16,
          {
            'img-placement': unref(props).imgPlacement,
          },
          createSlots(
            {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, 'default', {}, () => [
                  createVNode(_sfc_main$44, mergeProps({ cols: '7' }, defaultAttrs.value), null, 16),
                  createVNode(_sfc_main$44, mergeProps({ cols: '4' }, defaultAttrs.value), null, 16),
                  createVNode(_sfc_main$44, mergeProps({ cols: '4' }, defaultAttrs.value), null, 16),
                  createVNode(_sfc_main$44, mergeProps({ cols: '6' }, defaultAttrs.value), null, 16),
                  createVNode(_sfc_main$44, mergeProps({ cols: '8' }, defaultAttrs.value), null, 16),
                ]),
              ]),
              _: 2,
            },
            [
              !unref(props).noImg
                ? {
                    name: 'img',
                    fn: withCtx(() => [
                      renderSlot(_ctx.$slots, 'img', {}, () => [
                        createVNode(
                          _sfc_main$7,
                          {
                            blank: !unref(props).imgSrc ? true : false,
                            'blank-color': unref(props).imgBlankColor,
                            height: !unref(props).imgSrc ? unref(props).imgHeight : void 0,
                            src: unref(props).imgSrc,
                            'img-placement': unref(props).imgPlacement,
                            style: { cursor: 'wait' },
                          },
                          null,
                          8,
                          ['blank', 'blank-color', 'height', 'src', 'img-placement'],
                        ),
                      ]),
                    ]),
                    key: '0',
                  }
                : void 0,
              !unref(props).noHeader
                ? {
                    name: 'header',
                    fn: withCtx(() => [
                      renderSlot(_ctx.$slots, 'header', {}, () => [
                        createVNode(
                          _sfc_main$44,
                          {
                            width: unref(props).headerWidth,
                            variant: unref(props).headerVariant,
                            animation: unref(props).headerAnimation,
                            size: unref(props).headerSize,
                          },
                          null,
                          8,
                          ['width', 'variant', 'animation', 'size'],
                        ),
                      ]),
                    ]),
                    key: '1',
                  }
                : void 0,
              !unref(props).noFooter
                ? {
                    name: 'footer',
                    fn: withCtx(() => [
                      renderSlot(_ctx.$slots, 'footer', {}, () => [
                        (openBlock(),
                        createBlock(
                          resolveDynamicComponent(footerComponent.value),
                          {
                            width: unref(props).footerWidth,
                            animation: unref(props).footerAnimation,
                            size: unref(props).noButton ? unref(props).footerSize : void 0,
                            variant: unref(props).footerVariant,
                          },
                          null,
                          8,
                          ['width', 'animation', 'size', 'variant'],
                        )),
                      ]),
                    ]),
                    key: '2',
                  }
                : void 0,
            ],
          ),
          1032,
          ['img-placement'],
        )
      );
    };
  },
});
var _sfc_main$120 = defineComponent({
  __name: 'BPlaceholderTable',
  props: {
    animation: { default: void 0 },
    cellWidth: { default: 100 },
    columns: { default: 5 },
    footerAnimation: { default: void 0 },
    footerCellWidth: { default: 100 },
    footerColumns: { default: void 0 },
    footerSize: { default: 'md' },
    footerVariant: { default: void 0 },
    headerAnimation: { default: void 0 },
    headerCellWidth: { default: 100 },
    headerColumns: { default: void 0 },
    headerSize: { default: 'md' },
    headerVariant: { default: void 0 },
    noHeader: { type: Boolean, default: false },
    rows: { default: 3 },
    showFooter: { type: Boolean, default: false },
    size: { default: 'md' },
    variant: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BPlaceholderTable');
    const columnsToNumber = useToNumber(() => props.columns);
    const rowsToNumber = useToNumber(() => props.rows);
    const computedHeaderColumns = computed(() => props.headerColumns ?? NaN);
    const computedFooterColumns = computed(() => props.footerColumns ?? NaN);
    const headerColumnsNumber = useToNumber(computedHeaderColumns);
    const footerColumnsNumber = useToNumber(computedFooterColumns);
    const columnsNumber = computed(() => columnsToNumber.value || 5);
    const rowsNumber = computed(() => rowsToNumber.value || 3);
    const computedHeaderColumnsLength = computed(() => (props.headerColumns === void 0 ? columnsNumber.value : headerColumnsNumber.value));
    const computedFooterColumnsLength = computed(() => (props.footerColumns === void 0 ? columnsNumber.value : footerColumnsNumber.value));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(_sfc_main45, null, {
          default: withCtx(() => [
            !unref(props).noHeader
              ? renderSlot(_ctx.$slots, 'thead', { key: 0 }, () => [
                  createBaseVNode('thead', null, [
                    createBaseVNode('tr', null, [
                      (openBlock(true),
                      createElementBlock(
                        Fragment,
                        null,
                        renderList(computedHeaderColumnsLength.value, (_, i) => {
                          return (
                            openBlock(),
                            createElementBlock('th', { key: i }, [
                              createVNode(
                                _sfc_main$44,
                                {
                                  size: unref(props).headerSize,
                                  variant: unref(props).headerVariant,
                                  animation: unref(props).headerAnimation,
                                  width: unref(props).headerCellWidth,
                                },
                                null,
                                8,
                                ['size', 'variant', 'animation', 'width'],
                              ),
                            ])
                          );
                        }),
                        128,
                      )),
                    ]),
                  ]),
                ])
              : createCommentVNode('', true),
            renderSlot(_ctx.$slots, 'default', {}, () => [
              createBaseVNode('tbody', null, [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(rowsNumber.value, (_, j) => {
                    return (
                      openBlock(),
                      createElementBlock('tr', { key: j }, [
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(columnsNumber.value, (__, k) => {
                            return (
                              openBlock(),
                              createElementBlock('td', { key: k }, [
                                createVNode(
                                  _sfc_main$44,
                                  {
                                    size: unref(props).size,
                                    variant: unref(props).variant,
                                    animation: unref(props).animation,
                                    width: unref(props).cellWidth,
                                  },
                                  null,
                                  8,
                                  ['size', 'variant', 'animation', 'width'],
                                ),
                              ])
                            );
                          }),
                          128,
                        )),
                      ])
                    );
                  }),
                  128,
                )),
              ]),
            ]),
            unref(props).showFooter
              ? renderSlot(_ctx.$slots, 'tfoot', { key: 1 }, () => [
                  createBaseVNode('tfoot', null, [
                    createBaseVNode('tr', null, [
                      (openBlock(true),
                      createElementBlock(
                        Fragment,
                        null,
                        renderList(computedFooterColumnsLength.value, (_, l) => {
                          return (
                            openBlock(),
                            createElementBlock('th', { key: l }, [
                              createVNode(
                                _sfc_main$44,
                                {
                                  size: unref(props).footerSize,
                                  variant: unref(props).footerVariant,
                                  animation: unref(props).footerAnimation,
                                  width: unref(props).footerCellWidth,
                                },
                                null,
                                8,
                                ['size', 'variant', 'animation', 'width'],
                              ),
                            ])
                          );
                        }),
                        128,
                      )),
                    ]),
                  ]),
                ])
              : createCommentVNode('', true),
          ]),
          _: 3,
        })
      );
    };
  },
});
var _sfc_main46 = defineComponent({
  __name: 'BPlaceholderWrapper',
  props: {
    loading: { type: Boolean, default: false },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BPlaceholderWrapper');
    return (_ctx, _cache) => {
      return unref(props).loading ? renderSlot(_ctx.$slots, 'loading', { key: 0 }) : renderSlot(_ctx.$slots, 'default', { key: 1 });
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BTooltip.vue_vue_type_script_setup_true_lang-CQUUOSBP.mjs
var _sfc_main47 = defineComponent({
  __name: 'BTooltip',
  props: mergeModels(
    {
      interactive: { type: Boolean, default: void 0 },
      boundary: {},
      boundaryPadding: {},
      click: { type: Boolean, default: void 0 },
      closeOnHide: { type: Boolean },
      content: { default: void 0 },
      customClass: { default: void 0 },
      delay: { default: void 0 },
      floatingMiddleware: { default: void 0 },
      hideMargin: {},
      id: { default: void 0 },
      inline: { type: Boolean, default: void 0 },
      manual: { type: Boolean, default: void 0 },
      noAutoClose: { type: Boolean, default: void 0 },
      noFlip: { type: Boolean, default: void 0 },
      noHide: { type: Boolean, default: void 0 },
      noShift: { type: Boolean, default: void 0 },
      noSize: { type: Boolean },
      noninteractive: { type: Boolean, default: void 0 },
      offset: { default: void 0 },
      placement: { default: void 0 },
      realtime: { type: Boolean, default: void 0 },
      reference: { default: void 0 },
      strategy: { default: void 0 },
      target: { default: void 0 },
      title: { default: void 0 },
      variant: { default: void 0 },
      teleportDisabled: { type: Boolean, default: void 0 },
      teleportTo: { default: void 0 },
      initialAnimation: { type: Boolean, default: false },
      noAnimation: { type: Boolean },
      noFade: { type: Boolean, default: void 0 },
      lazy: { type: Boolean, default: void 0 },
      unmountLazy: { type: Boolean, default: void 0 },
      show: { type: Boolean, default: void 0 },
      transProps: {},
      visible: { type: Boolean, default: void 0 },
    },
    {
      modelValue: { type: Boolean, ...{ default: void 0 } },
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, 'BTooltip');
    const slots = useSlots();
    const modelValue = useModel(__props, 'modelValue');
    const computedProps = computed(() => {
      const { interactive, noninteractive, ...rest } = props;
      return { noninteractive: noninteractive !== void 0 ? noninteractive : !interactive, ...rest };
    });
    const popover = useTemplateRef('_popover');
    __expose({
      hide: () => {
        var _a;
        (_a = popover.value) == null ? void 0 : _a.hide();
      },
      show: () => {
        var _a;
        (_a = popover.value) == null ? void 0 : _a.show();
      },
      toggle: () => {
        var _a;
        (_a = popover.value) == null ? void 0 : _a.toggle();
      },
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          BPopover,
          mergeProps({ ref: '_popover' }, computedProps.value, {
            modelValue: modelValue.value,
            'onUpdate:modelValue': _cache[0] || (_cache[0] = $event => (modelValue.value = $event)),
            tooltip: '',
          }),
          createSlots({ _: 2 }, [
            slots.default
              ? {
                  name: 'default',
                  fn: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
                  key: '0',
                }
              : void 0,
            slots.target
              ? {
                  name: 'target',
                  fn: withCtx(scope => [renderSlot(_ctx.$slots, 'target', normalizeProps(guardReactiveProps(scope)))]),
                  key: '1',
                }
              : void 0,
            slots.title
              ? {
                  name: 'title',
                  fn: withCtx(() => [renderSlot(_ctx.$slots, 'title')]),
                  key: '2',
                }
              : void 0,
          ]),
          1040,
          ['modelValue'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BPopoverOrchestrator.vue_vue_type_script_setup_true_lang-B-n-7UQK.mjs
var _sfc_main48 = defineComponent({
  __name: 'BPopoverOrchestrator',
  setup(__props, { expose: __expose }) {
    const tools = usePopoverController();
    const PopoverList = () => {
      var _a, _b;
      return Array.from(((_b = (_a = tools.popovers) == null ? void 0 : _a.value) == null ? void 0 : _b.entries()) ?? []).map(
        ([self2, { content, title, ...popover }]) => {
          const props = {};
          const slots = {};
          if (typeof content === 'string') {
            props.content = content;
          } else {
            slots.default = content;
          }
          if (typeof title === 'string') {
            props.title = title;
          } else {
            slots.title = title;
          }
          return h(BPopover, { key: self2, ...props, ...popover }, slots);
        },
      );
    };
    const TooltipList = () => {
      var _a, _b;
      return Array.from(((_b = (_a = tools.tooltips) == null ? void 0 : _a.value) == null ? void 0 : _b.entries()) ?? []).map(
        ([self2, { content, title, ...popover }]) => {
          const props = {};
          const slots = {};
          if (typeof content === 'string') {
            props.content = content;
          } else {
            slots.default = content;
          }
          if (typeof title === 'string') {
            props.title = title;
          } else {
            slots.title = title;
          }
          return h(_sfc_main47, { key: self2, ...props, ...popover }, slots);
        },
      );
    };
    __expose({
      ...tools,
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [createVNode(PopoverList), createVNode(TooltipList)], 64);
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BProgress.vue_vue_type_script_setup_true_lang-BOhOz9Pk.mjs
var _sfc_main$121 = defineComponent({
  __name: 'BProgressBar',
  props: {
    animated: { type: Boolean, default: false },
    label: { default: void 0 },
    max: { default: void 0 },
    precision: { default: 0 },
    showProgress: { type: Boolean, default: false },
    showValue: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    value: { default: 0 },
    variant: { default: null },
    bgVariant: { default: null },
    textVariant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BProgressBar');
    const parentData = inject(progressInjectionKey, null);
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed(() => [
      colorClasses.value,
      {
        'progress-bar-animated': props.animated || (parentData == null ? void 0 : parentData.animated.value),
        'progress-bar-striped':
          props.striped ||
          (parentData == null ? void 0 : parentData.striped.value) ||
          props.animated ||
          (parentData == null ? void 0 : parentData.animated.value),
      },
    ]);
    const numberPrecision = useToNumber(() => props.precision);
    const numberValue = useToNumber(() => props.value);
    const numberMax = useToNumber(() => props.max ?? NaN);
    const parentMaxNumber = useToNumber(() => (parentData == null ? void 0 : parentData.max.value) ?? NaN);
    const computedLabel = computed(() =>
      props.showValue || (parentData == null ? void 0 : parentData.showValue.value)
        ? numberValue.value.toFixed(numberPrecision.value)
        : props.showProgress || (parentData == null ? void 0 : parentData.showProgress.value)
          ? ((numberValue.value * 100) / (numberMax.value || 100)).toFixed(numberPrecision.value)
          : props.label !== void 0
            ? props.label
            : '',
    );
    const computedWidth = computed(() =>
      parentMaxNumber.value
        ? `${(numberValue.value * 100) / parentMaxNumber.value}%`
        : numberMax.value
          ? `${(numberValue.value * 100) / numberMax.value}%`
          : typeof props.value === 'string'
            ? props.value
            : `${props.value}%`,
    );
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(['progress-bar', computedClasses.value]),
            style: normalizeStyle({ width: computedWidth.value }),
          },
          [renderSlot(_ctx.$slots, 'default', {}, () => [createTextVNode(toDisplayString(computedLabel.value), 1)])],
          6,
        )
      );
    };
  },
});
var _hoisted_130 = ['aria-valuenow', 'aria-valuemax'];
var _sfc_main49 = defineComponent({
  __name: 'BProgress',
  props: {
    height: { default: void 0 },
    animated: { type: Boolean, default: void 0 },
    max: { default: 100 },
    precision: { default: void 0 },
    showProgress: { type: Boolean, default: void 0 },
    showValue: { type: Boolean, default: void 0 },
    striped: { type: Boolean, default: void 0 },
    value: { default: void 0 },
    variant: { default: void 0 },
    bgVariant: { default: void 0 },
    textVariant: { default: void 0 },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BProgress');
    provide(progressInjectionKey, {
      animated: toRef(() => props.animated),
      max: toRef(() => props.max),
      showProgress: toRef(() => props.showProgress),
      showValue: toRef(() => props.showValue),
      striped: toRef(() => props.striped),
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: 'progress',
            role: 'progressbar',
            style: normalizeStyle({ height: unref(props).height }),
            'aria-valuenow': unref(props).value,
            'aria-valuemin': '0',
            'aria-valuemax': unref(props).max,
          },
          [
            renderSlot(_ctx.$slots, 'default', {}, () => [
              createVNode(
                _sfc_main$121,
                {
                  animated: unref(props).animated,
                  max: unref(props).max,
                  precision: unref(props).precision,
                  'show-progress': unref(props).showProgress,
                  'show-value': unref(props).showValue,
                  striped: unref(props).striped,
                  value: unref(props).value,
                  variant: unref(props).variant,
                  'text-variant': unref(props).textVariant,
                  'bg-variant': unref(props).bgVariant,
                },
                null,
                8,
                [
                  'animated',
                  'max',
                  'precision',
                  'show-progress',
                  'show-value',
                  'striped',
                  'value',
                  'variant',
                  'text-variant',
                  'bg-variant',
                ],
              ),
            ]),
          ],
          12,
          _hoisted_130,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BTable.vue_vue_type_script_setup_true_lang-CudEhMDM.mjs
var formatItem = (item, fieldKey, formatter) => {
  const val = get(item, fieldKey);
  return formatter && typeof formatter === 'function' ? formatter(val, fieldKey, item) : val;
};
var isTableItem = value => typeof value === 'object' && value !== null;
var isTableField = value => typeof value === 'object' && value !== null && 'key' in value;
var _sfc_main$72 = defineComponent({
  __name: 'BTbody',
  props: {
    variant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BTbody');
    const computedClasses = computed(() => ({
      [`thead-${props.variant}`]: props.variant !== null,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'tbody',
          {
            class: normalizeClass(computedClasses.value),
          },
          [renderSlot(_ctx.$slots, 'default')],
          2,
        )
      );
    };
  },
});
var _hoisted_1$3 = ['scope', 'colspan', 'rowspan', 'data-label'];
var _hoisted_2$3 = { key: 0 };
var _sfc_main$63 = defineComponent({
  __name: 'BTd',
  props: {
    colspan: { default: void 0 },
    rowspan: { default: void 0 },
    stackedHeading: { default: void 0 },
    stickyColumn: { type: Boolean, default: false },
    variant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BTd');
    const computedClasses = computed(() => ({
      [`table-${props.variant}`]: props.variant !== null,
      'b-table-sticky-column': props.stickyColumn,
      'table-b-table-default': props.stickyColumn && props.variant === null,
    }));
    const scope = computed(() => (props.colspan ? 'colspan' : props.rowspan ? 'rowspan' : 'col'));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'td',
          {
            scope: scope.value,
            class: normalizeClass(computedClasses.value),
            colspan: unref(props).colspan,
            rowspan: unref(props).rowspan,
            'data-label': unref(props).stackedHeading,
          },
          [
            unref(props).stackedHeading
              ? (openBlock(), createElementBlock('div', _hoisted_2$3, [renderSlot(_ctx.$slots, 'default')]))
              : renderSlot(_ctx.$slots, 'default', { key: 1 }),
          ],
          10,
          _hoisted_1$3,
        )
      );
    };
  },
});
var _sfc_main$53 = defineComponent({
  __name: 'BTfoot',
  props: {
    variant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BTfoot');
    const computedClasses = computed(() => ({
      [`table-${props.variant}`]: props.variant !== null,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'tfoot',
          {
            class: normalizeClass(computedClasses.value),
          },
          [renderSlot(_ctx.$slots, 'default')],
          2,
        )
      );
    };
  },
});
var _hoisted_1$23 = ['scope', 'colspan', 'rowspan', 'data-label'];
var _hoisted_2$2 = { key: 0 };
var _sfc_main$45 = defineComponent({
  __name: 'BTh',
  props: {
    colspan: { default: void 0 },
    rowspan: { default: void 0 },
    stackedHeading: { default: void 0 },
    stickyColumn: { type: Boolean, default: false },
    variant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BTh');
    const computedClasses = computed(() => ({
      [`table-${props.variant}`]: props.variant !== null,
      'b-table-sticky-column': props.stickyColumn,
      'table-b-table-default': props.stickyColumn && props.variant === null,
    }));
    const scope = computed(() => (props.colspan ? 'colspan' : props.rowspan ? 'rowspan' : 'col'));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'th',
          {
            scope: scope.value,
            class: normalizeClass(computedClasses.value),
            colspan: unref(props).colspan,
            rowspan: unref(props).rowspan,
            'data-label': unref(props).stackedHeading,
          },
          [
            unref(props).stackedHeading !== void 0
              ? (openBlock(), createElementBlock('div', _hoisted_2$2, [renderSlot(_ctx.$slots, 'default')]))
              : renderSlot(_ctx.$slots, 'default', { key: 1 }),
          ],
          10,
          _hoisted_1$23,
        )
      );
    };
  },
});
var _sfc_main$37 = defineComponent({
  __name: 'BThead',
  props: {
    variant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BThead');
    const computedClasses = computed(() => ({
      [`table-${props.variant}`]: props.variant !== null,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'thead',
          {
            class: normalizeClass(computedClasses.value),
          },
          [renderSlot(_ctx.$slots, 'default')],
          2,
        )
      );
    };
  },
});
var _sfc_main$27 = defineComponent({
  __name: 'BTr',
  props: {
    variant: { default: null },
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BTr');
    const computedClasses = computed(() => ({
      [`table-${props.variant}`]: props.variant !== null,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'tr',
          {
            class: normalizeClass(computedClasses.value),
          },
          [renderSlot(_ctx.$slots, 'default')],
          2,
        )
      );
    };
  },
});
var getTableFieldHeadLabel = field =>
  typeof field === 'string'
    ? titleCase(field)
    : field.label !== void 0
      ? field.label
      : typeof field.key === 'string'
        ? titleCase(field.key)
        : field.key;
var btableSimpleProps = Object.freeze(
  Object.keys({
    bordered: 0,
    borderless: 0,
    borderVariant: 0,
    captionTop: 0,
    dark: 0,
    fixed: 0,
    hover: 0,
    id: 0,
    noBorderCollapse: 0,
    outlined: 0,
    responsive: 0,
    small: 0,
    stacked: 0,
    stickyHeader: 0,
    striped: 0,
    stripedColumns: 0,
    variant: 0,
    tableAttrs: 0,
    tableClass: 0,
  }),
);
var btableLiteProps = Object.freeze(
  Object.keys({
    align: 0,
    caption: 0,
    detailsTdClass: 0,
    fieldColumnClass: 0,
    fields: 0,
    footClone: 0,
    footRowVariant: 0,
    footVariant: 0,
    headRowVariant: 0,
    headVariant: 0,
    items: 0,
    labelStacked: 0,
    modelValue: 0,
    primaryKey: 0,
    tbodyClass: 0,
    tbodyTrAttrs: 0,
    tbodyTrClass: 0,
    tfootClass: 0,
    tfootTrClass: 0,
    theadClass: 0,
    theadTrClass: 0,
  }),
);
var TABLE_TAG_NAMES = ['TD', 'TH', 'TR'];
var eventFilter = [
  'a',
  'a *',
  // Include content inside links
  'button',
  'button *',
  // Include content inside buttons
  'input:not(.disabled):not([disabled])',
  'select:not(.disabled):not([disabled])',
  'textarea:not(.disabled):not([disabled])',
  '[role="link"]',
  '[role="link"] *',
  '[role="button"]',
  '[role="button"] *',
  '[tabindex]:not(.disabled):not([disabled])',
].join(',');
var filterEvent = event => {
  if (!event || !event.target) {
    return false;
  }
  const el = event.target;
  if (('disabled' in el && el.disabled) || TABLE_TAG_NAMES.indexOf(el.tagName) !== -1) {
    return false;
  }
  if (el.closest('.dropdown-menu')) return true;
  const label = el.tagName === 'LABEL' ? el : el.closest('label');
  if (label) {
    const labelFor = label.getAttribute('for');
    const input = labelFor ? document.getElementById(labelFor) : label.querySelector('input, select, textarea');
    if (input && !input.disabled) {
      return true;
    }
  }
  return el.matches(eventFilter);
};
var _hoisted_1$110 = {
  key: 0,
  class: 'b-table-stacked-label',
};
var _hoisted_2$1 = { class: 'd-inline-flex flex-nowrap align-items-center gap-1' };
var _hoisted_3$1 = { key: 2 };
var _sfc_main$122 = defineComponent({
  __name: 'BTableLite',
  props: {
    align: { default: void 0 },
    caption: { default: void 0 },
    detailsTdClass: { default: void 0 },
    fieldColumnClass: { type: [Function, String, Object, Array], default: void 0 },
    fields: { default: () => [] },
    footClone: { type: Boolean, default: false },
    footRowVariant: { default: void 0 },
    footVariant: { default: void 0 },
    headRowVariant: { default: void 0 },
    headVariant: { default: void 0 },
    items: { default: () => [] },
    labelStacked: { type: Boolean, default: false },
    modelValue: { default: void 0 },
    primaryKey: { default: void 0 },
    tbodyClass: { default: void 0 },
    tbodyTrAttrs: { type: [Function, Object], default: void 0 },
    tbodyTrClass: { type: [Function, String, Array, Object], default: void 0 },
    tfootClass: { default: void 0 },
    tfootTrClass: { default: void 0 },
    theadClass: { default: void 0 },
    theadTrClass: { default: void 0 },
    bordered: { type: Boolean, default: void 0 },
    borderless: { type: Boolean, default: void 0 },
    borderVariant: { default: void 0 },
    captionTop: { type: Boolean, default: void 0 },
    dark: { type: Boolean, default: void 0 },
    fixed: { type: Boolean, default: void 0 },
    hover: { type: Boolean, default: void 0 },
    id: { default: void 0 },
    noBorderCollapse: { type: Boolean, default: void 0 },
    outlined: { type: Boolean, default: void 0 },
    responsive: { type: [Boolean, String], default: void 0 },
    small: { type: Boolean, default: void 0 },
    stacked: { type: [Boolean, String], default: void 0 },
    stickyHeader: { type: [Boolean, String, Number], default: void 0 },
    striped: { type: Boolean, default: void 0 },
    stripedColumns: { type: Boolean, default: void 0 },
    variant: { default: void 0 },
    tableAttrs: {},
    tableClass: { default: void 0 },
  },
  emits: ['head-clicked', 'row-clicked', 'row-dblclicked', 'row-contextmenu', 'row-hovered', 'row-unhovered', 'row-middle-clicked'],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BTableLite');
    const emit = __emit;
    const slots = useSlots();
    const computedId = useId2(() => props.id);
    const generateDetailsItem = item => [item, item._showDetails];
    const detailsMap = ref(/* @__PURE__ */ new WeakMap());
    watch(
      () => props.items,
      items => {
        items.forEach(item => {
          if (!isTableItem(item)) return;
          detailsMap.value.set(...generateDetailsItem(item));
        });
      },
      { deep: true, immediate: true },
    );
    const computedTableClasses = computed(() => [
      props.tableClass,
      {
        [`align-${props.align}`]: props.align !== void 0,
      },
    ]);
    const computedFields = computed(() => {
      if (!props.fields.length && props.items.length) {
        const [firstItem] = props.items;
        if (firstItem && (isTableItem(firstItem) || Array.isArray(firstItem))) {
          return Object.keys(firstItem).map(k => {
            const label = startCase(k);
            return {
              key: k,
              label,
              tdAttr: props.stacked === true ? { 'data-label': label } : void 0,
            };
          });
        }
        return [{ key: '', _noHeader: true }];
      }
      return props.fields.map(f => {
        if (isTableField(f)) {
          const label2 = f.label ?? startCase(f.key);
          return {
            ...f,
            tdAttr: props.stacked === true ? { 'data-label': label2, ...f.tdAttr } : f.tdAttr,
          };
        }
        const label = startCase(f);
        return {
          key: f,
          label,
          tdAttr: props.stacked === true ? { 'data-label': label } : void 0,
        };
      });
    });
    const computedFieldsTotal = computed(() => computedFields.value.length);
    const showComputedHeaders = computed(() => {
      if (computedFieldsTotal.value > 0 && computedFields.value.every(el => el._noHeader === true)) return false;
      return true;
    });
    const footerProps = computed(() => ({
      variant: props.footVariant,
      class: props.tfootClass,
    }));
    const itemAttributes = (item, fieldKey, attr) => {
      const val = get(item, fieldKey);
      return attr && typeof attr === 'function' ? attr(val, fieldKey, item) : attr;
    };
    const callThAttr = (item, field, type) => {
      const fieldKey = String(field.key);
      const val = get(item, fieldKey);
      return field.thAttr && typeof field.thAttr === 'function' ? field.thAttr(val, fieldKey, item, type) : field.thAttr;
    };
    const headerClicked = (field, event, isFooter = false) => {
      emit('head-clicked', field.key, field, event, isFooter);
    };
    const toggleRowDetails = tr => {
      if (isTableItem(tr)) {
        const prevValue = detailsMap.value.get(tr);
        detailsMap.value.set(tr, !prevValue);
        tr._showDetails = !prevValue;
      }
    };
    const getFieldColumnClasses = field => [
      field.class,
      field.thClass,
      {
        'b-table-sticky-column': field.stickyColumn,
      },
      props.fieldColumnClass
        ? typeof props.fieldColumnClass === 'function'
          ? props.fieldColumnClass(field)
          : props.fieldColumnClass
        : null,
    ];
    const getFieldRowClasses = (field, tr) => {
      var _a, _b;
      const val = get(tr, String(field.key));
      return [
        field.class,
        typeof field.tdClass === 'function' ? field.tdClass(val, String(field.key), tr) : field.tdClass,
        (isTableItem(tr) ? ((_a = tr._cellVariants) == null ? void 0 : _a[field.key]) : false)
          ? `table-${(_b = tr._cellVariants) == null ? void 0 : _b[field.key]}`
          : null,
        {
          'b-table-sticky-column': field.stickyColumn,
        },
      ];
    };
    const handleMiddleClick = (item, itemIndex, event) => {
      if (event.button === 1 && !filterEvent(event)) {
        emit('row-middle-clicked', item, itemIndex, event);
      }
    };
    const callTbodyTrAttrs = (item, type) =>
      props.tbodyTrAttrs ? (typeof props.tbodyTrAttrs === 'function' ? props.tbodyTrAttrs(item, type) : props.tbodyTrAttrs) : null;
    const getRowClasses = (item, type) =>
      props.tbodyTrClass ? (typeof props.tbodyTrClass === 'function' ? props.tbodyTrClass(item, type) : props.tbodyTrClass) : null;
    const generateTableRowId = primaryKeyValue => `${computedId.value}__row_${primaryKeyValue}`;
    const computedSimpleProps = computed(() => ({
      ...pick(props, btableSimpleProps),
      tableClass: computedTableClasses.value,
      id: computedId.value,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main45,
          normalizeProps(guardReactiveProps(computedSimpleProps.value)),
          {
            default: withCtx(() => [
              withDirectives(
                createVNode(
                  _sfc_main$37,
                  {
                    variant: unref(props).headVariant,
                    class: normalizeClass(unref(props).theadClass),
                  },
                  {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, 'thead-top', {
                        columns: computedFieldsTotal.value,
                        fields: computedFields.value,
                      }),
                      createVNode(
                        _sfc_main$27,
                        {
                          variant: unref(props).headRowVariant,
                          class: normalizeClass(unref(props).theadTrClass),
                        },
                        {
                          default: withCtx(() => [
                            (openBlock(true),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(computedFields.value, field => {
                                return (
                                  openBlock(),
                                  createBlock(
                                    _sfc_main$45,
                                    mergeProps(
                                      {
                                        key: field.key,
                                        scope: 'col',
                                        class: getFieldColumnClasses(field),
                                        title: field.headerTitle,
                                        variant: field.variant,
                                        abbr: field.headerAbbr,
                                        style: field.thStyle,
                                        ref_for: true,
                                      },
                                      callThAttr(null, field, 'top'),
                                      {
                                        onClick: $event => headerClicked(field, $event),
                                      },
                                    ),
                                    {
                                      default: withCtx(() => [
                                        renderSlot(
                                          _ctx.$slots,
                                          slots[`head(${String(field.key)})`] ? `head(${String(field.key)})` : 'head()',
                                          {
                                            label: field.label,
                                            column: field.key,
                                            field,
                                            isFoot: false,
                                          },
                                          () => [createTextVNode(toDisplayString(unref(getTableFieldHeadLabel)(field)), 1)],
                                        ),
                                      ]),
                                      _: 2,
                                    },
                                    1040,
                                    ['class', 'title', 'variant', 'abbr', 'style', 'onClick'],
                                  )
                                );
                              }),
                              128,
                            )),
                          ]),
                          _: 3,
                        },
                        8,
                        ['variant', 'class'],
                      ),
                      slots['thead-sub']
                        ? (openBlock(),
                          createBlock(
                            _sfc_main$27,
                            { key: 0 },
                            {
                              default: withCtx(() => [
                                (openBlock(true),
                                createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(computedFields.value, field => {
                                    return (
                                      openBlock(),
                                      createBlock(
                                        _sfc_main$63,
                                        {
                                          key: field.key,
                                          scope: 'col',
                                          variant: field.variant,
                                          class: normalizeClass([field.class, field.thClass]),
                                        },
                                        {
                                          default: withCtx(() => [
                                            renderSlot(
                                              _ctx.$slots,
                                              'thead-sub',
                                              {
                                                items: unref(props).items,
                                                fields: computedFields.value,
                                                field,
                                              },
                                              () => [createTextVNode(toDisplayString(field.label), 1)],
                                            ),
                                          ]),
                                          _: 2,
                                        },
                                        1032,
                                        ['variant', 'class'],
                                      )
                                    );
                                  }),
                                  128,
                                )),
                              ]),
                              _: 3,
                            },
                          ))
                        : createCommentVNode('', true),
                    ]),
                    _: 3,
                  },
                  8,
                  ['variant', 'class'],
                ),
                [[vShow, showComputedHeaders.value]],
              ),
              createVNode(
                _sfc_main$72,
                {
                  class: normalizeClass(unref(props).tbodyClass),
                },
                {
                  default: withCtx(() => [
                    renderSlot(
                      _ctx.$slots,
                      'custom-body',
                      {
                        fields: computedFields.value,
                        items: unref(props).items,
                        columns: computedFieldsTotal.value,
                      },
                      () => [
                        !unref(props).stacked && slots['top-row']
                          ? (openBlock(),
                            createBlock(
                              _sfc_main$27,
                              mergeProps(
                                {
                                  key: 0,
                                  class: getRowClasses(null, 'row-top'),
                                },
                                callTbodyTrAttrs(null, 'row-top'),
                              ),
                              {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, 'top-row', {
                                    columns: computedFieldsTotal.value,
                                    fields: computedFields.value,
                                  }),
                                ]),
                                _: 3,
                              },
                              16,
                              ['class'],
                            ))
                          : createCommentVNode('', true),
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(unref(props).items, (item, itemIndex) => {
                            return (
                              openBlock(),
                              createElementBlock(
                                Fragment,
                                {
                                  key:
                                    unref(props).primaryKey && unref(get)(item, unref(props).primaryKey)
                                      ? unref(get)(item, unref(props).primaryKey)
                                      : itemIndex,
                                },
                                [
                                  createVNode(
                                    _sfc_main$27,
                                    mergeProps(
                                      {
                                        id:
                                          unref(props).primaryKey && unref(get)(item, unref(props).primaryKey)
                                            ? generateTableRowId(unref(get)(item, unref(props).primaryKey))
                                            : void 0,
                                        class: getRowClasses(item, 'row'),
                                        variant: unref(isTableItem)(item) ? item._rowVariant : void 0,
                                        ref_for: true,
                                      },
                                      callTbodyTrAttrs(item, 'row'),
                                      {
                                        onClick: $event => !unref(filterEvent)($event) && emit('row-clicked', item, itemIndex, $event),
                                        onDblclick: $event =>
                                          !unref(filterEvent)($event) && emit('row-dblclicked', item, itemIndex, $event),
                                        onContextmenu: $event =>
                                          !unref(filterEvent)($event) && emit('row-contextmenu', item, itemIndex, $event),
                                        onMouseenter: $event => !unref(filterEvent)($event) && emit('row-hovered', item, itemIndex, $event),
                                        onMouseleave: $event =>
                                          !unref(filterEvent)($event) && emit('row-unhovered', item, itemIndex, $event),
                                        onMousedown: $event => handleMiddleClick(item, itemIndex, $event),
                                      },
                                    ),
                                    {
                                      default: withCtx(() => [
                                        (openBlock(true),
                                        createElementBlock(
                                          Fragment,
                                          null,
                                          renderList(computedFields.value, field => {
                                            var _a;
                                            return (
                                              openBlock(),
                                              createBlock(
                                                _sfc_main$63,
                                                mergeProps(
                                                  {
                                                    key: field.key,
                                                    variant: (
                                                      unref(isTableItem)(item)
                                                        ? (_a = item._cellVariants) == null
                                                          ? void 0
                                                          : _a[field.key]
                                                        : false
                                                    )
                                                      ? null
                                                      : field.variant,
                                                    class: getFieldRowClasses(field, item),
                                                    ref_for: true,
                                                  },
                                                  itemAttributes(item, String(field.key), field.tdAttr),
                                                ),
                                                {
                                                  default: withCtx(() => [
                                                    unref(props).stacked && unref(props).labelStacked
                                                      ? (openBlock(),
                                                        createElementBlock(
                                                          'label',
                                                          _hoisted_1$110,
                                                          toDisplayString(unref(getTableFieldHeadLabel)(field)),
                                                          1,
                                                        ))
                                                      : createCommentVNode('', true),
                                                    renderSlot(
                                                      _ctx.$slots,
                                                      slots[`cell(${String(field.key)})`] ? `cell(${String(field.key)})` : 'cell()',
                                                      {
                                                        value: unref(formatItem)(item, String(field.key), field.formatter),
                                                        unformatted: unref(get)(item, String(field.key)),
                                                        index: itemIndex,
                                                        item,
                                                        field,
                                                        items: _ctx.items,
                                                        toggleDetails: () => toggleRowDetails(item),
                                                        detailsShowing: unref(isTableItem)(item)
                                                          ? (detailsMap.value.get(item) ?? false)
                                                          : false,
                                                      },
                                                      () => [
                                                        !slots[`cell(${String(field.key)})`] && !slots['cell()']
                                                          ? (openBlock(),
                                                            createElementBlock(
                                                              Fragment,
                                                              { key: 0 },
                                                              [
                                                                createTextVNode(
                                                                  toDisplayString(
                                                                    unref(formatItem)(item, String(field.key), field.formatter),
                                                                  ),
                                                                  1,
                                                                ),
                                                              ],
                                                              64,
                                                            ))
                                                          : createCommentVNode('', true),
                                                      ],
                                                    ),
                                                  ]),
                                                  _: 2,
                                                },
                                                1040,
                                                ['variant', 'class'],
                                              )
                                            );
                                          }),
                                          128,
                                        )),
                                      ]),
                                      _: 2,
                                    },
                                    1040,
                                    [
                                      'id',
                                      'class',
                                      'variant',
                                      'onClick',
                                      'onDblclick',
                                      'onContextmenu',
                                      'onMouseenter',
                                      'onMouseleave',
                                      'onMousedown',
                                    ],
                                  ),
                                  unref(isTableItem)(item) && detailsMap.value.get(item) === true && slots['row-details']
                                    ? (openBlock(),
                                      createElementBlock(
                                        Fragment,
                                        { key: 0 },
                                        [
                                          createVNode(_sfc_main$27, {
                                            'aria-hidden': 'true',
                                            role: 'presentation',
                                            class: 'd-none',
                                          }),
                                          createVNode(
                                            _sfc_main$27,
                                            mergeProps(
                                              {
                                                class: getRowClasses(item, 'row-details'),
                                                variant: item._rowVariant,
                                                ref_for: true,
                                              },
                                              callTbodyTrAttrs(item, 'row-details'),
                                            ),
                                            {
                                              default: withCtx(() => [
                                                createVNode(
                                                  _sfc_main$63,
                                                  {
                                                    colspan: computedFieldsTotal.value,
                                                    class: normalizeClass(_ctx.detailsTdClass),
                                                  },
                                                  {
                                                    default: withCtx(() => [
                                                      renderSlot(_ctx.$slots, 'row-details', {
                                                        item,
                                                        toggleDetails: () => toggleRowDetails(item),
                                                        fields: computedFields.value,
                                                        index: itemIndex,
                                                      }),
                                                    ]),
                                                    _: 2,
                                                  },
                                                  1032,
                                                  ['colspan', 'class'],
                                                ),
                                              ]),
                                              _: 2,
                                            },
                                            1040,
                                            ['class', 'variant'],
                                          ),
                                        ],
                                        64,
                                      ))
                                    : createCommentVNode('', true),
                                ],
                                64,
                              )
                            );
                          }),
                          128,
                        )),
                        !unref(props).stacked && slots['bottom-row']
                          ? (openBlock(),
                            createBlock(
                              _sfc_main$27,
                              mergeProps(
                                {
                                  key: 1,
                                  class: ['bottom-row', getRowClasses(null, 'row-bottom')],
                                },
                                callTbodyTrAttrs(null, 'row-bottom'),
                              ),
                              {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, 'bottom-row', {
                                    columns: computedFieldsTotal.value,
                                    fields: computedFields.value,
                                  }),
                                ]),
                                _: 3,
                              },
                              16,
                              ['class'],
                            ))
                          : createCommentVNode('', true),
                      ],
                    ),
                  ]),
                  _: 3,
                },
                8,
                ['class'],
              ),
              unref(props).footClone
                ? (openBlock(),
                  createBlock(
                    _sfc_main$53,
                    normalizeProps(mergeProps({ key: 0 }, footerProps.value)),
                    {
                      default: withCtx(() => [
                        createVNode(
                          _sfc_main$27,
                          {
                            variant: unref(props).footRowVariant,
                            class: normalizeClass(unref(props).tfootTrClass),
                          },
                          {
                            default: withCtx(() => [
                              (openBlock(true),
                              createElementBlock(
                                Fragment,
                                null,
                                renderList(computedFields.value, field => {
                                  return (
                                    openBlock(),
                                    createBlock(
                                      _sfc_main$45,
                                      mergeProps(
                                        {
                                          key: field.key,
                                          scope: 'col',
                                          class: getFieldColumnClasses(field),
                                          title: field.headerTitle,
                                          abbr: field.headerAbbr,
                                          style: field.thStyle,
                                          variant: field.variant,
                                          ref_for: true,
                                        },
                                        callThAttr(null, field, 'bottom'),
                                        {
                                          onClick: $event => headerClicked(field, $event, true),
                                        },
                                      ),
                                      {
                                        default: withCtx(() => [
                                          createBaseVNode('div', _hoisted_2$1, [
                                            createBaseVNode('div', null, [
                                              renderSlot(
                                                _ctx.$slots,
                                                slots[`foot(${String(field.key)})`] ? `foot(${String(field.key)})` : 'foot()',
                                                {
                                                  label: field.label,
                                                  column: field.key,
                                                  field,
                                                  isFoot: true,
                                                },
                                                () => [createTextVNode(toDisplayString(unref(getTableFieldHeadLabel)(field)), 1)],
                                              ),
                                            ]),
                                          ]),
                                        ]),
                                        _: 2,
                                      },
                                      1040,
                                      ['class', 'title', 'abbr', 'style', 'variant', 'onClick'],
                                    )
                                  );
                                }),
                                128,
                              )),
                            ]),
                            _: 3,
                          },
                          8,
                          ['variant', 'class'],
                        ),
                      ]),
                      _: 3,
                    },
                    16,
                  ))
                : slots['custom-foot']
                  ? (openBlock(),
                    createBlock(
                      _sfc_main$53,
                      normalizeProps(mergeProps({ key: 1 }, footerProps.value)),
                      {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, 'custom-foot', {
                            fields: computedFields.value,
                            items: unref(props).items,
                            columns: computedFieldsTotal.value,
                          }),
                        ]),
                        _: 3,
                      },
                      16,
                    ))
                  : createCommentVNode('', true),
              slots['table-caption'] || unref(props).caption
                ? (openBlock(),
                  createElementBlock('caption', _hoisted_3$1, [
                    renderSlot(_ctx.$slots, 'table-caption', {}, () => [createTextVNode(toDisplayString(unref(props).caption), 1)]),
                  ]))
                : createCommentVNode('', true),
            ]),
            _: 3,
          },
          16,
        )
      );
    };
  },
});
var _hoisted_131 = {
  style: { opacity: 0.4 },
  xmlns: 'http://www.w3.org/2000/svg',
  width: '24',
  height: '24',
  fill: 'currentColor',
  class: 'bi bi-arrow-up-short',
  viewBox: '0 0 16 16',
  'aria-hidden': '',
};
var _hoisted_216 = {
  role: 'alert',
  'aria-live': 'polite',
};
var _hoisted_35 = { class: 'text-center my-2' };
var _sfc_main50 = defineComponent({
  __name: 'BTable',
  props: mergeModels(
    {
      provider: { default: void 0 },
      noProvider: { default: void 0 },
      noProviderPaging: { type: Boolean, default: false },
      noProviderSorting: { type: Boolean, default: false },
      noProviderFiltering: { type: Boolean, default: false },
      mustSort: { type: [Boolean, Array], default: false },
      selectable: { type: Boolean, default: false },
      multisort: { type: Boolean, default: false },
      stickySelect: { type: Boolean, default: false },
      selectHead: { type: [Boolean, String], default: true },
      selectMode: { default: 'multi' },
      selectionVariant: { default: 'primary' },
      busyLoadingText: { default: 'Loading...' },
      perPage: { default: Number.POSITIVE_INFINITY },
      currentPage: { default: 1 },
      filter: { default: void 0 },
      filterFunction: { type: Function, default: void 0 },
      filterable: { default: void 0 },
      noLocalSorting: { type: Boolean, default: false },
      noSelectOnClick: { type: Boolean, default: false },
      noSortableIcon: { type: Boolean, default: false },
      emptyFilteredText: { default: 'There are no records matching your request' },
      emptyText: { default: 'There are no records to show' },
      showEmpty: { type: Boolean, default: false },
      align: { default: void 0 },
      caption: { default: void 0 },
      detailsTdClass: { default: void 0 },
      fieldColumnClass: { type: [Function, String, Object, Array], default: void 0 },
      fields: { default: () => [] },
      footClone: { type: Boolean, default: void 0 },
      footRowVariant: { default: void 0 },
      footVariant: { default: void 0 },
      headRowVariant: { default: void 0 },
      headVariant: { default: void 0 },
      items: { default: () => [] },
      labelStacked: { type: Boolean, default: void 0 },
      modelValue: { default: void 0 },
      primaryKey: { default: void 0 },
      tbodyClass: { default: void 0 },
      tbodyTrAttrs: {},
      tbodyTrClass: { type: [Function, String, Array, Object], default: void 0 },
      tfootClass: { default: void 0 },
      tfootTrClass: { default: void 0 },
      theadClass: { default: void 0 },
      theadTrClass: { default: void 0 },
      bordered: { type: Boolean, default: void 0 },
      borderless: { type: Boolean, default: void 0 },
      borderVariant: { default: void 0 },
      captionTop: { type: Boolean, default: void 0 },
      dark: { type: Boolean, default: void 0 },
      fixed: { type: Boolean, default: void 0 },
      hover: { type: Boolean, default: void 0 },
      id: { default: void 0 },
      noBorderCollapse: { type: Boolean, default: void 0 },
      outlined: { type: Boolean, default: void 0 },
      responsive: { type: [Boolean, String], default: void 0 },
      small: { type: Boolean, default: void 0 },
      stacked: { type: [Boolean, String], default: void 0 },
      stickyHeader: { type: [Boolean, String, Number], default: void 0 },
      striped: { type: Boolean, default: void 0 },
      stripedColumns: { type: Boolean, default: void 0 },
      variant: { default: void 0 },
      tableAttrs: {},
    },
    {
      sortBy: {
        default: void 0,
      },
      sortByModifiers: {},
      busy: {
        type: Boolean,
        ...{
          default: false,
        },
      },
      busyModifiers: {},
      selectedItems: {
        default: () => [],
      },
      selectedItemsModifiers: {},
    },
  ),
  emits: mergeModels(
    [
      'filtered',
      'head-clicked',
      'row-clicked',
      'row-dblclicked',
      'row-contextmenu',
      'row-hovered',
      'row-unhovered',
      'row-middle-clicked',
      'row-selected',
      'row-unselected',
      'sorted',
      'change',
    ],
    ['update:sortBy', 'update:busy', 'update:selectedItems'],
  ),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BTable');
    const emit = __emit;
    const slots = useSlots();
    const dynamicCellSlots = computed(() => Object.keys(slots).filter(key => key.startsWith('cell(')));
    const dynamicFootSlots = computed(() => Object.keys(slots).filter(key => key.startsWith('foot(')));
    const sortByModel = useModel(__props, 'sortBy');
    const busyModel = useModel(__props, 'busy');
    const selectedItemsModel = useModel(__props, 'selectedItems');
    const computedId = useId2(() => props.id);
    const selectedItemsToSet = computed({
      get: () => new Set(selectedItemsModel.value),
      set: val => {
        selectedItemsModel.value = [...val];
      },
    });
    watch(selectedItemsToSet, (newValue, oldValue) => {
      Array.from(oldValue)
        .filter(item => !newValue.has(item))
        .forEach(item => {
          emit('row-unselected', item);
        });
      Array.from(newValue)
        .filter(item => !oldValue.has(item))
        .forEach(item => {
          emit('row-selected', item);
        });
    });
    const selectedItemsSetUtilities = {
      add: item => {
        const value = new Set(selectedItemsToSet.value);
        value.add(item);
        selectedItemsToSet.value = value;
      },
      clear: () => {
        selectedItemsToSet.value.forEach(item => {
          selectedItemsSetUtilities.delete(item);
        });
      },
      delete: item => {
        const value = new Set(selectedItemsToSet.value);
        if (props.primaryKey) {
          const pkey = props.primaryKey;
          selectedItemsModel.value.forEach((v, i) => {
            const selectedKey = get(v, pkey);
            const itemKey = get(item, pkey);
            if (!!selectedKey && !!itemKey && selectedKey === itemKey) {
              value.delete(selectedItemsModel.value[i]);
            }
          });
        } else {
          value.delete(item);
        }
        selectedItemsToSet.value = value;
      },
      set: items => {
        selectedItemsToSet.value = new Set(items);
      },
      has: item => {
        if (!props.primaryKey) return selectedItemsToSet.value.has(item);
        const pkey = props.primaryKey;
        for (const selected of selectedItemsToSet.value) {
          const selectedKey = get(selected, pkey);
          const itemKey = get(item, pkey);
          if (!!selectedKey && !!itemKey && selectedKey === itemKey) return true;
        }
        return false;
      },
    };
    const internalItems = ref([]);
    const perPageNumber = useToNumber(() => props.perPage, { method: 'parseInt' });
    const currentPageNumber = useToNumber(() => props.currentPage, { method: 'parseInt' });
    const isFilterableTable = computed(() => !!props.filter);
    const usesProvider = computed(() => props.provider !== void 0);
    const isSelecting = computed(() => selectedItemsToSet.value.size > 0);
    const isSortable = computed(
      () =>
        sortByModel.value !== void 0 || props.fields.some(field => typeof field === 'object' && field !== null && field.sortable === true),
    );
    const computedFields = computed(() =>
      props.fields.map(el => {
        var _a;
        if (!isTableField(el)) {
          const label = startCase(el);
          return {
            key: el,
            label,
            tdAttr: props.stacked === true ? { 'data-label': label } : void 0,
          };
        }
        const value = (_a = sortByModel.value) == null ? void 0 : _a.find(sb => el.key === sb.key);
        const sortValue =
          isSortable.value === false
            ? void 0
            : value === void 0
              ? 'none'
              : value.order === 'desc'
                ? 'descending'
                : value.order === 'asc'
                  ? 'ascending'
                  : 'none';
        return {
          ...el,
          thAttr: {
            'aria-sort': sortValue,
            ...el.thAttr,
          },
        };
      }),
    );
    const tableClasses = computed(() => ({
      'b-table-busy': busyModel.value,
      'b-table-selectable': props.selectable,
      'user-select-none': props.selectable && isSelecting.value,
    }));
    const getBusyRowClasses = computed(() => [
      props.tbodyTrClass ? (typeof props.tbodyTrClass === 'function' ? props.tbodyTrClass(null, 'table-busy') : props.tbodyTrClass) : null,
    ]);
    const getFieldColumnClasses = field => [
      {
        'b-table-sortable-column': isSortable.value && field.sortable,
      },
    ];
    const getRowClasses = (item, type) => [
      {
        [`selected table-${props.selectionVariant}`]: props.selectable && !!item && selectedItemsSetUtilities.has(item),
      },
      props.tbodyTrClass ? (typeof props.tbodyTrClass === 'function' ? props.tbodyTrClass(item, type) : props.tbodyTrClass) : null,
    ];
    const getFormatter = value => (typeof value.sortByFormatted === 'function' ? value.sortByFormatted : value.formatter);
    const computedItems = computed(() => {
      var _a;
      const sortByItems = (_a = sortByModel.value) == null ? void 0 : _a.filter(el => !!el.order);
      const mapItem = item => {
        if (typeof item === 'object' && item !== null && Object.keys(item).some(key => key.includes('.'))) {
          let newItem = {};
          for (const key in item) {
            if (key.includes('.')) {
              newItem = set(newItem, key, item[key]);
            } else {
              newItem[key] = item[key];
            }
          }
          return newItem;
        }
        return item;
      };
      const filterItem = item => {
        if (!isTableItem(item)) return true;
        return Object.entries(item).some(([key, val]) => {
          var _a2, _b, _c;
          if (
            val === null ||
            val === void 0 ||
            key[0] === '_' ||
            (!((_a2 = props.filterable) == null ? void 0 : _a2.includes(key)) && !!((_b = props.filterable) == null ? void 0 : _b.length))
          )
            return false;
          if (props.filterFunction && typeof props.filterFunction === 'function') {
            return props.filterFunction(item, props.filter);
          }
          const realVal = () => {
            const filterField = computedFields.value.find(el => {
              if (isTableField(el)) return el.key === key;
              return false;
            });
            if (isTableField(filterField) && !!filterField.filterByFormatted) {
              const formatter = getFormatter(filterField);
              if (formatter) {
                return String(formatter(val, String(filterField.key), item));
              }
            }
            return typeof val === 'object' ? JSON.stringify(Object.values(val)) : val.toString();
          };
          const itemValue = realVal();
          return itemValue.toLowerCase().includes(((_c = props.filter) == null ? void 0 : _c.toLowerCase()) ?? '');
        });
      };
      const mappedItems = (usesProvider.value ? internalItems.value : props.items).reduce((acc, val) => {
        const item = mapItem(val);
        const shouldFilter = isFilterableTable.value && (!usesProvider.value || props.noProviderFiltering);
        if (!shouldFilter || filterItem(item)) acc.push(item);
        return acc;
      }, []);
      if (
        (sortByItems == null ? void 0 : sortByItems.length) &&
        ((isSortable.value === true && !usesProvider.value && !props.noLocalSorting) ||
          (isSortable.value === true && usesProvider.value && props.noProviderSorting))
      ) {
        return mappedItems.sort((a, b) => {
          for (let i = 0; i < sortByItems.length; i++) {
            const { key, comparer, order } = sortByItems[i];
            const getStringValue = ob => {
              if (!isTableItem(ob)) return String(ob);
              const sortField = computedFields.value.find(el => {
                if (isTableField(el)) return el.key === key;
                return false;
              });
              const val = get(ob, key);
              if (isTableField(sortField) && !!sortField.sortByFormatted) {
                const formatter = getFormatter(sortField);
                if (formatter) {
                  return String(formatItem(ob, String(sortField.key), formatter));
                }
              }
              return typeof val === 'object' && val !== null ? JSON.stringify(val) : ((val == null ? void 0 : val.toString()) ?? '');
            };
            const comparison = comparer
              ? comparer(a, b, key)
              : getStringValue(a).localeCompare(getStringValue(b), void 0, { numeric: true });
            if (comparison !== 0) {
              return order === 'asc' ? comparison : -comparison;
            }
          }
          return 0;
        });
      }
      return mappedItems;
    });
    const emptySlotScope = computed(() => ({
      emptyFilteredText: props.emptyFilteredText,
      emptyText: props.emptyText,
      fields: computedFields.value,
      items: computedItems.value,
    }));
    const computedDisplayItems = computed(() => {
      if (Number.isNaN(perPageNumber.value) || (usesProvider.value && !props.noProviderPaging)) {
        return computedItems.value;
      }
      return computedItems.value.slice(
        (currentPageNumber.value - 1) * (perPageNumber.value || Number.POSITIVE_INFINITY),
        currentPageNumber.value * (perPageNumber.value || Number.POSITIVE_INFINITY),
      );
    });
    watch(computedDisplayItems, v => {
      emit('change', v);
    });
    const handleRowSelection = (row, index8, shiftClicked = false, ctrlClicked = false, metaClicked = false) => {
      if (!props.selectable) return;
      if (props.selectMode === 'single' || props.selectMode === 'multi') {
        if (shiftClicked || ctrlClicked) return;
        if (selectedItemsSetUtilities.has(row)) {
          selectedItemsSetUtilities.delete(row);
        } else {
          if (props.selectMode === 'single') {
            selectedItemsSetUtilities.set([row]);
          } else {
            selectedItemsSetUtilities.add(row);
          }
        }
      } else {
        if (ctrlClicked || metaClicked) {
          if (selectedItemsSetUtilities.has(row)) {
            selectedItemsSetUtilities.delete(row);
          } else {
            selectedItemsSetUtilities.add(row);
          }
        } else if (shiftClicked) {
          const lastSelectedItem = [...selectedItemsToSet.value].pop();
          const lastSelectedIndex = computedItems.value.findIndex(i => i === lastSelectedItem);
          const selectStartIndex = Math.min(lastSelectedIndex, index8);
          const selectEndIndex = Math.max(lastSelectedIndex, index8);
          const items = computedItems.value.slice(selectStartIndex, selectEndIndex + 1);
          selectedItemsSetUtilities.set(items);
        } else {
          selectedItemsSetUtilities.set([row]);
        }
      }
    };
    const onRowClick = (row, index8, e) => {
      if (props.noSelectOnClick === false) {
        handleRowSelection(row, index8, e.shiftKey, e.ctrlKey, e.metaKey);
      }
      emit('row-clicked', row, index8, e);
    };
    const handleFieldSorting = field => {
      var _a, _b;
      if (!isSortable.value) return;
      const fieldKey = typeof field === 'object' && field !== null ? field.key : field;
      const fieldSortable = typeof field === 'object' && field !== null ? field.sortable : false;
      if (!(isSortable.value === true && fieldSortable === true)) return;
      const resolveOrder = val => {
        if (val === 'asc') return 'desc';
        if (val === void 0) return 'asc';
        if (props.mustSort === true || (Array.isArray(props.mustSort) && props.mustSort.includes(fieldKey))) return 'asc';
        return void 0;
      };
      const index8 = ((_a = sortByModel.value) == null ? void 0 : _a.findIndex(el => el.key === fieldKey)) ?? -1;
      const originalValue = (_b = sortByModel.value) == null ? void 0 : _b[index8];
      const updatedValue =
        // If value is new, we default to ascending
        // Otherwise we make a temp copy of the value
        index8 === -1 || !originalValue ? { key: fieldKey, order: 'asc' } : { ...originalValue };
      const handleMultiSort = () => {
        sortByModel.value = sortByModel.value ?? [];
        const val = updatedValue;
        if (index8 === -1) {
          sortByModel.value.push(val);
        } else {
          val.order = resolveOrder(val.order);
          sortByModel.value.splice(index8, 1, val);
        }
        return val;
      };
      const handleSingleSort = () => {
        const val = {
          ...updatedValue,
          order: index8 === -1 ? updatedValue.order : resolveOrder(updatedValue.order),
        };
        const tmp = (sortByModel.value || []).map(e => ({
          ...e,
          order: void 0,
        }));
        if (index8 === -1) {
          tmp.push(val);
        } else {
          tmp[index8] = val;
        }
        sortByModel.value = tmp;
        return val;
      };
      emit('sorted', props.multisort === true ? handleMultiSort() : handleSingleSort());
    };
    const onFieldHeadClick = (fieldKey, field, event, isFooter = false) => {
      emit('head-clicked', fieldKey, field, event, isFooter);
      handleFieldSorting(field);
    };
    const callItemsProvider = async () => {
      if (!usesProvider.value || props.provider === void 0 || busyModel.value) return;
      busyModel.value = true;
      const response = props.provider({
        currentPage: currentPageNumber.value,
        filter: props.filter,
        sortBy: sortByModel.value,
        perPage: perPageNumber.value,
      });
      try {
        const items = response instanceof Promise ? await response : response;
        if (items === void 0) return;
        internalItems.value = items;
      } finally {
        busyModel.value = false;
      }
    };
    const providerPropsWatch = async (prop, val, oldVal) => {
      if (val === oldVal) return;
      const inNoProvider = key => {
        var _a;
        return ((_a = props.noProvider) == null ? void 0 : _a.includes(key)) === true;
      };
      const noProvideWhenPaging =
        (prop === 'currentPage' || prop === 'perPage') && (inNoProvider('paging') || props.noProviderPaging === true);
      const noProvideWhenFiltering = prop === 'filter' && (inNoProvider('filtering') || props.noProviderFiltering === true);
      const noProvideWhenSorting =
        (prop === 'sortBy' || prop === 'sortDesc') && (inNoProvider('sorting') || props.noProviderSorting === true);
      if (noProvideWhenPaging || noProvideWhenFiltering || noProvideWhenSorting) return;
      if (usesProvider.value === true) {
        await callItemsProvider();
      }
      if (!(prop === 'currentPage' || prop === 'perPage')) {
        emit('filtered', [...computedItems.value]);
      }
    };
    watch(
      () => props.filter,
      (filter, oldFilter) => {
        providerPropsWatch('filter', filter, oldFilter);
        if (filter === oldFilter || usesProvider.value) return;
        if (!filter) {
          emit('filtered', [...computedItems.value]);
        }
      },
    );
    watch(currentPageNumber, (val, oldVal) => {
      providerPropsWatch('currentPage', val, oldVal);
    });
    watch(perPageNumber, (val, oldVal) => {
      providerPropsWatch('perPage', val, oldVal);
    });
    watch(
      sortByModel,
      (val, oldVal) => {
        providerPropsWatch('sortBy', val, oldVal);
      },
      { deep: true },
    );
    watch(
      () => props.provider,
      newValue => {
        if (newValue === void 0) {
          internalItems.value = [];
          return;
        }
        callItemsProvider();
      },
    );
    onMounted(callItemsProvider);
    const exposedSelectableUtilities = {
      clearSelected: () => {
        if (!props.selectable) return;
        selectedItemsSetUtilities.clear();
      },
      selectAllRows: () => {
        if (!props.selectable || props.selectMode === 'single') return;
        selectedItemsToSet.value = new Set(computedItems.value);
      },
      selectRow: index8 => {
        if (!props.selectable) return;
        const item = computedItems.value[index8];
        if (!item || selectedItemsSetUtilities.has(item)) return;
        if (props.selectMode === 'single') {
          selectedItemsSetUtilities.set([item]);
        } else {
          selectedItemsSetUtilities.add(item);
        }
      },
      unselectRow: index8 => {
        if (!props.selectable) return;
        const item = computedItems.value[index8];
        if (!item || !selectedItemsSetUtilities.has(item)) return;
        selectedItemsSetUtilities.delete(item);
      },
      isRowSelected: index8 => {
        if (!props.selectable) return false;
        const item = computedItems.value[index8];
        return selectedItemsSetUtilities.has(item);
      },
    };
    const computedLiteProps = computed(() => ({
      ...pick(props, [...btableLiteProps, ...btableSimpleProps]),
      tableAttrs: {
        ariaBusy: busyModel.value,
      },
      items: computedDisplayItems.value,
      fields: computedFields.value,
      tableClass: tableClasses.value,
      tbodyTrClass: getRowClasses,
      fieldColumnClass: getFieldColumnClasses,
      id: computedId.value,
    }));
    __expose({
      // The row selection methods are really for compat. Users should probably use the v-model though
      ...exposedSelectableUtilities,
      items: computedItems,
      refresh: callItemsProvider,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$122,
          mergeProps(computedLiteProps.value, {
            onHeadClicked: onFieldHeadClick,
            onRowClicked: onRowClick,
            onRowDblclicked:
              _cache[0] ||
              (_cache[0] = (row, index8, e) => {
                emit('row-dblclicked', row, index8, e);
              }),
            onRowContextmenu:
              _cache[1] ||
              (_cache[1] = (row, index8, e) => {
                emit('row-contextmenu', row, index8, e);
              }),
            onRowHovered:
              _cache[2] ||
              (_cache[2] = (row, index8, e) => {
                emit('row-hovered', row, index8, e);
              }),
            onRowUnhovered:
              _cache[3] ||
              (_cache[3] = (row, index8, e) => {
                emit('row-unhovered', row, index8, e);
              }),
            onRowMiddleClicked:
              _cache[4] ||
              (_cache[4] = (row, index8, e) => {
                emit('row-middle-clicked', row, index8, e);
              }),
          }),
          createSlots(
            {
              'custom-body': withCtx(scope => [
                busyModel.value && slots['table-busy']
                  ? (openBlock(),
                    createBlock(
                      _sfc_main$27,
                      {
                        key: 0,
                        class: normalizeClass(['b-table-busy-slot', getBusyRowClasses.value]),
                      },
                      {
                        default: withCtx(() => [
                          createVNode(
                            _sfc_main$63,
                            {
                              colspan: scope.fields.length,
                            },
                            {
                              default: withCtx(() => [renderSlot(_ctx.$slots, 'table-busy')]),
                              _: 2,
                            },
                            1032,
                            ['colspan'],
                          ),
                        ]),
                        _: 2,
                      },
                      1032,
                      ['class'],
                    ))
                  : unref(props).showEmpty === true && computedItems.value.length === 0
                    ? (openBlock(),
                      createBlock(
                        _sfc_main$27,
                        {
                          key: 1,
                          class: 'b-table-empty-row',
                        },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _sfc_main$63,
                              {
                                colspan: computedFields.value.length,
                              },
                              {
                                default: withCtx(() => [
                                  createBaseVNode('div', _hoisted_216, [
                                    createBaseVNode('div', _hoisted_35, [
                                      isFilterableTable.value
                                        ? renderSlot(
                                            _ctx.$slots,
                                            'empty-filtered',
                                            normalizeProps(mergeProps({ key: 0 }, emptySlotScope.value)),
                                            () => [createTextVNode(toDisplayString(unref(props).emptyFilteredText), 1)],
                                          )
                                        : renderSlot(
                                            _ctx.$slots,
                                            'empty',
                                            normalizeProps(mergeProps({ key: 1 }, emptySlotScope.value)),
                                            () => [createTextVNode(toDisplayString(unref(props).emptyText), 1)],
                                          ),
                                    ]),
                                  ]),
                                ]),
                                _: 3,
                              },
                              8,
                              ['colspan'],
                            ),
                          ]),
                          _: 3,
                        },
                      ))
                    : createCommentVNode('', true),
              ]),
              _: 2,
            },
            [
              slots['thead-top']
                ? {
                    name: 'thead-top',
                    fn: withCtx(scope => [
                      renderSlot(
                        _ctx.$slots,
                        'thead-top',
                        mergeProps(scope, {
                          clearSelected: exposedSelectableUtilities.clearSelected,
                          selectAllRows: exposedSelectableUtilities.selectAllRows,
                          fields: computedFields.value,
                        }),
                      ),
                    ]),
                    key: '0',
                  }
                : void 0,
              slots['thead-sub']
                ? {
                    name: 'thead-sub',
                    fn: withCtx(scope => [renderSlot(_ctx.$slots, 'thead-sub', mergeProps(scope, { fields: computedFields.value }))]),
                    key: '1',
                  }
                : void 0,
              slots['top-row']
                ? {
                    name: 'top-row',
                    fn: withCtx(scope => [renderSlot(_ctx.$slots, 'top-row', mergeProps(scope, { fields: computedFields.value }))]),
                    key: '2',
                  }
                : void 0,
              slots['row-details']
                ? {
                    name: 'row-details',
                    fn: withCtx(scope => [
                      renderSlot(
                        _ctx.$slots,
                        'row-details',
                        mergeProps(scope, {
                          fields: computedFields.value,
                          selectRow: (index8 = scope.index) => exposedSelectableUtilities.selectRow(index8),
                          unselectRow: (index8 = scope.index) => exposedSelectableUtilities.unselectRow(index8),
                          rowSelected: exposedSelectableUtilities.isRowSelected(scope.index),
                        }),
                      ),
                    ]),
                    key: '3',
                  }
                : void 0,
              slots['bottom-row']
                ? {
                    name: 'bottom-row',
                    fn: withCtx(scope => [renderSlot(_ctx.$slots, 'bottom-row', mergeProps(scope, { fields: computedFields.value }))]),
                    key: '4',
                  }
                : void 0,
              slots['custom-foot']
                ? {
                    name: 'custom-foot',
                    fn: withCtx(scope => [renderSlot(_ctx.$slots, 'custom-foot', mergeProps(scope, { fields: computedFields.value }))]),
                    key: '5',
                  }
                : void 0,
              slots['table-caption']
                ? {
                    name: 'table-caption',
                    fn: withCtx(() => [renderSlot(_ctx.$slots, 'table-caption')]),
                    key: '6',
                  }
                : void 0,
              renderList(dynamicCellSlots.value, name => {
                return {
                  name,
                  fn: withCtx(scope => [
                    renderSlot(
                      _ctx.$slots,
                      name,
                      mergeProps(scope, {
                        selectRow: (index8 = scope.index) => exposedSelectableUtilities.selectRow(index8),
                        unselectRow: (index8 = scope.index) => exposedSelectableUtilities.unselectRow(index8),
                        rowSelected: exposedSelectableUtilities.isRowSelected(scope.index),
                      }),
                    ),
                  ]),
                };
              }),
              renderList(dynamicFootSlots.value, name => {
                return {
                  name,
                  fn: withCtx(scope => [
                    renderSlot(
                      _ctx.$slots,
                      name,
                      mergeProps(scope, {
                        selectAllRows: exposedSelectableUtilities.selectAllRows,
                        clearSelected: exposedSelectableUtilities.clearSelected,
                      }),
                    ),
                  ]),
                };
              }),
              renderList(computedFields.value, field => {
                return {
                  name: `head(${String(field.key)})`,
                  fn: withCtx(scope => {
                    var _a, _b, _c, _d;
                    return [
                      renderSlot(
                        _ctx.$slots,
                        slots[`head(${String(field.key)})`] ? `head(${String(field.key)})` : 'head()',
                        mergeProps(scope, {
                          selectAllRows: exposedSelectableUtilities.selectAllRows,
                          clearSelected: exposedSelectableUtilities.clearSelected,
                        }),
                        () => [createTextVNode(toDisplayString(unref(getTableFieldHeadLabel)(field)), 1)],
                      ),
                      isSortable.value && !!scope.field.sortable && unref(props).noSortableIcon === false
                        ? (openBlock(),
                          createElementBlock(
                            Fragment,
                            { key: 0 },
                            [
                              ((_b = (_a = sortByModel.value) == null ? void 0 : _a.find(el => el.key === scope.field.key)) == null
                                ? void 0
                                : _b.order) === 'asc'
                                ? renderSlot(
                                    _ctx.$slots,
                                    slots[`sortAsc(${String(scope.field.key)})`] ? `sortAsc(${String(scope.field.key)})` : 'sortAsc()',
                                    normalizeProps(mergeProps({ key: 0 }, scope)),
                                    () => [
                                      _cache[5] ||
                                        (_cache[5] = createBaseVNode(
                                          'svg',
                                          {
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            width: '24',
                                            height: '24',
                                            fill: 'currentColor',
                                            class: 'bi bi-arrow-up-short',
                                            viewBox: '0 0 16 16',
                                            'aria-hidden': '',
                                          },
                                          [
                                            createBaseVNode('path', {
                                              'fill-rule': 'evenodd',
                                              d: 'M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z',
                                            }),
                                          ],
                                          -1,
                                        )),
                                    ],
                                  )
                                : ((_d = (_c = sortByModel.value) == null ? void 0 : _c.find(el => el.key === scope.field.key)) == null
                                      ? void 0
                                      : _d.order) === 'desc'
                                  ? renderSlot(
                                      _ctx.$slots,
                                      slots[`sortDesc(${String(scope.field.key)})`] ? `sortDesc(${String(scope.field.key)})` : 'sortDesc()',
                                      normalizeProps(mergeProps({ key: 1 }, scope)),
                                      () => [
                                        _cache[6] ||
                                          (_cache[6] = createBaseVNode(
                                            'svg',
                                            {
                                              xmlns: 'http://www.w3.org/2000/svg',
                                              width: '24',
                                              height: '24',
                                              fill: 'currentColor',
                                              class: 'bi bi-arrow-down-short',
                                              viewBox: '0 0 16 16',
                                              'aria-hidden': '',
                                            },
                                            [
                                              createBaseVNode('path', {
                                                'fill-rule': 'evenodd',
                                                d: 'M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z',
                                              }),
                                            ],
                                            -1,
                                          )),
                                      ],
                                    )
                                  : renderSlot(
                                      _ctx.$slots,
                                      slots[`sortDefault(${String(scope.field.key)})`]
                                        ? `sortDefault(${String(scope.field.key)})`
                                        : 'sortDefault()',
                                      normalizeProps(mergeProps({ key: 2 }, scope)),
                                      () => [
                                        (openBlock(),
                                        createElementBlock(
                                          'svg',
                                          _hoisted_131,
                                          _cache[7] ||
                                            (_cache[7] = [
                                              createBaseVNode(
                                                'path',
                                                {
                                                  'fill-rule': 'evenodd',
                                                  d: 'M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z',
                                                },
                                                null,
                                                -1,
                                              ),
                                            ]),
                                        )),
                                      ],
                                    ),
                            ],
                            64,
                          ))
                        : createCommentVNode('', true),
                    ];
                  }),
                };
              }),
            ],
          ),
          1040,
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BTabs.vue_vue_type_script_setup_true_lang-AmprSk-s.mjs
var _sfc_main$123 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BTab',
  props: mergeModels(
    {
      buttonId: { default: void 0 },
      disabled: { type: Boolean, default: false },
      id: { default: void 0 },
      lazy: { type: Boolean, default: void 0 },
      lazyOnce: { type: Boolean, default: void 0 },
      noBody: { type: Boolean, default: false },
      tag: { default: 'div' },
      title: { default: void 0 },
      titleItemClass: { default: void 0 },
      titleLinkAttrs: { default: void 0 },
      titleLinkClass: { default: void 0 },
    },
    {
      active: {
        type: Boolean,
        ...{
          default: false,
        },
      },
      activeModifiers: {},
    },
  ),
  emits: ['update:active'],
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, 'BTab');
    const slots = useSlots();
    const activeModel = useModel(__props, 'active');
    const parentData = inject(tabsInjectionKey, null);
    const computedId = useId2(() => props.id, 'tabpane');
    const computedButtonId = useId2(() => props.buttonId, 'tab');
    const lazyRenderCompleted = ref(false);
    const el = useTemplateRef('_el');
    const attrs = useAttrs();
    const processedAttrs = computed(() => {
      const { onClick, ...tabAttrs } = attrs;
      return { onClick, tabAttrs };
    });
    const tab = computed(() => ({
      id: computedId.value,
      buttonId: computedButtonId.value,
      disabled: props.disabled,
      title: props.title,
      titleComponent: slots.title,
      titleItemClass: () => props.titleItemClass,
      titleLinkAttrs: () => props.titleLinkAttrs,
      titleLinkClass: () => props.titleLinkClass,
      onClick: processedAttrs.value.onClick,
      el: el.value,
    }));
    onMounted(() => {
      if (!parentData) return;
      parentData.registerTab(tab);
      if (activeModel.value) {
        parentData.activateTab(computedId.value);
      }
    });
    onUnmounted(() => {
      if (!parentData) return;
      parentData.unregisterTab(computedId.value);
    });
    const isActive = computed(() => (parentData == null ? void 0 : parentData.activeId.value) === computedId.value);
    const show = ref(isActive.value);
    const computedLazy = computed(() => !!((parentData == null ? void 0 : parentData.lazy.value) || (props.lazyOnce ?? props.lazy)));
    const computedLazyOnce = computed(() => props.lazyOnce !== void 0);
    const computedActive = computed(() => isActive.value && !props.disabled);
    const showSlot = computed(
      () => computedActive.value || !computedLazy.value || (computedLazy.value && computedLazyOnce.value && lazyRenderCompleted.value),
    );
    watch(isActive, active => {
      if (active) {
        activeModel.value = true;
        setTimeout(() => {
          show.value = true;
        }, 0);
        return;
      }
      show.value = false;
      activeModel.value = false;
    });
    watch(activeModel, active => {
      if (!parentData) return;
      if (!active) {
        if (isActive.value) {
          parentData.activateTab(void 0);
        }
        return;
      }
      parentData.activateTab(computedId.value);
    });
    const computedClasses = computed(() => [
      {
        active: isActive.value,
        show: show.value,
        'card-body': (parentData == null ? void 0 : parentData.card.value) && props.noBody === false,
        fade: !(parentData == null ? void 0 : parentData.noFade.value),
      },
      show.value
        ? parentData == null
          ? void 0
          : parentData.activeTabClass.value
        : parentData == null
          ? void 0
          : parentData.inactiveTabClass.value,
      parentData == null ? void 0 : parentData.tabClass.value,
    ]);
    watch(showSlot, shown => {
      if (shown && !lazyRenderCompleted.value) lazyRenderCompleted.value = true;
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          mergeProps(
            {
              id: unref(computedId),
              ref: '_el',
              class: ['tab-pane', computedClasses.value],
              role: 'tabpanel',
              'aria-labelledby': unref(computedButtonId),
            },
            processedAttrs.value.tabAttrs,
          ),
          {
            default: withCtx(() => [showSlot.value ? renderSlot(_ctx.$slots, 'default', { key: 0 }) : createCommentVNode('', true)]),
            _: 3,
          },
          16,
          ['id', 'class', 'aria-labelledby'],
        )
      );
    };
  },
});
var _hoisted_133 = ['aria-orientation'];
var _hoisted_217 = ['id', 'aria-controls', 'aria-selected', 'tabindex', 'onClick'];
var _sfc_main51 = defineComponent({
  __name: 'BTabs',
  props: mergeModels(
    {
      activeNavItemClass: { default: void 0 },
      activeTabClass: { default: void 0 },
      align: { default: void 0 },
      card: { type: Boolean, default: false },
      contentClass: { default: void 0 },
      end: { type: Boolean, default: false },
      fill: { type: Boolean, default: false },
      id: { default: void 0 },
      inactiveNavItemClass: { default: void 0 },
      inactiveTabClass: { default: void 0 },
      justified: { type: Boolean, default: false },
      lazy: { type: Boolean, default: false },
      navClass: { default: void 0 },
      navItemClass: { default: void 0 },
      navWrapperClass: { default: void 0 },
      noFade: { type: Boolean, default: false },
      noKeyNav: { type: Boolean, default: false },
      noNavStyle: { type: Boolean, default: false },
      pills: { type: Boolean, default: false },
      small: { type: Boolean, default: false },
      tag: { default: 'div' },
      tabClass: { default: void 0 },
      underline: { type: Boolean, default: false },
      vertical: { type: Boolean, default: false },
    },
    {
      modelValue: {
        default: -1,
      },
      modelModifiers: {},
      activeId: {
        default: void 0,
      },
      activeIdModifiers: {},
    },
  ),
  emits: mergeModels(['activate-tab', 'click'], ['update:modelValue', 'update:activeId']),
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BTabs');
    const emit = __emit;
    const modelValue = useModel(__props, 'modelValue');
    const activeId = useModel(__props, 'activeId');
    const ReusableEmptyTab = createReusableTemplate();
    const tabsInternal = ref([]);
    const tabs = computed(() =>
      tabsInternal.value.map(_tab => {
        const tab = unref(_tab);
        const active = tab.id === activeId.value;
        return {
          ...tab,
          active,
          navItemClasses: [
            {
              active,
              disabled: tab.disabled,
            },
            active ? props.activeNavItemClass : props.inactiveNavItemClass,
            props.navItemClass,
          ],
        };
      }),
    );
    const showEmpty = computed(() => !((tabs == null ? void 0 : tabs.value) && tabs.value.length > 0));
    const computedClasses = computed(() => ({
      'd-flex': props.vertical,
      'align-items-start': props.vertical,
    }));
    const alignment = useAlignment(() => props.align);
    const navTabsClasses = computed(() => ({
      'nav-pills': props.pills,
      'nav-underline': props.underline,
      'flex-column me-3': props.vertical,
      [alignment.value]: props.align !== void 0,
      'nav-fill': props.fill,
      'card-header-tabs': props.card && !props.pills && !props.underline,
      'card-header-pills': props.card && props.pills,
      'nav-justified': props.justified,
      'nav-tabs': !props.noNavStyle && !props.pills && !props.underline,
      small: props.small,
    }));
    const activateTab = index8 => {
      var _a;
      if (index8 !== void 0) {
        const id = (_a = tabs.value[index8]) == null ? void 0 : _a.id;
        if (
          index8 > -1 &&
          index8 < tabs.value.length &&
          !tabs.value[index8].disabled &&
          (modelValue.value < 0 || activeId.value !== id || modelValue.value !== index8)
        ) {
          const tabEvent = new BvEvent('activate-tab', { cancelable: true });
          emit('activate-tab', index8, modelValue.value, tabEvent);
          if (!tabEvent.defaultPrevented) {
            if (activeId.value !== id) activeId.value = id;
            if (modelValue.value !== index8) modelValue.value = index8;
          }
        }
      }
    };
    const handleClick = (event, index8) => {
      var _a, _b, _c;
      activateTab(index8);
      if (
        index8 >= 0 &&
        !tabs.value[index8].disabled &&
        ((_a = tabs.value[index8]) == null ? void 0 : _a.onClick) &&
        typeof tabs.value[index8].onClick === 'function'
      ) {
        (_c = (_b = tabs.value[index8]).onClick) == null ? void 0 : _c.call(_b, event);
      }
    };
    const keynav = (e, direction) => {
      var _a, _b;
      if (tabs.value.length <= 0 || props.noKeyNav) return;
      e.preventDefault();
      e.stopPropagation();
      modelValue.value = nextIndex(modelValue.value + direction, direction);
      (_b = document.getElementById((_a = tabs.value[modelValue.value]) == null ? void 0 : _a.buttonId)) == null ? void 0 : _b.focus();
    };
    const nextIndex = (start, direction) => {
      let index8 = start;
      let minIdx = -1;
      let maxIdx = -1;
      for (let i = 0; i < tabs.value.length; i++) {
        if (!tabs.value[i].disabled) {
          if (minIdx === -1) minIdx = i;
          maxIdx = i;
        }
      }
      while (index8 >= minIdx && index8 <= maxIdx && tabs.value[index8].disabled) {
        index8 += direction;
      }
      if (index8 < minIdx) index8 = minIdx;
      if (index8 > maxIdx) index8 = maxIdx;
      return index8;
    };
    watch(modelValue, (newValue, oldValue) => {
      if (newValue === oldValue) return;
      if (tabs.value.length <= 0) {
        return;
      }
      const index8 = nextIndex(newValue, newValue > oldValue ? 1 : -1);
      nextTick(() => {
        activateTab(index8);
      });
    });
    watch(activeId, (newValue, oldValue) => {
      const index8 = tabs.value.findIndex(t => t.id === newValue);
      if (newValue === oldValue) return;
      if (tabs.value.length <= 0) {
        return;
      }
      if (index8 === -1) {
        activateTab(nextIndex(0, 1));
        return;
      }
      activateTab(index8);
    });
    const registerTab = tab => {
      if (!tabsInternal.value.find(t => t.value.id === tab.value.id)) {
        tabsInternal.value.push(tab);
      } else {
        tabsInternal.value[tabsInternal.value.findIndex(t => t.value.id === tab.value.id)] = tab;
      }
      tabsInternal.value.sort((a, b) => sortSlotElementsByPosition(a.value.el, b.value.el));
    };
    const unregisterTab = id => {
      tabsInternal.value = tabsInternal.value.filter(t => t.value.id !== id);
    };
    watch(
      tabsInternal,
      () => {
        findActive();
      },
      { deep: true },
    );
    const findActive = () => {
      var _a;
      if (tabs.value.length === 0) {
        modelValue.value = -1;
        activeId.value = void 0;
        return;
      }
      if (modelValue.value >= 0 && !activeId.value) {
        activeId.value = (_a = tabs.value[modelValue.value]) == null ? void 0 : _a.id;
      }
      if (tabs.value.find(t => t.id === activeId.value)) {
        activateTab(tabs.value.findIndex(t => t.id === activeId.value));
        return;
      }
      activateTab(tabs.value.map(tab => !tab.disabled).indexOf(true));
    };
    provide(tabsInjectionKey, {
      lazy: toRef(() => props.lazy),
      card: toRef(() => props.card),
      noFade: toRef(() => props.noFade),
      activeTabClass: toRef(() => props.activeTabClass),
      inactiveTabClass: toRef(() => props.inactiveTabClass),
      tabClass: toRef(() => props.tabClass),
      registerTab,
      unregisterTab,
      activeId,
      activateTab: id => {
        const idx = tabs.value.findIndex(t => t.id === id);
        if (id === void 0 || idx === -1) {
          activateTab(nextIndex(0, 1));
          return;
        }
        activateTab(idx);
      },
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          resolveDynamicComponent(unref(props).tag),
          {
            id: unref(props).id,
            class: normalizeClass(['tabs', computedClasses.value]),
          },
          {
            default: withCtx(() => [
              createVNode(unref(ReusableEmptyTab).define, null, {
                default: withCtx(() => [
                  createBaseVNode(
                    'div',
                    {
                      class: normalizeClass(['tab-content', unref(props).contentClass]),
                    },
                    [
                      renderSlot(_ctx.$slots, 'default'),
                      showEmpty.value
                        ? (openBlock(),
                          createElementBlock(
                            'div',
                            {
                              key: 'bv-empty-tab',
                              class: normalizeClass(['tab-pane active', { 'card-body': unref(props).card }]),
                            },
                            [renderSlot(_ctx.$slots, 'empty')],
                            2,
                          ))
                        : createCommentVNode('', true),
                    ],
                    2,
                  ),
                ]),
                _: 3,
              }),
              unref(props).end ? (openBlock(), createBlock(unref(ReusableEmptyTab).reuse, { key: 0 })) : createCommentVNode('', true),
              createBaseVNode(
                'div',
                {
                  class: normalizeClass([
                    unref(props).navWrapperClass,
                    { 'card-header': unref(props).card, 'ms-auto': _ctx.vertical && unref(props).end },
                  ]),
                },
                [
                  createBaseVNode(
                    'ul',
                    {
                      class: normalizeClass(['nav', [navTabsClasses.value, unref(props).navClass]]),
                      role: 'tablist',
                      'aria-orientation': unref(props).vertical ? 'vertical' : 'horizontal',
                    },
                    [
                      renderSlot(_ctx.$slots, 'tabs-start'),
                      (openBlock(true),
                      createElementBlock(
                        Fragment,
                        null,
                        renderList(tabs.value, (tab, idx) => {
                          var _a, _b, _c;
                          return (
                            openBlock(),
                            createElementBlock(
                              'li',
                              {
                                key: tab.id,
                                class: normalizeClass(['nav-item', (_a = tab.titleItemClass) == null ? void 0 : _a.call(tab)]),
                                role: 'presentation',
                              },
                              [
                                createBaseVNode(
                                  'button',
                                  mergeProps(
                                    {
                                      id: tab.buttonId,
                                      class: ['nav-link', [tab.navItemClasses, (_b = tab.titleLinkClass) == null ? void 0 : _b.call(tab)]],
                                      role: 'tab',
                                      'aria-controls': tab.id,
                                      'aria-selected': tab.active,
                                      tabindex: unref(props).noKeyNav ? void 0 : tab.active ? void 0 : -1,
                                      ref_for: true,
                                    },
                                    (_c = tab.titleLinkAttrs) == null ? void 0 : _c.call(tab),
                                    {
                                      onKeydown: [
                                        _cache[0] ||
                                          (_cache[0] = withKeys(
                                            withModifiers($event => !unref(props).vertical && keynav($event, -1), ['exact']),
                                            ['left'],
                                          )),
                                        _cache[1] ||
                                          (_cache[1] = withKeys(
                                            withModifiers($event => !unref(props).vertical && keynav($event, -999), ['shift']),
                                            ['left'],
                                          )),
                                        _cache[2] ||
                                          (_cache[2] = withKeys(
                                            withModifiers($event => unref(props).vertical && keynav($event, -1), ['exact']),
                                            ['up'],
                                          )),
                                        _cache[3] ||
                                          (_cache[3] = withKeys(
                                            withModifiers($event => unref(props).vertical && keynav($event, -999), ['shift']),
                                            ['up'],
                                          )),
                                        _cache[4] ||
                                          (_cache[4] = withKeys(
                                            withModifiers($event => !unref(props).vertical && keynav($event, 1), ['exact']),
                                            ['right'],
                                          )),
                                        _cache[5] ||
                                          (_cache[5] = withKeys(
                                            withModifiers($event => !unref(props).vertical && keynav($event, 999), ['shift']),
                                            ['right'],
                                          )),
                                        _cache[6] ||
                                          (_cache[6] = withKeys(
                                            withModifiers($event => unref(props).vertical && keynav($event, 1), ['exact']),
                                            ['down'],
                                          )),
                                        _cache[7] ||
                                          (_cache[7] = withKeys(
                                            withModifiers($event => unref(props).vertical && keynav($event, 999), ['shift']),
                                            ['down'],
                                          )),
                                        _cache[8] || (_cache[8] = withKeys($event => keynav($event, -999), ['page-up'])),
                                        _cache[9] || (_cache[9] = withKeys($event => keynav($event, 999), ['page-down'])),
                                        _cache[10] || (_cache[10] = withKeys($event => keynav($event, -999), ['home'])),
                                        _cache[11] || (_cache[11] = withKeys($event => keynav($event, 999), ['end'])),
                                      ],
                                      onClick: withModifiers(e => handleClick(e, idx), ['stop', 'prevent']),
                                    },
                                  ),
                                  [
                                    tab.titleComponent
                                      ? (openBlock(), createBlock(resolveDynamicComponent(tab.titleComponent), { key: 0 }))
                                      : (openBlock(),
                                        createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(tab.title), 1)], 64)),
                                  ],
                                  16,
                                  _hoisted_217,
                                ),
                              ],
                              2,
                            )
                          );
                        }),
                        128,
                      )),
                      renderSlot(_ctx.$slots, 'tabs-end'),
                    ],
                    10,
                    _hoisted_133,
                  ),
                ],
                2,
              ),
              !unref(props).end ? (openBlock(), createBlock(unref(ReusableEmptyTab).reuse, { key: 1 })) : createCommentVNode('', true),
            ]),
            _: 3,
          },
          8,
          ['id', 'class'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/BToastOrchestrator.vue_vue_type_style_index_0_lang-CgGO-ddH.mjs
var _hoisted_134 = ['id', 'role', 'aria-live', 'aria-atomic'];
var _hoisted_218 = { class: 'me-auto' };
var _sfc_main$124 = defineComponent({
  __name: 'BToast',
  props: mergeModels(
    {
      body: { default: void 0 },
      bodyClass: { default: void 0 },
      headerClass: { default: void 0 },
      headerTag: { default: 'div' },
      id: { default: void 0 },
      interval: { default: 'requestAnimationFrame' },
      isStatus: { type: Boolean, default: false },
      noCloseButton: { type: Boolean, default: false },
      noHoverPause: { type: Boolean, default: false },
      noResumeOnHoverLeave: { type: Boolean, default: false },
      progressProps: { default: void 0 },
      showOnPause: { type: Boolean, default: true },
      solid: { type: Boolean, default: false },
      title: { default: void 0 },
      toastClass: { default: void 0 },
      variant: { default: void 0 },
      bgVariant: { default: null },
      textVariant: { default: null },
      active: { type: Boolean, default: void 0 },
      activeClass: { default: void 0 },
      disabled: { type: Boolean, default: void 0 },
      exactActiveClass: { default: void 0 },
      href: { default: void 0 },
      icon: { type: Boolean, default: void 0 },
      noRel: { type: Boolean, default: void 0 },
      opacity: { default: void 0 },
      opacityHover: { default: void 0 },
      prefetch: { type: Boolean },
      prefetchOn: {},
      noPrefetch: { type: Boolean },
      prefetchedClass: {},
      rel: { default: void 0 },
      replace: { type: Boolean, default: void 0 },
      routerComponentName: { default: void 0 },
      stretched: { type: Boolean, default: false },
      target: { default: void 0 },
      to: { default: void 0 },
      underlineOffset: { default: void 0 },
      underlineOffsetHover: { default: void 0 },
      underlineOpacity: { default: void 0 },
      underlineOpacityHover: { default: void 0 },
      underlineVariant: { default: void 0 },
      initialAnimation: { type: Boolean, default: false },
      noAnimation: { type: Boolean },
      noFade: { type: Boolean, default: false },
      lazy: { type: Boolean, default: false },
      unmountLazy: { type: Boolean, default: false },
      show: { type: Boolean, default: false },
      transProps: { default: void 0 },
      visible: { type: Boolean, default: false },
    },
    {
      modelValue: { type: [Boolean, Number], ...{ default: false } },
      modelModifiers: {},
    },
  ),
  emits: mergeModels(
    ['close', 'close-countdown', 'hide', 'hide-prevented', 'hidden', 'show', 'show-prevented', 'shown', 'toggle', 'toggle-prevented'],
    ['update:modelValue'],
  ),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, 'BToast');
    const emit = __emit;
    const slots = useSlots();
    const element = useTemplateRef('_element');
    const modelValue = useModel(__props, 'modelValue');
    const { computedLink, computedLinkProps } = useBLinkHelper(props);
    const computedId = useId2(() => props.id, 'toast');
    const {
      showRef,
      renderRef,
      hide: hide2,
      toggle: toggle2,
      show,
      buildTriggerableEvent,
      computedNoAnimation,
      isVisible: isVisible2,
      transitionProps,
      contentShowing,
    } = useShowHide(modelValue, props, emit, element, computedId);
    const countdownLength = computed(() => (typeof modelValue.value === 'boolean' ? 0 : modelValue.value));
    const {
      isActive,
      pause,
      restart,
      resume,
      stop,
      isPaused,
      value: remainingMs,
    } = useCountdown(countdownLength, props.interval, {
      immediate: typeof modelValue.value === 'number' && !!modelValue.value,
    });
    useCountdownHover(
      element,
      computed(() => ({
        noHoverPause: props.noHoverPause || typeof modelValue.value !== 'number',
        noResumeOnHoverLeave: props.noResumeOnHoverLeave || typeof modelValue.value !== 'number',
        modelValueIgnoresHover: typeof modelValue.value === 'boolean',
      })),
      { pause, resume },
    );
    watchEffect(() => {
      emit('close-countdown', remainingMs.value);
    });
    const computedTag = computed(() => (computedLink.value ? _sfc_main7 : 'div'));
    const isToastVisible = computed(() => showRef.value || isActive.value || (props.showOnPause && isPaused.value));
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed(() => [
      colorClasses.value,
      {
        show: isVisible2.value,
        fade: !computedNoAnimation.value,
      },
    ]);
    watch(modelValue, newValue => {
      if (typeof newValue === 'number') {
        const event = buildTriggerableEvent('show', { cancelable: true, trigger: 'model' });
        emit('show', event);
        if (event.defaultPrevented) {
          emit('show-prevented', buildTriggerableEvent('show-prevented'));
        } else {
          restart();
        }
      }
    });
    watch(isActive, newValue => {
      if (newValue === false && isPaused.value === false) {
        hide2();
        modelValue.value = 0;
        stop();
      }
    });
    __expose({
      show,
      hide: hide2,
      toggle: toggle2,
      pause,
      restart,
      resume,
      stop,
    });
    return (_ctx, _cache) => {
      return unref(renderRef) || unref(contentShowing)
        ? (openBlock(),
          createBlock(
            Transition,
            mergeProps({ key: 0 }, unref(transitionProps), {
              appear: !!modelValue.value || unref(props).visible,
            }),
            {
              default: withCtx(() => [
                withDirectives(
                  createBaseVNode(
                    'div',
                    {
                      id: unref(props).id,
                      ref: '_element',
                      class: normalizeClass(['toast', [unref(props).toastClass, computedClasses.value]]),
                      tabindex: '0',
                      role: !isToastVisible.value ? void 0 : unref(props).isStatus ? 'status' : 'alert',
                      'aria-live': !isToastVisible.value ? void 0 : unref(props).isStatus ? 'polite' : 'assertive',
                      'aria-atomic': !isToastVisible.value ? void 0 : true,
                    },
                    [
                      unref(contentShowing) && (slots.title || unref(props).title)
                        ? (openBlock(),
                          createBlock(
                            resolveDynamicComponent(unref(props).headerTag),
                            {
                              key: 0,
                              class: normalizeClass(['toast-header', unref(props).headerClass]),
                            },
                            {
                              default: withCtx(() => [
                                renderSlot(
                                  _ctx.$slots,
                                  'title',
                                  { hide: unref(hide2) },
                                  () => [createBaseVNode('strong', _hoisted_218, toDisplayString(unref(props).title), 1)],
                                  true,
                                ),
                                !unref(props).noCloseButton
                                  ? (openBlock(),
                                    createBlock(_sfc_main5, {
                                      key: 0,
                                      onClick: _cache[0] || (_cache[0] = $event => unref(hide2)('close')),
                                    }))
                                  : createCommentVNode('', true),
                              ]),
                              _: 3,
                            },
                            8,
                            ['class'],
                          ))
                        : createCommentVNode('', true),
                      unref(contentShowing) && (slots.default || unref(props).body)
                        ? (openBlock(),
                          createBlock(
                            resolveDynamicComponent(computedTag.value),
                            mergeProps(
                              {
                                key: 1,
                                class: ['toast-body', unref(props).bodyClass],
                                style: { display: 'block' },
                              },
                              unref(computedLinkProps),
                              {
                                onClick: _cache[1] || (_cache[1] = $event => (unref(computedLink) ? unref(hide2)() : () => {})),
                              },
                            ),
                            {
                              default: withCtx(() => [
                                renderSlot(
                                  _ctx.$slots,
                                  'default',
                                  { hide: unref(hide2) },
                                  () => [createTextVNode(toDisplayString(unref(props).body), 1)],
                                  true,
                                ),
                              ]),
                              _: 3,
                            },
                            16,
                            ['class'],
                          ))
                        : createCommentVNode('', true),
                      typeof modelValue.value === 'number' && unref(props).progressProps !== void 0
                        ? (openBlock(),
                          createBlock(
                            _sfc_main49,
                            {
                              key: 2,
                              animated: unref(props).progressProps.animated,
                              precision: unref(props).progressProps.precision,
                              'show-progress': unref(props).progressProps.showProgress,
                              'show-value': unref(props).progressProps.showValue,
                              striped: unref(props).progressProps.striped,
                              variant: unref(props).progressProps.variant,
                              max: modelValue.value,
                              value: unref(remainingMs),
                              height: '4px',
                            },
                            null,
                            8,
                            ['animated', 'precision', 'show-progress', 'show-value', 'striped', 'variant', 'max', 'value'],
                          ))
                        : createCommentVNode('', true),
                    ],
                    10,
                    _hoisted_134,
                  ),
                  [[vShow, isToastVisible.value]],
                ),
              ]),
              _: 3,
            },
            16,
            ['appear'],
          ))
        : createCommentVNode('', true);
    };
  },
});
var BToast = _export_sfc(_sfc_main$124, [['__scopeId', 'data-v-eeb0e3de']]);
var positionClasses = {
  'top-start': 'top-0 start-0',
  'top-center': 'top-0 start-50 translate-middle-x',
  'top-end': 'top-0 end-0',
  'middle-start': 'top-50 start-0 translate-middle-y',
  'middle-center': 'top-50 start-50 translate-middle',
  'middle-end': 'top-50 end-0 translate-middle-y',
  'bottom-start': 'bottom-0 start-0',
  'bottom-center': 'bottom-0 start-50 translate-middle-x',
  'bottom-end': 'bottom-0 end-0',
};
var _sfc_main52 = defineComponent({
  ...{
    inheritAttrs: false,
  },
  __name: 'BToastOrchestrator',
  props: {
    appendToast: { type: Boolean, default: false },
    teleportDisabled: { type: Boolean, default: false },
    teleportTo: { default: 'body' },
  },
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, 'BToastOrchestrator');
    const tools = useToastController();
    watch(
      () => props.appendToast,
      value => {
        var _a;
        (_a = tools._setIsAppend) == null ? void 0 : _a.call(tools, value);
      },
      { immediate: true },
    );
    __expose({
      ...tools,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main,
          {
            to: unref(props).teleportTo,
            disabled: unref(props).teleportDisabled,
          },
          {
            default: withCtx(() => [
              createBaseVNode(
                'div',
                mergeProps({ id: '__BVID__toaster-container' }, _ctx.$attrs),
                [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(positionClasses), (value, key) => {
                      return (
                        openBlock(),
                        createElementBlock(
                          'div',
                          {
                            key,
                            class: normalizeClass([value, 'toast-container position-fixed p-3']),
                          },
                          [
                            createVNode(
                              TransitionGroup,
                              { name: 'b-list' },
                              {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    (openBlock(true),
                                    createElementBlock(
                                      Fragment,
                                      null,
                                      renderList(
                                        (_a = unref(tools).toasts) == null ? void 0 : _a.value.filter(el => el.props.pos === key),
                                        toast => {
                                          return (
                                            openBlock(),
                                            createElementBlock(
                                              'span',
                                              {
                                                key: toast.props._self,
                                              },
                                              [
                                                (openBlock(),
                                                createBlock(
                                                  resolveDynamicComponent(toast.component ?? BToast),
                                                  mergeProps({ ref_for: true }, toast.props, {
                                                    'model-value': toast.props._modelValue,
                                                    'initial-animation': '',
                                                    'onUpdate:modelValue': $event => {
                                                      var _a2, _b;
                                                      return (_b = (_a2 = unref(tools)).leave) == null
                                                        ? void 0
                                                        : _b.call(_a2, toast.props._self);
                                                    },
                                                    onHidden: $event => {
                                                      var _a2, _b;
                                                      return (_b = (_a2 = unref(tools)).remove) == null
                                                        ? void 0
                                                        : _b.call(_a2, toast.props._self);
                                                    },
                                                  }),
                                                  null,
                                                  16,
                                                  ['model-value', 'onUpdate:modelValue', 'onHidden'],
                                                )),
                                              ],
                                            )
                                          );
                                        },
                                      ),
                                      128,
                                    )),
                                  ];
                                }),
                                _: 2,
                              },
                              1024,
                            ),
                          ],
                          2,
                        )
                      );
                    }),
                    128,
                  )),
                ],
                16,
              ),
            ]),
            _: 1,
          },
          8,
          ['to', 'disabled'],
        )
      );
    };
  },
});

// node_modules/bootstrap-vue-next/dist/index-BfqArYKd.mjs
var index4 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      BAccordion: _sfc_main$1,
      BAccordionItem: _sfc_main4,
      BAlert,
      BAvatar: _sfc_main$12,
      BAvatarGroup: _sfc_main12,
      BBadge: _sfc_main11,
      BBreadcrumb: _sfc_main13,
      BBreadcrumbItem: _sfc_main$13,
      BButton: _sfc_main8,
      BButtonGroup: _sfc_main$14,
      BButtonToolbar: _sfc_main14,
      BCard: _sfc_main16,
      BCardBody: _sfc_main$2,
      BCardFooter: _sfc_main$15,
      BCardGroup: _sfc_main$16,
      BCardHeader: _sfc_main$5,
      BCardImg: _sfc_main$7,
      BCardSubtitle: _sfc_main$3,
      BCardText: _sfc_main17,
      BCardTitle: _sfc_main$4,
      BCarousel: _sfc_main$17,
      BCarouselSlide: _sfc_main18,
      BCloseButton: _sfc_main5,
      BCol: _sfc_main19,
      BCollapse: _sfc_main3,
      BContainer: _sfc_main20,
      BDropdown,
      BDropdownDivider: _sfc_main$62,
      BDropdownForm: _sfc_main$52,
      BDropdownGroup: _sfc_main$42,
      BDropdownHeader: _sfc_main$32,
      BDropdownItem: _sfc_main$22,
      BDropdownItemButton: _sfc_main$18,
      BDropdownText: _sfc_main23,
      BForm: _sfc_main24,
      BFormCheckbox: _sfc_main$111,
      BFormCheckboxGroup: _sfc_main28,
      BFormDatalist: _sfc_main$19,
      BFormFile: _sfc_main29,
      BFormFloatingLabel: _sfc_main26,
      BFormGroup: _sfc_main30,
      BFormInput: _sfc_main31,
      BFormInvalidFeedback: _sfc_main$33,
      BFormRadio: _sfc_main$112,
      BFormRadioGroup: _sfc_main32,
      BFormRow: _sfc_main$23,
      BFormSelect: _sfc_main33,
      BFormSelectOption: _sfc_main25,
      BFormSelectOptionGroup: _sfc_main$113,
      BFormSpinbutton: _sfc_main34,
      BFormTag: _sfc_main$114,
      BFormTags: _sfc_main35,
      BFormText: _sfc_main$110,
      BFormTextarea: _sfc_main36,
      BFormValidFeedback: _sfc_main27,
      BImg: _sfc_main15,
      BInput: _sfc_main31,
      BInputGroup: _sfc_main$115,
      BInputGroupText: _sfc_main37,
      BLink: _sfc_main7,
      BListGroup: _sfc_main$116,
      BListGroupItem: _sfc_main38,
      BModal,
      BModalOrchestrator: _sfc_main39,
      BNav: _sfc_main$43,
      BNavForm: _sfc_main$34,
      BNavItem: _sfc_main$24,
      BNavItemDropdown: _sfc_main$118,
      BNavText: _sfc_main40,
      BNavbar: _sfc_main$35,
      BNavbarBrand: _sfc_main$25,
      BNavbarNav: _sfc_main$119,
      BNavbarToggle: _sfc_main41,
      BOffcanvas,
      BOverlay: _sfc_main43,
      BPagination: _sfc_main44,
      BPlaceholder: _sfc_main$44,
      BPlaceholderButton: _sfc_main$36,
      BPlaceholderCard: _sfc_main$26,
      BPlaceholderTable: _sfc_main$120,
      BPlaceholderWrapper: _sfc_main46,
      BPopover,
      BPopoverOrchestrator: _sfc_main48,
      BProgress: _sfc_main49,
      BProgressBar: _sfc_main$121,
      BRow: _sfc_main21,
      BSpinner: _sfc_main6,
      BTab: _sfc_main$123,
      BTable: _sfc_main50,
      BTableLite: _sfc_main$122,
      BTableSimple: _sfc_main45,
      BTabs: _sfc_main51,
      BTbody: _sfc_main$72,
      BTd: _sfc_main$63,
      BTfoot: _sfc_main$53,
      BTh: _sfc_main$45,
      BThead: _sfc_main$37,
      BToast,
      BToastOrchestrator: _sfc_main52,
      BTooltip: _sfc_main47,
      BTr: _sfc_main$27,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

// node_modules/bootstrap-vue-next/dist/index-sLCKmIWG.mjs
var componentsWithExternalPath = {
  BAccordion: '/components/BAccordion',
  BAccordionItem: '/components/BAccordion',
  BAlert: '/components/BAlert',
  BAvatar: '/components/BAvatar',
  BAvatarGroup: '/components/BAvatar',
  BBadge: '/components/BBadge',
  BBreadcrumb: '/components/BBreadcrumb',
  BBreadcrumbItem: '/components/BBreadcrumb',
  BButton: '/components/BButton',
  BButtonGroup: '/components/BButton',
  BButtonToolbar: '/components/BButton',
  BCloseButton: '/components/BButton',
  BCard: '/components/BCard',
  BCardBody: '/components/BCard',
  BCardFooter: '/components/BCard',
  BCardGroup: '/components/BCard',
  BCardHeader: '/components/BCard',
  BCardImg: '/components/BCard',
  BCardSubtitle: '/components/BCard',
  BCardText: '/components/BCard',
  BCardTitle: '/components/BCard',
  BCarousel: '/components/BCarousel',
  BCarouselSlide: '/components/BCarousel',
  BCol: '/components/BContainer',
  BCollapse: '/components/BCollapse',
  BContainer: '/components/BContainer',
  BDropdown: '/components/BDropdown',
  BDropdownDivider: '/components/BDropdown',
  BDropdownForm: '/components/BDropdown',
  BDropdownGroup: '/components/BDropdown',
  BDropdownHeader: '/components/BDropdown',
  BDropdownItem: '/components/BDropdown',
  BDropdownItemButton: '/components/BDropdown',
  BDropdownText: '/components/BDropdown',
  BForm: '/components/BForm',
  BFormCheckbox: '/components/BFormCheckbox',
  BFormCheckboxGroup: '/components/BFormCheckbox',
  BFormDatalist: '/components/BForm',
  BFormFile: '/components/BFormFile',
  BFormFloatingLabel: '/components/BForm',
  BFormGroup: '/components/BFormGroup',
  BFormInput: '/components/BFormInput',
  BFormInvalidFeedback: '/components/BForm',
  BFormRadio: '/components/BFormRadio',
  BFormRadioGroup: '/components/BFormRadio',
  BFormRow: '/components/BForm',
  BFormSelect: '/components/BFormSelect',
  BFormSelectOption: '/components/BFormSelect',
  BFormSelectOptionGroup: '/components/BFormSelect',
  BFormSpinbutton: '/components/BFormSpinbutton',
  BFormTag: '/components/BFormTags',
  BFormTags: '/components/BFormTags',
  BFormText: '/components/BForm',
  BFormTextarea: '/components/BFormTextarea',
  BFormValidFeedback: '/components/BForm',
  BImg: '/components/BImg',
  BInput: '/components/BFormInput',
  BInputGroup: '/components/BInputGroup',
  BInputGroupText: '/components/BInputGroup',
  BListGroup: '/components/BListGroup',
  BListGroupItem: '/components/BListGroup',
  BModal: '/components/BModal',
  BModalOrchestrator: '/components/BModal',
  BNav: '/components/BNav',
  BNavForm: '/components/BNav',
  BNavItem: '/components/BNav',
  BNavItemDropdown: '/components/BNav',
  BNavText: '/components/BNav',
  BNavbar: '/components/BNavbar',
  BNavbarBrand: '/components/BNavbar',
  BNavbarNav: '/components/BNavbar',
  BNavbarToggle: '/components/BNavbar',
  BOffcanvas: '/components/BOffcanvas',
  BOverlay: '/components/BOverlay',
  BPagination: '/components/BPagination',
  BPlaceholder: '/components/BPlaceholder',
  BPlaceholderButton: '/components/BPlaceholder',
  BPlaceholderCard: '/components/BPlaceholder',
  BPlaceholderTable: '/components/BPlaceholder',
  BPlaceholderWrapper: '/components/BPlaceholder',
  BPopover: '/components/BPopover',
  BProgress: '/components/BProgress',
  BRow: '/components/BContainer',
  BSpinner: '/components/BSpinner',
  BTab: '/components/BTabs',
  BTabs: '/components/BTabs',
  BToast: '/components/BToast',
  BToastOrchestrator: '/components/BToast',
  BTooltip: '/components/BTooltip',
  BLink: '/components/BLink',
  BProgressBar: '/components/BProgress',
  BTableSimple: '/components/BTable',
  BTableLite: '/components/BTable',
  BTable: '/components/BTable',
  BTbody: '/components/BTable',
  BTd: '/components/BTable',
  BTh: '/components/BTable',
  BThead: '/components/BTable',
  BTfoot: '/components/BTable',
  BTr: '/components/BTable',
  BPopoverOrchestrator: '/components/BPopover',
};
var componentNames = Object.freeze(Object.keys(componentsWithExternalPath));
var directivesWithExternalPath = {
  vBColorMode: '/directives/BColorMode',
  vBModal: '/directives/BModal',
  vBPopover: '/directives/BPopover',
  vBScrollspy: '/directives/BScrollspy',
  vBToggle: '/directives/BToggle',
  vBTooltip: '/directives/BTooltip',
};
var directiveNames = Object.freeze(Object.keys(directivesWithExternalPath));
var composablesWithExternalPath = {
  useBreadcrumb: '/composables/useBreadcrumb',
  useColorMode: '/composables/useColorMode',
  useModal: '/composables/useModal',
  useModalController: '/composables/useModalController',
  useScrollspy: '/composables/useScrollspy',
  useToastController: '/composables/useToastController',
  usePopoverController: '/composables/usePopoverController',
};
var composableNames = Object.freeze(Object.keys(composablesWithExternalPath));
var bvKey = 'bootstrap-vue-next';
var parseActiveImports = (options, values) => {
  const { all, ...others } = options;
  const valuesCopy = {};
  if (all) {
    values.forEach(el => {
      valuesCopy[el] = all;
    });
  }
  const merge = { ...valuesCopy, ...others };
  return Object.entries(merge)
    .filter(([name, value]) => !!value && values.includes(name))
    .map(([name]) => name);
};
var usedComponents = /* @__PURE__ */ new Set();
var usedDirectives = /* @__PURE__ */ new Set();
var BootstrapVueNextResolver = Object.assign(
  ({ aliases = {}, directives = true, components = true } = {}) => {
    const selectedComponents = typeof components === 'boolean' ? { all: components } : components;
    const compImports = parseActiveImports(selectedComponents, componentNames).reduce((map, name) => {
      map.set(name, `${bvKey}${componentsWithExternalPath[name]}`);
      return map;
    }, /* @__PURE__ */ new Map());
    const selectedDirectives = typeof directives === 'boolean' ? { all: directives } : directives;
    const dirImports = parseActiveImports(selectedDirectives, directiveNames).reduce((map, directive) => {
      const key = directive.toLowerCase().startsWith('v') ? directive : `v${directive}`;
      map.set(key, `${bvKey}${directivesWithExternalPath[key]}`);
      return map;
    }, /* @__PURE__ */ new Map());
    const resolvers = [
      {
        type: 'component',
        resolve(name) {
          const destination = compImports.get(name);
          const aliasDestination = compImports.get(aliases[name]);
          if (aliasDestination) {
            const val = aliases[name];
            usedComponents.add(val);
            return {
              name: val,
              from: aliasDestination,
            };
          }
          if (destination) {
            usedComponents.add(name);
            return {
              name,
              from: destination,
            };
          }
        },
      },
      {
        type: 'directive',
        resolve(name) {
          const prefixedName = `v${name}`;
          const destination = dirImports.get(prefixedName);
          if (destination) {
            usedDirectives.add(prefixedName);
            return {
              name: prefixedName,
              from: destination,
            };
          }
        },
      },
    ];
    return resolvers;
  },
  {
    __usedComponents: usedComponents,
    __usedDirectives: usedDirectives,
  },
);
var index5 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      BootstrapVueNextResolver,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

// node_modules/bootstrap-vue-next/dist/src/plugins/bootstrap/index.mjs
var bootstrapPlugin = {
  install(app, options) {
    const val = (options == null ? void 0 : options.components) ?? {};
    app.provide(defaultsKey, ref(val));
  },
};

// node_modules/bootstrap-vue-next/dist/src/plugins/breadcrumb/index.mjs
var breadcrumbPlugin = {
  install(app) {
    const items = ref([]);
    const reset = () => {
      items.value.splice(0, items.value.length);
    };
    app.provide(breadcrumbPluginKey, { items, reset });
  },
};

// node_modules/bootstrap-vue-next/dist/src/plugins/modalController/index.mjs
var modalControllerPlugin = {
  install(app) {
    const modals = ref(/* @__PURE__ */ new Map());
    const buildPromise = () => {
      let resolveFunc = () => {};
      const promise = new Promise(resolve => {
        resolveFunc = resolve;
      });
      return {
        value: promise,
        resolve: resolveFunc,
      };
    };
    const buildPrereqs = id => [buildPromise(), id || Symbol('Modals controller'), true];
    const show = (obj = {}) => {
      var _a;
      const resolvedProps = toRef(obj.props);
      const [_promise, _self, _modelValue] = buildPrereqs((_a = resolvedProps.value) == null ? void 0 : _a.id);
      modals.value.set(_self, {
        component: !obj.component ? void 0 : markRaw(obj.component),
        props: { ...resolvedProps.value, _isConfirm: false, _promise, _modelValue },
      });
      watch(resolvedProps, newValue => {
        const previous = modals.value.get(_self);
        if (!previous) return;
        modals.value.set(_self, {
          component: !obj.component ? void 0 : markRaw(obj.component),
          props: { ...previous.props, ...newValue },
        });
      });
      return _promise.value;
    };
    const confirm = (obj = {}) => {
      var _a;
      const resolvedProps = toRef(obj.props);
      const [_promise, _self, _modelValue] = buildPrereqs((_a = resolvedProps.value) == null ? void 0 : _a.id);
      modals.value.set(_self, {
        component: !obj.component ? void 0 : markRaw(obj.component),
        props: { ...resolvedProps.value, _isConfirm: true, _promise, _modelValue },
      });
      watch(resolvedProps, newValue => {
        const previous = modals.value.get(_self);
        if (!previous) return;
        modals.value.set(_self, {
          component: !obj.component ? void 0 : markRaw(obj.component),
          props: { ...previous.props, ...newValue },
        });
      });
      return _promise.value;
    };
    const leave = self2 => {
      const modal = modals.value.get(self2);
      if (!(modal == null ? void 0 : modal.props)) return;
      modal.props = {
        ...modal.props,
        _modelValue: false,
      };
    };
    const remove = self2 => {
      modals.value.delete(self2);
    };
    app.provide(modalControllerPluginKey, {
      modals,
      remove,
      show,
      confirm,
      leave,
    });
  },
};

// node_modules/bootstrap-vue-next/dist/src/plugins/modalManager/index.mjs
var modalManagerPlugin = {
  install(app) {
    const stack = ref(/* @__PURE__ */ new Map());
    const countStack = computed(() => stack.value.size);
    const valuesStack = computed(() => [...stack.value.values()]);
    const lastStack = computed(() => valuesStack.value[valuesStack.value.length - 1]);
    const pushStack = modal => {
      stack.value.set(modal.uid, modal);
    };
    const removeStack = modal => {
      stack.value.delete(modal.uid);
    };
    const registry = ref(/* @__PURE__ */ new Map());
    const pushRegistry = modal => {
      registry.value.set(modal.uid, modal);
    };
    const removeRegistry = modal => {
      registry.value.delete(modal.uid);
    };
    app.provide(modalManagerPluginKey, {
      countStack,
      lastStack,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      registry: readonly(registry),
      stack: valuesStack,
      pushStack,
      removeStack,
      pushRegistry,
      removeRegistry,
    });
  },
};

// node_modules/bootstrap-vue-next/dist/src/plugins/popoverController/index.mjs
var popoverPlugin = {
  install(app) {
    const popovers = ref(/* @__PURE__ */ new Map());
    const popover = obj => {
      var _a;
      const resolvedProps = toRef(obj);
      const _self = ((_a = resolvedProps.value) == null ? void 0 : _a.id) || Symbol('Popover controller');
      watch(
        resolvedProps,
        newValue => {
          popovers.value.set(_self, {
            ...newValue,
            ...(typeof newValue['modelValue'] !== 'undefined' && isRef(obj)
              ? {
                  'onUpdate:modelValue': val => {
                    var _a2;
                    (_a2 = newValue['onUpdate:modelValue']) == null ? void 0 : _a2.call(newValue, val);
                    obj.value.modelValue = val;
                  },
                }
              : {}),
          });
        },
        {
          immediate: true,
          deep: true,
        },
      );
      onScopeDispose(() => popovers.value.delete(_self), true);
      return _self;
    };
    const setPopover = (self2, val) => {
      const popover2 = popovers.value.get(self2);
      if (!popover2) return;
      popovers.value.set(self2, {
        ...popover2,
        ...toValue(val),
      });
    };
    const removePopover = self2 => popovers.value.delete(self2);
    const tooltips = ref(/* @__PURE__ */ new Map());
    const tooltip = obj => {
      var _a;
      const resolvedProps = toRef(obj);
      const _self = ((_a = resolvedProps.value) == null ? void 0 : _a.id) || Symbol('Tooltip controller');
      watch(
        resolvedProps,
        newValue => {
          popovers.value.set(_self, {
            ...newValue,
            ...(typeof newValue['modelValue'] !== 'undefined' && isRef(obj)
              ? {
                  'onUpdate:modelValue': val => {
                    var _a2;
                    (_a2 = newValue['onUpdate:modelValue']) == null ? void 0 : _a2.call(newValue, val);
                    obj.value.modelValue = val;
                  },
                }
              : {}),
          });
        },
        {
          immediate: true,
          deep: true,
        },
      );
      onScopeDispose(() => tooltips.value.delete(_self), true);
      return _self;
    };
    const setTooltip = (self2, val) => {
      const tooltip2 = tooltips.value.get(self2);
      if (!tooltip2) return;
      tooltips.value.set(self2, {
        ...tooltip2,
        ...toValue(val),
      });
    };
    const removeTooltip = self2 => tooltips.value.delete(self2);
    app.provide(popoverPluginKey, {
      popovers,
      tooltips,
      tooltip,
      popover,
      setPopover,
      setTooltip,
      removePopover,
      removeTooltip,
    });
  },
};

// node_modules/bootstrap-vue-next/dist/src/plugins/rtl/index.mjs
var rtlPlugin = {
  install(app, options) {
    var _a, _b;
    const rtlDefault = false;
    const localeDefault = void 0;
    const rtlInitial =
      typeof (options == null ? void 0 : options.rtl) === 'boolean'
        ? rtlDefault
        : (((_a = options == null ? void 0 : options.rtl) == null ? void 0 : _a.rtlInitial) ?? rtlDefault);
    const localeInitial =
      typeof (options == null ? void 0 : options.rtl) === 'boolean'
        ? localeDefault
        : (((_b = options == null ? void 0 : options.rtl) == null ? void 0 : _b.localeInitial) ?? localeDefault);
    const isRtl = ref(rtlInitial);
    const locale = ref(localeInitial);
    app.provide(rtlPluginKey, { isRtl, locale });
  },
};

// node_modules/bootstrap-vue-next/dist/src/plugins/toastController/index.mjs
var posDefault = 'top-end';
var toastPlugin = {
  install(app) {
    const toasts = ref([]);
    const _isAppend = ref(false);
    const _setIsAppend = value => {
      _isAppend.value = value;
    };
    const show = (obj = {}) => {
      var _a, _b, _c, _d;
      const resolvedProps = toRef(obj.props);
      const _self = ((_a = resolvedProps.value) == null ? void 0 : _a.id) || Symbol('Toast controller');
      const toastToAdd = {
        component: !obj.component ? void 0 : markRaw(obj.component),
        props: {
          ...resolvedProps.value,
          pos: ((_b = resolvedProps.value) == null ? void 0 : _b.pos) || posDefault,
          _modelValue: ((_c = resolvedProps.value) == null ? void 0 : _c.value) || 5e3,
          _self,
        },
      };
      if (((_d = resolvedProps.value) == null ? void 0 : _d.appendToast) !== void 0 ? resolvedProps.value.appendToast : _isAppend.value) {
        toasts.value.push(toastToAdd);
      } else {
        toasts.value.unshift(toastToAdd);
      }
      watch(resolvedProps, newValue => {
        const previousIndex = toasts.value.findIndex(el => el.props._self === _self);
        if (previousIndex === -1) return;
        toasts.value.splice(previousIndex, 1, {
          component: !obj.component ? void 0 : markRaw(obj.component),
          props: {
            ...toasts.value[previousIndex].props,
            ...newValue,
            _modelValue: (newValue == null ? void 0 : newValue.value) || toasts.value[previousIndex].props._modelValue || 5e3,
          },
        });
      });
      return _self;
    };
    const remove = self2 => {
      toasts.value = toasts.value.filter(el => el.props._self !== self2);
    };
    const leave = self2 => {
      const toastIndex = toasts.value.findIndex(el => el.props._self === self2);
      if (toastIndex === -1) return;
      toasts.value.splice(toastIndex, 1, {
        component: !toasts.value[toastIndex].component ? void 0 : markRaw(toasts.value[toastIndex].component),
        props: {
          ...toasts.value[toastIndex].props,
          _modelValue: false,
        },
      });
    };
    app.provide(toastPluginKey, {
      _setIsAppend,
      toasts,
      show,
      remove,
      leave,
    });
  },
};

// node_modules/bootstrap-vue-next/dist/src/plugins/showHide/index.mjs
var showHidePlugin = {
  install(app) {
    const values = reactive({});
    const fun = ({ id, value, toggle: toggle2, show, hide: hide2 }) => {
      values[id] = computed(() => ({ value: value.value, toggle: toggle2, show, hide: hide2 }));
      return {
        unregister() {
          delete values[id];
        },
      };
    };
    fun.map = readonly(values);
    app.provide(globalShowHideStorageInjectionKey, fun);
  },
};

// node_modules/bootstrap-vue-next/dist/src/plugins/createBootstrap/index.mjs
var createBootstrap = (pluginData = {}) => ({
  install(app) {
    if (pluginData.breadcrumb ?? true) {
      app.use(breadcrumbPlugin);
    }
    if (pluginData.modalController ?? true) {
      app.use(modalControllerPlugin);
    }
    if (pluginData.modalManager ?? true) {
      app.use(modalManagerPlugin);
    }
    if ((pluginData.rtl ?? true) || typeof pluginData.rtl === 'object') {
      app.use(rtlPlugin, pluginData);
    }
    if (pluginData.toast ?? true) {
      app.use(toastPlugin);
    }
    if (pluginData.popover ?? true) {
      app.use(popoverPlugin);
    }
    app.use(showHidePlugin);
    app.use(bootstrapPlugin, pluginData);
  },
});

// node_modules/bootstrap-vue-next/dist/index-DwDHvBIQ.mjs
var index6 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      bootstrapPlugin,
      breadcrumbPlugin,
      createBootstrap,
      modalControllerPlugin,
      modalManagerPlugin,
      popoverPlugin,
      rtlPlugin,
      toastPlugin,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

// node_modules/bootstrap-vue-next/dist/bootstrap-vue-next.mjs
var index7 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      componentNames,
      componentsWithExternalPath,
      composableNames,
      composablesWithExternalPath,
      directiveNames,
      directivesWithExternalPath,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
export {
  _sfc_main$1 as BAccordion,
  _sfc_main4 as BAccordionItem,
  BAlert,
  _sfc_main$12 as BAvatar,
  _sfc_main12 as BAvatarGroup,
  _sfc_main11 as BBadge,
  _sfc_main13 as BBreadcrumb,
  _sfc_main$13 as BBreadcrumbItem,
  _sfc_main8 as BButton,
  _sfc_main$14 as BButtonGroup,
  _sfc_main14 as BButtonToolbar,
  _sfc_main16 as BCard,
  _sfc_main$2 as BCardBody,
  _sfc_main$15 as BCardFooter,
  _sfc_main$16 as BCardGroup,
  _sfc_main$5 as BCardHeader,
  _sfc_main$7 as BCardImg,
  _sfc_main$3 as BCardSubtitle,
  _sfc_main17 as BCardText,
  _sfc_main$4 as BCardTitle,
  _sfc_main$17 as BCarousel,
  _sfc_main18 as BCarouselSlide,
  _sfc_main5 as BCloseButton,
  _sfc_main19 as BCol,
  _sfc_main3 as BCollapse,
  _sfc_main20 as BContainer,
  BDropdown,
  _sfc_main$62 as BDropdownDivider,
  _sfc_main$52 as BDropdownForm,
  _sfc_main$42 as BDropdownGroup,
  _sfc_main$32 as BDropdownHeader,
  _sfc_main$22 as BDropdownItem,
  _sfc_main$18 as BDropdownItemButton,
  _sfc_main23 as BDropdownText,
  _sfc_main24 as BForm,
  _sfc_main$111 as BFormCheckbox,
  _sfc_main28 as BFormCheckboxGroup,
  _sfc_main$19 as BFormDatalist,
  _sfc_main29 as BFormFile,
  _sfc_main26 as BFormFloatingLabel,
  _sfc_main30 as BFormGroup,
  _sfc_main31 as BFormInput,
  _sfc_main$33 as BFormInvalidFeedback,
  _sfc_main$112 as BFormRadio,
  _sfc_main32 as BFormRadioGroup,
  _sfc_main$23 as BFormRow,
  _sfc_main33 as BFormSelect,
  _sfc_main25 as BFormSelectOption,
  _sfc_main$113 as BFormSelectOptionGroup,
  _sfc_main34 as BFormSpinbutton,
  _sfc_main$114 as BFormTag,
  _sfc_main35 as BFormTags,
  _sfc_main$110 as BFormText,
  _sfc_main36 as BFormTextarea,
  _sfc_main27 as BFormValidFeedback,
  _sfc_main15 as BImg,
  _sfc_main31 as BInput,
  _sfc_main$115 as BInputGroup,
  _sfc_main37 as BInputGroupText,
  _sfc_main7 as BLink,
  _sfc_main$116 as BListGroup,
  _sfc_main38 as BListGroupItem,
  BModal,
  _sfc_main39 as BModalOrchestrator,
  _sfc_main$43 as BNav,
  _sfc_main$34 as BNavForm,
  _sfc_main$24 as BNavItem,
  _sfc_main$118 as BNavItemDropdown,
  _sfc_main40 as BNavText,
  _sfc_main$35 as BNavbar,
  _sfc_main$25 as BNavbarBrand,
  _sfc_main$119 as BNavbarNav,
  _sfc_main41 as BNavbarToggle,
  BOffcanvas,
  _sfc_main43 as BOverlay,
  _sfc_main44 as BPagination,
  _sfc_main$44 as BPlaceholder,
  _sfc_main$36 as BPlaceholderButton,
  _sfc_main$26 as BPlaceholderCard,
  _sfc_main$120 as BPlaceholderTable,
  _sfc_main46 as BPlaceholderWrapper,
  BPopover,
  _sfc_main48 as BPopoverOrchestrator,
  _sfc_main49 as BProgress,
  _sfc_main$121 as BProgressBar,
  _sfc_main21 as BRow,
  _sfc_main6 as BSpinner,
  _sfc_main$123 as BTab,
  _sfc_main50 as BTable,
  _sfc_main$122 as BTableLite,
  _sfc_main45 as BTableSimple,
  _sfc_main51 as BTabs,
  _sfc_main$72 as BTbody,
  _sfc_main$63 as BTd,
  _sfc_main$53 as BTfoot,
  _sfc_main$45 as BTh,
  _sfc_main$37 as BThead,
  BToast,
  _sfc_main52 as BToastOrchestrator,
  _sfc_main47 as BTooltip,
  _sfc_main$27 as BTr,
  BootstrapVueNextResolver,
  BvCarouselEvent,
  BvEvent,
  BvTriggerableEvent,
  index4 as Components,
  index as Composables,
  index2 as Directives,
  index6 as Plugins,
  index5 as Resolvers,
  index7 as Types,
  index3 as Utils,
  bootstrapPlugin,
  breadcrumbPlugin,
  componentNames,
  componentsWithExternalPath,
  composableNames,
  composablesWithExternalPath,
  createBootstrap,
  directiveNames,
  directivesWithExternalPath,
  modalControllerPlugin,
  modalManagerPlugin,
  popoverPlugin,
  rtlPlugin,
  toastPlugin,
  useBreadcrumb,
  useColorMode2 as useColorMode,
  useModal,
  useModalController,
  usePopoverController,
  useScrollspy,
  useToastController,
  vBColorMode,
  vBToggle as vBModal,
  vBPopover,
  vBScrollspy,
  vBToggle,
  vBTooltip,
};
/*! Bundled license information:

bootstrap-vue-next/dist/useSafeScrollLock-DjG0jeMK.mjs:
  (*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)
  (*!
  * focus-trap 7.6.2
  * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
  *)
*/
//# sourceMappingURL=bootstrap-vue-next.js.map
