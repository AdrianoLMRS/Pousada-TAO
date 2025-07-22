// Using embla-carousel library, see: https://www.embla-carousel.com/

import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export default function EmblaCarousel( children: React.PropsWithChildren<{}> ) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes())
        } // Access API
    }, [emblaApi])

    
    const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev() }, [emblaApi])
    const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext() }, [emblaApi])

    return (
        <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
                <div className="embla__slide flex-[0_0_80%] bg-amber-300">Slide 1</div>
                <div className="embla__slide flex-[0_0_80%] bg-amber-300">Slide 2</div>
                <div className="embla__slide flex-[0_0_80%] bg-amber-300">Slide 3</div>
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