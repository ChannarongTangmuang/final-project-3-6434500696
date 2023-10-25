"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";



const SigninButton = () => {
  const { data: session } = useSession();
  const router = useRouter();


  const handleSignin = () => {
    router.push("/signin");
  };



  const handleSignout = async () => {
    await signOut();
    router.push("/signout");
  };


  if (session && session.user) {
    return (
      <>


        <p style={{ margin: '18px', fontSize: '20px' }}>{session.user.name}</p>
        <button className="btn btn-danger" onClick={handleSignout}>
          ออกจากระบบ
        </button>

      </>
    );
  }



  return (
    <>
      <button onClick={handleSignin} className="btn btn-primary">
        เข้าสู่ระบบ
      </button>

    </>
  );
};

export default SigninButton;
