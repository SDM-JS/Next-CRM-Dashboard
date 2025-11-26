"use client"
import { useEffect, useState } from 'react'

const HydrationWarningProvider = ({ children }: React.PropsWithChildren) => {
    const [mount, setMount] = useState(false)
    useEffect(() => {
        if (!mount) {
            setMount(true)
        }
    }, [])
    return mount && children
}

export default HydrationWarningProvider