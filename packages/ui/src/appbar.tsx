import { Button } from "./button";

interface AppbarProps {
  user? : {
    name? : string | null
  },
  onSignout: ()=>void,
  onSignin: ()=>void,
}


 export const Appbar = ({onSignout , onSignin , user} : AppbarProps) => {

  return (
    <div className="w-[100%]  border-b-[1px] border-zinc-400 flex justify-between items-center p-4 ">
      <div>
        <h1 className="text-zinc-200 text-xl text-violet-800 font-bold p-2">PayTM</h1>
      </div>
      <div>
         <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Signin"}</Button>
      </div>
    </div>
  );
};
