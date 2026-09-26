import React, { useState } from 'react';
import { Users, Play, Lightbulb, Clock, Globe, Plus, X, Shuffle, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/words';
import { sounds } from '../utils/sound';
import { getPlayerColor, PRESET_GROUPS } from '../utils/constants';

export default function HomeConfig({
  players,
  setPlayers,
  imposterCount,
  setImposterCount,
  imposterHint,
  setImposterHint,
  category,
  setCategory,
  duration,
  setDuration,
  language,
  setLanguage,
  onStartGame,
}) {
  const [newPlayerInput, setNewPlayerInput] = useState('');

  const maxImposters = Math.max(1, Math.min(3, Math.floor(players.length / 2)));

  const handleAddPlayer = (e) => {
    e?.preventDefault();
    const trimmed = newPlayerInput.trim();
    if (!trimmed) return;
    if (players.length >= 15) {
      alert('Maximum 15 players allowed!');
      return;
    }
    sounds.playTap();
    setPlayers([...players, trimmed]);
    setNewPlayerInput('');
  };

  const handleRemovePlayer = (index) => {
    if (players.length <= 3) {
      alert('You need at least 3 players to play Imposter!');
      return;
    }
    sounds.playTap();
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated);
    if (imposterCount > Math.floor(updated.length / 2)) {
      setImposterCount(Math.max(1, Math.floor(updated.length / 2)));
    }
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

  const handleImpostersChange = (delta) => {
    sounds.playTap();
    const next = imposterCount + delta;
    if (next >= 1 && next <= maxImposters) {
      setImposterCount(next);
    }
  };

  const durationOptions = [
    { label: '60s', value: 60 },
    { label: '90s', value: 90 },
    { label: '2m', value: 120 },
    { label: '3m', value: 180 },
    { label: 'No Limit', value: 0 },
  ];

  return (
    <div className="screen-container" style={{ paddingBottom: 16 }}>
      {/* imposter.app Header branding */}
      <div style={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span className="badge badge-rose" style={{ letterSpacing: '1px' }}>
            <Sparkles size={12} /> PASS THE PHONE
          </span>
        </div>
        <h1 className="title-huge" style={{ fontSize: '2.5rem', letterSpacing: '-1px' }}>
          👻 IMPOSTER
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>
          Who is the liar? Pass one phone around to find out!
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* 1. Players Section (Like imposter.app) */}
        <div className="glass-panel" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f8fafc', fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <Users size={18} color="var(--accent-cyan)" /> Players ({players.length})
            </div>
            <button
              type="button"
              className="btn-ghost"
              onClick={handleShuffle}
              style={{ fontSize: '0.75rem', padding: '4px 8px', color: 'var(--accent-cyan)' }}
              title="Shuffle turn order"
            >
              <Shuffle size={14} /> Shuffle
            </button>
          </div>

          {/* Quick presets pills */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 10 }}>
            {PRESET_GROUPS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                className="btn-secondary"
                onClick={() => handleLoadPreset(preset)}
                style={{ padding: '4px 10px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Player Names List with Delete (✕) buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 220, overflowY: 'auto', paddingRight: 2 }}>
            {players.map((name, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div
                  className="player-avatar"
                  style={{
                    background: getPlayerColor(idx),
                    width: 32,
                    height: 32,
                    fontSize: '0.85rem',
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
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    padding: '4px 6px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#f8fafc',
                  }}
                />

                <button
                  type="button"
                  onClick={() => handleRemovePlayer(idx)}
                  disabled={players.length <= 3}
                  style={{
                    background: 'transparent',
                    color: players.length <= 3 ? '#475569' : '#f43f5e',
                    padding: 4,
                    borderRadius: 6,
                    cursor: players.length <= 3 ? 'not-allowed' : 'pointer',
                  }}
                  title="Remove player"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Add Player Input */}
          <form onSubmit={handleAddPlayer} style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <input
              type="text"
              value={newPlayerInput}
              onChange={(e) => setNewPlayerInput(e.target.value)}
              placeholder="+ Add another player..."
              maxLength={16}
              style={{ flex: 1, padding: '10px 14px', fontSize: '0.9rem' }}
            />
            <button
              type="submit"
              className="btn-secondary"
              disabled={!newPlayerInput.trim()}
              style={{ padding: '0 14px', background: 'rgba(6,182,212,0.15)', color: '#22d3ee', borderColor: 'rgba(6,182,212,0.3)' }}
            >
              <Plus size={18} /> Add
            </button>
          </form>
        </div>

        {/* 2. Imposters Stepper (imposter.app style) */}
        <div className="glass-panel" style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f8fafc', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>
              <span style={{ fontSize: '1.2rem' }}>👻</span> Imposters
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>
              How many players don't know the word
            </div>
          </div>

          <div className="stepper-pill">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleImpostersChange(-1)}
              disabled={imposterCount <= 1}
              aria-label="Decrease imposters"
            >
              -
            </button>
            <span className="stepper-value" style={{ color: 'var(--accent-rose)' }}>
              {imposterCount}
            </span>
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleImpostersChange(1)}
              disabled={imposterCount >= maxImposters}
              aria-label="Increase imposters"
            >
              +
            </button>
          </div>
        </div>

        {/* 3. Imposter Hint */}
        <div className="glass-panel" style={{ padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase' }}>
              <Lightbulb size={16} color="var(--accent-amber)" /> Imposter Hint
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              {imposterHint === 'off' ? 'Zero help' : imposterHint === 'category' ? 'Knows Category' : 'Easy Clue'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { id: 'off', label: 'OFF', sub: 'Hard' },
              { id: 'category', label: 'CATEGORY', sub: 'Balanced' },
              { id: 'easy', label: 'CLUE', sub: 'Easy' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  sounds.playTap();
                  setImposterHint(opt.id);
                }}
                className={`btn-secondary ${imposterHint === opt.id ? 'selected' : ''}`}
                style={{
                  padding: '8px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  borderColor: imposterHint === opt.id ? 'var(--accent-amber)' : 'rgba(255,255,255,0.08)',
                  background: imposterHint === opt.id ? 'rgba(245,158,11,0.18)' : 'rgba(255,255,255,0.04)',
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: imposterHint === opt.id ? '#fbbf24' : '#e2e8f0' }}>
                  {opt.label}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Clue Round Timer */}
        <div className="glass-panel" style={{ padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase' }}>
              <Clock size={16} color="var(--accent-cyan)" /> Clue Round Duration
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              {duration === 0 ? 'No time limit' : `${duration}s`}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {durationOptions.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => {
                  sounds.playTap();
                  setDuration(d.value);
                }}
                className="btn-secondary"
                style={{
                  flex: 1,
                  padding: '8px 0',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderColor: duration === d.value ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)',
                  background: duration === d.value ? 'rgba(6,182,212,0.18)' : 'rgba(255,255,255,0.04)',
                  color: duration === d.value ? 'var(--accent-cyan)' : '#cbd5e1',
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Language selector */}
        <div className="glass-panel" style={{ padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase' }}>
              <Globe size={16} color="var(--accent-purple)" /> Language
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Secret word script</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { id: 'en', label: 'English', sub: 'Standard' },
              { id: 'tanglish', label: 'Tanglish', sub: 'Casual' },
              { id: 'tamil', label: 'தமிழ்', sub: 'Tamil' },
            ].map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => {
                  sounds.playTap();
                  setLanguage(lang.id);
                }}
                className="btn-secondary"
                style={{
                  padding: '8px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  borderColor: language === lang.id ? 'var(--accent-purple)' : 'rgba(255,255,255,0.08)',
                  background: language === lang.id ? 'rgba(139,92,246,0.18)' : 'rgba(255,255,255,0.04)',
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: language === lang.id ? '#c084fc' : '#e2e8f0' }}>
                  {lang.label}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{lang.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 6. Categories Grid */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#94a3b8' }}>
              📂 Choose Category
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              {CATEGORIES.find((c) => c.id === category)?.name}
            </span>
          </div>

          <div className="category-grid">
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <div
                  key={cat.id}
                  className={`category-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    sounds.playTap();
                    setCategory(cat.id);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ fontSize: '1.4rem' }}>{cat.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: isSelected ? 'var(--accent-cyan)' : '#f8fafc' }}>
                      {cat.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', lineHeight: 1.2, marginTop: 2 }}>
                      {cat.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pinned START GAME button at bottom */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          marginTop: 14,
          zIndex: 40,
          paddingTop: 10,
          paddingBottom: 4,
          background: 'linear-gradient(to top, rgba(7, 10, 18, 0.98) 75%, transparent)',
        }}
      >
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            sounds.playVictory();
            onStartGame();
          }}
          style={{
            padding: '18px 24px',
            fontSize: '1.2rem',
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            boxShadow: '0 12px 35px -5px rgba(6, 182, 212, 0.7)',
          }}
        >
          <Play size={22} fill="#ffffff" /> START GAME
        </button>
      </div>
    </div>
  );
}
