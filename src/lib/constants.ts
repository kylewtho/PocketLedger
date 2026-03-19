export const APP_NAME = "PocketLedger";
export const APP_DESCRIPTION = "A personal finance tracker";
export const SESSION_COOKIE_NAME = "pocketledger_session";
export const BASE_CURRENCY_STORAGE_KEY = "pocketledger_base_currency";
export const DEFAULT_WORKSPACE_ID = "00000000-0000-0000-0000-000000000001";
export const DEFAULT_BASE_CURRENCY = "USD";

export const NAV_HREFS = ["/dashboard", "/accounts", "/entries", "/settings"] as const;
export type NavHref = (typeof NAV_HREFS)[number];
