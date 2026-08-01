import { Card, CardHeader, Text, Title2, Button} from "@fluentui/react-components"

type InfoPageProps = {
    onBack: () => void;
};

export function InfoPage({ onBack }: InfoPageProps) {
    return (
        <Card>
            <CardHeader header={<Title2>Info</Title2>} />
            <Text>
                Internes Tool. Keine Hilfe verfügbar.
            </Text>
            <div style={{ display: "flex", gap: "8px", marginTop: "16px"}} >
                <Button onClick={onBack}>Zurück</Button>
            </div>
        </Card>
    );
}