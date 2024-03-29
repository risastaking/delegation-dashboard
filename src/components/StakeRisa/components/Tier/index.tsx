const Tier = (props: { tier: number; }) =>
  props.tier === 1 ? (
    <span className='risa-tier' style={{ color: '#CD7F32' }}>
      Bronze
    </span>
  ) : props.tier === 2 ? (
    <span className='risa-tier' style={{ color: '#C0C0C0' }}>
      Silver
    </span>
  ) : props.tier === 3 ? (
    <span className='risa-tier' style={{ color: '#FFD700' }}>
      Gold
    </span>
  ) : props.tier === 4 ? (
    <span className='risa-tier' style={{ color: '#b9f2ff' }}>
      Diamond
    </span>
  ) : null;
export default Tier;
