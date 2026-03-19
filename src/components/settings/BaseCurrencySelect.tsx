"use client";

import { useEffect, useState } from "react";
import { BASE_CURRENCY_STORAGE_KEY } from "@/lib/constants";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";

const CURRENCIES = ["AUD", "HKD", "USD", "EUR", "GBP"];

export function BaseCurrencySelect() {
  const [currency, setCurrency] = useState("USD");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(BASE_CURRENCY_STORAGE_KEY);

    if (stored && CURRENCIES.includes(stored)) {
      setCurrency(stored);
    }

    setReady(true);
  }, []);

  function handleChange(nextCurrency: string) {
    setCurrency(nextCurrency);
    window.localStorage.setItem(BASE_CURRENCY_STORAGE_KEY, nextCurrency);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="base-currency">
        Base currency
      </Label>
      <Select
        id="base-currency"
        value={currency}
        onChange={(event) => handleChange(event.target.value)}
        disabled={!ready}
      >
        {CURRENCIES.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <p className="text-sm text-muted-foreground">
        Starter UI only. Persisted locally for now until workspace settings are backed by Supabase.
      </p>
    </div>
  );
}
