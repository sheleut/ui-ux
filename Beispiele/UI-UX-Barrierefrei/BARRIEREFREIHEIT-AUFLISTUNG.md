# Auflistung: Eingefuehrte Barrierefreiheits-Massnahmen

Diese Datei dokumentiert, welche Barrierefreiheits-Massnahmen in diesem UI/UX-Beispiel umgesetzt wurden und welchen konkreten Nutzen sie fuer Menschen mit Behinderungen haben.

| Eingefuehrte Massnahme | Nutzen fuer Menschen mit Behinderungen |
| --- | --- |
| **Skip-Link** (`Zum Hauptinhalt springen`) am Seitenanfang | Menschen, die nur mit Tastatur oder Screenreader navigieren, koennen wiederkehrende Navigation direkt ueberspringen und schneller zum Inhalt gelangen. |
| **Landmarken und Semantik** (`main`, `section`, `nav`, sinnvolle Ueberschriftenstruktur) | Screenreader koennen die Seite besser strukturieren; Nutzerinnen und Nutzer mit Sehbeeintraechtigung finden Inhalte schneller und verstehen den Aufbau leichter. |
| **ARIA-Beschriftungen** (`aria-label`, `aria-labelledby`) | Bedien- und Inhaltsbereiche erhalten klare Namen fuer assistive Technologien. Das verbessert Orientierung und Verstaendlichkeit fuer blinde und stark sehbeeintraechtigte Personen. |
| **Live-Regionen** (`aria-live="polite"` mit Status-Texten) | Dynamische Statusaenderungen (z. B. im Zahlungsablauf) werden vorgelesen, ohne dass der Fokus verloren geht. Das hilft besonders Screenreader-Nutzenden. |
| **Bild mit alternativem Text** (`alt` am Produktbild) | Visuelle Informationen werden als Text bereitgestellt. Blinde Nutzerinnen und Nutzer verstehen den Bildinhalt ueber Screenreader. |
| **Dekorative Emojis ausgeblendet** (`aria-hidden="true"`) | Unnoetige visuelle Symbole werden nicht stoerend vorgelesen. Das reduziert akustische Belastung und verbessert die Informationsqualitaet bei Screenreadern. |
| **Klar beschriftete Buttons und Links** (z. B. `Jetzt kaufen - zur Zahlung`, `Weiter zur Versand-Mail`) | Eindeutige Aktionen helfen Menschen mit kognitiven Einschraenkungen, Lernschwierigkeiten oder Screenreader-Nutzung, die richtige Entscheidung schneller zu treffen. |
| **Sichtbarer Fokuszustand** (`:focus-visible` mit deutlicher Outline) | Menschen, die per Tastatur navigieren (z. B. motorische Einschraenkungen), sehen jederzeit klar, welches Element gerade aktiv ist. |
| **Tastaturbedienbarkeit interaktiver Elemente** (Buttons, Schritt-Navigation, Jump-Buttons) | Nutzerinnen und Nutzer ohne Maus koennen alle zentralen Funktionen erreichen und bedienen. |
| **Fortschritt mit Text + `progress`-Element** (`Aktueller Schritt`, Fortschrittsbalken) | Informationen sind nicht nur visuell codiert. Das verbessert Nutzbarkeit fuer Screenreader sowie fuer Menschen mit eingeschraenkter Wahrnehmung komplexer Oberflaechen. |
| **Nicht nur Farbe/Symbolik zur Vermittlung** (zusaetzliche Texte, Ueberschriften, Kontext) | Menschen mit Farbsehschwaeche oder kognitiven Einschraenkungen erhalten die gleiche Information unabhaengig von Farbe oder Symbolen. |
| **Ausreichende Kontraste und klare Typografie** (dunkler Text auf hellem Hintergrund, gut lesbare Groessen) | Menschen mit Sehbeeintraechtigungen, Kontrastsensitivitaet oder altersbedingter Sehschwaeche koennen Inhalte leichter lesen. |
| **`prefers-reduced-motion` beruecksichtigt** (Animationen/Transitions reduziert) | Menschen mit vestibulaeren Einschraenkungen oder Motion-Sickness werden durch reduzierte Bewegung weniger belastet. |
| **Responsives Layout** (Anpassung auf kleine Bildschirme) | Bessere Nutzbarkeit bei Zoom, mobilen Geraeten und vergroesserter Darstellung; hilfreich bei Sehbeeintraechtigungen und motorischen Einschraenkungen. |

## Kurzfazit

Die Umsetzung verbessert die vier zentralen Bereiche aus eCH-0059 sichtbar:
- **Wahrnehmbarkeit** (z. B. Kontrast, Alt-Text, klare Struktur),
- **Bedienbarkeit** (z. B. Tastatur, Fokus, Skip-Link),
- **Verstaendlichkeit** (z. B. klare Beschriftungen, konsistente Navigation),
- **Robustheit** (z. B. semantisches HTML, ARIA, Live-Regionen).
