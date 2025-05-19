"use client";
import React from "react";
import { useModal } from "@/context/ModalContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpUser } from "@/services/auth/authServices";
import { authenticate } from "@/actions/auth/authenticate";
import { useSession } from "next-auth/react";

type AuthMessage = {
  message: string;
  type: "success" | "error";
};
// Zod validation schemas
const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

type FormMode = "signin" | "signup";

const AuthModal = () => {
  const { update } = useSession();

  const { showAuthModal, closeAuthModal } = useModal();
  const [mode, setMode] = React.useState<FormMode>("signin");
  const [authMessage, setAuthMessage] = React.useState<AuthMessage | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormData | SignInFormData>({
    resolver: zodResolver(mode === "signup" ? signUpSchema : signInSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormData | SignInFormData) => {
    setAuthMessage(null);

    try {
      if (mode === "signup") {
        const signUpData = data as SignUpFormData;
        console.log(" signUpData:", signUpData);
        const response = await signUpUser({
          username: signUpData.username,
          email: signUpData.email,
          password: signUpData.password,
        });
        setAuthMessage({
          message: response.success
            ? response.message || "Sign up successful!"
            : response.error || "Sign up failed",
          type: response.success ? "success" : "error",
        });
      } else if (mode === "signin") {
        const result = await authenticate({
          email: data.email,
          password: data.password,
        });
        console.log(" result:", result);

        if (result.error) {
          setAuthMessage({
            message: result.error,
            type: "error",
          });
        } else {
          await update();

          // setAuthMessage({
          //   message: "Signed in successfully!",
          //   type: "success",
          // });

          closeAuthModal();
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "signup" ? "signin" : "signup"));
    setAuthMessage(null);
    reset();
  };

  if (!showAuthModal) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-[10] bg-black/50">
  <div className="w-[95%] md:w-[400px] h-auto rounded-[20px] bg-white border border-red-700 p-[20px]">
    <div className="relative w-full h-[80px] flex flex-col justify-center my-[10px]">
      <p className="text-[1.5rem] text-red-700 font-semibold">
        {mode === "signup" ? "Sign Up" : "Sign In"}
      </p>
      {mode === "signup" && (
        <p className="text-[0.8rem] text-red-500 font-medium">
          By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.
        </p>
      )}
      <button
        onClick={closeAuthModal}
        className="absolute right-0 top-0 w-[30px] h-[30px] flex items-center justify-center rounded-full border border-red-700 hover:bg-red-100"
      >
        <Icon icon="lets-icons:close-round" className="w-[18px] h-[18px] text-red-700" />
      </button>
    </div>

    {authMessage && (
      <div className="w-full h-[40px] my-[20px] flex items-center justify-center">
        <p
          className={`text-sm ${
            authMessage.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {authMessage.message}
        </p>
      </div>
    )}

    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {mode === "signup" && (
        <div className="w-full flex flex-col">
          <div
            className={`w-full h-[60px] border ${
              "username" in errors ? "border-red-500" : "border-red-700"
            } rounded-[10px]`}
          >
            <input
              {...register("username" as const)}
              className="w-full h-full placeholder:text-xs px-[10px] text-red-900 bg-white"
              placeholder="USERNAME"
            />
          </div>
          <div className="w-full h-[25px] flex items-center">
            {"username" in errors && (
              <p className="text-red-600 text-xs mt-1">
                {errors.username?.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="w-full flex flex-col">
        <div
          className={`w-full h-[60px] border ${
            errors.email ? "border-red-500" : "border-red-700"
          } rounded-[10px]`}
        >
          <input
            {...register("email")}
            className="w-full h-full placeholder:text-xs px-[10px] text-red-900 bg-white"
            placeholder="EMAIL ADDRESS"
          />
        </div>
        <div className="w-full h-[25px] flex items-center">
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="w-full flex space-x-2">
        <div className={`${mode === "signin" ? "w-full" : "w-1/2"} flex flex-col`}>
          <div
            className={`w-full h-[60px] border ${
              errors.password ? "border-red-500" : "border-red-700"
            } rounded-[10px]`}
          >
            <input
              {...register("password")}
              type="password"
              className="w-full h-full placeholder:text-xs px-[10px] text-red-900 bg-white"
              placeholder="PASSWORD"
            />
          </div>
          <div className="w-full h-[25px] flex items-center">
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {mode === "signup" && (
          <div className="w-1/2 flex flex-col">
            <div
              className={`w-full h-[60px] border ${
                "confirmPassword" in errors ? "border-red-500" : "border-red-700"
              } rounded-[10px]`}
            >
              <input
                {...register("confirmPassword" as const)}
                type="password"
                className="w-full h-full placeholder:text-xs px-[10px] text-red-900 bg-white"
                placeholder="CONFIRM PASSWORD"
              />
            </div>
            <div className="w-full h-[25px] flex items-center">
              {"confirmPassword" in errors && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-[80px] flex flex-col items-center justify-evenly">
        <div id="clerk-captcha" />
        <button
          type="submit"
          className="w-full h-[40px] flex items-center justify-center bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
        >
          {isSubmitting ? (
            <>{mode === "signup" ? "Signing Up..." : "Signing In..."}</>
          ) : (
            <>{mode === "signup" ? "Sign Up" : "Sign In"}</>
          )}
        </button>
        <button
          type="button"
          onClick={toggleMode}
          className="text-xs text-red-600 hover:underline mt-2"
        >
          {mode === "signup"
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AuthModal;
