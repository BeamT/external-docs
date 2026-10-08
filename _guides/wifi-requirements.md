---
title: WiFi Requirements
audience: [customer]
audience_order: {customer: 60}
order: 110
summary: Check and improve WiFi for your Focal Hub.
version: "1.0"
updated: "2026-10-08"
---
## On this page

- [Why we ask](#why-we-ask)
- [Requirements](#requirements)
- [Test your WiFi](#test-your-wifi)
- [If your WiFi needs improvement](#if-your-wifi-needs-improvement)
- [Option 1: Run a network cable to the Hub](#option-1-run-a-network-cable-to-the-hub)
- [Option 2: Move your router or access point](#option-2-move-your-router-or-access-point)
- [Option 3: Add an access point](#option-3-add-an-access-point)
- [Option 4: Add an extender](#option-4-add-an-extender)
- [Our recommended product](#our-recommended-product)
- [Still stuck?](#still-stuck)

## Why we ask

Focal heaters are connected to and controlled by a **Focal Hub**, a small box mounted on your patio. The Hub connects to the internet through your WiFi, so it needs a strong signal where it's mounted. Without good WiFi there, the heaters can't be controlled from the Focal Control app or their QR codes, and their schedule won't run.

## Requirements


| Requirement    | Minimum                                                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Download speed | **10 Mbps**                                                                                                                                                          |
| Upload speed   | **10 Mbps**                                                                                                                                                          |
| Hub location   | Covered, near a standard power outlet, in line of sight and within 50 ft of the heaters. If you have a Focal-provided site plan, use the Hub Location marked on it |


**For your IT person:** the Hub gets its address by DHCP (no static IP needed) and works on an isolated network or your main one. It uses 10.10.10.0/24 internally, so the network it joins can't use or include that range.

Your network is yours to set up and maintain. We're happy to advise, but we don't install, sell or support non-Focal network equipment.

## Test your WiFi

{% include checklist.html items="Any phone | The free <a href='https://www.speedtest.net/apps/mobile'><strong>Speedtest by Ookla</strong></a> app | About 10 minutes, ideally during service hours" %}

1. Install the free [**Speedtest by Ookla**](https://www.speedtest.net/apps/mobile) app on your phone.
2. Join the WiFi the Hub will use, usually your **staff network**.
3. Stand where the Hub will go and hold your phone at about mounting height.
4. Run the test a few times, ideally during service hours, when your network is busiest.

{% include warn.html text="Guest WiFi with a sign-in page won't work. Test on the network the Hub will actually use." %}

**Every test is above 10 Mbps down and 10 Mbps up?** You're all set.

**Any test falls short?** See [If your WiFi needs improvement](#if-your-wifi-needs-improvement).

## If your WiFi needs improvement

The options below are listed **most reliable first**. After any change, re-test where the Hub will go.

Wherever you put a router, access point or extender:

- WiFi passes through clear glass. Brick, concrete, stone, metal and tinted or energy-efficient (low-E) glass block it. A plain window facing the patio is usually the best path.
- The fewer walls between the device and the Hub, the better.

{% include dodont.html do="Keep it up high and in the open." dont="Put it in a cabinet, or near metal shelving, kitchen equipment or a walk-in cooler." %}

## Option 1: Run a network cable to the Hub

Most reliable. Plug a network (Ethernet) cable into the Hub and it doesn't need WiFi at all.

### For your IT person

- Start the cable at your router, or any free port on a network switch.
- Use Cat6 (outdoor-rated where it runs outside), up to about 300 ft (100 m).
- Leave enough slack at the Hub for a drip loop, so water drips off the cable instead of running into the Hub.
- The Hub has its own power cord, so PoE (power over Ethernet) isn't needed.
- The port must give internet access. A guest network with a sign-in page won't work.

## Option 2: Move your router or access point

Often a free fix. Move it toward the wall or window facing the Hub. If your router has to stay next to your internet provider's box, skip to [Option 3](#option-3-add-an-access-point).

## Option 3: Add an access point

An access point is a second WiFi device, connected to your router by a network cable. Place it indoors by a wall or window facing the patio, or outdoors if your IT person prefers.

- **Already have WiFi equipment, like UniFi or eero?** We recommend adding one more of the same brand, so everything is managed in one app. This isn't required.
- **No brand, or not sure?** See [our recommended product](#our-recommended-product).
- A separate network name, like *Patio-WiFi*, is fine. The Hub connects to one network and stays on it.

## Option 4: Add an extender

An extender repeats your WiFi without a cable. It's the simplest to set up, but the least reliable: it depends on a wireless link and a wall outlet.

- Plug it in **indoors**, about halfway between your router and the patio, where the signal is still strong.
- Use an outlet that's **hard to reach and rarely used**: not one for charging phones, and not one on a light switch.

{% include warn.html text="Label the extender <strong>Don't unplug: powers patio heaters.</strong> If it loses power, the heaters go offline." %}

## Our recommended product

If you don't have a preferred brand, we recommend the **Netgear EAX15 WiFi 6 Mesh Extender** (about $90). It works with most routers and can run as an [access point (Option 3)](#option-3-add-an-access-point) or an [extender (Option 4)](#option-4-add-an-extender). For setup in either mode, see Netgear's [EAX15 user manual](https://www.downloads.netgear.com/files/GDC/EAX15/EAX15_UM_EN.pdf).

Other similar devices work too. Focal doesn't sell or support this product, so for help with it, contact Netgear.

## Still stuck?

Contact your Focal representative or email [support@focalheat.co](mailto:support@focalheat.co).