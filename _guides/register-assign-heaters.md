---
title: Register & Assign Heaters
audience: [installer]
audience_order: {installer: 60}
order: 60
summary: Scan each Focal heater into its slot so the app layout matches the physical rail, then confirm every heater responds.
version: "1.2"
updated: "2026-07-28"
---

## On this page

* [Before you start](#before-you-start)
* [Assign each heater to its slot](#assign-each-heater-to-its-slot)
* [Confirm every assignment](#confirm-every-assignment)
* [Final checks](#final-checks)
* [Install complete](#install-complete)

## Before you start

Registering and assigning heaters allows staff to control heaters individually from the Focal Control page. 

You need:

* A mobile phone with internet and a camera.
* The restaurant's Focal Control page URL and password provided by Focal.
* Every heater already seated in its rail slot and powered on.

{% include warn.html text="The software layout must match reality. If a heater is assigned to the wrong slot, staff will turn on the wrong heater and think the system is broken." %}

## Assign each heater to its slot

{% include step.html number="1" title="Open the restaurant's Focal control page and review the map" body="Sign in with the URL and password from Focal. The restaurant map shows how the zones are laid out relative to the street and the patio entrance. Get oriented here before you start scanning, so you know which zone you are standing in." diagram="reg-01-map.png" %}

{% include step.html number="2" title="Open Assign Devices" body="Tap the menu icon in the top left and choose Assign Devices." diagram="reg-02-nav.png" %}

{% include step.html number="3" title="Find the empty slots" body="Assign Devices shows every zone, rail, and slot that has already been created for this restaurant. A slot marked with an X has no heater assigned to it yet." diagram="reg-03-empty-slot.png" %}

{% include step.html number="4" title="Tap the slot you are standing under" body="Tap the slot you're standing under. The panel below reads No Heater Assigned to Rail, with a field for the QR link, serial number, or MAC address." diagram="reg-04-empty-slot-selected.png" %}

{% include step.html number="5" title="Scan that heater's QR tag" body="Tap the camera icon and allow camera access if your phone asks. Point the camera at the QR tag on the heater in that slot (the round tag labeled SCAN TO HEAT). Once it reads, tap Save Heater Assignment." diagram="reg-05-scan.png" %}

{% include step.html number="6" title="Repeat until all heaters are assigned" body="Work along the rail slot by slot, then move to the next zone. When you are done, all slots should have a heater assigned." %}

## Confirm every assignment

After assigning every heater, it's critical to confirm each heater was assigned to the correct slot so that right heater turns on when commanded.

{% include step.html number="1" title="Go to Heater Control" body="Open the menu in the top left and choose Heater Control." %}

{% include step.html number="2" title="Tap the first slot" body="Tap the first slot on the zone map. It highlights, and the heater's serial number and status appear below with heat level controls at 0." diagram="reg-06-heater-selected.png" %}

{% include step.html number="3" title="Set a non-zero heat level" body="Tap 1, 2, or 3. Look up at the heater in that slot: its LEDs should change to match the level you picked, and it should start putting out heat. If a different heater responds, the wrong heater was assigned to the slot. Go back to Assign Devices and correct the assignment." diagram="reg-07-heater-hot.png" %}

{% include step.html number="4" title="Work through every heater, then shut them off" body="Repeat for each slot in each zone. Tap "Turn off all heaters" to set every heater level back to 0 before you leave." %}

## Final checks

{% include checklist.html items="No slot in any zone still shows an X | Each heater is assigned to the slot it physically sits in | Every heater responded at a non-zero level with LEDs matching | Every heater set back to 0 before leaving site" %}

## Install complete

That's the last step of the install. Walk the restaurant through [Heater Control]({{ site.baseurl }}/heater-control/) before you go, so staff can run the system themselves.

If anything won't come online or behaves oddly, see [Troubleshooting]({{ site.baseurl }}/troubleshooting/). For service, replacements, or full specifications, see [Warranty & Support]({{ site.baseurl }}/warranty-support/).
