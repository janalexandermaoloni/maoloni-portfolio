# Alexander Maoloni — portfolio (progetto d'esame)

Sito portfolio personale **statico**, editoriale/handmade, tutto **HTML + CSS + JavaScript vanilla**
(zero framework, zero dipendenze). Il design è quello originale — questa versione aggiunge, *senza
modificarne lo stile*, tutto il necessario per soddisfare i requisiti d'esame.

## Pagine (8)
| Pagina | File | Contenuto |
|---|---|---|
| Homepage | `index.html` | Hero, **carousel** progetti, servizi, lavori, estratto bio + **download CV**, **form contatti**, cookie banner |
| Bio | `bio.html` | Storia/competenze/formazione, testo+immagini alternati con `<figure>`+`<figcaption>`, **lightbox**, CTA → portfolio |
| Portfolio | `portfolio.html` | Progetti con didascalie, **lightbox**, link a dettaglio + sito esterno, CTA → contatti |
| Lavoro 1–3 | `lavoro-1/2/3.html` | **Carousel** (3+ immagini, lightbox), testo SEO (progetto, cliente, tecnologie, processo, risultati), CTA preventivo |
| Contatti | `contatti.html` | **Form** completo (con checkbox privacy), **iframe Google Maps**, orari/indirizzo/contatti |
| Privacy / T&C | `privacy.html` | Privacy policy, cookie, termini e condizioni |

## File
```
index.html · bio.html · portfolio.html · lavoro-1..3.html · contatti.html · privacy.html
styles.css      → design system originale (token, tipografia, layout, componenti, pagine)
pages.css       → componenti aggiunti (footer, cookie, carousel, lightbox, form, layout pagine)
theme-init.js   → applica il tema salvato prima del paint (in <head>, esterno)
script.js       → comportamenti header/reveal/parallax della home
nav.js          → header (tema, hamburger, sticky, reveal) sulle pagine interne
features.js     → cookie banner, carousel, lightbox, validazione form (vanilla, nessuna libreria)
cv.pdf          → CV scaricabile
assets/         → illustrazioni SVG + favicon.png + avatar
```

## Requisiti d'esame — coperti
- ✅ 8 pagine · **header identico** con voce **attiva** evidenziata · **footer identico** con link a `privacy.html`
- ✅ Tag **semantici** (`header, nav, main, section, article, aside, footer, figure`) · un solo `<h1>` per pagina
- ✅ **CSS solo esterno**, zero stili inline · **JS solo esterno**, zero script inline
- ✅ **Favicon** `.png` in ogni pagina · **cookie banner** con `localStorage` (prima visita, home)
- ✅ **Carousel** (home + lavori) · **lightbox** (bio, portfolio, lavori) · **form** (home + contatti, con `<label>`, `required`, `type="email"`)
- ✅ **iframe Google Maps** · **CTA** di chiusura (bio/portfolio/lavori) · **download CV**
- ✅ **SEO**: `<title>` e `meta description` unici, **Open Graph**, `alt` su ogni immagine · URL minuscoli con trattini
- ✅ **Responsive** mobile-first (375 → 1920px+), hamburger su mobile · menu tema chiaro/scuro

## Pubblicare online (ultimo passo, da fare tu)
Il sito è già pronto. Scegli uno:
- **Netlify Drop** (più veloce): vai su app.netlify.com/drop e **trascina la cartella** `maoloni-portfolio`. Online in ~10s.
- **GitHub Pages**: crea un repo, carica i file, Settings → Pages → branch `main` / root.

## Da personalizzare (segnaposto)
- **Telefono** (`+39 351 000 0000`) e **indirizzo/mappa** (ora Milano Duomo) → i tuoi reali.
- **Social** nel footer/contatti → i tuoi profili (ora puntano alle home delle piattaforme).
- **CV** → `cv.pdf` è generato dai dati del sito; sostituiscilo col tuo se vuoi.
- I **link ai progetti** (orbitweb.net, fieldsnotesai.com, sole.digital) sono già quelli reali.
- Per l'esame conviene sostituire `og:url`/`og:image` con l'URL assoluto reale dopo la pubblicazione.

## Design system
- **Palette 2 accenti:** blu `#2F5FAF` + carta/inchiostro (`#F4EDDE` / `#221E1A`) · dark di default + toggle light.
- **Font (Google Fonts):** Bricolage Grotesque (display), Inter (testo), Caveat (accenti a mano).

— made by hand ✦
