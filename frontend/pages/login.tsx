import { Button } from "antd";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { resgisterMutation } from "@/apollo-client/mutations";
import { useEffect } from "react";
import Loading from "@/components/Loading";

const Login = () => {
  const auth = getAuth();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);
  };

  const [register, { data, loading, error }] = useMutation(resgisterMutation);
  useEffect(() => {
    const callAPI = async () => {
      if (user && user.uid) {
        try {
          await register({
            variables: {
              uid: user.uid,
              name: user.displayName,
            },
          });
        } catch (e) {}
        router.push("/");
      }
    };
    callAPI();
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col items-center pt-20 h-screen dark:text-white">
      <span className="text-3xl mb-5">Welcome</span>
      <Button
        className="bg-[#4285f4] h-[42px] flex w-48 items-center p-[1px] border-none rounded-sm"
        onClick={handleLoginWithGoogle}
      >
        <div className="flex">
          <div className="bg-white w-10 h-10 flex justify-center items-center rounded-sm">
            <FcGoogle size={20} />
          </div>
          <span className="text-white font-semibold text-base flex items-center px-2">
            Login with Google
          </span>
        </div>
      </Button>
    </div>
  );
};

export default Login;
