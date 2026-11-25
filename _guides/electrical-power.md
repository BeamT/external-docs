---
title: Electrical & Power Requirements
audience: [electrician]
audience_order: {electrician: 10}
product: both
stage: [install]
install_order: {restaurant: 15, home: 20}
next_chain: false
order: 6
summary: Circuit, outlet, and plug requirements for Focal Rails.
version: "1.5"
updated: "2026-11-25"
---

## On this page
- [Overview](#overview)
- [System basics](#system-basics)
- [Rail configurations](#rail-configurations)
- [Outlet and circuit by plug type](#outlet-and-circuit-by-plug-type)
- [Placement and cabling](#placement-and-cabling)
- [Hub outlet](#hub-outlet)
- [Final checks](#final-checks)

## Overview

Each Focal Rail ships with a factory-installed plug, either 15A or 20A depending on how many heaters it carries. For each Rail, provide a matching outdoor-rated, GFCI-protected outlet. Each Rail needs its own circuit, and Rails can't share a circuit.

## System basics

Each Focal heater is rated 600W (two 300W heating heads) at 120V, 60Hz. A Rail's total load depends on how many heaters it carries.

Focal heaters conform to UL 2021 and are certified by TÜV Rheinland.

## Rail configurations

Each Rail is limited to a maximum number of heaters. The Rail model determines the plug and the circuit you need to provide.

{% include railtable.html %}

{% include warn.html text="Never load a Rail with more heaters than allowed. If more heat is needed, add another Rail on its own circuit." %}

## Outlet and circuit by plug type

Match the outlet and circuit to whichever plug the Rail arrived with.

| Factory plug | Required outlet | Required circuit |
|---|---|---|
| NEMA 5-15P | NEMA 5-15R, outdoor-rated, GFCI protected | Its own 15A circuit, appropriately sized breaker |
| NEMA 5-20P | NEMA 5-20R, outdoor-rated, GFCI protected | Its own 20A circuit, appropriately sized breaker |

If you need a new outlet and circuit, expect to pay roughly $250–$500 to have it installed.

## Placement and cabling

Position each outlet in line with the cord-exit end of its Rail, where the Rail's 8-foot built-in cable exits, and account for features like pillars or posts. If the cable can't reach, use an extension cord. Any extension cord, and all other cabling connected to a Rail, should be 12AWG or heavier and rated for 20A. Don't use a power strip.

## Hub outlet

{% capture hubnote %}  
The Focal Hub (a small box that connects the heaters to WiFi) needs a standard outlet at the location marked on the site plan. Don't use an outlet on a light switch.  
{% endcapture %}  
{% include productonly.html for="restaurant" content=hubnote %}

## Final checks

{% include warn.html text="Do not energize the outlet or operate a heater until mounting and clearance checks are complete." %}

Then verify at every outlet:

{% include checklist.html items="Outdoor-rated receptacle with an in-use weatherproof cover | GFCI protection | Proper grounding | No exposed conductors or loose connections | Rail on its own circuit, breaker sized to the plug" %}

For anything not covered here, contact Focal.
