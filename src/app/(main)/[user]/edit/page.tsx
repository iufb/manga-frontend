import { AboutUserForm } from "@/components/forms/AboutUserForm/AboutUserForm";

export default function Edit() {
  return (
    <div className="flex flex-col gap-10 w-full center h-full mt-36">
      <h1 className=" text-3xl font-bold">Edit your profile data.</h1>{" "}
      <AboutUserForm />
    </div>
  );
}
