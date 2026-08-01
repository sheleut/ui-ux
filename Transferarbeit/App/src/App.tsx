import { useState } from "react";
import type { Customer } from "./types";
import { initialCustomers } from "./data";
import { InfoPage } from "./components/InfoPage";
import { HomePage } from "./components/HomePage";
import { CustomerList } from "./components/CustomerList";
import { CustomerForm } from "./components/CustomerForm";
import { TabList, Tab } from "@fluentui/react-components";

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
        <TabList
          selectedValue={screen === "form" ? "list" : screen}
          onTabSelect={(_, data) => setScreen(data.value as Screen)}
        >
          <Tab value="home">Übersicht</Tab>
          <Tab value="list">Kunden</Tab>
          <Tab value="about">Info</Tab>
        </TabList>
      </div>

      <div className="side-hint">
        <p>→ Hier navigieren</p>
        <p style={{ fontSize: "9px", color: "#bbb" }}>Liste ist unter Daten</p>
      </div>

      {screen === "home" && (
        <HomePage 
          onShowList={() => setScreen("list")}
          onNewCustomer={() => {
            setForm(emptyForm); 
            setEditId(null);
            setScreen("form");
          }}
          />
      )}

      {screen === "about" && <InfoPage onBack={() => setScreen("home")} />}

      {screen === "list" && (
        <CustomerList
          customers={filtered}
          search={search}
          onSearchChange={setSearch}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          onEdit={startEdit}
          onDelete={removeCustomer}
          onNewCustomer={() => { setForm(emptyForm); setEditId(null); setScreen("form"); }}
        />
      )}

      {screen === "form" && (
        <CustomerForm
          form={form}
          isEdit={editId !== null}
          onChange={setForm}
          onSave={saveCustomer}
          onCancel={() => setScreen("list")}
        />
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
