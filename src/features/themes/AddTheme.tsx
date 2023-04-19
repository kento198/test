import { useId, useState, type FC, type FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import Spinner from "@/components/Spinner";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { createTheme } from "@/features/themes/lib";

const AddTheme: FC = () => {
  const [themeTitle, setThemeTitle] = useState("");
  const uid = useId();
  const user = useAuthUser();

  if (user === null) return null;
  if (user === undefined) return <Spinner />;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTheme(user.id, themeTitle);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.message);
      }
    }
    setThemeTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <p className="grid gap-y-2">
          <label className="" htmlFor={`${uid}-input`}>
            トークテーマを入力
          </label>
          <input
            value={themeTitle}
            onChange={(e) => {
              setThemeTitle(e.target.value);
            }}
            className="rounded-md border border-gray-700 px-4 py-2 text-lg"
            type="text"
            id={`${uid}-input`}
          />
        </p>
        <p>
          <button
            type="submit"
            className=" rounded-md bg-blue-600 px-4 py-2 font-bold text-white"
          >
            <span aria-hidden="true">＋ </span>追加
          </button>
        </p>
      </div>
    </form>
  );
};

export default AddTheme;