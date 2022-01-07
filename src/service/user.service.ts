import UserModel, { User } from '@/models/user.model';

export const createUser = (input: Partial<User>) => {
    return UserModel.create(input);
};

export const findUserById = (id: string) => {
    return UserModel.findById(id);
};

export const findUserByEmail = (email: string) => {
    return UserModel.findOne({ email });
};
