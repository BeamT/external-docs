---
title: Troubleshooting
audience: [customer, installer]
audience_order: {customer: 20, installer: 65}
order: 80
summary: Quick fixes for offline heaters, no heat, no power, and stuck units.
version: "1.2"
updated: "2026-07-29"
---

## On this page

**Connectivity**

The heater still heats, but you can't reach it from the Focal Control page or a guest's QR code scan.

- [Heater shows offline](#heater-shows-offline)
- [Heater won't respond to remote commands](#heater-wont-respond-remotely)

**At the heater**

No power, no heat, or something physically wrong with the unit.

- [Heater not emitting heat](#heater-not-emitting-heat)
- [No power or LEDs](#no-power-or-leds)
- [Heater is hard to move](#heater-is-hard-to-move)
- [Physical damage](#physical-damage)

If neither group fits, or the steps don't resolve it, see [Still stuck?](#still-stuck)

## Heater shows offline

Troubleshooting steps differ depending on whether all heaters are offline or only some of them are.

### All heaters offline

{% include step.html number="1" title="Check the Focal Point networking box power" body="Confirm the Focal Point networking box is plugged into power." %}

{% include step.html number="2" title="Check the Focal Point networking box internet connection" body="Confirm the Focal Point networking box is getting internet access — the cable from the customer's router should be connected to the Focal Point networking box's WAN port." %}

For how the networking box and access point should be wired, see [Network Setup]({{ site.baseurl }}/network-setup/).

### Only some heaters offline

{% include step.html number="1" title="Check power" body="Confirm the affected heater has power via its LEDs." %}

If the LEDs aren't lit, the heater isn't getting power and can't come online — work through [No power or LEDs](#no-power-or-leds) first.

{% include warn.html text="Don't unplug heaters overnight — that's the most common cause of false offline reports the next morning." %}

If every heater has power and the networking box is online but heaters still show offline, [contact Focal Support](#still-stuck).

## Heater won't respond to remote commands (QR code or the Focal Control page) {#heater-wont-respond-remotely}

A heater that ignores commands from a guest's QR code scan or from the Focal Control page has lost its connection to the network. The fix is the same as [Heater shows offline](#heater-shows-offline) above — start there, then confirm the two things below.

{% include step.html number="1" title="Confirm the heater still heats locally" body="Give the pull string a short pull. If the heat level changes, the heating side is working and the problem is on the connectivity side." %}

{% include step.html number="2" title="Rule out Schedule Mode" body="Outside scheduled hours, heaters aren't controllable by the QR code, by the Focal Control page, or by the pull string. The heater shows as disabled and its lights flash yellow when the pull string is pulled." %}

Schedule Mode and Manual Mode are covered in [Heater Control]({{ site.baseurl }}/heater-control/). If the heater is online, in Manual Mode, and responds to the pull string but still ignores remote commands, [contact Focal Support](#still-stuck).

## Heater not emitting heat

Work these in order. If the LEDs aren't lit at step 1, the heater isn't getting power — jump to [No power or LEDs](#no-power-or-leds), then come back.

{% include step.html number="1" title="Confirm the heater has power" body="Check that the heater's LEDs are lit. No LEDs means no power, and no power means no heat." %}

{% include step.html number="2" title="Try a short pull on the pull string" body="With power confirmed, give the pull string a short pull to adjust the heat level. If the heat changes, heating is working." %}

{% include step.html number="3" title="Rule out Schedule Mode" body="If the lights flash yellow on a pull, the heater is in Schedule Mode outside its scheduled hours. It won't heat until the schedule is active or you switch to Manual Mode." %}

Switching between modes is covered in [Heater Control]({{ site.baseurl }}/heater-control/). If the heater has power and is in Manual Mode but still produces no heat, [contact Focal Support](#still-stuck).

## No power or LEDs

{% include step.html number="1" title="Re-seat the heater" body="Re-seat the heater in the plug point: pull down on the pull string, move the heater away from the plug point, then back, and let go of the pull string." %}

{% include step.html number="2" title="Check the whole rail" body="If all heaters on the rail have no power, check the rail switch and/or the circuit breaker before treating it as a single-heater problem." %}

{% include step.html number="3" title="Check the circuit, not just the heater" body="Test the rail on a known-good neighboring circuit with a non-contact outlet tester before assuming the heater is at fault." %}

{% include dodont.html do="Give each rail its own dedicated, GFCI-protected circuit." dont="Run heaters on extension cords or shared circuits — the most common root cause of tripping." %}

If a breaker or GFCI keeps tripping, isolate whether it's the GFCI or the breaker, then escalate to the site's electrician or [contact Focal Support](#still-stuck).

## Heater is hard to move

Make sure you're pulling down fully on the pull string before attempting to move the heater. A partial pull won't release the unit from the rail.

If the heater is still hard to move after a full pull, [contact Focal Support](#still-stuck).

## Physical damage

{% include warn.html text="If a grille or thermal engine is dislodged or the unit is physically damaged, move it off the plug point and secure any loose parts so nothing falls. Don't operate a damaged heater." %}

Once the area is safe, [contact Focal Support](#still-stuck) for a loaner or replacement.

## Still stuck?

If these steps don't resolve it, contact Focal Support at [hello@focalheat.co](mailto:hello@focalheat.co) with the heater's serial number and what you've already tried.

{% include serial.html %}
