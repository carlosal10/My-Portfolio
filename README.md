# Timon portfolio

A personal, engineering-first portfolio for Owuor Timon Odhiambo, built with React, TypeScript, and Vite. Installation clients are the primary audience; employment opportunities and software development are secondary. The visual direction combines warm ivory, charcoal, burnt orange, editorial typography, and custom engineering diagrams.

## Positioning

- CCTV and access control, networking and telecoms, solar installations, then software and integration.
- Based in Nairobi, serving Kenya’s major cities and towns; other accessible locations by arrangement.
- Personal accountability with project-based collaborators when the scope requires them, not a permanent in-house team.
- Installation primarily uses client-provided equipment; sourcing assistance is discussed per project, not advertised as stocked equipment supply.
- WhatsApp is the main enquiry route, with direct call and email alternatives.

## Local development

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, including `/My-Portfolio/`.

```sh
npm run build
npm run preview
npx playwright install chromium
npm test
```

If Chrome is already installed and the Playwright browser download is unavailable, use it locally in PowerShell with `$env:PLAYWRIGHT_CHANNEL='chrome'; npm test`. Leave this variable unset to use Playwright's bundled Chromium, as CI does.

The build runs strict TypeScript checking. Playwright checks desktop/mobile layouts, narrow phone and tablet widths, service ordering, contact links, WhatsApp draft encoding, copy-email feedback, project filters, galleries, modal focus, navigation, and legacy redirects. Test screenshots are written to the ignored `test-results/` directory. Tests inspect enquiry links without sending messages or contacting clients.

## Where to edit

- `src/content.ts`: name, phone, email, coverage, services, delivery steps, projects, and the WhatsApp link helper. Change `phone` in international format; update `phoneDisplay` alongside it. WhatsApp derives its destination from `phone`.
- `src/App.tsx`: page sections, hero copy, navigation, modal and gallery interactions.
- `src/styles.css`: design tokens, layout, animation, and responsive styles.
- `public/photos/`: existing project screenshots.
- `public/*.html`: redirects for old page URLs.

Service positioning and contact information reflect the owner's supplied details. Existing project descriptions and repository/demo links are carried over; external project functionality has not been verified. Software and automation projects are explicitly distinguished from installation case studies. The irrigation illustration is labeled as a concept, not a project photograph. Journal drafts remain in `src/content.ts` but are not rendered; old Blog URLs and `#journal` bookmarks lead to the work section.

The enquiry panel builds a WhatsApp draft from optional service, location, and requirements fields. It does not submit to a backend or save entries in browser storage. Clicking the WhatsApp link passes those entries to WhatsApp; visitors review and send the message there. Call and email links use `tel:` and `mailto:`. The email copy action falls back to opening the mail application if clipboard access fails.

## Content and launch checklist

- Add real installation photographs and case studies when available: need, personal role, collaborators' contribution, solution, testing, and handover. Remove credentials, sensitive layouts, and identifying client information before publishing.
- Add qualifications, CV, and testimonials only when verified and approved. Do not invent clients, results, permanent staff, certifications, prices, warranties, or response-time promises.
- Review wording against actual delivery arrangements and confirm the public phone/email before launch.
- Run `npm run build` then `npm test`; inspect the generated screenshots and local preview.
- Confirm GitHub Pages settings, deploy, then smoke-test the public site and contact links. Implementation alone does not publish the site.

## Deployment

Vite is configured with `base: '/My-Portfolio/'` for the existing GitHub Pages repository URL. The workflow builds and tests pull requests and deploys successful builds on main. GitHub repository Settings > Pages must use **GitHub Actions** as its source. No deployment has been performed as part of the redesign.

See https://vite.dev/guide/static-deploy#github-pages for deployment details. For a custom domain or root-hosted site, change the base to `/`.

Google Fonts loads DM Sans and Manrope with local sans-serif fallbacks. No other third-party runtime services are required. Reduced-motion preferences are respected, the navigation works with a keyboard, and detail dialogs use the native modal focus trap.
