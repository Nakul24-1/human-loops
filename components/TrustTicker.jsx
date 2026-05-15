export default function TrustTicker() {
    const tags = [
        'World Model Labs',
        "Top 10 Global Data Company's India Vendor",
        'YC backed robotics startup',
        'Leading AI finance tool',
        "India's top robotics company",
    ]
    const doubled = [...tags, ...tags]

    return (
        <div className="trust">
            <div className="trust-wrap">
                <div className="trust-label">Trusted by</div>
                <div className="trust-outer">
                    <div className="trust-inner">
                        {doubled.map((t, i) => (
                            <span key={i}>
                                <span className="trust-tag">{t}</span>
                                {i < doubled.length - 1 && <span className="trust-dot">·</span>}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
