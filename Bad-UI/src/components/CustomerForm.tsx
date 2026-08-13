import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Dropdown,
  Field,
  Input,
  Option,
  Radio,
  RadioGroup,
  Spinner,
  Subtitle2,
} from '@fluentui/react-components';
import type { CustomerFormData, CustomerStatus } from '../models/Customer';
import { hasValidationErrors, validateCustomer, type ValidationErrors } from '../utils/validation';
import { StatusDisplay } from './StatusDisplay';
import styles from './CustomerForm.module.css';

interface CustomerFormProps {
  initialData: CustomerFormData;
  submitLabel: string;
  onSubmit: (data: CustomerFormData) => Promise<void>;
  onCancel: () => void;
}

const countryOptions = [
  'Austria', 'Belgium', 'Cyprus', 'Czech Republic', 'Denmark', 'France',
  'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Netherlands',
  'Norway', 'Poland', 'Portugal', 'Slovakia', 'Spain', 'Sweden',
  'Switzerland', 'United Kingdom',
];

export function CustomerForm({ initialData, submitLabel, onSubmit, onCancel }: CustomerFormProps) {
  const [formData, setFormData] = useState<CustomerFormData>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateField = <K extends keyof CustomerFormData>(field: K, value: CustomerFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateCustomer(formData);
    setErrors(validationErrors);
    setSubmitted(true);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsSaving(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSaving(false);
    }
  };

  // Zeigt eine Fehlermeldung nur an, wenn das Formular bereits abgeschickt wurde.
  const fieldError = (key: keyof ValidationErrors) => {
    const message = errors[key];
    return submitted && message
      ? { validationState: 'error' as const, validationMessage: message }
      : {};
  };

  return (
    <div className={styles.form}>
      <Card className={styles.card}>
        <CardHeader header={<Subtitle2>Firma & Kontakt</Subtitle2>} />
        <div className={styles.row}>
          <Field label="Firma" className={styles.fieldWide} {...fieldError('company')}>
            <Input
              value={formData.company}
              onChange={(_e, data) => updateField('company', data.value)}
              placeholder="Firma eingeben..."
            />
          </Field>
        </div>
        <div className={styles.row}>
          <Field label="Kundennummer" className={styles.fieldSmall} {...fieldError('customerNumber')}>
            <Input
              value={formData.customerNumber}
              onChange={(_e, data) => updateField('customerNumber', data.value)}
            />
          </Field>
          <Field label="Telefon" className={styles.fieldMedium} {...fieldError('phone')}>
            <Input
              value={formData.phone}
              onChange={(_e, data) => updateField('phone', data.value)}
              placeholder="+49 ..."
            />
          </Field>
        </div>
      </Card>

      <Card className={styles.card}>
        <CardHeader header={<Subtitle2>Personendaten</Subtitle2>} />
        <div className={styles.row}>
          <Field label="Nachname" className={styles.fieldSmall} {...fieldError('lastName')}>
            <Input
              value={formData.lastName}
              onChange={(_e, data) => updateField('lastName', data.value)}
              placeholder="Nachname"
            />
          </Field>
          <Field label="Vorname" className={styles.fieldSmall} {...fieldError('firstName')}>
            <Input
              value={formData.firstName}
              onChange={(_e, data) => updateField('firstName', data.value)}
            />
          </Field>
          <Field label="E-Mail" className={styles.fieldMedium} {...fieldError('email')}>
            <Input
              value={formData.email}
              onChange={(_e, data) => updateField('email', data.value)}
              placeholder="email@example.com"
            />
          </Field>
        </div>
      </Card>

      <Card className={styles.card}>
        <CardHeader header={<Subtitle2>Adresse</Subtitle2>} />
        <div className={styles.row}>
          <Field label="Stadt" className={styles.fieldMedium} {...fieldError('city')}>
            <Input
              value={formData.city}
              onChange={(_e, data) => updateField('city', data.value)}
            />
          </Field>
          <Field label="Land" className={styles.fieldMedium} {...fieldError('country')}>
            <Dropdown
              value={formData.country}
              selectedOptions={formData.country ? [formData.country] : []}
              onOptionSelect={(_e, data) => updateField('country', data.optionValue ?? '')}
            >
              {countryOptions.map((country) => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))}
            </Dropdown>
          </Field>
        </div>
      </Card>

      <Card className={styles.card}>
        <CardHeader header={<Subtitle2>Status</Subtitle2>} />
        <p className={styles.statusHelp}>
          Aktive Kunden erhalten Rechnungen, inaktive Kunden werden archiviert.
        </p>
        <div className={styles.statusRow}>
          <RadioGroup
            value={formData.status}
            onChange={(_e, data) => updateField('status', data.value as CustomerStatus)}
            layout="horizontal"
          >
            <Radio value="Active" label="Active" />
            <Radio value="Inactive" label="Inactive" />
          </RadioGroup>
          <StatusDisplay status={formData.status} />
        </div>
      </Card>

      {submitted && hasValidationErrors(errors) && (
        <p className={styles.globalError}>Bitte prüfen Sie die markierten Felder.</p>
      )}

      <div className={styles.actions}>
        <Button appearance="secondary" onClick={onCancel} disabled={isSaving}>
          Abbrechen
        </Button>
        <Button appearance="primary" onClick={handleSubmit} disabled={isSaving} className={styles.btnSubmit}>
          {isSaving ? <Spinner size="tiny" /> : submitLabel}
        </Button>
      </div>
    </div>
  );
}
