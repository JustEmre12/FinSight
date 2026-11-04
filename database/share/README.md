# FinSight database sharing package

This folder is the **safe, copyable version of the FinSight database** for teammates.

It does **not** contain a MongoDB password, connection string, API key, or any private user information.

## What this package represents

The live database is hosted in **MongoDB Atlas**:

- Atlas project: **FinSight**
- Cluster: **FinSight-MVP**
- Database: **finsight**
- Free tier
- AWS US_EAST_1
- MongoDB 8.0.x

At the time this package was generated, every collection had **0 documents**, so the collection JSON files are intentionally empty arrays. The useful part of the database right now is its **collection structure, indexes, validation design, and setup script**.

## Collections

- `user_profiles`
- `instruments`
- `quotes`
- `daily_prices`
- `watchlist_items`
- `analysis_runs`

## Best ways to share with teammates

### Option 1 — share this GitHub folder / ZIP

Use this when a teammate needs the database design for class work, development, review, or to recreate it.

Send them:
- this folder;
- `database/mongodb-init.js`;
- `docs/MONGODB_SCHEMA.md`.

They do **not** need your Atlas password for this.

### Option 2 — invite them to the same MongoDB Atlas project

Use this when a teammate needs to work on the **same live database**. Invite their own MongoDB Atlas account to the **FinSight** project with the minimum role they need.

Do **not** share the `finsight_app` password in Discord, text messages, GitHub, email, or a class document.

### Option 3 — export actual data later

Right now there is no user/market data to export. Once the database has real data, create a backup outside GitHub using MongoDB Database Tools, for example:

```bash
mongodump --uri "$MONGODB_URI" --db finsight --archive=finsight.archive --gzip
```

A teammate can restore that private backup with:

```bash
mongorestore --uri "$THEIR_MONGODB_URI" --archive=finsight.archive --gzip
```

**Do not commit a future dump containing real users, emails, watchlists, holdings, AI chats, or other private data to this public repository.**

## Recreating the current empty database

The repository already contains:

- [live database notes](../README.md)
- [MongoDB initializer](../mongodb-init.js)
- [MongoDB schema](../../docs/MONGODB_SCHEMA.md)
- [MongoDB readiness](../../docs/MONGODB_READINESS.md)

The initializer contains the strict validation and uniqueness rules that the Atlas connector could not apply directly.

## GitHub vs MongoDB

GitHub stores the **database definition and code**. MongoDB Atlas stores the **live database**.

They are related, but Atlas is not physically stored inside the GitHub repository. The application will become connected when the backend uses a secure `MONGODB_URI` environment variable and server-side MongoDB code. The secret must stay outside GitHub.
