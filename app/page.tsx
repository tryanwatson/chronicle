import Image from "next/image";
import LogCard from "./ui/log-card";
import { entries } from "./lib/placeholder-data";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry) => (
        <LogCard
          key={entry.id}
          fieldTitle={entry.fieldTitle}
          entryValue={entry.entryValue}
        />
      ))}
    </div>
  );
}
