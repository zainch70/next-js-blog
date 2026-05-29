import type { InputHTMLAttributes } from "react";

type AuthInputIcon = "user" | "email" | "password";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: AuthInputIcon;
}

export default function AuthInput({
  label,
  icon,
  id,
  className = "",
  ...props
}: AuthInputProps) {
  const fieldId = id ?? props.name;

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="block text-xs font-bold text-muted uppercase mb-1.5"
      >
        {label}
      </label>
      <div
        className={`flex w-full items-center gap-2.5 rounded-xl border border-border bg-background px-3 input-focus ${className}`.trim()}
      >
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center text-muted"
          aria-hidden
        >
          <AuthInputIcon type={icon} />
        </span>
        <input
          id={fieldId}
          className="min-w-0 flex-1 border-0 bg-transparent py-2.5 pr-1 text-sm text-foreground placeholder:text-muted/70 focus:outline-none"
          {...props}
        />
      </div>
    </div>
  );
}

function AuthInputIcon({ type }: { type: AuthInputIcon }) {
  const className = "h-[1.125rem] w-[1.125rem] block";

  switch (type) {
    case "user":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      );
    case "email":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    case "password":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      );
  }
}
