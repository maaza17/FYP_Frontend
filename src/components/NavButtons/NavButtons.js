import React from "react"
import "./NavButtons.css"
import { useHistory } from "react-router-dom";

export default function NavButtons() {
    const history = useHistory();
    const hasWindow = typeof window !== 'undefined';
    const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        return {
            width
        };
    }

    React.useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);


    function Menu() {
        function DropdownItem(props) {
            return (
                <div onClick={() => { history.push(props.path) }} className="navbuttons__menu_item">
                    {props.children}
                </div>
            )
        }
        if (windowDimensions && windowDimensions.width && windowDimensions.width <= 550) {
            return (
                <>
                    <div className="navbuttons__buttonContainer">
                        <DropdownItem path="/search">Search Catalogue</DropdownItem>
                        <DropdownItem path="/market">Market Research Tool</DropdownItem>
                    </div>
                </>
            )
        }
        else return (<></>);
    }


    return (<Menu />);
} 