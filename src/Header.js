import React from 'react'
import { TopBar, TopBarLogo } from "./components/Header";

export const Header = () => {
    return (
        <TopBar>
            <TopBarLogo
                src="http://acmelogos.com/images/logo-1.svg"
                width="120"
                height="40"
            />
        </TopBar>
    );
};
