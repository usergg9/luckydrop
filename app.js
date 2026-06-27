
//////////////////////////////
// 1. CONEXIÓN A SUPABASE
//////////////////////////////

const SUPABASE_URL = "https://ybsrkghhgurjgrfukgox.supabase.co/rest/v1/
";
const SUPABASE_KEY = "sb_publishable_gxjNTA6NmdNdyt46l11XBg_3NlCFRrX";

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

//////////////////////////////
// 2. ELEMENTOS DE LA WEB
//////////////////////////////

const btn = document.getElementById("scratchBtn");
const result = document.getElementById("result");

//////////////////////////////
// 3. PREMIOS (PROBABILIDADES)
//////////////////////////////

const rewards = [
  { name: "💩 Basura", chance: 60 },
  { name: "🪙 Moneda", chance: 25 },
  { name: "💎 Diamante", chance: 10 },
  { name: "👑 LEGENDARIO", chance: 5 }
];

//////////////////////////////
// 4. USUARIO ACTUAL
//////////////////////////////

let user = null;

//////////////////////////////
// 5. LOGIN AUTOMÁTICO (SI EXISTE SESIÓN)
//////////////////////////////

async function getUser() {
  const { data } = await client.auth.getUser();
  user = data.user;
}

getUser();

//////////////////////////////
// 6. FUNCIONES LOGIN
//////////////////////////////

async function register(email, password) {
  const { data, error } = await client.auth.signUp({
    email,
    password
  });

  return { data, error };
}

async function login(email, password) {
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });

  user = data.user;

  return { data, error };
}

async function logout() {
  await client.auth.signOut();
  user = null;
}

//////////////////////////////
// 7. RASCA DIARIO (PROBABILIDAD)
//////////////////////////////

function obtenerPremio() {
  const rand = Math.random() * 100;
  let acumulado = 0;

  for (let r of rewards) {
    acumulado += r.chance;
    if (rand <= acumulado) return r.name;
  }
}

//////////////////////////////
// 8. GUARDAR PREMIO EN SUPABASE
//////////////////////////////

async function guardarPremio(premio) {
  if (!user) {
    result.textContent = "⚠️ Tienes que iniciar sesión";
    return;
  }

  const { data, error } = await client
    .from("rewards")
    .insert([
      {
        user_id: user.id,
        reward_name: premio
      }
    ]);

  return { data, error };
}

//////////////////////////////
// 9. CLICK DEL BOTÓN
//////////////////////////////

btn.addEventListener("click", async () => {

  if (!user) {
    result.textContent = "⚠️ Inicia sesión primero";
    return;
  }

  result.textContent = "🎟️ Rascando...";

  setTimeout(async () => {

    const premio = obtenerPremio();

    result.textContent = "🎉 Te ha tocado: " + premio;

    await guardarPremio(premio);

  }, 1500);

});
