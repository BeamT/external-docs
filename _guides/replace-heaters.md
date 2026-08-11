---
title: Replace a Heater
audience: [customer]
audience_order: {customer: 25}
order: 70
summary: Swap a failed heater and assign the new heater to its slot.
version: "1.0"
updated: "2026-08-11"
---

## On this page

- [Before you start](#before-you-start)
- [Remove the old heater](#remove-the-old-heater)
- [Install the new heater](#install-the-new-heater)
- [Close up the rail](#close-up-the-rail)
- [Reassign the slot](#reassign-the-slot)
- [Confirm the new heater](#confirm-the-new-heater)
- [Final checks](#final-checks)

## Before you start

This covers swapping a failed or damaged heater for a replacement on a rail that is already installed and running. You remove the old heater, install the new one and then assign the new heater to the slot on the Focal Control page.

The software map has to keep matching the rail layout. Before you move anything, note which slot the failed heater sits in and the order of the heaters between it and the open end of the rail. Any heater you slide off has to go back to the same slot, or its controls will point at the wrong unit. 

You need:

{% include checklist.html items="The replacement heater | A phone with a camera and internet | The restaurant's Focal Control URL and password from Focal | A 2mm hex wrench for the rail end cap (depending on rail generation)" %}

{% include dodont.html do="Handle each heater by its body, keeping the emitters and grille clear." dont="Grab or set a unit down on the grille or reflector." %}

{% include warn.html text="Switch the rail off at its switch and let the old heater cool before you touch it." %}

## Remove the old heater

{% include step.html number="1" title="Open the rail end" body="Loosen the bumper screw and slide the bumper toward the center of the rail. Remove the end cap screws and take off the end cap, keeping one hand on it so it doesn't fall. Remove the spacers and set them aside." %}

{% include step.html number="2" title="Take out the old heater" body="If other heaters or spacers sit between the open end and the failed one, take them off first. To remove a heater, pull its string down firmly and then slide it off the rail. Lay them out in the order they came off so each goes back to the same slot. Remove the failed heater the same way and set it aside to return to Focal." %}

## Install the new heater

{% include step.html number="1" title="Unbox and orient the new heater" body="Take the replacement out of its box. It only slides on in one orientation, so line it up before pushing it onto the rail. Remove the rest of the packaging once it has started onto the rail." %}

{% include step.html number="2" title="Slide it on until it seats" body="Slide the heater along the rail and push until it seats." %}

{% include step.html number="3" title="Untie the pull string and remove the clip" body="The replacement ships with its pull string tied off and a shipping clip in place. Untie the string and remove the clip." %}

{% include step.html number="4" title="Move it to the old heater's slot" body="Pull the string down firmly until it releases, then slide the new heater to the exact slot the old one came out of. Let go of the string and it will lock in place." %}

{% include step.html number="5" title="Put the other heaters back the way they were" body="Slide the heaters you removed back into their original slots, in the same order, with one spacer between each pair. Since they return to the same slots, their assignments stay correct. Only the new heater needs assigning." %}

## Close up the rail

{% include step.html number="1" title="Reinstall the end cap and bumper" body="Slide the bumper clear, refit the end cap and its screws, then slide the bumper back over and tighten its screw. Do not overtighten the bumper screw." %}

## Reassign the slot

The old heater's slot in Focal Control still points at the unit you just removed, so you need to point it at the new heater. Leave every other slot alone. Those heaters went back where they were, so their assignments are still right.

{% include warn.html text="The software layout must match the rail. If the slot points at the wrong heater, staff will turn on the wrong unit and think the system is broken." %}

{% include step.html number="1" title="Open the Focal Control page" body="Sign in with the URL and password from Focal. On the zone map, find the slot the old heater came out of." diagram="reg-01-map.png" %}

{% include step.html number="2" title="Open Assign Devices" body="Tap the menu icon in the top left and choose Assign Devices." diagram="reg-02-nav.png" %}

{% include step.html number="3" title="Select the old heater's slot" body="Tap the slot the old heater came out of. The panel below shows the heater still assigned to it, which is the old unit's serial." %}

{% include step.html number="4" title="Scan the new heater's QR tag" body="Tap the camera icon and allow camera access if your phone asks. Point the camera at the QR tag on the new heater, the round tag labeled SCAN TO HEAT. Once it reads, tap Save Heater Assignment to point the slot at the new heater." diagram="reg-05-scan.png" %}

## Confirm the new heater

{% include step.html number="1" title="Go to Heater Control" body="Open the menu in the top left and choose Heater Control." %}

{% include step.html number="2" title="Tap the slot and set a heat level" body="Tap the slot you just reassigned, then tap 1, 2, or 3. Look up at the new heater. Its LEDs should change to match the level you picked and it should start putting out heat. If a different heater responds, go back to Assign Devices and fix the assignment." diagram="reg-07-heater-hot.png" %}

{% include step.html number="3" title="Turn it back off" body="Tap 'Turn off all heaters' so nothing is left running before you go." %}

## Final checks

{% include checklist.html items="The new heater sits in the same slot the old one came out of | Every other heater is back in its original slot with a spacer between each pair | The reassigned slot commands the new heater and no other | End cap screwed on and bumper in place" %}

Send the old heater back to Focal using the return steps in [Warranty & Support]({{ site.baseurl }}/warranty-support/). If the new heater won't come online or the wrong unit responds, see [Troubleshooting]({{ site.baseurl }}/troubleshooting/).

