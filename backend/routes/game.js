const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const auth = require('../middleware/auth');
const parseCsvToGrid = require('../utils/parseCsvToGrid');

// const upload = multer({ dest: 'uploads/' });
const upload = multer({ 
  storage: multer.memoryStorage() // Use memory instead of disk
});

function minPathSum(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = Array.from({ length: m }, () => Array(n).fill(0));

    dp[0][0] = grid[0][0];

    for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];
    for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];

    for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
    }

    return dp[m - 1][n - 1];
}

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'CSV file required' });
    // const contents = req.file.buffer.toString('utf8');
    const contents = fs.readFileSync(req.file.path, 'utf8');
    fs.unlinkSync(req.file.path); // cleanup

    const { grid } = parseCsvToGrid(contents);
    const result = minPathSum(grid);

    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Invalid CSV or server error' });
  }
});

router.post('/compute', auth, async (req, res) => {
  try {
    const { csv } = req.body;
    if (!csv) return res.status(400).json({ error: 'csv field required in body' });

    const { grid } = parseCsvToGrid(csv);
    const result = minPathSum(grid);
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Invalid CSV' });
  }
});

module.exports = router;
