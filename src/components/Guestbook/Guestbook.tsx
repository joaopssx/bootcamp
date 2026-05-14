import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { Canvas } from '../Layout/Canvas';
import type { GuestbookMessage } from '../../types';

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('guestbook_db.json');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const initial: GuestbookMessage[] = [
        { id: '1', author: 'Sistema', message: 'Chat inicializado. Aguardando conexões...', timestamp: new Date().toISOString() }
      ];
      setMessages(initial);
      localStorage.setItem('guestbook_db.json', JSON.stringify(initial));
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;

    const newMsg: GuestbookMessage = {
      id: Math.random().toString(36).substring(2, 9),
      author: name.trim(),
      message: msg.trim(),
      timestamp: new Date().toISOString()
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem('guestbook_db.json', JSON.stringify(updated));
    setMsg('');
  };

  return (
    <Canvas title="GUEST_CHAT_PROTOCOL.SYS" flex={1}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                <span>[{new Date(m.timestamp).toLocaleTimeString()}] <strong>@{m.author}</strong></span>
              </div>
              <div style={{ color: 'var(--text-white)', marginTop: '0.2rem' }}>{"> "}{m.message}</div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: 'var(--accent)' }}>USUÁRIO:</span>
            <input 
              type="text" 
              className="command-input" 
              placeholder="anônimo" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ borderBottom: '1px solid var(--text-dim)', padding: '0.2rem' }}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: 'var(--accent)' }}>MSG: </span>
            <input 
              type="text" 
              className="command-input" 
              placeholder="digite sua mensagem..." 
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              style={{ borderBottom: '1px solid var(--text-dim)', padding: '0.2rem' }}
              required
            />
            <button 
              type="submit" 
              style={{ 
                backgroundColor: 'transparent', 
                border: '1px solid var(--accent)', 
                color: 'var(--accent)', 
                padding: '0.2rem 1rem', 
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)'
              }}>
              ENVIAR
            </button>
          </div>
        </form>
      </div>
    </Canvas>
  );
}
