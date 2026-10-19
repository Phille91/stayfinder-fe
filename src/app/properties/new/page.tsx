import PageWrapper from "@/app/components/PageWrapper";
import PropertyForm from "@/app/components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <PageWrapper>
      <h1>Nytt boende</h1>
      <PropertyForm />
    </PageWrapper>
  );
}
