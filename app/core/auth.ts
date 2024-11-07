/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  GoogleAuthProvider,
  User,
  UserCredential,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { atom, useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginForm from "../components/login";
import { app, auth } from "./firebase";
import { store } from "./store";

export const currentUser = atom<Promise<User | null> | User | null>(
  new Promise<User | null>(() => {}),
);
currentUser.debugLabel = "currentUser";

const unsubscribe = auth.onAuthStateChanged((user) => {
  store.set(currentUser, user);
});

if (import.meta.hot) {
  import.meta.hot.dispose(() => unsubscribe());
}

export function useCurrentUser() {
  return useAtomValue(currentUser);
}

export const currentUserLoadable = loadable(currentUser);

export function useCurrentUserLoadable() {
  return useAtomValue(currentUserLoadable);
}

export function useSignIn(
  signInMethod: SignInMethod,
): [signIn: () => void, inFlight: boolean] {
  const navigate = useNavigate();
  const [inFlight, setInFlight] = useState(false);

  const signIn = useCallback(() => {
    let p: Promise<UserCredential> | null = null;

    if (signInMethod === "email") {
      const auth = getAuth(app);
      return loginForm;
      // const [email, setEmail] = useState("");
      // const [password, setPassword] = useState("");

      // p = signInWithEmailAndPassword(auth, email, password);
    }

    if (signInMethod === "google.com") {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      provider.setCustomParameters({
        // login_hint: ...
        prompt: "consent",
      });
      p = signInWithPopup(auth, provider);
    }

    if (!p) throw new Error(`Not supported: ${signInMethod}`);

    setInFlight(true);
    p.then(() => navigate("/")).finally(() => setInFlight(false));
  }, [signInMethod, navigate]);

  return [signIn, inFlight] as const;
}

export type SignInMethod = "google.com" | "email";
