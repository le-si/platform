import React from "react";
import { Link } from "react-router-dom";

export function Support() {
  return (
    <div className="flex h-full flex-col justify-between gap-2 ">
      <Link
        to="/logout"
        className="text-brand-600 dark:text-brand-400 text-right font-medium hover:underline"
      >
        Log out
      </Link>
      <Link
        to="/support"
        className="text-brand-600 dark:text-brand-400 text-right font-medium hover:underline"
      >
        Contact us
      </Link>
      <a
        href="https://platform.stability.ai/docs/getting-started/credits-and-billing"
        className="text-brand-600 dark:text-brand-400 text-right font-medium hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Billing guide
      </a>
      <Link
        to="/prompt-guide"
        className="text-brand-600 dark:text-brand-400 text-right font-medium hover:underline"
      >
        Prompt guide
      </Link>
    </div>
  );
}
