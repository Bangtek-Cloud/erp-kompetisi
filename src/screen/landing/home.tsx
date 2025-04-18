import { HeroSection } from "@/components/hero-section"
import { Trophy, BarChart2, Swords } from "lucide-react"
import { Link } from "react-router"

export default function LandingHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        <section id="features" className="w-full py-12 md:py-24 lg:py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ajang Kompetisi Teknisi Terbesar
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Rangkaian event Jago Repair dari berbagai daerah – ajang berkumpulnya teknisi terbaik, unjuk kemampuan, dan berbagi inspirasi.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Seminar & Demo Skill</h3>
                <p className="text-center text-muted-foreground">
                  Belajar langsung dari para pakar industri dan teknisi senior di berbagai sesi inspiratif.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Swords className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Kompetisi Teknik</h3>
                <p className="text-center text-muted-foreground">
                  Tunjukkan keahlianmu dalam berbagai tantangan teknis — mulai dari soldering hingga BGA rebailing.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Hadiah & Doorprize</h3>
                <p className="text-center text-muted-foreground">
                  Dapatkan berbagai hadiah menarik dan kejutan doorprize di setiap akhir acara!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="why-should-join" className="w-full py-16 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center">
                Kenapa Harus Hadir di <span className="text-primary">Bangtek Jago Repair Championship?</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Di balik setiap kompetisi, ada semangat. Di balik setiap alat yang digunakan, ada ketelitian dan dedikasi.
                <strong> Bangtek Jago Repair Championship </strong> bukan sekadar ajang lomba — ini adalah panggung tempat para teknisi muda menunjukkan keahlian terbaik mereka di era digital.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Acara ini menghadirkan <strong>pengalaman langsung</strong> menyaksikan bagaimana para peserta menghadapi tantangan teknis nyata, dengan waktu terbatas dan standar profesional.
                Bagi penonton, ini bukan hanya tontonan menarik, tapi juga <strong>wawasan berharga</strong> tentang dunia teknologi reparasi yang semakin maju.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Datang dan saksikan atmosfer yang penuh adrenalin. Dukung teknisi terbaik dari berbagai daerah dan rasakan bagaimana kompetisi ini
                <strong> membentuk generasi baru yang siap bersaing di kancah global.</strong>
              </p>
            </div>
          </div>
        </section>

        <section id="fun-seminar" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              {/* Gambar */}
              <div className="order-2 lg:order-1">
                <img
                  src="/images/2.png" // ganti dengan gambar relevan
                  alt="Ilustrasi Fun Seminar"
                  className="mx-auto rounded-xl w-full max-w-md lg:max-w-full"
                />
              </div>
              {/* Teks */}
              <div className="space-y-6 text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Fun Seminar: BANGTEKFunSeminar
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Seminar seru yang ditujukan untuk generasi muda dan komunitas dalam mengenal lebih jauh dunia bisnis,
                  teknisi ponsel, dan perkembangan era digital.
                </p>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Melalui sesi ini, peserta akan mendapatkan wawasan baru, inspirasi karir, dan gambaran peluang kerja
                  yang terus berkembang di bidang teknologi dan service gadget.
                </p>
                <div>
                  <Link
                    to="/auth/register"
                    className="inline-block px-6 py-3 text-white bg-primary hover:bg-primary/90 rounded-xl font-semibold transition">
                    Daftar Sekarang
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

