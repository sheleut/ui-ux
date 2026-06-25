import {
  Body1,
  Title1,
  Title2,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

import { BarChartCard } from './charts/BarChartCard';
import { DonutChartCard } from './charts/DonutChartCard';
import { GaugeChartCard } from './charts/GaugeChartCard';
import { LineChartCard } from './charts/LineChartCard';

const useStyles = makeStyles({
  page: {
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
    padding: tokens.spacingVerticalXXL,
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
  },
  intro: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
    gap: tokens.spacingHorizontalL,
  },
  sectionTitle: {
    marginTop: tokens.spacingVerticalM,
  },
});

export function Dashboard() {
  const styles = useStyles();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <Title1>Fluent UI Charts – Beispiel-Dashboard</Title1>
          <Body1>
            Demonstration typischer Chart-Typen mit getrennten Beispieldaten,
            Mappern und Darstellungskomponenten – erweiterbar für Lehrzwecke.
          </Body1>
        </header>

        <section>
          <Title2 className={styles.sectionTitle}>Zeitliche Entwicklung</Title2>
          <div className={styles.grid}>
            <LineChartCard />
          </div>
        </section>

        <section>
          <Title2 className={styles.sectionTitle}>Vergleiche & Anteile</Title2>
          <div className={styles.grid}>
            <BarChartCard />
            <DonutChartCard />
          </div>
        </section>

        <section>
          <Title2 className={styles.sectionTitle}>Fortschritt</Title2>
          <div className={styles.grid}>
            <GaugeChartCard />
          </div>
        </section>
      </div>
    </main>
  );
}
