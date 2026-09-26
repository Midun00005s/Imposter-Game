import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RulesModal from './components/RulesModal';
import StatsModal from './components/StatsModal';
import PlayerSetupModal from './components/PlayerSetupModal';
import HomeConfig from './components/HomeConfig';
import PassPhoneScreen from './components/PassPhoneScreen';
import RevealCardScreen from './components/RevealCardScreen';
import PassNextPrompt from './components/PassNextPrompt';
import ClueRound from './components/ClueRound';
import VotingPhase from './components/VotingPhase';
import ImposterGuessChallenge from './components/ImposterGuessChallenge';
import ResultScreen from './components/ResultScreen';

import { getRandomWord, assignRoles } from './data/words';
import { DEFAULT_PLAYERS } from './utils/constants';
import { sounds } from './utils/sound';

export default function App() {
  // Navigation & Game State: 'HOME' | 'PASS_PHONE' | 'REVEAL_CARD' | 'PASS_NEXT' | 'CLUE_ROUND' | 'VOTING' | 'IMPOSTER_GUESS' | 'RESULT'
  const [gameState, setGameState] = useState('HOME');

  // Modals
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isPlayerSetupOpen, setIsPlayerSetupOpen] = useState(false);

  // Settings & Configuration
  const [players, setPlayers] = useState(() => {
    try {
      const saved = localStorage.getItem('imposter_saved_players');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_PLAYERS;
  });

  const [imposterCount, setImposterCount] = useState(1);
  const [imposterHint, setImposterHint] = useState('category'); // 'off' | 'category' | 'easy'
  const [category, setCategory] = useState('all');
  const [duration, setDuration] = useState(120); // seconds (0 = unlimited)
  const [language, setLanguage] = useState('en'); // 'en' | 'tanglish' | 'tamil'

  // Audio / Haptic settings
  const [soundEnabled, setSoundEnabled] = useState(sounds.soundEnabled);
  const [hapticEnabled, setHapticEnabled] = useState(sounds.hapticEnabled);

  // Scoreboard stats
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('imposter_stats');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { totalGames: 0, imposterWins: 0, innocentWins: 0 };
  });

  // Active Round State
  const [playersWithRoles, setPlayersWithRoles] = useState([]);
  const [secretWord, setSecretWord] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [accusedPlayers, setAccusedPlayers] = useState([]);
  const [imposterGuessedWord, setImposterGuessedWord] = useState(false);

  // Persist players roster whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('imposter_saved_players', JSON.stringify(players));
    } catch {}
  }, [players]);

  // Persist stats whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('imposter_stats', JSON.stringify(stats));
    } catch {}
  }, [stats]);

  // Start a new game round
  const handleStartGame = () => {
    // 1. Assign secret word
    const chosenWord = getRandomWord(category);
    setSecretWord(chosenWord);

    // 2. Assign roles
    const assigned = assignRoles(players, imposterCount);
    setPlayersWithRoles(assigned);

    // 3. Reset turn & round trackers
    setCurrentPlayerIndex(0);
    setAccusedPlayers([]);
    setImposterGuessedWord(false);

    // 4. Begin pass-the-phone sequence
    setGameState('PASS_PHONE');
  };

  // Step 1 -> Step 2: Current player clicks "I am [Name] — Reveal Card"
  const handleProceedToReveal = () => {
    setGameState('REVEAL_CARD');
  };

  // Step 2 -> Step 3: Current player finished viewing card
  const handleDoneViewingCard = () => {
    const nextIdx = currentPlayerIndex + 1;
    if (nextIdx < playersWithRoles.length) {
      // More players left, show intermediate pass screen
      setGameState('PASS_NEXT');
    } else {
      // All players have seen their cards!
      sounds.playVictory();
      setGameState('CLUE_ROUND');
    }
  };

  // Intermediate screen -> Ready for next player
  const handleNextPlayerReady = () => {
    setCurrentPlayerIndex((prev) => prev + 1);
    setGameState('PASS_PHONE');
  };

  // Clue round done -> Move to Voting & Accusation
  const handleProceedToVoting = () => {
    sounds.playTap();
    setGameState('VOTING');
  };

  // Group has chosen suspects
  const handleRevealAccused = (suspects) => {
    setAccusedPlayers(suspects);

    const imposters = playersWithRoles.filter((p) => p.isImposter);
    const caughtImposter = suspects.find((s) => imposters.some((imp) => imp.name === s.name));

    // If an imposter was caught, let them attempt the clutch guess challenge!
    if (caughtImposter) {
      setGameState('IMPOSTER_GUESS');
    } else {
      // Innocents accused the wrong person! Imposter immediately wins!
      recordGameResult(false);
      setGameState('RESULT');
    }
  };

  // Imposter completes clutch guess
  const handleGuessResult = (isCorrect) => {
    if (isCorrect) {
      // Imposter guessed correctly! Imposter wins!
      setImposterGuessedWord(true);
      recordGameResult(false);
    } else {
      // Imposter failed! Innocents win!
      setImposterGuessedWord(false);
      recordGameResult(true);
    }
    setGameState('RESULT');
  };

  const recordGameResult = (innocentsWon) => {
    setStats((prev) => ({
      totalGames: (prev.totalGames || 0) + 1,
      innocentWins: innocentsWon ? (prev.innocentWins || 0) + 1 : prev.innocentWins || 0,
      imposterWins: !innocentsWon ? (prev.imposterWins || 0) + 1 : prev.imposterWins || 0,
    }));
  };

  const handleResetStats = () => {
    const fresh = { totalGames: 0, imposterWins: 0, innocentWins: 0 };
    setStats(fresh);
  };

  const handlePlayAgain = () => {
    handleStartGame();
  };

  const handleGoHome = () => {
    setGameState('HOME');
  };

  return (
    <>
      <Header
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        hapticEnabled={hapticEnabled}
        setHapticEnabled={setHapticEnabled}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
        gameState={gameState}
        onGoHome={handleGoHome}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflowY: 'auto' }}>
        {gameState === 'HOME' && (
          <HomeConfig
            players={players}
            setPlayers={setPlayers}
            imposterCount={imposterCount}
            setImposterCount={setImposterCount}
            imposterHint={imposterHint}
            setImposterHint={setImposterHint}
            category={category}
            setCategory={setCategory}
            duration={duration}
            setDuration={setDuration}
            language={language}
            setLanguage={setLanguage}
            onOpenPlayerSetup={() => setIsPlayerSetupOpen(true)}
            onStartGame={handleStartGame}
          />
        )}

        {gameState === 'PASS_PHONE' && (
          <PassPhoneScreen
            currentPlayer={playersWithRoles[currentPlayerIndex]}
            playerIndex={currentPlayerIndex}
            totalPlayers={playersWithRoles.length}
            onProceedToReveal={handleProceedToReveal}
          />
        )}

        {gameState === 'REVEAL_CARD' && (
          <RevealCardScreen
            currentPlayer={playersWithRoles[currentPlayerIndex]}
            secretWord={secretWord}
            imposterHint={imposterHint}
            language={language}
            onDoneViewing={handleDoneViewingCard}
          />
        )}

        {gameState === 'PASS_NEXT' && (
          <PassNextPrompt
            prevPlayer={playersWithRoles[currentPlayerIndex]}
            nextPlayer={playersWithRoles[currentPlayerIndex + 1]}
            nextPlayerIndex={currentPlayerIndex + 1}
            totalPlayers={playersWithRoles.length}
            onNextPlayerReady={handleNextPlayerReady}
          />
        )}

        {gameState === 'CLUE_ROUND' && (
          <ClueRound
            playersWithRoles={playersWithRoles}
            duration={duration}
            onProceedToVoting={handleProceedToVoting}
          />
        )}

        {gameState === 'VOTING' && (
          <VotingPhase
            playersWithRoles={playersWithRoles}
            imposterCount={imposterCount}
            onRevealResults={handleRevealAccused}
          />
        )}

        {gameState === 'IMPOSTER_GUESS' && (
          <ImposterGuessChallenge
            imposterPlayer={playersWithRoles.find((p) => p.isImposter)}
            secretWord={secretWord}
            language={language}
            onGuessResult={handleGuessResult}
          />
        )}

        {gameState === 'RESULT' && (
          <ResultScreen
            playersWithRoles={playersWithRoles}
            secretWord={secretWord}
            accusedPlayers={accusedPlayers}
            imposterGuessedWord={imposterGuessedWord}
            language={language}
            onPlayAgain={handlePlayAgain}
            onBackToConfig={handleGoHome}
          />
        )}
      </main>

      {/* Modals */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
      <StatsModal isOpen={isStatsOpen} onClose={() => setIsStatsOpen(false)} stats={stats} onResetStats={handleResetStats} />
      <PlayerSetupModal
        isOpen={isPlayerSetupOpen}
        onClose={() => setIsPlayerSetupOpen(false)}
        players={players}
        setPlayers={setPlayers}
      />
    </>
  );
}
