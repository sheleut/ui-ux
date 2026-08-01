type HomePageProps = {
    onNewCustomer: () => void;
    onShowList: () => void;
};

export function HomePage({ onNewCustomer, onShowList }: HomePageProps) {
    return (
        <section className="block">
          <h1>Willkommen</h1>
          <p>
            System für Kunden. Bitte Bereich wählen. Die Tabelle finden Sie nicht
            auf dieser Seite.
          </p>
          <input placeholder="Schnellsuche (noch nicht aktiv)" />
          <br />
          <br />
          <span className="fake-btn" onClick={onNewCustomer}>
            Neuen Kunden
          </span>
          <span className="fake-btn" onClick={onShowList}>
            Zur Übersicht
          </span>
        </section>

    );
}