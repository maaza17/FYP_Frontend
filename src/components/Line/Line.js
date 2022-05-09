import React from "react";

export default function Line({ num, color, invert }) {

    const [from, setfrom] = React.useState(null);
    const [to, setto] = React.useState(null);
    const [line, setline] = React.useState(null);
    const [frombool, setfrombool] = React.useState(false);
    const [tobool, settobool] = React.useState(false);
    const [linebool, setlinebool] = React.useState(false);
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

    React.useEffect(() => {
        if (window.location.pathname === "/market") {
            if ((!frombool) && document.getElementById('from' + num + "")) {
                setfrom(document.getElementById('from' + num + ""))
                setfrombool(true);
            }
            if ((!tobool) && document.getElementById('to' + num + "")) {
                setto(document.getElementById('to' + num + ""))
                settobool(true);
            }
            if ((!linebool) && document.getElementById('line' + num + "")) {
                setline(document.getElementById('line' + num + ""))
                setlinebool(true);
            }
        }
    }, [])

    React.useEffect(() => {
        if (frombool && tobool && linebool) {
            // L ==> x
            // T ==> y
            var fT = from.offsetTop + from.offsetHeight / 2;
            var tT = to.offsetTop + to.offsetHeight / 2;
            var fL = from.offsetLeft + from.offsetWidth / 2;
            var tL = to.offsetLeft + to.offsetWidth / 2;

            var CA = Math.abs(tT - fT);
            var CO = Math.abs(tL - fL);
            var H = Math.sqrt(CA * CA + CO * CO);

            if (tT > fT) {
                var top = (tT - fT) / 2 + fT;
            } else {
                var top = (fT - tT) / 2 + tT;
            }
            if (tL > fL) {
                var left = (tL - fL) / 2 + fL;
            } else {
                var left = (fL - tL) / 2 + tL;
            }

            top = top - H / 2;

            line.style["-webkit-transform"] = 'rotate(' + 90 + 'deg)';
            line.style["-moz-transform"] = 'rotate(' + 90 + 'deg)';
            line.style["-ms-transform"] = 'rotate(' + 90 + 'deg)';
            line.style["-o-transform"] = 'rotate(' + 90 + 'deg)';
            line.style["-transform"] = 'rotate(' + 90 + 'deg)';
            line.style.left = left - H / 12 + 'px';
            line.style.height = (H - H / 12) + 'px';
            line.style.position = 'absolute';
            line.style['min-width'] = '2vw';
            line.style['border-radius'] = '2.5px';
            line.style["border-bottom"] = ' 2px solid' + " " + color;
            if (invert) {
                line.style.top = top + top / 50 + 'px';
                line.style["border-right"] = ' 2px solid' + " " + color;
            }
            else {
                if (windowDimensions.width < 600) {
                    line.style.top = top - top / 20 + 'px';
                }
                else if (windowDimensions.width < 800) {
                    line.style.top = top + 'px';
                }
                else if (windowDimensions.width < 1400) {
                    line.style.top = top + top / 60 + 'px';
                }
                else if (windowDimensions.width < 1800) {
                    line.style.top = top + top / 50 + 'px';
                }
                else if (windowDimensions.width < 2100) {
                    line.style.top = top + top / 35 + 'px';
                }
                else {
                    line.style.top = top + top / 20 + 'px';
                }
                line.style["border-left"] = ' 2px solid' + " " + color;
            }
        }
    }, [windowDimensions, frombool, tobool, linebool])

    return <></>
}