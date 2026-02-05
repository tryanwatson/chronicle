import Image from "next/image";
import LogCard from "./ui/log-card";
import prisma from "@/app/lib/prisma";

async function createEntry(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const value = formData.get("value") as string;
  const user_id = "123123123";

  await prisma.entries.create({
    data: { title, value },
  });
}

export default async function Home() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const entries = await prisma.entries.findMany();
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 bg-gray-800">
        <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-white">
          Chronicle
        </h1>
        <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)] text-white">
          {entries.map((entry) => (
            <li key={entry.id} className="mb-2">
              {entry.title} = {entry.value}
            </li>
          ))}
        </ol>
        <form action={createEntry} className="mt-8 flex flex-col gap-4">
          <label htmlFor="title" className="text-white">
            Field Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title here..."
            className=""
          />
          <label htmlFor="title" className="text-white">
            Field Value
          </label>
          <input
            type="text"
            id="value"
            name="value"
            placeholder="Enter value here..."
            className=""
          />
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
