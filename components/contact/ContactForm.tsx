"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { submitContactForm } from "@/app/contact/actions";
import { emptyContactState } from "@/app/contact/state";
import { buttonClasses } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import {
  contactFields,
  contactPage,
  emptyOptionLabel,
  honeypotField,
} from "@/lib/content/contact";
import type { ContactField } from "@/lib/content/contact";
import { privacyHref } from "@/lib/content/site";

const fieldBase =
  "w-full rounded-mark border bg-surface px-4 py-3.5 text-bone " +
  "placeholder:text-muted/70 transition-colors duration-fast";

function fieldClasses(invalid: boolean): string {
  return cn(fieldBase, invalid ? "border-brand" : "border-hairline-strong hover:border-hairline-loud");
}

function Field({
  field,
  idPrefix,
  error,
  value,
}: {
  field: ContactField;
  idPrefix: string;
  error?: string;
  value?: string;
}) {
  const id = `${idPrefix}-${field.name}`;
  const errorId = `${id}-error`;
  const invalid = Boolean(error);

  const shared = {
    id,
    name: field.name,
    defaultValue: value ?? "",
    required: field.required,
    autoComplete: field.autoComplete,
    "aria-invalid": invalid || undefined,
    "aria-describedby": invalid ? errorId : undefined,
    className: fieldClasses(invalid),
  };

  return (
    <div className={field.half ? undefined : "stack:col-span-2"}>
      <label htmlFor={id} className="mb-2 block text-[0.9rem] font-medium text-bone">
        {field.label}
        {field.required ? <span className="ml-1 text-brand">*</span> : null}
      </label>

      {field.type === "textarea" ? (
        <textarea {...shared} rows={6} placeholder={field.placeholder} className={cn(shared.className, "resize-y")} />
      ) : field.type === "select" ? (
        <div className="relative">
          <select {...shared} className={cn(shared.className, "appearance-none pr-11")}>
            <option value="">{emptyOptionLabel}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          >
            &#9662;
          </span>
        </div>
      ) : (
        <input {...shared} type={field.type} placeholder={field.placeholder} />
      )}

      {field.hint ? <p className="mt-2 text-[0.82rem] text-muted">{field.hint}</p> : null}
      {error ? (
        <p id={errorId} className="mt-2 text-[0.82rem] text-brand">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Het contactformulier.
 *
 * Draait op een server action met `useActionState`, zodat het ook zonder
 * JavaScript werkt: de browser post het formulier dan gewoon en krijgt dezelfde
 * server-gerenderde uitkomst terug. Dat is voor een formulier dat de enige
 * ingang tot een opdracht is het verschil tussen een gemiste aanvraag en een
 * binnengekomen aanvraag.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, emptyContactState);
  const idPrefix = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Na het versturen springt de focus naar de uitkomst. Zonder dit blijft de
  // focus op de verzendknop staan en merkt iemand die met een schermlezer of
  // met het toetsenbord werkt niet dat er iets veranderd is: de melding staat
  // dan boven de plek waar hij zich bevindt.
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
        <h3 className="mb-3 font-display text-[1.6rem] font-bold uppercase leading-[1.1] tracking-title">
          Aanvraag verstuurd
        </h3>
        <p className="leading-[1.7] text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    // Browservalidatie bewust aan: die meldt een leeg verplicht veld direct,
    // zonder rondje langs de server. De controle in de action blijft de
    // uiteindelijke: die geldt ook als er geen JavaScript draait.
    <form action={formAction} className="grid gap-5 stack:grid-cols-2">
      {/* Onzichtbaar voor bezoekers, onweerstaanbaar voor bots. Niet met
          `hidden` of `display:none`: veel invulsoftware slaat die juist over. */}
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

      {contactFields.map((field) => (
        <Field
          key={field.name}
          field={field}
          idPrefix={idPrefix}
          error={state.errors[field.name]}
          value={state.values[field.name]}
        />
      ))}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 stack:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className={buttonClasses("primary", "md", "disabled:cursor-not-allowed disabled:opacity-60")}
        >
          {pending ? contactPage.submitPendingLabel : contactPage.submitLabel}
          <span
            aria-hidden
            className="leading-none transition-transform duration-base ease-interact group-hover/btn:translate-x-1"
          >
            &rarr;
          </span>
        </button>

        <p className="max-w-[22rem] text-[0.82rem] leading-[1.5] text-muted">
          We gebruiken je gegevens alleen om je aanvraag te beantwoorden. Zie de{" "}
          <a href={privacyHref} className="text-bone underline underline-offset-2 hover:text-brand">
            privacyverklaring
          </a>
          .
        </p>
      </div>
    </form>
  );
}
