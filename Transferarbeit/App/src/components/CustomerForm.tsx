import type { Customer } from "../types";

type CustomerFormProps = {
  form: Omit<Customer, "id">;
  isEdit: boolean;
  onChange: (form: Omit<Customer, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function CustomerForm({
  form,
  isEdit,
  onChange,
  onSave,
  onCancel,
}: CustomerFormProps) {
  return (
        <section className="block form-block">
          <h2>{isEdit ? "Bearbeiten" : "Neu"}</h2>
          <p className="form-hint">
            Felder ausfüllen und unten speichern. Pflichtfelder sind nicht
            markiert.
          </p>

          <div className="form-row">
            <input
              type="text"
              value={form.name}
              onChange={(e) => onChange({ ...form, name: e.target.value })}
              placeholder="Name / Firma"
            />
            <input
              type="text"
              value={form.email}
              onChange={(e) => onChange({ ...form, email: e.target.value })}
              placeholder="Mail"
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              value={form.phone}
              onChange={(e) => onChange({ ...form, phone: e.target.value })}
              placeholder="Tel"
            />
            <input
              type="text"
              value={form.company}
              onChange={(e) => onChange({ ...form, company: e.target.value })}
              placeholder="Unternehmen optional"
            />
          </div>
          <textarea
            value={form.note}
            onChange={(e) => onChange({ ...form, note: e.target.value })}
            placeholder="Notiz"
            rows={2}
          />

          <div className="form-actions">
            <span className="save-link" onClick={onSave}>
              speichern
            </span>
            <span
              className="cancel-link"
              onClick={() => {
                onCancel();
              }}
            >
              abbrechen
            </span>
            <button type="button" className="ghost-btn" onClick={onSave}>
              OK
            </button>
          </div>

          <p className="duplicate-nav">
            <span onClick={onCancel}>← Liste</span>
            {" | "}
            <span onClick={onCancel}>Startseite</span>
          </p>
        </section>
  );
}