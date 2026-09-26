import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

export default function ImposterGuessChallenge({
  imposterPlayer,
  secretWord,
  onGuessResult,
}) {
  const [selectedWord, setSelectedWord] = useState('');

  // Prepare multiple choice options (the real secret word + decoys shuffled)
  const [options] = useState(() => {
    const list = [secretWord.word, ...(secretWord.decoys || ['Coffee', 'Burger', 'Car'])].slice(0, 4);
    return list.sort(() => Math.random() - 0.5);
  });

  const handleSelectOption = (wordOption) => {
    setSelectedWord(wordOption);
    sounds.playTap();
  };

  const handleConfirmGuess = () => {
    const isCorrect = selectedWord.toLowerCase().trim() === secretWord.word.toLowerCase().trim();
    if (isCorrect) {
      sounds.playVictory();
    } else {
      sounds.playBuzzer();
    }
    onGuessResult(isCorrect, selectedWord);
  };

  const handleSkipGuess = () => {
    sounds.playTap();
    onGuessResult(false, null);
  };

  return (
    <div className="screen-container" style={{ justifyContent: 'space-between', textAlign: 'center' }}>
      {/* Top Header */}
      <div style={{ marginTop: 10 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span className="badge badge-purple" style={{ fontSize: '0.85rem' }}>
            <Sparkles size={14} /> CLUTCH REVERSAL ROUND
          </span>
        </div>
        <h1 className="title-large text-gradient" style={{ fontSize: '1.8rem', marginTop: 4 }}>
          Imposter's Last Stand!
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: 2 }}>
          {imposterPlayer.name} was caught! But can they guess the secret word to steal victory?
        </p>
      </div>

      {/* Center Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '20px 0' }}>
        <div style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 600 }}>
          {imposterPlayer.name}, what was the group's secret word?
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {options.map((opt) => {
            const isSelected = selectedWord === opt;
            return (
              <button
                key={opt}
                type="button"
                className="btn-secondary"
                onClick={() => handleSelectOption(opt)}
                style={{
                  padding: '16px 12px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--surface-border)',
                  background: isSelected ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.05)',
                  color: isSelected ? '#22d3ee' : '#f8fafc',
                  boxShadow: isSelected ? '0 0 15px rgba(6,182,212,0.3)' : 'none',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
        <button
          type="button"
          className="btn-primary"
          disabled={!selectedWord}
          onClick={handleConfirmGuess}
          style={{
            padding: '16px 20px',
            fontSize: '1.05rem',
            opacity: selectedWord ? 1 : 0.4,
            cursor: selectedWord ? 'pointer' : 'not-allowed',
          }}
        >
          Confirm Guess & Reveal
        </button>

        <button
          type="button"
          className="btn-ghost"
          onClick={handleSkipGuess}
          style={{ fontSize: '0.85rem', color: '#94a3b8' }}
        >
          I Don't Know / Skip Guess
        </button>
      </div>
    </div>
  );
}
