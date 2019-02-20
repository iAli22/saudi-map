// KEYS
module.exports = {
  APPLACATION_ID:
    process.env.APPLACATION_ID ||
    "13367fc05b3e2e73eb65eb2aa913f4355d54be56ce78cc31eede9465e71b989f",
  SECRET_KEY:
    process.env.SECRET_KEY ||
    "1f287dc202f2e3f50bc2e35cf2f061d503e16780b87053d1f037b6a5af8d6f3c",
  CALLBACK_URL: process.env.CALLBACK_URL || "http://localhost:3000"
};
