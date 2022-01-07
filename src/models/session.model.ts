import { getModelForClass, pre, prop, Ref } from '@typegoose/typegoose';

import { User } from '@/models/user.model';

export class Session {
    @prop({ ref: () => User })
    user: Ref<User>;

    @prop({ default: true })
    valid: boolean;
}
const SessionModel = getModelForClass(Session, {
    schemaOptions: {
        timestamps: true,
    },
});

export default SessionModel;
