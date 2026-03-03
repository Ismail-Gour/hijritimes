import { MapPin } from "lucide-react";

export function LocationBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
      <MapPin className="w-4 h-4" />
      <span>India</span>
      <span className="text-xs text-muted-foreground">(IST)</span>
    </div>
  );
}
