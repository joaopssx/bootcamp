import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import { Fastfetch, Help } from './Commands';
import { Canvas } from '../Layout/Canvas';

const ASCII_ART = `   __    ___  _      ___     ___  __  ___  __    ___      ___  __   __    __    __  _     __    _        __  _____  _        __  _   
   \\ \\  /___\\/_\\    /___\\   / _ \\/__\\/   \\/__\\  /___\\    /   \\/__\\ / _\\  /__\\/\\ \\ \\/_\\   / _\\  /_\\    /\\ \\ \\/__   \\/_\\    /\\ \\ \\/_\\  
    \\ \\//  ///_\\\\  //  //  / /_)/_\\ / /\\ / \\// //  //   / /\\ /_\\   \\ \\  /_\\ /  \\/ //_\\\\  \\ \\  //_\\\\  /  \\/ /  / /\\//_\\\\  /  \\/ //_\\\\ 
 /\\_/ / \\_//  _  \\/ \\_//  / ___//__/ /_// _  \\/ \\_//   / /_///__   _\\ \\//__/ /\\  /  _  \\ _\\ \\/  _  \\/ /\\  /  / / /  _  \\/ /\\  /  _  \\
 \\___/\\___/\\_/ \\_/\\___/   \\/   \\__/___,'\\/ \\_/\\___/   /___,'\\__/   \\__/\\__/\\_\\ \\/\\_/ \\_/ \\__/\\_/ \\_/\\_\\ \\/   \\/  \\_/ \\_/\\_\\ \\/\\_/ \\_/`;

export default function Terminal() {
  const { history, print, clear } = useTerminal('Digite "help" para ver os comandos disponíveis.');
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const args = cmdStr.trim().split(' ');
    const cmd = args[0].toLowerCase();

    print(`root@system:~# ${cmdStr}`, 'input');

    switch (cmd) {
      case 'help':
        print(<Help />);
        break;
      case 'fastfetch':
        print(<Fastfetch />);
        break;
      case 'github':
        print('Abrindo perfil do GitHub...');
        window.open('https://github.com/joaopssx', '_blank');
        break;
      case 'whoami':
        print('usuario_convidado');
        break;
      case 'date':
        print(new Date().toString());
        break;
      case 'clear':
        clear();
        break;
      case 'echo':
        print(args.slice(1).join(' '));
        break;
      case '':
        break;
      default:
        print(`Comando não encontrado: ${cmd}. Digite "help" para listar os comandos.`, 'error');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
  };

  return (
    <Canvas title="MAIN_TERMINAL.EXE" flex={1}>
      <div 
        style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'text' }}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="ascii-art">{ASCII_ART}</div>

        <div className="terminal-output" style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
          {history.map((entry) => (
            <div 
              key={entry.id} 
              style={{ 
                marginBottom: '0.2rem', 
                color: entry.type === 'error' ? '#ff3333' : entry.type === 'system' ? 'var(--text-dim)' : 'var(--text-main)' 
              }}
            >
              {entry.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="command-input-wrapper">
          <span className="command-prompt">root@system:~#</span>
          <input 
            ref={inputRef}
            type="text" 
            className="command-input" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </Canvas>
  );
}
