import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start justify-between p-24">
      <h1>Hola Mundo</h1>
      <h1 className={`${titleFont.className}`}>Hola Mundo!</h1>
    </main>

  );
}
