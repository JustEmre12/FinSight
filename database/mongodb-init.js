/*
 * FinSight MongoDB database integrity initializer
 *
 * Run with mongosh using a secure server-side MONGODB_URI.
 * Example:
 *   mongosh "$MONGODB_URI" --file database/mongodb-init.js
 *
 * This script applies the constraints that the ChatGPT MongoDB Atlas connector
 * cannot currently express directly: collection JSON Schema validators and
 * unique index options.
 *
 * It does NOT insert sample market data or application users.
 */

const dbName = "finsight";
const target = db.getSiblingDB(dbName);

function applyValidator(collection, jsonSchema) {
  target.runCommand({
    collMod: collection,
    validator: { $jsonSchema: jsonSchema },
    validationLevel: "strict",
    validationAction: "error"
  });
}

function ensureUniqueIndex(collectionName, indexName, keys) {
  const coll = target.getCollection(collectionName);
  const existing = coll.getIndexes().find(i => i.name === indexName);

  if (existing && existing.unique === true) {
    print(`[ok] ${collectionName}.${indexName} is already unique`);
    return;
  }

  if (existing) {
    print(`[change] replacing non-unique index ${collectionName}.${indexName}`);
    coll.dropIndex(indexName);
  }

  coll.createIndex(keys, { name: indexName, unique: true });
  print(`[ok] created unique index ${collectionName}.${indexName}`);
}

applyValidator("user_profiles", {
  bsonType: "object",
  required: ["auth_user_id", "email", "created_at", "updated_at", "status"],
  properties: {
    auth_user_id: { bsonType: "string", minLength: 1 },
    email: {
      bsonType: "string",
      pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"
    },
    display_name: { bsonType: "string" },
    created_at: { bsonType: "date" },
    updated_at: { bsonType: "date" },
    status: { enum: ["active", "disabled", "suspended"] }
  }
});

applyValidator("instruments", {
  bsonType: "object",
  required: [
    "symbol", "company_name", "exchange", "currency",
    "asset_type", "active", "created_at", "updated_at"
  ],
  properties: {
    symbol: { bsonType: "string", minLength: 1 },
    company_name: { bsonType: "string", minLength: 1 },
    exchange: { bsonType: "string", minLength: 1 },
    currency: { bsonType: "string", minLength: 3, maxLength: 3 },
    asset_type: { bsonType: "string", minLength: 1 },
    provider_symbol: { bsonType: "string" },
    active: { bsonType: "bool" },
    created_at: { bsonType: "date" },
    updated_at: { bsonType: "date" }
  }
});

applyValidator("quotes", {
  bsonType: "object",
  required: [
    "instrument_id", "symbol", "price", "currency", "provider",
    "quote_time", "retrieved_at", "delay_minutes", "freshness_status"
  ],
  properties: {
    instrument_id: { bsonType: "objectId" },
    symbol: { bsonType: "string" },
    price: { bsonType: ["decimal", "null"] },
    previous_close: { bsonType: ["decimal", "null"] },
    change: { bsonType: ["decimal", "null"] },
    change_percent: { bsonType: ["decimal", "null"] },
    currency: { bsonType: "string", minLength: 3, maxLength: 3 },
    provider: { bsonType: "string", minLength: 1 },
    quote_time: { bsonType: ["date", "null"] },
    retrieved_at: { bsonType: "date" },
    delay_minutes: { bsonType: "int", minimum: 0 },
    freshness_status: { enum: ["fresh", "delayed", "stale", "missing"] }
  }
});

applyValidator("daily_prices", {
  bsonType: "object",
  required: [
    "instrument_id", "symbol", "date", "close",
    "currency", "provider", "retrieved_at"
  ],
  properties: {
    instrument_id: { bsonType: "objectId" },
    symbol: { bsonType: "string" },
    date: { bsonType: "date" },
    close: { bsonType: "decimal" },
    open: { bsonType: "decimal" },
    high: { bsonType: "decimal" },
    low: { bsonType: "decimal" },
    volume: { bsonType: ["long", "decimal", "int"] },
    currency: { bsonType: "string", minLength: 3, maxLength: 3 },
    provider: { bsonType: "string", minLength: 1 },
    retrieved_at: { bsonType: "date" }
  }
});

applyValidator("watchlist_items", {
  bsonType: "object",
  required: ["user_id", "instrument_id", "symbol", "added_at"],
  properties: {
    user_id: { bsonType: ["objectId", "string"] },
    instrument_id: { bsonType: "objectId" },
    symbol: { bsonType: "string" },
    added_at: { bsonType: "date" }
  }
});

applyValidator("analysis_runs", {
  bsonType: "object",
  required: [
    "instrument_id", "symbol", "analysis_type",
    "requested_at", "status", "created_at"
  ],
  properties: {
    user_id: { bsonType: ["objectId", "string", "null"] },
    instrument_id: { bsonType: "objectId" },
    symbol: { bsonType: "string" },
    analysis_type: { bsonType: "string", minLength: 1 },
    requested_at: { bsonType: "date" },
    completed_at: { bsonType: ["date", "null"] },
    status: { enum: ["Requested", "Processing", "Completed", "Failed"] },
    data_as_of: { bsonType: ["date", "null"] },
    generator: { bsonType: ["string", "null"] },
    summary_reference: { bsonType: ["string", "null"] },
    error_code: { bsonType: ["string", "null"] },
    created_at: { bsonType: "date" }
  }
});

ensureUniqueIndex(
  "user_profiles",
  "idx_user_profiles_auth_user_id",
  { auth_user_id: 1 }
);
ensureUniqueIndex(
  "user_profiles",
  "idx_user_profiles_email",
  { email: 1 }
);
ensureUniqueIndex(
  "instruments",
  "idx_instruments_exchange_symbol",
  { exchange: 1, symbol: 1 }
);
ensureUniqueIndex(
  "daily_prices",
  "idx_daily_prices_instrument_date_provider",
  { instrument_id: 1, date: 1, provider: 1 }
);
ensureUniqueIndex(
  "watchlist_items",
  "idx_watchlist_user_instrument",
  { user_id: 1, instrument_id: 1 }
);

print("FinSight MongoDB validators and unique indexes are configured.");
