---
title: Register & Assign Duos
audience: [installer]
order: 5
summary: Register each new Duo and assign it to the correct zone so the app matches the physical layout.
version: "1.0"
updated: "2025-11-13"
---

## Two ways to register

You can register from the admin page on a laptop, or scan the QR code on each Duo from a phone. The QR flow is the field-friendly option on site.

## Register from the admin page

{% include step.html number="1" title="Find the new Duo" body="With the Duo plugged into a powered rail slot, open the admin page and look under Unregistered Devices. The unit appears once it's online." diagram="reg-01-unregistered.svg" %}

{% include step.html number="2" title="Confirm which unit it is" body="Use Identify to make that physical heater signal, so you're sure you're registering the right one before assigning it." diagram="reg-02-identify.svg" %}

{% include step.html number="3" title="Assign it to a zone" body="Register the Duo to the correct zone for its location. The zone map should mirror the true position of heaters on the rail." diagram="reg-03-assign-zone.svg" %}

## Register by QR scan

{% include step.html number="1" title="Scan the Duo QR code" body="On the waitstaff register-devices page, scan the QR code on the heater pendant. This pulls up that specific unit." diagram="reg-04-qr-scan.svg" %}

{% include step.html number="2" title="Assign the zone and slot" body="Assign the scanned unit to its zone and slot so the software matches where the heater physically sits." diagram="reg-05-qr-assign.svg" %}

## Final checks

{% include checklist.html items="Every heater registered (none left under Unregistered Devices) | Each heater assigned to the correct zone | Zone map matches the physical layout on the rail | Heaters respond when controlled from the app" %}
