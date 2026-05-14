

export const Fastfetch = () => (
  <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
    <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
      <pre>
        {`   \\  /
    \\/
   /  \\
  /    \\`}
      </pre>
    </div>
    <div>
      <div style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>joao@portfolio</div>
      <div>----------------</div>
      <div><strong>OS:</strong> WebOS 1.0</div>
      <div><strong>Host:</strong> React Vite Engine</div>
      <div><strong>Kernel:</strong> 5.15.0-generic</div>
      <div><strong>Uptime:</strong> 12 dias, 4 horas, 20 min</div>
      <div><strong>Pacotes:</strong> 153 (npm)</div>
      <div><strong>Shell:</strong> zsh 5.8</div>
      <div><strong>Resolução:</strong> 1920x1080</div>
      <div><strong>Tema:</strong> Cyberpunk Dark [GTK3]</div>
      <div><strong>Terminal:</strong> xterm-256color</div>
    </div>
  </div>
);

export const Help = () => (
  <div style={{ margin: '1rem 0' }}>
    <div style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Comandos disponíveis:</div>
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem' }}>
      <strong>help</strong><span>Mostra esta lista de comandos.</span>
      <strong>fastfetch</strong><span>Exibe as informações do sistema.</span>
      <strong>github</strong><span>Abre o meu perfil do GitHub.</span>
      <strong>whoami</strong><span>Imprime o usuário atual.</span>
      <strong>clear</strong><span>Limpa o terminal.</span>
      <strong>echo</strong><span>Imprime um texto na tela.</span>
      <strong>date</strong><span>Mostra a data e hora atual.</span>
    </div>
  </div>
);
