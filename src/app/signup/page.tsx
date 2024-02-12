"use client";

import { useFormState, useFormStatus } from "react-dom";

export default function Signup() {
  // const [state, formAction] = useFormState(onSubmit, { message: null });
  const { pending } = useFormStatus();
  // console.log("state", state);

  return (
    <>
      <div className="h-screen">
        <div className="">
          <div className="">
            {/* <BackButton /> */}
            <div>계정을 생성하세요.</div>
          </div>
          <form action={() => {}}>
            <div className="">
              <div className="">
                <label className="" htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className=""
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="">
                <label className="" htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
                  className=""
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="">
                <label className="" htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className=""
                  type="password"
                  placeholder=""
                  required
                />
              </div>
              <div className="">
                <label className="" htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  name="image"
                  required
                  className=""
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="">
              <button type="submit" className="" disabled={pending}>
                가입하기
              </button>
              <div className="">s</div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
