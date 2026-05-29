import PageContainer from "./PageContainer";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <PageContainer className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p className="font-semibold text-foreground">Blog App</p>
        <p>Share your stories with the community.</p>
      </PageContainer>
    </footer>
  );
}
