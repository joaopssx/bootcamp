import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface TerminalOutput {
  id: string;
  content: ReactNode;
  type: 'input' | 'output' | 'system' | 'error';
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useTerminal = (initialMessage: string) => {
  const [history, setHistory] = useState<TerminalOutput[]>([
    { id: generateId(), content: initialMessage, type: 'system' }
  ]);

  const print = useCallback((content: ReactNode, type: TerminalOutput['type'] = 'output') => {
    setHistory(prev => [...prev, { id: generateId(), content, type }]);
  }, []);

  const clear = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, print, clear };
};
