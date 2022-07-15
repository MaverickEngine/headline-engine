import LinearScale from "linear-scale";
import lang from "./headlineengine-lang";

let powerword_list = null;

function calc_total_score(curr, target, range) {
    const min = Math.min(range[0], range[1]);
    const max = Math.max(range[0], range[1]);
    if (curr < min || curr > max) return 0;
    if (curr === target) return 1;
    let local_range;
    let local_curr;
    if (curr < target) {
        local_range = [0, target - min];
        local_curr = curr - min;
    } else {
        local_range = [max - target, 0];
        local_curr = curr - target;
    }
    const scale = LinearScale(local_range, [0, 1]);
    console.log({curr, target, range, local_range, local_curr, scale: scale(local_curr)});
    return scale(local_curr);
}

async function get_powerwords() {
    if (powerword_list) return powerword_list; // Cached?
    const headlineengine_powerwords_list = await jQuery.get(headlineengine_powerwords_api).catch(err => {
        console.log("Could not load powerwords list");
        return [];
    });
    return headlineengine_powerwords_list.map(w => w.toLowerCase());
}

async function calc_score(headline) {
    powerword_list = await get_powerwords();
    const readable_range = [headlineengine_readability_range_min || 45, headlineengine_readability_range_max || 90];
    const readable_target = headlineengine_readability_target || 55;
    const readable_range_min = readable_range[0];
    const readable_range_max = readable_range[1];
    const readability_messages = ["Good", "Too Simple", "Too Complex"];
    const length_range = [headlineengine_length_range_min || 40, headlineengine_length_range_max || 90];
    const length_target = headlineengine_length_target || 82;
    const length_messages = ["Good", "Too Short", "Too Long"];

    function readability(title) {
        if (!title) return;
        const ease_score = lang.fleschReadingEaseScore(title);
        let rating = 0;
        if (ease_score < readable_range_min) {
            rating = 2;
        } else if (ease_score > readable_range_max) {
            rating = 1;
        }
        const score = calc_total_score(ease_score, readable_target, readable_range);
        return {ease_score, score, rating, ease_score, message: readability_messages[rating], pass: ease_score >= readable_range_min && ease_score <= readable_range_max };
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
        const score = calc_total_score(length, length_target, length_range);
        return { score, rating, length, message: length_messages[rating], pass: length >= length_range[0] && length <= length_range[1] };
    }

    function powerwords(title) {
        if (!title) return;
        title = title.toLowerCase().replace(/[^a-z]/g, " ");
        const words = title.split(" ").filter(w => w.length > 3);
        const powerwords_found = words.filter(w => powerword_list.includes(w));
        const score = powerwords_found.length ? 1 : 0;
        return { score, rating: powerwords_found.length, words: powerwords_found, pass: powerwords_found.length > 0 };
    }
    
    const length_result = length(headline);
    const readability_result = readability(headline);
    const powerwords_result = powerwords(headline);
    const passes = length_result.pass + readability_result.pass + powerwords_result.pass;
    const rating = passes >= 3 ? "good" : passes >= 1 ? "okay" : "bad";
    const total_score = (length_result.score + readability_result.score + powerwords_result.score) / 3;
    return {
        length: length_result,
        readability: readability_result,
        powerwords: powerwords_result,
        total_score,
        rating
    };
}

// Tests
async function tests() {
    const scores = [
        {
            val: 50,
            target: 50,
            range: [0, 100],
            expected: 1
        },
        {
            val: 50,
            target: 25,
            range: [0, 50],
            expected: 0
        },
        {
            val: 50,
            target: 50,
            range: [50, 100],
            expected: 1
        },
        {
            val: 75,
            target: 50,
            range: [0, 100],
            expected: 0.5
        }
    ];
    scores.forEach(score => {
        console.assert(calc_total_score(score.val, score.target, score.range) === score.expected, `calc_total_score(${score.val}, ${score.target}, [${score.range[0]}, ${score.range[1]}]) !== ${score.expected}; ${calc_total_score(score.val, score.target, score.range)}`);
    });
    // const tests = [
    //     {
    //         headline: "Eight years of whistle-blower trauma; former SARS executive Johann van Loggerenberg",
    //         length: { score: 1, rating: "good", length: 19, message: "Good", pass: true },
    //         readability: { score: 1, rating: "good", ease_score: 55, message: "Good", pass: true },
    //         powerwords: { score: 1, rating: 1, words: ["this", "is", "a", "test", "headline"], pass: true }
    //     },
    //     {
    //         headline: "This is a test headline",
    //         length: { score: 1, rating: "good", length: 19, message: "Good", pass: true },
    //         readability: { score: 1, rating: "good", ease_score: 55, message: "Good", pass: true },
    //         powerwords: { score: 1, rating: 1, words: ["this", "is", "a", "test", "headline"], pass: true }
    //     }
    // ];
    // tests.forEach(async test => {
    //     const result = await calc_score(test.headline);
    //     console.log(result);
    // }
    // );
}
tests();

export default calc_score;