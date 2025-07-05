import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface DashboardFilters {
  template?: string;
  corretor?: string;
  dia?: string;
}

interface DashboardContextType {
  filters: DashboardFilters;
  updateFilter: (key: keyof DashboardFilters, value: string | undefined) => void;
  clearFilters: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [filters, setFilters] = useState<DashboardFilters>({});

  const updateFilter = (key: keyof DashboardFilters, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <DashboardContext.Provider value={{ filters, updateFilter, clearFilters }}>
      {children}
    </DashboardContext.Provider>
  );
}