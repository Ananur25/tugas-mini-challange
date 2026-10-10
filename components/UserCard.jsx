// DB Live 2 Connect to Supabase
// Connect to favorite
"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorite } from "@/components/context/Favorite-Context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
  const { isFavorite, toggleFavorite } = useFavorite();

  const favorited = isFavorite(user.id);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="group border border-white/10 bg-foreground/[0.03] transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 text-sm font-semibold">
            {initials}
          </div>

          <CardTitle className="truncate">
            {user.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <p className="truncate text-sm text-muted-foreground">
          {user.email}
        </p>
        <h2 className="mt-1 truncate text-xl text-muted-foreground">
          {user.company.name}
        </h2>

        <div className="mt-4 flex gap-2">
          <Button className="flex-1 rounded-full">
            View Profile
          </Button>

          <Button
            variant={favorited ? "default" : "outline"}
            className="flex-1 gap-2 rounded-full transition-all"
            onClick={() => toggleFavorite(user)}
          >
            <Heart
              className={`size-4 ${
                favorited ? "fill-white text-white" : ""
              }`}
            />
            {favorited ? "Favourite" : "Add Favourite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}