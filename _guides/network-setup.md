---
title: Network Setup
audience: [installer]
audience_order: {installer: 30}
order: 20
summary: Connect the Focal networking box and mount the access point, before the rails go up.
version: "1.2"
updated: "2026-07-28"
---

## On this page
- [Before you start](#before-you-start)
- [What's in the kit](#whats-in-the-kit)
- [Steps](#steps)
- [Confirm the network is live](#confirm-the-network-is-live)

## Before you start

Network setup comes before the rails go up, so the access point is mounted and online by the time there's anything to connect to it. Heaters then come online as soon as they're seated.

Because the rails aren't up yet, work from the site plan — you need to know where each rail will be mounted to place the access point well.

{% include dodont.html do="Place the access point with clear line of sight to where the rails will be mounted." dont="Tuck it behind metal, ductwork, or thick walls that block the signal." %}

## What's in the kit

The networking box provides internet to the heaters over 2.4GHz Wi-Fi. You'll connect it to the site's internet, power it, and mount the access point where it will reach the rails once they're installed.

## Steps

{% include step.html number="1" title="Connect the internet" body="Plug the incoming internet line into the networking box's WAN port. Confirm the site's connection is live before continuing." diagram="net-01-internet.svg" %}

{% include step.html number="2" title="Power the box" body="Connect the networking box to power. Give it a minute to boot and establish a connection." diagram="net-02-power.svg" %}

{% include step.html number="3" title="Mount the access point bracket" body="Fix the AP mount where the access point will have a clear path to the rail positions on the site plan. Keep it away from large metal surfaces." diagram="net-03-ap-mount.svg" %}

{% include step.html number="4" title="Attach the access point" body="Slide the access point onto its mount and connect it to the networking box. Wait for its status light to show it's online." diagram="net-04-ap-attach.svg" %}

## Confirm the network is live

{% include checklist.html items="Networking box powered and connected to the internet | Access point mounted with a clear path to the planned rail positions | Beam_Wifi network is being broadcasted" %}

You can't confirm heater coverage yet — there are no heaters on the rails at this point. That check happens later, in [Register & Assign Heaters]({{ site.baseurl }}/register-assign-heaters/).

{% include warn.html text="If heaters won't come online once they're installed, come back and reposition the access point closer to the rails or clear obstructions before assuming a hardware fault." %}

{% include nextlink.html slug="rail-installation" title="Rail Installation" %}
