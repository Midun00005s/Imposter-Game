import React, { useState } from 'react';
import { X, Plus, Trash2, Shuffle, Users, Check } from 'lucide-react';
import { sounds } from '../utils/sound';
import { getPlayerColor, PRESET_GROUPS } from '../utils/constants';

export default function PlayerSetupModal({
  isOpen,
  onClose,
  players,
  setPlayers,
}) {
  const [newPlayerName, setNewPlayerName] = useState('');

  if (!isOpen) return null;

  const handleAddPlayer = (e) => {
    e?.preventDefault();
    const trimmed = newPlayerName.trim();
    if (!trimmed) return;
    if (players.length >= 15) {
      alert('Maximum 15 players allowed!');
      return;
    }
    sounds.playTap();
    const updated = [...players, trimmed];
    setPlayers(updated);
    setNewPlayerName('');
  };

  const handleRemovePlayer = (index) => {
    if (players.length <= 3) {
      alert('You need at least 3 players to play Imposter!');
      return;
    }
    sounds.playTap();
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated);
  };

  const handleUpdateName = (index, value) => {
    const updated = [...players];
    updated[index] = value;
    setPlayers(updated);
  };

  const handleShuffle = () => {
    sounds.playFlip();
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
  };

  const handleLoadPreset = (preset) => {
    sounds.playTap();
    setPlayers([...preset.players]);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '88vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <h2 className="title-medium" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={20} color="var(--accent-cyan)" /> Player Roster ({players.length})
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Edit names & order for passing the phone</p>
          </div>
          <button className="header-icon-btn" onClick={onClose} aria-label="Close setup">
            <X size={20} />
          </button>
        </div>

        {/* Presets & Shuffle action */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 10, marginBottom: 12 }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleShuffle}
            style={{ padding: '8px 12px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
          >
            <Shuffle size={14} /> Shuffle Seating
          </button>
          {PRESET_GROUPS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              className="btn-secondary"
              onClick={() => handleLoadPreset(preset)}
              style={{ padding: '8px 12px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Players List with editable inputs and delete */}
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 4, flex: 1, minHeight: 180, maxHeight: 320 }}>
          {players.map((name, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div
                className="player-avatar"
                style={{
                  background: getPlayerColor(idx),
                  width: 34,
                  height: 34,
                  fontSize: '0.95rem',
                }}
              >
                {name.charAt(0).toUpperCase() || (idx + 1)}
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => handleUpdateName(idx, e.target.value)}
                placeholder={`Player ${idx + 1}`}
                style={{
                  padding: '8px 12px',
                  fontSize: '0.95rem',
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 0,
                }}
              />

              <button
                type="button"
                className="btn-ghost"
                onClick={() => handleRemovePlayer(idx)}
                title="Remove player"
                disabled={players.length <= 3}
                style={{
                  color: players.length <= 3 ? '#475569' : '#f43f5e',
                  padding: 6,
                  cursor: players.length <= 3 ? 'not-allowed' : 'pointer',
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Add player row */}
        <form onSubmit={handleAddPlayer} style={{ display: 'flex', gap: 8, marginTop: 12, marginBottom: 16 }}>
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="+ Enter friend's name..."
            maxLength={18}
            style={{ flex: 1 }}
          />
          <button
            type="submit"
            className="btn-secondary"
            disabled={!newPlayerName.trim()}
            style={{ padding: '0 16px', background: 'rgba(6,182,212,0.15)', color: '#22d3ee', borderColor: 'rgba(6,182,212,0.3)' }}
          >
            <Plus size={18} /> Add
          </button>
        </form>

        <button
          className="btn-primary"
          onClick={() => {
            sounds.playTap();
            onClose();
          }}
        >
          <Check size={18} /> Save & Return
        </button>
      </div>
    </div>
  );
}
