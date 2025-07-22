// Using embla-carousel library, see: https://www.embla-carousel.com/

import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

type CarouselProps = {
    children: React.ReactNode[]
}

export default function EmblaCarousel( {children}: CarouselProps ) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes())
        } // Access API
    }, [emblaApi])

    
    const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev() }, [emblaApi])
    const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext() }, [emblaApi])

    const slides = React.Children.toArray(children)
    return (
        <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
            {slides.map((child, index) => (
                <div
                    key={index}
                    className="embla__slide flex-[0_0_80%]"
                    data-index={index}
                >
                    {child}
                </div>
            ))}
            </div>
            <button className="embla__prev" onClick={scrollPrev} type="button">
                Prev
            </button>
            <button className="embla__next" onClick={scrollNext} type="button">
                Next
            </button>
        </div>
    )
}