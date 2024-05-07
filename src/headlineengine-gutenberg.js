import "./headlineengine-gutenberg.scss";
import Calc_Score from "./headlineengine-score.ts";
import LinearScale from "linear-scale";
import { HeadlineEngineSuggest } from "./headlineengine-suggest.js";

jQuery(async () => {
    // Constants
    const autoHide = false;
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
        let colour = calculateColour(scores.total_score);
        const score_el = jQuery(`
        <div class='headlineengine-score' style="background-color: rgba(${ colour.join(", ")}, 0.6)">
            <div class='headlineengine-score-value'>${ Math.floor(scores.total_score * 100) }<div class='headlineengine-divisor'>100</div></div>
            <div class='headlineengine-score-title'>HeadlineEngine<br>Score</div>
        </div>`);
        headline_score_container_el.html(score_el);
        for (let score of scores.scores) {
            const score_el = jQuery(`<div>${score.name}: ${score.message}</div>`);
            score_analisys_container_el.append(score_el);
        }
        return true;
    }

    function suggest(container) {
        const suggest = new HeadlineEngineSuggest();
        const suggestButton = document.createElement('button');
        const resultsContainer = document.createElement('div');
        resultsContainer.classList.add("headlineengine-suggest-results");
        resultsContainer.style.display = autoHide ? "none" : "block";
        suggestButton.innerText = 'Suggest';
        suggestButton.classList.add("headlineengine-suggest-button");
        suggestButton.addEventListener('click', suggest.suggest.bind(suggest));
        suggest.addEventListener("start", function() {
            suggestButton.disabled = true;
            suggestButton.innerText = "Suggesting...";
        });
        suggest.addEventListener("success", async function(e) {
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
                suggestedHeadlineEl.addEventListener("click", function() {
                    if (editor_type === "classic") {
                        jQuery(title_descriptor).val(headline);
                    } else {
                        wp.data.dispatch('core/editor').editPost({ title: headline });
                    }
                    resultsContainer.style.display = "none";
                    jQuery(container).trigger("headline-updated");
                });
                resultsContainer.append(suggestedHeadlineEl);
            }
            suggestButton.disabled = false;
            suggestButton.innerText = "Suggest";
            // Close when we click outside
            jQuery(document).on("click", function(e) {
                resultsContainer.style.display = "none";
                jQuery(document).off("click");
            });
            resultsContainer.style.display = "block";
        });
        suggest.addEventListener("error", function(e) {
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
        suggest(headline_engine_container_el);
        await displayAnalysis();
        // Listen for changes in the title
        if (editor_type === "classic") {
            title_descriptor_el.on("keypress", async function(e) {
                const new_title = jQuery(title_descriptor).val();
                if (new_title !== title) {
                    title = new_title;
                    await displayAnalysis();
                }
            })
            jQuery(title_descriptor).on("change", async function() {
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

    jQuery(headline_engine_container_el).on("headline-updated", async function() {
        await displayAnalysis();
    });
    
    await init();
});