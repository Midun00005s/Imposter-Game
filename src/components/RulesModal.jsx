import React from 'react';
import { X, Smartphone, Eye, MessageCircle, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/sound';

export default function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 className="title-medium" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📖</span> How to Play Imposter
          </h2>
          <button className="header-icon-btn" onClick={onClose} aria-label="Close rules">
            <X size={20} />
          </button>
        </div>

        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, paddingRight: 4, marginBottom: 20 }}>
          <div className="glass-panel" style={{ padding: 14, display: 'flex', gap: 12 }}>
            <div style={{ background: 'rgba(6,182,212,0.15)', color: '#22d3ee', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Smartphone size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>1. One Phone, Secret Roles</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Pass the mobile phone to each player in secret. Normal players see the <strong>Secret Word</strong>. The Imposter sees <strong>👻 YOU ARE THE IMPOSTER</strong>!
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 14, display: 'flex', gap: 12 }}>
            <div style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Eye size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>2. 3D Card Reveal</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Tap the card to flip it and secretly view your role. Once seen, tap <strong>Hide & Pass</strong> before handing the phone to the next player.
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 14, display: 'flex', gap: 12 }}>
            <div style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>3. The Clue Round</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                When everyone has seen their card, the timer begins! Each player verbally says <strong>ONE WORD clue</strong> related to the secret. Imposter must listen closely and blend in!
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 14, display: 'flex', gap: 12 }}>
            <div style={{ background: 'rgba(244,63,94,0.15)', color: '#fb7185', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>4. Vote & Final Guess</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Discuss who gave a suspicious clue. Vote out the suspect! If caught, the Imposter gets <strong>one chance to guess the secret word</strong> to steal the win!
              </p>
            </div>
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            sounds.playTap();
            onClose();
          }}
        >
          Got It, Let's Play!
        </button>
      </div>
    </div>
  );
}
