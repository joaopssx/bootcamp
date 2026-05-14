import type { ReactNode } from 'react';

interface CanvasProps {
  title: string;
  children: ReactNode;
  className?: string;
  flex?: number;
}

export const Canvas = ({ title, children, className = '', flex = 1 }: CanvasProps) => {
  return (
    <div className={`canvas ${className}`} style={{ flex }}>
      <div className="terminal-title">
        <span>{title}</span>
        <div className="terminal-controls">
          <span style={{ backgroundColor: '#ff3333' }}></span>
          <span style={{ backgroundColor: '#ffff33' }}></span>
          <span style={{ backgroundColor: '#33ff33' }}></span>
        </div>
      </div>
      <div className="canvas-content" style={{ height: 'calc(100% - 2rem)' }}>
        {children}
      </div>
    </div>
  );
};
