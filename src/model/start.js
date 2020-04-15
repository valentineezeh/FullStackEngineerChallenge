/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
// import UserModel from './user';

export const start = async (model) => {
  try {
    const existingAdmin = await model.findOne({ email: 'admin@mail.com' });
    if (!existingAdmin) {
      const admin = new model();
      admin.email = 'admin@mail.com';
      admin.setPassword('password');
      await admin.save();
    }
  } catch (error) {
    return error;
  }
};
