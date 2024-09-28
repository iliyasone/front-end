import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Posts() {
  return (
    <main className="flex justify-center items-center justify-center text-center py-4">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <h1 className="block text-3xl font-black font-montserrat mb-2">
              Meet the Author
            </h1>
            <div className="flex justify-center items-center">
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/77161424?v=4" />
                <AvatarFallback>IS</AvatarFallback>
              </Avatar>
              <p>
                <a
                  href="https://github.com/iliyasone"
                  className="text-blue-500 hover:underline ml-1"
                >
                  iliyasone
                </a>
              </p>
            </div>
          </CarouselItem>

          <CarouselItem>
            <h1 className="block text-3xl font-black font-montserrat mb-2">
              Backend
            </h1>
            <p className="block text-3xl font-black font-light mb-2 ">
              Explore endpoints
            </p>
            <a
              href="https://github.com/iliyasone/user-api"
              className="text-blue-500 hover:underline ml-1"
            >
              Backend Repository
            </a>
          </CarouselItem>

          <CarouselItem>
            <h1 className="block text-3xl font-black font-montserrat mb-2">
              Frontend Interface
            </h1>
            <p className="block text-3xl font-black font-light mb-2 ">
              Intuitive. And Responsive.
            </p>
            <a
              href="https://github.com/iliyasone/front-end"
              className="text-blue-500 hover:underline ml-1"
            >
              Frontend Repository
            </a>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
