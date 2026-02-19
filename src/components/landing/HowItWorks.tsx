const steps = [
  {
    step: "01",
    title: "프롬프트 작성",
    description: "원하는 영상을 텍스트로 설명해주세요. 프롬프트가 어렵다면 템플릿을 선택하세요.",
  },
  {
    step: "02",
    title: "옵션 설정",
    description: "스타일, 화면 비율, 길이를 선택하고 참고 이미지를 첨부하세요.",
  },
  {
    step: "03",
    title: "생성",
    description: "생성 버튼 누르면 몇 초 만에 AI 영상이 완성됩니다.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
            이용 방법
          </h2>
          <p className="mt-3 text-foreground/50">
            3단계면 끝. 프롬프트 하나로 영상이 완성됩니다.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="group relative text-center">
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+60px)] top-12 hidden h-px w-[calc(100%-120px)] bg-foreground/10 sm:block" />
              )}

              {/* Step number */}
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-surface transition-all group-hover:border-foreground/20">
                <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground/40">
                  {step.step}
                </span>
              </div>

              {/* Text */}
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/50 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
