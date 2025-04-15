import { PenToolIcon as Tool, Shield } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPage() {


    return (
        <div className="container mx-auto py-10 px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-10 mx-10">
                <div className="flex items-center gap-2 mb-4">
                    <Tool className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold tracking-tight">Bangtek Jago Repair</h1>
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Kebijakan Privasi</h2>
                <p className="text-muted-foreground max-w-2xl">
                    Silakan baca kebijakan privasi berikut dengan seksama sebelum menggunakan layanan
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
                                pengumpulanData: "Pengumpulan Data",
                                penggunaanData: "Penggunaan Data",
                                penyimpananData: "Penyimpanan Data",
                                pembagianData: "Pembagian Data",
                                hakPengguna: "Hak Pengguna",
                                keamanan: "Keamanan Data",
                                perubahan: "Perubahan Kebijakan",
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
                    <div className="flex items-center gap-2 mb-6">
                        <Shield className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold">Kebijakan Privasi</h2>
                    </div>

                    <p className="mb-6 text-muted-foreground">
                        Di Bangtek Jago Repair, kami menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami
                        mengumpulkan, menggunakan, menyimpan, dan melindungi informasi Anda saat Anda menggunakan platform kami.
                    </p>

                    <Card id="pengumpulanData" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>1. Pengumpulan Data</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Kami mengumpulkan informasi yang Anda berikan saat mendaftar dan menggunakan layanan kami,
                                    termasuk:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Informasi identitas (nama, alamat email, nomor telepon)</li>
                                    <li>Informasi profil (foto, biografi, keahlian teknis)</li>
                                    <li>Informasi pembayaran (untuk pendaftaran turnamen berbayar)</li>
                                    <li>Konten yang Anda unggah (foto, video, komentar)</li>
                                    <li>Data penggunaan (log, statistik, interaksi dengan platform)</li>
                                </ul>
                                <p>
                                    Kami juga mengumpulkan informasi secara otomatis melalui cookies dan teknologi serupa untuk
                                    meningkatkan pengalaman pengguna.
                                </p>
                            </CardContent>
                    </Card>

                    <Card id="penggunaanData" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>2. Penggunaan Data</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">Kami menggunakan informasi yang kami kumpulkan untuk:</p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Menyediakan, memelihara, dan meningkatkan layanan kami</li>
                                    <li>Memproses pendaftaran dan partisipasi dalam turnamen</li>
                                    <li>Mengelola akun pengguna dan memberikan dukungan pelanggan</li>
                                    <li>Mengirim pemberitahuan terkait turnamen dan pembaruan platform</li>
                                    <li>Menganalisis tren penggunaan dan meningkatkan pengalaman pengguna</li>
                                    <li>Mencegah aktivitas penipuan dan melindungi keamanan platform</li>
                                </ul>
                            </CardContent>
                    </Card>

                    <Card id="penyimpananData" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>3. Penyimpanan Data</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Kami menyimpan informasi Anda selama diperlukan untuk menyediakan layanan dan sesuai dengan
                                    kewajiban hukum kami.
                                </p>
                                <p className="mb-4">
                                    Jika Anda menghapus akun Anda, kami akan menghapus informasi Anda dalam waktu yang wajar, kecuali
                                    jika penyimpanan diperlukan untuk tujuan hukum atau kepentingan bisnis yang sah.
                                </p>
                                <p>
                                    Beberapa data mungkin disimpan dalam bentuk anonim untuk tujuan analitis setelah akun Anda
                                    dihapus.
                                </p>
                            </CardContent>
                    </Card>

                    <Card id="pembagianData" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>4. Pembagian Data</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Kami tidak menjual informasi pribadi Anda kepada pihak ketiga. Namun, kami dapat membagikan
                                    informasi dalam keadaan berikut:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Dengan penyedia layanan yang membantu kami mengoperasikan platform</li>
                                    <li>Dengan sponsor turnamen (hanya dengan persetujuan Anda)</li>
                                    <li>Untuk mematuhi kewajiban hukum atau menanggapi permintaan yang sah dari otoritas publik</li>
                                    <li>Untuk melindungi hak, properti, atau keselamatan kami, pengguna kami, atau publik</li>
                                    <li>Dalam kasus merger, akuisisi, atau penjualan aset (dengan pemberitahuan kepada Anda)</li>
                                </ul>
                            </CardContent>
                    </Card>

                    <Card id="hakPengguna" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>5. Hak Pengguna</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">Anda memiliki hak tertentu terkait dengan informasi pribadi Anda, termasuk:</p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Mengakses dan menerima salinan informasi Anda</li>
                                    <li>Memperbaiki informasi yang tidak akurat</li>
                                    <li>Menghapus informasi Anda (dengan batasan tertentu)</li>
                                    <li>Membatasi atau menolak pemrosesan informasi Anda</li>
                                    <li>Meminta portabilitas data Anda</li>
                                </ul>
                                <p>
                                    Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak yang disediakan di
                                    bawah.
                                </p>
                            </CardContent>
                    </Card>

                    <Card id="keamanan" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>6. Keamanan Data</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi
                                    informasi Anda dari akses yang tidak sah, penggunaan yang tidak sah, atau pengungkapan.
                                </p>
                                <p className="mb-4">
                                    Meskipun kami berusaha untuk melindungi informasi Anda, tidak ada metode transmisi melalui
                                    internet atau metode penyimpanan elektronik yang 100% aman. Oleh karena itu, kami tidak dapat
                                    menjamin keamanan mutlak.
                                </p>
                                <p>
                                    Kami secara teratur meninjau praktik keamanan kami dan memperbarui langkah-langkah keamanan sesuai
                                    kebutuhan.
                                </p>
                            </CardContent>
                    </Card>

                    <Card id="perubahan" className="mb-6">
                        <CardHeader className="cursor-pointer">
                            <div className="flex justify-between items-center">
                                <CardTitle>7. Perubahan Kebijakan</CardTitle>
                            </div>
                        </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan
                                    dalam praktik kami atau untuk alasan operasional, hukum, atau peraturan lainnya.
                                </p>
                                <p className="mb-4">
                                    Kami akan memberi tahu Anda tentang perubahan signifikan dengan memposting pemberitahuan di
                                    platform kami atau dengan mengirimkan pemberitahuan langsung kepada Anda.
                                </p>
                                <p>
                                    Kami mendorong Anda untuk meninjau Kebijakan Privasi ini secara berkala untuk tetap mendapatkan
                                    informasi terbaru tentang praktik privasi kami.
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
