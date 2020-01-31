import React from 'react'
import TunePreview from './TunePreview'

export default function (props) {
  return (
    <div className="TuneList max-width">
      {props.tunes.map(tune => <TunePreview key={tune._id} tune={tune} />)}
    </div>
  )
}
