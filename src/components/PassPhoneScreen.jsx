import React from 'react';
import { Smartphone, Eye, ShieldAlert } from 'lucide-react';
import { sounds } from '../utils/sound';
import { getPlayerColor } from '../utils/constants';

export default function PassPhoneScreen({
  currentPlayer,
  playerIndex,
  totalPlayers,
  onProceedToReveal,
}) {
  const avatarColor = getPlayerColor(playerIndex);

  return (
    <div className="screen-container" style={{ justifyContent: 'space-between', textAlign: 'center', minHeight: '80vh' }}>
      {/* Top progress */}
      <div style={{ marginTop: 10 }}>
        <span className="badge badge-cyan">
          PLAYER {playerIndex + 1} OF {totalPlayers}
        </span>
      </div>

      {/* Center Phone Pass Prompt */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, margin: 'auto 0' }}>
        <div style={{ position: 'relative' }}>
          <div
            className="player-avatar"
            style={{
              background: avatarColor,
              width: 84,
              height: 84,
              fontSize: '2.4rem',
              boxShadow: `0 0 40px ${avatarColor}55`,
            }}
          >
            {currentPlayer.name.charAt(0).toUpperCase()}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              background: '#090d16',
              borderRadius: '50%',
              padding: 6,
              border: '2px solid rgba(255,255,255,0.15)',
              color: '#38bdf8',
            }}
          >
            <Smartphone size={20} />
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.1rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>
            Pass the phone to
          </h2>
          <h1 className="title-huge shimmer-text" style={{ fontSize: '2.6rem' }}>
            {currentPlayer.name}
          </h1>
        </div>

        {/* Anti-peek warning banner */}
        <div
          className="glass-panel"
          style={{
            padding: '12px 18px',
            maxWidth: 320,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderColor: 'rgba(245,158,11,0.3)',
            background: 'rgba(245,158,11,0.08)',
          }}
        >
          <ShieldAlert size={24} color="#f59e0b" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.8rem', color: '#fbbf24', textAlign: 'left', lineHeight: 1.3 }}>
            Keep the screen shielded! Make sure nobody else is peeking over your shoulder.
          </p>
        </div>
      </div>

      {/* Bottom Action */}
      <div style={{ marginBottom: 10 }}>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            sounds.playTap();
            onProceedToReveal();
          }}
          style={{
            padding: '18px 24px',
            fontSize: '1.1rem',
          }}
        >
          <Eye size={20} /> I am {currentPlayer.name} — Reveal Card
        </button>
      </div>
    </div>
  );
}
