# 🔐 JWT Authentication in Node.js & Express

A complete guide and implementation of **JWT-based authentication** in Node.js + Express, covering **Access Tokens, Refresh Tokens, and Role-Based Access Control (RBAC)** with best practices.

# 🔑 JSON Web Token (JWT) Notes

## Q: What is JWT?

**A:** JWT stands for **JSON Web Token**. It is a compact, URL-safe way of securely transmitting information between two parties (like client and server) as a JSON object.

---

## Q: How does JWT work?

**A:** A JWT has **3 parts** separated by dots (`.`):

👉 **Header** → contains metadata (e.g., algorithm & token type).  
👉 **Payload** → contains claims (e.g., user id, roles, expiration).  
👉 **Signature** → created using a secret key (or private key) to verify the token’s authenticity.

👉 These three parts are Base64Url-encoded and combined like:

```
header.payload.signature
```

---

## Q: What are different JWT methods in Node.js?

**A:** (using `jsonwebtoken` library)

👉 `jwt.sign(payload, secret, options)` → Creates a new token.  
👉 `jwt.verify(token, secret)` → Verifies and decodes a token.  
👉 `jwt.decode(token)` → Decodes a token without verification (use carefully).

---

## Q: How does JWT get the user id from the token?

**A:** When creating the token, you pass claims (like id, email, or role) inside the payload:

```js
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
  expiresIn: "1h",
});
```

You can also pass more options:

```js
const token = jwt.sign(
  { id: 1, role: "admin" }, // payload
  process.env.JWT_SECRET, // secret
  {
    expiresIn: "1h", // token expires in 1 hour
    issuer: "myapp.com", // who issued the token
    audience: "myapp-users", // who the token is for
    subject: "user-authentication", // subject of the token
    algorithm: "HS256", // signing algorithm
  }
);
```

---

## Q: Does JWT support role-based access?

**A:** Yes ✅.  
When creating a token, you can include the user’s **role** inside the payload claims (e.g., `"role": "admin"`).  
Later, when verifying the token, you check the role to determine if the user has authorization for that route.

---

## Q: What is a refresh token and how do we use it?

**A:** A **refresh token** is a special token with a **longer expiry time** than an access token.

👉 **Access Token** → short-lived (e.g., 15 minutes – 1 hour).  
👉 **Refresh Token** → long-lived (e.g., days, weeks, or months).  
👉 We use the refresh token to **get a new access token** without forcing the user to log in again. Typically, the refresh token is stored securely (e.g., in an HTTP-only cookie or database).

**Flow:**  
👉 User logs in → receives **access token** + **refresh token**.  
👉 When the access token expires → client sends refresh token to the server.  
👉 Server verifies the refresh token → issues a new access token.

---

## Q: What happens if a refresh token expires?

**A:** If the refresh token has expired, the client **must log in again** because there’s no valid way to request a new access token.

---

## Q: What happens if we don’t mention an expiry time in a JWT?

**A:** By default, JWTs **do not expire** unless you explicitly set the `exp` claim.

• This means the token will be valid **forever**, which is **not secure**.  
• ✅ Best practice → always set an expiration time (`expiresIn`) when signing a token.

```js
// Access Token: 15 minutes
const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
  expiresIn: "15m",
});

// Refresh Token: 7 days
const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
  expiresIn: "7d",
});
```

---

Perfect 🚀 — here’s a polished **FAQ section** you can paste directly into your README.md. I kept the **copyable bold dot (•)** for consistency with your previous style.

---

## 🔐 JWT FAQ

**• Q: What is refresh token and how we use it?**
A: Refresh token is same token as access token but it has expiry time more than normal token. We use it to get a new token without going through the login process again.

**• Q: What happens if refresh token expired?**
A: If refresh token expired, then no way to access the API. The client has to login again.

**• Q: What happens if we don’t mention expiry time in token?**
A: The default expiry time of JWT token is never expired.

**• Q: What is the difference between access token and refresh token?**
A: Access tokens are short-lived and used to access APIs. Refresh tokens are long-lived and used to get new access tokens when the old one expires.

**• Q: Where should I store JWT in frontend?**
A: Preferably in `httpOnly` cookies for security. Storing in `localStorage` or `sessionStorage` is possible but more vulnerable to XSS attacks.

**• Q: Can JWT be revoked?**
A: JWTs are stateless, so once issued they cannot be revoked unless you keep a blacklist or use short expiration times with refresh tokens.

**• Q: Is JWT secure?**
A: JWT is secure if you use a strong secret/private key, HTTPS, short expiration times, and don’t store sensitive data inside the payload.

