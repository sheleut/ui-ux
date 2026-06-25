import {
  Card,
  CardHeader,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import type { ReactNode } from 'react';

const useStyles = makeStyles({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    flex: 1,
    minHeight: '280px',
    padding: tokens.spacingVerticalM,
    paddingTop: 0,
  },
  chartContainer: {
    width: '100%',
    height: '100%',
    minHeight: '260px',
  },
});

interface ChartCardProps {
  title: string;
  description: string;
  children: ReactNode;
  chartMinHeight?: number;
}

export function ChartCard({
  title,
  description,
  children,
  chartMinHeight = 260,
}: ChartCardProps) {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardHeader
        header={<Text weight="semibold">{title}</Text>}
        description={<Text size={200}>{description}</Text>}
      />
      <div className={styles.body}>
        <div
          className={styles.chartContainer}
          style={{ minHeight: chartMinHeight }}
        >
          {children}
        </div>
      </div>
    </Card>
  );
}
