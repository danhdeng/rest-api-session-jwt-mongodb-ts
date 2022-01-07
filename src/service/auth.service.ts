import { DocumentType } from '@typegoose/typegoose';
import SessionModel, { Session } from '@/models/session.model';
import { privateFields, User } from '@/models/user.model';
import { omit } from 'lodash';

import { signJwt } from '@/utils/jwt.utils';

export const createSession = async ({ userId }: { userId: string }) => {
    return SessionModel.create({ user: userId });
};

export const findSessionById = async (id: string) => {
    return SessionModel.findById(id);
};

export const singRefreshToken = async ({ userId }: { userId: string }) => {
    const session = await createSession({ userId });

    const refreshToken = signJwt(
        { session: session._id },
        'refreshTokenPrivateKey',
        {
            expiresIn: '30d',
        }
    );

    return refreshToken;
};

export const signAccessToken = (user: DocumentType<User>) => {
    const payload = omit(user.toJSON(), privateFields);

    const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
        expiresIn: '15m',
    });
    return accessToken;
};
