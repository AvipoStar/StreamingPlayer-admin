import { useState } from "react";
import { becomeAuthor } from "../logic/editProfile";

export const BecomeAuthor = () => {
  const [nickname, setNickname] = useState("");

  const handleBecomeAuthor = async () => {
    const result = await becomeAuthor(nickname);
    if (result) {
      alert("Данные изменены");
      window.location.reload(); // Перезагрузка страницы
    }
  };
  return (
    <div className="EditProfileForm">
      <h2>Стать автором</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleBecomeAuthor();
        }}
      >
        <label>
          <strong>Имя автора:</strong>
          <input
            type="text"
            name="nickname"
            value={nickname || ""}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleBecomeAuthor}>
          Стать автором
        </button>
      </form>
    </div>
  );
};
