import type { Customer } from "../types";
import {
    DataGrid, DataGridHeader, DataGridRow, DataGridHeaderCell,
    DataGridBody, DataGridCell, TableColumnDefinition, createTableColumn,
    Button, Card, CardHeader, Title2, Input, Select, Text
} from "@fluentui/react-components";
import { EditRegular, DeleteRegular, AddRegular} from "@fluentui/react-icons";
import { useIsMobile } from "../hooks/useIsMobile";

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
    const isMobile = useIsMobile();
    return (
        <Card>
          <CardHeader header={<Title2>Kunden</Title2>} />

        <div style={{ 
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
            gap: "8px",
            marginBottom: "16px",
          }}>
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

{!isMobile && (
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
)}

{isMobile && (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    {customers.map((c) => (
      <Card key={c.id}>
        <CardHeader 
          header={<Text weight="semibold">{c.name}</Text>}
          description={<Text size={200}>{c.company || "-"}</Text>}
          action={
            <>
              <Button
                appearance="subtle" icon={<EditRegular />}
                aria-label="Bearbeiten" onClick={() => onEdit(c)}
              />
              <Button
                appearance="subtle" icon={<DeleteRegular />}
                aria-label="Löschen" onClick={() => onDelete(c.id)}
              />
            </>
          } 
        />
        <Text size={200}>{c.email}</Text>
        <Text size={200}>{c.phone || "-"}</Text>
      </Card>
    ))}
  </div>
)}

          {customers.length === 0 && (
            <p className="empty-hint">Keine Treffer (Filter prüfen?)</p>
          )}
        </Card>
    );
}

