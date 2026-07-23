import Image from "next/image"

interface EmptyStateProps {
  title: string
  description: string
  image?: string
}

export default function EmptyState({
  title,
  description,
  image = "/empty.svg",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={image} alt="Empty Image" width={240} height={240} />
      <div className="mx-auto flex max-w-md flex-col gap-y-6 text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
