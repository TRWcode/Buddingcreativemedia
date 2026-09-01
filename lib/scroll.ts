"use client";

import type Lenis from "lenis";

/**
 * Eén plek die weet hoe deze site scrollt.
 *
 * Lenis stuurt de scroll van het hele document aan en schrijft elke frame zijn
 * eigen positie terug. Alles wat de pagina wil verplaatsen of stilzetten moet
 * dus langs die instantie: wie in plaats daarvan `window.scrollTo` aanroept of
 * `overflow: hidden` op de body zet, vecht met die rAF-lus en verliest.
 *
 * Dat is precies wat er misging in het mobiele menu. De overlay zette de body
 * op `overflow: hidden` en `SmoothScroll` liet Lenis tegelijk naar een sectie
 * vertrekken — de scroll begon terwijl de pagina nog op slot zat.
 */

let lenis: Lenis | null = null;

/** Hoeveel overlays het slot op dit moment vasthouden. */
let locks = 0;

/** Gezet door `SmoothScroll`; `null` zodra die instantie wordt opgeruimd. */
export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/**
 * Hoeveel ruimte er boven een sectie vrij moet blijven.
 *
 * Gemeten in plaats van vastgezet op een rond getal: de balk is op een telefoon
 * lager dan op een breed scherm en krimpt bovendien zodra je scrolt. Met een
 * vast getal schuift de kop van de sectie op de ene maat onder de balk en blijft
 * hij op de andere in het niets hangen.
 */
function headerOffset(): number {
  const header = document.querySelector("header");
  const height = header?.getBoundingClientRect().height ?? 72;
  return height + 16;
}

/**
 * Zet de achtergrond stil zolang een overlay open staat. Telt mee hoeveel
 * overlays het slot vasthouden, zodat de laatste die sluit hem ook echt opent.
 *
 * `lenis.stop()` is hier het slot en niet `overflow: hidden` op de body: Lenis
 * onderschept wiel- en touch-events zelf en blokkeert ze zodra hij stilstaat.
 * Dat werkt ook op iOS, waar `overflow: hidden` op de body de pagina eronder
 * gewoon laat meescrollen. Een element met `data-lenis-prevent` blijft wel
 * scrollen — dat is hoe het menu zelf scrollbaar blijft.
 */
export function lockScroll() {
  if (locks++ > 0) return;

  if (lenis) {
    lenis.stop();
  } else {
    // Geen Lenis (bezoeker heeft beweging afgezet): de browser scrollt native,
    // dus dan is dit het slot.
    document.documentElement.style.overflow = "hidden";
  }
}

export function unlockScroll() {
  if (locks === 0 || --locks > 0) return;

  lenis?.start();
  document.documentElement.style.overflow = "";
}

/**
 * Scrolt naar een sectie op de huidige pagina en geeft terug of dat gelukt is.
 *
 * Iedereen die naar een anker wil — de balk, het menu, de footer — gaat hier
 * langs, zodat een sectie overal op dezelfde hoogte onder de header uitkomt.
 */
export function scrollToHash(hash: string, options: { immediate?: boolean } = {}): boolean {
  if (hash.length < 2) return false;

  let target: Element | null = null;
  try {
    target = document.querySelector(hash);
  } catch {
    // Een hash die geen geldige selector is, bijvoorbeeld uit een oude link.
    return false;
  }
  if (!target) return false;

  const offset = -headerOffset();

  if (lenis) {
    // Lenis rekent de positie van een sectie uit als "waar staat hij in beeld"
    // plus "waar denk ik dat de pagina staat". Na een routewissel klopt dat
    // tweede getal nog niet — de router heeft de scroll dan al verzet zonder
    // dat Lenis het meekreeg — en dan landt de scroll er precies dat verschil
    // naast. `resize()` zet zijn boekhouding gelijk met de werkelijkheid en
    // meet meteen de nieuwe paginahoogte op.
    lenis.resize();
    // `force`: het slot kan nog een frame nadraaien als het menu net dichtgaat.
    lenis.scrollTo(target as HTMLElement, {
      offset,
      duration: 1.2,
      immediate: options.immediate,
      force: true,
    });
    return true;
  }

  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY + offset,
    behavior: options.immediate ? "auto" : "smooth",
  });
  return true;
}
