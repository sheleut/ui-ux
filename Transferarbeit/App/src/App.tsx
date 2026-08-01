import { useState } from "react";
import type { Customer } from "./types";
import { initialCustomers } from "./data";
import { InfoPage } from "./components/InfoPage";

type Screen = "home" | "list" | "form" | "about";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  note: ""
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("alle");

  const nextId = () =>
    customers.reduce((max, c) => Math.max(max, c.id), 0) + 1;

  const saveCustomer = () => {
    if (editId !== null) {
      setCustomers((list) =>
        list.map((c) =>
          c.id === editId
            ? {
                ...c,
                name: form.name,
                email: form.email,
                phone: form.phone,
                company: form.company,
                note: form.note
              }
            : c
        )
      );
    } else {
      setCustomers((list) => [
        ...list,
        {
          id: nextId(),
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          note: form.note
        }
      ]);
    }
    setForm(emptyForm);
    setEditId(null);
    setScreen("list");
  };

  const startEdit = (c: Customer) => {
    setEditId(c.id);
    setForm({
      name: c.name,
      email: c.email,
      phone: c.phone,
      company: c.company,
      note: c.note
    });
    setScreen("form");
  };

  const removeCustomer = (id: number) => {
    setCustomers((list) => list.filter((c) => c.id !== id));
  };

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q);
    const matchesFilter =
      filterStatus === "alle" ||
      (filterStatus === "mit" && c.note) ||
      (filterStatus === "ohne" && !c.note);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      <div className="top-bar">
        <span className="logo">KV</span>
        <span className="title">Kundenverwaltung v0.1</span>
        <span
          className="nav-link"
          onClick={() => setScreen("home")}
        >
          Start
        </span>
        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setScreen("list"); }}>
          Daten
        </a>
        <span
          className="nav-link"
          onClick={() => {
            setEditId(null);
            setForm(emptyForm);
            setScreen("form");
          }}
        >
          Eingabe
        </span>
        <button type="button" className="nav-btn" onClick={() => setScreen("about")}>
          ?
        </button>
        <span className="nav-link" onClick={() => setScreen("list")}>
          Kunden
        </span>
      </div>

      <div className="side-hint">
        <p>→ Hier navigieren</p>
        <p style={{ fontSize: "9px", color: "#bbb" }}>Liste ist unter Daten</p>
      </div>

      {screen === "home" && (
        <section className="block">
          <h1>Willkommen</h1>
          <p>
            System für Kunden. Bitte Bereich wählen. Die Tabelle finden Sie nicht
            auf dieser Seite.
          </p>
          <input placeholder="Schnellsuche (noch nicht aktiv)" />
          <br />
          <br />
          <span className="fake-btn" onClick={() => setScreen("form")}>
            Neuen Kunden
          </span>
          <span className="fake-btn" onClick={() => setScreen("list")}>
            Zur Übersicht
          </span>
        </section>
      )}

      {screen === "about" && <InfoPage onBvisack={() => setScreen("home")} />}

      {screen === "list" && (
        <section className="block list-block">
          <h2>Übersicht</h2>

          <div className="toolbar messy">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="suchen"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              title=""
            >
              <option value="alle">alle</option>
              <option value="mit">mit Notiz</option>
              <option value="ohne">ohne Notiz</option>
            </select>
            <button type="button" className="sort-btn">
              Sortieren
            </button>
            <button
              type="button"
              className="add-mini"
              onClick={() => {
                setEditId(null);
                setForm(emptyForm);
                setScreen("form");
              }}
            >
              +
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Info</th>
                <th>K1</th>
                <th>K2</th>
                <th>Extra</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone || "—"}</td>
                  <td>{c.company}</td>
                  <td className="actions">
                    <span
                      className="action"
                      onClick={() => startEdit(c)}
                    >
                      ✎
                    </span>
                    <span
                      className="action delete"
                      onClick={() => removeCustomer(c.id)}
                    >
                      x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && customers.length > 0 && (
            <p className="empty-hint">Keine Treffer (Filter prüfen?)</p>
          )}

          <div className="below-table">
            <span
              className="fake-btn"
              onClick={() => {
                setEditId(null);
                setForm(emptyForm);
                setScreen("form");
              }}
            >
              nochmal hinzufügen
            </span>
          </div>
        </section>
      )}

      {screen === "form" && (
        <section className="block form-block">
          <h2>{editId ? "Bearbeiten" : "Neu"}</h2>
          <p className="form-hint">
            Felder ausfüllen und unten speichern. Pflichtfelder sind nicht
            markiert.
          </p>

          <div className="form-row">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name / Firma"
            />
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Mail"
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Tel"
            />
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Unternehmen optional"
            />
          </div>
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Notiz"
            rows={2}
          />

          <div className="form-actions">
            <span className="save-link" onClick={saveCustomer}>
              speichern
            </span>
            <span
              className="cancel-link"
              onClick={() => {
                setForm(emptyForm);
                setEditId(null);
                setScreen("list");
              }}
            >
              abbrechen
            </span>
            <button type="button" className="ghost-btn" onClick={saveCustomer}>
              OK
            </button>
          </div>

          <p className="duplicate-nav">
            <span onClick={() => setScreen("list")}>← Liste</span>
            {" | "}
            <span onClick={() => setScreen("home")}>Startseite</span>
          </p>
        </section>
      )}

      <footer className="footer">
        <span onClick={() => setScreen("list")}>Daten</span>
        {" · "}
        <span onClick={() => setScreen("form")}>Eingabe</span>
        {" · "}
        <a href="#">Impressum</a>
        <p className="footer-note">© 2026 — keine aktive Seite markiert</p>
      </footer>
    </div>
  );
}
