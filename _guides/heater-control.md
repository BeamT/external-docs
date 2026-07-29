---
title: Heater Control
audience: [customer]
audience_order: {customer: 10}
order: 70
summary: Daily schedule, heat levels, and everyday tasks for staff.
version: "1.1"
updated: "2026-07-28"
---

## On this page
- [Logging in](#logging-in)
- [Accessing the menu](#accessing-the-menu)
- [The two modes](#the-two-modes)
- [Set your schedule](#set-your-schedule)
- [How heat levels get set](#how-heat-levels-get-set)
- [The Heater Control page](#the-heater-control-page)
- [Adjust one guest's heat](#adjust-one-guests-heat)
- [Common tasks](#common-tasks)
- [Guest QR control](#guest-qr-control)
- [How Schedule Mode behaves](#how-schedule-mode-behaves)

## Logging in

You'll get a unique login link and password from Focal by email. Open the link, enter your password, and you're in — there's no username, since the link is specific to your space.

## Accessing the menu

Tap the three lines in the upper right corner, next to the Focal logo, to open the menu. You'll see three options: **Heater Control**, **Scheduling**, and **Settings**. Scheduling and Settings are where you set things up; Heater Control is where you run day to day.

## The two modes

Focal Control runs your heaters one of two ways. You pick the mode from the Scheduling menu.

{% include dodont.html do="Keep Schedule Mode on. It defines when heat can run and shuts every heater off at the end of your hours." dont="Leave heaters in Manual Mode day to day — nothing turns off on its own, so a unit can run all night if someone forgets." %}

**Schedule Mode** sets the hours your heaters are allowed to run. At your start time nothing switches on by itself — heat simply becomes *available*, for staff in the app, for guests scanning the QR code, and for automatic adjustment based on guest presence. At your end time every heater turns off. Outside your hours, heaters can't be turned on at all.

**Manual Mode** hands full control to staff and guets via the QR code. Heaters stay exactly where set them until someone changes them, and nothing shuts off at the end of the night. It's useful when you need to run outside your normal hours: switch to it, run the heaters, then switch back to Schedule Mode without touching your saved hours.

## Set your schedule

From the menu, tap **Scheduling**, then check **Enable Schedule** to turn on Schedule Mode.

{% include step.html number="1" title="Pick your days and hours" body="Scroll to the schedule. Check the days you want heaters to be available and set the start and end time for each day." %}

{% include step.html number="2" title="Save your settings" body="Tap Save Settings to lock it in. Nothing takes effect until you save." %}

## How heat levels get set

Heat runs from OFF (0) to HIGH (3).

In Schedule Mode, heat is adjusted for you during your hours, based on how cold it is outside and whether a guest is seated. Focal manages this for your site today — heaters step up as the outdoor temperature drops and stay off when it's mild:

- Below 55°F — Level 3 (HIGH)
- 55–60°F — Level 2
- 60–65°F — Level 1
- 65°F and above — no heat

These changes aren't always instant. Allow a few minutes for heaters to catch up after a guest sits down or the weather turns.

The Settings page also shows **Unoccupied Heat Level** and **Occupied Heat Level** selectors. Focal's temperature-based monitoring currently takes precedence over these, so changing them may not change what your heaters do.

Anyone can override the automatic level at any time — staff from the Heater Control page, guests from the QR code on the pendant. A manual change always wins.

## The Heater Control page

Open it from the menu. This is where you'll spend most of your time. It has a few areas:

The **Dashboard** shows the mode your heaters are in. In Schedule Mode it shows whether the schedule is active and what time heaters shut down, plus a button to switch to Manual Mode. **System Status** shows how many heaters are online and active. The **power button** turns all heaters on or off at once.

The **Restaurant Map** shows the location of your zone(s). If you have multiple parklets or areas, Focal will set these up as separate **zones** you control as a group. If you'd like to make adjustments, let us know. 

**All Heaters and Zone controls** push a heat level to every heater, or to every heater in one zone at once — handy for warming the whole space quickly.

**Zone maps** below that show each zone with the true position of every heater on the rail, so units are easy to identify. Tap a heater to open its individual controls.

## Adjust one guest's heat

{% include step.html number="1" title="Open the individual heater" body="On the zone map, tap the heater the guest is sitting under. It highlights and opens that heater's controls." %}

{% include step.html number="2" title="Set the level for their side" body="Each heater has two sides — purple and orange. Set the level on the side the guest is sitting on. Your change overrides the automatic level." %}

## Common tasks

**Skip an upcoming holiday.** Menu → Scheduling → uncheck the closed days → Save Settings. Heaters won't be available on those days.

**Warm the space before service.** On the Heater Control page, use the All Heaters control to push a level to every heater at once. Works any time you're inside your scheduled hours.

**Run outside your hours once.** From the dashboard, switch to Manual Mode, run the heaters, then switch back to Schedule Mode — your saved hours are untouched. Don't leave the system in Manual Mode overnight.

## Guest QR control

Guests can scan the QR code on the heater pendant to open a simple page on their phone and adjust the heat on their own side, without needing staff. Their change overrides the automatic level. Outside your scheduled hours, the QR page won't turn heat on.

## How Schedule Mode behaves

Outside your scheduled hours, heaters can't be controlled by the app or the pull-string until you adjust the schedule or switch to Manual Mode. During those times a heater shows as disabled, its purple and orange lights are off, and it flashes green if someone pulls the string.

Inside your hours, heaters adjust based on guest presence and the outdoor temperature. When a guest leaves, the heater returns to its unoccupied level after about five minutes. Staff and guest changes always take precedence over the automatic level.

If a heater isn't responding the way you expect, see the [Troubleshooting]({{ site.baseurl }}/guides/troubleshooting/) guide.
