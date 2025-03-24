import { Cookies } from "react-cookie";
import { create } from "zustand";

interface UserState {
  token: string | null;
  setToken: (token: string | null) => void;
  user: any;
  setUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: "",
  user: "",
  setToken: () => {
    const cookie = new Cookies();
    set({ token: cookie.get("token") });
  },
  setUser: () => {
    const user = localStorage.getItem("user");
    if (user) {
    //   set({ user: JSON.parse(user) });
    }
  },
}));



// import { create } from "zustand";
// import { Cookies } from "react-cookie";

// interface UserState {
//   token: string;
//   user: any;
//   setToken: (token: string) => void;
//   setUser: (user: any) => void;
//   loadUserFromStorage: () => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   token: "",
//   user: null,

//   setToken: (token: string) => {
//     const cookie = new Cookies();
//     cookie.set("token", token, { path: "/", secure: true });
//     set({ token });
//   },

//   setUser: (user: any) => {
//     localStorage.setItem("user", JSON.stringify(user));
//     set({ user });
//   },

//   loadUserFromStorage: () => {
//     const cookie = new Cookies();
//     const token = cookie.get("token") || "";
//     const storedUser = localStorage.getItem("user");
//     set({ 
//       token, 
//       user: storedUser ? JSON.parse(storedUser) : null 
//     });
//   },
// }));

