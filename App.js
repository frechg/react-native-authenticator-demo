import React from 'react';
import { AuthProvider } from './src/common/contexts/AuthProvider';
import { Navigation } from './src/features/navigation';
import ErrorBoundry from './src/common/ErrorBoundry';

export default function App() {
  return (
    <ErrorBoundry>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </ErrorBoundry>
  );
};