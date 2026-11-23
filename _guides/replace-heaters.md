---
title: Replace Heaters
audience: []
audience_order: {}
order: 70
summary: Swap one or more failed heaters on a Rail and assign the new heaters to their slots.
version: "1.3"
updated: "2026-11-16"
---

## On this page

- [Before you start](#before-you-start)
- [Watch the video](#watch-the-video)
- [Open the Rail end](#open-the-rail-end)
- [Remove the old heaters](#remove-the-old-heaters)
- [Install the new heaters](#install-the-new-heaters)
- [Close up the Rail](#close-up-the-rail)
- [Reassign the slots](#reassign-the-slots)
- [Confirm the new heaters](#confirm-the-new-heaters)
- [Final checks](#final-checks)

## Before you start

This covers swapping one or more failed or damaged heaters for replacements on a Rail that is already installed and running. You remove the old heaters, install the new ones and then assign each new heater to its slot in the Focal Control app. If you are replacing several heaters on the Rail, do each step for every heater you are swapping.

{% include diagram.html src="duo-00-parts.png" caption="The opening end of the Rail, left to right: end cap, bumper, a heater, a spacer, a second heater and the Rail. Heaters and spacers come off in this order, so lay them out the same way." %}

{% include warn.html text="Note which slot each failed heater is in. Put every heater you keep back in its same slot, so the slots in Focal Control still match the Rail. The exception is a full-rail swap, where every heater on the Rail is new and the order doesn't matter." %}

You need:

{% include checklist.html items="The replacement heater(s) | A phone with a camera and internet | The restaurant's Focal Control app link and password from Focal | A 2 mm hex wrench for the bumper and end cap screws" %}

{% include dodont.html do="Handle each heater by its body, keeping the emitters and grille clear." dont="Grab or set a unit down on the grille or reflector." %}

{% include warn.html text="Let the old heaters cool before you touch them." %}

## Watch the video

Watch the full video once before you start. Refer to the step-by-step written instructions below.

{% include video.html id="swap-video" src="replace-heaters.mp4" poster="replace-heaters-poster.jpg" qr="replace-heaters-qr.svg" caption="Swapping a heater, start to finish" %}

## Open the Rail end

{% include step.html number="1" title="Find the opening end" body="Work at the opening end of the Rail, opposite the cord-exit end. This is the end with the removable end cap (orange)." diagram="duo-01-open-end.png" %}

{% include step.html number="2" title="Loosen and slide the bumper" body="Look up at the underside of the Rail." captions="Loosen the bumper screw with a 2 mm hex wrench.|Slide the bumper toward the center to uncover the two end cap screws." diagram="duo-01-bumper-screw.png,duo-01-bumper-slid.png" %}

{% include step.html number="3" title="Remove the end cap" captions="Remove the two end cap screws with the 2 mm hex wrench, keeping one hand on the end cap so it doesn't fall.|Take off the end cap." diagram="duo-02-endcap-screws.png,duo-02-endcap-off.png" %}

## Remove the old heaters

{% include step.html number="1" title="Remove the bumper" body="Slide the bumper off the opening end of the Rail." diagram="duo-03-remove-bumper.png" %}

{% include step.html number="2" title="Slide off heaters until the failed ones are out" body="Pull each heater's string down firmly and slide it off, then the spacer behind it. Keep going until the failed heater farthest from the opening end is off. Lay everything out in the order it came off, and set the failed heaters aside to return to Focal." diagram="duo-04-remove-heater.png" %}

## Install the new heaters

Work slot by slot, from the farthest slot toward the opening end. For a slot getting a new heater, do steps 1 to 4. For a slot keeping its old heater, do step 5. Put one spacer between each pair of heaters, none after the last one.

{% include step.html number="1" title="Unbox the new heater" body="Take a replacement out of its box. Leave the rest of the packaging on until the heater is started onto the Rail." %}

{% include step.html number="2" title="Orient the heater" body="Heaters slide on from the opening end of the Rail. The heater only fits one way: hold it with the pull string on the trailing side, away from the Rail." diagram="duo-04-orient-string.png" %}

{% include step.html number="3" title="Confirm the lug is down" body="The lug (the round power connector on top of the riser) must be down for the heater to slide onto the Rail. A new heater ships with a small plastic clip holding the lug down. It slides off by itself as the heater goes onto the Rail. If there's no clip and the lug is up, pull the pull string down until the lug drops." diagram="duo-05-lug-down.png" %}

{% include step.html number="4" title="Slide on and move to a failed heater's slot" body="Slide the heater onto the Rail and remove the rest of the packaging. Pull the string down firmly to release the heater, slide it to the slot a failed heater came out of, and let go. It locks in and its LEDs light. If another heater goes on after this one, slide a spacer on next." diagram="duo-06-inserted.png" %}

{% include step.html number="5" title="Put the heaters you are keeping back the way they were" body="When you reach a slot whose heater you are keeping, slide that heater back on, in the same order it came off. If another heater goes on after it, slide a spacer on next. Since they return to the same slots, their assignments stay correct. Only the new heaters need assigning." %}

## Close up the Rail

{% include step.html number="1" title="Reinstall the bumper and end cap" captions="Slide the bumper on and push it clear of the end.|Refit the end cap.|Refit the two end cap screws.|Slide the bumper back against the end cap and tighten its screw (don't overtighten)." diagram="duo-08-bumper-on.png,duo-08-endcap-on.png,duo-02-endcap-screws.png,duo-01-bumper-screw.png" grid="true" %}

## Reassign the slots

Each swapped slot in the Focal Control app still points at the unit you removed, so you need to point it at the new heater. If every heater you kept went back in the same order it came off, leave those slots alone, since their assignments are still right. If you mixed up the order, reassign every slot on that Rail the same way, so each slot points at the heater actually sitting in it.

If you replaced every heater on the Rail, the order doesn't matter. Assign each new heater to any slot on the Rail, as long as each slot points at the heater actually sitting in it.

A new heater has to be powered before the app can assign it. Its orange and purple LEDs should be lit, which means it is getting power. If they are dark, see "No power or lights" in [Troubleshooting]({{ site.baseurl }}/troubleshooting/#no-power-or-lights).

{% include warn.html text="The software layout must match the Rail. If the slot points at the wrong heater, staff will turn on the wrong unit and think the system is broken." %}

{% include step.html number="1" title="Open the Focal Control app and review the map" body="Sign in with the link and password from Focal. The restaurant map shows how the zones are laid out relative to the street and the patio entrance. Get oriented here before you start scanning, so you know which zone you are standing in." diagram="reg-01-map.png" %}

{% include step.html number="2" title="Open Assign Devices" body="Tap the menu icon in the top left and choose Assign Devices." diagram="reg-02-nav.png" %}

{% include step.html number="3" title="Select a swapped slot and tap Replace Heater" body="Tap a slot a failed heater came out of. Each heater shows on the map as two squares, one per heating head; tap either one. The panel below shows the old heater's serial number. Since you've already removed it from the Rail, it's expected that it says Heater is offline. Tap Replace Heater, then tap the camera icon next to the field that opens and allow camera access if your phone asks." diagram="rep-02-replace.png" %}

{% include step.html number="4" title="Scan the new heater's QR code" body="Point the camera at the QR code on the new heater sitting in that slot: the round SCAN TO HEAT tag on the end of its pull string. The field fills in with the heater's code once it reads." diagram="reg-05-scan.png" %}

{% include step.html number="5" title="Tap Save Heater Assignment" body="Tap Save Heater Assignment. The slot doesn't point at the new heater until you save, so don't skip this." diagram="rep-03-save.png" %}

{% include step.html number="6" title="Repeat for each swapped slot" body="Select the next swapped slot and repeat steps 3 to 5 until every new heater is assigned." %}

## Confirm the new heaters

{% include step.html number="1" title="Go to Heater Control" body="Open the menu in the top left and choose Heater Control." diagram="reg-02-nav.png" %}

{% include step.html number="2" title="Tap a slot and set a heat level" body="Tap a slot you just reassigned, then tap 1, 2, or 3 for either head. Look up at the new heater. Its LEDs should change to match the level you picked and it should start putting out heat. If a different heater responds, go back to Assign Devices and fix the assignment. Repeat for each slot you reassigned." diagram="reg-07-heater-hot.png" %}

{% include step.html number="3" title="Turn them back off" body="Tap 0 on each heater you tested so nothing is left running before you go." %}

## Final checks

{% include checklist.html items="Each new heater is in a slot an old one came out of | Every heater you kept is back in its original slot | Each reassigned slot commands the new heater sitting in it and no other | There is a spacer between each pair of heaters | Bumper back on the Rail, end cap screwed on, and bumper screw tightened" %}

If a new heater won't come online or the wrong unit responds, see [Troubleshooting]({{ site.baseurl }}/troubleshooting/).