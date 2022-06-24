(function () {
    'use strict';

    jQuery("#headlineengine_load_powerwords").click(async function() {
        const powerword_list = await (await fetch(headlineengine_powerwords_url)).text();
        console.log(powerword_list);
        jQuery("#headlineengine_powerwords_list").val(powerword_list);
    });

})();
//# sourceMappingURL=headlineengine-admin.js.map
