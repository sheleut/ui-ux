type InfoPageProps = {
    onBack: () => void;
};

export function InfoPage({ onBack }: InfoPageProps) {
    return (
        <section className="block">
            <h2>Info</h2>
            <p>Internes Tool. Keine Hilfe verfügbar.</p>
            <span className="nav-link" onClick={onBack}>
                zurück
            </span>
        </section>
    );
}