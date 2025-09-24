# MERN Grid Game (CSV minimal path)

## Features
- Signup / Login (JWT)
- User profile
- CSV upload to compute minimum path sum (DP O(m×n))
- Deployment: Frontend (Netlify) and Backend (Render). MongoDB Atlas.


## Setup (local)

### Backend
1. `cd backend`
2. Create `.env` and fill values(PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, BCRYPT_SALT_ROUNDS)
3. `npm install` or `npm i`
4. `npm run dev` or `npm start`

API:
- `POST /api/auth/signup` {name,email,password} → {token, user}
- `POST /api/auth/login` {email,password} → {token, user}
- `GET /api/user/profile` (Authorization: Bearer token)
- `POST /api/game/upload` (multipart/form-data, file field `file`) → { result }
- `POST /api/game/compute` { csv: "..." } → { result }

### Frontend
1. `cd frontend`
2. `npm install`
3. set `VITE_API_URL` to backend (local: http://localhost:5000)
4. `npm run dev`

### CSV File Format

1. **First row:** grid dimensions → `rows,columns`  
2. **Remaining rows:** grid values (non-negative integers)  

---

### Example 1: 3x3 Grid

**File:** `grid-example.csv`

```csv
3,3
1,3,1
1,5,1
4,2,1
```
```
Minimum Value Path:
[1] → [3] → [1]
             ↓
[1]   [5]   [1]
             ↓
[4]   [2]   [1]  End
```
Output: 1+3+1+1+1 = **7**
