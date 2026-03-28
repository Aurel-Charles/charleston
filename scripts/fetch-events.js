#!/usr/bin/env node
/**
 * fetch-events.js
 * Fetches upcoming events from the Facebook Graph API for Le Charleston
 * and writes the result to data/events.json.
 *
 * Required environment variables:
 *   PAGE_ID               — Facebook Page numeric ID
 *   FACEBOOK_ACCESS_TOKEN — Page access token (long-lived)
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../data/events.json");

const PAGE_ID = process.env.PAGE_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

if (!PAGE_ID || !ACCESS_TOKEN) {
  console.error(
    "[fetch-events] ERROR: Missing required environment variables PAGE_ID and/or FACEBOOK_ACCESS_TOKEN."
  );
  console.error("[fetch-events] Skipping fetch — existing data/events.json left unchanged.");
  process.exit(0);
}

const FIELDS = [
  "id",
  "name",
  "description",
  "start_time",
  "end_time",
  "cover",
  "place",
  "ticket_uri",
].join(",");

const API_VERSION = "v19.0";
const URL = `https://graph.facebook.com/${API_VERSION}/${PAGE_ID}/events?fields=${FIELDS}&time_filter=upcoming&limit=50&access_token=${ACCESS_TOKEN}`;

async function fetchAllEvents() {
  let allEvents = [];
  let nextUrl = URL;

  while (nextUrl) {
    const response = await fetch(nextUrl);

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Facebook API responded with ${response.status}: ${body}`);
    }

    const json = await response.json();

    if (json.error) {
      throw new Error(`Facebook API error: ${json.error.message} (code ${json.error.code})`);
    }

    if (Array.isArray(json.data)) {
      allEvents = allEvents.concat(json.data);
    }

    // Follow pagination cursors
    nextUrl = json.paging?.next ?? null;
  }

  return allEvents;
}

async function main() {
  console.log(`[fetch-events] Fetching events for page ${PAGE_ID}…`);

  try {
    const events = await fetchAllEvents();
    console.log(`[fetch-events] Retrieved ${events.length} upcoming event(s).`);

    writeFileSync(OUTPUT_PATH, JSON.stringify(events, null, 2), "utf-8");
    console.log(`[fetch-events] Written to ${OUTPUT_PATH}`);
  } catch (err) {
    console.error(`[fetch-events] ERROR: ${err.message}`);
    console.error("[fetch-events] Skipping write — existing data/events.json left unchanged.");
    // Exit 0 so CI does not fail
    process.exit(0);
  }
}

main();
