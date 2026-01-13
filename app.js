import React, { useState, useEffect } from 'react';

const FalloutTerminal = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [gameStarted, setGameStarted] = useState(false);
  const [words, setWords] = useState([]);
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [displayLines, setDisplayLines] = useState([]);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [wordDatabase, setWordDatabase] = useState(null);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [dudsRemoved, setDudsRemoved] = useState(0);
  const [resetsUsed, setResetsUsed] = useState(0);
  const [maxDuds] = useState(4);
  const [maxResets] = useState(1);

  const difficulties = {
    veryEasy: { length: 4, label: 'VERY EASY' },
    easy: { length: 6, label: 'EASY' },
    average: { length: 9, label: 'AVERAGE' },
    hard: { length: 11, label: 'HARD' },
    veryHard: { length: 13, label: 'VERY HARD' }
  };

  const falloutWordDatabase = {
    4: [
      'ABLE', 'BACK', 'BANK', 'BASE', 'BEAM', 'BEAR', 'BEAT', 'BEEN', 'BEST', 'BIRD',
      'BLOW', 'BLUE', 'BOAT', 'BODY', 'BOMB', 'BOND', 'BONE', 'BOOK', 'BORN', 'BOTH',
      'BURN', 'BUSY', 'CAGE', 'CALL', 'CALM', 'CAME', 'CAMP', 'CARD', 'CARE', 'CASE',
      'CAST', 'CELL', 'CITY', 'CLUB', 'COAL', 'COAT', 'CODE', 'COLD', 'COME', 'COOL',
      'COPE', 'COPY', 'CORE', 'COST', 'CRAB', 'CREW', 'CULT', 'CURE', 'DARK', 'DASH',
      'DATA', 'DATE', 'DEAD', 'DEAL', 'DEAN', 'DEAR', 'DEBT', 'DECK', 'DEEP', 'DEMO',
      'DENY', 'DESK', 'DIAL', 'DIET', 'DIRT', 'DISC', 'DOCK', 'DOES', 'DONE', 'DOOM',
      'DOOR', 'DOSE', 'DOWN', 'DRAG', 'DRAW', 'DREW', 'DROP', 'DRUG', 'DRUM', 'DUAL',
      'DUCK', 'DUEL', 'DUKE', 'DUMB', 'DUMP', 'DUNE', 'DUSK', 'DUST', 'DUTY', 'EACH',
      'EARN', 'EASE', 'EAST', 'EASY', 'ECHO', 'EDGE', 'EDIT', 'ELSE', 'EMIT', 'EPIC'
    ],
    6: [
      'ACCESS', 'ACTION', 'ACTIVE', 'ACTUAL', 'AGENCY', 'AGENDA', 'AGREED', 'AIMING', 'ALBERT',
      'ALLIES', 'ALMOST', 'ALWAYS', 'AMOUNT', 'ANIMAL', 'ANSWER', 'ANYONE', 'ANYWAY', 'APPEAR',
      'ARMORY', 'AROUND', 'ARREST', 'ARRIVE', 'ARTIST', 'ASKING', 'ASPECT', 'ATTACK', 'ATOMIC',
      'AUTHOR', 'AVENUE', 'BACKED', 'BACKUP', 'BANKER', 'BANNER', 'BARELY', 'BARREL', 'BATTLE',
      'BEATEN', 'BECAME', 'BECOME', 'BEFORE', 'BEHALF', 'BEHIND', 'BELIEF', 'BERLIN', 'BETTER',
      'BINARY', 'BISHOP', 'BLOCKS', 'BLOODY', 'BOARDS', 'BOBBIN', 'BODIES', 'BOMBER', 'BORDER',
      'BOTTLE', 'BOTTOM', 'BOUGHT', 'BRANCH', 'BREACH', 'BREATH', 'BRIDGE', 'BRIGHT', 'BRINGS',
      'BROKER', 'BRONZE', 'BRUTAL', 'BUCKET', 'BUDGET', 'BUFFER', 'BULLET', 'BUNKER', 'BURDEN',
      'BURIAL', 'BURNED', 'BUTTER', 'BUTTON', 'BUYING', 'CABINS', 'CACHED', 'CAESAR', 'CALLED',
      'CAMPUS', 'CANCER', 'CANNON', 'CANYON', 'CARBON', 'CAREER', 'CARGOS', 'CARPET', 'CARVED'
    ],
    9: [
      'ABANDONED', 'ABOLITION', 'ABUNDANCE', 'ACCEPTING', 'ACCIDENTS', 'ACCOMPANY', 'ACCORDING',
      'ADVENTURE', 'ADVERTISE', 'AFFECTING', 'AFTERNOON', 'AGREEABLE', 'AGREEMENT', 'ALONGSIDE',
      'AMUSEMENT', 'ANNOUNCED', 'APARTMENT', 'APOSTOLIC', 'APPARATUS', 'APPEALING', 'APPEARING',
      'ARMSTRONG', 'ARRANGING', 'ARTILLERY', 'ASCENDING', 'ASSAULTED', 'ASSEMBLED', 'ASSERTION',
      'ATTACKING', 'ATTEMPTED', 'ATTENTION', 'ATTRIBUTE', 'AUCTIONED', 'AUTHENTIC', 'AUTHORITY',
      'AWAKENING', 'AWARENESS', 'BACTERIAL', 'BALANCING', 'BALTIMORE', 'BANDSTAND', 'BANDWIDTH',
      'BATTERIES', 'BEAUTIFUL', 'BEGINNING', 'BEHAVIOUR', 'BELITTLED', 'BELONGING', 'BENCHMARK',
      'BILLBOARD', 'BIOGRAPHY', 'BLACKMAIL', 'BLACKNESS', 'BLASPHEMY', 'BLEACHERS', 'BLINDNESS',
      'BOOKSHELF', 'BOOTSTRAP', 'BOULEVARD', 'BOYFRIEND', 'BRAINWASH', 'BREAKFAST', 'BREATHING',
      'BRILLIANT', 'BROADCAST', 'BROADSIDE', 'BROTHERLY', 'BRUTALITY', 'BUILDINGS', 'BULLETINS'
    ],
    11: [
      'ABANDONMENT', 'ABBREVIATED', 'ABERRATIONS', 'ABOLISHMENT', 'ABOVEGROUND', 'ABSTAINING',
      'ABSTRACTING', 'ABSTRACTION', 'ACCELERATED', 'ACCENTUATED', 'ACCEPTANCES', 'ACCESSORIES',
      'ACCOMPLICES', 'ACCORDINGLY', 'ACCOUNTABLE', 'ACCUMULATES', 'ACHIEVEMENT', 'ACKNOWLEDGE',
      'ACTIVATING', 'ADAPTATIONS', 'ADDITIONALLY', 'ADJUSTMENTS', 'ADOLESCENCE', 'ADVANCEMENT',
      'ADVERSARIES', 'ADVERTISING', 'AERONAUTICS', 'AFFIRMATION', 'AFGHANISTAN', 'AGRICULTURE',
      'ALLEVIATED', 'ALLOCATIONS', 'ALTERCATION', 'ALTERNATING', 'ALTERNATIVE', 'AMBASSADORS',
      'AMPHIBIOUS', 'AMPLIFIERS', 'AMUSEMENTS', 'ANALOGOUSLY', 'ANCHORAGE', 'ANESTHESIA',
      'ANNIVERSARY', 'ANNOTATIONS', 'ANTICIPATED', 'ANTIQUARIAN', 'ANTISOCIAL', 'APARTMENTS',
      'APOSTROPHES', 'APPEARANCES', 'APPEASEMENT', 'APPLICATION', 'APPOINTMENT', 'APPRENTICES',
      'ARCHAEOLOGY', 'ARCHIPELAGO', 'ARGENTINIAN', 'ARISTOCRACY', 'ARRANGEMENT', 'ARTICULATED'
    ],
    13: [
      'ABBREVIATIONS', 'ABOLITIONIST', 'ACCELERATION', 'ACCEPTABILITY', 'ACCESSIBILITY',
      'ACCOMMODATED', 'ACCOMMODATES', 'ACCOMPANIMENT', 'ACCOMPLISHED', 'ACCOUNTABILITY',
      'ACCREDITATION', 'ACCULTURATION', 'ACCUMULATIONS', 'ACKNOWLEDGED', 'ACQUISITIONS',
      'ADMINISTRATOR', 'ADVERTISEMENT', 'AERODYNAMICS', 'AFFECTIONATE', 'AFFORDABILITY',
      'AGRICULTURAL', 'ALPHABETICAL', 'ALTERNATIVELY', 'AMBASSADORIAL', 'AMPLIFICATION',
      'ANNIVERSARIES', 'ANNOUNCEMENTS', 'ANTHROPOLOGY', 'ANTIBACTERIAL', 'ANTICIPATING',
      'APOLOGETICALLY', 'APOSTROPHIZE', 'APPARATUSES', 'APPEARANCES', 'APPRECIATION',
      'APPROPRIATELY', 'APPROXIMATED', 'APPROXIMATELY', 'ARCHAEOLOGICAL', 'ARCHITECTURAL',
      'ARGUMENTATIVE', 'ARRANGEMENTS', 'ARTICULATED', 'ASSASSINATION', 'ASSEMBLYWOMAN',
      'ASTONISHINGLY', 'ASTRONOMICAL', 'AUTHENTICATED', 'AUTHORITARIAN', 'AUTHORIZATION'
    ]
  };

  useEffect(() => {
    setWordDatabase(falloutWordDatabase);
  }, []);

  const generateRandomChar = () => {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const brackets = ['()', '[]', '{}', '<>'];
  
  const generateBracketPair = () => {
    const bracket = brackets[Math.floor(Math.random() * brackets.length)];
    const length = Math.floor(Math.random() * 4) + 2;
    let content = '';
    for (let i = 0; i < length; i++) {
      content += generateRandomChar();
    }
    return bracket[0] + content + bracket[1];
  };

  const initGame = () => {
    if (!wordDatabase) return;
    
    const wordLength = difficulties[difficulty].length;
    const availableWords = [...wordDatabase[wordLength]];
    const selectedWords = [];
    
    const numWords = Math.floor(Math.random() * 4) + 12;
    for (let i = 0; i < numWords && availableWords.length > 0; i++) {
      const idx = Math.floor(Math.random() * availableWords.length);
      selectedWords.push(availableWords[idx].toUpperCase());
      availableWords.splice(idx, 1);
    }
    
    const correctPassword = selectedWords[Math.floor(Math.random() * selectedWords.length)];
    
    setWords(selectedWords);
    setPassword(correctPassword);
    setAttempts(4);
    setGuesses([]);
    setGameOver(false);
    setWon(false);
    setDudsRemoved(0);
    setResetsUsed(0);
    
    generateDisplay(selectedWords, wordLength);
    setGameStarted(true);
  };

  const generateDisplay = (wordList, wordLength) => {
    const lines = [];
    const totalChars = 20;
    const linesPerColumn = 14;
    
    const positions = [];
    
    for (let w = 0; w < wordList.length; w++) {
      const lineNum = Math.floor(Math.random() * linesPerColumn);
      const col = Math.floor(Math.random() * 2);
      const startPos = Math.floor(Math.random() * (totalChars - wordLength));
      positions.push({ lineNum, col, startPos, word: wordList[w] });
    }
    
    for (let lineNum = 0; lineNum < linesPerColumn; lineNum++) {
      const hexAddress = `0x${(0xF4F0 + lineNum * 12).toString(16).toUpperCase()}`;
      let leftLine = '';
      let rightLine = '';
      
      for (let col = 0; col < 2; col++) {
        let line = '';
        const wordsInThisLine = positions.filter(p => p.lineNum === lineNum && p.col === col);
        const occupiedPositions = new Set();
        
        wordsInThisLine.forEach(w => {
          for (let i = 0; i < w.word.length; i++) {
            occupiedPositions.add(w.startPos + i);
          }
        });
        
        for (let i = 0; i < totalChars; i++) {
          const wordAtPos = wordsInThisLine.find(w => w.startPos === i);
          
          if (wordAtPos) {
            line += wordAtPos.word;
            i += wordAtPos.word.length - 1;
          } else if (!occupiedPositions.has(i) && Math.random() > 0.96 && i < totalChars - 4) {
            const bracket = generateBracketPair();
            if (i + bracket.length <= totalChars) {
              line += bracket;
              i += bracket.length - 1;
            } else {
              line += generateRandomChar();
            }
          } else if (!occupiedPositions.has(i)) {
            line += generateRandomChar();
          }
        }
        
        if (col === 0) leftLine = line;
        else rightLine = line;
      }
      
      lines.push({
        hexLeft: hexAddress,
        hexRight: `0x${(0xF4F0 + (lineNum + linesPerColumn) * 12).toString(16).toUpperCase()}`,
        leftLine,
        rightLine
      });
    }
    
    setDisplayLines(lines);
  };

  const getLikeness = (wordA, wordB) => {
    let likeness = 0;
    for (let i = 0; i < wordA.length; i++) {
      if (wordA[i] === wordB[i]) likeness++;
    }
    return likeness;
  };

  const handleWordClick = (word) => {
    if (gameOver || guesses.some(g => g.word === word)) return;
    
    if (word === password) {
      setWon(true);
      setGameOver(true);
      setGuesses([...guesses, { word, likeness: word.length }]);
    } else {
      const likeness = getLikeness(word, password);
      setGuesses([...guesses, { word, likeness }]);
      
      if (attempts <= 1) {
        setGameOver(true);
        setAttempts(0);
      } else {
        setAttempts(attempts - 1);
      }
    }
  };

  const handleBracketClick = (bracket) => {
    if (gameOver) return;
    
    const remainingWords = words.filter(w => !guesses.some(g => g.word === w) && w !== password);
    
    if (remainingWords.length > 0 && dudsRemoved < maxDuds) {
      const wordToRemove = remainingWords[Math.floor(Math.random() * remainingWords.length)];
      setGuesses([...guesses, { word: wordToRemove, isDud: true }]);
      setDudsRemoved(dudsRemoved + 1);
    } 
    else if (attempts < 4 && resetsUsed < maxResets) {
      setAttempts(4);
      setGuesses([...guesses, { word: 'RESET', isReset: true }]);
      setResetsUsed(resetsUsed + 1);
    }
    else {
      setGuesses([...guesses, { word: 'EMPTY', isEmpty: true }]);
    }
  };

  const renderLine = (text, isLeft) => {
    const elements = [];
    let i = 0;
    
    while (i < text.length) {
      let foundWord = false;
      
      for (const word of words) {
        if (text.substr(i, word.length) === word) {
          const isGuessed = guesses.some(g => g.word === word);
          const isHovered = hoveredWord === word;
          
          elements.push(
            <span
              key={`${isLeft ? 'L' : 'R'}-${i}`}
              className={`word ${isGuessed ? 'guessed' : ''} ${isHovered ? 'hovered' : ''}`}
              onClick={() => handleWordClick(word)}
              onMouseEnter(() => setHoveredWord(word)}
              onMouseLeave(() => setHoveredWord(null)}
            >
              {word}
            </span>
          );
          i += word.length;
          foundWord = true;
          break;
        }
      }
      
      if (!foundWord) {
        const char = text[i];
        const nextChar = text[i + 1];
        
        if ((char === '(' || char === '[' || char === '{' || char === '<') && nextChar) {
          let bracketEnd = -1;
          const closingBracket = char === '(' ? ')' : char === '[' ? ']' : char === '{' ? '}' : '>';
          
          for (let j = i + 1; j < text.length && j < i + 8; j++) {
            if (text[j] === closingBracket) {
              bracketEnd = j;
              break;
            }
          }
          
          if (bracketEnd !== -1) {
            const bracketContent = text.substring(i, bracketEnd + 1);
            elements.push(
              <span
                key={`${isLeft ? 'L' : 'R'}-${i}`}
                className="bracket"
                onClick={() => handleBracketClick(bracketContent)}
              >
                {bracketContent}
              </span>
            );
            i = bracketEnd + 1;
          } else {
            elements.push(<span key={`${isLeft ? 'L' : 'R'}-${i}`}>{char}</span>);
            i++;
          }
        } else {
          elements.push(<span key={`${isLeft ? 'L' : 'R'}-${i}`}>{char}</span>);
          i++;
        }
      }
    }
    
    return elements;
  };

  if (!gameStarted) {
    return (
      <div className="terminal-container">
        <div className="terminal-screen">
          <div className="welcome-screen">
            <h1 className="terminal-title">ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</h1>
            
            {showHowToPlay ? (
              <div className="how-to-play">
                <h2>HOW TO PLAY</h2>
                <div className="instructions">
                  <p><strong>OBJECTIVE:</strong> Find the correct password in 4 attempts or less.</p>
                  
                  <p><strong>GAMEPLAY:</strong></p>
                  <p>• Click on any word to make a guess</p>
                  <p>• Each wrong guess shows a LIKENESS score</p>
                  <p>• LIKENESS = number of letters that match in the exact same position</p>
                  <p>• Use this info to eliminate wrong passwords</p>
                  
                  <p><strong>EXAMPLE:</strong></p>
                  <p>If the password is HOUSE and you guess MOUSE:</p>
                  <p>LIKENESS=4 (O, U, S, E match in positions 2, 3, 4, 5)</p>
                  
                  <p><strong>HELPERS:</strong></p>
                  <p>• Click matching brackets like (), [], {}, &lt;&gt; to remove duds</p>
                  <p>• Or restore attempts if all duds are gone</p>
                  
                  <p><strong>WIN:</strong> Guess the correct password before attempts run out!</p>
                </div>
                <button className="back-btn" onClick={() => setShowHowToPlay(false)}>
                  BACK TO MENU
                </button>
              </div>
            ) : (
              <div className="difficulty-select">
                <h2>SELECT DIFFICULTY LEVEL:</h2>
                {Object.entries(difficulties).map(([key, val]) => (
                  <button
                    key={key}
                    className={`difficulty-btn ${difficulty === key ? 'selected' : ''}`}
                    onClick={() => setDifficulty(key)}
                  >
                    {val.label} ({val.length} LETTERS)
                  </button>
                ))}
                <button className="start-btn" onClick={initGame}>
                  INITIATE HACK
                </button>
                <button className="how-to-btn" onClick={() => setShowHowToPlay(true)}>
                  HOW TO PLAY
                </button>
              </div>
            )}
          </div>
        </div>
        
        <style>{`
          .terminal-container {
            width: 100%;
            height: 100vh;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Courier New', monospace;
          }
          
          .terminal-screen {
            width: 90%;
            max-width: 900px;
            height: 85vh;
            max-height: 650px;
            background: #0a3d0a;
            border: 3px solid #1f8f1f;
            box-shadow: 0 0 30px #1f8f1f, inset 0 0 50px rgba(0, 0, 0, 0.5);
            padding: 20px;
            color: #1f8f1f;
            overflow: hidden;
          }
          
          .welcome-screen {
            text-align: center;
            padding: 30px 20px;
            overflow-y: auto;
            max-height: calc(85vh - 40px);
          }
          
          .terminal-title {
            font-size: 22px;
            margin-bottom: 30px;
            text-shadow: 0 0 10px #1f8f1f;
          }
          
          .difficulty-select h2 {
            margin-bottom: 25px;
            font-size: 16px;
          }
          
          .difficulty-btn {
            display: block;
            width: 280px;
            margin: 12px auto;
            padding: 12px;
            background: transparent;
            border: 2px solid #1f8f1f;
            color: #1f8f1f;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
          }
          
          .difficulty-btn:hover,
          .difficulty-btn.selected {
            background: #1f8f1f;
            color: #0a3d0a;
            box-shadow: 0 0 15px #1f8f1f;
          }
          
          .start-btn,
          .how-to-btn,
          .back-btn {
            margin: 15px auto 0;
            padding: 15px 35px;
            background: transparent;
            border: 3px solid #1f8f1f;
            color: #1f8f1f;
            font-family: 'Courier New', monospace;
            font-size: 16px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
            display: block;
          }
          
          .start-btn:hover,
          .how-to-btn:hover,
          .back-btn:hover {
            background: #1f8f1f;
            color: #0a3d0a;
            box-shadow: 0 0 20px #1f8f1f;
          }
          
          .how-to-play {
            max-width: 700px;
            margin: 0 auto;
            text-align: left;
          }
          
          .how-to-play h2 {
            text-align: center;
            font-size: 18px;
            margin-bottom: 20px;
            text-shadow: 0 0 10px #1f8f1f;
          }
          
          .instructions {
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
