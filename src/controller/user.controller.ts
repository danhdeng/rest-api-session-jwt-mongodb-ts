import {
    CreateUserInput,
    VerifyUserInput,
    ForgotPasswordInput,
    ResetPasswordInput,
} from '@/schema/user.schema';
import { Request, Response } from 'express';
import {
    createUser,
    findUserById,
    findUserByEmail,
} from '@/service/user.service';
import sendEmail from '@/utils/mailer';
import log from '@/utils/logger';
// import { nanoid } from 'nanoid';

import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
export const createUserHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response
) => {
    const body = req.body;
    log.info(body, 'create user body');
    try {
        const user = await createUser(body);
        await sendEmail({
            to: user.email,
            from: 'test@example.com',
            subject: 'Verify your email',
            text: `verfication code: ${user.verificationCode}. Id: ${user._id}`,
        });
        return res.send('User successully created');
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(409).send('Account already exists');
        }
        return res.status(500).send(e);
    }
};

export const verifyUserHandler = async (
    req: Request<VerifyUserInput>,
    res: Response
) => {
    const id = req.params.id;

    const notVerifyMsg = 'Could not verify user';

    const verificationCode = req.params.verificationCode;

    //find the user by id
    const user = await findUserById(id);

    if (!user) {
        return res.send(notVerifyMsg);
    }

    //check to see if the user is already verified.
    if (user.verified) {
        return res.send('User already is verified');
    }

    //check if the verification code matches
    if (user.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();
        return res.send('User successfully verified');
    }

    return res.send(notVerifyMsg);
};

export const forgotPasswordHandler = async (
    req: Request<{}, {}, ForgotPasswordInput>,
    res: Response
) => {
    const forgotEmailMsg =
        'if a user with that email is registered you will receive a password  reset email';

    const { email } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
        log.debug(`User with email ${email} do not exists`);
        return res.send(forgotEmailMsg);
    }
    if (!user.verified) {
        return res.send('User is not verified');
    }

    const passwordResetCode = nanoid();

    user.passwordResetCode = passwordResetCode;
    await user.save();

    await sendEmail({
        to: user.email,
        from: 'test@example.com',
        subject: 'Reset your password',
        text: `Password reset code: ${passwordResetCode}. Id ${user._id}`,
    });
    log.debug(`Passwrod reset email sent to ${email}`);
    return res.send(forgotEmailMsg);
};

export const resetPasswordHandler = async (
    req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
    res: Response
) => {
    const { id, passwordResetCode } = req.params;

    const { password } = req.body;
    const user = await findUserById(id);
    if (
        !user ||
        !user.passwordResetCode ||
        user.passwordResetCode !== passwordResetCode
    ) {
        return res.status(400).send('Could not reset user password');
    }
    user.passwordResetCode = null;
    user.password = password;
    await user.save();
    return res.send('Successfully updated password');
};

export const getCurrentUserHandler = async (req: Request, res: Response) => {
    return res.send(res.locals.user);
};

export default {
    createUserHandler,
    forgotPasswordHandler,
    resetPasswordHandler,
    getCurrentUserHandler,
    verifyUserHandler,
};
