import React, { useState } from 'react';
import { Target, Skull } from 'lucide-react';
import { sounds } from '../utils/sound';
import { getPlayerColor } from '../utils/constants';

export default function VotingPhase({
  playersWithRoles,
  imposterCount,
  onRevealResults,
}) {
  const [selectedSuspects, setSelectedSuspects] = useState([]);

  const toggleSuspect = (player) => {
    sounds.playTap();
    if (selectedSuspects.some((p) => p.name === player.name)) {
      setSelectedSuspects(selectedSuspects.filter((p) => p.name !== player.name));
    } else {
      // Allow up to imposterCount suspects
      if (selectedSuspects.length >= imposterCount) {
        // Replace first
        setSelectedSuspects([...selectedSuspects.slice(1), player]);
      } else {
        setSelectedSuspects([...selectedSuspects, player]);
      }
    }
  };

  const handleReveal = () => {
    if (selectedSuspects.length === 0) {
      alert('Please select at least one player that the group suspects!');
      return;
    }
    sounds.playTap();
    onRevealResults(selectedSuspects);
  };

  return (
    <div className="screen-container" style={{ justifyContent: 'space-between', textAlign: 'center' }}>
      {/* Top Header */}
      <div style={{ marginTop: 8 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span className="badge badge-rose" style={{ fontSize: '0.85rem' }}>
            <Target size={14} /> ACCUSATION TIME
          </span>
        </div>
        <h1 className="title-large" style={{ fontSize: '1.8rem', marginTop: 4 }}>
          Who is the <span className="text-gradient-rose">Imposter?</span>
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: 2 }}>
          Discuss clues, point fingers, and tap who the group votes out!
        </p>
      </div>

      {/* Players List to Tap / Accuse */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '14px 0', overflowY: 'auto', paddingRight: 4, flex: 1 }}>
        {playersWithRoles.map((player, idx) => {
          const isSelected = selectedSuspects.some((p) => p.name === player.name);
          const color = getPlayerColor(idx);

          return (
            <div
              key={player.name}
              className={`glass-panel ${isSelected ? 'selected-suspect' : ''}`}
              onClick={() => toggleSuspect(player)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                cursor: 'pointer',
                borderRadius: 'var(--radius-md)',
                borderColor: isSelected ? 'var(--accent-rose)' : 'var(--surface-border)',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(244,63,94,0.2) 0%, rgba(15,21,38,0.9) 100%)'
                  : 'rgba(255,255,255,0.04)',
                boxShadow: isSelected ? '0 0 20px rgba(244,63,94,0.35)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  className="player-avatar"
                  style={{
                    background: color,
                    width: 44,
                    height: 44,
                    fontSize: '1.1rem',
                  }}
                >
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                    {player.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: isSelected ? '#fb7185' : '#94a3b8' }}>
                    {isSelected ? '🎯 Accused by group' : 'Tap to suspect'}
                  </div>
                </div>
              </div>

              {isSelected ? (
                <div
                  style={{
                    background: 'var(--accent-rose)',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                  }}
                >
                  <Skull size={18} />
                </div>
              ) : (
                <div
                  style={{
                    border: '1.5px dashed rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Accusation Notice & Reveal Button */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8 }}>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          {selectedSuspects.length === 0
            ? `Select ${imposterCount === 1 ? 'the suspected player' : `${imposterCount} suspected players`} to convict`
            : `Convicting: ${selectedSuspects.map((p) => p.name).join(', ')}`}
        </div>

        <button
          type="button"
          className="btn-danger"
          disabled={selectedSuspects.length === 0}
          onClick={handleReveal}
          style={{
            padding: '18px 24px',
            fontSize: '1.15rem',
            letterSpacing: 0.5,
            opacity: selectedSuspects.length === 0 ? 0.45 : 1,
            cursor: selectedSuspects.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <Skull size={20} /> REVEAL THE IMPOSTER
        </button>
      </div>
    </div>
  );
}
