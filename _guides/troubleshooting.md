---
title: Troubleshooting
audience: [customer, installer]
audience_order: {customer: 20, installer: 65}
order: 80
summary: Quick fixes for the most common issues — offline heaters, no heat, no power, and units that won't move.
version: "1.0"
updated: "2025-11-13"
---

## On this page

Two very different problems can look the same from the app. Sort out which one you have before you start.

**Connectivity** — the heater still heats, but you can't reach it from the app, the Focal Control page, or a guest's QR code scan. The pull string works independently of the network, so if a short pull changes the heat level, start here.

- [Heater shows offline](#heater-shows-offline)
- [Heater won't respond to remote commands](#heater-wont-respond-remotely)

**At the heater** — no power, no heat, or something physically wrong with the unit. These symptoms show up whether or not the heater is online, and no amount of network troubleshooting will clear them.

- [Heater not emitting heat](#heater-not-emitting-heat)
- [No power or LEDs](#no-power-or-leds)
- [Heater is hard to move](#heater-is-hard-to-move)
- [Physical damage](#physical-damage)

If neither group fits or the steps don't resolve it, see [Still stuck?](#still-stuck)

## Heater shows offline

Troubleshooting steps differ depending on whether all heaters are offline or only some of them are.

**All heaters offline:**

{% include step.html number="1" title="Check the Focal Point networking box power" body="Confirm the Focal Point networking box is plugged into power." %}

{% include step.html number="2" title="Check the Focal Point networking box internet connection" body="Confirm the Focal Point networking box is getting internet access — the cable from the customer's router should be connected to the WAN port." %}

**Only some heaters offline:**

{% include step.html number="1" title="Check power" body="Confirm the affected heater has power via its LEDs. If the LEDs aren't lit, see No power or LEDs below." %}

{% include warn.html text="Don't unplug heaters overnight — that's the most common cause of false offline reports the next morning." %}

## Heater won't respond to remote commands (QR code or Focal Control page) {#heater-wont-respond-remotely}

A heater that ignores commands from a guest's QR code scan or from the Focal Control page has lost its connection to the network. Confirm the heat still works locally, then work through the offline steps.

{% include step.html number="1" title="Confirm the heater still heats locally" body="Give the pull string a short pull. If the heat level changes, the heating side is working and the problem is on the connectivity side — continue with the steps below." %}

{% include step.html number="2" title="Work through the offline steps" body="Follow Heater shows offline above: if all heaters are affected, check the Focal Point networking box. If only some are affected, check that heater's power and re-seat it." %}

{% include step.html number="3" title="Check for Schedule Mode" body="Outside scheduled hours, heaters aren't controllable by the QR code, the app, or the pull string. The heater will show as disabled and its lights flash green when the pull string is pulled. Adjust the schedule or switch to Manual Mode." %}

If the heater is online and in Manual Mode but still ignores remote commands, contact Focal.

## Heater not emitting heat

{% include step.html number="1" title="Confirm the heater has power" body="Check that the heater's LEDs are lit. No LEDs means no power, and no amount of control troubleshooting will help until that's fixed." %}

{% include step.html number="2" title="If the LEDs aren't lit" body="The heater isn't getting power. Go to No power or LEDs below and work through those steps before coming back here." %}

{% include step.html number="3" title="Try a short pull on the pull string" body="With power confirmed, give the pull string a short pull to adjust the heat level. This works whether or not the heater is online. If the heat changes, the heating side is working and you're looking at a connectivity problem instead." %}

{% include step.html number="4" title="Rule out Schedule Mode" body="If the lights flash green on a pull, the heater is in Schedule Mode outside its scheduled hours. It won't heat until the schedule is active or you switch to Manual Mode." %}

If the heater has power, is fully seated, and is in Manual Mode but still produces no heat, contact Focal.

## No power or LEDs

{% include step.html number="1" title="Re-seat the heater" body="Re-seat the heater in the plug point: pull down on the pull string, move the heater away from the plug point, then back, and let go of the pull string." %}

{% include step.html number="2" title="Check the whole rail" body="If all heaters on the rail have no power, check the rail switch and/or the circuit breaker before treating it as a single-heater problem." %}

{% include step.html number="3" title="Check the circuit, not just the heater" body="Test the rail on a known-good neighboring circuit with a non-contact outlet tester before assuming the heater is at fault." %}

{% include dodont.html do="Give each rail its own dedicated, GFCI-protected circuit." dont="Run heaters on extension cords or shared circuits — the most common root cause of tripping." %}

If a breaker or GFCI keeps tripping, isolate whether it's the GFCI or the breaker, then escalate to the customer's electrician or Focal.

## Heater is hard to move

Make sure you're pulling down fully on the pull string before attempting to move the heater. A partial pull won't release the unit from the rail.

If the heater is still hard to move after a full pull, contact Focal.

## Physical damage

{% include warn.html text="If a grille or thermal engine is dislodged or the unit is physically damaged, move it off the plug point, secure any loose parts so nothing falls, and contact Focal for a loaner or replacement. Don't operate a damaged heater." %}

## Still stuck?

If these steps don't resolve it, contact Focal Support with the heater's serial number and what you've already tried.
