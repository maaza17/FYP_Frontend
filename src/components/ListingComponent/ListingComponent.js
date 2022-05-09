import React from "react"
import "./ListingComponent.css"

export default function ListingComponent({ data, order, show, setShow }) {

    function header() {
        return (<>
            {order.map((item) => {
                return (
                    <div style={{ minWidth: `${90 / order.length}%`, maxWidth: `${90 / order.length}%`, padding: `5px ${2 / order.length}%` }} className="oneHeading">{item.displayName}</div>
                )
            })}
        </>)
    }
    function lister(object) {
        return object.map((item) => {
            return (
                <div className="oneRow">
                    {order.map((index) => {
                        if (index.type) {
                            if (index.type === "currency") return <div style={{ minWidth: `${90 / order.length}%`, maxWidth: `${90 / order.length}%`, padding: `5px ${2 / order.length}%` }} className="oneBox">${(item[`${index.name}`]) ? item[`${index.name}`] : "Not Available"}</div>
                            else if (index.type === "percentage") return <div style={{ minWidth: `${90 / order.length}%`, maxWidth: `${90 / order.length}%`, padding: `5px ${2 / order.length}%` }} className="oneBox">{(item[`${index.name}`]) ? item[`${index.name}`].toFixed(2) + "%" : "Not Available"}</div>
                            else return <div style={{ minWidth: `${90 / order.length}%`, maxWidth: `${90 / order.length}%`, padding: `5px ${2 / order.length}%` }} className="oneBox">{(item[`${index.name}`]) ? item[`${index.name}`] : "Not Available"}</div>
                        }
                        else return <div style={{ minWidth: `${90 / order.length}%`, maxWidth: `${90 / order.length}%`, padding: `5px ${2 / order.length}%` }} className="oneBox">{(item[`${index.name}`]) ? item[`${index.name}`] : "Not Available"}</div>
                    })}
                </div>
            )
        })
    }

    if (show) return (
        <>
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <div className="listing__cross">
                        <i
                            onClick={() => { setShow(false); }}
                            class="fa fa-times"
                        >
                        </i>
                    </div>
                    <div className="listing__header">{header()}</div>
                    <div className="listing__data">{lister(data)}</div>
                </div>
            </div>
        </>
    );
    else return <></>
}