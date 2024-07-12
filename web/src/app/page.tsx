import Button from "@/components/Button";
import CloseButton from "@/components/CloseButton";
import Grid from "@/components/Grid";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Button>Play Now</Button>
      </div>
      <div className="w-10">
        <CloseButton>Close</CloseButton>
      </div>
      <div className="w-96 h-96">
        <Grid />
      </div>
    </main>
  );
}
