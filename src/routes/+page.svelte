<script>
    import Headlineengine from "../components/headlineengine.svelte";
</script>

<div class="container">
    <h1>HeadlineEngine Playground</h1>
    <p>
        This is a playground for the HeadlineEngine plugin. You can use this
        page to test the plugin's functionality.
    </p>
    <div id="poststuff">
        <div id="post-body" class="metabox-holder columns-2">
            <div id="post-body-content" style="position: relative;">
                <div id="titlediv">
                    <div id="titlewrap">
                        <label
                            class="screen-reader-text"
                            id="title-prompt-text"
                            for="title">Headline</label
                        >
                        <input
                            type="text"
                            name="post_title"
                            size="30"
                            value="Score this headline"
                            id="title"
                            spellcheck="true"
                            autocomplete="off"
                        />
                    </div>
                </div>
                <Headlineengine />
                <!-- /titlediv -->
                <div id="postdivrich" class="postarea wp-editor-expand">
                    <div
                        id="wp-content-wrap"
                        class="wp-core-ui wp-editor-wrap tmce-active has-dfw"
                        style="padding-top: 55px;"
                    >
                        <div
                            id="wp-content-editor-container"
                            class="wp-editor-container"
                        >
                            <textarea
                                class="wp-editor-area"
                                style="width: 100%; height: 300px; margin-top: 37px;"
                                autocomplete="off"
                                cols="40"
                                name="content"
                                id="content"
                                >&lt;span style="font-weight: 400;"&gt;The bond,
                                posted on Monday with a Manhattan appeals court,
                                prevents enforcement of a $454-million penalty
                                levied by a judge against the property mogul in
                                February for lying about his assets for years to get
                                better loan terms. Trump, who is campaigning to
                                return to the White House in the November election,
                                is still on the hook for the full amount — plus
                                millions in interest — if his appeal
                                fails.&nbsp;&lt;/span&gt; &lt;span
                                style="font-weight: 400;"&gt;Trump initially had
                                struggled to get a bond because he was required to
                                put up 120% of the full penalty, or more than half a
                                billion dollars, in cash. But the appeals court on
                                25 March granted his request for a smaller bond,
                                which Trump claimed was a sign the appeals court
                                would eventually overturn the verdict.&lt;/span&gt;
                                &lt;span style="font-weight: 400;"&gt;“As promised,
                                President Trump has posted bond,” his lawyer Alina
                                Habba said in a statement. “He looks forward to
                                vindicating his rights on appeal and overturning
                                this unjust verdict.”&lt;/span&gt; &lt;span
                                style="font-weight: 400;"&gt;The bond was arranged
                                and signed by Los Angeles-based Knight Specialty
                                Insurance Co., a relatively small player in the
                                industry whose chairman Don Hankey built a fortune
                                by expanding his car dealership company into
                                financial services. Trump previously turned to
                                Chubb’s Federal Insurance Co. for an
                                &lt;/span&gt;&lt;a
                                href="https://www.bloomberg.com/news/articles/2024-03-08/trump-seeks-court-approval-of-91-6-million-bond-over-carroll"&gt;&lt;span
                                style="font-weight: 400;"&gt;appeal
                                bond&lt;/span&gt;&lt;/a&gt;&lt;span
                                style="font-weight: 400;"&gt; to cover an
                                $83.3-million verdict against him in writer E. Jean
                                Carroll’s defamation lawsuit, which he lost in
                                January.&nbsp;&lt;/span&gt; &lt;span
                                style="font-weight: 400;"&gt;The former president
                                had said a full bond was “&lt;/span&gt;&lt;a
                                href="https://www.bloomberg.com/news/articles/2024-03-18/trump-says-posting-454-million-bond-a-practical-impossibility"&gt;&lt;span
                                style="font-weight:
                                400;"&gt;unattainable&lt;/span&gt;&lt;/a&gt;&lt;span
                                style="font-weight: 400;"&gt;” because 30 insurance
                                companies that arrange such bonds wouldn’t take his
                                property as collateral and would only take cash.
                                Trump recently said he had nearly $500-million in
                                cash and vowed to cover the reduced bond with
                                it.&lt;/span&gt; &lt;span style="font-weight:
                                400;"&gt;New York Attorney General Letitia James,
                                who sued Trump and won at a non-jury trial, had
                                argued a full bond was necessary because Trump can’t
                                be trusted to pay the fine if he loses the
                                appeal.&lt;/span&gt; &lt;span style="font-weight:
                                400;"&gt;Getting the smaller bond helped Trump
                                overcome one the biggest financial obstacles of his
                                career. Without it, the former president claimed
                                he’d be forced to hold a “fire sale” of assets to
                                raise cash, hurting his ability to run his company
                                and contribute to his campaign. His losses from such
                                sales would be irreversible, he argued, even if he
                                won the appeal.&nbsp;&lt;/span&gt; &lt;span
                                style="font-weight: 400;"&gt;James, a Democrat, had
                                said she would seize his assets to cover the
                                judgment if he didn’t arrange the bond. Her office
                                had &lt;/span&gt;&lt;a
                                href="https://www.bloomberg.com/news/articles/2024-03-21/ny-poised-to-seize-trump-westchester-assets-if-fraud-fine-unpaid"&gt;&lt;span
                                style="font-weight: 400;"&gt;already
                                begun&lt;/span&gt;&lt;/a&gt;&lt;span
                                style="font-weight: 400;"&gt; laying the groundwork
                                to do so in nearby Westchester County, where Trump
                                owns a golf course and an estate called Seven
                                Springs.&lt;/span&gt; &lt;span style="font-weight:
                                400;"&gt;Trump also faces four criminal
                                prosecutions, including two cases alleging he
                                conspired to overturn the result of the 2020
                                presidential election. His &lt;/span&gt;&lt;a
                                href="https://www.bloomberg.com/news/articles/2024-03-25/trump-s-first-criminal-trial-set-to-start-april-15-in-new-york"&gt;&lt;span
                                style="font-weight: 400;"&gt;first criminal
                                trial&lt;/span&gt;&lt;/a&gt;&lt;span
                                style="font-weight: 400;"&gt;, over charges he
                                falsified business records to conceal a hush money
                                payment to a porn star before the 2016 election, is
                                set to go to trial on 15 April in
                                Manhattan.&lt;/span&gt; &lt;span style="font-weight:
                                400;"&gt;Trump denies wrongdoing in all the cases
                                and claims without evidence that they’re part of a
                                Democratic-led “witch hunt” against him to undermine
                                his campaign.&lt;/span&gt;</textarea
                            >
                        </div>
                    </div>
                </div>
            </div>
            <!-- /post-body-content -->
        </div>
        <!-- /post-body -->
    </div>
</div>

<style>
    .container {
        margin: 20px;
    }
</style>