import { removeFavorite, getFavoritesById } from "@/lib/services/favoriteService";
import { supabase } from "@/lib/supabase/server";

export async function DELETE(request, { params }) {
  const { id } = await params;
  const numId = Number(id);
  const result = removeFavorite(numId);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json({ message: "Berhasil dihapus" });
}


export async function GET(request, {params}) {
  const { id } = await params;
  const numId = Number(id);
  const result = await getFavoritesById(numId)
  return Response.json({message: "success", data: result});
}


export async function PATCH(request, { params }) {
   const { id } = await params;

   const numId = Number(id);
   const body = await request.json();

   const { data, error } = await supabase
     .from('favorites')
     .update(body)
     .eq('id', numId)
     .select()
     .maybeSingle();

   if (error) {
     console.error('Update favorite note error:', error);

     return Response.json({ error: 'Gagal mengubah note' }, { status: 500 });
   }

   return Response.json({
     success: true,
     message: 'Note berhasil diperbarui',
     data,
   });
}
