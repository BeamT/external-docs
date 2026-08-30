---
title: Troubleshooting
audience: [customer, installer]
audience_order: {customer: 20, installer: 65}
order: 80
summary: Quick fixes for offline heaters, no heat, no power, and stuck units.
version: "1.3"
updated: "2026-08-20"
---

## What's wrong?

<a class="fixit-banner fixit-banner--compact" href="{{ site.baseurl }}/fixit/">
  <div class="fixit-banner-text">
    <div class="fixit-banner-eyebrow">Troubleshoot now</div>
    <h2>Use our troubleshooting tool</h2>
  </div>
  <span class="fixit-banner-arrow" aria-hidden="true">&rarr;</span>
</a>

Or pick the symptom that matches what you're seeing.

- [I can't control the heater (offline, app, or QR code)](#cant-control)
- [No power or lights](#no-power-or-lights)
- [Heater isn't heating](#not-heating)
- [Heater is hard to move](#hard-to-move)
- [Heater is physically damaged](#physically-damaged)

If none of these fit, or the steps don't fix it, see [Still stuck?](#still-stuck) at the bottom.

## I can't control the heater (offline, app, or QR code) {#cant-control}

The heater still heats, but you can't reach it from the Focal Control page or when a guest scans the QR code.

First, one quick check. Give the pull string a short pull. If the lights flash yellow instead of changing the heat, the heater is in Schedule Mode outside its scheduled hours. That's not a fault. The heater just isn't controllable until the schedule is active or someone switches it to Manual Mode. See [System Setup & Control]({{ site.baseurl }}/system-setup-control/).

Otherwise, it's a connectivity problem. The next step depends on whether one heater is affected or all of them.

### Only some heaters offline

{% include step.html number="1" title="Check power" body="Confirm the affected heater has power. Its LEDs should be lit." %}

No lights means no power, and a heater with no power can't come online. Go to [No power or lights](#no-power-or-lights) first, then come back here.

### All heaters offline

First check power. If none of the heaters have lit LEDs, the whole rail may be without power, and that's a power problem rather than a network one. Go to [No power or lights](#no-power-or-lights) first. If the heaters have power but still show offline, work through the box.

{% include step.html number="1" title="Check the Focal Point networking box power" body="Confirm the Focal Point networking box is plugged into power." %}

{% include step.html number="2" title="Check its internet connection" body="Confirm the box is getting internet. The cable from the customer's router should run to the box's WAN port." %}

For how the networking box and access point should be wired, see [Network Setup]({{ site.baseurl }}/network-setup/).

If the heater is online, in Manual Mode, and responds to the pull string but still ignores the app and QR code, [contact Focal Support](#still-stuck).

## No power or lights {#no-power-or-lights}

No LEDs at all. Start with the single heater, then widen out.

{% include step.html number="1" title="Re-seat the heater" body="Pull down on the pull string, move the heater away from the slot, then back, and let go of the string." %}

If the lights come back, you're done. If not, and if other heaters on the same rail are also dark, it's likely the rail or the circuit rather than one heater.

{% include step.html number="2" title="Check the whole rail" body="If every heater on the rail is dead, check the rail switch and the circuit breaker before treating it as a single-heater fault." %}

{% include step.html number="3" title="Check the circuit, not just the heater" body="Test the rail on a known-good neighboring circuit with a non-contact outlet tester before assuming the heater is at fault." %}

Still no power after that? [Contact Focal Support](#still-stuck).

## Heater isn't heating {#not-heating}

Two quick checks before anything else.

If the LEDs are off, the heater has no power. This is really a power problem, so go to [No power or lights](#no-power-or-lights), then come back.

If the lights flash yellow when you pull the string, the heater is in Schedule Mode outside its scheduled hours. It won't heat until the schedule is active or you switch to Manual Mode. See [System Setup & Control]({{ site.baseurl }}/system-setup-control/).

If neither of those is happening, work through these.

{% include step.html number="1" title="Confirm the heater has power" body="Check that the LEDs are lit. No lights means no power, and no power means no heat." %}

{% include step.html number="2" title="Try a short pull" body="With power confirmed, give the pull string a short pull to change the heat level. If the heat changes, heating is working." %}

If the heater has power, is in Manual Mode, and still produces no heat, [contact Focal Support](#still-stuck).

## Heater is hard to move {#hard-to-move}

Pull down fully on the pull string before you try to move the heater. A partial pull won't release it from the rail.

If it's still hard to move after a full pull, [contact Focal Support](#still-stuck).

## Heater is physically damaged {#physically-damaged}

{% include warn.html text="If a grille or thermal engine is dislodged, or the unit is damaged, move it off the slot and secure any loose parts so nothing falls. Don't operate a damaged heater." %}

Once the area is safe, [contact Focal Support](#still-stuck) for a loaner or replacement.

## Still stuck?

Run through the [troubleshooting tool]({{ site.baseurl }}/fixit/) to send Focal Support a full report, or email [hello@focalheat.co](mailto:hello@focalheat.co) directly with the heater's serial number and what you've already tried.

{% include serial.html %}