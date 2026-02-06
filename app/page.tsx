import Image from "next/image";
import LogCard from "./ui/log-card";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";

async function createEntry(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const value = formData.get("value") as string;
  const user_id = "123123123";

  await prisma.entries.create({
    data: { title, value, user_id },
  });
  revalidatePath("/");
}

export default async function Home() {
  const entries = await prisma.entries.findMany();
  const fields = await prisma.fields.findMany();
  const users = await prisma.users.findMany();
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-10 pb-10 bg-gray-800">
        <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-white">
          Chronicle
        </h1>
        <div className="grid grid-cols-3 gap-60">
          <div>
            Users
            <ol className="list-decimal list-inside mt-3">
              {users.map((user) => (
                <li key={user.id}>
                  <div>UserId = {user.id}</div>
                  <div>User Name = {user.name}</div>
                  <div>
                    User Created At = {user.created_at.toLocaleDateString()}
                  </div>
                  <br />
                </li>
              ))}
            </ol>
          </div>
          <div>
            Fields
            <ol className="list-decimal list-inside mt-3">
              {fields.map((field) => (
                <li key={field.id}>
                  <div>FieldId = {field.id}</div>
                  <div>FieldTitle = {field.title}</div>
                  <div>FieldFormat = {field.format}</div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            Entries
            <ol className="list-decimal list-inside">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <div>Entry Id = {entry.id}</div>
                  <div>Value = {entry.value}</div>
                  <div>Field Id = {entry.field_id}</div>
                  <div>User Id = {entry.user_id}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>

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
