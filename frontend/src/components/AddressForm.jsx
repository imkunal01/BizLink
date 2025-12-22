import './AddressForm.css'   // ⭐ CSS import

export default function AddressForm({ value, onChange, disabled }) {
  const v = value || {}

  function setField(key, val) {
    onChange({ ...v, [key]: val })
  }

  return (
    <div className="address-form">
      <div className="field">
        <label>Full Name</label>
        <input
          value={v.name || ''}
          onChange={e => setField('name', e.target.value)}
          disabled={disabled}
          placeholder="John Doe"
        />
      </div>

      <div className="field">
        <label>Phone Number</label>
        <input
          value={v.phone || ''}
          onChange={e => setField('phone', e.target.value)}
          disabled={disabled}
          placeholder="9876543210"
        />
      </div>

      <div className="field">
        <label>Address</label>
        <input
          value={v.addressLine || ''}
          onChange={e => setField('addressLine', e.target.value)}
          disabled={disabled}
          placeholder="House no, Street, Area"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label>City</label>
          <input
            value={v.city || ''}
            onChange={e => setField('city', e.target.value)}
            disabled={disabled}
            placeholder="Indore"
          />
        </div>

        <div className="field">
          <label>State</label>
          <input
            value={v.state || ''}
            onChange={e => setField('state', e.target.value)}
            disabled={disabled}
            placeholder="Madhya Pradesh"
          />
        </div>
      </div>

      <div className="field">
        <label>Pincode</label>
        <input
          value={v.pincode || ''}
          onChange={e => setField('pincode', e.target.value)}
          disabled={disabled}
          placeholder="452001"
        />
      </div>
    </div>
  )
}
