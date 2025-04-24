import { Link } from "react-router"

export const LeftOrRightImage = ({ content }: { content: any }) => {
    const imageContent = content.find((c: any) => c.type === 'image')?.image;
    const textContent = content.find((c: any) => c.type === 'text')?.value;
    const type = content.find((c: any) => c.type === 'type')?.value;
    return <section id="fun-seminar" className="w-full py-12 md:py-24 lg:py-32 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Gambar */}
        <div className={`order-2 lg:order-1 ${type === 'left' ? 'order-1' : 'order-2'}`}>
          <img
            src={imageContent}
            alt="Ilustrasi Fun Seminar"
            className="mx-auto rounded-xl w-full max-w-md lg:max-w-full"
          />
        </div>
        {/* Teks */}
        <div className={`space-y-6 text-center lg:text-left ${type === 'left' ? 'order-1' : 'order-2'}`}>
          <p className="text-muted-foreground text-lg md:text-xl">
           {textContent}
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
}
