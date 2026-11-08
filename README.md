# Research Atlas

A research portfolio and competitive applications workspace built with React, TypeScript and Vinext, with Cloudflare D1 persistence.

## Features

- Dashboard for projects, PhD applications, job applications and research opportunities
- Track publications, preprints, submissions, collaborations and invited contributions
- Six editable templates: research proposals, academic papers, academic CVs, cover letters, recommendation requests and evidence logs
- Opportunity comparisons and an evidence register with self-assessed strength
- Saved submission checklists and linked records
- Text downloads and a JSON workspace export
- British English, Harvard author–date guidance and identifier placeholders

Statuses distinguish **Confirmed**, **Tentative**, **Pending** and **Completed**. Evidence strength is a user assessment, not a prediction of selection outcomes.

## Architecture

The React interface calls `/api/records`. Server route handlers use Drizzle ORM to read and write structured records in Cloudflare D1. Database migrations are under `drizzle/`.

The deployed application is owner-private through its hosting platform. This repository contains source code only: no saved research records, credentials or local databases.

## Local development

Requires Node.js 22.13 or later.

```sh
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_nappy_tomorrow_man.sql
npm run start
```

Apply each local migration once. For interface development, `npm run dev` starts the development server. The production preview uses the built Worker and local D1 database.

## Validation

```sh
npx tsc --noEmit
npm run build
```

The initial implementation was browser-checked for record creation, persistence after reload and checklist updates.

## Deployment

This is a server-backed application. GitHub Pages cannot run its Worker routes or D1 database. Uploading this source to GitHub does not deploy the working app or synchronise future changes to the existing hosted Site.

For a new hosted deployment, register the project with a compatible Worker host, configure the D1 binding `DB`, apply migrations and publish the Worker build. The hosting manifest in this repository deliberately excludes the original Site identity.

**Access control is required before storing personal records on any independent deployment.** The route handlers rely on the original host's private access gate; this repository does not implement a standalone authentication system.

## Data handling

Use placeholders such as `[EMAIL]`, `[ORCID]` and `[APPLICATION ID]` for sensitive identifiers. The app prompts users to redact identifiers but does not automatically detect or redact them. Avoid committing exports, application documents or private correspondence. Keep exported backups securely.

Templates are drafting structures. Verify all claims, citations and venue-specific requirements before submission.
