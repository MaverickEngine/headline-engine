(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var PowerWordsScorer = /** @class */ (function () {
        function PowerWordsScorer() {
            this.powerword_list = [];
        }
        // powerword_regex: RegExp;
        PowerWordsScorer.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // if (this.powerword_list.length) return; // Cached
                            _a = this;
                            return [4 /*yield*/, jQuery.get(headlineengine_powerwords_api)["catch"](function (err) {
                                    console.log("Could not load Powerwords list");
                                    console.log(err);
                                    return [];
                                })];
                        case 1:
                            // if (this.powerword_list.length) return; // Cached
                            _a.powerword_list = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        PowerWordsScorer.prototype.score = function (headline) {
            if (!this.powerword_list.length)
                return {
                    name: "Powerwords",
                    score: 0,
                    message: "No Powerwords set - please set some Powerwords in the <a href=\"/wp-admin/admin.php?page=headlineengine\">settings page</a>",
                    pass: false
                };
            var title = headline.toLowerCase().replace(/[^a-z]/gm, " ");
            // Quick compare first
            var found = false;
            var powerwords_found = [];
            for (var _i = 0, _a = this.powerword_list; _i < _a.length; _i++) {
                var word = _a[_i];
                if (title.includes(word)) {
                    found = true;
                    powerwords_found.push(word);
                }
            }
            if (!found)
                return {
                    name: "Powerwords",
                    score: 0,
                    message: "No Powerwords found",
                    pass: false
                };
            // const powerwords_found = (title.match(this.powerword_regex) || []).filter(p => (p));
            var score = powerwords_found.length ? 1 : 0;
            var message = powerwords_found.length ? powerwords_found.map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(", ") : "None";
            return { name: "Powerwords", score: score, message: message, pass: powerwords_found.length > 0 };
        };
        return PowerWordsScorer;
    }());

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var linearScale = {exports: {}};

    (function (module, exports) {
    	(function(root) {

    	  function LinearScale(domain, range) {
    	    if (!(this instanceof LinearScale)) {
    	      return new LinearScale(domain, range);
    	    }
    	    this.domain = [];
    	    this.range = [];

    	    if (Array.isArray(domain)) {
    	      this.domain = domain;
    	    }
    	    if (Array.isArray(range)) {
    	      this.range = range;
    	    }

    	    var scale = function(value) {
    	      if (typeof value !== 'number') {
    	        return null;
    	      }

    	      var minValue = this.domain[0];
    	      var maxValue = this.domain[1];

    	      var minScale = this.range[0];
    	      var maxScale = this.range[1];

    	      if (minScale !== 'number' && typeof maxScale !== 'number') {
    	        minScale = minValue;
    	        maxScale = maxValue;
    	      }

    	      var ratio = (maxScale - minScale) / (maxValue - minValue);
    	      const result = minScale + ratio * (value - minValue);

    	      if (result === Infinity) return maxScale;
    	      else if (result === -Infinity) return minScale;
    	      else if (isNaN(result)) return minScale;

    	      return result
    	    }.bind(this);

    	    scale.domain = function(value) {
    	      if (Array.isArray(value)) {
    	        this.domain = value;
    	      }
    	      return scale;
    	    }.bind(this);

    	    scale.range = function(value) {
    	      if (Array.isArray(value)) {
    	        this.range = value;
    	      }
    	      return scale;
    	    }.bind(this);

    	    return scale;
    	  }

    	  {
    	    if (module.exports) {
    	      exports = module.exports = LinearScale;
    	    }
    	    exports.LinearScale = LinearScale;
    	  }

    	})();
    } (linearScale, linearScale.exports));

    var LinearScale = linearScale.exports;

    function calc_total_score(curr, target, range) {
        var min = Math.min(range[0], range[1]);
        var max = Math.max(range[0], range[1]);
        if (curr < min || curr > max)
            return 0;
        if (curr === target)
            return 1;
        var local_range;
        var local_curr;
        if (curr < target) {
            local_range = [0, target - min];
            local_curr = curr - min;
        }
        else {
            local_range = [max - target, 0];
            local_curr = curr - target;
        }
        var scale = LinearScale(local_range, [0, 1]);
        // console.log({curr, target, range, local_range, local_curr, scale: scale(local_curr)});
        return scale(local_curr);
    }

    var LetterCountScorer = /** @class */ (function () {
        function LetterCountScorer() {
            this.length_range = [headlineengine_length_range_min || 40, headlineengine_length_range_max || 90];
            this.length_target = headlineengine_length_target || 82;
        }
        LetterCountScorer.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        LetterCountScorer.prototype.message = function (length) {
            if (length < this.length_range[0]) {
                return "Too short, add ".concat(this.length_range[0] - length, " letter").concat(this.length_range[0] - length > 1 ? "s" : "");
            }
            else if (length > this.length_range[1]) {
                return "Too long, remove ".concat(length - this.length_range[1], " letter").concat(this.length_range[0] - length > 1 ? "s" : "");
            }
            else if (length === this.length_target) {
                return "Perfect (".concat(length, " letters)");
            }
            return "Good (".concat(length, " letters)");
        };
        LetterCountScorer.prototype.score = function (headline) {
            var score = calc_total_score(headline.length, this.length_target, this.length_range);
            var message = this.message(headline.length);
            var pass = headline.length >= this.length_range[0] && headline.length <= this.length_range[1];
            return { name: "Letter count", score: score, message: message, pass: pass };
        };
        return LetterCountScorer;
    }());

    function commonjsRequire(path) {
    	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }

    var pluralize$1 = {exports: {}};

    /* global define */

    (function (module, exports) {
    	(function (root, pluralize) {
    	  /* istanbul ignore else */
    	  if (typeof commonjsRequire === 'function' && 'object' === 'object' && 'object' === 'object') {
    	    // Node.
    	    module.exports = pluralize();
    	  } else {
    	    // Browser global.
    	    root.pluralize = pluralize();
    	  }
    	})(commonjsGlobal, function () {
    	  // Rule storage - pluralize and singularize need to be run sequentially,
    	  // while other rules can be optimized using an object for instant lookups.
    	  var pluralRules = [];
    	  var singularRules = [];
    	  var uncountables = {};
    	  var irregularPlurals = {};
    	  var irregularSingles = {};

    	  /**
    	   * Sanitize a pluralization rule to a usable regular expression.
    	   *
    	   * @param  {(RegExp|string)} rule
    	   * @return {RegExp}
    	   */
    	  function sanitizeRule (rule) {
    	    if (typeof rule === 'string') {
    	      return new RegExp('^' + rule + '$', 'i');
    	    }

    	    return rule;
    	  }

    	  /**
    	   * Pass in a word token to produce a function that can replicate the case on
    	   * another word.
    	   *
    	   * @param  {string}   word
    	   * @param  {string}   token
    	   * @return {Function}
    	   */
    	  function restoreCase (word, token) {
    	    // Tokens are an exact match.
    	    if (word === token) return token;

    	    // Lower cased words. E.g. "hello".
    	    if (word === word.toLowerCase()) return token.toLowerCase();

    	    // Upper cased words. E.g. "WHISKY".
    	    if (word === word.toUpperCase()) return token.toUpperCase();

    	    // Title cased words. E.g. "Title".
    	    if (word[0] === word[0].toUpperCase()) {
    	      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    	    }

    	    // Lower cased words. E.g. "test".
    	    return token.toLowerCase();
    	  }

    	  /**
    	   * Interpolate a regexp string.
    	   *
    	   * @param  {string} str
    	   * @param  {Array}  args
    	   * @return {string}
    	   */
    	  function interpolate (str, args) {
    	    return str.replace(/\$(\d{1,2})/g, function (match, index) {
    	      return args[index] || '';
    	    });
    	  }

    	  /**
    	   * Replace a word using a rule.
    	   *
    	   * @param  {string} word
    	   * @param  {Array}  rule
    	   * @return {string}
    	   */
    	  function replace (word, rule) {
    	    return word.replace(rule[0], function (match, index) {
    	      var result = interpolate(rule[1], arguments);

    	      if (match === '') {
    	        return restoreCase(word[index - 1], result);
    	      }

    	      return restoreCase(match, result);
    	    });
    	  }

    	  /**
    	   * Sanitize a word by passing in the word and sanitization rules.
    	   *
    	   * @param  {string}   token
    	   * @param  {string}   word
    	   * @param  {Array}    rules
    	   * @return {string}
    	   */
    	  function sanitizeWord (token, word, rules) {
    	    // Empty string or doesn't need fixing.
    	    if (!token.length || uncountables.hasOwnProperty(token)) {
    	      return word;
    	    }

    	    var len = rules.length;

    	    // Iterate over the sanitization rules and use the first one to match.
    	    while (len--) {
    	      var rule = rules[len];

    	      if (rule[0].test(word)) return replace(word, rule);
    	    }

    	    return word;
    	  }

    	  /**
    	   * Replace a word with the updated word.
    	   *
    	   * @param  {Object}   replaceMap
    	   * @param  {Object}   keepMap
    	   * @param  {Array}    rules
    	   * @return {Function}
    	   */
    	  function replaceWord (replaceMap, keepMap, rules) {
    	    return function (word) {
    	      // Get the correct token and case restoration functions.
    	      var token = word.toLowerCase();

    	      // Check against the keep object map.
    	      if (keepMap.hasOwnProperty(token)) {
    	        return restoreCase(word, token);
    	      }

    	      // Check against the replacement map for a direct word replacement.
    	      if (replaceMap.hasOwnProperty(token)) {
    	        return restoreCase(word, replaceMap[token]);
    	      }

    	      // Run all the rules against the word.
    	      return sanitizeWord(token, word, rules);
    	    };
    	  }

    	  /**
    	   * Check if a word is part of the map.
    	   */
    	  function checkWord (replaceMap, keepMap, rules, bool) {
    	    return function (word) {
    	      var token = word.toLowerCase();

    	      if (keepMap.hasOwnProperty(token)) return true;
    	      if (replaceMap.hasOwnProperty(token)) return false;

    	      return sanitizeWord(token, token, rules) === token;
    	    };
    	  }

    	  /**
    	   * Pluralize or singularize a word based on the passed in count.
    	   *
    	   * @param  {string}  word      The word to pluralize
    	   * @param  {number}  count     How many of the word exist
    	   * @param  {boolean} inclusive Whether to prefix with the number (e.g. 3 ducks)
    	   * @return {string}
    	   */
    	  function pluralize (word, count, inclusive) {
    	    var pluralized = count === 1
    	      ? pluralize.singular(word) : pluralize.plural(word);

    	    return (inclusive ? count + ' ' : '') + pluralized;
    	  }

    	  /**
    	   * Pluralize a word.
    	   *
    	   * @type {Function}
    	   */
    	  pluralize.plural = replaceWord(
    	    irregularSingles, irregularPlurals, pluralRules
    	  );

    	  /**
    	   * Check if a word is plural.
    	   *
    	   * @type {Function}
    	   */
    	  pluralize.isPlural = checkWord(
    	    irregularSingles, irregularPlurals, pluralRules
    	  );

    	  /**
    	   * Singularize a word.
    	   *
    	   * @type {Function}
    	   */
    	  pluralize.singular = replaceWord(
    	    irregularPlurals, irregularSingles, singularRules
    	  );

    	  /**
    	   * Check if a word is singular.
    	   *
    	   * @type {Function}
    	   */
    	  pluralize.isSingular = checkWord(
    	    irregularPlurals, irregularSingles, singularRules
    	  );

    	  /**
    	   * Add a pluralization rule to the collection.
    	   *
    	   * @param {(string|RegExp)} rule
    	   * @param {string}          replacement
    	   */
    	  pluralize.addPluralRule = function (rule, replacement) {
    	    pluralRules.push([sanitizeRule(rule), replacement]);
    	  };

    	  /**
    	   * Add a singularization rule to the collection.
    	   *
    	   * @param {(string|RegExp)} rule
    	   * @param {string}          replacement
    	   */
    	  pluralize.addSingularRule = function (rule, replacement) {
    	    singularRules.push([sanitizeRule(rule), replacement]);
    	  };

    	  /**
    	   * Add an uncountable word rule.
    	   *
    	   * @param {(string|RegExp)} word
    	   */
    	  pluralize.addUncountableRule = function (word) {
    	    if (typeof word === 'string') {
    	      uncountables[word.toLowerCase()] = true;
    	      return;
    	    }

    	    // Set singular and plural references for the word.
    	    pluralize.addPluralRule(word, '$0');
    	    pluralize.addSingularRule(word, '$0');
    	  };

    	  /**
    	   * Add an irregular word definition.
    	   *
    	   * @param {string} single
    	   * @param {string} plural
    	   */
    	  pluralize.addIrregularRule = function (single, plural) {
    	    plural = plural.toLowerCase();
    	    single = single.toLowerCase();

    	    irregularSingles[single] = plural;
    	    irregularPlurals[plural] = single;
    	  };

    	  /**
    	   * Irregular rules.
    	   */
    	  [
    	    // Pronouns.
    	    ['I', 'we'],
    	    ['me', 'us'],
    	    ['he', 'they'],
    	    ['she', 'they'],
    	    ['them', 'them'],
    	    ['myself', 'ourselves'],
    	    ['yourself', 'yourselves'],
    	    ['itself', 'themselves'],
    	    ['herself', 'themselves'],
    	    ['himself', 'themselves'],
    	    ['themself', 'themselves'],
    	    ['is', 'are'],
    	    ['was', 'were'],
    	    ['has', 'have'],
    	    ['this', 'these'],
    	    ['that', 'those'],
    	    // Words ending in with a consonant and `o`.
    	    ['echo', 'echoes'],
    	    ['dingo', 'dingoes'],
    	    ['volcano', 'volcanoes'],
    	    ['tornado', 'tornadoes'],
    	    ['torpedo', 'torpedoes'],
    	    // Ends with `us`.
    	    ['genus', 'genera'],
    	    ['viscus', 'viscera'],
    	    // Ends with `ma`.
    	    ['stigma', 'stigmata'],
    	    ['stoma', 'stomata'],
    	    ['dogma', 'dogmata'],
    	    ['lemma', 'lemmata'],
    	    ['schema', 'schemata'],
    	    ['anathema', 'anathemata'],
    	    // Other irregular rules.
    	    ['ox', 'oxen'],
    	    ['axe', 'axes'],
    	    ['die', 'dice'],
    	    ['yes', 'yeses'],
    	    ['foot', 'feet'],
    	    ['eave', 'eaves'],
    	    ['goose', 'geese'],
    	    ['tooth', 'teeth'],
    	    ['quiz', 'quizzes'],
    	    ['human', 'humans'],
    	    ['proof', 'proofs'],
    	    ['carve', 'carves'],
    	    ['valve', 'valves'],
    	    ['looey', 'looies'],
    	    ['thief', 'thieves'],
    	    ['groove', 'grooves'],
    	    ['pickaxe', 'pickaxes'],
    	    ['passerby', 'passersby']
    	  ].forEach(function (rule) {
    	    return pluralize.addIrregularRule(rule[0], rule[1]);
    	  });

    	  /**
    	   * Pluralization rules.
    	   */
    	  [
    	    [/s?$/i, 's'],
    	    [/[^\u0000-\u007F]$/i, '$0'],
    	    [/([^aeiou]ese)$/i, '$1'],
    	    [/(ax|test)is$/i, '$1es'],
    	    [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
    	    [/(e[mn]u)s?$/i, '$1s'],
    	    [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
    	    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    	    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    	    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    	    [/(her|at|gr)o$/i, '$1oes'],
    	    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    	    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    	    [/sis$/i, 'ses'],
    	    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    	    [/([^aeiouy]|qu)y$/i, '$1ies'],
    	    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    	    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    	    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    	    [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
    	    [/(pe)(?:rson|ople)$/i, '$1ople'],
    	    [/(child)(?:ren)?$/i, '$1ren'],
    	    [/eaux$/i, '$0'],
    	    [/m[ae]n$/i, 'men'],
    	    ['thou', 'you']
    	  ].forEach(function (rule) {
    	    return pluralize.addPluralRule(rule[0], rule[1]);
    	  });

    	  /**
    	   * Singularization rules.
    	   */
    	  [
    	    [/s$/i, ''],
    	    [/(ss)$/i, '$1'],
    	    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    	    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    	    [/ies$/i, 'y'],
    	    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    	    [/\b(mon|smil)ies$/i, '$1ey'],
    	    [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
    	    [/(seraph|cherub)im$/i, '$1'],
    	    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, '$1'],
    	    [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, '$1sis'],
    	    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    	    [/(test)(?:is|es)$/i, '$1is'],
    	    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    	    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    	    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    	    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    	    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    	    [/(matr|append)ices$/i, '$1ix'],
    	    [/(pe)(rson|ople)$/i, '$1rson'],
    	    [/(child)ren$/i, '$1'],
    	    [/(eau)x?$/i, '$1'],
    	    [/men$/i, 'man']
    	  ].forEach(function (rule) {
    	    return pluralize.addSingularRule(rule[0], rule[1]);
    	  });

    	  /**
    	   * Uncountable rules.
    	   */
    	  [
    	    // Singular words with no plurals.
    	    'adulthood',
    	    'advice',
    	    'agenda',
    	    'aid',
    	    'aircraft',
    	    'alcohol',
    	    'ammo',
    	    'analytics',
    	    'anime',
    	    'athletics',
    	    'audio',
    	    'bison',
    	    'blood',
    	    'bream',
    	    'buffalo',
    	    'butter',
    	    'carp',
    	    'cash',
    	    'chassis',
    	    'chess',
    	    'clothing',
    	    'cod',
    	    'commerce',
    	    'cooperation',
    	    'corps',
    	    'debris',
    	    'diabetes',
    	    'digestion',
    	    'elk',
    	    'energy',
    	    'equipment',
    	    'excretion',
    	    'expertise',
    	    'firmware',
    	    'flounder',
    	    'fun',
    	    'gallows',
    	    'garbage',
    	    'graffiti',
    	    'hardware',
    	    'headquarters',
    	    'health',
    	    'herpes',
    	    'highjinks',
    	    'homework',
    	    'housework',
    	    'information',
    	    'jeans',
    	    'justice',
    	    'kudos',
    	    'labour',
    	    'literature',
    	    'machinery',
    	    'mackerel',
    	    'mail',
    	    'media',
    	    'mews',
    	    'moose',
    	    'music',
    	    'mud',
    	    'manga',
    	    'news',
    	    'only',
    	    'personnel',
    	    'pike',
    	    'plankton',
    	    'pliers',
    	    'police',
    	    'pollution',
    	    'premises',
    	    'rain',
    	    'research',
    	    'rice',
    	    'salmon',
    	    'scissors',
    	    'series',
    	    'sewage',
    	    'shambles',
    	    'shrimp',
    	    'software',
    	    'species',
    	    'staff',
    	    'swine',
    	    'tennis',
    	    'traffic',
    	    'transportation',
    	    'trout',
    	    'tuna',
    	    'wealth',
    	    'welfare',
    	    'whiting',
    	    'wildebeest',
    	    'wildlife',
    	    'you',
    	    /pok[eé]mon$/i,
    	    // Regexes.
    	    /[^aeiou]ese$/i, // "chinese", "japanese"
    	    /deer$/i, // "deer", "reindeer"
    	    /fish$/i, // "fish", "blowfish", "angelfish"
    	    /measles$/i,
    	    /o[iu]s$/i, // "carnivorous"
    	    /pox$/i, // "chickpox", "smallpox"
    	    /sheep$/i
    	  ].forEach(pluralize.addUncountableRule);

    	  return pluralize;
    	});
    } (pluralize$1));

    var pluralize = pluralize$1.exports;

    var normalizeStrings = {exports: {}};

    var require$$0 = {
    	"105": "i",
    	"192": "A",
    	"193": "A",
    	"194": "A",
    	"195": "A",
    	"196": "A",
    	"197": "A",
    	"199": "C",
    	"200": "E",
    	"201": "E",
    	"202": "E",
    	"203": "E",
    	"204": "I",
    	"205": "I",
    	"206": "I",
    	"207": "I",
    	"209": "N",
    	"210": "O",
    	"211": "O",
    	"212": "O",
    	"213": "O",
    	"214": "O",
    	"216": "O",
    	"217": "U",
    	"218": "U",
    	"219": "U",
    	"220": "U",
    	"221": "Y",
    	"224": "a",
    	"225": "a",
    	"226": "a",
    	"227": "a",
    	"228": "a",
    	"229": "a",
    	"231": "c",
    	"232": "e",
    	"233": "e",
    	"234": "e",
    	"235": "e",
    	"236": "i",
    	"237": "i",
    	"238": "i",
    	"239": "i",
    	"241": "n",
    	"242": "o",
    	"243": "o",
    	"244": "o",
    	"245": "o",
    	"246": "o",
    	"248": "o",
    	"249": "u",
    	"250": "u",
    	"251": "u",
    	"252": "u",
    	"253": "y",
    	"255": "y",
    	"256": "A",
    	"257": "a",
    	"258": "A",
    	"259": "a",
    	"260": "A",
    	"261": "a",
    	"262": "C",
    	"263": "c",
    	"264": "C",
    	"265": "c",
    	"266": "C",
    	"267": "c",
    	"268": "C",
    	"269": "c",
    	"270": "D",
    	"271": "d",
    	"272": "D",
    	"273": "d",
    	"274": "E",
    	"275": "e",
    	"276": "E",
    	"277": "e",
    	"278": "E",
    	"279": "e",
    	"280": "E",
    	"281": "e",
    	"282": "E",
    	"283": "e",
    	"284": "G",
    	"285": "g",
    	"286": "G",
    	"287": "g",
    	"288": "G",
    	"289": "g",
    	"290": "G",
    	"291": "g",
    	"292": "H",
    	"293": "h",
    	"294": "H",
    	"295": "h",
    	"296": "I",
    	"297": "i",
    	"298": "I",
    	"299": "i",
    	"300": "I",
    	"301": "i",
    	"302": "I",
    	"303": "i",
    	"304": "I",
    	"308": "J",
    	"309": "j",
    	"310": "K",
    	"311": "k",
    	"313": "L",
    	"314": "l",
    	"315": "L",
    	"316": "l",
    	"317": "L",
    	"318": "l",
    	"319": "L",
    	"320": "l",
    	"321": "L",
    	"322": "l",
    	"323": "N",
    	"324": "n",
    	"325": "N",
    	"326": "n",
    	"327": "N",
    	"328": "n",
    	"332": "O",
    	"333": "o",
    	"334": "O",
    	"335": "o",
    	"336": "O",
    	"337": "o",
    	"338": "O",
    	"339": "o",
    	"340": "R",
    	"341": "r",
    	"342": "R",
    	"343": "r",
    	"344": "R",
    	"345": "r",
    	"346": "S",
    	"347": "s",
    	"348": "S",
    	"349": "s",
    	"350": "S",
    	"351": "s",
    	"352": "S",
    	"353": "s",
    	"354": "T",
    	"355": "t",
    	"356": "T",
    	"357": "t",
    	"358": "T",
    	"359": "t",
    	"360": "U",
    	"361": "u",
    	"362": "U",
    	"363": "u",
    	"364": "U",
    	"365": "u",
    	"366": "U",
    	"367": "u",
    	"368": "U",
    	"369": "u",
    	"370": "U",
    	"371": "u",
    	"372": "W",
    	"373": "w",
    	"374": "Y",
    	"375": "y",
    	"376": "Y",
    	"377": "Z",
    	"378": "z",
    	"379": "Z",
    	"380": "z",
    	"381": "Z",
    	"382": "z",
    	"384": "b",
    	"385": "B",
    	"386": "B",
    	"387": "b",
    	"390": "O",
    	"391": "C",
    	"392": "c",
    	"393": "D",
    	"394": "D",
    	"395": "D",
    	"396": "d",
    	"398": "E",
    	"400": "E",
    	"401": "F",
    	"402": "f",
    	"403": "G",
    	"407": "I",
    	"408": "K",
    	"409": "k",
    	"410": "l",
    	"412": "M",
    	"413": "N",
    	"414": "n",
    	"415": "O",
    	"416": "O",
    	"417": "o",
    	"420": "P",
    	"421": "p",
    	"422": "R",
    	"427": "t",
    	"428": "T",
    	"429": "t",
    	"430": "T",
    	"431": "U",
    	"432": "u",
    	"434": "V",
    	"435": "Y",
    	"436": "y",
    	"437": "Z",
    	"438": "z",
    	"461": "A",
    	"462": "a",
    	"463": "I",
    	"464": "i",
    	"465": "O",
    	"466": "o",
    	"467": "U",
    	"468": "u",
    	"477": "e",
    	"484": "G",
    	"485": "g",
    	"486": "G",
    	"487": "g",
    	"488": "K",
    	"489": "k",
    	"490": "O",
    	"491": "o",
    	"500": "G",
    	"501": "g",
    	"504": "N",
    	"505": "n",
    	"512": "A",
    	"513": "a",
    	"514": "A",
    	"515": "a",
    	"516": "E",
    	"517": "e",
    	"518": "E",
    	"519": "e",
    	"520": "I",
    	"521": "i",
    	"522": "I",
    	"523": "i",
    	"524": "O",
    	"525": "o",
    	"526": "O",
    	"527": "o",
    	"528": "R",
    	"529": "r",
    	"530": "R",
    	"531": "r",
    	"532": "U",
    	"533": "u",
    	"534": "U",
    	"535": "u",
    	"536": "S",
    	"537": "s",
    	"538": "T",
    	"539": "t",
    	"542": "H",
    	"543": "h",
    	"544": "N",
    	"545": "d",
    	"548": "Z",
    	"549": "z",
    	"550": "A",
    	"551": "a",
    	"552": "E",
    	"553": "e",
    	"558": "O",
    	"559": "o",
    	"562": "Y",
    	"563": "y",
    	"564": "l",
    	"565": "n",
    	"566": "t",
    	"567": "j",
    	"570": "A",
    	"571": "C",
    	"572": "c",
    	"573": "L",
    	"574": "T",
    	"575": "s",
    	"576": "z",
    	"579": "B",
    	"580": "U",
    	"581": "V",
    	"582": "E",
    	"583": "e",
    	"584": "J",
    	"585": "j",
    	"586": "Q",
    	"587": "q",
    	"588": "R",
    	"589": "r",
    	"590": "Y",
    	"591": "y",
    	"592": "a",
    	"593": "a",
    	"595": "b",
    	"596": "o",
    	"597": "c",
    	"598": "d",
    	"599": "d",
    	"600": "e",
    	"603": "e",
    	"604": "e",
    	"605": "e",
    	"606": "e",
    	"607": "j",
    	"608": "g",
    	"609": "g",
    	"610": "g",
    	"613": "h",
    	"614": "h",
    	"616": "i",
    	"618": "i",
    	"619": "l",
    	"620": "l",
    	"621": "l",
    	"623": "m",
    	"624": "m",
    	"625": "m",
    	"626": "n",
    	"627": "n",
    	"628": "n",
    	"629": "o",
    	"633": "r",
    	"634": "r",
    	"635": "r",
    	"636": "r",
    	"637": "r",
    	"638": "r",
    	"639": "r",
    	"640": "r",
    	"641": "r",
    	"642": "s",
    	"647": "t",
    	"648": "t",
    	"649": "u",
    	"651": "v",
    	"652": "v",
    	"653": "w",
    	"654": "y",
    	"655": "y",
    	"656": "z",
    	"657": "z",
    	"663": "c",
    	"665": "b",
    	"666": "e",
    	"667": "g",
    	"668": "h",
    	"669": "j",
    	"670": "k",
    	"671": "l",
    	"672": "q",
    	"686": "h",
    	"688": "h",
    	"690": "j",
    	"691": "r",
    	"692": "r",
    	"694": "r",
    	"695": "w",
    	"696": "y",
    	"737": "l",
    	"738": "s",
    	"739": "x",
    	"780": "v",
    	"829": "x",
    	"851": "x",
    	"867": "a",
    	"868": "e",
    	"869": "i",
    	"870": "o",
    	"871": "u",
    	"872": "c",
    	"873": "d",
    	"874": "h",
    	"875": "m",
    	"876": "r",
    	"877": "t",
    	"878": "v",
    	"879": "x",
    	"7424": "a",
    	"7427": "b",
    	"7428": "c",
    	"7429": "d",
    	"7431": "e",
    	"7432": "e",
    	"7433": "i",
    	"7434": "j",
    	"7435": "k",
    	"7436": "l",
    	"7437": "m",
    	"7438": "n",
    	"7439": "o",
    	"7440": "o",
    	"7441": "o",
    	"7442": "o",
    	"7443": "o",
    	"7446": "o",
    	"7447": "o",
    	"7448": "p",
    	"7449": "r",
    	"7450": "r",
    	"7451": "t",
    	"7452": "u",
    	"7453": "u",
    	"7454": "u",
    	"7455": "m",
    	"7456": "v",
    	"7457": "w",
    	"7458": "z",
    	"7522": "i",
    	"7523": "r",
    	"7524": "u",
    	"7525": "v",
    	"7680": "A",
    	"7681": "a",
    	"7682": "B",
    	"7683": "b",
    	"7684": "B",
    	"7685": "b",
    	"7686": "B",
    	"7687": "b",
    	"7690": "D",
    	"7691": "d",
    	"7692": "D",
    	"7693": "d",
    	"7694": "D",
    	"7695": "d",
    	"7696": "D",
    	"7697": "d",
    	"7698": "D",
    	"7699": "d",
    	"7704": "E",
    	"7705": "e",
    	"7706": "E",
    	"7707": "e",
    	"7710": "F",
    	"7711": "f",
    	"7712": "G",
    	"7713": "g",
    	"7714": "H",
    	"7715": "h",
    	"7716": "H",
    	"7717": "h",
    	"7718": "H",
    	"7719": "h",
    	"7720": "H",
    	"7721": "h",
    	"7722": "H",
    	"7723": "h",
    	"7724": "I",
    	"7725": "i",
    	"7728": "K",
    	"7729": "k",
    	"7730": "K",
    	"7731": "k",
    	"7732": "K",
    	"7733": "k",
    	"7734": "L",
    	"7735": "l",
    	"7738": "L",
    	"7739": "l",
    	"7740": "L",
    	"7741": "l",
    	"7742": "M",
    	"7743": "m",
    	"7744": "M",
    	"7745": "m",
    	"7746": "M",
    	"7747": "m",
    	"7748": "N",
    	"7749": "n",
    	"7750": "N",
    	"7751": "n",
    	"7752": "N",
    	"7753": "n",
    	"7754": "N",
    	"7755": "n",
    	"7764": "P",
    	"7765": "p",
    	"7766": "P",
    	"7767": "p",
    	"7768": "R",
    	"7769": "r",
    	"7770": "R",
    	"7771": "r",
    	"7774": "R",
    	"7775": "r",
    	"7776": "S",
    	"7777": "s",
    	"7778": "S",
    	"7779": "s",
    	"7786": "T",
    	"7787": "t",
    	"7788": "T",
    	"7789": "t",
    	"7790": "T",
    	"7791": "t",
    	"7792": "T",
    	"7793": "t",
    	"7794": "U",
    	"7795": "u",
    	"7796": "U",
    	"7797": "u",
    	"7798": "U",
    	"7799": "u",
    	"7804": "V",
    	"7805": "v",
    	"7806": "V",
    	"7807": "v",
    	"7808": "W",
    	"7809": "w",
    	"7810": "W",
    	"7811": "w",
    	"7812": "W",
    	"7813": "w",
    	"7814": "W",
    	"7815": "w",
    	"7816": "W",
    	"7817": "w",
    	"7818": "X",
    	"7819": "x",
    	"7820": "X",
    	"7821": "x",
    	"7822": "Y",
    	"7823": "y",
    	"7824": "Z",
    	"7825": "z",
    	"7826": "Z",
    	"7827": "z",
    	"7828": "Z",
    	"7829": "z",
    	"7835": "s",
    	"7840": "A",
    	"7841": "a",
    	"7842": "A",
    	"7843": "a",
    	"7864": "E",
    	"7865": "e",
    	"7866": "E",
    	"7867": "e",
    	"7868": "E",
    	"7869": "e",
    	"7880": "I",
    	"7881": "i",
    	"7882": "I",
    	"7883": "i",
    	"7884": "O",
    	"7885": "o",
    	"7886": "O",
    	"7887": "o",
    	"7908": "U",
    	"7909": "u",
    	"7910": "U",
    	"7911": "u",
    	"7922": "Y",
    	"7923": "y",
    	"7924": "Y",
    	"7925": "y",
    	"7926": "Y",
    	"7927": "y",
    	"7928": "Y",
    	"7929": "y",
    	"8305": "i",
    	"8341": "h",
    	"8342": "k",
    	"8343": "l",
    	"8344": "m",
    	"8345": "n",
    	"8346": "p",
    	"8347": "s",
    	"8348": "t",
    	"8450": "c",
    	"8458": "g",
    	"8459": "h",
    	"8460": "h",
    	"8461": "h",
    	"8464": "i",
    	"8465": "i",
    	"8466": "l",
    	"8467": "l",
    	"8468": "l",
    	"8469": "n",
    	"8472": "p",
    	"8473": "p",
    	"8474": "q",
    	"8475": "r",
    	"8476": "r",
    	"8477": "r",
    	"8484": "z",
    	"8488": "z",
    	"8492": "b",
    	"8493": "c",
    	"8495": "e",
    	"8496": "e",
    	"8497": "f",
    	"8498": "F",
    	"8499": "m",
    	"8500": "o",
    	"8506": "q",
    	"8513": "g",
    	"8514": "l",
    	"8515": "l",
    	"8516": "y",
    	"8517": "d",
    	"8518": "d",
    	"8519": "e",
    	"8520": "i",
    	"8521": "j",
    	"8526": "f",
    	"8579": "C",
    	"8580": "c",
    	"8765": "s",
    	"8766": "s",
    	"8959": "z",
    	"8999": "x",
    	"9746": "x",
    	"9776": "i",
    	"9866": "i",
    	"10005": "x",
    	"10006": "x",
    	"10007": "x",
    	"10008": "x",
    	"10625": "z",
    	"10626": "z",
    	"11362": "L",
    	"11364": "R",
    	"11365": "a",
    	"11366": "t",
    	"11373": "A",
    	"11374": "M",
    	"11375": "A",
    	"11390": "S",
    	"11391": "Z",
    	"19904": "i",
    	"42893": "H",
    	"42922": "H",
    	"42923": "E",
    	"42924": "G",
    	"42925": "L",
    	"42928": "K",
    	"42929": "T",
    	"62937": "x"
    };

    (function (module) {
    	(function(global, factory) {
    	  if (module.exports) {
    	    module.exports = factory(global, global.document);
    	  } else {
    	      global.normalize = factory(global, global.document);
    	  }
    	} (typeof window !== 'undefined' ? window : commonjsGlobal, function (window, document) {
    	  var charmap = require$$0;
    	  var regex = null;
    	  var current_charmap;
    	  var old_charmap;

    	  function normalize(str, custom_charmap) {
    	    old_charmap = current_charmap;
    	    current_charmap = custom_charmap || charmap;

    	    regex = (regex && old_charmap === current_charmap) ? regex : buildRegExp(current_charmap);

    	    return str.replace(regex, function(charToReplace) {
    	      return current_charmap[charToReplace.charCodeAt(0)] || charToReplace;
    	    });
    	  }

    	  function buildRegExp(charmap){
    	     return new RegExp('[' + Object.keys(charmap).map(function(code) {return String.fromCharCode(code); }).join(' ') + ']', 'g');
    	   }

    	  return normalize;
    	}));
    } (normalizeStrings));

    var normalize = normalizeStrings.exports;

    var problematic = {
      abalone: 4,
      abare: 3,
      abbruzzese: 4,
      abed: 2,
      aborigine: 5,
      abruzzese: 4,
      acreage: 3,
      adame: 3,
      adieu: 2,
      adobe: 3,
      anemone: 4,
      anyone: 3,
      apache: 3,
      aphrodite: 4,
      apostrophe: 4,
      ariadne: 4,
      cafe: 2,
      calliope: 4,
      catastrophe: 4,
      chile: 2,
      chloe: 2,
      circe: 2,
      coyote: 3,
      daphne: 2,
      epitome: 4,
      eurydice: 4,
      euterpe: 3,
      every: 2,
      everywhere: 3,
      forever: 3,
      gethsemane: 4,
      guacamole: 4,
      hermione: 4,
      hyperbole: 4,
      jesse: 2,
      jukebox: 2,
      karate: 3,
      machete: 3,
      maybe: 2,
      naive: 2,
      newlywed: 3,
      penelope: 4,
      people: 2,
      persephone: 4,
      phoebe: 2,
      pulse: 1,
      queue: 1,
      recipe: 3,
      riverbed: 3,
      sesame: 3,
      shoreline: 2,
      simile: 3,
      snuffleupagus: 5,
      sometimes: 2,
      syncope: 3,
      tamale: 3,
      waterbed: 3,
      wednesday: 2,
      yosemite: 4,
      zoe: 2
    };

    var own = {}.hasOwnProperty;

    // Two expressions of occurrences which normally would be counted as two
    // syllables, but should be counted as one.
    var EXPRESSION_MONOSYLLABIC_ONE = new RegExp(
      [
        'awe($|d|so)',
        'cia(?:l|$)',
        'tia',
        'cius',
        'cious',
        '[^aeiou]giu',
        '[aeiouy][^aeiouy]ion',
        'iou',
        'sia$',
        'eous$',
        '[oa]gue$',
        '.[^aeiuoycgltdb]{2,}ed$',
        '.ely$',
        '^jua',
        'uai',
        'eau',
        '^busi$',
        '(?:[aeiouy](?:' +
          [
            '[bcfgklmnprsvwxyz]',
            'ch',
            'dg',
            'g[hn]',
            'lch',
            'l[lv]',
            'mm',
            'nch',
            'n[cgn]',
            'r[bcnsv]',
            'squ',
            's[chkls]',
            'th'
          ].join('|') +
          ')ed$)',
        '(?:[aeiouy](?:' +
          [
            '[bdfklmnprstvy]',
            'ch',
            'g[hn]',
            'lch',
            'l[lv]',
            'mm',
            'nch',
            'nn',
            'r[nsv]',
            'squ',
            's[cklst]',
            'th'
          ].join('|') +
          ')es$)'
      ].join('|'),
      'g'
    );

    var EXPRESSION_MONOSYLLABIC_TWO = new RegExp(
      '[aeiouy](?:' +
        [
          '[bcdfgklmnprstvyz]',
          'ch',
          'dg',
          'g[hn]',
          'l[lv]',
          'mm',
          'n[cgns]',
          'r[cnsv]',
          'squ',
          's[cklst]',
          'th'
        ].join('|') +
        ')e$',
      'g'
    );

    // Four expression of occurrences which normally would be counted as one
    // syllable, but should be counted as two.
    var EXPRESSION_DOUBLE_SYLLABIC_ONE = new RegExp(
      '(?:' +
        [
          '([^aeiouy])\\1l',
          '[^aeiouy]ie(?:r|s?t)',
          '[aeiouym]bl',
          'eo',
          'ism',
          'asm',
          'thm',
          'dnt',
          'snt',
          'uity',
          'dea',
          'gean',
          'oa',
          'ua',
          'react?',
          'orbed', // Cancel `'.[^aeiuoycgltdb]{2,}ed$',`
          'shred', // Cancel `'.[^aeiuoycgltdb]{2,}ed$',`
          'eings?',
          '[aeiouy]sh?e[rs]'
        ].join('|') +
        ')$',
      'g'
    );

    var EXPRESSION_DOUBLE_SYLLABIC_TWO = new RegExp(
      [
        'creat(?!u)',
        '[^gq]ua[^auieo]',
        '[aeiou]{3}',
        '^(?:ia|mc|coa[dglx].)',
        '^re(app|es|im|us)',
        '(th|d)eist'
      ].join('|'),
      'g'
    );

    var EXPRESSION_DOUBLE_SYLLABIC_THREE = new RegExp(
      [
        '[^aeiou]y[ae]',
        '[^l]lien',
        'riet',
        'dien',
        'iu',
        'io',
        'ii',
        'uen',
        '[aeilotu]real',
        'real[aeilotu]',
        'iell',
        'eo[^aeiou]',
        '[aeiou]y[aeiou]'
      ].join('|'),
      'g'
    );

    var EXPRESSION_DOUBLE_SYLLABIC_FOUR = /[^s]ia/;

    // Expression to match single syllable pre- and suffixes.
    var EXPRESSION_SINGLE = new RegExp(
      [
        '^(?:' +
          [
            'un',
            'fore',
            'ware',
            'none?',
            'out',
            'post',
            'sub',
            'pre',
            'pro',
            'dis',
            'side',
            'some'
          ].join('|') +
          ')',
        '(?:' +
          [
            'ly',
            'less',
            'some',
            'ful',
            'ers?',
            'ness',
            'cians?',
            'ments?',
            'ettes?',
            'villes?',
            'ships?',
            'sides?',
            'ports?',
            'shires?',
            '[gnst]ion(?:ed|s)?'
          ].join('|') +
          ')$'
      ].join('|'),
      'g'
    );

    // Expression to match double syllable pre- and suffixes.
    var EXPRESSION_DOUBLE = new RegExp(
      [
        '^' +
          '(?:' +
          [
            'above',
            'anti',
            'ante',
            'counter',
            'hyper',
            'afore',
            'agri',
            'infra',
            'intra',
            'inter',
            'over',
            'semi',
            'ultra',
            'under',
            'extra',
            'dia',
            'micro',
            'mega',
            'kilo',
            'pico',
            'nano',
            'macro',
            'somer'
          ].join('|') +
          ')',
        '(?:fully|berry|woman|women|edly|union|((?:[bcdfghjklmnpqrstvwxz])|[aeiou])ye?ing)$'
      ].join('|'),
      'g'
    );

    // Expression to match triple syllable suffixes.
    var EXPRESSION_TRIPLE = /(creations?|ology|ologist|onomy|onomist)$/g;

    // Wrapper to support multiple word-parts (GH-11).
    /**
     * Syllable count
     *
     * @param {string} value
     * @returns {number}
     */
    function syllable(value) {
      var values = normalize(String(value))
        .toLowerCase()
        // Remove apostrophes.
        .replace(/['’]/g, '')
        // Split on word boundaries.
        .split(/\b/g);
      var index = -1;
      var sum = 0;

      while (++index < values.length) {
        // Remove non-alphabetic characters from a given value.
        sum += one(values[index].replace(/[^a-z]/g, ''));
      }

      return sum
    }

    /**
     * Get syllables in a given value.
     *
     * @param {string} value
     * @returns {number}
     */
    function one(value) {
      var count = 0;
      /** @type {number} */
      var index;
      /** @type {string} */
      var singular;
      /** @type {Array.<string>} */
      var parts;
      /** @type {ReturnType.<returnFactory>} */
      var addOne;
      /** @type {ReturnType.<returnFactory>} */
      var subtractOne;

      if (value.length === 0) {
        return count
      }

      // Return early when possible.
      if (value.length < 3) {
        return 1
      }

      // If `value` is a hard to count, it might be in `problematic`.
      if (own.call(problematic, value)) {
        return problematic[value]
      }

      // Additionally, the singular word might be in `problematic`.
      singular = pluralize(value, 1);

      if (own.call(problematic, singular)) {
        return problematic[singular]
      }

      addOne = returnFactory(1);
      subtractOne = returnFactory(-1);

      // Count some prefixes and suffixes, and remove their matched ranges.
      value = value
        .replace(EXPRESSION_TRIPLE, countFactory(3))
        .replace(EXPRESSION_DOUBLE, countFactory(2))
        .replace(EXPRESSION_SINGLE, countFactory(1));

      // Count multiple consonants.
      parts = value.split(/[^aeiouy]+/);
      index = -1;

      while (++index < parts.length) {
        if (parts[index] !== '') {
          count++;
        }
      }

      // Subtract one for occurrences which should be counted as one (but are
      // counted as two).
      value
        .replace(EXPRESSION_MONOSYLLABIC_ONE, subtractOne)
        .replace(EXPRESSION_MONOSYLLABIC_TWO, subtractOne);

      // Add one for occurrences which should be counted as two (but are counted as
      // one).
      value
        .replace(EXPRESSION_DOUBLE_SYLLABIC_ONE, addOne)
        .replace(EXPRESSION_DOUBLE_SYLLABIC_TWO, addOne)
        .replace(EXPRESSION_DOUBLE_SYLLABIC_THREE, addOne)
        .replace(EXPRESSION_DOUBLE_SYLLABIC_FOUR, addOne);

      // Make sure at least on is returned.
      return count || 1

      /**
       * Define scoped counters, to be used in `String#replace()` calls.
       * The scoped counter removes the matched value from the input.
       *
       * @param {number} addition
       */
      function countFactory(addition) {
        return counter
        /**
         * @returns {string}
         */
        function counter() {
          count += addition;
          return ''
        }
      }

      /**
       * This scoped counter does not remove the matched value from the input.
       *
       * @param {number} addition
       */
      function returnFactory(addition) {
        return returner
        /**
         * @param {string} $0
         * @returns {string}
         */
        function returner($0) {
          count += addition;
          return $0
        }
      }
    }

    // Tools to analyse a headline
    var HeadlineEngineLang = /** @class */ (function () {
        function HeadlineEngineLang() {
        }
        HeadlineEngineLang.formatSentence = function (sentence) {
            var s = sentence.replace(/[^a-zA-Z0-9]/g, " ").toLowerCase().trim();
            while (s.includes("  ")) {
                s = s.replace("  ", " ");
            }
            return s;
        };
        HeadlineEngineLang.wordCount = function (sentence) {
            return this.formatSentence(sentence).split(" ").length;
        };
        HeadlineEngineLang.syllableCount = function (sentence) {
            return syllable(this.formatSentence(sentence));
        };
        HeadlineEngineLang.sentenceCount = function (sentence) {
            return (sentence.match(/[^!?.;]+/g) || []).length;
        };
        HeadlineEngineLang.fleschReadingEaseScore = function (sentence) {
            var wordCount = this.wordCount(sentence);
            var sentenceCount = this.sentenceCount(sentence);
            var syllableCount = this.syllableCount(sentence);
            return Math.round(206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllableCount / wordCount));
        };
        HeadlineEngineLang.fleschKincaidGradeLevel = function (sentence) {
            var wordCount = this.wordCount(sentence);
            var sentenceCount = this.sentenceCount(sentence);
            var syllableCount = this.syllableCount(sentence);
            return Math.round(0.39 * (wordCount / sentenceCount) + 11.8 * (syllableCount / wordCount) - 15.59);
        };
        HeadlineEngineLang.letterCount = function (sentence, ignoreSpaces) {
            if (ignoreSpaces === void 0) { ignoreSpaces = false; }
            if (ignoreSpaces) {
                return this.formatSentence(sentence).replace(/ /g, "").length;
            }
            return this.formatSentence(sentence).length;
        };
        return HeadlineEngineLang;
    }());
    // Tests
    function tests() {
        var headlines = [{
                headline: "10 This is a test  -  TITLE",
                formatted: "10 this is a test title",
                letters: 23,
                words: 6,
                sentences: 1,
                syllables: 6,
                fleschReadingEaseScore: 116,
                fleschKincaidGradeLevel: -1
            },
            {
                headline: "Eight years of whistle-blower trauma; former SARS executive Johann van Loggerenberg",
                formatted: "eight years of whistle blower trauma former sars executive johann van loggerenberg",
                letters: 82,
                words: 12,
                sentences: 2,
                syllables: 23,
                fleschReadingEaseScore: 39,
                fleschKincaidGradeLevel: 9
            },
            {
                headline: "This is a multi-sentence test. It has two sentences.",
                formatted: "this is a multi sentence test it has two sentences",
                letters: 50,
                words: 10,
                sentences: 2,
                syllables: 14,
                fleschReadingEaseScore: 83,
                fleschKincaidGradeLevel: 3
            }];
        for (var _i = 0, headlines_1 = headlines; _i < headlines_1.length; _i++) {
            var headline = headlines_1[_i];
            console.assert(HeadlineEngineLang.formatSentence(headline.headline) === headline.formatted, "HeadlineEngineLang.formatSentence failed - expected ".concat(headline.formatted, ", got ").concat(HeadlineEngineLang.formatSentence(headline.headline), " for \"").concat(headline.headline, "\""));
            console.assert(HeadlineEngineLang.wordCount(headline.headline) === headline.words, "HeadlineEngineLang.wordCount failed - expected ".concat(headline.words, ", got ").concat(HeadlineEngineLang.wordCount(headline.headline), " for \"").concat(headline.headline, "\""));
            console.assert(HeadlineEngineLang.syllableCount(headline.headline) === headline.syllables, "HeadlineEngineLang.syllableCount failed - expected ".concat(headline.syllables, ", got ").concat(HeadlineEngineLang.syllableCount(headline.headline), " for \"").concat(headline.headline, "\""));
            console.assert(HeadlineEngineLang.sentenceCount(headline.headline) === headline.sentences, "HeadlineEngineLang.sentenceCount failed - expected ".concat(headline.sentences, ", got ").concat(HeadlineEngineLang.sentenceCount(headline.headline), " for \"").concat(headline.headline, "\""));
            console.assert(HeadlineEngineLang.fleschReadingEaseScore(headline.headline) === headline.fleschReadingEaseScore, "HeadlineEngineLang.fleschReadingEaseScore failed - expected ".concat(headline.fleschReadingEaseScore, ", got ").concat(HeadlineEngineLang.fleschReadingEaseScore(headline.headline), " for \"").concat(headline.headline, "\""));
            console.assert(HeadlineEngineLang.fleschKincaidGradeLevel(headline.headline) === headline.fleschKincaidGradeLevel, "HeadlineEngineLang.fleschKincaidGradeLevel failed - expected ".concat(headline.fleschKincaidGradeLevel, ", got ").concat(HeadlineEngineLang.fleschKincaidGradeLevel(headline.headline), " for \"").concat(headline.headline, "\""));
            console.assert(HeadlineEngineLang.letterCount(headline.headline) === headline.letters, "HeadlineEngineLang.letterCount failed - expected ".concat(headline.letters, ", got ").concat(HeadlineEngineLang.letterCount(headline.headline), " for \"").concat(headline.headline, "\""));
        }
    }
    tests();

    var ReadabiltyScorer$1 = /** @class */ (function () {
        function ReadabiltyScorer() {
            this.readability_range = [headlineengine_readability_range_min || 45, headlineengine_readability_range_max || 90];
            this.readability_target = headlineengine_readability_target || 55;
        }
        ReadabiltyScorer.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        ReadabiltyScorer.prototype.message = function (score) {
            if (score < this.readability_range[0]) {
                return "Too complex, use shorter words (Readability ".concat(score, ")");
            }
            else if (score > this.readability_range[1]) {
                return "Too simple, use longer words (Readability ".concat(score, ")");
            }
            else if (score === this.readability_target) {
                return "Perfect (Readability ".concat(score, ")");
            }
            return "Good (Readability ".concat(score, ")");
        };
        ReadabiltyScorer.prototype.score = function (headline) {
            var ease_score = HeadlineEngineLang.fleschReadingEaseScore(headline);
            var score = calc_total_score(ease_score, this.readability_target, this.readability_range);
            var message = this.message(ease_score);
            var pass = headline.length >= this.readability_range[0] && headline.length <= this.readability_range[1];
            return { name: "Readability", score: score, message: message, pass: pass };
        };
        return ReadabiltyScorer;
    }());

    var WordcountScorer = /** @class */ (function () {
        function WordcountScorer() {
            this.wordcount_range = [headlineengine_wordcount_range_min || 40, headlineengine_wordcount_range_max || 90];
            this.wordcount_target = headlineengine_wordcount_target || 82;
        }
        WordcountScorer.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        WordcountScorer.prototype.message = function (wordcount) {
            if (wordcount < this.wordcount_range[0]) {
                return "Too short, add ".concat(this.wordcount_range[0] - wordcount, " word").concat(this.wordcount_range[0] - wordcount > 1 ? "s" : "");
            }
            else if (wordcount > this.wordcount_range[1]) {
                return "Too long, remove ".concat(wordcount - this.wordcount_range[1], " word").concat(this.wordcount_range[0] - wordcount > 1 ? "s" : "");
            }
            else if (wordcount === this.wordcount_target) {
                return "Perfect (".concat(wordcount, " words)");
            }
            return "Good (".concat(wordcount, " words)");
        };
        WordcountScorer.prototype.score = function (headline) {
            var word_count = headline.replace(/-/g, ' ').trim().split(/\s+/g).length;
            var score = calc_total_score(word_count, this.wordcount_target, this.wordcount_range);
            var message = this.message(word_count);
            var pass = word_count >= this.wordcount_range[0] && word_count <= this.wordcount_range[1];
            return { name: "Word Count", score: score, message: message, pass: pass };
        };
        WordcountScorer.prototype.test = function () {
            var headline = "   This   is\n a test-headline    ---";
            var score = this.score(headline);
            return (score.score === 5);
        };
        return WordcountScorer;
    }());

    var ReadabiltyScorer = /** @class */ (function () {
        function ReadabiltyScorer() {
            this.reading_grade_range = [headlineengine_reading_grade_range_min || 45, headlineengine_reading_grade_range_max || 90];
            this.reading_grade_target = headlineengine_reading_grade_target || 55;
        }
        ReadabiltyScorer.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        ReadabiltyScorer.prototype.message = function (score) {
            if (score < this.reading_grade_range[0]) {
                return "Too simple, use more complex words (Grade ".concat(score, ")");
            }
            else if (score > this.reading_grade_range[1]) {
                return "Too complex, use less complex words (Grade ".concat(score, ")");
            }
            else if (score === this.reading_grade_target) {
                return "Perfect (Grade ".concat(score, ")");
            }
            return "Good (Grade ".concat(score, ")");
        };
        ReadabiltyScorer.prototype.score = function (headline) {
            var ease_score = HeadlineEngineLang.fleschKincaidGradeLevel(headline);
            var score = calc_total_score(ease_score, this.reading_grade_target, this.reading_grade_range);
            var message = this.message(ease_score);
            var pass = headline.length >= this.reading_grade_range[0] && headline.length <= this.reading_grade_range[1];
            return { name: "Reading Grade", score: score, message: message, pass: pass };
        };
        return ReadabiltyScorer;
    }());

    var Calc_Score = /** @class */ (function () {
        function Calc_Score() {
            this.scorers = [];
            this.initialized = false;
        }
        Calc_Score.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var powerwords, lettercount, readability, reading_grade, wordcount, _i, _a, scorer;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (headlineengine_powerwords_enable) {
                                powerwords = new PowerWordsScorer();
                                this.scorers.push(powerwords);
                            }
                            if (headlineengine_length_enable) {
                                lettercount = new LetterCountScorer();
                                this.scorers.push(lettercount);
                            }
                            if (headlineengine_readability_enable) {
                                readability = new ReadabiltyScorer$1();
                                this.scorers.push(readability);
                            }
                            if (headlineengine_reading_grade_enable) {
                                reading_grade = new ReadabiltyScorer();
                                this.scorers.push(reading_grade);
                            }
                            if (headlineengine_wordcount_enable) {
                                wordcount = new WordcountScorer();
                                this.scorers.push(wordcount);
                            }
                            _i = 0, _a = this.scorers;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            scorer = _a[_i];
                            return [4 /*yield*/, scorer.init()];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            this.initialized = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        Calc_Score.prototype.score = function (headline) {
            return __awaiter(this, void 0, void 0, function () {
                var scores, total_score;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this.initialized) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.init()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, Promise.all(this.scorers.map(function (s) { return s.score(headline); }))];
                        case 3:
                            scores = _a.sent();
                            total_score = scores.reduce(function (acc, curr) { return acc + curr.score; }, 0) / scores.length;
                            return [2 /*return*/, { scores: scores, total_score: total_score }];
                    }
                });
            });
        };
        return Calc_Score;
    }());
    // tests();
    // export default calc_score;

    var ajax = {};

    Object.defineProperty(ajax, "__esModule", { value: true });
    ajax.apiPut = ajax.apiDelete = ajax.apiGet = apiPost_1 = ajax.apiPost = void 0;
    function handleError(response) {
        if (!response.ok) {
            const status = response.status;
            const message = response.responseJSON?.message || response.statusText || response.responseText || response;
            const code = response.responseJSON?.code || response.code || "";
            return { status, code, message };
        }
        return response;
    }
    function apiPost(path, data, headers = {}) {
        return new Promise((resolve, reject) => {
            wp.apiRequest({
                path,
                data,
                type: "POST",
                headers
            })
                .done(async (response) => {
                if (response.error) {
                    reject(response);
                }
                resolve(response);
            })
                .fail(async (response) => {
                reject(handleError(response));
            });
        });
    }
    var apiPost_1 = ajax.apiPost = apiPost;
    function apiGet(path, headers = {}) {
        return new Promise((resolve, reject) => {
            wp.apiRequest({
                path,
                type: "GET",
                headers
            })
                .done(async (response) => {
                if (response.error) {
                    reject(response);
                }
                resolve(response);
            })
                .fail(async (response) => {
                reject(handleError(response));
            });
        });
    }
    ajax.apiGet = apiGet;
    function apiDelete(path, headers = {}) {
        return new Promise((resolve, reject) => {
            wp.apiRequest({
                path,
                type: "DELETE",
                headers
            })
                .done(async (response) => {
                if (response.error) {
                    reject(response);
                }
                resolve(response);
            })
                .fail(async (response) => {
                reject(handleError(response));
            });
        });
    }
    ajax.apiDelete = apiDelete;
    function apiPut(path, data, headers = {}) {
        return new Promise((resolve, reject) => {
            wp.apiRequest({
                path,
                data,
                type: "PUT",
                headers
            })
                .done(async (response) => {
                if (response.error) {
                    reject(response);
                }
                resolve(response);
            })
                .fail(async (response) => {
                reject(handleError(response));
            });
        });
    }
    ajax.apiPut = apiPut;

    function strip_tags(html) {
        let tmp = document.createElement("div");
        tmp.innerHTML = html
            .replace(/(<(br[^>]*)>)/ig, '\n')
            .replace(/(<(p[^>]*)>)/ig, '\n')
            .replace(/(<(div[^>]*)>)/ig, '\n')
            .replace(/(<(h[1-6][^>]*)>)/ig, '\n')
            .replace(/(<(li[^>]*)>)/ig, '\n')
            .replace(/(<(ul[^>]*)>)/ig, '\n')
            .replace(/(<(ol[^>]*)>)/ig, '\n')
            .replace(/(<(blockquote[^>]*)>)/ig, '\n')
            .replace(/(<(pre[^>]*)>)/ig, '\n')
            .replace(/(<(hr[^>]*)>)/ig, '\n')
            .replace(/(<(table[^>]*)>)/ig, '\n')
            .replace(/(<(tr[^>]*)>)/ig, '\n')
            .replace(/(<(td[^>]*)>)/ig, '\n')
            .replace(/(<(th[^>]*)>)/ig, '\n')
            .replace(/(<(caption[^>]*)>)/ig, '\n')
            .replace(/(<(dl[^>]*)>)/ig, '\n')
            .replace(/(<(dt[^>]*)>)/ig, '\n')
            .replace(/(<(dd[^>]*)>)/ig, '\n')
            .replace(/(<(address[^>]*)>)/ig, '\n')
            .replace(/(<(section[^>]*)>)/ig, '\n')
            .replace(/(<(article[^>]*)>)/ig, '\n')
            .replace(/(<(aside[^>]*)>)/ig, '\n');
        return tmp.textContent || tmp.innerText || "";
    }

    function get_content() {
        if (jQuery("#titlewrap").length) { // Classic editor
            console.log("Classic editor");
            if (jQuery(".wp-editor-area").is(":visible")) { // The code editor is visible
                console.log("Code editor");
                return jQuery(".wp-editor-area").val();
            } else if (window.tinymce) { // The visual editor is visible
                console.log("TinyMCE editor");
                let content = tinymce.editors.content.getContent();
                if (content.length > 0) {
                    return content;
                }
            }
            return jQuery("#content").val(); // Last try...
        } else { // Gutenberg editor
            return wp.data.select("core/editor").getEditedPostContent();
        }
    }

    class HeadlineEngineSuggest extends EventTarget {
        constructor() {
            super();
            console.log("HeadlineEngineSuggest");
        }

        button() {
            const suggestButton = document.createElement('button');
            suggestButton.innerText = 'Suggest';
            suggestButton.addEventListener('click', this.suggest.bind(this));

            return suggestButton;
        }

        emit(event, data) {
            const eventObj = new CustomEvent(event, { detail: data });
            console.log("Emitting event", eventObj);
            this.dispatchEvent(eventObj);
        }

        async suggest(e) {
            e.preventDefault();
            const content = strip_tags(get_content());
            this.emit("start", content);
            if (!content.length) {
                this.emit("error", "Nothing to summarise yet...");
                return;
            }
            try {
                const data = {
                    content: content,
                    type: "headline"
                };
                const response = await apiPost_1("headlineengine/v1/suggest", data);
                // console.log(response)
                this.emit("success", response);
            } catch (error) {
                console.error(error);
                this.emit("error", error);
            }
        }


    }

    jQuery(async () => {
        const calc_score = new Calc_Score();

        // Variables
        let editor_type = "gututenberg";
        let title_descriptor = null;
        let title;

        // Elements
        const headline_engine_container_el = jQuery("<div id='headlineengine-container'></div>");
        const headline_score_container_el = jQuery("<div id='headlineengine-score-container'></div>");
        headline_engine_container_el.append(headline_score_container_el);
        const score_analisys_container_el = jQuery(`<div class="headlineengine-analysis"></div>`);
        headline_score_container_el.append(score_analisys_container_el);

        function detectEditor() {
            if (jQuery("#titlewrap").length) {
                return "classic";
            }
            return "gutenberg";
        }

        function getTitle() {
            if (detectEditor() === "classic") {
                return jQuery("#title").val();
            }
            return wp.data.select("core/editor").getEditedPostAttribute("title");
        }

        function calculateColour(score) {
            let colour_grey = [179, 179, 179];
            let colour_green = [31, 120, 31];
            let rscale = LinearScale([0, 1], [colour_grey[0], colour_green[0]]);
            let gscale = LinearScale([0, 1], [colour_grey[1], colour_green[1]]);
            let bscale = LinearScale([0, 1], [colour_grey[2], colour_green[2]]);
            return [rscale(score), gscale(score), bscale(score)];
        }

        function empty() {
            headline_score_container_el.html("");
            score_analisys_container_el.html("");
            headline_score_container_el.append(score_analisys_container_el);
        }

        async function displayAnalysis() {
            const title = getTitle();
            if (!title || !title.trim().length) {
                empty();
                return false;
            }
            const scores = await calc_score.score(title);
            console.log(scores);
            let colour = calculateColour(scores.total_score);
            const score_el = jQuery(`
        <div class='headlineengine-score' style="background-color: rgba(${colour.join(", ")}, 0.6)">
            <div class='headlineengine-score-value'>${Math.floor(scores.total_score * 100)}<div class='headlineengine-divisor'>100</div></div>
            <div class='headlineengine-score-title'>HeadlineEngine<br>Score</div>
        </div>`);
            headline_score_container_el.html(score_el);
            score_analisys_container_el.empty();
            for (let score of scores.scores) {
                const score_el = jQuery(`<div>${score.name}: ${score.message}</div>`);

                score_analisys_container_el.append(score_el);
            }
            headline_engine_container_el.append(score_analisys_container_el);
            return true;
        }

        function suggest(container) {
            const suggest = new HeadlineEngineSuggest();
            const suggestButton = document.createElement('button');
            const resultsContainer = document.createElement('div');
            resultsContainer.classList.add("headlineengine-suggest-results");
            resultsContainer.style.display = "block";
            suggestButton.innerText = 'Suggest';
            suggestButton.classList.add("headlineengine-suggest-button");
            suggestButton.addEventListener('click', suggest.suggest.bind(suggest));
            suggest.addEventListener("start", function () {
                suggestButton.disabled = true;
                suggestButton.innerText = "Suggesting...";
            });
            suggest.addEventListener("success", async function (e) {
                const calc_score = new Calc_Score();
                calc_score.init();
                const response = e.detail;
                resultsContainer.innerHTML = "";
                for (let headline of response) {
                    const score = await calc_score.score(headline);
                    const suggestedHeadlineEl = document.createElement("div");
                    suggestedHeadlineEl.classList.add("headlineengine-suggest-result");
                    const scoreEl = document.createElement("span");
                    scoreEl.classList.add("headlineengine-suggest-result-score");
                    scoreEl.innerText = Math.round(score.total_score * 100);
                    suggestedHeadlineEl.innerText = headline;
                    suggestedHeadlineEl.prepend(scoreEl);
                    suggestedHeadlineEl.addEventListener("click", async function () {
                        console.log({ title, title_descriptor, headline });
                        if (editor_type === "classic") {
                            jQuery(title_descriptor).val(headline);
                        } else {
                            wp.data.dispatch('core/editor').editPost({ title: headline });
                        }
                        resultsContainer.style.display = "none";
                        jQuery(container).trigger("headline-updated");
                        empty();
                        displayAnalysis();
                    });
                    resultsContainer.append(suggestedHeadlineEl);
                }
                suggestButton.disabled = false;
                suggestButton.innerText = "Suggest";
                // Close when we click outside
                jQuery(document).on("click", function (e) {
                    resultsContainer.style.display = "none";
                    jQuery(document).off("click");
                });
                resultsContainer.style.display = "block";
            });
            suggest.addEventListener("error", function (e) {
                suggestButton.disabled = false;
                suggestButton.innerText = "Suggest";
                const error = e.detail;
                alert(error.message || "An error occurred. Please try again.");
            });
            container.append(suggestButton);
            resultsContainer.style.display = "none";
            // container.append(resultsContainer);
            jQuery(container).prepend(resultsContainer);
        }

        async function init() {
            await calc_score.init();
            if (jQuery("#titlewrap").length) {
                editor_type = "classic";
            }
            title_descriptor = ".editor-post-title__input";
            let titlewrap_descriptor = ".edit-post-visual-editor__post-title-wrapper";
            if (editor_type === "classic") { // Looks like classic editor
                title_descriptor = "#title";
                titlewrap_descriptor = "#titlewrap";
            }
            if (!jQuery(title_descriptor)) {
                console.log("Could not find title descriptor");
                return; // Could not find title element
            }
            let title_descriptor_el = jQuery(title_descriptor);
            while (!title_descriptor_el.length) {
                await new Promise(resolve => setTimeout(resolve, 200));
                title_descriptor_el = jQuery(title_descriptor);
            }
            const titlewrap_el = jQuery(titlewrap_descriptor);
            titlewrap_el.after(headline_engine_container_el);
            await displayAnalysis();
            suggest(headline_engine_container_el);
            // Listen for changes in the title
            if (editor_type === "classic") {
                title_descriptor_el.on("keypress", async function (e) {
                    const new_title = jQuery(title_descriptor).val();
                    if (new_title !== title) {
                        title = new_title;
                        await displayAnalysis();
                    }
                });
                jQuery(title_descriptor).on("change", async function () {
                    await displayAnalysis();
                });
            } else {
                wp.data.subscribe(() => {
                    const new_title = wp.data.select("core/editor").getEditedPostAttribute("title");
                    if (new_title !== title) {
                        title = new_title;
                        displayAnalysis();
                    }
                });
            }
        }

        await init();
    });

})();
//# sourceMappingURL=headlineengine-gutenberg.js.map
