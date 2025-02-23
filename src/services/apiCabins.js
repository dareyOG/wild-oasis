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
  const { data, error: createError } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (createError) {
    // console.error(createError);
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
  const { data, error: deleteError } = await supabase.from('cabins').delete().eq('id', id);

  if (deleteError) {
    // console.error(deleteError);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}

/* export async function updateCabin(cabin) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${cabin.image.name}`.replace('/', '');
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images//${imageName}`;

  const { data, error: updateError } = await supabase
    .from('cabins')
    .update({ ...cabin, image: imagePath })
    .eq('id', cabin.id)
    .select();

  if (updateError) {
    // console.error(createError);
    throw new Error('Cabin could not be created');
  }

  const { error: storageError } = await supabase.storage
    .from('cabins-images')
    .upload(imageName, cabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);

    console.error(storageError);
    throw new Error('Cabin image could not be uploaded');
  }
  return data;
} */

// Alternatively,

export async function createUpdateCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${newCabin.image.name}`.replace('/', '');
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images//${imageName}`;

  // 1. create/edit cabin

  let query = supabase.from('cabins');

  // create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
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
