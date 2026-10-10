// Mini Challenge 1: Buatlah sebuah endpoint API di Next.js yang mengembalikan data profil pengguna dalam format JSON. 
// Data profil ini harus mencakup nama, peran, dan teknologi favorit pengguna. Endpoint ini akan diakses melalui URL /api/profile.
export async function GET() {
  return Response.json({
    name: "Ana Nur Rani Hasanah",
    role: "Peserta bootcamp",
    favoriteTech: ["Mechine Learning", "Next.js", "Python", "Automation", "N8N"],
  });
}