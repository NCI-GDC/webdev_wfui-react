// http://i18njs.com/
(function() {
    let Translator;
    let i18n;
    let translator;
    const __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };

    Translator = (function() {
        function Translator() {
            this.translate = __bind(this.translate, this);
            this.data = {
                values: {},
                contexts: [],
            };
            this.globalContext = {};
        }

        Translator.prototype.translate = function(
            text,
            defaultNumOrFormatting,
            numOrFormattingOrContext,
            formattingOrContext,
            context
        ) {
            let defaultText;
            let formatting;
            let isObject;
            let num;

            if (context == null) {
                context = this.globalContext;
            }
            isObject = function(obj) {
                let type;

                type = typeof obj;
                return type === 'function' || (type === 'object' && !!obj);
            };
            if (isObject(defaultNumOrFormatting)) {
                defaultText = null;
                num = null;
                formatting = defaultNumOrFormatting;
                context = numOrFormattingOrContext || this.globalContext;
            } else if (typeof defaultNumOrFormatting === 'number') {
                defaultText = null;
                num = defaultNumOrFormatting;
                formatting = numOrFormattingOrContext;
                context = formattingOrContext || this.globalContext;
            } else {
                defaultText = defaultNumOrFormatting;
                if (typeof numOrFormattingOrContext === 'number') {
                    num = numOrFormattingOrContext;
                    formatting = formattingOrContext;
                    context = context;
                } else {
                    num = null;
                    formatting = numOrFormattingOrContext;
                    context = formattingOrContext || this.globalContext;
                }
            }
            if (isObject(text)) {
                if (isObject(text.i18n)) {
                    text = text.i18n;
                }
                return this.translateHash(text, context);
            }
            return this.translateText(
                text,
                num,
                formatting,
                context,
                defaultText
            );
        };

        Translator.prototype.add = function(d) {
            let c;
            let k;
            let v;
            let _i;
            let _len;
            let _ref;
            let _ref1;
            let _results;

            if (d.values != null) {
                _ref = d.values;
                for (k in _ref) {
                    v = _ref[k];
                    this.data.values[k] = v;
                }
            }
            if (d.contexts != null) {
                _ref1 = d.contexts;
                _results = [];
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    c = _ref1[_i];
                    _results.push(this.data.contexts.push(c));
                }
                return _results;
            }
        };

        Translator.prototype.setContext = function(key, value) {
            return (this.globalContext[key] = value);
        };

        Translator.prototype.clearContext = function(key) {
            return (this.lobalContext[key] = null);
        };

        Translator.prototype.reset = function() {
            this.data = {
                values: {},
                contexts: [],
            };
            return (this.globalContext = {});
        };

        Translator.prototype.resetData = function() {
            return (this.data = {
                values: {},
                contexts: [],
            });
        };

        Translator.prototype.resetContext = function() {
            return (this.globalContext = {});
        };

        Translator.prototype.translateHash = function(hash, context) {
            let k;
            let v;

            for (k in hash) {
                v = hash[k];
                if (typeof v === 'string') {
                    hash[k] = this.translateText(v, null, null, context);
                }
            }
            return hash;
        };

        Translator.prototype.translateText = function(
            text,
            num,
            formatting,
            context,
            defaultText
        ) {
            let contextData;
            let result;

            if (context == null) {
                context = this.globalContext;
            }
            if (this.data == null) {
                return this.useOriginalText(
                    defaultText || text,
                    num,
                    formatting
                );
            }
            contextData = this.getContextData(this.data, context);
            if (contextData != null) {
                result = this.findTranslation(
                    text,
                    num,
                    formatting,
                    contextData.values,
                    defaultText
                );
            }
            if (result == null) {
                result = this.findTranslation(
                    text,
                    num,
                    formatting,
                    this.data.values,
                    defaultText
                );
            }
            if (result == null) {
                return this.useOriginalText(
                    defaultText || text,
                    num,
                    formatting
                );
            }
            return result;
        };

        Translator.prototype.findTranslation = function(
            text,
            num,
            formatting,
            data
        ) {
            let result;
            let triple;
            let value;
            let _i;
            let _len;

            value = data[text];
            if (value == null) {
                return null;
            }
            if (num == null) {
                if (typeof value === 'string') {
                    return this.applyFormatting(value, num, formatting);
                }
            } else if (value instanceof Array || value.length) {
                for (_i = 0, _len = value.length; _i < _len; _i++) {
                    triple = value[_i];
                    if (
                        (num >= triple[0] || triple[0] === null) &&
                        (num <= triple[1] || triple[1] === null)
                    ) {
                        result = this.applyFormatting(
                            triple[2].replace('-%n', String(-num)),
                            num,
                            formatting
                        );
                        return this.applyFormatting(
                            result.replace('%n', String(num)),
                            num,
                            formatting
                        );
                    }
                }
            }
            return null;
        };

        Translator.prototype.getContextData = function(data, context) {
            let c;
            let equal;
            let key;
            let value;
            let _i;
            let _len;
            let _ref;
            let _ref1;

            if (data.contexts == null) {
                return null;
            }
            _ref = data.contexts;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                c = _ref[_i];
                equal = true;
                _ref1 = c.matches;
                for (key in _ref1) {
                    value = _ref1[key];
                    equal = equal && value === context[key];
                }
                if (equal) {
                    return c;
                }
            }
            return null;
        };

        Translator.prototype.useOriginalText = function(text, num, formatting) {
            if (num == null) {
                return this.applyFormatting(text, num, formatting);
            }
            return this.applyFormatting(
                text.replace('%n', String(num)),
                num,
                formatting
            );
        };

        Translator.prototype.applyFormatting = function(text, num, formatting) {
            let ind;
            let regex;

            for (ind in formatting) {
                regex = new RegExp(`%{${ind}}`, 'g');
                text = text.replace(regex, formatting[ind]);
            }
            return text;
        };

        return Translator;
    })();

    translator = new Translator();

    i18n = translator.translate;

    i18n.translator = translator;

    i18n.create = function(data) {
        let trans;

        trans = new Translator();
        if (data != null) {
            trans.add(data);
        }
        trans.translate.create = i18n.create;
        return trans.translate;
    };

    if (global) global.i18n = i18n;
    (typeof module !== 'undefined' && module !== null
        ? (module.exports = i18n)
        : void 0) || (this.i18n = i18n);
}.call(this));
