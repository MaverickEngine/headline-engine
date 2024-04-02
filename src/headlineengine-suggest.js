import { apiPost } from "wp-ajax";

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
        console.log("Classic editor")
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
        return wp.data.select( "core/editor" ).getEditedPostContent();
    }
}

export class HeadlineEngineSuggest extends EventTarget {
    constructor() {
        super();
        console.log("HeadlineEngineSuggest")
    }

    button() {
        const suggestButton = document.createElement('button');
        suggestButton.innerText = 'Suggest';
        suggestButton.addEventListener('click', this.suggest.bind(this));
        
        return suggestButton;
    }

    emit(event, data) {
        const eventObj = new CustomEvent(event, { detail: data });
        console.log("Emitting event", eventObj)
        this.dispatchEvent(eventObj);
    }

    async suggest(e) {
        e.preventDefault();
        const content = strip_tags(get_content());
        this.emit("start", content);
        if (!content.length) {
            this.emit("error", "Nothing to summarise yet...")
            return;
        }
        try {
            const data = {
                content: content,
                type: "headline"
            };
            const response = await apiPost("headlineengine/v1/suggest", data);
            console.log(response)
            this.emit("success", response);
        } catch (error) {
            console.error(error);
            this.emit("error", error);
        }
    }

    
}