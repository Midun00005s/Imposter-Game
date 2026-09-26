import React from 'react';
import { X, Trophy, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/sound';

export default function StatsModal({ isOpen, onClose, stats, onResetStats }) {
  if (!isOpen) return null;

  const total = stats.totalGames || 0;
  const imposterWins = stats.imposterWins || 0;
  const innocentWins = stats.innocentWins || 0;
  const imposterRate = total > 0 ? Math.round((imposterWins / total) * 100) : 0;
  const innocentRate = total > 0 ? Math.round((innocentWins / total) * 100) : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 className="title-medium" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Trophy size={22} color="#fbbf24" /> Session Scoreboard
          </h2>
          <button className="header-icon-btn" onClick={onClose} aria-label="Close stats">
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
          <div className="glass-panel" style={{ padding: 16, textAlign: 'center', borderColor: 'rgba(16,185,129,0.3)' }}>
            <span style={{ fontSize: '1.8rem' }}>😇</span>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#34d399', marginTop: 4 }}>{innocentWins}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Innocents Won</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>{innocentRate}% win rate</div>
          </div>

          <div className="glass-panel" style={{ padding: 16, textAlign: 'center', borderColor: 'rgba(244,63,94,0.3)' }}>
            <span style={{ fontSize: '1.8rem' }}>👻</span>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#fb7185', marginTop: 4 }}>{imposterWins}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Imposters Won</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>{imposterRate}% win rate</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ color: '#94a3b8', fontWeight: 600 }}>Total Games Played</span>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#f8fafc' }}>{total}</span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn-secondary"
            style={{ flex: 1, color: '#f43f5e', borderColor: 'rgba(244,63,94,0.2)' }}
            onClick={() => {
              if (window.confirm('Reset all stats for this session?')) {
                sounds.playTap();
                onResetStats();
              }
            }}
          >
            <RotateCcw size={16} /> Reset
          </button>
          <button
            className="btn-primary"
            style={{ flex: 2 }}
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
