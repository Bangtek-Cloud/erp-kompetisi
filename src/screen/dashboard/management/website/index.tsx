import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { getAllWebsiteSections, upsertHero } from "@/services/website";
import LoadingSolder from "@/components/loading-solder";


export default function WebsiteIndex() {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["website-sections"],
        queryFn: getAllWebsiteSections,
    });

    const hero = data?.data;

    const [form, setForm] = useState({
        title: "",
        subTitle: "",
        description: "",
        buttonText: "",
        buttonLink: "",
    });

    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (hero) {
            setForm({
                title: hero.title ?? "",
                subTitle: hero.subTitle ?? "",
                description: hero.description ?? "",
                buttonText: hero.buttonText ?? "",
                buttonLink: hero.buttonLink ?? "",
            });
        }
    }, [hero]);

    const mutation = useMutation({
        mutationFn: upsertHero,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["website-sections"] });
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("subTitle", form.subTitle);
        fd.append("description", form.description);
        fd.append("buttonText", form.buttonText);
        fd.append("buttonLink", form.buttonLink);

        if (file) {
            fd.append("image", file);
        }

        mutation.mutate(fd);
    };

    if (isLoading) return <LoadingSolder />;
    if (error) return <div className="text-destructive">Terjadi kesalahan</div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <Card className="max-w-5xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl">
                        Hero Section
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* LEFT */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Sub Title</Label>
                                <Input
                                    name="subTitle"
                                    value={form.subTitle}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    name="description"
                                    rows={5}
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Button Text</Label>
                                <Input
                                    name="buttonText"
                                    value={form.buttonText}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Button Link</Label>
                                <Input
                                    name="buttonLink"
                                    value={form.buttonLink}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Hero Image</Label>

                                {hero?.image && (
                                    <div className="border rounded-lg p-2 bg-muted">
                                        <img
                                            src={hero.image}
                                            alt="Hero"
                                            className="rounded-md w-full h-40 object-cover"
                                        />
                                    </div>
                                )}

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setFile(
                                            e.target.files?.[0] ?? null
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending
                                    ? "Menyimpan..."
                                    : "Simpan Hero"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
