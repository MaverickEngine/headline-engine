require("./headlineengine-post-style.scss");
require("wordsmith-js/dist/wordsmith.min.js");
async function main() {
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

    const headlineengine_powerwords_list = await jQuery.get(headlineengine_powerwords_api).catch(err => {
        console.log("Could not load powerwords list");
    });
    const powerword_list = headlineengine_powerwords_list.map(w => w.toLowerCase());
    jQuery(async () => {
        
        const titlewrap_el = jQuery("#titlewrap");
        // const ab_el = jQuery("<input type='button' class='button' value='A/B' id='headlineengine-main-title-ab' />");
        // titlewrap_el.append(ab_el);
        const headline_score_container_el = jQuery("<div id='headlineengine-score-container'></div>");
        titlewrap_el.after(headline_score_container_el);
        display_analysis(headline_score_container_el);
        jQuery("#title").on("keyup", function(e) {
            display_analysis(headline_score_container_el);
        })
    });
    
}

main();