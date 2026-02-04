import { entries } from "../lib/placeholder-data";

export default function LogCard({
  fieldTitle,
  entryValue,
}: {
  fieldTitle: string;
  entryValue: string;
}) {
  return (
    <div>
      <h3>{fieldTitle}</h3>
      <p>{entryValue}</p>
    </div>
  );
}
