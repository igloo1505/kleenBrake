import React from 'react'
const full = "F"
const half = "H"

/* NOTE: Component is not being used right now. Can't install or look up icons required and to be honest, this seems like overkill. */

interface RatingProps {
    rating: number
}

const getRatingEms = (rating: number) => {
    let comps = []
    for (var i = 0; i < 10; i += 2) {
        if (rating % i >= 0.5) {
            comps.push(full)
        }
        if (rating % i >= 0 && rating % i < 0.5) {
            comps.push(half)
        }
    }
    return comps
}

const Rating = ({ rating }: RatingProps) => {
    return (
        <div>
            <div>{`Rating: ${rating}`}</div>
            <div className={'w-full h-fit grid grid-cols-5 place-items-center gap-1'}>{getRatingEms(rating).map((r, i) => <div key={`rating-comp-${i}`}>{r}</div>)}</div>
        </div>
    )
}



export default Rating;
