import supabase from './supabase';

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
