import { cn } from "@/lib/cn";
import { emptyOptionLabel } from "@/lib/content/forms";
import type { FormField as FormFieldData } from "@/lib/content/forms";

// `min-w-0` hoort op het veld zelf en niet alleen op de kolom eromheen: een
// `select` is van zichzelf zo breed als zijn langste optie en krimpt daar niet
// onder, ook niet met `w-full`. Zonder dit duwt "Fotografie en video" het hele
// formulier buiten beeld op een scherm van 320px.
const fieldBase =
  "w-full min-w-0 rounded-mark border bg-surface px-4 py-3.5 text-bone " +
  "placeholder:text-muted/70 transition-colors duration-fast";

function fieldClasses(invalid: boolean): string {
  return cn(
    fieldBase,
    invalid ? "border-brand" : "border-hairline-strong hover:border-hairline-loud",
  );
}

interface FormFieldProps {
  field: FormFieldData;
  /** Voorvoegsel voor de id, zodat twee formulieren op één pagina niet botsen. */
  idPrefix: string;
  error?: string;
  value?: string;
}

/**
 * Eén veld van een formulier, gerenderd uit zijn beschrijving.
 *
 * Gedeeld door het contactformulier en de aanmelding voor een event. Twee
 * kopieën van deze opmaak zouden vroeg of laat uit elkaar lopen, en dan zien
 * twee formulieren op dezelfde site er verschillend uit.
 */
export function FormField({ field, idPrefix, error, value }: FormFieldProps) {
  const id = `${idPrefix}-${field.name}`;
  const errorId = `${id}-error`;
  const invalid = Boolean(error);
  const span = field.half ? "min-w-0" : "min-w-0 stack:col-span-2";

  // Een checkbox heeft een eigen opbouw: het label staat ernaast en niet
  // erboven, en het vakje moet groot genoeg zijn om op een telefoon te raken.
  if (field.type === "checkbox") {
    return (
      <div className={span}>
        <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
          <input
            id={id}
            name={field.name}
            type="checkbox"
            defaultChecked={value === "ja"}
            value="ja"
            required={field.required}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? errorId : undefined}
            className={cn(
              "mt-0.5 size-5 shrink-0 accent-brand",
              invalid && "outline outline-2 outline-brand",
            )}
          />
          <span className="text-[0.92rem] leading-[1.5] text-muted">
            {field.label}
            {field.required ? <span className="ml-1 text-brand">*</span> : null}
          </span>
        </label>
        {error ? (
          <p id={errorId} className="mt-2 text-[0.82rem] text-brand">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

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
    <div className={span}>
      <label htmlFor={id} className="mb-2 block text-[0.9rem] font-medium text-bone">
        {field.label}
        {field.required ? <span className="ml-1 text-brand">*</span> : null}
      </label>

      {field.type === "textarea" ? (
        <textarea
          {...shared}
          rows={6}
          placeholder={field.placeholder}
          className={cn(shared.className, "resize-y")}
        />
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
        <input
          {...shared}
          type={field.type}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          inputMode={field.type === "number" ? "numeric" : undefined}
        />
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
