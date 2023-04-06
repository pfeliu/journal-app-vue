import authApi from '../../../api/authApi';

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;

  try {
    const { data } = await authApi.post(':signUp', {
      email,
      password,
      returnSecureToken: true,
    });
    const { idToken, refreshToken } = data;
    // console.log(data);

    await authApi.post(':update', {
      displayName: name,
      idToken,
    });

    delete user.password;
    commit('loginUser', { user, idToken, refreshToken });

    //console.log(resp);

    return { ok: true };
  } catch (error) {
    // console.log(error);
    return { ok: false, message: error.response.data.error.message };
  }
};

export const signInUser = async ({ commit }, user) => {
  const { email, password } = user;

  try {
    const { data } = await authApi.post(':signInWithPassword', {
      email,
      password,
      returnSecureToken: true,
    });
    const { displayName, idToken, refreshToken } = data;
    // console.log(data);

    /*  await authApi.post(':update', {
      displayName: name,
      idToken,
    });
 */
    /* delete user.password; */
    user.name = displayName;
    commit('loginUser', { user, idToken, refreshToken });

    //console.log(resp);

    return { ok: true };
  } catch (error) {
    // console.log(error);
    return { ok: false, message: error.response.data.error.message };
  }
};
