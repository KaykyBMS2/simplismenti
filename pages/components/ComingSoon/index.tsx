import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";


const ComingSoon: NextPage = () => {
  return (
      <div className="flex justify-center items-center ">
        <div className="flex flex-col justify-center border-[2px] border-black items-center dark:bg-white bg-gray-300 rounded-2xl shadow-lg p-3 w-[380px]">
          <Image
            src="/comingsoon.png"
            alt="Logo SPM Studios"
            width={300}
            height={168}
            className="mb-6"
          />
          <h1 className="text-gray-600 dark:text-gray-800 text-2xl font-bold mb-4">Quase lá...</h1>
          <p className="text-gray-600 text-center text-sm">
            Estamos trabalhando incansavelmente para criar a melhor experiência
            possível para <span className="font-bold">VOCÊ</span>! Fique ligado
            nas nossas redes sociais e canais informativos!
          </p>
        </div>
      </div>
  );
};

export default ComingSoon;