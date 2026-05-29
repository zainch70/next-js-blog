import type { ElementType, ReactNode } from "react";

type ContainerSize = "default" | "narrow" | "wide";

const sizeMap: Record<ContainerSize, string> = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
  wide: "max-w-[90rem]",
};

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: ContainerSize;
}

export default function PageContainer({
  children,
  className = "",
  as: Tag = "div",
  size = "default",
}: PageContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full ${sizeMap[size]} px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
