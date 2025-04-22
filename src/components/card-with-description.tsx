export const CardWithDescription = ({ content }: { content: any }) => {
    const column1 = content.find((c: any) => c.type === 'header')?.value;
    const column2 = content.find((c: any) => c.type === 'description')?.value;
    return (
        <section className="container mx-auto w-full">
            <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto pt-8">
                <div className="text-center space-y-8">

                    <div className="max-w-screen-md mx-auto text-center text-2xl mt-10 font-bold">
                 
                        {column1}
                    </div>

                    <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
                        {column2}
                    </p>
                </div>
            </div>
        </section>
    )
}
