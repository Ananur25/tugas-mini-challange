// DB Live 2 Connect to Supabase
import {
  findAllFavorites,
  findFavoriteById,
  insertFavorite,
  deleteFavoriteById,
} from "@/lib/repositories/favoriteRepository";

function validateFavoriteInput(body) {
  if (body == null) {
    return {
      valid: false,
      error: 'Body request wajib diisi',
    };
  }


  if (typeof body !== 'object' || Array.isArray(body)) {
    return {
      valid: false,
      error: 'Body request harus berupa object',
    };
  }

  if (Object.keys(body).length === 0) {
    return {
      valid: false,
      error: 'Body request tidak boleh kosong',
    };
  }

  if (!body.name || !body.email) {
    return {
      valid: false,
      error: 'name dan email wajib diisi',
    };
  }

  return { valid: true };
}

export async function getAllFavorites() {
  return await findAllFavorites();
}

export async function getFavoritesById(id) {
  try {
    return await findFavoriteById(id)
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
}

export async function addFavorite(body) {
  const validation = validateFavoriteInput(body);
  if (!validation.valid) {
    return { success: false, status: 400, error: validation.error };
  }

  // const alreadyExists = await findFavoriteById(body.id);
  // if (alreadyExists === null) {
  //   return { success: false, status: 400, error: "User ini sudah difavoritkan" };
  // }

  const saved = await insertFavorite(body);
  return { success: true, status: 201, data: saved };
}

export async function removeFavorite(id) {
  const deleted = await deleteFavoriteById(id);
  if (!deleted) {
    return { success: false, status: 404, error: "Data tidak ditemukan" };
  }

  return { success: true, status: 200, message: "Berhasil dihapus" };
}