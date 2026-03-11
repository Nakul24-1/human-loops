export default function TrustTicker() {
    const tags = [
        'Fortune 500 Healthcare Companies',
        'YC-Backed AI Startups',
        'Leading Harvesting Robotics Company',
        'Leading AI Taxation Company',
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
