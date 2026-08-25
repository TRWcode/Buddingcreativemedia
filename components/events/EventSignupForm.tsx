"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { submitEventSignup } from "@/app/events/actions";
import { buttonClasses } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { CheckIcon } from "@/components/ui/icons";
import { eventSignupFields, eventSignupPage } from "@/lib/content/events";
import type { EventItem } from "@/lib/content/events";
import { emptyFormState, honeypotField } from "@/lib/content/forms";
import { privacyHref, termsHref } from "@/lib/content/site";

/**
 * Het aanmeldformulier van één event.
 *
 * Zelfde opbouw als het contactformulier — server action, `useActionState`,
 * werkt zonder JavaScript — en dezelfde veldweergave, zodat de twee er niet
 * verschillend uit gaan zien.
 *
 * Het event zit als verborgen veld in het formulier. Dat is geen beveiliging:
 * de action zoekt het event zelf op en controleert of de inschrijving open is,
 * want een verborgen veld is net zo goed te veranderen als een zichtbaar veld.
 */
export function EventSignupForm({ event }: { event: EventItem }) {
  const [state, formAction, pending] = useActionState(submitEventSignup, emptyFormState);
  const idPrefix = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error") errorRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="scroll-mt-28 rounded-card border border-hairline-strong bg-surface p-8 outline-none stack:p-10"
      >
        <span className="mb-5 flex size-12 items-center justify-center rounded-icon bg-brand text-white">
          <CheckIcon className="size-6" />
        </span>
        <h2 className="mb-3 font-display text-[1.6rem] font-bold uppercase leading-[1.1] tracking-title">
          {eventSignupPage.successHeading}
        </h2>
        <p className="leading-[1.7] text-muted">{eventSignupPage.successBody}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-5 stack:grid-cols-2">
      <input type="hidden" name="eventId" value={event.id} />

      {/* Onzichtbaar voor bezoekers, onweerstaanbaar voor bots. */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${idPrefix}-${honeypotField}`}>Website</label>
        <input
          id={`${idPrefix}-${honeypotField}`}
          name={honeypotField}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "error" && state.message ? (
        <p
          ref={errorRef}
          tabIndex={-1}
          className="scroll-mt-28 rounded-mark border border-brand/40 bg-brand/10 px-4 py-3.5 text-[0.92rem] text-bone outline-none stack:col-span-2"
        >
          {state.message}
        </p>
      ) : null}

      {eventSignupFields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          idPrefix={idPrefix}
          error={state.errors[field.name]}
          value={state.values[field.name] ?? (field.name === "aantal" ? "1" : undefined)}
        />
      ))}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 stack:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className={buttonClasses(
            "primary",
            "md",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {pending ? eventSignupPage.submitPendingLabel : eventSignupPage.submitLabel}
          <span
            aria-hidden
            className="leading-none transition-transform duration-base ease-interact group-hover/btn:translate-x-1"
          >
            &rarr;
          </span>
        </button>

        <p className="max-w-[24rem] text-[0.82rem] leading-[1.5] text-muted">
          Zie de{" "}
          <a href={termsHref} className="text-bone underline underline-offset-2 hover:text-brand">
            algemene voorwaarden
          </a>{" "}
          en de{" "}
          <a href={privacyHref} className="text-bone underline underline-offset-2 hover:text-brand">
            privacyverklaring
          </a>
          .
        </p>
      </div>
    </form>
  );
}
