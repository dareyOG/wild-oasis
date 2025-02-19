import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    // console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return cabins;
}

export async function createCabin(newCabin) {
  const imageName = `${newCabin.image.name}`.replace('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images//${imageName}`;

  // https://kslildlatomuctqsltnc.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg

  // 1. create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    // console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. upload cabin image
  const { error: storageError } = await supabase.storage
    .from('cabins-images')
    .upload(imageName, newCabin.image);

  // 3. delete cabin where error persists in uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);

    console.error(storageError);
    throw new Error('Cabin image could not be uploaded');
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
