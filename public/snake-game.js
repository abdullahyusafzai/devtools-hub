(function () {
  const h = React.createElement;
  const BOARD_SIZE = 20;
  const SPEEDS = { Easy: 190, Medium: 125, Hard: 78 };
  const makeFood = (snake) => {
    const open = [];
    for (let y = 0; y < BOARD_SIZE; y += 1) {
      for (let x = 0; x < BOARD_SIZE; x += 1) {
        if (!snake.some((part) => part.x === x && part.y === y)) open.push({ x, y });
      }
    }
    return open.length ? open[Math.floor(Math.random() * open.length)] : null;
  };

  window.SnakeGame = function SnakeGame() {
    const canvasRef = React.useRef(null);
    const swipeRef = React.useRef(null);
    const game = React.useRef({
      snake: [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }],
      food: { x: 14, y: 10 },
      direction: { x: 1, y: 0 },
      queuedDirection: { x: 1, y: 0 },
      status: 'ready',
      score: 0
    });
    const [difficulty, setDifficulty] = React.useState('Medium');
    const [status, setStatus] = React.useState('ready');
    const [score, setScore] = React.useState(0);
    const [highScore, setHighScore] = React.useState(() => {
      try { return Number(window.localStorage.getItem('devtools-hub-snake-high-score')) || 0; } catch { return 0; }
    });
    const [tick, setTick] = React.useState(0);

    const setDirection = (x, y) => {
      const current = game.current.direction;
      if (x === -current.x && y === -current.y) return;
      game.current.queuedDirection = { x, y };
    };

    const reset = () => {
      game.current = {
        snake: [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }],
        food: { x: 14, y: 10 },
        direction: { x: 1, y: 0 },
        queuedDirection: { x: 1, y: 0 },
        status: 'playing',
        score: 0
      };
      setScore(0);
      setStatus('playing');
      setTick((value) => value + 1);
    };

    const togglePause = () => {
      if (game.current.status === 'playing') {
        game.current.status = 'paused';
        setStatus('paused');
      } else if (game.current.status === 'paused') {
        game.current.status = 'playing';
        setStatus('playing');
      } else if (game.current.status === 'ready' || game.current.status === 'over') {
        reset();
      }
    };

    React.useEffect(() => {
      const onKeyDown = (event) => {
        const key = event.key.toLowerCase();
        const directions = {
          arrowup: [0, -1], w: [0, -1],
          arrowdown: [0, 1], s: [0, 1],
          arrowleft: [-1, 0], a: [-1, 0],
          arrowright: [1, 0], d: [1, 0]
        };
        if (key === ' ' || key === 'spacebar') {
          event.preventDefault();
          togglePause();
          return;
        }
        if (directions[key]) {
          event.preventDefault();
          setDirection(...directions[key]);
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    React.useEffect(() => {
      if (status !== 'playing') return undefined;
      const timer = window.setInterval(() => {
        const current = game.current;
        current.direction = current.queuedDirection;
        const head = {
          x: current.snake[0].x + current.direction.x,
          y: current.snake[0].y + current.direction.y
        };
        const ate = current.food && head.x === current.food.x && head.y === current.food.y;
        const collisionBody = ate ? current.snake : current.snake.slice(0, -1);
        const hitWall = head.x < 0 || head.y < 0 || head.x >= BOARD_SIZE || head.y >= BOARD_SIZE;
        const hitSelf = collisionBody.some((part) => part.x === head.x && part.y === head.y);
        if (hitWall || hitSelf) {
          current.status = 'over';
          setStatus('over');
          return;
        }
        current.snake = [head, ...(ate ? current.snake : current.snake.slice(0, -1))];
        if (ate) {
          current.score += 10;
          setScore(current.score);
          setHighScore((previous) => {
            const next = Math.max(previous, current.score);
            try { window.localStorage.setItem('devtools-hub-snake-high-score', String(next)); } catch {}
            return next;
          });
          current.food = makeFood(current.snake);
          if (!current.food) {
            current.status = 'over';
            setStatus('over');
          }
        }
        setTick((value) => value + 1);
      }, SPEEDS[difficulty]);
      return () => window.clearInterval(timer);
    }, [status, difficulty]);

    React.useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!context) return;
      const cell = canvas.width / BOARD_SIZE;
      context.fillStyle = '#dce8c5';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = 'rgba(42, 68, 44, .09)';
      context.lineWidth = 1;
      for (let index = 1; index < BOARD_SIZE; index += 1) {
        context.beginPath(); context.moveTo(index * cell, 0); context.lineTo(index * cell, canvas.height); context.stroke();
        context.beginPath(); context.moveTo(0, index * cell); context.lineTo(canvas.width, index * cell); context.stroke();
      }
      const current = game.current;
      if (current.food) {
        context.fillStyle = '#bd4b42';
        context.fillRect(current.food.x * cell + 3, current.food.y * cell + 3, cell - 6, cell - 6);
      }
      current.snake.forEach((part, index) => {
        context.fillStyle = index === 0 ? '#1d3e2b' : '#41694a';
        context.fillRect(part.x * cell + 2, part.y * cell + 2, cell - 4, cell - 4);
      });
    }, [tick]);

    const pointerDown = (event) => { swipeRef.current = { x: event.clientX, y: event.clientY }; };
    const pointerUp = (event) => {
      if (!swipeRef.current) return;
      const dx = event.clientX - swipeRef.current.x;
      const dy = event.clientY - swipeRef.current.y;
      swipeRef.current = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
      if (Math.abs(dx) > Math.abs(dy)) setDirection(dx > 0 ? 1 : -1, 0);
      else setDirection(0, dy > 0 ? 1 : -1);
    };

    const directionButton = (label, x, y) => h('button', {
      type: 'button', onClick: () => setDirection(x, y), 'aria-label': `Move ${label}`,
      className: 'h-12 min-w-12 rounded-xl border border-[#d8e3cb] bg-[#edf4e4] px-4 text-lg font-bold text-[#2d5638] active:scale-95'
    }, label === 'up' ? '↑' : label === 'down' ? '↓' : label === 'left' ? '←' : '→');

    return h('section', { className: 'mx-auto max-w-3xl', 'aria-labelledby': 'snake-title' },
      h('div', { className: 'mb-6 flex flex-wrap items-end justify-between gap-4' },
        h('div', null,
          h('p', { className: 'mb-2 text-xs font-semibold uppercase tracking-[.16em] text-violet-600' }, 'Games & entertainment'),
          h('h2', { id: 'snake-title', className: 'text-3xl font-bold tracking-tight' }, 'Snake'),
          h('p', { className: 'mt-2 text-sm text-gray-500' }, 'A fresh, original take on the classic grid game.')),
        h('div', { className: 'flex gap-3' },
          h('div', { className: 'rounded-2xl border border-gray-200 bg-white px-4 py-3 text-center' }, h('div', { className: 'text-xs text-gray-500' }, 'Score'), h('div', { className: 'text-xl font-bold tabular-nums' }, score)),
          h('div', { className: 'rounded-2xl border border-gray-200 bg-white px-4 py-3 text-center' }, h('div', { className: 'text-xs text-gray-500' }, 'Best'), h('div', { className: 'text-xl font-bold tabular-nums' }, highScore)))), 
      h('div', { className: 'grid gap-6 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_220px] sm:p-6' },
        h('div', null,
          h('div', { className: 'relative mx-auto w-full max-w-[400px] overflow-hidden rounded-2xl border-4 border-[#294431] bg-[#dce8c5]', onPointerDown: pointerDown, onPointerUp: pointerUp, onPointerCancel: () => { swipeRef.current = null; } },
            h('canvas', { ref: canvasRef, width: 400, height: 400, className: 'snake-board block', role: 'img', 'aria-label': `Snake game board. Score ${score}. Use arrow keys or WASD to move.` }),
            status !== 'playing' && h('div', { className: 'absolute inset-0 flex flex-col items-center justify-center bg-[#17251c]/75 px-4 text-center text-white', 'aria-live': 'polite' },
              h('p', { className: 'text-xl font-bold' }, status === 'ready' ? 'Ready when you are' : status === 'paused' ? 'Paused' : 'Game over'),
              h('p', { className: 'mt-2 text-sm text-white/80' }, status === 'ready' ? 'Collect the red squares. Avoid the walls and your tail.' : status === 'paused' ? 'Press Space or Resume to continue.' : `Final score: ${score}`))),
          h('div', { className: 'mt-4 flex justify-center gap-2 sm:hidden', 'aria-label': 'Touch direction controls' },
            h('div', { className: 'grid grid-cols-3 gap-2' },
              h('span'), directionButton('up', 0, -1), h('span'),
              directionButton('left', -1, 0), directionButton('down', 0, 1), directionButton('right', 1, 0))),
          h('p', { className: 'mt-4 text-center text-xs text-gray-500' }, 'Arrow keys or WASD to move · Space to pause · Swipe on the board')),
        h('aside', { className: 'flex flex-col gap-4' },
          h('div', null, h('label', { htmlFor: 'snake-difficulty', className: 'mb-2 block text-sm font-semibold' }, 'Difficulty'),
            h('select', { id: 'snake-difficulty', value: difficulty, onChange: (event) => setDifficulty(event.target.value), className: 'w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm' },
              ['Easy', 'Medium', 'Hard'].map((item) => h('option', { key: item, value: item }, item)))),
          h('button', { type: 'button', onClick: togglePause, className: 'rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700' }, status === 'playing' ? 'Pause game' : status === 'paused' ? 'Resume game' : status === 'over' ? 'Play again' : 'Start game'),
          h('button', { type: 'button', onClick: reset, className: 'rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold hover:bg-gray-50' }, 'Restart'),
          h('div', { className: 'rounded-2xl bg-[#f1f4e9] p-4 text-xs leading-5 text-[#53624f]' }, 'Food adds 10 points and grows your snake. Your best score is saved on this device.'),
          h('p', { className: 'text-xs leading-5 text-gray-500' }, 'Original browser game; no connection or external assets required.'))));
  };
})();
