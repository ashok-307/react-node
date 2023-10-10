import {rest} from 'msw';
import { API } from '../core/constants/API';

export const handlers = [
    rest.post(`${API.LOGIN}`, (req, res, cxt) => {
        return res(cxt.status(200), cxt.json({}));
    })
];

