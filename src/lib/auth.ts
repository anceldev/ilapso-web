import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("SUPABASE_URL o SUPABASE_ANON_KEY no están configuradas");
}

// Cliente de Supabase para autenticación (usa anon key porque necesita cookies)
export const supabaseAuth = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

// Función para iniciar sesión
export async function signIn(email: string, password: string) {
  if (!supabaseAuth) {
    return { error: 'Supabase no está configurado' };
  }

  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { data, error: null };
}

// Función para cerrar sesión
export async function signOut() {
  if (!supabaseAuth) {
    return { error: 'Supabase no está configurado' };
  }

  const { error } = await supabaseAuth.auth.signOut();
  return { error };
}

// Función para obtener la sesión actual
export async function getSession() {
  if (!supabaseAuth) {
    return null;
  }

  const { data: { session } } = await supabaseAuth.auth.getSession();
  return session;
}

// Función para obtener el usuario actual
export async function getUser() {
  if (!supabaseAuth) {
    return null;
  }

  const { data: { user } } = await supabaseAuth.auth.getUser();
  return user;
}

// Función para verificar si el usuario está autenticado
export async function isAuthenticated() {
  const session = await getSession();
  return session !== null;
}
