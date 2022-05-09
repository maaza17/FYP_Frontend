import React from "react";
import { SteppedLineTo } from "react-lineto"

export default function MySteppedLineTo({ from, to, borderColor, borderWidth, delay, toAnchor, fromAnchor }) {

    const hasWindow = typeof window !== 'undefined';
    const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    React.useEffect(() => {
        if (hasWindow && window.location.pathname === "/market") {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);

        return <SteppedLineTo from={from} to={to} borderColor={borderColor} borderWidth={borderWidth} delay={delay} toAnchor={toAnchor} fromAnchor={fromAnchor} />
}