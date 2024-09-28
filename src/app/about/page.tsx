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
    <div className="p-4 max-w-full mx-auto">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <h1 className="block text-6xl font-black font-montserrat mb-2 flex flex-col items-center justify-center text-center">
              Meet the Author
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/77161424?v=4" />
                <AvatarFallback>IS</AvatarFallback>
              </Avatar>
              <p>
                <a
                  href="https://github.com/iliyasone"
                  className="text-blue-500 hover:underline"
                >
                  iliyasone
                </a>
              </p>
            </div>
          </CarouselItem>

          <CarouselItem>
            <h1 className="block text-6xl font-black font-montserrat mb-2 flex flex-col items-center justify-center text-center">
              Backend
            </h1>
            <p className="text-lg md:text-3xl font-light mb-4 text-center">
              Explore endpoints
            </p>
            <div className="flex md:flex-row justify-center items-center">
              <a
                href="https://github.com/iliyasone/user-api"
                className="text-blue-500 hover:underline"
              >
                Backend Repository
              </a>
            </div>
          </CarouselItem>

          <CarouselItem>
            <h1 className="block text-6xl font-black font-montserrat mb-2 flex flex-col items-center justify-center text-center">
              Frontend Interface
            </h1>
            <p className="text-lg md:text-3xl font-light mb-4 text-center">
              Intuitive. And Responsive.
            </p>
            <div className="flex md:flex-row justify-center items-center">
              <a
                href="https://github.com/iliyasone/front-end"
                className="text-blue-500 hover:underline"
              >
                Frontend Repository
              </a>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
