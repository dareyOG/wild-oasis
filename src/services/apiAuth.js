import supabase from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // other optional data to be passed
    options: { data: { fullName, avatar: '' } }
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) throw new Error(error.message);

  //   console.log(data);

  return data;
}

// Authorization
export async function getCurrentUser() {
  // check if there is a current user
  const { data } = await supabase.auth.getSession();

  if (!data.session) return null;

  //   if true,
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  // console.log(user);

  if (error) throw new Error(error.message);

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
