=== HeadlineEngine ===
Contributors: jasonny
Tags: headline, title, readability
Requires at least: 
Tested up to: 6.0
Stable tag: 0.1.1
Requires PHP: 7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

What makes a good headline? Get instant headline analysis based on readability, length, and powerwords. 

== Description ==

HeadlineEngine is part of a suite of tools for news publishers, built by [MavEngine](https://mavengine.com), a division of [Daily Maverick](https://dailymaverick.co.za). 

It analyses your headline as you type it and provides a score, based on the readability (how complex it is), length (how long it is), and powerwords (how many words it contains).

_Note: This plugin only works in the Classic Editor. We will have a version for Gutenberg soon._

== Features ==

= Readability =

We use the [Flesch Kincaid](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests) formula to calculate readability. A good range of not too complex or too simple would be between 45 and 90. This is configurable in the system.

= Length =

You should aim for a letter count in the low-80s, which is about 12 words. We recommend between 40 and 90 characters. This is configurable in the system.

= Powerwords =

Powerwords are emotional words. You can set your own, or use the words from [RankMath](https://rankmath.com/blog/power-words/).

== Screenshots ==

1. HeadlineEngine in the Gutenberg editor.
2. HeadlineEngine in the Classic editor.
3. Customise settings to suit your audience.

== Changelog ==

= 0.1.1 =
* Fix bug affecting new posts in Gutenberg
* Be a bit stricter about showing the score if there is no headline

= 0.1.0 =
* Gutenberg Block Editor support
* Remove unnecessary code

= 0.0.3 =
* The scoring is now more nuanced
* We have a target length and target readability
* We made a bunch of fixes suggested by Wordpress

= 0.0.2 =
* We have changed how we insert the element into the editor, to avoid fighting with other plugins.
* The score title has been changed from "Headline Score" to "HeadlineEngine Score".
* The score was made a bit smaller (40px from 60px).
* Readme.txt has been brought into the main project.

= 0.0.1 =
* Initial release