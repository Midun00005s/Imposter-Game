import React from 'react';
import { Volume2, VolumeX, Smartphone, HelpCircle, Trophy, Home } from 'lucide-react';
import { sounds } from '../utils/sound';

export default function Header({
  soundEnabled,
  setSoundEnabled,
  hapticEnabled,
  setHapticEnabled,
  onOpenRules,
  onOpenStats,
  gameState,
  onGoHome,
}) {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setSoundEnabled(next);
    if (next) sounds.playTap();
  };

  const toggleHaptic = () => {
    const next = !hapticEnabled;
    setHapticEnabled(next);
    sounds.setHapticEnabled(next);
    if (next) sounds.vibrate(30);
  };

  return (
    <header className="app-header">
      <div className="app-brand" onClick={gameState !== 'HOME' ? onGoHome : undefined} style={{ cursor: gameState !== 'HOME' ? 'pointer' : 'default' }}>
        <span className="brand-ghost">👻</span>
        <span>
          IMPOSTER<span style={{ color: 'var(--accent-cyan)' }}>.APP</span>
        </span>
      </div>

      <div className="header-actions">
        {gameState !== 'HOME' && (
          <button
            className="header-icon-btn"
            onClick={() => {
              sounds.playTap();
              if (window.confirm('Quit current game and return to Home?')) {
                onGoHome();
              }
            }}
            title="Home"
            aria-label="Home"
          >
            <Home size={18} />
          </button>
        )}

        <button
          className={`header-icon-btn ${soundEnabled ? 'active' : ''}`}
          onClick={toggleSound}
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <button
          className={`header-icon-btn ${hapticEnabled ? 'active' : ''}`}
          onClick={toggleHaptic}
          title={hapticEnabled ? 'Haptics Enabled' : 'Haptics Disabled'}
          aria-label="Toggle Vibration"
        >
          <Smartphone size={18} />
        </button>

        <button
          className="header-icon-btn"
          onClick={() => {
            sounds.playTap();
            onOpenStats();
          }}
          title="Scoreboard & Stats"
          aria-label="Scoreboard"
        >
          <Trophy size={18} />
        </button>

        <button
          className="header-icon-btn"
          onClick={() => {
            sounds.playTap();
            onOpenRules();
          }}
          title="How to Play"
          aria-label="Rules"
        >
          <HelpCircle size={18} />
        </button>
      </div>
    </header>
  );
}
