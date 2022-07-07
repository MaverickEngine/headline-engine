import "./headlineengine-gutenberg.scss";
import calc_score from "./headlineengine-score";

const title_descriptor = ".wp-block-post-title";

async function main() {
    async function display_analysis(container) {
        const title = jQuery(title_descriptor)[0].innerText;
        if (!title) {
            container.html("");
            return;
        }
        const score = await calc_score(title);
        const score_el = jQuery(`
        <div class='headlineengine-score headlineengine-score-${score.rating}'>
            <div class='headlineengine-score-value headlineengine-score-value-${score.rating}'>${ Math.floor(score.total_score * 100) }</div>
            <div class='headlineengine-score-title'>HeadlineEngine<br>Score</div>
        </div>`);
        const analysis = jQuery(`<div class="headlineengine-analysis">
            <div class="headlineengine-analysis-readability">Readability: ${score.readability.message} (${Math.round(score.readability.ease_score)})</div>
            <div class="headlineengine-analysis-length">Length: ${score.length.message} (${score.length.length})</div>
            <div class="headlineengine-analysis-powerwords">Powerwords: ${(score.powerwords.words.length) ? score.powerwords.words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(", ") : "None" }</div>
        </div>`);
        container.html(score_el);
        container.append(analysis);
    }
    jQuery(async () => {
        // wait for title_descriptor to be loaded
        let title_descriptor_el = jQuery(title_descriptor);
        while (!title_descriptor_el.length) {
            await new Promise(resolve => setTimeout(resolve, 200));
            title_descriptor_el = jQuery(title_descriptor);
        }
        const titlewrap_el = jQuery(".edit-post-visual-editor__post-title-wrapper");
        const headline_score_container_el = jQuery("<div id='headlineengine-score-container'></div>");
        titlewrap_el.after(headline_score_container_el);
        headline_score_container_el.hide();
        display_analysis(headline_score_container_el);
        jQuery(title_descriptor).on("keyup", function(e) {
            display_analysis(headline_score_container_el);
        })
        jQuery(title_descriptor).on("focus", function(e) {
            headline_score_container_el.stop().stop();
            display_analysis(headline_score_container_el);
            headline_score_container_el.slideDown();
        })
        jQuery(title_descriptor).on("blur", function(e) {
            headline_score_container_el.delay(1000).slideUp();
        })
    });
}

main();