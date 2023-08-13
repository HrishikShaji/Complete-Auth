"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiOutlineGoogle, AiOutlineGithub } from "react-icons/ai";
import { BiLogoDiscordAlt } from "react-icons/bi";
import InputItem from "./InputItem";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

type InputType = {
  name: string;
  value: string;
  placeholder: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [registerValues, setRegisterValues] = useState<Record<string, any>>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginValues, setLoginValues] = useState<Record<string, any>>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session]);

  const loginInputs = [
    {
      name: "email",
      placeholder: "email...",
      value: loginValues.email,
    },
    {
      name: "password",
      placeholder: "password...",
      value: loginValues.password,
    },
  ];

  const registerInputs = [
    {
      name: "username",
      placeholder: "username...",
      value: registerValues.username,
    },
    {
      name: "email",
      placeholder: "email...",
      value: registerValues.email,
    },
    {
      name: "password",
      placeholder: "password...",
      value: registerValues.password,
    },
    {
      name: "confirmPassword",
      placeholder: "confirm password...",
      value: registerValues.confirmPassword,
    },
  ];

  const registerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };

  const loginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const registerData: RegisterData = {
      name: registerValues.username,
      email: registerValues.email,
      password: registerValues.password,
    };

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const data = await res.json();
      console.log(data);

      if (data?.error) {
        toast.error(data.error);
      } else {
        const loginData: LoginData = {
          email: registerValues.email,
          password: registerValues.password,
        };

        const response = await signIn("credentials", {
          ...loginData,
          redirect: false,
        });
        if (response?.error) {
          toast.error(response.error);
        }
      }
    } catch (error) {
      toast.error("An error occured");
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const loginData: LoginData = {
      email: loginValues.email,
      password: loginValues.password,
    };
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        ...loginData,
        redirect: false,
      });
      if (response?.error) {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("An error occured");
    } finally {
      setLoading(false);
      router.push("/");
    }

    console.log(loginValues);
  };
  return (
    <div className="bg-neutral-500 p-10 rounded-3xl flex flex-col gap-4 justify-center items-center">
      <div className="flex flex-col gap-4 items-center">
        {isLogin ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-2">
            {loginInputs.map((loginInput: InputType, i: number) => (
              <InputItem
                key={i}
                inputs={loginInput}
                handleChange={loginChange}
              />
            ))}
            <button
              type="submit"
              className="bg-white font-semibold rounded-md py-2">
              {loading ? <ClipLoader size={10} color="black" /> : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-2">
            {registerInputs.map((registerInput: InputType, i: number) => (
              <InputItem
                key={i}
                inputs={registerInput}
                handleChange={registerChange}
              />
            ))}
            <button
              type="submit"
              className="bg-white font-semibold rounded-md py-2">
              {loading ? <ClipLoader size={10} color="black" /> : "Sign Up"}
            </button>
          </form>
        )}
        <div>
          <span className="text-sm text-gray-800 font-semibold">
            {isLogin ? "New User?" : "Already have an account?"}{" "}
          </span>
          <button onClick={() => setIsLogin(!isLogin)} className=" font-bold">
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center ">
        <div className="flex flex-col items-center">
          <h1 className="text-sm font-semibold">or</h1>
          <h1 className="text-sm font-semibold">Sign In using</h1>
        </div>
        <div className="flex gap-2 ">
          <AiOutlineGoogle
            onClick={() => signIn("google")}
            className="cursor-pointer"
            size={25}
          />
          <BiLogoDiscordAlt
            onClick={() => signIn("discord")}
            className="cursor-pointer"
            size={25}
          />
          <AiOutlineGithub
            onClick={() => signIn("github")}
            className="cursor-pointer"
            size={25}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

//VJdQ8Tm3GI9gLIxk
