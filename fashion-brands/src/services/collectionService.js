import { supabase } from '../api/supabase';

export const collectionService = {
  async getAllCollections() {
    const { data, error } = await supabase
      .from('categories')
      .select('*, brands(name)')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async createCollection(collectionData) {
    const slug = collectionData.name 
      ? collectionData.name.toString().toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // remove diacritics
          .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
          .replace(/\s+/g, "-") // replace spaces with dashes
          .replace(/-+/g, "-") // collapse dashes
      : `collection-${Date.now()}`;

    const payload = {
      ...collectionData,
      slug
    };

    const { data, error } = await supabase
      .from('categories')
      .insert([payload])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateCollection(id, collectionData) {
    const payload = { ...collectionData };
    if (payload.name) {
      payload.slug = payload.name.toString().toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    }

    const { data, error } = await supabase
      .from('categories')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteCollection(id) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
