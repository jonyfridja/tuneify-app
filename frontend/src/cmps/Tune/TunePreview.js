import React from 'react'
export default function({tune}){
  return (
    <div>
      {JSON.stringify(tune, null, 2)}
    </div>
  )
}