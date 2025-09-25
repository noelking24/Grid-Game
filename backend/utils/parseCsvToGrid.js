function parseCsvToGrid(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length < 2) throw new Error('CSV must contain at least dimensions row and one grid row');

  const dims = lines[0].split(',').map(s => s.trim());
  if (dims.length < 2) throw new Error('First row must have two integers: m,n');

  const m = parseInt(dims[0], 10);
  const n = parseInt(dims[1], 10);
  if (isNaN(m) || isNaN(n) || m <= 0 || n <= 0) throw new Error('Invalid grid dimensions');

  const grid = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map(s => {
      const v = parseInt(s.trim(), 10);
      if (isNaN(v) || v < 0) throw new Error('Grid values must be non-negative integers');
      return v;
    });
    grid.push(row);
  }

  if (grid.length !== m) throw new Error(`Grid rows (${grid.length}) do not match m (${m})`);
  for (const r of grid) if (r.length !== n) throw new Error('Each grid row must have n columns');

  return { m, n, grid };
}

module.exports = parseCsvToGrid;
