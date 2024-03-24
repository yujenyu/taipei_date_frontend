import React from "react";
import { BsList } from "react-icons/bs";

export default function BurgerMenu() {
    return (
        <>
            <div className="flex items-center drawer-content sm:hidden">
                <label
                    htmlFor="my-drawer-2"
                    className="drawer-button lg:hidden"
                >
                    <BsList className="text-2xl" />
                </label>
            </div>
        </>
    );
}
