import { Card, CardHeader, Text, Title2, Button} from "@fluentui/react-components"

type HomePageProps = {
    onNewCustomer: () => void;
    onShowList: () => void;
};

export function HomePage({ onNewCustomer, onShowList }: HomePageProps) {
    return (
        <Card>
            <CardHeader header={<Title2>Wilkommen</Title2>} />
            <Text>
                Verwalten Sie Ihre Kunden: erfassen, bearbeiten und durchsuchen.
            </Text>
            <div style={{ display: "flex", gap: "8px", marginTop: "16px"}} >
                <Button appearance="primary" onClick={onNewCustomer}>
                    Neuer Kunde
                </Button>
                <Button onClick={onShowList}>Zur Kundenliste</Button>
            </div>
        </Card>
    );
}