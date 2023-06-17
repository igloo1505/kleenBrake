import { User } from '@prisma/client'
import React from 'react'



interface DescendantsProps {
    descendants: User[]
}

const Descendants = ({ descendants }: DescendantsProps) => {
    return (
        <div>Descendants</div>
    )
}


Descendants.displayName = "Descendants"


export default Descendants;
