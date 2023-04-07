import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        auth: null,
        login: ({ email, password }) => {
          // AXIOS: Call 1 api login => user
          axios
            .post('http://localhost:9000/auth/login-jwt', {
              email,
              password,
            })
            .then((response) => {
              return set({ auth: response.data }, false, { type: 'auth/login-success' }, alert("Success Password!!!"));
            })
            .catch((err) => {
              return set({ auth: null }, false, { type: 'auth/login-error' }, alert("Wrong Password!!!"));
            });
        },
        logout: () => {
          // AXIOS: Call 1 api login => user
          return set({ auth: null }, false, { type: 'auth/logout-success' });
        },
      }),
      {
        name: 'onlineshop-storage', // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      },
    ),
  ),
);
