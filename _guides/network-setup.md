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

- **Consult the customer** — the Focal Point networking box connects to the internet via their existing router, so they need to point you to it and confirm which port to use
- **Reference the site plan** — it specifies the access point location

{% include dodont.html do="Place the access point where the site plan calls for it, with a clear path to where the rails will be mounted." dont="Tuck it behind metal, ductwork, or thick walls that block the signal." %}

## What's in the kit

The Focal Point networking box connects to the customer's existing router and the attached wireless access point broadcasts a dedicated 2.4GHz Wi-Fi network for the heaters.

- **Focal Point networking box** — connects to the customer's router and wireless access point
- **Power extension cord** — for the Focal Point networking box, if the nearest outlet is out of reach
- **Wireless access point** mounts where the site plan specifies using the included wall mount
- **2 network cables** — one from the customer's router to the Focal Point networking box, one from the Focal Point networking box to the access point

## Steps

{% include step.html number="1" title="Connect the Focal Point networking box to the internet" body="Ask the customer to identify their router and confirm which port to use. Run one of the supplied network cables from that port to the WAN port on the Focal Point networking box." %}

{% include step.html number="2" title="Power the Focal Point networking box" body="Plug the Focal Point networking box into a nearby outlet, using the supplied power extension cord if the outlet is out of reach." %}

{% include step.html number="3" title="Mount the access point mount" body="The site plan specifies where the access point goes and should be primary location. Mount the wall mount there and only deviate if the planned spot is physically unworkable, and note the change on the plan." %}

{% include step.html number="4" title="Attach the access point" body="Connect the second network cable to the wireless access point and the Focal Point networking box. Slide the access point onto its mount." %}

{% include step.html number="5" title="Tidy up the network cable" body="Tidy up the network cable to the access point using cable clips, ties, etc" %}

## Confirm the network is live

{% include checklist.html items="Focal Point networking box is powered and connected to the customer's router | Access point is mounted at the location specified on the site plan and connected to the Focal Point networking box | Wi-Fi network 'Beam_Wifi' is being broadcasted" %}

{% include warn.html text="If heaters won't come online once they're installed, come back and reposition the access point closer to the rails or clear obstructions before assuming a hardware fault." %}

If that doesn't resolve it, see the [Troubleshooting]({{ site.baseurl }}/troubleshooting/) guide. If you're still stuck, contact Focal.

{% include nextlink.html slug="rail-installation" title="Rail Installation" %}

