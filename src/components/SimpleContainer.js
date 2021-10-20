import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function SimpleContainer() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'var(--main-bg)',
                    height: '90vh',
                    borderRadius: 'var(--border-radius)',
                    boxShadow: 'var(--box-shadow)' }}
                />
            </Container>
        </React.Fragment>
    );
}

export default SimpleContainer