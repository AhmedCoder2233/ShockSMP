import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-[620px] pt-10 bg-gradient-to-b from-blue-800 to-blue-950">
      <SignIn routing="hash"/>
    </div>
  );
}