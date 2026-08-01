import { useState } from "react";
import type { Customer } from "./types";
import { initialCustomers } from "./data";
import { InfoPage } from "./components/InfoPage";
import { HomePage } from "./components/HomePage";
import { CustomerList } from "./components/CustomerList";
import { CustomerForm } from "./components/CustomerForm";
import {
  TabList, Tab, Dialog, DialogSurface, DialogBody, DialogTitle,
  DialogContent, DialogActions, Button,
} from "@fluentui/react-components";

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

  const [deleteCandidate, setDeleteCandidate] = useState<Customer | null>(null);

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

    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
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
          onDelete={(id) => {
            const c = customers.find((x) => x.id === id);
              if (c) setDeleteCandidate(c);
          }}                                             
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

    </main>

<footer className="footer">
  <p className="footer-note">© 2026 Kundenverwaltung</p>
</footer>
  <Dialog
  open={deleteCandidate !== null}
  onOpenChange={(_, data) => { if (!data.open) setDeleteCandidate(null); }}
>
  <DialogSurface>
    <DialogBody>
      <DialogTitle>Kunde löschen?</DialogTitle>
      <DialogContent>
        Möchten Sie „{deleteCandidate?.name}" wirklich löschen? Diese Aktion
        kann nicht rückgängig gemacht werden.
      </DialogContent>
      <DialogActions>
        <Button appearance="secondary" onClick={() => setDeleteCandidate(null)}>
          Abbrechen
        </Button>
        <Button
          appearance="primary"
          onClick={() => {
            if (deleteCandidate) removeCustomer(deleteCandidate.id);
            setDeleteCandidate(null);
          }}
        >
          Löschen
        </Button>
      </DialogActions>
    </DialogBody>
  </DialogSurface>
</Dialog>
    </div>
  );
}
