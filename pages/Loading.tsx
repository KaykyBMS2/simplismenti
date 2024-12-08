import Image from "next/image";

// components/Loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-opacity-8 bg-[#13131d]">
      <Image src="/loading.svg" alt="Carregando..." width={75} height={75} className="z-[200]" />
    </div>
  );
}