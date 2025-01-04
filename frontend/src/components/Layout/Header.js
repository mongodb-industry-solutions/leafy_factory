import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Nav, NavItem, Button, Icon } from '@leafygreen-ui/core';

export default function AppHeader() {
    return (
        <Header
            aria-label="Header"
            style={{ backgroundColor: '#00bfae' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <Icon glyph="Home" size="large" />
                    <span style={{ marginLeft: '8px', fontSize: '1.25rem', color: '#ffffff' }}>Home</span>
                </Link>

                <Nav style={{ display: 'flex', gap: '16px' }}>
                    <NavItem>
                        <Link to="/workorders" style={{ textDecoration: 'none', color: '#ffffff' }}>
                            Work Orders
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/jobs" style={{ textDecoration: 'none', color: '#ffffff' }}>
                            Jobs
                        </Link>
                    </NavItem>
                </Nav>

                <Button variant="primary">Open Factory</Button>
            </div>
        </Header>
    );
}
