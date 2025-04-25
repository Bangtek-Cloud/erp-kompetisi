import { HeroSection } from "@/components/hero-section"
import { useQuery } from "@tanstack/react-query"
import { getWebsiteSectionByRouteId } from "@/services/website"
import LoadingSolder from "@/components/loading-solder"
import { LeftOrRightImage } from "@/components/left-or-right--image"
import { CardFeature } from "@/components/card-feature"
import { CardWithDescription } from "@/components/card-with-description"
import { CardWithManyImage } from "@/components/card-with-many-image"

export default function LandingHome() {
  const { data: website, isLoading } = useQuery({
    queryKey: ['website-sections', '/'],
    queryFn: async () => {
      const response = await getWebsiteSectionByRouteId("landing")
      return response.data
    }
  })
  if (isLoading) {
    return <LoadingSolder />
  }

  if (website?.length === 0) {
    return <div className="flex flex-col min-h-screen">
      Konfigurasi website belum lengkap
    </div>
  }


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {website?.map((item: any) => {
          if (item.type === 1) {
            return <HeroSection content={item.content} />
          }
          if (item.type === 2 || item.type === 3) {
            return <LeftOrRightImage content={item.content} />
          }
          if (item.type === 4) {
            return <CardWithDescription content={item.content} />
          }
          if (item.type === 5) {
            return <CardWithManyImage content={item.content} />
          }
          if (item.type === 6) {
            return <CardFeature content={item.content} />
          }
        })}

        {/*        
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
        </section> */}


      </main>
    </div>
  )
}

