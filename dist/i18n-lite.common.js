/*!
 * i18n-lite v0.2.0 
 * (c) 2019 zhagqn
 * Released under the MIT License.
 */
'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/**
 * @initOptions
 *   @packs 语言包, 形如:
 *          {
 *            "zh-cn": {
 *              "optionTranslations": { "translations": { "578": "Color" } },
 *              "title": "HUAWEI"
 *            },
 *            "en": {
 *              "optionTranslations": { "translations": { "578": "颜色" } },
 *              "title": "华为"
 *            }
 *          }
 *   @locale 初始化语言, 例如
 *           zh-cn: 中文
 *           en:    English
 * */
function i18n(initOptions) {
  var globalOptions = initOptions || {
    packs: {},
    locale: "zh-cn"
  };
  return function () {
    var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var packsParam = arguments.length > 1 ? arguments[1] : undefined;
    var localeParam = arguments.length > 2 ? arguments[2] : undefined;
    var str = "";
    /** 当 attr 类型为 string 时, 从现有或传入的语言包转译
     * @attr 属性
     * @packsParam 传入语言包
     * @localeParam 传入语言
     *  */
    // 优先使用参数中的语言

    var _locale = localeParam || globalOptions.locale;

    if (typeof attr === "string") {
      // 优先使用参数中的语言包
      var _pack = packsParam || globalOptions.packs; // 分隔字段, 循环语言包对象


      var keys = attr.split(".");
      var langObj = _pack[_locale];

      if (langObj) {
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];

          if (_typeof(langObj) === "object" && langObj.hasOwnProperty(key)) {
            var tmp = langObj[key];

            if (typeof tmp === "string") {
              str = tmp;
              break;
            } else if (_typeof(tmp) === "object") {
              langObj = tmp;
            } else {
              break;
            }
          } else {
            console.info("".concat(_locale, " \u8BED\u8A00\u4E2D\u672A\u627E\u5230[key]: ").concat(key));
            break;
          }
        }
      } else {
        console.info("\u8BED\u8A00\u5305\u4E2D\u672A\u627E\u5230\u5BF9\u5E94\u8BED\u8A00: ".concat(_locale));
      }
    }
    /** 当第一个参数为对象时
     * @attr = {}
     *   @pack 对象语言包, 形如：{ title: { "zh-cn": "华为", "en": "HUAWEI" } }
     *   @locale 语言
     *  */


    if (_typeof(attr) === "object") {
      var _pack2 = attr || {};

      if (_pack2.hasOwnProperty(_locale) && typeof _pack2[_locale] === "string") {
        str = _pack2[_locale];
      } else {
        console.info("\u5BF9\u8C61\u8BED\u8A00\u5305\u4E2D\u672A\u627E\u5230\u5BF9\u5E94\u8BED\u8A00 ".concat(_locale, " \u7684\u7FFB\u8BD1"));
      }
    }

    return str;
  };
} // Vue plugin install function


i18n.install = function (Vue, initOptions) {
  var i18nFunc = new i18n(initOptions);
  Vue.directive("t", function (el, binding, vnode) {
    var str = "";

    if (typeof binding.value === "string") {
      str = vnode.context.$t(binding.value);
    } else if (_typeof(binding.value) === "object") {
      // 当指令中需要使用临时语言包时, 需要封装成对象传入
      if (binding.value.attr) {
        // 传入的参数对象中存在 attr 属性时, 封装成 {attr, packs, locale}
        var _attr = binding.value.attr || "";

        var _pack = binding.value.packs;
        var _locale = binding.value.locale;
        str = vnode.context.$t(_attr, _pack, _locale);
      } else {
        // 传入的参数对象中不存在 attr 属性时, 当成对象语言包处理
        str = vnode.context.$t(binding.value);
      }
    }

    el.innerText = str;
  });

  Vue.prototype.$t = function (attr, pack, locale) {
    // 未传入 locale 时, 优先使用 Vuex store 中的 locale
    if (!locale && this.$store && this.$store.state && this.$store.state.locale) {
      locale = this.$store.state.locale; // 在对象语言包中使用 store 的 locale
    }

    return i18nFunc(attr, pack, locale);
  };
};

module.exports = i18n;
