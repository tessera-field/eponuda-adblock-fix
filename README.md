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

<details>
<summary>Uputstvo na srpskom (Rešenje za eponuda.com blokadu)</summary>

Skripta uklanja beli ekran, preusmeravanja (redirects) i poruku „Please allow ads on this site“ na sajtu eponuda.com kada koristite AdBlock, Brave Shields, uBlock Origin ili NextDNS.

### Instalacija:
1. Instalirajte Violentmonkey ili Tampermonkey u vaš pretraživač.
2. Kliknite na [eponuda-defuser.user.js](eponuda-defuser.user.js) i potvrdite instalaciju.
3. Otvorite eponuda.com - sajt radi normalno bez blokada.

</details>
