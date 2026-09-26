import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Sliders } from 'lucide-react';
import { sounds } from '../utils/sound';
import { CATEGORIES } from '../data/words';

export default function ResultScreen({
  playersWithRoles,
  secretWord,
  accusedPlayers,
  imposterGuessedWord,
  language,
  onPlayAgain,
  onBackToConfig,
}) {
  const [countdown, setCountdown] = useState(3);

  const imposters = playersWithRoles.filter((p) => p.isImposter);

  // Innocents win if all convicted players are imposters and imposter did NOT guess the word
  const caughtAllImposters =
    accusedPlayers.length > 0 &&
    accusedPlayers.every((accused) => imposters.some((imp) => imp.name === accused.name));

  const innocentsWin = caughtAllImposters && !imposterGuessedWord;
  const isRevealed = countdown <= 0;

  // Reveal countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        sounds.playTimerTick(true);
        setCountdown((c) => c - 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      if (innocentsWin) {
        sounds.playVictory();
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#06b6d4', '#10b981', '#3b82f6', '#f59e0b'],
          });
        } catch {}
      } else {
        sounds.playImposterAlert();
      }
    }
  }, [countdown, innocentsWin]);

  const categoryObj = CATEGORIES.find((c) => c.id === secretWord.categoryId) || {
    name: 'Food',
    icon: '🍕',
  };

  const getDisplayWord = () => {
    if (language === 'tamil' && secretWord.tamil) return secretWord.tamil;
    if (language === 'tanglish' && secretWord.tanglish) return secretWord.tanglish;
    return secretWord.word;
  };

  // If still counting down suspense
  if (!isRevealed) {
    return (
      <div className="screen-container" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: '4rem', animation: 'floatGhost 2s infinite' }}>👻</div>
          <h2 style={{ fontSize: '1.2rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>
            Revealing Truth In...
          </h2>
          <div
            className="title-huge"
            style={{
              fontSize: '5rem',
              color: 'var(--accent-rose)',
              textShadow: '0 0 40px rgba(244,63,94,0.7)',
            }}
          >
            {countdown}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container" style={{ justifyContent: 'space-between', textAlign: 'center' }}>
      {/* Top Banner */}
      <div style={{ marginTop: 6 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span className={innocentsWin ? 'badge badge-cyan' : 'badge badge-rose'} style={{ fontSize: '0.9rem' }}>
            {innocentsWin ? '🎉 INNOCENTS WIN' : '👻 IMPOSTER WINS'}
          </span>
        </div>

        <h1
          className={innocentsWin ? 'title-large' : 'title-large text-gradient-rose'}
          style={{ fontSize: '2rem', marginTop: 6 }}
        >
          {innocentsWin
            ? 'Imposter Was Exposed!'
            : imposterGuessedWord
            ? 'Imposter Guessed the Word!'
            : 'Imposter Fooled Everyone!'}
        </h1>
      </div>

      {/* Main Content Info Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '14px 0' }}>
        {/* The Imposter Card */}
        <div
          className="glass-panel"
          style={{
            padding: '18px 20px',
            borderColor: 'rgba(244,63,94,0.4)',
            background: 'radial-gradient(circle at 50% 0%, rgba(244,63,94,0.18) 0%, rgba(15,21,38,0.85) 75%)',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#fb7185', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700 }}>
            THE IMPOSTER {imposters.length > 1 ? 'WERE' : 'WAS'}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 10 }}>
            {imposters.map((imp) => (
              <div key={imp.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div
                  className="player-avatar"
                  style={{
                    background: 'linear-gradient(135deg, #f43f5e 0%, #9f1239 100%)',
                    width: 58,
                    height: 58,
                    fontSize: '1.6rem',
                    boxShadow: '0 0 25px rgba(244,63,94,0.5)',
                  }}
                >
                  👻
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                  {imp.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Secret Word Card */}
        <div
          className="glass-panel"
          style={{
            padding: '18px 20px',
            borderColor: 'rgba(6,182,212,0.3)',
            background: 'radial-gradient(circle at 50% 0%, rgba(6,182,212,0.15) 0%, rgba(15,21,38,0.85) 75%)',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700 }}>
            SECRET WORD
          </div>
          <div
            className="title-huge shimmer-text"
            style={{ fontSize: '2.4rem', marginTop: 4, letterSpacing: '0.5px' }}
          >
            {categoryObj.icon} {getDisplayWord()}
          </div>
          {language !== 'en' && secretWord.word !== getDisplayWord() && (
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>({secretWord.word})</div>
          )}
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>
            📂 Category: {categoryObj.name}
          </div>
        </div>

        {/* Voting Outcome Breakdown */}
        <div className="glass-panel" style={{ padding: '12px 16px', textAlign: 'left' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>
            Group Accusation
          </div>
          <div style={{ fontSize: '0.9rem', color: '#f8fafc' }}>
            {accusedPlayers.length > 0 ? (
              <span>
                The group voted against:{' '}
                <strong style={{ color: caughtAllImposters ? '#34d399' : '#fb7185' }}>
                  {accusedPlayers.map((p) => p.name).join(', ')}
                </strong>{' '}
                {caughtAllImposters ? '🎯 (Correct!)' : '❌ (Innocent caught!)'}
              </span>
            ) : (
              <span>No suspect was convicted by the group.</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8 }}>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            sounds.playVictory();
            onPlayAgain();
          }}
          style={{ padding: '18px 20px', fontSize: '1.1rem' }}
        >
          <RotateCcw size={18} /> Play Again (Same Players)
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            sounds.playTap();
            onBackToConfig();
          }}
          style={{ padding: '12px 18px', fontSize: '0.95rem' }}
        >
          <Sliders size={16} /> Change Settings & Players
        </button>
      </div>
    </div>
  );
}
