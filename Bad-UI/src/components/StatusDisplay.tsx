import { Badge } from '@fluentui/react-components';
import type { CustomerStatus } from '../models/Customer';

interface StatusDisplayProps {
  status: CustomerStatus;
}

/**
 * Einheitliche Statusanzeige, ueberall im Produkt gleich eingefaerbt:
 * gruen (success) fuer Active, grau (informative) fuer Inactive.
 */
export function StatusDisplay({ status }: StatusDisplayProps) {
  const isActive = status === 'Active';

  return (
    <Badge appearance="filled" color={isActive ? 'success' : 'informative'} size="medium">
      {status}
    </Badge>
  );
}
