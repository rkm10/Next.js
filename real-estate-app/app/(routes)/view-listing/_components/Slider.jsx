import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../../../components/ui/carousel"
import React from 'react'


function Slider({ imageList }) {
    console.log(imageList);
    return (
        <div >
            {imageList ?
                <Carousel>
                    <CarouselContent>
                        {imageList.map((image, index) => (
                            <CarouselItem key={index}>
                                <img src={image.url}
                                    width={800}
                                    height={300}
                                    alt='image'
                                    className="w-full rounded-xl object-cover h-[300px]" />
                            </CarouselItem>

                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel> :
                <div className="w-full h-[200px] bg-slate-200 animate-pulse rounded-lg">

                </div>
            }
        </div>
    )
}

export default Slider