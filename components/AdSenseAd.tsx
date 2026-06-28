export default function AdSenseAd({ slot: _slot }: { slot: string }) {
  return (
    <div style={{
      height: '90px',
      background: '#f8f9fa',
      border: '1px dashed #dee2e6',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      color: '#adb5bd',
      fontSize: '12px',
    }}>
      Advertisement
    </div>
  )
}
