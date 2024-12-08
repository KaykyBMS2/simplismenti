import type { NextPage } from "next";
import Layout from "../components/Layout";
import ComingSoon from "../components/ComingSoon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const Loja: NextPage = () => {
  return (
    <Layout>
      {/* Proteção da página */}
      <SignedIn>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-xl mt-4">Loja</h1>
          <ComingSoon />
          <Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
          

        </div>
      </SignedIn>

      {/* Redirecionamento para a página de login */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Layout>
  );
};

export default Loja;