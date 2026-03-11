import axios from 'axios'

const amenityIcons: Record<string, string> = {
  aircon: '❄️',
  wifi: '📶',
  parking: '🅿️',
  kitchen: '🍳',
  laundry: '🫧',
  furnished: '🛋️',
  cctv: '📷',
  elevator: '🛗',
  bathroom: '🚿',
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  available: { label: 'Available', color: '#16a34a', bg: '#dcfce7' },
  occupied:  { label: 'Occupied',  color: '#dc2626', bg: '#fee2e2' },
  reserved:  { label: 'Reserved',  color: '#ca8a04', bg: '#fef9c3' },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= Math.round(rating) ? '#FBBF24' : '#D1D5DB', fontSize: 16 }}>★</span>
      ))}
    </span>
  )
}

const RoomDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { data: room } = await axios.get(`http://localhost:8080/rooms/${id}`)

  const status = statusConfig[room.status] || statusConfig.available
  const placeholder = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=400&fit=crop'
  const heroImg = room.images?.[0] || placeholder

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7ff', fontFamily: "'Inter','Segoe UI',sans-serif" }}>

      {/* Top Nav */}
      <div style={{ background: '#4f46e5', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href="/rooms" style={{ color: '#fff', textDecoration: 'none', fontSize: 13, opacity: 0.8 }}>← Back to listings</a>
        <span style={{ color: '#ffffff50' }}>|</span>
        <span style={{ color: '#fff', fontSize: 13, opacity: 0.9 }}>🏠 RoomFinder PH</span>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px' }}>

        {/* Hero Image */}
        <div style={{ borderRadius: 18, overflow: 'hidden', height: 320, background: '#e5e7eb', position: 'relative', marginBottom: 24 }}>
          <img src={heroImg} alt={room.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* Status pill over image */}
          <div style={{
            position: 'absolute', top: 16, left: 16,
            background: status.bg, color: status.color,
            borderRadius: 20, padding: '5px 14px', fontWeight: 700, fontSize: 13,
            display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: status.color, display: 'inline-block' }} />
            {status.label}
          </div>
          {/* Floor area pill */}
          <div style={{
            position: 'absolute', bottom: 16, right: 16,
            background: 'rgba(0,0,0,0.55)', color: '#fff',
            borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 500
          }}>
            {room.floorArea} sqm
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Title block */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  background: '#ede9fe', color: '#6d28d9',
                  borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600,
                  textTransform: 'capitalize'
                }}>
                  {room.roomType.replace('_', ' ')}
                </span>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>Floor {room.floor}</span>
              </div>

              <h1 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800, color: '#111827' }}>{room.title}</h1>
              <p style={{ margin: '0 0 10px', fontSize: 13, color: '#6b7280' }}>📍 {room.address}, {room.barangay}, {room.city}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <StarRating rating={room.averageRating} />
                <span style={{ fontSize: 13, color: '#6b7280' }}>
                  <strong style={{ color: '#111' }}>{room.averageRating}</strong> ({room.totalReviews} reviews)
                </span>
              </div>

              <p style={{ margin: '14px 0 0', fontSize: 14, color: '#4b5563', lineHeight: 1.6 }}>{room.description}</p>
            </div>

            {/* Quick details */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <h2 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: '#111827' }}>Room Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Room Type',    value: room.roomType.replace('_', ' '), icon: '🏠' },
                  { label: 'Floor Area',   value: `${room.floorArea} sqm`,         icon: '📐' },
                  { label: 'Max Occupants',value: `${room.maxOccupants} person${room.maxOccupants > 1 ? 's' : ''}`, icon: '👤' },
                  { label: 'Floor',        value: `Floor ${room.floor}`,           icon: '🏢' },
                  { label: 'City',         value: room.city,                       icon: '🌆' },
                  { label: 'Barangay',     value: room.barangay,                   icon: '📍' },
                ].map(item => (
                  <div key={item.label} style={{ background: '#f9fafb', borderRadius: 10, padding: '10px 14px' }}>
                    <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 }}>{item.icon} {item.label}</p>
                    <p style={{ margin: '4px 0 0', fontSize: 14, fontWeight: 600, color: '#111827', textTransform: 'capitalize' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <h2 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: '#111827' }}>Amenities</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {room.amenities.length > 0 ? room.amenities.map((a: string) => (
                  <div key={a} style={{
                    border: '1.5px solid #e5e7eb', borderRadius: 10,
                    padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 13, color: '#374151', background: '#f9fafb'
                  }}>
                    <span style={{ fontSize: 18 }}>{amenityIcons[a] || '✅'}</span>
                    <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{a}</span>
                  </div>
                )) : <p style={{ fontSize: 13, color: '#9ca3af' }}>No amenities listed</p>}
              </div>
            </div>

            {/* Utilities */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <h2 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: '#111827' }}>Utilities Included</h2>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { key: 'electricity', icon: '⚡', label: 'Electricity', included: room.utilitiesIncluded.electricity },
                  { key: 'water',       icon: '💧', label: 'Water',       included: room.utilitiesIncluded.water },
                  { key: 'wifi',        icon: '📶', label: 'WiFi',        included: room.utilitiesIncluded.wifi },
                ].map(u => (
                  <div key={u.key} style={{
                    flex: 1, borderRadius: 10, padding: '12px',
                    textAlign: 'center',
                    background: u.included ? '#f0fdf4' : '#f9fafb',
                    border: `1.5px solid ${u.included ? '#bbf7d0' : '#e5e7eb'}`,
                  }}>
                    <div style={{ fontSize: 22 }}>{u.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4, color: u.included ? '#15803d' : '#9ca3af' }}>{u.label}</div>
                    <div style={{ fontSize: 11, color: u.included ? '#16a34a' : '#d1d5db', marginTop: 2 }}>
                      {u.included ? '✓ Included' : '✗ Not included'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <h2 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: '#111827' }}>House Rules</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Pets Allowed',      allowed: room.rules.petsAllowed,      icon: '🐾' },
                  { label: 'Smoking Allowed',   allowed: room.rules.smokingAllowed,   icon: '🚬' },
                  { label: 'Visitors Allowed',  allowed: room.rules.visitorsAllowed,  icon: '🚪' },
                ].map(rule => (
                  <div key={rule.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f9fafb', borderRadius: 10 }}>
                    <span style={{ fontSize: 13, color: '#374151' }}>{rule.icon} {rule.label}</span>
                    <span style={{
                      fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                      background: rule.allowed ? '#dcfce7' : '#fee2e2',
                      color: rule.allowed ? '#16a34a' : '#dc2626'
                    }}>
                      {rule.allowed ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                ))}
                {room.rules.curfew && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f9fafb', borderRadius: 10 }}>
                    <span style={{ fontSize: 13, color: '#374151' }}>🕙 Curfew</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{room.rules.curfew}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — sticky booking card */}
          <div style={{ position: 'sticky', top: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Price card */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '22px', boxShadow: '0 2px 16px rgba(79,70,229,0.12)', border: '1.5px solid #ede9fe' }}>
              <p style={{ margin: '0 0 4px', fontSize: 12, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 }}>Monthly Rent</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: '#4f46e5' }}>₱{room.monthlyRent.toLocaleString()}</span>
                <span style={{ fontSize: 13, color: '#9ca3af' }}>/mo</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                {[
                  { label: 'Security Deposit', value: room.securityDeposit },
                  { label: 'Advance Payment',  value: room.advancePayment },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#6b7280' }}>{item.label}</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>₱{item.value.toLocaleString()}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>Total Move-in Cost</span>
                  <span style={{ fontWeight: 800, color: '#4f46e5' }}>
                    ₱{(room.monthlyRent + room.securityDeposit + room.advancePayment).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                style={{
                  width: '100%', padding: '13px', borderRadius: 12, border: 'none',
                  background: room.status === 'available' ? '#4f46e5' : '#e5e7eb',
                  color: room.status === 'available' ? '#fff' : '#9ca3af',
                  fontSize: 15, fontWeight: 700, cursor: room.status === 'available' ? 'pointer' : 'not-allowed',
                  marginBottom: 10
                }}
                disabled={room.status !== 'available'}
              >
                {room.status === 'available' ? '🔑 Book This Room' : '⛔ Not Available'}
              </button>

              <button style={{
                width: '100%', padding: '11px', borderRadius: 12,
                border: '1.5px solid #4f46e5', background: 'transparent',
                color: '#4f46e5', fontSize: 14, fontWeight: 600, cursor: 'pointer'
              }}>
                💬 Message Landlord
              </button>
            </div>

            {/* Landlord card */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <p style={{ margin: '0 0 12px', fontSize: 12, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 }}>Listed by</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 18, fontWeight: 700, flexShrink: 0
                }}>
                  {room.landlord.fullName.charAt(0)}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>{room.landlord.fullName}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6b7280' }}>📞 {room.landlord.phone}</p>
                </div>
              </div>
              {room.landlord.isVerified && (
                <div style={{ marginTop: 10, background: '#f0fdf4', borderRadius: 8, padding: '6px 12px', fontSize: 12, color: '#16a34a', fontWeight: 500 }}>
                  ✅ Verified Landlord
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetails