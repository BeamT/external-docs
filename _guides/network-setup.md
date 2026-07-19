---
title: Network Setup
audience: [installer]
audience_order: {installer: 40}
order: 45
summary: Connect the Focal networking box and access point so heaters can come online.
version: "1.0"
updated: "2025-11-13"
---

## On this page
- [What's in the kit](#whats-in-the-kit)
- [Steps](#steps)
- [Confirm coverage](#confirm-coverage)

## What's in the kit

The networking box provides internet to the heaters over 2.4GHz Wi-Fi. You'll connect it to the site's internet, power it, and mount the access point where it can reach the rails.

{% include dodont.html do="Place the access point with clear line of sight toward the rails." dont="Tuck it behind metal, ductwork, or thick walls that block the signal." %}

## Steps

{% include step.html number="1" title="Connect the internet" body="Plug the incoming internet line into the networking box's WAN port. Confirm the site's connection is live before continuing." diagram="net-01-internet.svg" %}

{% include step.html number="2" title="Power the box" body="Connect the networking box to power. Give it a minute to boot and establish a connection." diagram="net-02-power.svg" %}

{% include step.html number="3" title="Mount the access point bracket" body="Fix the AP mount where the access point will have a clear path to the heaters. Keep it away from large metal surfaces." diagram="net-03-ap-mount.svg" %}

{% include step.html number="4" title="Attach the access point" body="Slide the access point onto its mount and connect it to the networking box. Wait for its status light to show it's online." diagram="net-04-ap-attach.svg" %}

## Confirm coverage

{% include checklist.html items="Networking box powered and connected to the internet | Access point mounted with a clear path to the rails | Access point status light shows online | Heaters begin appearing online in the Focal admin app" %}

{% include warn.html text="If heaters stay offline, reposition the access point closer to the rails or clear obstructions before assuming a hardware fault." %}
