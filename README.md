# Eponuda Adblock Fix

Fixes eponuda.com when using content blockers and private DNS resolvers.

## What This Solves

Visiting `eponuda.com` with an active ad blocker or secure DNS filter triggers an anti-adblock barrier. The site displays a full-screen prompt (“Please allow ads on this site”), locks page scrolling, turns completely white, or redirects the browser to `report.error-report.com`.

This userscript stops those interruptions before they load:

* Removes the full-screen modal and prevents the blank white screen.
* Blocks forced redirects to external error reporting domains.
* Restores normal scrolling and navigation across the product catalog.
* Works alongside standard browser extensions (uBlock Origin, AdGuard) and DNS-level filters (NextDNS, Pi-hole) in Chrome, Firefox, Edge, and Brave.

## Installation

1. Install an open-source userscript manager such as Violentmonkey or Tampermonkey.
2. Open [eponuda-defuser.user.js](eponuda-defuser.user.js).
3. Click the install button in your userscript manager.
4. Visit `eponuda.com`. The catalog loads normally with your ad blocker active.

## Disclaimer

This repository is an independent open-source utility. It is not affiliated with, maintained by, or endorsed by eponuda.com.
