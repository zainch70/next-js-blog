interface BlogGridProps {
  children: React.ReactNode;
}

export default function BlogGrid({ children }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 w-full">
      {children}
    </div>
  );
}
