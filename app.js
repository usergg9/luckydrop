
//////////////////////////////
// SUPABASE
//////////////////////////////

const SUPABASE_URL = "https://ybsrkghhgurjgrfukgox.supabase.co/rest/v1/
";
const SUPABASE_KEY = "sb_publishable_gxjNTA6NmdNdyt46l11XBg_3NlCFRrX";

const client = window.supabase.createClient(https://ybsrkghhgurjgrfukgox.supabase.co/rest/v1/

,sb_publishable_gxjNTA6NmdNdyt46l11XBg_3NlCFRrX);

//////////////////////////////
// ELEMENTOS
//////////////////////////////

const email = document.getElementById("email");
const password = document.getElementById("password");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

const btn = document.getElementById("scratchBtn");
const result = document.getElementById("result");

let user = null;

//////////////////////////////
// LOGIN
//////////////////////////////

registerBtn.addEventListener("click", async () => {
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value
  });

  if (error) {
    result.textContent = "❌ " + error.message;
  } else {
    result.textContent = "✅ Usuario creado. Revisa tu email si lo pide.";
  }
});

loginBtn.addEventListener("click", async () => {
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  if (error) {
    result.textContent = "❌ " + error.message;
  } else {
    user = data.user;
    result.textContent = "🔥 Sesión iniciada";
  }
});

//////////////////////////////
// RASCA
//////////////////////////////

const rewards = [
  { name: "💩 Basura", chance: 60 },
  { name: "🪙 Moneda", chance: 25 },
  { name: "💎 Diamante", chance: 10 },
  { name: "👑 LEGENDARIO", chance: 5 }
];

function obtenerPremio() {
  const rand = Math.random() * 100;
  let acc = 0;

  for (let r of rewards) {
    acc += r.chance;
    if (rand <= acc) return r.name;
  }
}

btn.addEventListener("click", () => {
  if (!user) {
    result.textContent = "⚠️ Inicia sesión primero";
    return;
  }

  const premio = obtenerPremio();
  result.textContent = "🎉 Te ha tocado: " + premio;
});
