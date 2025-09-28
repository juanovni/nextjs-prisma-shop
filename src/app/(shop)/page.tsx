import { Title } from "@/components";
import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start justify-between p-24">
      <Title title="Prueba" subtitle="Prueba subtitle"/>
    </main>

  );
}
