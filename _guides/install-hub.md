---
title: Install Hub
audience: [installer]
audience_order: {installer: 30}
order: 20
summary: Mount the Focal Hub, plug it in, and connect it to WiFi if needed.
version: "2.2"
updated: "2026-10-21"
---

## On this page
- [Before you start](#before-you-start)
- [Where to mount it](#where-to-mount-it)
- [Steps](#steps)
- [Final checks](#final-checks)

## Before you start

The Focal Hub is the heaters' link to the internet. It lets guests turn on heat with the QR code, lets staff control heaters from the Focal Control app, and runs schedules. If it loses its signal, all of that stops working, so placement matters.

Some Hubs arrive already configured for the restaurant's WiFi. Others you configure on site, which takes a couple of minutes from your phone. Your install prep email from Focal says which one you have.

You need:

- **The Focal Hub and its power cord**
- **The site plan**, which marks the Hub Location
- **If the Hub isn't configured yet:** a phone, plus the restaurant's WiFi network name and password (Focal sends these with your install prep email)

The restaurant should already have checked that their WiFi meets the [WiFi Requirements]({{ site.baseurl }}/wifi-requirements/) where the Hub goes.

## Where to mount it

If the site plan marks a Hub Location, mount the Hub there. If that spot won't work, mount it as close to it as you can, since that's where the restaurant tested their WiFi.

If there's no Hub Location, or nothing workable nearby, follow the location guidelines in [WiFi Requirements]({{ site.baseurl }}/wifi-requirements/#requirements): covered, near a standard outlet, in line of sight and within 50 ft of the heaters.

The Hub talks wirelessly to the heaters and, unless there's a network cable, to the restaurant's WiFi. Wherever you mount it:

- The Hub needs a clear line of sight to every heater, with no walls in between.
- Between the Hub and the restaurant's router, the fewer walls the better. WiFi passes through clear glass. Brick, concrete, stone, metal and tinted or energy-efficient (low-E) glass block it.

{% include dodont.html do="Mount it up high and in the open, with a clear view of the heaters." dont="Tuck it behind a wall, metal or ductwork, or near metal shelving, kitchen equipment or a walk-in cooler." %}

## Steps

{% include step.html number="1" title="Mount the Hub" body="Mount the Hub on the wall at the designated spot." %}

{% include step.html number="2" title="Plug it in" body="Plug the Hub into a standard outlet. Avoid outlets on a light switch: if the outlet loses power, the heaters go offline." %}

{% include step.html number="3" title="Connect the network cable, if there is one" body="If the restaurant ran a network cable to the Hub Location, plug it into the Hub. Leave a drip loop: let the cable hang down below the Hub's port before it rises back up into it, so water drips off the bottom of the loop instead of running into the Hub. No cable? The Hub uses WiFi instead." %}

{% include step.html number="4" title="Connect the Hub to WiFi, if it isn't configured yet" body="Skip this step if Focal already configured the Hub, or if you plugged in a network cable. Otherwise, with the Hub plugged in: scan the QR code on the Hub with your phone's camera. When your phone asks you to sign in to the network, tap Sign in. On the page that opens, enter the restaurant's WiFi network name and password. A success message means the Hub is online." %}

{% include warn.html text="Use the network the restaurant tested, usually their staff WiFi. Guest WiFi with a sign-in page won't work. If you don't see a success message, check the network name and password and try again, then contact Focal." %}

## Final checks

{% include checklist.html items="Hub is mounted at the Hub Location, or as close to it as you could get | Hub is plugged into an outlet that isn't on a light switch | Network cable, if any, is plugged in with a drip loop | If the Hub wasn't configured yet: you saw the WiFi success message" %}

If Focal configured the Hub ahead of time, you can't see from the Hub whether it's online yet. You'll find out when you assign heaters: if heaters won't assign or don't respond, check the Hub first.
