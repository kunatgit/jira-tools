'use client';

export function Skeleton({ width = '100%', height = '16px', borderRadius = '8px', style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...style }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Skeleton height="20px" width="60%" />
      <Skeleton height="14px" width="80%" />
      <Skeleton height="14px" width="50%" />
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <Skeleton height="32px" width="80px" borderRadius="8px" />
        <Skeleton height="32px" width="80px" borderRadius="8px" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '12px', padding: '8px 0' }}>
        {[30, 20, 20, 15, 15].map((w, i) => (
          <Skeleton key={i} height="14px" width={`${w}%`} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '12px', padding: '8px 0', borderTop: '1px solid var(--border-color)' }}>
          {[30, 20, 20, 15, 15].map((w, j) => (
            <Skeleton key={j} height="14px" width={`${w}%`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Skeleton height="14px" width="50%" />
      <Skeleton height="32px" width="40%" />
      <Skeleton height="12px" width="70%" />
    </div>
  );
}
