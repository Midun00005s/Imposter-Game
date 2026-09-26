import React, { useState, useEffect } from 'react';
import { Flame, Play, Pause, ArrowRight, Vote } from 'lucide-react';
import { sounds } from '../utils/sound';
import { getPlayerColor } from '../utils/constants';

export default function ClueRound({
  playersWithRoles,
  duration,
  onProceedToVoting,
}) {
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration > 0 ? duration : 0);
  const [isPaused, setIsPaused] = useState(false);

  const activePlayer = playersWithRoles[currentTurnIndex];
  const totalTurns = playersWithRoles.length;
  const isLastClue = currentTurnIndex === totalTurns - 1;

  // Optimized timer interval lifecycle
  useEffect(() => {
    if (duration === 0 || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          sounds.playBuzzer();
          return 0;
        }
        if (prev <= 11) {
          sounds.playTimerTick(true);
        } else if (prev % 15 === 0) {
          sounds.playTimerTick(false);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, duration]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleNextTurn = () => {
    sounds.playTap();
    if (currentTurnIndex < totalTurns - 1) {
      setCurrentTurnIndex((prev) => prev + 1);
    } else {
      // All clues given, transition to discussion / voting
      onProceedToVoting();
    }
  };

  const handleAdd30s = () => {
    sounds.playTap();
    setTimeLeft((prev) => prev + 30);
  };

  const togglePause = () => {
    sounds.playTap();
    setIsPaused((prev) => !prev);
  };

  const isUrgent = duration > 0 && timeLeft <= 15 && timeLeft > 0;

  return (
    <div className="screen-container" style={{ justifyContent: 'space-between', textAlign: 'center' }}>
      {/* Top Header */}
      <div style={{ marginTop: 8 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span className="badge badge-rose" style={{ fontSize: '0.85rem' }}>
            <Flame size={14} /> CLUE ROUND
          </span>
        </div>
        <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: 4 }}>
          Turn {currentTurnIndex + 1} of {totalTurns}
        </div>
      </div>

      {/* Main Turn Highlight Card */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, margin: '10px 0' }}>
        <div
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: 380,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            borderColor: 'rgba(6,182,212,0.4)',
            background: 'radial-gradient(circle at 50% 0%, rgba(6,182,212,0.15) 0%, rgba(15,21,38,0.9) 70%)',
          }}
        >
          <div
            className="player-avatar"
            style={{
              background: getPlayerColor(currentTurnIndex),
              width: 76,
              height: 76,
              fontSize: '2.2rem',
              boxShadow: `0 0 35px ${getPlayerColor(currentTurnIndex)}66`,
            }}
          >
            {activePlayer.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5 }}>
              CURRENT SPEAKER
            </div>
            <h1 className="title-large" style={{ fontSize: '2rem', marginTop: 2 }}>
              {activePlayer.name}
            </h1>
          </div>

          {/* Rule banner */}
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.1)',
              width: '100%',
            }}
          >
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', marginBottom: 2 }}>
              🗣️ Say EXACTLY ONE Word
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.35 }}>
              Give a clue related to the secret. Imposter must pretend they know the word!
            </p>
          </div>
        </div>

        {/* Timer Section (if enabled) */}
        {duration > 0 && (
          <div
            className="glass-panel"
            style={{
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: 380,
              borderColor: isUrgent ? 'rgba(244,63,94,0.5)' : 'rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                DISCUSSION TIME
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: isUrgent ? '#fb7185' : timeLeft === 0 ? '#f43f5e' : '#f8fafc',
                  lineHeight: 1,
                  marginTop: 2,
                }}
              >
                {formatTime(timeLeft)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              <button
                type="button"
                className="header-icon-btn"
                onClick={handleAdd30s}
                title="Add 30 seconds"
                style={{ width: 36, height: 36, fontSize: '0.75rem', fontWeight: 700 }}
              >
                +30s
              </button>
              <button
                type="button"
                className="header-icon-btn"
                onClick={togglePause}
                title={isPaused ? 'Resume Timer' : 'Pause Timer'}
                style={{ width: 36, height: 36 }}
              >
                {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8, width: '100%', maxWidth: 380, margin: '0 auto' }}>
        <button
          type="button"
          className="btn-primary"
          onClick={handleNextTurn}
          style={{ padding: '16px 20px', fontSize: '1.05rem' }}
        >
          {isLastClue ? (
            <>
              All Clues Given ➔ Discuss & Vote <Vote size={18} />
            </>
          ) : (
            <>
              Next Player's Clue <ArrowRight size={18} />
            </>
          )}
        </button>

        {!isLastClue && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              sounds.playTap();
              onProceedToVoting();
            }}
            style={{ padding: '10px 16px', fontSize: '0.85rem', color: '#94a3b8' }}
          >
            Skip to Discussion & Voting
          </button>
        )}
      </div>
    </div>
  );
}
