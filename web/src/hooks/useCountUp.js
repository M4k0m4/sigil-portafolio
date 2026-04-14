import { useEffect, useState } from 'react';
import { useSpring, useTransform } from 'framer-motion';

export function useCountUp(end, duration = 2, isInView = true) {
    const [hasAnimated, setHasAnimated] = useState(false);
    const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        if (isInView && !hasAnimated) {
            spring.set(end);
            setHasAnimated(true);
        }
    }, [isInView, end, spring, hasAnimated]);

    return display;
}