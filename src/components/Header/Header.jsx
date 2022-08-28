import React from 'react';
import { Link } from 'react-router-dom';
import { UserAvatar, Add } from '@carbon/react/icons';
import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuButton,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    SideNavItems,
    HeaderSideNavItems,
} from '@carbon/react';

const HeaderNav = () => (
    <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label="Carbon Tutorial">
                <SkipToContent />
                <HeaderMenuButton
                    aria-label="Open menu"
                    onClick={onClickSideNavExpand}
                    isActive={isSideNavExpanded}
                />
                <HeaderName element={Link} to="/landingpage" prefix="FBC">
                    FeedBack
                </HeaderName>
                <HeaderNavigation aria-label="Carbon Tutorial">
                    <HeaderMenuItem element={Link} to="/customer">Customer</HeaderMenuItem>
                </HeaderNavigation>
                <SideNav
                    aria-label="Side navigation"
                    expanded={isSideNavExpanded}
                    isPersistent={false}
                >
                    <SideNavItems>
                        <HeaderSideNavItems>
                            <HeaderMenuItem element={Link} to="/customer">Customer</HeaderMenuItem>
                        </HeaderSideNavItems>
                    </SideNavItems>
                </SideNav>
                <HeaderGlobalBar>
                    <HeaderGlobalAction aria-label="add feedback" tooltipAlignment="center">
                        <Add size={20} />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction aria-label="user profile" tooltipAlignment="center">
                        <UserAvatar size={20} />
                    </HeaderGlobalAction>
                </HeaderGlobalBar>
            </Header>
        )}
    />
);

export default HeaderNav;