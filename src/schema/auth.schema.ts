import { object, string, TypeOf } from 'zod';

const errorMsg = 'Invalid email or password';
export const CreateSessionSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
        }).email(errorMsg),
        password: string({
            required_error: 'Password is required',
        }).min(6, errorMsg),
    }),
});

export type CreateSessionInput = TypeOf<typeof CreateSessionSchema>['body'];
