---
title: Register & Assign Heaters
audience: [installer]
audience_order: {installer: 60}
order: 60
summary: Assign each Focal heater to its slot by scanning its QR code, then confirm every heater responds. Done from your phone on site.
version: "1.1"
updated: "2025-11-13"
---

## On this page
- [Before you start](#before-you-start)
- [Open the waitstaff page](#open-the-waitstaff-page)
- [Assign each heater](#assign-each-heater)
- [Confirm every heater](#confirm-every-heater)
- [Final checks](#final-checks)

## Before you start

{% include dodont.html do="Use your phone — you scan each heater's QR code with the camera, so a phone on site is by far the easiest." dont="Try to do this on a laptop. It's possible, but without a camera at the rail it's much harder. We strongly recommend a phone." %}

The goal is to match the software layout to the physical layout: every slot in the app should map to the real heater sitting in that spot on the rail.

## Open the waitstaff page

{% include step.html number="1" title="Go to your restaurant's page" body="Open https://focalheat.net/waitstaff/[your-restaurant]/overview/ — Focal provides your restaurant's URL and password. (In this guide the example is 'democafe'.)" %}

{% include step.html number="2" title="Review the restaurant map" body="The map shows where each zone sits, so you know which physical area each zone covers before you assign anything." diagram="reg-01-map.svg" %}

{% include step.html number="3" title="Open Assign Devices" body="Tap the menu in the top-left, then tap Assign Devices." diagram="reg-02-nav.svg" %}

## Assign each heater

Assign Devices shows every zone, rail, and slot already created for your space. A slot marked with an X has no heater assigned yet.

{% include step.html number="4" title="Tap an empty slot" body="Tap a slot marked with an X. The panel below shows 'No Heater Assigned to Rail' with a field to scan or enter the heater." diagram="reg-03-empty-slot.svg" %}

{% include step.html number="5" title="Scan the heater's QR code" body="Tap the camera icon and allow camera access if prompted. Point it at the QR code on the pendant of the heater physically in that slot — it reads 'Scan to Heat.'" diagram="reg-04-scan.svg" %}

{% include step.html number="6" title="Save the assignment" body="Tap Save Heater Assignment. The slot's X is replaced with the heater. Repeat for every slot until none are left empty." %}

{% include warn.html text="Always scan the heater that physically sits in the slot you tapped. Assigning the wrong heater to a slot is the most common setup mistake and makes every later control confusing." %}

## Confirm every heater

Now verify each assignment is correct by turning heaters on one at a time.

{% include step.html number="7" title="Go to Heater Control" body="Open the menu and tap Heater Control to return to the zone map." %}

{% include step.html number="8" title="Turn on each heater" body="Tap a slot on the zone map, then choose a non-zero heat level (1–3). Watch that the correct physical heater's LEDs come on and it starts heating." diagram="reg-05-confirm.svg" %}

{% include step.html number="9" title="Repeat for all heaters" body="Work through every slot the same way. If the heater that lights up isn't the one in that spot, the assignment is wrong — go back to Assign Devices and re-scan that slot." %}

## Final checks

{% include checklist.html items="No slots left empty (no X marks) in any zone | Every heater assigned to the slot it physically sits in | Each heater lights up and heats when its slot is turned on | Zone map matches the real layout on the rail" %}
