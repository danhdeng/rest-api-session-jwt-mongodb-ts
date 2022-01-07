import {
    DocumentType,
    getModelForClass,
    prop,
    pre,
    index,
    modelOptions,
    Severity,
} from '@typegoose/typegoose';
// import { nanoid } from 'nanoid';
import argon2 from 'argon2';
import log from '@/utils/logger';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

// exclude fields being expose to the  api
export const privateFields = [
    'password',
    '__v',
    'verificationCode',
    'passwordResetCode',
    'verified',
];

@pre<User>('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const hashPassword = await argon2.hash(this.password);
    this.password = hashPassword;
    return;
})
@index({ eamil: 1 })
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
export class User {
    @prop({ lowercase: true, required: true, unique: true })
    email!: string;

    @prop({ required: true })
    firstName: string;

    @prop({ required: true })
    lastName: string;

    @prop({ required: true })
    password: string;

    @prop({ required: true, default: () => nanoid() })
    verificationCode: string;

    @prop()
    passwordResetCode: string | null;

    @prop({ default: false })
    verified: boolean;

    async validatePassword(
        this: DocumentType<User>,
        candidatePassword: string
    ) {
        try {
            return await argon2.verify(this.password, candidatePassword);
        } catch (e: any) {
            log.error('Could not validate password');
            return false;
        }
    }
}

const UserModel = getModelForClass(User);

export default UserModel;
