import supabase, { supabaseUrl } from './supabase';

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

export async function updateUserData({ fullName, password, avatar }) {

  // 1. update pawword or fullName; this is not done simultaneously, becasue they're located in different forms (see user data and password forms)
  let updateData;

  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }

  const { data, error } = await supabase.auth.updateUser(updateData)

  // console.log(data);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.floor(Math.random() * 10)}`

  const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar)

  if (storageError) {
    await supabase.from('avatars').delete().eq('id', data.id);

    throw new Error('Avatar image could not be uploaded');
  }

  // 3.  update avatar in user
  // https://kslildlatomuctqsltnc.supabase.co/storage/v1/object/public/avatars//GhsMOlbXAAACF3M.jpeg

  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`

  const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({ data: { avatar: avatarPath } })

  if (updateError) throw new Error(updateError.message);

  return updatedUser
}