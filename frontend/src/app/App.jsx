import React from 'react';
import { Providers } from './providers';
import { AppRoutes } from './routes';
import CommandMenu from '@/shared/ui/CommandMenu';

function App() {
  return (
    <Providers>
      <CommandMenu />
      <AppRoutes />
    </Providers>
  );
}

export default App;
