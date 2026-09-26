import React from 'react';
import { CheckCircle2, ArrowRight, Smartphone } from 'lucide-react';
import { sounds } from '../utils/sound';
import { getPlayerColor } from '../utils/constants';

export default function PassNextPrompt({
  prevPlayer,
  nextPlayer,
  nextPlayerIndex,
  totalPlayers,
  onNextPlayerReady,
}) {
  const avatarColor = getPlayerColor(nextPlayerIndex);

  return (
    <div className="screen-container" style={{ justifyContent: 'space-between', textAlign: 'center', minHeight: '80vh' }}>
      {/* Top Status */}
      <div style={{ marginTop: 10 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#34d399', fontSize: '0.85rem', fontWeight: 700 }}>
          <CheckCircle2 size={16} /> {prevPlayer.name} Done
        </div>
      </div>

      {/* Center Prompt */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, margin: 'auto 0' }}>
        <div style={{ color: '#94a3b8', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1.5 }}>
          Hand phone to
        </div>

        <div style={{ position: 'relative' }}>
          <div
            className="player-avatar"
            style={{
              background: avatarColor,
              width: 88,
              height: 88,
              fontSize: '2.5rem',
              boxShadow: `0 0 45px ${avatarColor}66`,
            }}
          >
            {nextPlayer.name.charAt(0).toUpperCase()}
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
          <h1 className="title-huge shimmer-text" style={{ fontSize: '2.6rem' }}>
            {nextPlayer.name}
          </h1>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: 4 }}>
            Player {nextPlayerIndex + 1} of {totalPlayers}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div style={{ marginBottom: 10 }}>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            sounds.playTap();
            onNextPlayerReady();
          }}
          style={{
            padding: '18px 24px',
            fontSize: '1.1rem',
          }}
        >
          I am {nextPlayer.name} — Ready <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
