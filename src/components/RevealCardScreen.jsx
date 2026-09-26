import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Sparkles, Lightbulb, Hand } from 'lucide-react';
import { sounds } from '../utils/sound';
import { CATEGORIES } from '../data/words';

export default function RevealCardScreen({
  currentPlayer,
  secretWord,
  imposterHint,
  language,
  onDoneViewing,
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasSeenOnce, setHasSeenOnce] = useState(false);
  const isImposter = currentPlayer.isImposter;

  const categoryObj = CATEGORIES.find((c) => c.id === secretWord.categoryId) || {
    name: 'Secret Category',
    icon: '💡',
    color: '#06b6d4',
  };

  const getDisplayWord = () => {
    if (language === 'tamil' && secretWord.tamil) return secretWord.tamil;
    if (language === 'tanglish' && secretWord.tanglish) return secretWord.tanglish;
    return secretWord.word;
  };

  // Hold to reveal mechanics (signature imposter.app feature)
  const handlePressStart = (e) => {
    e.preventDefault();
    if (!isRevealed) {
      sounds.playFlip();
      sounds.playSecretReveal(isImposter);
      setIsRevealed(true);
      setHasSeenOnce(true);
    }
  };

  const handlePressEnd = (e) => {
    e.preventDefault();
    if (isRevealed) {
      sounds.playFlip();
      setIsRevealed(false);
    }
  };

  const handleToggleClick = () => {
    const next = !isRevealed;
    sounds.playFlip();
    if (next) {
      sounds.playSecretReveal(isImposter);
      setHasSeenOnce(true);
    }
    setIsRevealed(next);
  };

  return (
    <div className="screen-container" style={{ justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
      {/* Header bar */}
      <div style={{ marginTop: 8 }}>
        <span className="badge badge-purple" style={{ fontSize: '0.85rem' }}>
          {currentPlayer.name}'s Secret Card
        </span>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>
          {isRevealed ? 'Release or tap to hide card' : 'Press & hold or tap to view role'}
        </div>
      </div>

      {/* 3D Flippable / Hold-to-Reveal Card */}
      <div
        className="flip-card-wrapper"
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onClick={handleToggleClick}
        style={{ cursor: 'pointer', touchAction: 'none' }}
      >
        <div className={`flip-card-inner ${isRevealed ? 'is-flipped' : ''}`}>
          {/* FRONT OF CARD (Hidden state) */}
          <div className="flip-card-face card-face-front">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              <Lock size={14} /> SECRET ROLE
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  background: 'rgba(6,182,212,0.12)',
                  border: '1.5px solid rgba(6,182,212,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  boxShadow: '0 0 30px rgba(6,182,212,0.25)',
                }}
              >
                <Hand size={42} />
              </div>
              <h3 className="title-large" style={{ color: '#f8fafc' }}>
                HOLD TO REVEAL
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: 240, lineHeight: 1.4 }}>
                Keep your thumb pressed down to see your word. Release to hide!
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#64748b' }}>
              <Sparkles size={14} /> Or Tap to Toggle
            </div>
          </div>

          {/* BACK OF CARD (Revealed Role) */}
          <div className={`flip-card-face card-face-back ${isImposter ? 'card-theme-imposter' : 'card-theme-innocent'}`}>
            {/* INNOCENT CARD CONTENT */}
            {!isImposter ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <span className="badge badge-cyan" style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', borderColor: 'rgba(16,185,129,0.4)' }}>
                    😇 INNOCENT
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                    {categoryObj.icon} {categoryObj.name}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                    YOUR SECRET WORD IS
                  </div>
                  <div
                    className="title-huge"
                    style={{
                      fontSize: '2.5rem',
                      color: '#ffffff',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)',
                      wordBreak: 'break-word',
                    }}
                  >
                    {getDisplayWord()}
                  </div>
                  {language !== 'en' && secretWord.word !== getDisplayWord() && (
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>({secretWord.word})</div>
                  )}
                </div>

                <div
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    width: '100%',
                  }}
                >
                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                    💡 Give <strong>ONE subtle word</strong> during the clue round so other innocents know you have the word!
                  </p>
                </div>
              </>
            ) : (
              /* IMPOSTER CARD CONTENT */
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <span className="badge badge-rose" style={{ animation: 'pulse 1.5s infinite' }}>
                    👻 IMPOSTER
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#fb7185', fontWeight: 700 }}>
                    BLUFF & SURVIVE
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 15px rgba(244,63,94,0.7))' }}>
                    👻
                  </div>
                  <h2 className="title-large text-gradient-rose" style={{ fontSize: '1.7rem' }}>
                    YOU ARE THE IMPOSTER!
                  </h2>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fca5a5' }}>
                    Word: ???
                  </div>
                </div>

                {/* Imposter Hint Section */}
                <div
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(244,63,94,0.3)',
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  {imposterHint === 'category' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Lightbulb size={18} color="#fbbf24" />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>CATEGORY HINT</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fbbf24' }}>
                          {categoryObj.icon} {categoryObj.name}
                        </div>
                      </div>
                    </div>
                  ) : imposterHint === 'easy' ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#fbbf24', textTransform: 'uppercase', marginBottom: 2 }}>
                        <Lightbulb size={14} /> CLUE HINT
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#fef08a', fontWeight: 600 }}>
                        "{secretWord.hint}"
                      </div>
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.78rem', color: '#fca5a5', lineHeight: 1.35 }}>
                      🤫 <strong>Listen carefully:</strong> You do NOT know the secret word. Pay close attention to others' clues and give a believable one-word answer!
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div style={{ width: '100%', maxWidth: 360, marginTop: 16 }}>
        {hasSeenOnce ? (
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              sounds.playTap();
              onDoneViewing();
            }}
            style={{
              padding: '16px 20px',
              fontSize: '1.05rem',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              boxShadow: '0 10px 25px -5px rgba(16,185,129,0.5)',
            }}
          >
            <EyeOff size={18} /> I've Memorized It — Pass Phone ➔
          </button>
        ) : (
          <button
            type="button"
            className="btn-secondary"
            onClick={handleToggleClick}
            style={{ width: '100%', padding: '16px 20px', fontSize: '1rem' }}
          >
            <Eye size={18} /> Press & Hold Card Above
          </button>
        )}
      </div>
    </div>
  );
}
