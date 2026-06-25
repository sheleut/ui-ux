import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { initializeIcons } from '@fluentui/react/lib/Icons';

import { Dashboard } from './components/Dashboard';
import './index.css';

initializeIcons();

export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Dashboard />
    </FluentProvider>
  );
}
