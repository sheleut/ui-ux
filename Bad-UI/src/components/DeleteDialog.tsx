import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
} from '@fluentui/react-components';
import type { Customer } from '../models/Customer';
import styles from './DeleteDialog.module.css';

interface DeleteDialogProps {
  customer: Customer | null;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDialog({ customer, open, onConfirm, onCancel }: DeleteDialogProps) {
  if (!customer) return null;

  return (
    <Dialog open={open}>
      <DialogSurface className={styles.surface}>
        <DialogBody>
          <DialogTitle className={styles.title}>Kunde löschen?</DialogTitle>
          <DialogContent>
            <p className={styles.text}>
              Der Kunde <strong>{customer.firstName} {customer.lastName}</strong> (Nr.{' '}
              {customer.customerNumber}, {customer.city}) wird endgültig gelöscht. Dieser Schritt
              kann nicht rückgängig gemacht werden.
            </p>
          </DialogContent>
          <DialogActions className={styles.actions}>
            <Button appearance="secondary" onClick={onCancel} className={styles.btnCancel}>
              Abbrechen
            </Button>
            <Button appearance="primary" onClick={onConfirm} className={styles.btnDelete}>
              Löschen
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
