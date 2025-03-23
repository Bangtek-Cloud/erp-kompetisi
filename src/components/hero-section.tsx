"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export const HeroSection = () => {
    return (
        <section className="container mx-auto w-full">
            <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto pt-8">
                <div className="text-center space-y-8">
                    <Badge variant="outline" className="text-sm py-2">
                        <span className="mr-2 text-primary">
                            <Badge>New</Badge>
                        </span>
                        <span> Kompetisi sedang berlangsung! </span>
                    </Badge>

                    <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
                        <h1>
                            Mulai <br/>
                            <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                                Kompetisi
                            </span>
                            Teknisi
                        </h1>
                    </div>

                    <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
                        {`Kami lebih dari sekadar sistem, kami adalah komunitas para teknisi hebat! Bergabunglah sekarang dan dapatkan akses ke fitur eksklusif, panduan ahli, serta dukungan penuh untuk memenangkan setiap kompetisi!`}
                    </p>

                    <div className="space-y-4 md:space-y-0 md:space-x-4">
                        <Link to={'/apps'}>
                            <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
                                Mulai sekarang
                                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                    </div>
                </div>

                <div className="relative group mt-14">
                    <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
                    <img
                        width={1200}
                        height={1200}
                        className="w-full md:w-[960px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
                        src={"/image.png"
                        }
                        alt="dashboard"
                    />

                    <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
                </div>
            </div>
        </section >
    );
};