import { QuestionEditPage } from "@/2.pages/question-edit";

type Props = {
  params: Promise<{ questionId: string }>;
};

export default async function Page({ params }: Props) {
  const { questionId } = await params;
  const id = parseInt(questionId, 10);

  return <QuestionEditPage questionId={id} />;
}
