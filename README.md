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