**• Q: What is the difference between JWT and sessions?**
A: Sessions store data on the server (stateful), while JWT stores claims in the token itself (stateless).

**• Q: What are JWT `aud`, `iss`, `sub`, `exp` claims?**
A: These are registered claims:

- `iss`: issuer (who issued the token)
- `sub`: subject (whom the token refers to)
- `aud`: audience (intended recipient)
- `exp`: expiration time

---

Got it 👍 Here’s the **Best Practices** section in the same **Q\&A + 👉 bullet style** as your previous notes, so you can directly paste into your `README.md`:

---

### Q: What are some best practices when using JWT?

A:

👉 **Use short-lived access tokens** – Keep access tokens valid only for a few minutes (e.g., 15 mins) to reduce risk if stolen.

👉 **Use refresh tokens securely** – Keep refresh tokens long-lived but store them securely (preferably in `httpOnly` cookies). Rotate them frequently.

👉 **Always use HTTPS** – Never send JWTs over plain HTTP. Use HTTPS to protect against man-in-the-middle attacks.

👉 **Store tokens in `httpOnly` cookies** – This protects against XSS attacks. Avoid localStorage if possible.

👉 **Do not store sensitive data in JWT payload** – Payload is Base64Url encoded (not encrypted). Anyone can decode it, so only store minimal info (e.g., `id`, `role`).

👉 **Validate token signature and claims** – Always check signature, issuer (`iss`), audience (`aud`), and expiration (`exp`) before trusting a token.

👉 **Revoke tokens when needed** – JWTs are stateless, so implement blacklists/whitelists or use short expirations + refresh tokens to handle revocation.

👉 **Rotate signing keys** – Use key rotation strategies (like JWKS). Don’t keep the same secret forever.

👉 **Handle token expiry properly** – When access token expires, issue a new one using the refresh token. If refresh token also expires, force login again.

👉 **Protect against CSRF** – If using cookies, add CSRF tokens or use `SameSite=strict` / `lax` cookie flags.

---

Perfect 🚀 — here’s a **complete step-by-step guide** you can paste into your `README.md` so anyone can run your project easily.

---

## 📖 How to Use This Repository

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/jwt-auth-node-express.git
cd jwt-auth-node-express
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root with the following:

```env
PORT=5000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=15m          # Access Token expiry
JWT_REFRESH_EXPIRES_IN=7d   # Refresh Token expiry
```

### 4️⃣ Start the Server

```bash
npm start
```

or for development with auto-restart (if you use nodemon):

```bash
npm run dev
```

### 5️⃣ Available API Endpoints

#### 🔹 Auth Routes

- **POST** `/api/auth/signup` → Register a new user
- **POST** `/api/auth/login` → Login with email & password (returns Access + Refresh token)
- **POST** `/api/auth/refresh` → Get a new access token using refresh token
- **POST** `/api/auth/logout` → (Optional) Invalidate refresh token

#### 🔹 Protected Routes

- **GET** `/api/protected` → Example protected route (requires valid JWT Access Token)
- **GET** `/api/admin` → Example admin-only route (requires JWT + role = admin)

### 6️⃣ Sending Requests with JWT

Use the `Authorization` header in requests to protected routes:

```http
Authorization: Bearer <your_access_token>
```

### 7️⃣ Example Usage Flow

👉 User signs up → logs in → receives **Access Token + Refresh Token**.
👉 User calls protected APIs with Access Token in headers.
👉 When Access Token expires → user calls `/refresh` with Refresh Token.
👉 Server verifies Refresh Token and issues a new Access Token.
👉 If Refresh Token also expires → user must log in again.

### 8️⃣ Folder Structure (Example)

```bash
jwt-auth-node-express/
│── controllers/      # Route controllers (auth, user, etc.)
│── middlewares/      # Auth & role-based middleware
│── models/           # Database models (User, Token, etc.)
│── routes/           # API routes (auth.js, user.js, etc.)
│── config/           # JWT/DB config
│── server.js         # Entry point
│── package.json
│── .env
```

### 9️⃣ Tech Stack

- **Node.js** – Runtime
- **Express.js** – Web framework
- **jsonwebtoken** – JWT handling
- **bcrypt** – Password hashing
- **dotenv** – Environment variables
- (Optional: Sequelize/Mongoose if using DB)

---

⚡ With these steps, you can set up JWT authentication with **Access Tokens, Refresh Tokens, and Role-Based Access Control** in Node.js + Express.

---

Would you like me to also add a **ready-to-use API test collection (Postman/Thunder Client JSON)** so users can import and test endpoints instantly?
