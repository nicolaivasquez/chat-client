import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {ChatWindow} from "./ChatWindow";
import * as mockApi from './api'

const messages = [
    {id: '1', message: 'Hello', createdAt: '2021-01-26T12:52:14.343Z'},
    {id: '2', message: 'World', createdAt: '2020-12-26T12:52:14.343Z'}
]

describe('ChatWindow', () => {

    it('should display messages', () => {
        const {getByTestId} = render(
            <ChatWindow
                messages={messages}
            />
        );
        expect(getByTestId('chat-messages')).toBeVisible()
    });

    it('should display form elements for text input', () => {
        const {getByTestId} = render(
            <ChatWindow
                messages={messages}
            />
        );
        expect(getByTestId('chat-new-message')).toBeVisible()
        expect(getByTestId('chat-send-message')).toBeVisible()
    });

    it('should make api call to send new message', () => {
        mockApi.sendMessage = jest.fn();
        const {getByTestId} = render(
            <ChatWindow
                messages={messages}
            />
        );
        const inputEl = getByTestId('chat-new-message');
        const buttonEl = getByTestId('chat-send-message');

        fireEvent.change(inputEl, {target: {value: 'Foo'}});
        fireEvent.click(buttonEl);

        expect(mockApi.sendMessage).toHaveBeenCalledTimes(1);
        expect(mockApi.sendMessage).toHaveBeenCalledWith({message: 'Foo'})
    })
});