---
title: Troubleshooting
audience: [customer, installer]
audience_order: {customer: 20, installer: 65}
order: 80
summary: Quick fixes for the most common issues — offline heaters, no heat, no power, and units that won't move.
version: "1.0"
updated: "2025-11-13"
---

Two very different problems can look the same from the app. Sort out which one you have before you start:

- **Connectivity issue** — the heater can't be reached remotely, but it still heats. The pull string works independently of the network, so a short pull will still change the heat level.
- **Local hardware issue** — the heater has no power or won't produce heat, whether or not it's online.

If a short pull on the pull string changes the heat, the heater itself is fine and you're troubleshooting connectivity.

## On this page

**Connectivity**
- [Heater shows offline](#heater-shows-offline)
- [Heater won't respond to remote commands](#heater-wont-respond-remotely)

**Local hardware**
- [Heater not emitting heat](#heater-not-emitting-heat)
- [No power or LEDs](#no-power-or-leds)
- [Heater is hard to move](#heater-is-hard-to-move)
- [Physical damage](#physical-damage)
- [Still stuck?](#still-stuck)

## Heater shows offline

Troubleshooting steps differ depending on whether all heaters are offline or only some of them are.

**All heaters offline:**

{% include step.html number="1" title="Check the Focal Point networking box power" body="Confirm the Focal Point networking box is plugged into power." %}

{% include step.html number="2" title="Check the Focal Point networking box internet connection" body="Confirm the Focal Point networking box is getting internet access — the cable from the customer's router should be connected to the WAN port." %}

**Only some heaters offline:**

{% include step.html number="1" title="Check power" body="Confirm the affected heater has power via its LEDs. If the LEDs aren't lit, see Heater not emitting heat below to re-seat it." %}

{% include warn.html text="Don't unplug heaters overnight — that's the most common cause of false offline reports the next morning." %}

## Heater won't respond to remote commands (QR code or Focal Control page) {#heater-wont-respond-remotely}

A heater that ignores commands from a guest's QR code scan or from the Focal Control page is almost always a connectivity problem, not a fault with the heater. Confirm the heat still works locally, then work through the offline steps.

{% include step.html number="1" title="Confirm the heater still heats locally" body="Give the pull string a short pull. If the heat level changes, the heater is working and the problem is connectivity — continue with the steps below." %}

{% include step.html number="2" title="Work through the offline steps" body="Follow Heater shows offline above: if all heaters are affected, check the Focal Point networking box. If only some are affected, check that heater's power and re-seat it." %}

{% include step.html number="3" title="Check for Schedule Mode" body="Outside scheduled hours, heaters aren't controllable by the QR code, the app, or the pull string. The heater will show as disabled and its lights flash green when the pull string is pulled. Adjust the schedule or switch to Manual Mode." %}

If the heater is online and in Manual Mode but still ignores remote commands, contact Focal.

## Heater not emitting heat

{% include step.html number="1" title="Try a short pull on the pull string" body="A short pull adjusts the heat level and works whether or not the heater is online. If the heat changes, the heater is fine — this is a connectivity issue, not a heating fault." %}

{% include step.html number="2" title="Check for power" body="Confirm the heater's LEDs are lit. If they aren't, re-seat the heater in the plug point: pull down on the pull string, move the heater away from the plug point, then back, and let go of the pull string." %}

{% include step.html number="3" title="Check the whole rail" body="If all heaters on the rail have no power, check the rail switch and/or the circuit breaker before assuming a single heater is at fault." %}

{% include step.html number="4" title="Rule out Schedule Mode" body="If the lights flash green on a pull, the heater is in Schedule Mode outside its scheduled hours. It won't heat until the schedule is active or you switch to Manual Mode." %}

If the heater has power, is fully seated, and is in Manual Mode but still produces no heat, contact Focal.

## No power or LEDs

{% include step.html number="1" title="Check the circuit, not just the heater" body="Test the rail on a known-good neighboring circuit with a non-contact outlet tester before assuming the heater is at fault." %}

{% include dodont.html do="Give each rail its own dedicated, GFCI-protected circuit." dont="Run heaters on extension cords or shared circuits — the most common root cause of tripping." %}

If a breaker or GFCI keeps tripping, isolate whether it's the GFCI or the breaker, then escalate to the customer's electrician or Focal.

## Heater is hard to move

First tell apart "mechanically stuck" from "in move mode" — a long pull that wasn't fully released leaves the unit in move mode.

**Stuck up / won't seat:** the internal segment that pulls the plug in and out has come loose, leaving the plug sprung up. This is a service-kit fix — escalate to a trained tech.

**Stuck down / won't release:** usually the unit binding under the pendant's weight. Resolved on-site by a trained tech cleaning and greasing the rail and mechanism.

## Physical damage

{% include warn.html text="If a grille or thermal engine is dislodged or the unit is physically damaged, move it off the plug point, secure any loose parts so nothing falls, and contact Focal for a loaner or replacement. Don't operate a damaged heater." %}

## Still stuck?

If these steps don't resolve it, contact Focal Support with the heater's serial number and what you've already tried.
