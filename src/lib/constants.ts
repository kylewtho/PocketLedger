export const APP_NAME = "PocketLedger";
export const APP_DESCRIPTION = "A personal finance tracker";

export const NAV_HREFS = ["/dashboard", "/accounts", "/entries", "/settings"] as const;
export type NavHref = (typeof NAV_HREFS)[number];
