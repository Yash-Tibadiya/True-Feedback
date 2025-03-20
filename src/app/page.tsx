import ContentSection from "@/components/content-2";
import FooterSection from "@/components/footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Cpu, Lock, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col min-h-screen overflow-hidden transition-colors duration-300 bg-gradient-to-tr from-blue-400 to-blue-800 dark:bg-black dark:bg-gradient-to-tr dark:from-black dark:to-blue-900">
        <header>
          <Navbar />
        </header>

        <main>
          <div
            aria-hidden
            className="absolute inset-0 hidden opacity-50 z-2 isolate contain-strict lg:block"
          >
            <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
            <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
            <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
          </div>

          <section className="overflow-hidden bg-white dark:bg-transparent">
            <div className="relative max-w-5xl px-6 mx-auto py-28 lg:py-24">
              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl">
                  Dive into the World of Anonymous Feedback
                </h1>
                <p className="max-w-2xl mx-auto my-8 text-xl">
                  Share your thoughts freely and without hesitation. Your voice
                  matters, your privacy is our priority, and feedback is always
                  anonymous.
                </p>

                <Button asChild size="lg">
                  <Link href="/dashboard">
                    <span className="btn-label">Start Building</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mx-auto max-w-7xl">
              <div className="pl-16 -mr-16 perspective-distant lg:-mr-56 lg:pl-56">
                <div className="[transform:rotateX(20deg);]">
                  <div className="flex lg:h-176 skew-x-[.36rad] ">
                    <Image
                      className="w-full rounded-(--radius) z-1  border dark:hidden"
                      src="/extra/s1.png"
                      alt="True Feedback hero section"
                      layout="intrinsic"
                      width={3200}
                      height={1800}
                      priority
                    />
                    <Image
                      className=" rounded-(--radius) z-1  hidden border dark:block"
                      src="/extra/s2.png"
                      alt="True Feedback hero section"
                      layout="intrinsic"
                      width={3200}
                      height={1800}
                      priority
                    />

                    <div
                      aria-hidden
                      className="absolute -inset-16 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] [--color-border:var(--color-zinc-400)] sm:-inset-32 dark:[--color-border:color-mix(in_oklab,var(--color-white)_20%,transparent)]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 from-background z-11 bg-gradient-to-l via-transparent"
                    />
                    <div
                      aria-hidden
                      className="z-2 absolute inset-0 size-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,var(--color-background)_100%)]"
                    />
                    <div
                      aria-hidden
                      className="z-2 absolute inset-0 size-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,var(--color-background)_100%)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-10 py-16 bg-background">
            <div className="max-w-5xl px-6 m-24 mx-auto">
              <h2 className="text-lg font-medium text-center">
                Your favorite companies are our partners.
              </h2>
              <div className="flex flex-wrap items-center justify-center max-w-4xl mx-auto mt-20 gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
                <Image
                  className="h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nvidia.svg"
                  alt="Nvidia Logo"
                  height={20}
                  width={20}
                />
                <Image
                  className="h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/column.svg"
                  alt="Column Logo"
                  height={16}
                  width={20}
                />
                <Image
                  className="h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/github.svg"
                  alt="GitHub Logo"
                  height={16}
                  width={20}
                />
                <Image
                  className="h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nike.svg"
                  alt="Nike Logo"
                  height={20}
                  width={20}
                />
                <Image
                  className="h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/laravel.svg"
                  alt="Laravel Logo"
                  height={16}
                  width={20}
                />
                <Image
                  className="h-7 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/lilly.svg"
                  alt="Lilly Logo"
                  height={28}
                  width={20}
                />
                <Image
                  className="h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                  alt="Lemon Squeezy Logo"
                  height={20}
                  width={20}
                />
                <Image
                  className="h-6 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/openai.svg"
                  alt="OpenAI Logo"
                  height={24}
                  width={20}
                />
                <Image
                  className="h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/tailwindcss.svg"
                  alt="Tailwind CSS Logo"
                  height={16}
                  width={20}
                />
                <Image
                  className="h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/vercel.svg"
                  alt="Vercel Logo"
                  height={20}
                  width={20}
                />
                <Image
                  className="h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/zapier.svg"
                  alt="Zapier Logo"
                  height={20}
                  width={20}
                />
              </div>
            </div>
          </section>

          <section className="overflow-hidden py-16 md:py-32">
            <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-12">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl font-semibold lg:text-5xl">
                  Designed for Seamless Feedback Integration
                </h2>
                <p className="mt-6 text-lg">
                  Empower your team with anonymous feedback workflows that adapt
                  to your needs, whether you prefer secure feedback channels or
                  AI-driven insights.
                </p>
              </div>
              <div className="relative rounded-3xl p-3 md:-mx-8 lg:col-span-3">
                <div className="aspect-88/36 relative">
                  <div className="bg-linear-to-t z-1 from-background absolute inset-0 to-transparent"></div>
                  <Image
                    src="/extra/mail-upper.png"
                    className="absolute inset-0 z-10"
                    alt="payments illustration dark"
                    width={2797}
                    height={1137}
                  />
                  <Image
                    src="/extra/mail-back.png"
                    className="hidden dark:block"
                    alt="payments illustration dark"
                    width={2797}
                    height={1137}
                  />
                  <Image
                    src="/extra/mail-back-light.png"
                    className="dark:hidden"
                    alt="payments illustration light"
                    width={2797}
                    height={1137}
                  />
                </div>
              </div>
              <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="size-5" />
                    <h3 className="text-lg font-medium">Faaast</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Collect and analyze feedback in real-time to drive immediate
                    insights and improvements.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="size-5" />
                    <h3 className="text-lg font-medium">Powerful</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Equip your team with robust tools to manage and leverage
                    anonymous feedback for better decision-making.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lock className="size-5" />
                    <h3 className="text-lg font-medium">Security</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Ensure complete confidentiality with secure, anonymous
                    feedback that protects your team&apos;s privacy.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-5" />

                    <h3 className="text-lg font-medium">AI Powered</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Leverage AI-driven insights to understand trends and
                    patterns in feedback to foster innovation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <ContentSection />

          <FooterSection />
        </main>
      </div>
    </>
  );
}
