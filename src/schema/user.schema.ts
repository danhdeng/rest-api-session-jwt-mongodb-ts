import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: 'First name is required',
        }),
        lastName: string({
            required_error: 'Last name is required',
        }),
        password: string({
            required_error: 'Password is required',
        }).min(6, 'Password is too short - should be min 6 characters'),
        confirmedPassword: string({
            required_error: 'Confirmed Password is required',
        }),
        email: string({
            required_error: 'Email is required',
        }).email('Not a valid email'),
    }).refine((data) => data.password === data.confirmedPassword, {
        message: 'Passwords do not match',
        path: ['confirmedPassword'],
    }),
});

export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string(),
    }),
});

export const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
        }).email('Not a valid email'),
    }),
});

export const resetPasswordSchema = object({
    params: object({
        id: string(),
        passwordResetCode: string(),
    }),
    body: object({
        password: string({
            required_error: 'Password is required',
        }).min(6, 'Password is too short - should be min 6 characters'),
        confirmedPassword: string({
            required_error: 'Confirmed Password is required',
        }),
        email: string({
            required_error: 'Email is required',
        }).email('Not a valid email'),
    }).refine((data) => data.password === data.confirmedPassword, {
        message: 'Passwords do not match',
        path: ['confirmedPassword'],
    }),
});

type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

export {
    CreateUserInput,
    VerifyUserInput,
    ForgotPasswordInput,
    ResetPasswordInput,
};
