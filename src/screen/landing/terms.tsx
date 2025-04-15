import { PenToolIcon as Tool } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
    return (
        <div className="container mx-auto py-10 px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <Tool className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold tracking-tight">Bangtek Jago Repair</h1>
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Syarat & Ketentuan</h2>
                <p className="text-muted-foreground max-w-2xl">
                    Silakan baca syarat dan ketentuan berikut dengan seksama sebelum menggunakan layanan
                    kami.
                </p>
                <p className="text-sm text-muted-foreground mt-2">Terakhir diperbarui: 15 April 2025</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 lg:mx-20 mx-10">
                <div className="hidden md:block">
                    <div className="sticky top-10">
                        <h3 className="font-medium mb-4">Daftar Isi</h3>
                        <nav className="flex flex-col space-y-1">
                            {Object.entries({
                                introduction: "Pendahuluan",
                                layanan: "Layanan",
                                pendaftaran: "Pendaftaran",
                                turnamen: "Aturan Turnamen",
                                pembayaran: "Pembayaran & Hadiah",
                                perilaku: "Kode Etik",
                                penghentian: "Penghentian",
                                tanggungJawab: "Batasan Tanggung Jawab",
                                hukum: "Hukum yang Berlaku",
                            }).map(([key, title]) => (
                                <a
                                    key={key}
                                    href={`#${key}`}
                                    className="text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-accent"
                                >
                                    {title}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card id="introduction" className="mb-6">
                        <CardHeader className="cursor-pointer" >
                            <div className="flex justify-between items-center">
                                <CardTitle>1. Pendahuluan</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Selamat datang di Bangtek Jago Repair, platform turnamen untuk teknisi, grup teknisi, instansi,
                                    organisasi, dan brand. Dengan mengakses dan menggunakan website ini, Anda menyetujui untuk terikat
                                    oleh syarat dan ketentuan berikut.
                                </p>
                                <p>
                                    Istilah 'kami' mengacu pada pemilik Bangtek Jago Repair. Istilah 'Anda' mengacu pada pengguna atau
                                    pengunjung website kami.
                                </p>
                            </CardContent>
                    </Card>

                    <Card id="layanan" className="mb-6">
                        <CardHeader className="cursor-pointer" >
                            <div className="flex justify-between items-center">
                                <CardTitle>2. Layanan</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Bangtek Jago Repair menyediakan platform untuk mengorganisir dan berpartisipasi dalam turnamen
                                    antar teknisi, grup teknisi, instansi, organisasi, dan brand.
                                </p>
                                <p className="mb-4">
                                    Layanan kami mencakup pendaftaran turnamen, penjadwalan, penilaian, dan pengelolaan hadiah. Kami
                                    berhak untuk mengubah, memodifikasi, atau menghentikan layanan kapan saja tanpa pemberitahuan
                                    sebelumnya.
                                </p>
                                <p>
                                    Kami tidak menjamin bahwa layanan akan bebas dari gangguan atau kesalahan. Kami akan berusaha
                                    semaksimal mungkin untuk memastikan platform berjalan dengan baik.
                                </p>
                            </CardContent>
                    </Card>

                    <Card id="pendaftaran" className="mb-6">
                        <CardHeader className="cursor-pointer" >
                            <div className="flex justify-between items-center">
                                <CardTitle>3. Pendaftaran</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Untuk berpartisipasi dalam turnamen, Anda harus mendaftar dan membuat akun. Anda bertanggung jawab
                                    untuk menjaga kerahasiaan informasi akun Anda dan semua aktivitas yang terjadi di bawah akun Anda.
                                </p>
                                <p className="mb-4">
                                    Anda harus memberikan informasi yang akurat, lengkap, dan terkini. Jika kami menemukan informasi
                                    yang tidak benar, kami berhak untuk menangguhkan atau menghentikan akun Anda.
                                </p>
                                <p>
                                    Pendaftaran dapat dilakukan secara individu atau tim, tergantung pada jenis turnamen yang diikuti.
                                </p>
                            </CardContent>
                    </Card>

                    <Card id="turnamen" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>4. Aturan Turnamen</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Setiap turnamen memiliki aturan spesifik yang harus dipatuhi oleh semua peserta. Aturan ini akan
                                    diumumkan sebelum pendaftaran turnamen dimulai.
                                </p>
                                <p className="mb-4">
                                    Peserta diharapkan untuk berpartisipasi dengan sportif dan jujur. Segala bentuk kecurangan,
                                    manipulasi, atau pelanggaran aturan dapat mengakibatkan diskualifikasi dan penangguhan akun.
                                </p>
                                <p>Keputusan juri dan panitia turnamen bersifat final dan tidak dapat diganggu gugat.</p>
                            </CardContent>
                    </Card>

                    <Card id="pembayaran" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>5. Pembayaran & Hadiah</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Beberapa turnamen mungkin memerlukan biaya pendaftaran. Semua pembayaran harus dilakukan melalui
                                    metode pembayaran yang disediakan di platform kami.
                                </p>
                                <p className="mb-4">
                                    Hadiah akan diberikan sesuai dengan ketentuan yang telah ditetapkan untuk setiap turnamen.
                                    Pemenang bertanggung jawab untuk memberikan informasi yang benar untuk pengiriman hadiah.
                                </p>
                                <p>Pajak dan biaya lain yang terkait dengan penerimaan hadiah menjadi tanggung jawab pemenang.</p>
                            </CardContent>
                    </Card>

                    <Card id="perilaku" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>6. Kode Etik</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Peserta diharapkan untuk berperilaku dengan hormat dan profesional selama berpartisipasi dalam
                                    turnamen dan menggunakan platform kami.
                                </p>
                                <p className="mb-4">
                                    Kami tidak mentolerir pelecehan, diskriminasi, atau perilaku kasar dalam bentuk apapun.
                                    Pelanggaran terhadap kode etik dapat mengakibatkan penangguhan atau penghentian akun.
                                </p>
                                <p>
                                    Peserta juga diharapkan untuk menghormati hak kekayaan intelektual dan tidak membagikan konten
                                    yang melanggar hak cipta.
                                </p>
                            </CardContent>
                    </Card>

                    <Card id="penghentian" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>7. Penghentian</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Kami berhak untuk menangguhkan atau menghentikan akun Anda dengan atau tanpa pemberitahuan jika
                                    Anda melanggar syarat dan ketentuan ini.
                                </p>
                                <p>
                                    Setelah penghentian, hak Anda untuk menggunakan layanan akan segera berhenti. Jika Anda ingin
                                    menghentikan akun Anda, Anda dapat berhenti menggunakan layanan atau menghubungi kami untuk
                                    menonaktifkan akun Anda.
                                </p>
                            </CardContent>
                    </Card>

                    <Card id="tanggungJawab" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>8. Batasan Tanggung Jawab</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus, atau
                                    konsekuensial yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan kami.
                                </p>
                                <p>
                                    Kami tidak bertanggung jawab atas konten yang diunggah oleh pengguna atau tindakan pengguna lain
                                    di platform kami.
                                </p>
                            </CardContent>
                    </Card>

                    <Card id="hukum" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>9. Hukum yang Berlaku</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.
                                </p>
                                <p>
                                    Setiap perselisihan yang timbul dari atau sehubungan dengan syarat dan ketentuan ini akan
                                    diselesaikan melalui negosiasi dengan itikad baik. Jika negosiasi gagal, perselisihan akan
                                    diselesaikan melalui arbitrase sesuai dengan hukum yang berlaku.
                                </p>
                            </CardContent>
                    </Card>
                </div>
            </div>

            <Separator className="my-8 max-w-5xl mx-auto" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-5xl mx-auto">
                <p className="text-sm text-muted-foreground">
                    Dengan menggunakan layanan Bangtek Jago Repair, Anda menyetujui syarat dan ketentuan serta kebijakan privasi
                    kami.
                </p>
            </div>
        </div>
    )
}
