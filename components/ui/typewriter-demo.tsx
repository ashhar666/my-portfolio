import { Typewriter } from "@/components/ui/typewriter-text"

const TypewriterDemo = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <Typewriter
                text={["less is more.", "Design with purpose.", "Precision over perfection."]}
                speed={100}
                loop={true}
                className="text-2xl font-bold tracking-tight text-foreground"
            />
        </div>
    )
}

export { TypewriterDemo }
