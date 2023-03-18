import { useAppDispatch } from "@/app/hook";
import { authActions } from "@/features/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../firebase/config";
import Loading from "./Loading";

const AuthContainer = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.push("/login");
    }
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user && user?.uid) {
        dispatch(
          authActions.setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            auth: user.auth,
          })
        );
        localStorage.setItem("accessToken", user.accessToken);
      } else {
        dispatch(authActions.setUser({}));
        localStorage.removeItem("accessToken");
        router.push("/login");
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);
  return <>{loading ? <Loading /> : children}</>;
};

export default AuthContainer;
