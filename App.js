import React from 'react';
import { AuthProvider } from './src/common/contexts/AuthProvider';
import { Navigation } from './src/features/navigation';
import Constants from 'expo-constants';

export default function App() {
  console.log('Node Env:', process.env.NODE_ENV);
  console.log('API url:', Constants.manifest.extra.API_URL);
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};