"use client";
import { getUser } from "@/services/user";

export default function Home() {
  return (
    <div>
      <button
        className="btn"
        onClick={() =>
          console.log(getUser().then((data) => console.log(data.data)))
        }
      >
        Get user
      </button>
    </div>
  );
}
