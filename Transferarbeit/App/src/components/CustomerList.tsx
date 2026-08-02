import type { Customer } from "../types";
import {
    DataGrid, DataGridHeader, DataGridRow, DataGridHeaderCell,
    DataGridBody, DataGridCell, TableColumnDefinition, createTableColumn,
    Button, Card, CardHeader, Title2, Input, Select,
} from "@fluentui/react-components";
import { EditRegular, DeleteRegular, AddRegular} from "@fluentui/react-icons";

type CustomerListProps = {
    customers: Customer[];
    search: string;
    onSearchChange: (value: string) => void;
    filterStatus: string;
    onFilterChange: (value: string) => void;
    onEdit: (c: Customer) => void;
    onDelete: (id: number) => void;
    onNewCustomer: () => void;
};

const buildColumns = (
        onEdit: (c: Customer) => void,
        onDelete: (id: number) => void
    ): TableColumnDefinition<Customer>[] => [
    createTableColumn<Customer>({
        columnId: "name",
        compare: (a, b) => a.name.localeCompare(b.name),
        renderHeaderCell: () => "Name",
        renderCell: (c) => c.name,
    }),
    createTableColumn<Customer>({
        columnId: "email",
        compare: (a, b) => a.email.localeCompare(b.email),
        renderHeaderCell: () => "Email",
        renderCell: (c) => c.email,
    }),
    createTableColumn<Customer>({
        columnId: "phone",
        renderHeaderCell: () => "Telefon",
        renderCell: (c) => c.phone || "-",
    }),
    createTableColumn<Customer>({
        columnId: "company",
        compare: (a, b) => a.company.localeCompare(b.company),
        renderHeaderCell: () => "Firma",
        renderCell: (c) => c.company || "-",
    }),
    createTableColumn<Customer>({         
        columnId: "actions",
        renderHeaderCell: () => "",
        renderCell: (c) => (
            <>
              <Button
                appearance="subtle"
                icon={<EditRegular />}
                aria-label="Bearbeiten"
                onClick={() => onEdit(c)}
              />
              <Button
                appearance="subtle"
                icon={<DeleteRegular />}
                aria-label="Löschen"
                onClick={() => onDelete(c.id)}
              />
            </>
        ),
    }),
];

export function CustomerList({
    customers,
    search,
    onSearchChange,
    filterStatus,
    onFilterChange,
    onEdit,
    onDelete,
    onNewCustomer,
}: CustomerListProps) {
    const columns = buildColumns(onEdit, onDelete);
    return (
        <Card>
          <CardHeader header={<Title2>Kunden</Title2>} />

        <div style={{ 
          display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
            <Input
              value={search}
              onChange={(_, data) => onSearchChange(data.value)}
              placeholder="Suchen..."
            />
            <Select
              value={filterStatus}
              onChange={(_, data) => onFilterChange(data.value)}
            >
              <option value="alle">alle</option>
              <option value="mit">mit Notiz</option>
              <option value="ohne">ohne Notiz</option>
            </Select>
            <Button appearance="primary" icon={<AddRegular />} onClick={onNewCustomer}>
                Neuer Kunde
            </Button>
          </div>

<DataGrid items={customers} columns={columns} sortable getRowId={(c) => c.id}>
  <DataGridHeader>
    <DataGridRow>
      {({ renderHeaderCell }) => (
        <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
      )}
    </DataGridRow>
  </DataGridHeader>
  <DataGridBody<Customer>>
    {({ item }) => (
      <DataGridRow<Customer> key={item.id}>
        {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
      </DataGridRow>
    )}
  </DataGridBody>
</DataGrid>

          {customers.length === 0 && (
            <p className="empty-hint">Keine Treffer (Filter prüfen?)</p>
          )}
        </Card>
    );
}

