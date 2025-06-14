export default function NotFound() {
    return (
        <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
            <p className="text-muted-foreground">{`We couldn't find the order you're looking for.`}</p>
        </div>
    )
}
