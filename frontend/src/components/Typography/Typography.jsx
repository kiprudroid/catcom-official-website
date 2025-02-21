import React from 'react';
import '@fontsource/inter';
import styles from './Typography.module.css';

const Text = ({ children }) => {
    return (
        <div>
            <h1 style={{ fontFamily: 'Inter, sans-serif' }}>{children}</h1>
        </div>
    );
}

const Paragraph = ({ children }) => {
    return (
        <p className={styles.textContent} style={{ fontFamily: 'Inter, sans-serif' }}>
            {children}
        </p>
    );
}

const Heading = ({ children }) => {
    return (
        <h3 className={styles.contentTitle} style={{ fontFamily: 'Inter, sans-serif' }}>
            {children}
        </h3>
    );
}

export { Text, Paragraph, Heading };


