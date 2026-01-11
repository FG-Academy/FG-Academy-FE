import { Button, Typography } from "./shadcn";
import Flex from "./shadcn/ui/flex";

interface ErrorFallbackProps {
  resetErrorBoundary: () => void;
}

export default function BasicErrorFallback({
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="min-h-[400px] p-8 text-center gap-4"
    >
      <Typography name="h2">데이터를 불러올 수 없습니다.</Typography>
      <Typography name="p" className="line">
        서버와의 연결에 문제가 발생했습니다.
      </Typography>
      <br />
      <Typography name="p">다시 시도해주세요.</Typography>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
    </Flex>
  );
}
