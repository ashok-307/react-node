import { render, renderHook, screen } from "@testing-library/react";
import * as reactRedux from 'react-redux';
import * as reactRouterDom from 'react-router-dom';
import Login from "./Login";
// import { server } from "../../mocks/server";
// import { rest } from "msw";
// import { API } from "../../core/constants/API";
import { renderWithProviders } from "../../test-utils";
import eventHandler from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import { useLoginMutation } from "../../store/api/auth.api";
import * as LoginMutation from "../../store/api/auth.api";

jest.mock('react-redux', () => {
    return {
        useSelector: jest.fn(),
        useDispatch: jest.fn(),
        useNavigate: jest.fn()
    }
});

jest.mock('react-router-dom', () => {
    return {
        useNavigate: jest.fn(),
        NavLink: (to: string) => <></>
    }
});

jest.mock('../../store/api/auth.api', () => {
    return {
        useLoginMutation: jest.fn()
    }
});

describe('Login page', () => {
    const useSelectorMock: any = reactRedux.useSelector;
    const useDispatchMock: any = reactRedux.useDispatch;
    const useNavigateMock: any = reactRouterDom.useNavigate;
    const useLoginMutationMock: any = LoginMutation.useLoginMutation;

    const mockStore = {
        authReducer: {
            isAuthenticated: false,
            token: '',
            isLoading: false,
            user: null
        }
    };

    beforeEach(() => {
        useDispatchMock.mockImplementation(() => {
            return (fn: any) => {}
        });
        useSelectorMock.mockImplementation((selector: any) => selector(mockStore));
        useNavigateMock.mockImplementation(() => {});
        useLoginMutationMock.mockImplementation(() => [(data: any) => ({
            unwrap: () => new Promise(() => {}),
            abort: () => {}
        })]);
    });

    afterEach(() => {
        useDispatchMock.mockClear();
        useSelectorMock.mockClear();
        useNavigateMock.mockClear();
        useLoginMutationMock.mockClear();
    });

    test('renders a title element', () => {
        render(<Login />);
        const headerElement = screen.getByRole('heading', {level: 1, name: 'Sign In'});
        expect(headerElement).toBeInTheDocument();

        const paragraphElement = screen.getByText('Sign into Your Account');
        expect(paragraphElement).toBeInTheDocument();

        const emailInput = screen.getByLabelText('Email');
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput).toBeInTheDocument();
    });

    test('should form submit', async () => {
        // render(<Login />);
        // act(() => server.use(
        //     rest.post(`${process.env.REACT_APP_API_DOMAIN}${API.LOGIN}`, (req, res, ctx) => {
        //         return res(ctx.status(200), ctx.json({}));
        //     })
        // ));

        renderWithProviders(<Login />, {
            preloadedState: {
                isAuthenticated: true,
                token: 'token',
                isLoading: false,
                user: {id: '121'}
            } 
        });
        // const mocked = jest.spyOn(AuthAPI, 'useLoginMutation')

        const {result} = renderHook(() => useLoginMutation());
        // const api = (result.current as any).onLoginAPI;

        const data = {
            email: 'dolly@gmail.com',
            password: '123456'
        };
        const form = await screen.findByRole('form', {name: /form/i});
        // const submitSpy = jest.spyOn(form, 'onsubmit', 'get');

        const emailInput = screen.getByRole('textbox', {name: 'Email'});
        const passwordInput = screen.getByLabelText(/password/i);

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            return eventHandler.type(emailInput, data.email)
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            return eventHandler.type(passwordInput, data.password);
        });

        // await act(async () => await eventHandler.type(emailInput, data.email));
        // await act(async () => await eventHandler.type(passwordInput, data.password));

        const buttonElement = screen.getByRole('button', {name: 'Sign In'});
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            return eventHandler.click(buttonElement, {bubbles: false});
        });
        act(() => result.current[0](data));

        // const buttonElement = await screen.findByRole('button', {name: 'Sign In'});
        // act(() => buttonElement.click());

        // server.use(
        //     rest.post(`${process.env.REACT_APP_API_DOMAIN}${API.LOGIN}`, (req, res, ctx) => {
        //         return res(ctx.status(200), ctx.json({}));
        //     })
        // )

        // expect(submitSpy).toHaveBeenCalled();
        expect(form).toHaveFormValues({
            email: data.email,
            password: data.password
        });

        // expect(emailInput).toHaveValue(data.email);

    });
});
