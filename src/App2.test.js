import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { newGame } from './App'

import App from './App';


test('Leader', () => {

    const result = render(<App />); 
    const leaderButtonElement = screen.getByText('Leader Board');
    expect(leaderButtonElement).toBeInTheDocument();
    fireEvent.click(leaderButtonElement);
    expect(leaderButtonElement).toBeInTheDocument();



});