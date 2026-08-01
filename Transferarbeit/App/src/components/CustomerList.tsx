import type { Customer } from "../types";

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
    return (
        <section className="block list-block">
          <h2>Übersicht</h2>

          <div className="toolbar messy">
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="suchen"
            />
            <select
              value={filterStatus}
              onChange={(e) => onFilterChange(e.target.value)}
              title=""
            >
              <option value="alle">alle</option>
              <option value="mit">mit Notiz</option>
              <option value="ohne">ohne Notiz</option>
            </select>
            <button type="button" className="sort-btn">
              Sortieren
            </button>
            <button
              type="button"
              className="add-mini"
              onClick={() => {
                onNewCustomer();
              }}
            >
              +
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Info</th>
                <th>K1</th>
                <th>K2</th>
                <th>Extra</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone || "—"}</td>
                  <td>{c.company}</td>
                  <td className="actions">
                    <span
                      className="action"
                      onClick={() => onEdit(c)}
                    >
                      ✎
                    </span>
                    <span
                      className="action delete"
                      onClick={() => onDelete(c.id)}
                    >
                      x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {customers.length === 0 && (
            <p className="empty-hint">Keine Treffer (Filter prüfen?)</p>
          )}

          <div className="below-table">
            <span
              className="fake-btn"
              onClick={() => {
                onNewCustomer();
              }}
            >
              nochmal hinzufügen
            </span>
          </div>
        </section>
    );
}

