import { Section } from "@/components/Section";
import { Model, Results, Insights } from "@/components/sections";
import { ChapterPager } from "@/components/ChapterNav";

const ACCURACY: [string, string, string][] = [
  ["PM2.5", "R² 0.86 / 0.92", "daily / annual target (India)"],
  ["NO₂", "R² ~0.83", "after TROPOMI bias-correction"],
  ["O₃ · SO₂", "R² 0.4–0.7", "intrinsically hard — flagged advisory"],
  ["Validation", "spatial CV", "leave-station-out — the honest test"],
  ["Leakage check", "random ≫ spatial", "autocorrelation exposed, not hidden"],
  ["Data status", "demo (synthetic)", "real CPCB validation pending"],
];

export default function ModelPage() {
  return (
    <main>
      <Section
        id="model-accuracy"
        index="05"
        eyebrow="Model & Accuracy"
        title="How accurate is it — and how do we know?"
        lede="The surface model is a hybrid: a CNN-LSTM / Random-Forest trend that learns from the satellite + meteorology stack, plus a kriged residual that corrects local bias near monitoring stations. Skill is reported with spatial cross-validation against held-out CPCB stations — the honest test, not optimistic random splits."
      >
        <div
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-sm border sm:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: "var(--line)", background: "var(--line)" }}
        >
          {ACCURACY.map(([k, v, s]) => (
            <div key={k} className="metric-card">
              <div className="data text-[10px] uppercase" style={{ color: "var(--color-text-3)", letterSpacing: "0.14em" }}>{k}</div>
              <div className="serif mt-3 text-[clamp(1.4rem,2.2vw,2rem)] leading-none">{v}</div>
              <div className="data mt-3 text-[12px]" style={{ color: "var(--color-text-2)" }}>{s}</div>
            </div>
          ))}
        </div>
        <p className="data mt-6 text-[12px]" style={{ color: "var(--color-text-3)" }}>
          Benchmarks are India-competitive targets from the literature (Wang 2023; Katoch 2023; Science Advances 2024).
          Current map values come from the model on synthetic data; the same pipeline reports real R²/RMSE once the
          satellite season + CPCB ground truth are ingested.
        </p>
      </Section>
      <Model />
      <Results />
      <Insights />
      <ChapterPager current="/model" />
    </main>
  );
}
