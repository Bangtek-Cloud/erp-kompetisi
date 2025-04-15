import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AboutUsPage() {
    return (
        <div className="flex flex-col min-h-screen px-4 md:px-16 py-10 bg-base-100">
            <main className="flex-1 space-y-16">
                {/* Section: About Us */}
                <Card className="md:grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <CardHeader>
                            <CardTitle className="text-4xl font-extrabold text-primary tracking-tight lg:text-5xl">
                                About Us
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground leading-relaxed">
                                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                    {' BANGTEK (Abang Teknisi)'}
                                </code> adalah platform penggerak kompetisi teknisi di Indonesia. Kami menciptakan
                                wadah edukatif dan kompetitif untuk teknisi—baik pemula maupun
                                profesional—untuk berkembang, membangun jejaring, dan siap
                                bersaing secara global.
                            </p>
                            <p className="text-foreground leading-relaxed mt-4">
                                Didirikan untuk mengangkat derajat profesi teknisi, kami
                                berkomitmen menyelenggarakan kompetisi berkualitas tinggi demi
                                SDM unggul di bidang teknologi dan reparasi.
                            </p>
                        </CardContent>
                    </div>
                    <div className="p-6">
                        <img
                            src="/images/1.jpg"
                            alt="About BANGTEK"
                            className="rounded-xl shadow-md w-full h-auto object-cover"
                        />
                    </div>
                </Card>

                <Card>
                    <div className="order-1 md:order-2">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-primary">
                                Jago Repair championship
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <blockquote className="mt-6 border-l-2 pl-6 italic">
                                "Membangun Generasi Teknisi Digital Profesional"
                            </blockquote>
                            <p className="leading-7 [&:not(:first-child)]:mt-6">
                                Sebagai program pencarian bakat (talent scouting) yang
                                menargetkan teknisi-teknisi terbaik Indonesia untuk didorong
                                tampil dalam ajang kompetisi internasional
                            </p>
                        </CardContent>
                    </div>
                </Card>

                <Card className="md:grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-primary">
                                Biggest Competition Event
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg leading-relaxed mt-2">
                                <strong>Jago Repair</strong> adalah ajang kompetisi teknisi
                                nasional yang menjadi simbol dedikasi kami dalam membangun
                                kualitas teknisi Indonesia di era digital.
                            </p>
                            <p className="text-lg leading-relaxed mt-4">
                                Kompetisi ini menguji keterampilan teknis, etos kerja, presisi,
                                dan profesionalisme teknisi masa kini. Lebih dari sekadar lomba,
                                ini adalah pencarian bakat untuk tampil di panggung dunia.
                            </p>
                            <p className="text-lg leading-relaxed mt-4">
                                <strong>Jago Repair Championship 2025</strong> akan menjadi
                                ikon, membuka jalan teknisi terbaik Indonesia menuju kompetisi
                                internasional.
                            </p>
                        </CardContent>
                    </div>
                    <div className="p-6">
                        <img
                            src="/B-dark.png"
                            alt="Jago Repair Competition"
                            className="rounded-xl shadow-md w-full h-auto object-cover dark:block hidden"
                        />
                         <img
                            src="/B-light.png"
                            alt="Jago Repair Competition"
                            className="rounded-xl shadow-md w-full h-auto object-cover block dark:hidden"
                        />
                    </div>
                </Card>
            </main>
        </div>
    );
}
