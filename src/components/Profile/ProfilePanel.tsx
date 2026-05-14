import { useEffect, useState } from 'react';
import { Canvas } from '../Layout/Canvas';
import type { BioData } from '../../types';

export default function ProfilePanel() {
  const [bioData, setBioData] = useState<BioData | null>(null);
  const [ageStr, setAgeStr] = useState<string>('');

  useEffect(() => {
    fetch('./data/bio.json')
      .then(res => res.json())
      .then((data: BioData) => {
        setBioData(data);
        if (data.birthdate) {
          calculateAge(new Date(data.birthdate));
          const interval = setInterval(() => calculateAge(new Date(data.birthdate!)), 1000 * 60 * 60); 
          return () => clearInterval(interval);
        }
      })
      .catch(err => console.error('Falha ao carregar bio:', err));
  }, []);

  const calculateAge = (birthDate: Date) => {
    const now = new Date();
    
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += previousMonth.getDate();
    }
    
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    
    const weeks = Math.floor(days / 7);
    const extraDays = days % 7;

    setAgeStr(`${years} anos, ${months} meses, ${weeks} semanas, e ${extraDays} dias`);
  };

  return (
    <Canvas title="USER_PROFILE.DAT" flex={1}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
        <div className="bio-section">
          <h2>IDENTIDADE</h2>
          {bioData ? (
            <>
              <div className="bio-content"><strong style={{color: 'var(--text-main)'}}>Nome:</strong> {bioData.name}</div>
              <div className="bio-content"><strong style={{color: 'var(--text-main)'}}>Cargo:</strong> {bioData.title}</div>
              <div className="bio-content"><strong style={{color: 'var(--text-main)'}}>Local:</strong> {bioData.location}</div>
              {ageStr && <div className="bio-content"><strong style={{color: 'var(--text-main)'}}>Tempo Ativo:</strong> {ageStr}</div>}
              <div className="bio-content" style={{marginTop: '0.8rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--accent)', fontStyle: 'italic'}}>
                {bioData.bio}
              </div>
            </>
          ) : (
            <div>Carregando dados do usuário...</div>
          )}
        </div>
      </div>
    </Canvas>
  );
}
