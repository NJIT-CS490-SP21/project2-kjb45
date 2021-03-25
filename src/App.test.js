import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';

import App from './App';


test('Login Button', () => {
    

    const result = render(<App />); 

    const loginButtonElement = screen.getByText('Login!');
    expect(loginButtonElement).toBeInTheDocument();
    fireEvent.click(loginButtonElement)
    
});