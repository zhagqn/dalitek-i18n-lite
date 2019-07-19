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
  const globalOptions = initOptions || {
    packs: {},
    locale: "zh-cn"
  };

  return function(attr = "", packsParam, localeParam) {
    let str = "";
    /** 当 attr 类型为 string 时, 从现有或传入的语言包转译
     * @attr 属性
     * @packsParam 传入语言包
     * @localeParam 传入语言
     *  */

    // 优先使用参数中的语言
    let _locale = localeParam || globalOptions.locale;

    if (typeof attr === "string") {
      // 优先使用参数中的语言包
      let _pack = packsParam || globalOptions.packs;
      // 分隔字段, 循环语言包对象
      let keys = attr.split(".");
      let langObj = _pack[_locale];
      if (langObj) {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (typeof langObj === "object" && langObj.hasOwnProperty(key)) {
            let tmp = langObj[key];
            if (typeof tmp === "string") {
              str = tmp;
              break;
            } else if (typeof tmp === "object") {
              langObj = tmp;
            } else {
              break;
            }
          } else {
            console.info(`${_locale} 语言中未找到[key]: ${key}`);
            break;
          }
        }
      } else {
        console.info(`语言包中未找到对应语言: ${_locale}`);
      }
    }

    /** 当第一个参数为对象时
     * @attr = {}
     *   @pack 对象语言包, 形如：{ title: { "zh-cn": "华为", "en": "HUAWEI" } }
     *   @locale 语言
     *  */
    if (typeof attr === "object") {
      let _pack = attr || {};
      if (_pack.hasOwnProperty(_locale) && typeof _pack[_locale] === "string") {
        str = _pack[_locale];
      } else {
        console.info(`对象语言包中未找到对应语言 ${_locale} 的翻译`);
      }
    }
    return str;
  };
}

// Vue plugin install function
i18n.install = function(Vue, initOptions) {
  const i18nFunc = new i18n(initOptions);
  Vue.directive("t", function(el, binding, vnode) {
    let str = "";
    if (typeof binding.value === "string") {
      str = vnode.context.$t(binding.value);
    } else if (typeof binding.value === "object") {
      // 当指令中需要使用临时语言包时, 需要封装成对象传入
      if (binding.value.attr) {
        // 传入的参数对象中存在 attr 属性时, 封装成 {attr, packs, locale}
        let _attr = binding.value.attr || "";
        let _pack = binding.value.packs;
        let _locale = binding.value.locale;
        str = vnode.context.$t(_attr, _pack, _locale);
      } else {
        // 传入的参数对象中不存在 attr 属性时, 当成对象语言包处理
        str = vnode.context.$t(binding.value);
      }
    }
    el.innerText = str;
  });
  Vue.prototype.$t = function(attr, pack, locale) {
    // 未传入 locale 时, 优先使用 Vuex store 中的 locale
    if (
      !locale &&
      this.$store &&
      this.$store.state &&
      this.$store.state.locale
    ) {
      locale = this.$store.state.locale;
      // 在对象语言包中使用 store 的 locale
    }
    return i18nFunc(attr, pack, locale);
  };
};

export default i18n;
