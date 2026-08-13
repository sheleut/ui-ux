import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@fluentui/react-components';
import { CustomerForm } from '../components/CustomerForm';
import { useCustomerContext } from '../hooks/CustomerContext';
import styles from './EditCustomerPage.module.css';

export function EditCustomerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCustomer, updateCustomer } = useCustomerContext();

  const customer = id ? getCustomer(id) : undefined;

  if (!customer) {
    return (
      <div className={styles.page}>
        <p className={styles.notFound}>Customer not found.</p>
        <Button appearance="primary" onClick={() => navigate('/')}>
          OK
        </Button>
      </div>
    );
  }

  const { id: _id, ...formData } = customer;

  const handleSubmit = async (data: typeof formData) => {
    if (id) {
      await updateCustomer(id, data);
      navigate('/');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.label}>EDIT MODE</span>
        <h3 className={styles.title}>
          {customer.firstName} {customer.lastName}
        </h3>
        <span className={styles.number}>#{customer.customerNumber}</span>
      </div>

      <p className={styles.hint}>
        Alle Felder müssen korrekt ausgefüllt sein, bevor gespeichert werden kann.
      </p>

      <CustomerForm
        initialData={formData}
        submitLabel="Save"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </div>
  );
}
