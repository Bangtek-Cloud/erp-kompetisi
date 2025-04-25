export const CardFeature = ({ content }: { content: any }) => {
    const title = content.find((c: any) => c.type === 'header')?.value;
    const description = content.find((c: any) => c.type === 'description')?.value;
    const item = content.find((c: any) => c.type === 'item')?.children;
    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            {title}
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">


                    {item?.map((item: any) => {
                        return (
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                <p className="text-center text-muted-foreground">{item.value}</p>
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

