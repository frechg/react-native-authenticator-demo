import React from 'react';
import { AuthProvider } from './src/common/contexts/AuthProvider';
import { Navigation } from './src/features/navigation';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};