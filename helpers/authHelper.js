import bcrypt from "bcrypt";

const hashPassword = async (plainTextPassword) => {
  try {
    const salt = 10;
    return await bcrypt.hash(plainTextPassword, salt);
  } catch (err) {
    console.error(err);
  }
};

const comparePassword = async (plainTextPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
