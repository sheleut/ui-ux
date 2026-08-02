import type { Customer } from "../types";
import { Field, Input, Textarea, Button, 
          Card, CardHeader, Text, Title2, } from "@fluentui/react-components";
import { useState } from "react";


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
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
    const validate = () => {
        const next: { name?: string; email?: string } = {};
        if (!form.name.trim()) next.name = "Name ist erforderlich.";
        if (!form.email.trim()) {
            next.email = "E-Mail ist erforderlich.";
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            next.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
        }
        setErrors(next);
    return Object.keys(next).length === 0;
};

const handleSave = () => {
  if (validate()) onSave();
};
    return (
        <Card>
            <CardHeader header={<Title2>{isEdit ? "Kunde bearbeiten" : "Neuen Kunden erfassen"}</Title2>} />
            <Text>
                Erfassen Sie die Kundendaten. Pflichtfelder sind mit * gekennzeichnet.  
            </Text>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
          </div>
          <div className="form-row">
            <Field
                label="Name / Firma"
                required
                validationState={errors.name ? "error" : "none"}
                validationMessage={errors.name}
                >
            <Input
                value={form.name}
                onChange={(_, data) => onChange({ ...form, name: data.value })}
                />
            </Field>
            <Field
                label="Mail"
                required
                validationState={errors.email ? "error" : "none"}
                validationMessage={errors.email}
                > 
              <Input  
              value={form.email}
              onChange={(_, data) => onChange({ ...form, email: data.value })}
              />
            </Field>
          </div>
          <div className="form-row">
            <Field
              label="Tel"
              >
            <Input  
              value={form.phone}
              onChange={(_, data) => onChange({ ...form, phone: data.value })}
            />
            </Field>
            <Field
              label="Firma"
              >
            <Input
              value={form.company}
              onChange={(_, data) => onChange({ ...form, company: data.value })}
            />
            </Field>
          </div>
            <Field
              label="Notiz"
              >
              <Textarea
                value={form.note}
                onChange={(_, data) => onChange({ ...form, note: data.value })}
                rows={2}
              />
            </Field>

          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            <Button appearance="primary" onClick={handleSave}>Speichern</Button>
            <Button onClick={onCancel}>Abbrechen</Button>
          </div>
        </Card>
  );
}