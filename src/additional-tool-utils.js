export function evaluateArithmeticExpression(source) {
  if (source.length > 120) throw new Error('Expression is too long.');
  const tokens = [];
  const tokenPattern = /\s*(?:(\d+(?:\.\d*)?|\.\d+)|([()+\-*/%]))/y;
  let cursor = 0;
  while (cursor < source.length) {
    if (/^\s*$/.test(source.slice(cursor))) break;
    tokenPattern.lastIndex = cursor;
    const match = tokenPattern.exec(source);
    if (!match) throw new Error('Invalid character in expression.');
    tokens.push(match[1] ?? match[2]);
    cursor = tokenPattern.lastIndex;
  }

  let index = 0;
  const parseExpression = () => {
    const parsePrimary = () => {
      const token = tokens[index++];
      if (token === '(') {
        const value = parseExpression();
        if (tokens[index++] !== ')') throw new Error('Unclosed parenthesis.');
        return value;
      }
      if (token === undefined || !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token)) throw new Error('Expected a number.');
      return Number(token);
    };
    const parseUnary = () => {
      if (tokens[index] === '+') { index++; return parseUnary(); }
      if (tokens[index] === '-') { index++; return -parseUnary(); }
      return parsePrimary();
    };
    const parseTerm = () => {
      let value = parseUnary();
      while (['*', '/', '%'].includes(tokens[index])) {
        const operator = tokens[index++];
        const right = parseUnary();
        if ((operator === '/' || operator === '%') && right === 0) throw new Error('Cannot divide by zero.');
        value = operator === '*' ? value * right : operator === '/' ? value / right : value % right;
      }
      return value;
    };
    let value = parseTerm();
    while (tokens[index] === '+' || tokens[index] === '-') {
      const operator = tokens[index++];
      const right = parseTerm();
      value = operator === '+' ? value + right : value - right;
    }
    return value;
  };

  if (!tokens.length) throw new Error('Enter an expression.');
  const result = parseExpression();
  if (index !== tokens.length || !Number.isFinite(result)) throw new Error('That expression could not be calculated.');
  return result;
}

function decodeJwtPart(part) {
  if (!/^[A-Za-z0-9_-]+$/.test(part) || part.length % 4 === 1) throw new Error('JWT contains an invalid Base64URL section.');
  const normalized = part.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(normalized + '='.repeat((4 - normalized.length % 4) % 4));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
}

export function decodeJwtToken(token) {
  if (token.length > 20000) throw new Error('Token is too long (maximum 20,000 characters).');
  const parts = token.trim().split('.');
  if (parts.length !== 3 || parts.some((part) => !part)) throw new Error('A JWT must contain three non-empty dot-separated sections.');
  return { header: decodeJwtPart(parts[0]), payload: decodeJwtPart(parts[1]), signature: parts[2] };
}

export function createTextDiff(leftText, rightText) {
  const left = leftText.split(/\r?\n/);
  const right = rightText.split(/\r?\n/);
  if (left.length > 250 || right.length > 250) throw new Error('For a responsive comparison, limit each input to 250 lines.');
  const rows = Array.from({ length: left.length + 1 }, () => new Uint16Array(right.length + 1));
  for (let i = left.length - 1; i >= 0; i--) for (let j = right.length - 1; j >= 0; j--) rows[i][j] = left[i] === right[j] ? rows[i + 1][j + 1] + 1 : Math.max(rows[i + 1][j], rows[i][j + 1]);
  const diff = [];
  let i = 0;
  let j = 0;
  while (i < left.length || j < right.length) {
    if (i < left.length && j < right.length && left[i] === right[j]) { diff.push(`  ${left[i]}`); i++; j++; }
    else if (j < right.length && (i === left.length || rows[i][j + 1] > rows[i + 1][j])) diff.push(`+ ${right[j++]}`);
    else diff.push(`- ${left[i++]}`);
  }
  return diff.join('\n');
}

export function parsePdfPageSelection(value, pageCount) {
  const pages = new Set();
  for (const segment of value.split(',').map((part) => part.trim()).filter(Boolean)) {
    const range = segment.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!range) throw new Error('Enter page numbers like 1,3-5.');
    const start = Number(range[1]);
    const end = Number(range[2] || range[1]);
    if (start < 1 || end < start || end > pageCount) throw new Error(`Page numbers must be between 1 and ${pageCount}.`);
    for (let page = start; page <= end; page++) pages.add(page - 1);
  }
  if (!pages.size) throw new Error('Enter at least one page number.');
  return [...pages].sort((a, b) => a - b);
}
