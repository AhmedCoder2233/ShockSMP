import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-[720px] pt-10 bg-gradient-to-b from-blue-800 to-blue-950">
      <SignUp routing="hash"/>
    </div>
  );
}