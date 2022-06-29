var headlineengine_post = (function () {
	'use strict';

	var headlineenginePost = {};

	function commonjsRequire(path) {
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}

	!function e(n,t,r){function o(i,a){if(!t[i]){if(!n[i]){var l="function"==typeof commonjsRequire&&commonjsRequire;if(!a&&l)return l(i,!0);if(u)return u(i,!0);var s=new Error("Cannot find module '"+i+"'");throw s.code="MODULE_NOT_FOUND",s}var f=t[i]={exports:{}};n[i][0].call(f.exports,function(e){var t=n[i][1][e];return o(t?t:e)},f,f.exports,e,n,t,r);}return t[i].exports}for(var u="function"==typeof commonjsRequire&&commonjsRequire,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,n,t){function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),u=function(){function e(){r(this,e);}return o(e,null,[{key:"fleschKincaidGradeLevel",value:function(e){var n=this.wordCount(e),t=this.sentenceCount(e),r=this.syllableCount(e);return .39*(n/t)+11.8*(r/n)-15.59}},{key:"fleschReadingEaseScore",value:function(e){var n=this.wordCount(e),t=this.sentenceCount(e),r=this.syllableCount(e);return 206.835-1.015*(n/t)-84.6*(r/n)}},{key:"sentenceCount",value:function(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:/[\.?!]/,t=[],r=e.split(n),o=r.length-1;o>=0;o--){var u=r[o].trim();""!=u&&t.push(u);}return t.length}},{key:"syllableCount",value:function(e){if("string"!=typeof e&&!(e instanceof Array))return null;e instanceof Array&&(e=e.join(" "));for(var n=this.getWords(e),t=0,r=n.length-1;r>=0;r--)t+=this.wordSyllableCount(n[r]);return t}},{key:"wordSyllableCount",value:function(e){var n=void 0;return e=e.toLowerCase(),e.length<=3?1:(e=e.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,""),e=e.replace(/^y/,""),n=e.match(/[aeiouy]{1,2}/g),n?n.length:0)}},{key:"wordCount",value:function(e){return this.getWords(e).length}},{key:"getWords",value:function(e){e=this.removePunctuation(e);for(var n=[],t=void 0,r=e.split(" "),o=0;o<r.length;o++)t=r[o].trim(),""!=t&&n.push(t);return n}},{key:"removePunctuation",value:function(e){return e.replace(/[^a-zA-z ]/g,"")}}]),e}();t.default=u;},{}],2:[function(e,n,t){function r(e){return e&&e.__esModule?e:{default:e}}var o=e("./models/wordsmith"),u=r(o);window.Wordsmith=u.default;},{"./models/wordsmith":1}]},{},[2]);

	const powerword_list = headlineengine_powerwords_list.split("\n").map(w => w.toLowerCase());
	const readable_range = [headlineengine_readability_range_min || 45, headlineengine_readability_range_max || 90];
	const readable_range_min = readable_range[0];
	const readable_range_max = readable_range[1];
	const readability_messages = ["Good", "Too Simple", "Too Complex"];
	const length_range = [headlineengine_length_range_min || 40, headlineengine_length_range_max || 90];
	const length_messages = ["Good", "Too Short", "Too Long"];

	function readability(title) {
	    if (!title) return;
	    const score = Wordsmith.fleschReadingEaseScore(title);
	    let rating = 0;
	    if (score < readable_range_min) {
	        rating = 2;
	    } else if (score > readable_range_max) {
	        rating = 1;
	    }
	    return {rating, score, message: readability_messages[rating], pass: score >= readable_range_min && score <= readable_range_max };
	}

	function length(title) {
	    if (!title) return;
	    const length = title.length;
	    let rating = 0;
	    if (length < length_range[0]) {
	        rating = 1;
	    } else if (length > length_range[1]) {
	        rating = 2;
	    }
	    return { rating, length, message: length_messages[rating], pass: length >= length_range[0] && length <= length_range[1] };
	}

	function powerwords(title) {
	    if (!title) return;
	    title = title.toLowerCase().replace(/[^a-z]/g, " ");
	    const words = title.split(" ").filter(w => w.length > 3);
	    const powerwords_found = words.filter(w => powerword_list.includes(w));
	    return { rating: powerwords_found.length, words: powerwords_found, pass: powerwords_found.length > 0 };
	}

	function display_analysis(container) {
	    const title = jQuery("#title").val();
	    if (!title) {
	        container.html("");
	        return;
	    }
	    const length_result = length(title);
	    const readability_result = readability(title);
	    const powerwords_result = powerwords(title);
	    const score = length_result.pass + readability_result.pass + powerwords_result.pass;
	    const rating = score >= 3 ? "good" : score >= 1 ? "okay" : "bad";
	    const score_el = jQuery(`
    <div class='headlineengine-score'>
        <div class='headlineengine-score-value headlineengine-score-value-${rating}'>${ Math.floor(score / 3 * 100) }</div>
        <div class='headlineengine-score-title'>HeadlineEngine<br>Score</div>
    </div>`);
	    const analysis = jQuery(`<div class="headlineengine-analysis">
        <div class="headlineengine-analysis-readability">Readability: ${readability_result.message} (${Math.round(readability_result.score)})</div>
        <div class="headlineengine-analysis-length">Length: ${length_result.message} (${length_result.length})</div>
        <div class="headlineengine-analysis-powerwords">Powerwords: ${(powerwords_result.words.length) ? powerwords_result.words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(", ") : "None" }</div>
    </div>`);
	    container.html(score_el);
	    container.append(analysis);
	}

	async function main() {
	    jQuery(() => {
	        const titlewrap_el = jQuery("#titlewrap");
	        // const ab_el = jQuery("<input type='button' class='button' value='A/B' id='headlineengine-main-title-ab' />");
	        // titlewrap_el.append(ab_el);
	        const headline_score_container_el = jQuery("<div id='headlineengine-score-container'></div>");
	        titlewrap_el.after(headline_score_container_el);
	        display_analysis(headline_score_container_el);
	        jQuery("#title").on("keyup", function(e) {
	            display_analysis(headline_score_container_el);
	        });
	    });
	    
	}

	main();

	return headlineenginePost;

})();
//# sourceMappingURL=headlineengine-post.js.map
