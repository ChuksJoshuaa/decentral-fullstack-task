export const userTransformer = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
};
