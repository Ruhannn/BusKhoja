"use client";
import { MaskContainer } from "@/components/ui/svg-mask-effect";

export default function Page() {
  return (
    <div className="flex h-[40rem] w-full items-center justify-center overflow-hidden min-h-[80vh]">
      <MaskContainer
        revealText={(
          <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-foreground">
            We’re the curious minds shaping the future at
            {" "}
            <span className="text-primary">Mawts</span>
            .
          </p>
        )}
        className="rounded-md text-background w-full h-full"
      >
        We are
        {" "}
        <span className="text-primary">Ruhan</span>
        {" "}
        Bin Rouf,
        {" "}
        <span className="text-primary">Zihad</span>
        {" "}
        Ahmed,
        {" "}
        <span className="text-primary">Pranto</span>
        {" "}
        Simon Sarkar.
      </MaskContainer>
    </div>
  );
}
