---
title: Network Setup
audience: [installer]
audience_order: {installer: 30}
order: 20
summary: Connect the Focal Point networking box and mount the wireless access point — ideally before the rails go up.
version: "1.3"
updated: "2026-07-28"
---

## On this page
- [Before you start](#before-you-start)
- [What's in the kit](#whats-in-the-kit)
- [Steps](#steps)
- [Confirm the network is live](#confirm-the-network-is-live)

## Before you start

We recommend setting up the network before the rails go up. It isn't a hard requirement — the network can be installed at any point — but doing it first means the access point is mounted and online by the time there's anything to connect to it, so heaters come online as soon as they're seated.

If the rails aren't up yet, work from the site plan. The site plan specifies where the access point goes, and you'll need the planned rail positions to confirm that location makes sense.

You'll also need the customer on site for a few minutes at the start: the networking box connects to the internet through their existing router, so they need to point you to it and tell you which port you're allowed to use.

{% include dodont.html do="Place the access point where the site plan calls for it, with a clear path to where the rails will be mounted." dont="Tuck it behind metal, ductwork, or thick walls that block the signal." %}

## What's in the kit

The Focal Point networking box connects to the customer's existing router and broadcasts a dedicated 2.4GHz Wi-Fi network for the heaters. The wireless access point extends that network out to the rails.

- **Focal Point networking box** — connects to the customer's router and creates the heater network
- **Power extension cord** — for the Focal Point networking box, if the nearest outlet is out of reach
- **Wireless access point**, with wall mounting hardware — mounts where the site plan specifies
- **2 network cables** — one from the router to the networking box, one from the networking box to the access point

## Steps

{% include step.html number="1" title="Connect the Focal Point networking box to the internet" body="Ask the customer to identify their router and confirm which port you're permitted to use. Run one of the supplied network cables from that port to the WAN port on the Focal Point networking box. Confirm the site's internet connection is live before continuing." %}

{% include step.html number="2" title="Power the box" body="Plug the Focal Point networking box into a nearby outlet, using the supplied power extension cord if the outlet is out of reach. Give it a minute to boot and establish a connection." %}

{% include step.html number="3" title="Mount the access point bracket" body="The site plan specifies where the access point goes — treat that as the primary location. Fix the wall mounting hardware there, keeping the bracket away from large metal surfaces. Only deviate if the planned spot is physically unworkable, and note the change on the plan." %}

{% include step.html number="4" title="Attach the access point" body="Slide the access point onto its mount and run the second network cable back to the Focal Point networking box. Wait for its status light to show it's online." %}

## Confirm the network is live

{% include checklist.html items="Focal Point networking box powered and connected to the customer's router | Access point mounted at the location specified on the site plan | Both network cables seated and secured | Beam_Wifi network is being broadcasted" %}

If the rails aren't installed yet, you can't confirm heater coverage at this point. That check happens later, in [Register & Assign Heaters]({{ site.baseurl }}/register-assign-heaters/).

{% include warn.html text="If heaters won't come online once they're installed, come back and reposition the access point closer to the rails or clear obstructions before assuming a hardware fault." %}

{% include nextlink.html slug="rail-installation" title="Rail Installation" %}
